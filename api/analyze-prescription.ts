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

    const prompt = `Analyze this medical prescription image and return ONLY a raw JSON object with this structure:
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
Do not use markdown formatting or markdown code blocks. Return JSON only.`;

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
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch (parseErr) {
      console.error('JSON Parse Error:', text);
      return res.status(500).json({ success: false, error: 'Invalid response format from Gemini model.' });
    }

    return res.status(200).json({ success: true, data: parsedData });
  } catch (err: any) {
    console.error('API Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to analyze prescription' });
  }
}
