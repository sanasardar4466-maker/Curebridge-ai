import { SamplePrescription } from '../types';

// Helper to encode SVG to data URL
function createSvgDataUrl(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

const sample1Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1050" width="100%" height="100%">
  <defs>
    <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FCFCFB"/>
      <stop offset="100%" stop-color="#F7F6F2"/>
    </linearGradient>
    <filter id="subtleShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- Paper background -->
  <rect width="800" height="1050" fill="url(#paperGrad)" />
  <rect x="25" y="25" width="750" height="1000" fill="none" stroke="#D1D5DB" stroke-width="1.5" stroke-dasharray="4 2" />

  <!-- Hospital Header -->
  <rect x="25" y="25" width="750" height="130" fill="#047857" opacity="0.08" />
  <circle cx="85" cy="85" r="35" fill="#047857" />
  <path d="M73 85 h24 M85 73 v24" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" />

  <text x="135" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="800" fill="#064E3B">AL-SHIFA MEDICAL &amp; FAMILY CLINIC</text>
  <text x="135" y="95" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#047857">Dr. Tariq Mahmood (MBBS, FCPS General Medicine)</text>
  <text x="135" y="118" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#4B5563">PMC Reg: 44102-M · Phone: +92 51 4455882 · Main Murree Road, Rawalpindi</text>

  <!-- Divider -->
  <line x1="45" y1="165" x2="755" y2="165" stroke="#047857" stroke-width="2.5" />

  <!-- Patient Details Bar -->
  <rect x="45" y="180" width="710" height="48" rx="6" fill="#F3F4F6" />
  <text x="60" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#1F2937">Patient:</text>
  <text x="125" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#374151">Muhammad Aslam</text>

  <text x="320" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#1F2937">Age / Sex:</text>
  <text x="400" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#374151">42 Yrs / Male</text>

  <text x="560" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#1F2937">Date:</text>
  <text x="610" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#374151">18-Oct-2026</text>

  <!-- Diagnosis note -->
  <text x="60" y="260" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-style="italic" fill="#6B7280">Diagnosis: Acute Upper Respiratory Tract Infection, Fever &amp; Myalgia</text>

  <!-- Big Rx Symbol -->
  <text x="55" y="325" font-family="serif" font-size="44" font-weight="bold" fill="#047857">℞</text>

  <!-- Medicine 1 -->
  <g transform="translate(60, 360)">
    <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" fill="#111827">1. Tab. Panadol (Paracetamol) 500mg</text>
    <text x="25" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600" fill="#047857">1 Tab  -  T.D.S (1 + 1 + 1)  -  After Meals  ×  4 Days</text>
    <text x="25" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#6B7280">(For Fever &amp; Body Pain · Subah, Dopahar, Raat)</text>
    <line x1="0" y1="70" x2="680" y2="70" stroke="#E5E7EB" stroke-width="1" />
  </g>

  <!-- Medicine 2 -->
  <g transform="translate(60, 460)">
    <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" fill="#111827">2. Tab. Augmentin (Co-Amoxiclav) 625mg</text>
    <text x="25" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600" fill="#047857">1 Tab  -  B.D (1 + 0 + 1)  -  After Food  ×  5 Days</text>
    <text x="25" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#6B7280">(Antibiotic for throat infection · Complete 5-day course)</text>
    <line x1="0" y1="70" x2="680" y2="70" stroke="#E5E7EB" stroke-width="1" />
  </g>

  <!-- Medicine 3 -->
  <g transform="translate(60, 560)">
    <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" fill="#111827">3. Tab. Arinac (Ibuprofen + Pseudoephedrine)</text>
    <text x="25" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600" fill="#047857">1 Tab  -  S.O.S (As needed for severe congestion)</text>
    <text x="25" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#6B7280">(Nasal congestion &amp; headache · Take with water)</text>
    <line x1="0" y1="70" x2="680" y2="70" stroke="#E5E7EB" stroke-width="1" />
  </g>

  <!-- Special Advice Box -->
  <rect x="50" y="670" width="700" height="130" rx="8" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1.5" />
  <text x="75" y="700" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="700" fill="#065F46">Special Advice &amp; Instructions:</text>
  <text x="75" y="730" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#047857">• Complete the full 5-day antibiotic course even if feeling fully recovered.</text>
  <text x="75" y="755" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#047857">• Gargle with warm saline water twice daily; drink warm soups and tea.</text>
  <text x="75" y="780" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#047857">• Return for follow-up if fever continues past 4 days.</text>

  <!-- Doctor Stamp and Signature -->
  <g transform="translate(530, 840)">
    <circle cx="90" cy="50" r="42" fill="none" stroke="#1E40AF" stroke-width="2" stroke-dasharray="3 3" opacity="0.7"/>
    <text x="90" y="45" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#1E40AF" opacity="0.8">CLINICAL PHYSICIAN</text>
    <text x="90" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" text-anchor="middle" fill="#1E40AF" opacity="0.8">RAWALPINDI</text>
    <path d="M30 65 Q 70 20 110 50 T 160 30" fill="none" stroke="#047857" stroke-width="2.5" stroke-linecap="round"/>
    <text x="90" y="105" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" text-anchor="middle" fill="#374151">Dr. Tariq Mahmood</text>
  </g>

  <!-- Footer Watermark / Legal -->
  <line x1="45" y1="980" x2="755" y2="980" stroke="#E5E7EB" stroke-width="1" />
  <text x="400" y="1005" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" text-anchor="middle" fill="#9CA3AF">Al-Shifa Family Clinic · Emergency Helpline: 051-4455882 · Valid for 30 days from issue</text>
</svg>
`;

const sample2Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1050" width="100%" height="100%">
  <defs>
    <linearGradient id="paperGrad2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FCFCFC"/>
      <stop offset="100%" stop-color="#F4F8F6"/>
    </linearGradient>
  </defs>

  <rect width="800" height="1050" fill="url(#paperGrad2)" />
  <rect x="25" y="25" width="750" height="1000" fill="none" stroke="#D1D5DB" stroke-width="1.5" stroke-dasharray="4 2" />

  <!-- Hospital Header -->
  <rect x="25" y="25" width="750" height="130" fill="#047857" opacity="0.08" />
  <circle cx="85" cy="85" r="35" fill="#059669" />
  <path d="M75 75 Q 85 95 95 75 T 100 95" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" />

  <text x="135" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="800" fill="#064E3B">MEDICARE GASTROENTEROLOGY CLINIC</text>
  <text x="135" y="95" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#047857">Dr. Ayesha Siddiqui (MBBS, MRCP Gastroenterology UK)</text>
  <text x="135" y="118" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#4B5563">Specialist in Digestive Disorders &amp; Endoscopy · Jail Road, Lahore</text>

  <line x1="45" y1="165" x2="755" y2="165" stroke="#059669" stroke-width="2.5" />

  <rect x="45" y="180" width="710" height="48" rx="6" fill="#F3F4F6" />
  <text x="60" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#1F2937">Patient:</text>
  <text x="125" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#374151">Fatima Bibi</text>

  <text x="320" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#1F2937">Age / Sex:</text>
  <text x="400" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#374151">36 Yrs / Female</text>

  <text x="560" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#1F2937">Date:</text>
  <text x="610" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#374151">17-Oct-2026</text>

  <text x="60" y="260" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-style="italic" fill="#6B7280">Diagnosis: Gastroesophageal Reflux Disease (GERD) &amp; Gastric Dyspepsia</text>

  <text x="55" y="325" font-family="serif" font-size="44" font-weight="bold" fill="#059669">℞</text>

  <!-- Medicine 1 -->
  <g transform="translate(60, 360)">
    <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" fill="#111827">1. Cap. Risek (Omeprazole) 20mg</text>
    <text x="25" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600" fill="#059669">1 Cap  -  O.D (1 + 0 + 0)  -  Empty Stomach (Nehar Munh)  ×  14 Days</text>
    <text x="25" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#6B7280">(Take 30 mins before breakfast with plain water)</text>
    <line x1="0" y1="70" x2="680" y2="70" stroke="#E5E7EB" stroke-width="1" />
  </g>

  <!-- Medicine 2 -->
  <g transform="translate(60, 460)">
    <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" fill="#111827">2. Syp. Gaviscon (Sodium Alginate)</text>
    <text x="25" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600" fill="#059669">2 Teaspoons (10ml)  -  B.D (0 + 1 + 1)  -  After Meals &amp; Bedtime</text>
    <text x="25" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#6B7280">(For heartburn &amp; acid reflux in throat · Afternoon and Night)</text>
    <line x1="0" y1="70" x2="680" y2="70" stroke="#E5E7EB" stroke-width="1" />
  </g>

  <!-- Medicine 3 -->
  <g transform="translate(60, 560)">
    <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" fill="#111827">3. Tab. Motilium (Domperidone) 10mg</text>
    <text x="25" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600" fill="#059669">1 Tab  -  B.D (0 + 1 + 1)  -  15 mins Before Meals  ×  7 Days</text>
    <text x="25" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#6B7280">(For stomach bloating &amp; nausea before lunch and dinner)</text>
    <line x1="0" y1="70" x2="680" y2="70" stroke="#E5E7EB" stroke-width="1" />
  </g>

  <!-- Advice Box -->
  <rect x="50" y="670" width="700" height="130" rx="8" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1.5" />
  <text x="75" y="700" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="700" fill="#065F46">Dietary Restrictions &amp; Advice:</text>
  <text x="75" y="730" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#047857">• Avoid oily, spicy, deep fried pakoras/samosas, and carbonated sodas.</text>
  <text x="75" y="755" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#047857">• Do NOT lie down or sleep right after dinner; maintain 2 hours gap.</text>
  <text x="75" y="780" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#047857">• Eat small, frequent meals rather than heavy dinners.</text>

  <!-- Doctor Stamp and Signature -->
  <g transform="translate(530, 840)">
    <circle cx="90" cy="50" r="42" fill="none" stroke="#047857" stroke-width="2" stroke-dasharray="2 2" opacity="0.7"/>
    <text x="90" y="45" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#047857">GASTRO SPECIALIST</text>
    <text x="90" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" text-anchor="middle" fill="#047857">LAHORE</text>
    <path d="M30 60 Q 75 10 120 50 T 165 40" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round"/>
    <text x="90" y="105" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" text-anchor="middle" fill="#374151">Dr. Ayesha Siddiqui</text>
  </g>

  <line x1="45" y1="980" x2="755" y2="980" stroke="#E5E7EB" stroke-width="1" />
  <text x="400" y="1005" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" text-anchor="middle" fill="#9CA3AF">Medicare Clinics Lahore · Appt Helpline: 042-35719900</text>
</svg>
`;

const sample3Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1050" width="100%" height="100%">
  <defs>
    <linearGradient id="paperGrad3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FAFBF9"/>
      <stop offset="100%" stop-color="#F1F6F3"/>
    </linearGradient>
  </defs>

  <rect width="800" height="1050" fill="url(#paperGrad3)" />
  <rect x="25" y="25" width="750" height="1000" fill="none" stroke="#D1D5DB" stroke-width="1.5" stroke-dasharray="4 2" />

  <!-- Header -->
  <rect x="25" y="25" width="750" height="130" fill="#047857" opacity="0.08" />
  <circle cx="85" cy="85" r="35" fill="#047857" />
  <path d="M72 85 C 72 75 98 75 98 85 C 98 95 85 102 85 102 C 85 102 72 95 72 85 Z" fill="#FFFFFF" />

  <text x="135" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="800" fill="#064E3B">NATIONAL HEART &amp; DIABETIC CENTER</text>
  <text x="135" y="95" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#047857">Dr. Imran Khan (MBBS, Dip Card, Consultant Cardiologist)</text>
  <text x="135" y="118" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#4B5563">Hypertension &amp; Endocrine Clinic · Clifton Block 5, Karachi</text>

  <line x1="45" y1="165" x2="755" y2="165" stroke="#047857" stroke-width="2.5" />

  <rect x="45" y="180" width="710" height="48" rx="6" fill="#F3F4F6" />
  <text x="60" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#1F2937">Patient:</text>
  <text x="125" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#374151">Haji Abdul Rehman</text>

  <text x="320" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#1F2937">Age / Sex:</text>
  <text x="400" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#374151">58 Yrs / Male</text>

  <text x="560" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#1F2937">Date:</text>
  <text x="610" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#374151">16-Oct-2026</text>

  <text x="60" y="260" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-style="italic" fill="#6B7280">Diagnosis: Type-2 Diabetes Mellitus &amp; Essential Hypertension (BP: 150/95)</text>

  <text x="55" y="325" font-family="serif" font-size="44" font-weight="bold" fill="#047857">℞</text>

  <!-- Medicine 1 -->
  <g transform="translate(60, 360)">
    <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" fill="#111827">1. Tab. Norvasc (Amlodipine) 5mg</text>
    <text x="25" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600" fill="#047857">1 Tab  -  O.D (1 + 0 + 0)  -  After Breakfast (Subah)  ×  1 Month</text>
    <text x="25" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#6B7280">(For Blood Pressure · Take at the exact same hour every morning)</text>
    <line x1="0" y1="70" x2="680" y2="70" stroke="#E5E7EB" stroke-width="1" />
  </g>

  <!-- Medicine 2 -->
  <g transform="translate(60, 460)">
    <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" fill="#111827">2. Tab. Glucophage (Metformin) 500mg</text>
    <text x="25" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600" fill="#047857">1 Tab  -  O.D (0 + 0 + 1)  -  With Dinner (Raat)  ×  1 Month</text>
    <text x="25" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#6B7280">(For Sugar Control · Take with the main evening meal)</text>
    <line x1="0" y1="70" x2="680" y2="70" stroke="#E5E7EB" stroke-width="1" />
  </g>

  <!-- Medicine 3 -->
  <g transform="translate(60, 560)">
    <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" fill="#111827">3. Tab. Disprin / Lowplat (Aspirin) 75mg</text>
    <text x="25" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600" fill="#047857">1 Tab  -  O.D (0 + 1 + 0)  -  After Lunch  ×  1 Month</text>
    <text x="25" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#6B7280">(Blood thinner for heart protection · Take after afternoon meal)</text>
    <line x1="0" y1="70" x2="680" y2="70" stroke="#E5E7EB" stroke-width="1" />
  </g>

  <!-- Advice Box -->
  <rect x="50" y="670" width="700" height="130" rx="8" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1.5" />
  <text x="75" y="700" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="700" fill="#065F46">Chronic Care Instructions:</text>
  <text x="75" y="730" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#047857">• Check fasting blood sugar every Sunday and record in dairy.</text>
  <text x="75" y="755" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#047857">• Strictly minimize salt in food; avoid bakery biscuits and sweet tea.</text>
  <text x="75" y="780" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#047857">• 30 minutes daily brisk walking in the morning or evening.</text>

  <!-- Doctor Stamp and Signature -->
  <g transform="translate(530, 840)">
    <circle cx="90" cy="50" r="42" fill="none" stroke="#065F46" stroke-width="2" stroke-dasharray="4 2" opacity="0.7"/>
    <text x="90" y="45" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#065F46">CARDIOLOGIST</text>
    <text x="90" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" text-anchor="middle" fill="#065F46">KARACHI</text>
    <path d="M30 65 Q 60 15 110 45 T 160 35" fill="none" stroke="#047857" stroke-width="2.5" stroke-linecap="round"/>
    <text x="90" y="105" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" text-anchor="middle" fill="#374151">Dr. Imran Khan</text>
  </g>

  <line x1="45" y1="980" x2="755" y2="980" stroke="#E5E7EB" stroke-width="1" />
  <text x="400" y="1005" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" text-anchor="middle" fill="#9CA3AF">National Heart &amp; Diabetic Center Karachi · Helpline: 021-35889922</text>
</svg>
`;

export const SAMPLE_PRESCRIPTIONS: SamplePrescription[] = [
  {
    id: 'sample-fever',
    title: {
      en: 'Fever & Infection',
      romanUrdu: 'Bukhar Aur Infection',
      ur: 'بخار اور انفیکشن',
    },
    condition: {
      en: 'Panadol · Augmentin · Arinac',
      romanUrdu: 'Panadol · Augmentin · Arinac',
      ur: 'پیناڈول · آگمنٹن · ایرینیک',
    },
    tag: 'Sample 1',
    imageSvgDataUrl: createSvgDataUrl(sample1Svg),
    doctorName: 'Dr. Tariq Mahmood (General Physician)',
    clinicName: 'Al-Shifa Medical & Family Clinic, Rawalpindi',
    date: '18-Oct-2026',
    analysis: {
      doctorName: 'Dr. Tariq Mahmood',
      clinicName: 'Al-Shifa Medical & Family Clinic',
      date: '18-Oct-2026',
      patientName: 'Muhammad Aslam (42 Yrs)',
      medicines: [
        {
          id: 'med-1',
          name: 'Panadol',
          genericName: 'Paracetamol 500mg',
          form: 'Tablet',
          strength: '500mg',
          purpose: {
            en: 'For fever reduction, body aches, and relief from throat pain.',
            romanUrdu: 'Bukhar kam karne, jism ke dard aur galay ki jalan ke liye.',
            ur: 'بخار اتارنے، جسم اور پٹھوں کے درد اور گلے کی تکلیف میں آرام کے لیے۔',
          },
          timing: {
            morning: true,
            afternoon: true,
            night: true,
            withFood: 'after',
            dosageAmount: '1 Tablet (1 Goli)',
            instructions: {
              en: 'Take 1 tablet after meals 3 times a day: Morning, Afternoon, and Night.',
              romanUrdu: 'Khana khane ke baad din mein 3 martaba ek goli lein: Subah, Dopahar aur Raat.',
              ur: 'دن میں تین مرتبہ کھانا کھانے کے بعد ایک گولی پانی کے ساتھ لیں: صبح، دوپہر اور رات۔',
            },
          },
          duration: {
            en: '4 Days (or until fever subsides)',
            romanUrdu: '4 Din tak (jab tak bukhar theek na ho)',
            ur: '۴ دن تک (یا جب تک بخار مکمل نہ اتر جائے)',
          },
          precautions: {
            en: 'Do not exceed 4 tablets in 24 hours. Always take after eating food to protect your stomach.',
            romanUrdu: '24 ghante mein 4 se zyada goliyan na lein. Hamesha khana khane ke baad lein.',
            ur: '۲۴ گھنٹوں میں ۴ سے زیادہ گولیاں ہرگز نہ لیں۔ معدے کی حفاظت کے لیے ہمیشہ کھانا کھانے کے بعد لیں۔',
          },
        },
        {
          id: 'med-2',
          name: 'Augmentin',
          genericName: 'Co-Amoxiclav (Amoxicillin + Clavulanic Acid 625mg)',
          form: 'Tablet',
          strength: '625mg',
          purpose: {
            en: 'Antibiotic to clear bacterial infection in the throat, chest, and sinuses.',
            romanUrdu: 'Galay aur seenay ke infection ko khatam karne wali antibiotic dawa.',
            ur: 'گلے، چھاتی اور سانس کی نالیوں کا انفیکشن ختم کرنے والی اینٹی بائیوٹک دوا۔',
          },
          timing: {
            morning: true,
            afternoon: false,
            night: true,
            withFood: 'after',
            dosageAmount: '1 Tablet (1 Goli)',
            instructions: {
              en: 'Take 1 tablet after meals twice a day: Morning and Night (approx 12 hours apart).',
              romanUrdu: 'Subah aur Raat khana khane ke baad 1 goli lein (12 ghante ke farq se).',
              ur: 'صبح اور رات کھانا کھانے کے بعد ایک گولی لیں (تقریباً ۱۲ گھنٹے کے وقفے سے)۔',
            },
          },
          duration: {
            en: 'Strictly 5 Days (Complete full course)',
            romanUrdu: 'Laazmi 5 Din (Poora course mukammal karein)',
            ur: 'لازمی ۵ دن (طبیعت سنبھلنے کے باوجود کورس مکمل کریں)',
          },
          precautions: {
            en: 'CRITICAL: Finish all 5 days even if feeling 100% fine. Stopping early causes antibiotic resistance.',
            romanUrdu: 'Ahem Hidayat: Tabiyat theek hone par bhi 5 din ka course adhoora mat chhorein.',
            ur: 'انتہائی ضروری: طبیعت ٹھیک لگنے پر بھی دوا بیچ میں مت چھوڑیں تاکہ انفیکشن دوبارہ نہ لوٹے۔',
          },
        },
        {
          id: 'med-3',
          name: 'Arinac',
          genericName: 'Ibuprofen + Pseudoephedrine',
          form: 'Tablet',
          strength: 'Standard',
          purpose: {
            en: 'To clear blocked nose, sinus congestion, and severe headache.',
            romanUrdu: 'Band naak kholne, nazla zukaam aur sar dard door karne ke liye.',
            ur: 'بند ناک کھولنے، نزلہ زکام اور شدید سر درد کو فوری دور کرنے کے لیے۔',
          },
          timing: {
            morning: false,
            afternoon: false,
            night: false,
            withFood: 'after',
            dosageAmount: '1 Tablet (As needed)',
            instructions: {
              en: 'Take 1 tablet after food only when nasal blockage or severe headache occurs.',
              romanUrdu: 'Sirf zaroorat ke waqt khane ke baad 1 goli lein jab naak band ho ya sar dard ho.',
              ur: 'صرف ضرورت کے وقت کھانا کھانے کے بعد ایک گولی لیں جب نزلہ یا شدید سر درد ہو۔',
            },
          },
          duration: {
            en: 'As needed (Maximum 3 days)',
            romanUrdu: 'Zaroorat ke mutabiq (Zyada se zyada 3 din)',
            ur: 'حسبِ ضرورت (زیادہ سے زیادہ ۳ دن)',
          },
          precautions: {
            en: 'Do not take on an empty stomach. May cause mild wakefulness, so avoid right before sleeping.',
            romanUrdu: 'Khali pet na lein. Sone se foran pehle lene se neend mein takleef ho sakti hai.',
            ur: 'خالی پیٹ ہرگز نہ لیں۔ سونے سے فوراً پہلے لینے سے گریز فرمائیں۔',
          },
        },
      ],
      overallAdvice: {
        en: 'Drink warm water with honey and lemon. Rest in a warm room. Avoid iced beverages and cold drafts for 4 days.',
        romanUrdu: 'Garm paani, qahwa ya soop piyein. Thandi hawa aur thanday mashroobaat se 4 din tak sakht parhez karein.',
        ur: 'گرم پانی، قہوہ یا نیم گرم یخنی پیئیں۔ ٹھنڈی ہوا، آئس کریم اور ٹھنڈے مشروبات سے ۴ دن تک مکمل پرہیز کریں۔',
      },
      warnings: [
        'Complete the full 5-day antibiotic course without missing a single tablet.',
        'Drink plenty of warm liquids to thin mucous secretions.',
        'If fever exceeds 102°F or persists after 4 days, consult Dr. Tariq immediately.',
      ],
      pureUrduSpeechText:
        'السلام علیکم۔ آپ کے نسخے میں ڈاکٹر نے تین دوائیاں لکھی ہیں۔ پہلی دوائی پیناڈول ہے جو بخار اور جسم کے درد کے لیے ہے۔ صبح، دوپہر اور رات کو کھانا کھانے کے بعد ایک گولی پانی کے ساتھ لیں۔ دوسری دوائی آگمنٹن اینٹی بائیوٹک ہے جو گلے اور چھاتی کا انفیکشن ختم کرنے کے لیے ہے۔ یہ صبح اور رات کو کھانے کے بعد ایک گولی لینی ہے، اور پانچ دن کا پورا کورس لازمی مکمل کرنا ہے۔ تیسری دوا ایرینیک ہے جو بند ناک اور سر درد کے لیے صرف ضرورت کے وقت لینی ہے۔ ٹھنڈے پانی سے پرہیز کریں اور گرم پانی پیئیں۔ شکریہ۔',
      englishSpeechText:
        'Hello. Your prescription has three medications. First is Panadol for fever and pain, taken one tablet after food three times a day: morning, afternoon, and night. Second is Augmentin antibiotic for the infection, taken one tablet after food twice daily in morning and night for five full days. Third is Arinac for nasal congestion to take only if needed. Drink warm fluids and avoid cold items. Thank you.',
    },
  },

  {
    id: 'sample-gastric',
    title: {
      en: 'Stomach Acidity & Gastritis',
      romanUrdu: 'Meda Aur Tezabiat',
      ur: 'معدے کی تیزابیت اور جلن',
    },
    condition: {
      en: 'Risek · Gaviscon · Motilium',
      romanUrdu: 'Risek · Gaviscon · Motilium',
      ur: 'رائزک · گیویسکون · موٹیلیم',
    },
    tag: 'Sample 2',
    imageSvgDataUrl: createSvgDataUrl(sample2Svg),
    doctorName: 'Dr. Ayesha Siddiqui (Gastroenterologist)',
    clinicName: 'Medicare Gastroenterology Clinic, Lahore',
    date: '17-Oct-2026',
    analysis: {
      doctorName: 'Dr. Ayesha Siddiqui',
      clinicName: 'Medicare Gastroenterology Clinic',
      date: '17-Oct-2026',
      patientName: 'Fatima Bibi (36 Yrs)',
      medicines: [
        {
          id: 'med-g1',
          name: 'Risek',
          genericName: 'Omeprazole 20mg',
          form: 'Capsule',
          strength: '20mg',
          purpose: {
            en: 'Reduces excessive stomach acid production and heals gastric lining irritation.',
            romanUrdu: 'Mede ki tezabiat aur jalan ko khatam karke mede ko araam deta hai.',
            ur: 'معدے کی اضافی تیزابیت اور جلن کو ختم کر کے زخموں اور سوجن کو ٹھیک کرتا ہے۔',
          },
          timing: {
            morning: true,
            afternoon: false,
            night: false,
            withFood: 'before',
            dosageAmount: '1 Capsule (Nehar Munh)',
            instructions: {
              en: 'Take 1 capsule every morning on an empty stomach 30 minutes before breakfast.',
              romanUrdu: 'Rozana subah nashta karne se aadha ghanta pehle nehar munh 1 capsule lein.',
              ur: 'روزانہ صبح ناشتہ کرنے سے آدھا گھنٹہ پہلے نہار منہ ایک کیپسول پانی کے ساتھ لیں۔',
            },
          },
          duration: {
            en: '14 Days',
            romanUrdu: '14 Din tak musalsal',
            ur: '۱۴ دن تک مسلسل',
          },
          precautions: {
            en: 'Must swallow capsule whole with water. Do not crush, chew, or open the pellets.',
            romanUrdu: 'Capsule ko chabana nahi hai, seedha paani ke sath nigal lein.',
            ur: 'کیپسول کو چبانا یا کھولنا نہیں ہے، سادہ پانی کے ساتھ پورا نگل لیں۔',
          },
        },
        {
          id: 'med-g2',
          name: 'Gaviscon',
          genericName: 'Sodium Alginate + Potassium Bicarbonate',
          form: 'Syrup',
          strength: 'Suspension',
          purpose: {
            en: 'Creates a protective cooling barrier over stomach acid to stop reflux into chest & throat.',
            romanUrdu: 'Seenay ki jalan aur khatti dakaroon ko foran thanda karta hai.',
            ur: 'سینے کی جلن، کھٹی ڈکاروں اور حلق میں تیزاب آنے کو فوری روکتا اور ٹھنڈک پہنچاتا ہے۔',
          },
          timing: {
            morning: false,
            afternoon: true,
            night: true,
            withFood: 'after',
            dosageAmount: '2 Teaspoons (10ml)',
            instructions: {
              en: 'Take 2 teaspoons after lunch and 2 teaspoons after dinner or before sleeping.',
              romanUrdu: 'Dopahar aur Raat khana khane ke baad 2 chammach peeyein.',
              ur: 'دوپہر اور رات کھانا کھانے کے بعد اور سونے سے پہلے دو چمچ پیئیں۔',
            },
          },
          duration: {
            en: '10 Days (or when acidity strikes)',
            romanUrdu: '10 Din tak (ya jab tezabiat mehsoos ho)',
            ur: '۱۰ دن تک (یا جب بھی سینے میں جلن اور تیزابیت محسوس ہو)',
          },
          precautions: {
            en: 'Shake bottle well before pouring. Do not drink water immediately after the syrup to let it coat.',
            romanUrdu: 'Sharbatt peene ke foran baad paani na piyein taake dawa mede par asar kare.',
            ur: 'شربت پینے کے فوراً بعد پانی نہ پیئیں تاکہ دوا معدے اور خوراک کی نالی پر اثر کر سکے۔',
          },
        },
        {
          id: 'med-g3',
          name: 'Motilium',
          genericName: 'Domperidone 10mg',
          form: 'Tablet',
          strength: '10mg',
          purpose: {
            en: 'Speeds up stomach emptying to prevent heavy bloating, nausea, and vomiting feeling.',
            romanUrdu: 'Mede ka bhari-pan, matli aur ulti aane ki kaifiat ko theek karta hai.',
            ur: 'معدے کا بھاری پن، قے اور متلی کا احساس ختم کرتا ہے اور ہاضمہ تیز کرتا ہے۔',
          },
          timing: {
            morning: false,
            afternoon: true,
            night: true,
            withFood: 'before',
            dosageAmount: '1 Tablet (1 Goli)',
            instructions: {
              en: 'Take 1 tablet 15 minutes before lunch and dinner.',
              romanUrdu: 'Dopahar aur Raat ka khana khane se 15 minute pehle 1 goli lein.',
              ur: 'دوپہر اور رات کا کھانا کھانے سے ۱۵ منٹ پہلے ایک گولی لیں۔',
            },
          },
          duration: {
            en: '7 Days',
            romanUrdu: '7 Din tak',
            ur: '۷ دن تک',
          },
          precautions: {
            en: 'Take before meals rather than after meals for optimal effectiveness.',
            romanUrdu: 'Khane se pehle lena zaroori hai taake hazma theek rahe.',
            ur: 'بہترین نتائج کے لیے کھانا کھانے سے پہلے لینا ضروری ہے۔',
          },
        },
      ],
      overallAdvice: {
        en: 'Avoid spicy, deep-fried snacks, samosas, and caffeinated sodas. Eat dinner 2 hours before lying down.',
        romanUrdu: 'Mirch masaalay, tale hue khaney aur cola botlon se parhez karein. Raat khane ke foran baad bistar par na jayen.',
        ur: 'تیز مرچ مصالحے، تلی ہوئی اشیاء اور کولڈ ڈرنکس سے مکمل پرہیز کریں۔ رات کے کھانے اور سونے میں کم از کم ۲ گھنٹے کا وقفہ رکھیں۔',
      },
      warnings: [
        'Take Risek strictly on an empty stomach every morning before tea or breakfast.',
        'Do not lie down flat right after having your meals.',
        'If pain radiates to the back or vomiting occurs, seek immediate clinical review.',
      ],
      pureUrduSpeechText:
        'السلام علیکم۔ آپ کے نسخے میں معدے کی تیزابیت اور جلن کی تین دوائیاں ہیں۔ پہلی دوا رائزک بیس ملی گرام ہے، یہ روزانہ صبح ناشتے سے آدھا گھنٹہ پہلے نہار منہ ایک کیپسول پانی کے ساتھ لیں۔ دوسری دوا موٹیلیم ہے جو متلی اور بھاری پن کے لیے کھانے سے پندرہ منٹ پہلے ایک گولی لینی ہے۔ تیسری دوا گیویسکون شربت ہے، یہ دوپہر اور رات کھانے کے بعد دو چمچ پیئیں۔ تلی ہوئی اور مرچوں والی چیزوں سے پرہیز کریں اور رات کو کھانے کے فوراً بعد نہ سوئیں۔ شکریہ۔',
      englishSpeechText:
        'Hello. Your prescription contains three medications for acid reflux and gastritis. First is Risek twenty milligram capsule, take one capsule every morning thirty minutes before breakfast on an empty stomach. Second is Motilium tablet taken fifteen minutes before lunch and dinner. Third is Gaviscon syrup taken two teaspoons after lunch and dinner for cooling heartburn. Avoid oily foods and do not lie down immediately after dinner. Thank you.',
    },
  },

  {
    id: 'sample-chronic',
    title: {
      en: 'Diabetes & High Blood Pressure',
      romanUrdu: 'Sugar Aur BP Ki Dawai',
      ur: 'شوگر اور بلڈ پریشر کی پرچی',
    },
    condition: {
      en: 'Glucophage · Norvasc · Disprin',
      romanUrdu: 'Glucophage · Norvasc · Disprin',
      ur: 'گلوکوفیج · نورواسک · ڈسپرین',
    },
    tag: 'Sample 3',
    imageSvgDataUrl: createSvgDataUrl(sample3Svg),
    doctorName: 'Dr. Imran Khan (Cardiologist)',
    clinicName: 'National Heart & Diabetic Center, Karachi',
    date: '16-Oct-2026',
    analysis: {
      doctorName: 'Dr. Imran Khan',
      clinicName: 'National Heart & Diabetic Center',
      date: '16-Oct-2026',
      patientName: 'Haji Abdul Rehman (58 Yrs)',
      medicines: [
        {
          id: 'med-c1',
          name: 'Norvasc',
          genericName: 'Amlodipine 5mg',
          form: 'Tablet',
          strength: '5mg',
          purpose: {
            en: 'Relaxes arterial blood vessels to lower blood pressure and protect against heart strain.',
            romanUrdu: 'Khoon ki nalion ko khol kar blood pressure ko mamool par lata hai.',
            ur: 'خون کی نالیوں کو نرم کر کے بلڈ پریشر کو معمول پر لاتا ہے اور دل پر بوجھ کم کرتا ہے۔',
          },
          timing: {
            morning: true,
            afternoon: false,
            night: false,
            withFood: 'after',
            dosageAmount: '1 Tablet (1 Goli)',
            instructions: {
              en: 'Take 1 tablet every morning after breakfast at the same fixed hour.',
              romanUrdu: 'Rozana subah nashtay ke baad ek makhsoos waqt par 1 goli lein.',
              ur: 'روزانہ صبح ناشتے کے بعد باقاعدگی سے ایک ہی وقت پر ایک گولی لیں۔',
            },
          },
          duration: {
            en: '1 Month (Ongoing daily therapy)',
            romanUrdu: '1 Mahina (Rozana baqaedgi se)',
            ur: '۱ مہینہ (روزانہ مسلسل بغیر ناغہ کیے)',
          },
          precautions: {
            en: 'Do not stop abruptly even if BP feels normal. BP medicines work by continuous control.',
            romanUrdu: 'BP theek hone par bhi dawai khud se band na karein.',
            ur: 'بلڈ پریشر نارمل لگنے پر بھی دوا خود سے ہرگز بند نہ کریں۔',
          },
        },
        {
          id: 'med-c2',
          name: 'Glucophage',
          genericName: 'Metformin 500mg',
          form: 'Tablet',
          strength: '500mg',
          purpose: {
            en: 'Improves insulin sensitivity and keeps blood glucose within safe diabetic limits.',
            romanUrdu: 'Khoon mein sugar ki miqdaar ko control mein rakhta hai.',
            ur: 'خون میں شوگر کی مقدار کو محفوظ سطح پر لاتا ہے اور انسولین کی صلاحیت بڑھاتا ہے۔',
          },
          timing: {
            morning: false,
            afternoon: false,
            night: true,
            withFood: 'with',
            dosageAmount: '1 Tablet (Raat khane ke sath)',
            instructions: {
              en: 'Take 1 tablet right with your evening dinner (in the middle of meal) to avoid upset stomach.',
              romanUrdu: 'Raat khane ke darmiyan 1 goli lein taake pet kharab na ho.',
              ur: 'رات کے کھانے کے دوران (کھانے کے بالکل ساتھ) ایک گولی لیں تاکہ پیٹ میں گیس یا مروڑ نہ ہو۔',
            },
          },
          duration: {
            en: '1 Month',
            romanUrdu: '1 Mahina',
            ur: '۱ مہینہ',
          },
          precautions: {
            en: 'Always take with food, never on an empty stomach. Drink plenty of water throughout the day.',
            romanUrdu: 'Hamesha khane ke sath lein, khali pet hargiz na lein.',
            ur: 'ہمیشہ کھانے کے ساتھ لیں، خالی پیٹ ہرگز نہ لیں۔ دن بھر مناسب پانی پیئیں۔',
          },
        },
        {
          id: 'med-c3',
          name: 'Disprin / Lowplat',
          genericName: 'Aspirin (Cardio) 75mg',
          form: 'Tablet',
          strength: '75mg',
          purpose: {
            en: 'Prevents unwanted blood clotting to safeguard heart arteries and circulation.',
            romanUrdu: 'Khoon ko patla rakh kar dil ke dauray aur attack se hifazat karta hai.',
            ur: 'خون کو پتلا رکھ کر دل کی نالیوں میں لوتھڑے بننے سے روکتا اور دل کو محفوظ رکھتا ہے۔',
          },
          timing: {
            morning: false,
            afternoon: true,
            night: false,
            withFood: 'after',
            dosageAmount: '1 Tablet (1 Goli)',
            instructions: {
              en: 'Take 1 tablet after lunch with a full glass of water.',
              romanUrdu: 'Dopahar khana khane ke baad ek goli paani ke sath lein.',
              ur: 'دوپہر کا کھانا کھانے کے بعد ایک گلاس پانی کے ساتھ ایک گولی لیں۔',
            },
          },
          duration: {
            en: '1 Month',
            romanUrdu: '1 Mahina',
            ur: '۱ مہینہ',
          },
          precautions: {
            en: 'Always take with a full meal to protect gastric lining.',
            romanUrdu: 'Pet bhar kar khana khane ke baad hi lein.',
            ur: 'ہمیشہ پیٹ بھر کر کھانا کھانے کے بعد ہی لیں تاکہ معدہ محفوظ رہے۔',
          },
        },
      ],
      overallAdvice: {
        en: 'Strictly limit dietary salt and processed sugars. Walk for 30 minutes every morning. Check blood sugar weekly.',
        romanUrdu: 'Namak aur cheeni se sakht parhez karein. Rozana subah 30 minute tezi se chalen aur har hafte sugar check karein.',
        ur: 'کھانے میں نمک اور چینی کا استعمال انتہائی کم کریں۔ روزانہ صبح ۳۰ منٹ تیز قدموں سے چہل قدمی کریں اور ہفتہ وار شوگر اور بلڈ پریشر نوٹ کریں۔',
      },
      warnings: [
        'Take BP and Diabetes medications at the exact same hour every single day.',
        'Do not skip meals after taking diabetic medication.',
        'Log your blood pressure readings in a notebook for your next appointment.',
      ],
      pureUrduSpeechText:
        'السلام علیکم۔ یہ نسخہ شوگر اور بلڈ پریشر کو کنٹرول میں رکھنے کے لیے ہے۔ پہلی دوا نورواسک پانچ ملی گرام ہے جو بلڈ پریشر کے لیے ہے، یہ روزانہ صبح ناشتے کے بعد ایک گولی لیں۔ دوسری دوا ڈسپرین ہے جو دل کی حفاظت کے لیے دوپہر کے کھانے کے بعد ایک گولی لینی ہے۔ تیسری دوا گلوکوفیج پانچ سو ملی گرام ہے جو شوگر کے لیے ہے، یہ رات کو کھانے کے بالکل درمیان میں ایک گولی لیں۔ نمک اور میٹھی چیزوں سے پرہیز کریں، اور ہر ہفتے شوگر اور بلڈ پریشر چیک کروائیں۔ شکریہ۔',
      englishSpeechText:
        'Hello. This prescription is for controlling blood pressure and diabetes. First is Norvasc five milligrams taken once daily after breakfast in the morning. Second is Disprin seventy-five milligrams taken after lunch for heart protection. Third is Glucophage five hundred milligrams taken with dinner for sugar control. Restrict salt and sweets, and test your blood pressure weekly. Thank you.',
    },
  },
];
