import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isUrdu = currentLang === 'ur';

  return (
    <footer className="w-full bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Medical disclaimer callout */}
        <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 mb-8 max-w-4xl mx-auto flex items-start gap-3.5">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <p className={`text-xs sm:text-sm text-slate-300 leading-relaxed ${isUrdu ? 'font-urdu' : ''}`}>
            {t.medicalDisclaimer}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} CureBridge AI. {t.footerRights}</p>
          <p className="flex items-center justify-center gap-1.5">
            <span>Built with care for health literacy</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
};
