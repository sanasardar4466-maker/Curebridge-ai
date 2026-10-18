import React, { useRef, useState } from 'react';
import { Language, CompressionResult } from '../types';
import { translations } from '../translations';
import { compressPrescriptionImage } from '../utils/imageCompressor';
import { UploadCloud, Camera, Image as ImageIcon, Zap, AlertCircle, Sparkles } from 'lucide-react';

interface PrescriptionDropzoneProps {
  currentLang: Language;
  onImageSelected: (result: CompressionResult) => void;
  isLoading: boolean;
}

export const PrescriptionDropzone: React.FC<PrescriptionDropzoneProps> = ({
  currentLang,
  onImageSelected,
  isLoading,
}) => {
  const t = translations[currentLang];
  const isUrdu = currentLang === 'ur';

  const [isDragOver, setIsDragOver] = useState(false);
  const [compressionInfo, setCompressionInfo] = useState<string | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage(
        currentLang === 'en'
          ? 'Please upload an image file (JPG, PNG, WebP).'
          : currentLang === 'romanUrdu'
          ? 'Baraye meharbani sirf tasweer (photo) upload karein.'
          : 'براہِ کرم صرف تصویر (جے پی جی، پی این جی) اپلوڈ فرمائیں۔'
      );
      return;
    }

    try {
      setErrorMessage(null);
      setCompressing(true);

      const result = await compressPrescriptionImage(file, 1024, 1024, 0.82);

      const savedPercent = Math.round(
        ((result.originalSizeKB - result.compressedSizeKB) / Math.max(result.originalSizeKB, 1)) * 100
      );

      const infoText =
        currentLang === 'en'
          ? `Downscaled: ${result.originalSizeKB} KB → ${result.compressedSizeKB} KB (${Math.max(savedPercent, 0)}% lighter) for 3-second speed.`
          : currentLang === 'romanUrdu'
          ? `Photo size: ${result.originalSizeKB} KB se kam ho kar ${result.compressedSizeKB} KB ho gaya (3 second analysis ke liye).`
          : `تصویر کا سائز ${result.originalSizeKB} کے بی سے کم ہو کر ${result.compressedSizeKB} کے بی ہو گیا ہے۔`;

      setCompressionInfo(infoText);
      setCompressing(false);

      // Notify parent to initiate analysis
      onImageSelected(result);
    } catch (err: any) {
      console.error('Compression failed:', err);
      setCompressing(false);
      setErrorMessage(
        currentLang === 'en'
          ? 'Could not process this image. Please try another photo.'
          : currentLang === 'romanUrdu'
          ? 'Tasweer ko parha nahi ja saka. Baraye meharbani doosri photo chunein.'
          : 'اس تصویر کا پروسیس نہیں ہو سکا۔ دوسری تصویر منتخب کریں۔'
      );
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <section className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-3xl border-3 border-dashed transition-all duration-200 p-6 sm:p-10 text-center ${
          isDragOver
            ? 'border-emerald-600 bg-emerald-100/60 scale-[1.01]'
            : 'border-emerald-300 hover:border-emerald-500 bg-gradient-to-b from-emerald-50/70 to-white shadow-sm'
        }`}
      >
        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInputChange}
          disabled={isLoading || compressing}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileInputChange}
          disabled={isLoading || compressing}
        />

        {/* Central Graphic */}
        <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-lg shadow-emerald-700/25 mb-6">
          <UploadCloud className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        {/* Heading & Instructions */}
        <h2
          className={`text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2 ${
            isUrdu ? 'font-urdu-title text-3xl' : ''
          }`}
        >
          {isDragOver ? t.dragActiveText : t.dropzoneTitle}
        </h2>
        <p className={`text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 ${isUrdu ? 'font-urdu' : ''}`}>
          {t.dropzoneSubtitle}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          {/* Gallery / File Picker */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading || compressing}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-base font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 shadow-md shadow-emerald-800/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <ImageIcon className="w-5 h-5 shrink-0" />
            <span className={isUrdu ? 'font-urdu' : ''}>{t.btnBrowsePhoto}</span>
          </button>

          {/* Direct Camera Capture */}
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            disabled={isLoading || compressing}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-base font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 active:scale-98 border border-emerald-300 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <Camera className="w-5 h-5 shrink-0 text-emerald-800" />
            <span className={isUrdu ? 'font-urdu' : ''}>{t.btnCamera}</span>
          </button>
        </div>

        {/* Compression feedback badge */}
        {compressionInfo && (
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-800">
            <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{compressionInfo}</span>
          </div>
        )}

        {/* Error notification */}
        {errorMessage && (
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-sm font-semibold text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </section>
  );
};
