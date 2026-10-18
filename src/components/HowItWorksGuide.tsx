import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Camera, CalendarCheck2, Volume2, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HowItWorksGuideProps {
  currentLang: Language;
}

export const HowItWorksGuide: React.FC<HowItWorksGuideProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isUrdu = currentLang === 'ur';

  return (
    <section id="how-it-works" className="w-full my-16 pt-8 border-t border-slate-200">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-1">
          {currentLang === 'en' ? 'Simple 3-Step Process' : currentLang === 'romanUrdu' ? '3 Asaan Marhale' : 'تین آسان مراحل'}
        </span>
        <h3
          className={`text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight ${
            isUrdu ? 'font-urdu-title text-3xl' : ''
          }`}
        >
          {t.howItWorksTitle}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
            <Camera className="w-8 h-8" />
          </div>
          <h4 className={`text-xl font-bold text-slate-900 mb-2 ${isUrdu ? 'font-urdu text-xl' : ''}`}>
            {t.stepPhotoTitle}
          </h4>
          <p className={`text-sm text-slate-600 leading-relaxed ${isUrdu ? 'font-urdu' : ''}`}>
            {t.stepPhotoDesc}
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5">
            <CalendarCheck2 className="w-8 h-8" />
          </div>
          <h4 className={`text-xl font-bold text-slate-900 mb-2 ${isUrdu ? 'font-urdu text-xl' : ''}`}>
            {t.stepAnalyzeTitle}
          </h4>
          <p className={`text-sm text-slate-600 leading-relaxed ${isUrdu ? 'font-urdu' : ''}`}>
            {t.stepAnalyzeDesc}
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-5">
            <Volume2 className="w-8 h-8" />
          </div>
          <h4 className={`text-xl font-bold text-slate-900 mb-2 ${isUrdu ? 'font-urdu text-xl' : ''}`}>
            {t.stepListenTitle}
          </h4>
          <p className={`text-sm text-slate-600 leading-relaxed ${isUrdu ? 'font-urdu' : ''}`}>
            {t.stepListenDesc}
          </p>
        </div>
      </div>
    </section>
  );
};
