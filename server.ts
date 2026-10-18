import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '25mb' }));

// Initialize shared Gemini SDK client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const prescriptionSchema = {
  type: Type.OBJECT,
  properties: {
    doctorName: { type: Type.STRING },
    clinicName: { type: Type.STRING },
    date: { type: Type.STRING },
    patientName: { type: Type.STRING },
    medicines: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          genericName: { type: Type.STRING },
          form: { type: Type.STRING },
          strength: { type: Type.STRING },
          purpose: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              romanUrdu: { type: Type.STRING },
              urdu: { type: Type.STRING },
            },
            required: ['en', 'romanUrdu', 'urdu'],
          },
          timing: {
            type: Type.OBJECT,
            properties: {
              morning: { type: Type.BOOLEAN },
              afternoon: { type: Type.BOOLEAN },
              night: { type: Type.BOOLEAN },
              withFood: { type: Type.STRING },
              dosageAmount: { type: Type.STRING },
              instructions: {
                type: Type.OBJECT,
                properties: {
                  en: { type: Type.STRING },
                  romanUrdu: { type: Type.STRING },
                  urdu: { type: Type.STRING },
                },
                required: ['en', 'romanUrdu', 'urdu'],
              },
            },
            required: ['morning', 'afternoon', 'night', 'withFood', 'dosageAmount', 'instructions'],
          },
          duration: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              romanUrdu: { type: Type.STRING },
              urdu: { type: Type.STRING },
            },
            required: ['en', 'romanUrdu', 'urdu'],
          },
          precautions: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              romanUrdu: { type: Type.STRING },
              urdu: { type: Type.STRING },
            },
            required: ['en', 'romanUrdu', 'urdu'],
          },
        },
        required: ['id', 'name', 'form', 'purpose', 'timing', 'duration', 'precautions'],
      },
    },
    overallAdvice: {
      type: Type.OBJECT,
      properties: {
        en: { type: Type.STRING },
        romanUrdu: { type: Type.STRING },
        urdu: { type: Type.STRING },
      },
      required: ['en', 'romanUrdu', 'urdu'],
    },
    warnings: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    pureUrduSpeechText: { type: Type.STRING },
    englishSpeechText: { type: Type.STRING },
  },
  required: ['medicines', 'overallAdvice', 'pureUrduSpeechText', 'englishSpeechText'],
};

async function startServer() {
  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      app: 'CureBridge AI',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Core Vision API Endpoint for Prescription Analysis
  app.post('/api/analyze-prescription', async (req, res) => {
    try {
      const { imageBase64, mimeType } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'Image base64 data is required' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY is not configured on the server.',
          needsKey: true,
        });
      }

      // Strip data URL header if present
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');

      const promptText = `You are CureBridge AI, a clinical pharmacist and medical visual assistant designed to analyze doctor prescriptions for patients with low literacy.
Carefully examine this prescription image. Read doctor name, clinic name, date, patient details, and every prescribed medicine.

For each medicine, extract:
1. Brand name & generic name (e.g., Panadol / Paracetamol)
2. Formulation (Tablet, Capsule, Syrup, Drops, Inhaler, Injection) & Strength (e.g. 500mg, 20mg)
3. Purpose explained simply in 3 languages:
   - en: Simple English (e.g., For fever, headache, and body aches)
   - romanUrdu: Easy colloquial Roman Urdu (e.g., Bukhar, sar dard aur jism ke dard ke liye)
   - ur: Pure Urdu script (e.g., بخار، سر درد اور جسم کی تکلیف کے لیے)
4. Timing & schedule:
   - morning: boolean (true if taken in morning)
   - afternoon: boolean (true if taken in afternoon)
   - night: boolean (true if taken at night)
   - withFood: "before" (khana khane se pehle / nehar munh) | "after" (khana khane ke baad) | "with" (khane ke darmiyan) | "anytime"
   - dosageAmount: e.g. "1 Tablet", "2 Teaspoons (10ml)", "2 Drops"
   - instructions:
     - en: English (e.g., Take 1 tablet after food in the morning and night)
     - romanUrdu: Roman Urdu (e.g., Subah aur raat khana khane ke baad 1 goli lein)
     - ur: Urdu script (e.g., صبح اور رات کھانا کھانے کے بعد ایک گولی لیں)
5. Duration:
   - en: e.g., 5 Days
   - romanUrdu: e.g., 5 Din tak
   - ur: e.g., ۵ دن تک
6. Specific precautions:
   - en: e.g., Complete full 5-day course even if feeling well. Take with water.
   - romanUrdu: e.g., Tabiyat theek hone par bhi 5 din ka course poora karein. Paani zyada piyein.
   - ur: e.g., طبیعت سنبھلنے کے باوجود ۵ دن کا کورس مکمل کریں۔ زیادہ پانی پیئیں۔

Also provide:
- doctorName (if legible)
- clinicName (if legible)
- date (if legible)
- patientName (if legible)
- overallAdvice in en, romanUrdu, and ur.
- warnings: array of 2-3 important safety alerts.
- pureUrduSpeechText: A fluent, warm, conversational audio narration script in PURE URDU SCRIPT (اردو) for the speech synthesis engine. Speak directly to the patient ("السلام علیکم۔ آپ کی پرچی میں..."). Describe each medicine, timings (صبح، دوپہر، رات), food rules, and advice in pure Urdu script without any emojis or markdown symbols so it sounds completely natural.
- englishSpeechText: A warm, clear English audio narration script for the patient.

Format strictly as JSON matching the schema.`;

      const response = await ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType || 'image/jpeg',
                data: cleanBase64,
              },
            },
            {
              text: promptText,
            },
          ],
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: prescriptionSchema,
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('Empty response received from vision model');
      }

      const parsedData = JSON.parse(text);
      return res.json({ success: true, data: parsedData });
    } catch (err: any) {
      console.error('Prescription analysis server error:', err);
      return res.status(500).json({
        error: err.message || 'Failed to analyze prescription',
      });
    }
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CureBridge AI server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
