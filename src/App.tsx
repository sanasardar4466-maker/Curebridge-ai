import React, { useState, useEffect, useRef } from 'react';
import { Language, PrescriptionAnalysis, SamplePrescription, CompressionResult, Medicine } from './types';
import { translations } from './translations';
import { SAMPLE_PRESCRIPTIONS } from './data/samplePrescriptions';
import { Navbar } from './components/Navbar';
import { PrescriptionDropzone } from './components/PrescriptionDropzone';
import { SamplePrescriptionsBar } from './components/SamplePrescriptionsBar';
import { AudioPlayerBanner } from './components/AudioPlayerBanner';
import { PrescriptionResults } from './components/PrescriptionResults';
import { LoadingScanner } from './components/LoadingScanner';
import { ErrorModal } from './components/ErrorModal';
import { EmergencyHelplineCard } from './components/EmergencyHelplineCard';
import { HowItWorksGuide } from './components/HowItWorksGuide';
import { Footer } from './components/Footer';
import { playSpeech, stopSpeech } from './utils/speechEngine';
import { Stethoscope } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeImageSrc, setActiveImageSrc] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<PrescriptionAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);

  // For retry logic
  const [lastSelectedImage, setLastSelectedImage] = useState<CompressionResult | null>(null);
  const [lastSelectedSample, setLastSelectedSample] = useState<SamplePrescription | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const t = translations[currentLang];
  const isUrdu = currentLang === 'ur';

  // Synchronize document dir and title language attributes
  useEffect(() => {
    document.documentElement.lang = currentLang === 'ur' ? 'ur' : currentLang === 'romanUrdu' ? 'ur-Latn' : 'en';
    document.documentElement.dir = currentLang === 'ur' ? 'rtl' : 'ltr';
  }, [currentLang]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  // Stop speech if language changes during playback to prevent voice mismatch
  const handleLanguageChange = (newLang: Language) => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
    }
    setCurrentLang(newLang);
  };

  // Process Custom Uploaded Image
  const handleImageSelected = async (result: CompressionResult) => {
    stopSpeech();
    setIsPlayingAudio(false);
    setSelectedSampleId(null);
    setLastSelectedSample(null);
    setLastSelectedImage(result);
    setActiveImageSrc(result.dataUrl);
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/analyze-prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: result.base64,
          mimeType: result.mimeType,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze prescription');
      }

      setAnalysis(data.data);
      setIsLoading(false);

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: any) {
      console.error('Prescription processing error:', err);
      setIsLoading(false);
      setErrorMessage(
        err.message ||
          (currentLang === 'en'
            ? 'We could not analyze this prescription image. Please ensure the handwriting is visible and retry.'
            : currentLang === 'romanUrdu'
            ? 'Parchi ko parha nahi ja saka. Baraye meharbani saaf tasweer ke sath dubara koshish karein.'
            : 'نسخہ پڑھنے میں ناکامی ہوئی۔ براہِ کرم واضح تصویر کے ساتھ دوبارہ کوشش فرمائیں۔')
      );
    }
  };

  // Process Sample Prescription Click
  const handleSelectSample = (sample: SamplePrescription) => {
    stopSpeech();
    setIsPlayingAudio(false);
    setSelectedSampleId(sample.id);
    setLastSelectedSample(sample);
    setLastSelectedImage(null);
    setActiveImageSrc(sample.imageSvgDataUrl);
    setErrorMessage(null);
    setIsLoading(true);

    // Provide rapid 1.5s scanning feedback (well within the 3-5s requirement)
    setTimeout(() => {
      setAnalysis(sample.analysis);
      setIsLoading(false);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1500);
  };

  // Retry previous failed analysis
  const handleRetry = () => {
    setErrorMessage(null);
    if (lastSelectedImage) {
      handleImageSelected(lastSelectedImage);
    } else if (lastSelectedSample) {
      handleSelectSample(lastSelectedSample);
    }
  };

  // Audio Play / Stop Toggle
  const handleToggleAudio = () => {
    if (!analysis) return;

    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      return;
    }

    const isUrduMode = currentLang === 'ur' || currentLang === 'romanUrdu';
    const textToSpeak = isUrduMode ? analysis.pureUrduSpeechText : analysis.englishSpeechText;

    playSpeech({
      text: textToSpeak,
      language: currentLang,
      pureUrduFallback: analysis.pureUrduSpeechText,
      englishFallback: analysis.englishSpeechText,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
      onError: (err) => {
        console.error('Speech playback error:', err);
        setIsPlayingAudio(false);
      },
    });
  };

  // Play narration for a single medicine
  const handlePlaySingleMedicine = (med: Medicine) => {
    stopSpeech();
    setIsPlayingAudio(false);

    let speechText = '';
    const isUrduMode = currentLang === 'ur' || currentLang === 'romanUrdu';

    if (isUrduMode) {
      // Pure Urdu script for the medicine with natural breathing pauses
      speechText = `${med.name}۔ ${med.purpose.ur}۔ ${med.timing.instructions.ur}۔ ضروری احتیاط: ${med.precautions.ur}۔`;
    } else {
      speechText = `${med.name}. ${med.purpose.en}. ${med.timing.instructions.en}. Caution: ${med.precautions.en}.`;
    }

    playSpeech({
      text: speechText,
      language: currentLang,
      pureUrduFallback: speechText,
      englishFallback: speechText,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  const handleScanAnother = () => {
    stopSpeech();
    setIsPlayingAudio(false);
    setAnalysis(null);
    setActiveImageSrc(null);
    setSelectedSampleId(null);
    setErrorMessage(null);
    dropzoneRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToSamples = () => {
    const el = document.getElementById('sample-prescriptions');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToHelpline = () => {
    const el = document.getElementById('emergency-helpline');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-slate-50 text-slate-900 ${
        isUrdu ? 'font-urdu' : ''
      }`}
    >
      {/* Navbar with 3-Zone contract & instant 3-Language switcher */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onReset={handleScanAnother}
        onScrollToSamples={handleScrollToSamples}
        onScrollToHowItWorks={handleScrollToHowItWorks}
        onScrollToHelpline={handleScrollToHelpline}
      />

      {/* Main Responsive Wrapper with Strict Overflow Guard */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 text-xs sm:text-sm font-bold mb-4 shadow-xs">
            <Stethoscope className="w-4 h-4 text-emerald-700" />
            <span>
              {currentLang === 'en'
                ? 'Free Medical Prescription Visualizer & Voice Assistant'
                : currentLang === 'romanUrdu'
                ? 'Dawai Ki Parchi Samjhne Ka Asaan Zariya'
                : 'مریضوں کے لیے نسخہ سمجھنے کا مفت تصویری اور صوتی معاون'}
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4 ${
              isUrdu ? 'font-urdu-title text-4xl sm:text-5xl' : ''
            }`}
          >
            {t.heroTitle}
          </h1>

          <p className={`text-base sm:text-xl text-slate-600 leading-relaxed ${isUrdu ? 'font-urdu text-lg' : ''}`}>
            {t.heroSubtitle}
          </p>
        </div>

        {/* Prescription Upload Dropzone */}
        <div ref={dropzoneRef} className="max-w-4xl mx-auto">
          <PrescriptionDropzone
            currentLang={currentLang}
            onImageSelected={handleImageSelected}
            isLoading={isLoading}
          />
        </div>

        {/* Loading Spinner / Scanning State */}
        {isLoading && <LoadingScanner currentLang={currentLang} />}

        {/* Output Analysis Display */}
        {analysis && !isLoading && (
          <div ref={resultsRef} className="mt-12 sm:mt-16 max-w-5xl mx-auto scroll-mt-24">
            {/* Prominent Smart TTS Audio Engine Banner */}
            <AudioPlayerBanner
              currentLang={currentLang}
              analysis={analysis}
              isPlaying={isPlayingAudio}
              onTogglePlay={handleToggleAudio}
            />

            {/* 3 Structured Visual Output Sections (includes Save / WhatsApp export bar) */}
            <PrescriptionResults
              currentLang={currentLang}
              analysis={analysis}
              prescriptionImageSrc={activeImageSrc}
              onPlaySingleMedicine={handlePlaySingleMedicine}
              onScanAnother={handleScanAnother}
            />
          </div>
        )}

        {/* Pre-loaded Sample Prescriptions Section */}
        <div className="max-w-5xl mx-auto">
          <SamplePrescriptionsBar
            currentLang={currentLang}
            onSelectSample={handleSelectSample}
            selectedSampleId={selectedSampleId}
            isLoading={isLoading}
          />
        </div>

        {/* Emergency Helpline Section */}
        <div className="max-w-5xl mx-auto">
          <EmergencyHelplineCard currentLang={currentLang} />
        </div>

        {/* How It Works Guide for low-literacy patients */}
        <div className="max-w-5xl mx-auto">
          <HowItWorksGuide currentLang={currentLang} />
        </div>
      </main>

      {/* Friendly Error & Retry Pop-up Modal */}
      {errorMessage && (
        <ErrorModal
          currentLang={currentLang}
          errorMessage={errorMessage}
          onRetry={handleRetry}
          onUploadNew={handleScanAnother}
          onClose={() => setErrorMessage(null)}
        />
      )}

      {/* Footer & Medical Advisory */}
      <Footer currentLang={currentLang} />
    </div>
  );
}
