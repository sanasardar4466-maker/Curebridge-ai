import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Stethoscope, HelpCircle, FileText, PhoneCall } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onReset: () => void;
  onScrollToSamples: () => void;
  onScrollToHowItWorks: () => void;
  onScrollToHelpline: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onReset,
  onScrollToSamples,
  onScrollToHowItWorks,
  onScrollToHelpline,
}) => {
  const t = translations[currentLang];
  const isUrdu = currentLang === 'ur';

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white shadow-md border-b border-emerald-950/40 w-full max-w-full overflow-x-hidden">
      {/* Top Emergency notification strip */}
      <div className="bg-emerald-950/90 text-emerald-200 text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 text-center font-medium w-full border-b border-emerald-800/40 overflow-x-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">{t.emergencyNotice}</span>
          <button
            onClick={onScrollToHelpline}
            className="underline hover:text-white cursor-pointer ml-1 font-bold shrink-0 text-emerald-300"
          >
            {isUrdu ? 'نمبرز دیکھیں' : currentLang === 'romanUrdu' ? 'Numbers Dekhein' : 'View Helplines'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full py-2.5 sm:py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 w-full">
          {/* Top Left Area: Permanent App Title "CureBridge AI" & Dynamic Purpose Text */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onReset}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 hover:bg-white/20 transition-all cursor-pointer shadow-inner"
              title="CureBridge AI"
            >
              <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-200" />
            </button>

            <div className="min-w-0 flex-1">
              {/* Fixed title across all languages */}
              <button
                onClick={onReset}
                className="text-xl sm:text-2xl font-black tracking-tight text-white block text-left hover:text-emerald-100 transition-colors cursor-pointer"
              >
                CureBridge AI
              </button>

              {/* Dynamic purpose text changing instantly with language switch */}
              <p
                className={`text-xs sm:text-sm text-emerald-100/90 font-medium leading-snug mt-0.5 ${
                  isUrdu ? 'font-urdu text-sm sm:text-base leading-normal' : ''
                }`}
              >
                {t.appPurposeText}
              </p>
            </div>
          </div>

          {/* Top Right Area: App info / How-It-Works & 3-Language Switcher */}
          <div className="flex items-center justify-between md:justify-end gap-2.5 sm:gap-4 shrink-0 flex-wrap sm:flex-nowrap">
            {/* App Info / How It Works quick options */}
            <nav className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-emerald-100">
              <button
                onClick={onScrollToHowItWorks}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-emerald-800/70 hover:text-white transition-colors whitespace-nowrap cursor-pointer text-xs"
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>{t.navHowItWorks}</span>
              </button>

              <button
                onClick={onScrollToSamples}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-emerald-800/70 hover:text-white transition-colors whitespace-nowrap cursor-pointer text-xs"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>{t.navSamples}</span>
              </button>
            </nav>

            {/* Dynamic 3-Language Switcher buttons: [English] [Roman Urdu] [Urdu] */}
            <div
              className="inline-flex p-1 bg-emerald-950/70 rounded-xl border border-emerald-700/60 shadow-inner shrink-0"
              role="group"
              aria-label="Language Selector"
            >
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-white text-emerald-950 shadow-sm ring-1 ring-white/50'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-800/60'
                }`}
              >
                English
              </button>

              <button
                type="button"
                onClick={() => onLanguageChange('romanUrdu')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  currentLang === 'romanUrdu'
                    ? 'bg-white text-emerald-950 shadow-sm ring-1 ring-white/50'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-800/60'
                }`}
              >
                Roman Urdu
              </button>

              <button
                type="button"
                onClick={() => onLanguageChange('ur')}
                className={`px-3 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer font-urdu ${
                  currentLang === 'ur'
                    ? 'bg-white text-emerald-950 shadow-sm ring-1 ring-white/50'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-800/60'
                }`}
              >
                اردو
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
