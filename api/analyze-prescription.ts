// @ts-nocheck
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

    const prompt = `You are a medical prescription analysis expert. Analyze this prescription image and return a JSON object with this exact structure:
    {
      "patientName": "string",
      "date": "string",
      "diagnosis": "string",
      "medicines": [
        {
          "name": "string",
          "dosage": "string",
          "purpose": { "en": "string", "ur": "string" },
          "timing": { "instructions": { "en": "string", "ur": "string" } },
          "precautions": { "en": "string", "ur": "string" }
        }
      ],
      "englishSpeechText": "string",
      "pureUrduSpeechText": "string"
    }
    Ensure it is valid JSON only.`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
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

    const text = response.text;
    const cleanJson = text ? text.replace(/```json/g, '').replace(/```/g, '').trim() : '{}';
    let parsedData = {};
    
    try {
      parsedData = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.error('JSON Parse Error, raw text was:', text);
      parsedData = {};
    }

    // --- SAFETY SANITIZATION (Prevents Frontend .en crashes) ---
    const formatLangObj = (field: any) => {
      if (!field) return { en: '', ur: '' };
      if (typeof field === 'string') return { en: field, ur: '' };
      return {
        en: typeof field.en === 'string' ? field.en : (typeof field === 'string' ? field : ''),
        ur: typeof field.ur === 'string' ? field.ur : ''
      };
    };

    const sanitizedMedicines = Array.isArray(parsedData.medicines) 
      ? parsedData.medicines.map((med: any) => {
          let timingInst = { en: '', ur: '' };
          if (med?.timing?.instructions) {
            timingInst = formatLangObj(med.timing.instructions);
          } else if (med?.timing) {
            timingInst = formatLangObj(med.timing);
          }

          return {
            name: med?.name || 'Unknown Medicine',
            dosage: med?.dosage || '',
            purpose: formatLangObj(med?.purpose),
            timing: { instructions: timingInst },
            precautions: formatLangObj(med?.precautions)
          };
        }) 
      : [];

    const sanitizedData = {
      patientName: parsedData.patientName || 'Not Specified',
      date: parsedData.date || '',
      diagnosis: parsedData.diagnosis || '',
      medicines: sanitizedMedicines,
      englishSpeechText: parsedData.englishSpeechText || '',
      pureUrduSpeechText: parsedData.pureUrduSpeechText || ''
    };

    const payload = {
      success: true,
      data: sanitizedData,
      ...sanitizedData
    };

    return res.status(200).json(payload);
  } catch (err: any) {
    console.error('API Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to analyze prescription' });
  }
}
