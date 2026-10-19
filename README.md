# CureBridge AI 

CureBridge AI is an intelligent prescription analysis web application designed to bridge the gap between complex doctor handwriting/printed prescriptions and patient understanding. Built for the NYLP AI Hackathon.

## Problem Statement
In South Asia (including Pakistan), millions of patients struggle to decipher complex doctor prescriptions. Misunderstanding dosages, timings, or medication names leads to poor health outcomes, missed doses, and dangerous medication errors.

## Solution
CureBridge AI instantly scans prescription slips using advanced multimodal AI, translates and explains them into clear local languages (Urdu, Roman Urdu, and English), provides audio narration, and organizes medications into intuitive visual morning/afternoon/night schedules.

## Key Features
- **Smart OCR & Parsing:** Extracts medicine names, dosages, and instructions from uploaded prescription images.
- **Multilingual Narration:** Text-to-speech support in Urdu, Roman Urdu, and English.
- **Visual Schedule Blocks:** Breaks down daily routines into Morning, Afternoon, and Night blocks.
- **Crash-Proof UI:** Built with robust error-handling and optional chaining to ensure smooth performance even with incomplete API data.

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Lucide Icons
- **Backend / API:** Node.js, Google Gemini API (Multimodal AI)
- **Deployment:** Vercel

## Setup & Installation (Local Development)
1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/curebridge-ai.git](https://github.com/your-username/curebridge-ai.git)
   
2.Install dependencies:
             Bash
             npm install
3. Set GEMINI_API_KEY in .env.local to your Gemini API key.

4. Run the app:
             Bash
             npm run dev
 AI Methodology & API Usage
CureBridge AI uses the Google Gemini API to analyze uploaded prescription images. The multimodal model processes the handwriting, structures the data into a clean JSON format, and maps out user-friendly instructions tailored for patients.

## Team Contributions
- **Team Lead & Lead Developer:** [Aneeqa Saif] - Full-stack development, AI integration, UI/UX refinement, and crash-proofing.
- **Frontend & UI Designer:** [Hijab Rashid] - Assistance with UI layout and styling.
- **Research & Documentation:** [Shifa Rehman] - Problem statement formulation and presentation materials.
- **Testing & QA:** [Nisha Nazir] - Application testing, prescription sample checks, and bug reporting.

