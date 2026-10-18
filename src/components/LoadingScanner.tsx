import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Stethoscope, Sparkles, CheckCircle2, Clock } from 'lucide-react';

interface LoadingScannerProps {
  currentLang: Language;
}

export const LoadingScanner: React.FC<LoadingScannerProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isUrdu = currentLang === 'ur';

  const [activeStep, setActiveStep] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const steps = [t.step1, t.step2, t.step3];

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1400);

    return () => {
      clearInterval(timerInterval);
      clearInterval(stepInterval);
    };
  }, [steps.length]);

  return (
    <div className="w-full max-w-xl mx-auto my-12 p-8 bg-white rounded-3xl border-2 border-emerald-200 shadow-xl text-center animate-fadeIn">
      {/* Scanner Visual Icon */}
      <div className="relative mx-auto w-24 h-24 mb-6">
        <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-700/30 animate-pulse">
          <Stethoscope className="w-12 h-12" />
        </div>
        <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400 animate-ping opacity-30"></div>
      </div>

      <h3
        className={`text-2xl font-black text-slate-900 tracking-tight mb-2 ${
          isUrdu ? 'font-urdu-title text-2xl' : ''
        }`}
      >
        {t.analyzingTitle}
      </h3>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-6">
        <Clock className="w-3.5 h-3.5 text-emerald-600" />
        <span>
          {t.fastProcessingHint} ({seconds}s)
        </span>
      </div>

      {/* 3 Step Progress Indicator */}
      <div className="space-y-3 max-w-md mx-auto text-left">
        {steps.map((stepText, idx) => {
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all flex items-center gap-3 ${
                isCurrent
                  ? 'bg-emerald-50 border-emerald-300 shadow-xs'
                  : isDone
                  ? 'bg-slate-50 border-slate-200 text-slate-500'
                  : 'bg-white border-slate-100 text-slate-300 opacity-60'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-emerald-700 text-white animate-spin'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {isDone ? '✓' : idx + 1}
              </div>
              <span
                className={`text-sm font-semibold ${
                  isCurrent ? 'text-emerald-950 font-bold' : isDone ? 'text-slate-700' : 'text-slate-400'
                } ${isUrdu ? 'font-urdu' : ''}`}
              >
                {stepText}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
