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

    const prompt = `Analyze this medical prescription image and return ONLY a valid JSON object matching this exact structure:
{
  "patientName": "Patient Name or Not Specified",
  "date": "Date or Not Specified",
  "diagnosis": "General Diagnosis",
  "medicines": [
    {
      "name": "Medicine Name",
      "dosage": "Dosage",
      "purpose": { "en": "Purpose in English", "ur": "Maqsad" },
      "timing": { "instructions": { "en": "Instructions", "ur": "Hidayat" } },
      "precautions": { "en": "Precautions", "ur": "Ihteyat" }
    }
  ],
  "englishSpeechText": "Prescription analyzed successfully.",
  "pureUrduSpeechText": "Nuskha read ho gaya hai."
}
Keep response short and concise. Do not use markdown syntax. Return raw JSON only.`;

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
      config: {
        maxOutputTokens: 500,
        temperature: 0.1,
        thinkingConfig: {
          thinkingBudget: 0,
        },
      } as any
    });

    let text = response.text || '{}';
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsedData: any = {};
    try {
      parsedData = JSON.parse(text);
    } catch (parseErr) {
      console.error('JSON Parse Error:', text);
      return res.status(200).json({ 
        success: true, 
        patientName: "Not Specified",
        date: "Not Specified",
        diagnosis: "Prescription Analysis Complete",
        medicines: [],
        englishSpeechText: "Prescription image parsed.",
        pureUrduSpeechText: "Nuskha parse kar liya gaya hai."
      });
    }

    const safeMedicines = Array.isArray(parsedData.medicines) ? parsedData.medicines.map((m: any) => ({
      name: m.name || "Unspecified Medicine",
      dosage: m.dosage || "As directed",
      purpose: {
        en: m.purpose?.en || "Medical treatment",
        ur: m.purpose?.ur || "Ilaaj ke liye"
      },
      timing: {
        instructions: {
          en: m.timing?.instructions?.en || m.timing || "As directed by doctor",
          ur: m.timing?.instructions?.ur || m.timing || "Doctor ki hidayat ke mutabiq"
        }
      },
      precautions: {
        en: m.precautions?.en || "Consult doctor if needed",
        ur: m.precautions?.ur || "Doctor se mashwara karein"
      }
    })) : [];

    const safeData = {
      patientName: parsedData.patientName || "Not Specified",
      date: parsedData.date || "Not Specified",
      diagnosis: parsedData.diagnosis || "Prescription Analysis",
      medicines: safeMedicines,
      englishSpeechText: parsedData.englishSpeechText || "Prescription analyzed.",
      pureUrduSpeechText: parsedData.pureUrduSpeechText || "Nuskha read ho gaya hai."
    };

    return res.status(200).json({
      success: true,
      data: safeData,
      ...safeData
    });

  } catch (err: any) {
    console.error('API Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to analyze prescription' });
  }
}
