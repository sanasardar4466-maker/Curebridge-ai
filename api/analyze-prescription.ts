import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { imageBase64, mimeType } = req.body;
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ success: false, error: 'Gemini API key is missing on Vercel environment variables.' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are a medical prescription analysis expert. Analyze this prescription image and return ONLY a raw JSON object with this exact structure:
{
  "patientName": "Unknown / Not specified",
  "date": "Not specified",
  "diagnosis": "General Prescription Analysis",
  "medicines": [
    {
      "name": "Medicine Name",
      "dosage": "Dosage Info",
      "purpose": { "en": "Purpose in English", "ur": "maqsad" },
      "timing": { "instructions": { "en": "Instructions", "ur": "hidayat" } },
      "precautions": { "en": "Precautions", "ur": "ihteyat" }
    }
  ],
  "englishSpeechText": "Prescription analyzed successfully.",
  "pureUrduSpeechText": "Nuskha kamyabi se read kar liya gaya hai."
}
Return valid JSON only without markdown codeblocks or quotes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          inlineData: {
            data: imageBase64,
            mimeType: mimeType || 'image/jpeg',
          },
        },
        { text: prompt },
      ],
    });

    let text = response.text || '{}';
    // Remove markdown wrapping if present
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch (parseErr) {
      console.error('JSON Parse Error:', text);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to parse AI response. Please try uploading a clearer image.' 
      });
    }

    // Ensure safe fallback structures so frontend never crashes on missing keys
    const safeData = {
      patientName: parsedData.patientName || "Not Specified",
      date: parsedData.date || "Not Specified",
      diagnosis: parsedData.diagnosis || "Prescription Analysis",
      medicines: Array.isArray(parsedData.medicines) ? parsedData.medicines.map((m: any) => ({
        name: m.name || "Unspecified Medicine",
        dosage: m.dosage || "As directed",
        purpose: {
          en: m.purpose?.en || "General medical use",
          ur: m.purpose?.ur || "Aam tibbi istemal"
        },
        timing: {
          instructions: {
            en: m.timing?.instructions?.en || "Take as directed by doctor",
            ur: m.timing?.instructions?.ur || "Doctor ki hidayat ke mutabiq lein"
          }
        },
        precautions: {
          en: m.precautions?.en || "Consult doctor if side effects occur",
          ur: m.precautions?.ur || "Kharabi ki surat mein doctor se rujo karein"
        }
      })) : [],
      englishSpeechText: parsedData.englishSpeechText || "Prescription analysis complete.",
      pureUrduSpeechText: parsedData.pureUrduSpeechText || "Nuskhe ki jaanch mukammal ho gayi hai."
    };

    return res.status(200).json({ success: true, data: safeData });
  } catch (err: any) {
    console.error('API Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to analyze prescription' });
  }
}
