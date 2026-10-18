export type Language = 'en' | 'romanUrdu' | 'ur';

export interface MultilingualText {
  en: string;
  romanUrdu: string;
  ur: string;
}

export type FoodTiming = 'before' | 'after' | 'with' | 'anytime';

export interface MedicineTiming {
  morning: boolean;
  afternoon: boolean;
  night: boolean;
  withFood: FoodTiming;
  dosageAmount: string;
  instructions: MultilingualText;
}

export interface Medicine {
  id: string;
  name: string;
  genericName?: string;
  form: string; // Tablet, Capsule, Syrup, Drops, Inhaler, etc.
  strength?: string;
  purpose: MultilingualText;
  timing: MedicineTiming;
  duration: MultilingualText;
  precautions: MultilingualText;
}

export interface PrescriptionAnalysis {
  doctorName?: string;
  clinicName?: string;
  date?: string;
  patientName?: string;
  medicines: Medicine[];
  overallAdvice: MultilingualText;
  warnings?: string[];
  pureUrduSpeechText: string;
  englishSpeechText: string;
}

export interface SamplePrescription {
  id: string;
  title: MultilingualText;
  condition: MultilingualText;
  tag: string;
  imageSvgDataUrl: string;
  doctorName: string;
  clinicName: string;
  date: string;
  analysis: PrescriptionAnalysis;
}

export interface CompressionResult {
  dataUrl: string;
  base64: string;
  mimeType: string;
  originalSizeKB: number;
  compressedSizeKB: number;
  width: number;
  height: number;
}
