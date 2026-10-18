import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { AlertCircle, RotateCcw, Upload, X } from 'lucide-react';

interface ErrorModalProps {
  currentLang: Language;
  errorMessage?: string | null;
  onRetry: () => void;
  onUploadNew: () => void;
  onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  currentLang,
  errorMessage,
  onRetry,
  onUploadNew,
  onClose,
}) => {
  const t = translations[currentLang];
  const isUrdu = currentLang === 'ur';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 relative animate-fadeIn">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-5">
          <AlertCircle className="w-9 h-9" />
        </div>

        <h3
          className={`text-xl sm:text-2xl font-black text-slate-900 text-center tracking-tight mb-2 ${
            isUrdu ? 'font-urdu-title text-2xl' : ''
          }`}
        >
          {t.errorTitle}
        </h3>

        <p className={`text-sm sm:text-base text-slate-600 text-center mb-6 leading-relaxed ${isUrdu ? 'font-urdu' : ''}`}>
          {errorMessage || t.errorDefaultMsg}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 py-3.5 px-5 rounded-2xl text-base font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 shadow-md shadow-emerald-800/20 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4" />
            <span className={isUrdu ? 'font-urdu' : ''}>{t.btnRetry}</span>
          </button>

          <button
            type="button"
            onClick={onUploadNew}
            className="flex-1 py-3.5 px-5 rounded-2xl text-base font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-98 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Upload className="w-4 h-4" />
            <span className={isUrdu ? 'font-urdu' : ''}>{t.btnUploadNew}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
