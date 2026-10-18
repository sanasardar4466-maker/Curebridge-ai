import React from 'react';
import { Language, SamplePrescription } from '../types';
import { SAMPLE_PRESCRIPTIONS } from '../data/samplePrescriptions';
import { translations } from '../translations';
import { FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SamplePrescriptionsBarProps {
  currentLang: Language;
  onSelectSample: (sample: SamplePrescription) => void;
  selectedSampleId?: string | null;
  isLoading: boolean;
}

export const SamplePrescriptionsBar: React.FC<SamplePrescriptionsBarProps> = ({
  currentLang,
  onSelectSample,
  selectedSampleId,
  isLoading,
}) => {
  const t = translations[currentLang];
  const isUrdu = currentLang === 'ur';

  return (
    <section id="sample-prescriptions" className="w-full mt-12 sm:mt-16">
      <div className="text-center mb-8">
        <h3
          className={`text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2 ${
            isUrdu ? 'font-urdu-title text-2xl' : ''
          }`}
        >
          {t.samplesTitle}
        </h3>
        <p className={`text-sm sm:text-base text-slate-600 max-w-xl mx-auto ${isUrdu ? 'font-urdu' : ''}`}>
          {t.samplesSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SAMPLE_PRESCRIPTIONS.map((sample) => {
          const isSelected = selectedSampleId === sample.id;

          return (
            <div
              key={sample.id}
              onClick={() => !isLoading && onSelectSample(sample)}
              className={`group relative rounded-2xl p-5 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-600/30'
                  : 'border-slate-200 bg-white hover:border-emerald-400 hover:shadow-sm'
              }`}
            >
              <div>
                {/* Header Tag & Status */}
                <div className="flex items-center justify-between mb-3 text-xs font-semibold text-emerald-800">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900">
                    <FileText className="w-3.5 h-3.5" />
                    {sample.tag}
                  </span>
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      Active
                    </span>
                  )}
                </div>

                {/* Sample Title */}
                <h4
                  className={`text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-1 ${
                    isUrdu ? 'font-urdu text-xl' : ''
                  }`}
                >
                  {sample.title[currentLang]}
                </h4>

                {/* Medicines / Condition */}
                <p className="text-sm font-medium text-emerald-700 mb-3">{sample.condition[currentLang]}</p>

                {/* Mini Preview Box */}
                <div className="relative w-full h-32 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden mb-4">
                  <img
                    src={sample.imageSvgDataUrl}
                    alt={sample.title.en}
                    className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-xs font-medium text-white truncate">{sample.doctorName}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                disabled={isLoading}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-900 group-hover:bg-emerald-700 group-hover:text-white'
                }`}
              >
                <span className={isUrdu ? 'font-urdu' : ''}>{t.btnTrySample}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
