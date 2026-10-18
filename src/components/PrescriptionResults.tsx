import React, { useState } from 'react';
import { Language, PrescriptionAnalysis, Medicine } from '../types';
import { translations } from '../translations';
import { PrescriptionExportBar } from './PrescriptionExportBar';
import {
  Sun,
  CloudSun,
  Moon,
  Clock,
  Utensils,
  AlertTriangle,
  FileCheck2,
  Volume2,
  Calendar,
  User,
  Building2,
  CheckCircle,
  Eye,
  Pill,
  ShieldAlert,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';

interface PrescriptionResultsProps {
  currentLang: Language;
  analysis: PrescriptionAnalysis;
  prescriptionImageSrc?: string | null;
  onPlaySingleMedicine: (medicine: Medicine) => void;
  onScanAnother: () => void;
}

export const PrescriptionResults: React.FC<PrescriptionResultsProps> = ({
  currentLang,
  analysis,
  prescriptionImageSrc,
  onPlaySingleMedicine,
  onScanAnother,
}) => {
  const t = translations[currentLang];
  const isUrdu = currentLang === 'ur';

  const [showSlipModal, setShowSlipModal] = useState(false);

  return (
    <div className="w-full space-y-10 animate-fadeIn">
      {/* Clinic & Patient Metadata Strip */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              {t.resultsHeaderTitle}
            </span>
            <h2
              className={`text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight ${
                isUrdu ? 'font-urdu-title text-3xl' : ''
              }`}
            >
              {analysis.clinicName || 'Medical Clinic'}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600 font-medium">
              {analysis.doctorName && (
                <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <User className="w-4 h-4 text-emerald-600" />
                  {analysis.doctorName}
                </span>
              )}
              {analysis.patientName && (
                <span className="flex items-center gap-1.5">
                  <span className="text-slate-400">·</span>
                  <span className="font-semibold text-slate-800">{analysis.patientName}</span>
                </span>
              )}
              {analysis.date && (
                <span className="flex items-center gap-1.5">
                  <span className="text-slate-400">·</span>
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{analysis.date}</span>
                </span>
              )}
            </div>
          </div>

          {/* Action to view original scanned slip */}
          {prescriptionImageSrc && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSlipModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>{currentLang === 'en' ? 'View Paper Slip' : currentLang === 'romanUrdu' ? 'Parchi Ki Photo Dekhein' : 'اصل پرچی دیکھیں'}</span>
              </button>

              <button
                type="button"
                onClick={onScanAnother}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{currentLang === 'en' ? 'New Scan' : currentLang === 'romanUrdu' ? 'Nayi Parchi' : 'نیا نسخہ'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Prescription Summary Quick Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-sm font-medium text-slate-700">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>
              {analysis.medicines.length}{' '}
              {currentLang === 'en' ? 'Medications Prescribed' : currentLang === 'romanUrdu' ? 'Dawaein Likhi Hain' : 'دوائیاں تجویز کی گئی ہیں'}
            </span>
          </div>
          <span className="text-xs text-slate-500 font-normal">
            {currentLang === 'en' ? 'Instant 3-Language Sync Active' : currentLang === 'romanUrdu' ? 'Urdu, Roman Urdu aur English mein dastiyab' : 'تین زبانوں میں فوری ترجمہ فعال'}
          </span>
        </div>
      </div>

      {/* ========================================================
          SECTION 1: MEDICINE NAME & PURPOSE
          (Dawai Ka Naam Aur Maqsad)
      ======================================================== */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-black text-xl shadow-md shadow-emerald-800/20">
              {t.sec1Number}
            </div>
            <div>
              <h3
                className={`text-xl sm:text-2xl font-black text-slate-900 tracking-tight ${
                  isUrdu ? 'font-urdu-title text-2xl' : ''
                }`}
              >
                {t.sec1Title}
              </h3>
              <p className={`text-sm text-slate-600 ${isUrdu ? 'font-urdu' : ''}`}>{t.sec1Subtitle}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analysis.medicines.map((med, index) => (
            <div
              key={med.id || index}
              className="rounded-2xl p-5 border-2 border-emerald-100 bg-gradient-to-b from-emerald-50/40 to-white hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Medicine Form & Number */}
                <div className="flex items-center justify-between mb-3 text-xs font-bold text-emerald-800">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100/90 text-emerald-900">
                    <Pill className="w-3.5 h-3.5" />
                    {med.form} {med.strength ? `· ${med.strength}` : ''}
                  </span>
                  <span className="text-slate-400 font-mono">#{index + 1}</span>
                </div>

                {/* Brand Name */}
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-1">
                  {med.name}
                </h4>

                {/* Generic / Formula name */}
                {med.genericName && (
                  <p className="text-xs font-semibold text-emerald-700 mb-4 font-mono">
                    {med.genericName}
                  </p>
                )}

                {/* Purpose in selected language */}
                <div className="rounded-xl bg-white p-3.5 border border-emerald-100 mb-4 shadow-2xs">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">
                    {t.medicinePurposeLabel}:
                  </span>
                  <p
                    className={`text-base font-bold text-slate-800 leading-snug ${
                      isUrdu ? 'font-urdu text-lg' : ''
                    }`}
                  >
                    {med.purpose[currentLang]}
                  </p>
                </div>
              </div>

              {/* Individual Audio Narration button for this specific medication */}
              <button
                type="button"
                onClick={() => onPlaySingleMedicine(med)}
                className="w-full mt-2 py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-bold text-emerald-900 bg-emerald-100/70 hover:bg-emerald-200 border border-emerald-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-emerald-700" />
                <span className={isUrdu ? 'font-urdu' : ''}>{t.btnListenThisMed}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION 2: DOSAGE & TIMINGS WITH VISUAL TIME ICONS
          (Kab Aur Kitni Dafa Leni Hai - Subah 🌞, Dopahar 🌤️, Raat 🌙)
      ======================================================== */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-black text-xl shadow-md shadow-emerald-800/20">
              {t.sec2Number}
            </div>
            <div>
              <h3
                className={`text-xl sm:text-2xl font-black text-slate-900 tracking-tight ${
                  isUrdu ? 'font-urdu-title text-2xl' : ''
                }`}
              >
                {t.sec2Title}
              </h3>
              <p className={`text-sm text-slate-600 ${isUrdu ? 'font-urdu' : ''}`}>{t.sec2Subtitle}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {analysis.medicines.map((med, index) => {
            const { timing, duration } = med;

            return (
              <div
                key={med.id || index}
                className="rounded-2xl p-5 sm:p-6 border-2 border-slate-200/90 bg-white hover:border-emerald-300 transition-all shadow-2xs"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-xl font-black text-slate-900">{med.name}</h4>
                      <span className="text-xs font-semibold text-slate-500">
                        {t.dosageLabel}: <strong className="text-emerald-800">{timing.dosageAmount}</strong>
                        {' · '}
                        {t.durationLabel}: <strong className="text-emerald-800">{duration[currentLang]}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Meal condition badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm font-bold text-amber-900 self-start md:self-auto">
                    <Utensils className="w-4 h-4 text-amber-700 shrink-0" />
                    <span className={isUrdu ? 'font-urdu' : ''}>
                      {timing.withFood === 'before'
                        ? t.mealBefore
                        : timing.withFood === 'after'
                        ? t.mealAfter
                        : timing.withFood === 'with'
                        ? t.mealWith
                        : t.mealAnytime}
                    </span>
                  </div>
                </div>

                {/* 3 Visual Time Blocks: Morning, Afternoon, Night */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
                  {/* MORNING (Subah) */}
                  <div
                    className={`rounded-2xl p-4 border-2 transition-all flex items-center gap-3.5 ${
                      timing.morning
                        ? 'bg-amber-500/10 border-amber-400 text-amber-950 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        timing.morning ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30' : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      <Sun className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-base font-extrabold block">{t.timingMorning}</span>
                      <span className="text-xs font-semibold block">
                        {timing.morning ? timing.dosageAmount : (currentLang === 'en' ? 'Not Scheduled' : currentLang === 'romanUrdu' ? 'Nahi Leni' : 'نہیں لینی')}
                      </span>
                      <span className="text-[11px] text-slate-500 hidden sm:block">{t.timingMorningDesc}</span>
                    </div>
                  </div>

                  {/* AFTERNOON (Dopahar) */}
                  <div
                    className={`rounded-2xl p-4 border-2 transition-all flex items-center gap-3.5 ${
                      timing.afternoon
                        ? 'bg-yellow-500/10 border-yellow-400 text-yellow-950 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        timing.afternoon ? 'bg-yellow-500 text-white shadow-md shadow-yellow-500/30' : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      <CloudSun className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-base font-extrabold block">{t.timingAfternoon}</span>
                      <span className="text-xs font-semibold block">
                        {timing.afternoon ? timing.dosageAmount : (currentLang === 'en' ? 'Not Scheduled' : currentLang === 'romanUrdu' ? 'Nahi Leni' : 'نہیں لینی')}
                      </span>
                      <span className="text-[11px] text-slate-500 hidden sm:block">{t.timingAfternoonDesc}</span>
                    </div>
                  </div>

                  {/* NIGHT (Raat) */}
                  <div
                    className={`rounded-2xl p-4 border-2 transition-all flex items-center gap-3.5 ${
                      timing.night
                        ? 'bg-indigo-500/10 border-indigo-400 text-indigo-950 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        timing.night ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      <Moon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-base font-extrabold block">{t.timingNight}</span>
                      <span className="text-xs font-semibold block">
                        {timing.night ? timing.dosageAmount : (currentLang === 'en' ? 'Not Scheduled' : currentLang === 'romanUrdu' ? 'Nahi Leni' : 'نہیں لینی')}
                      </span>
                      <span className="text-[11px] text-slate-500 hidden sm:block">{t.timingNightDesc}</span>
                    </div>
                  </div>
                </div>

                {/* Spoken plain language dosage advice */}
                <div className="bg-emerald-50/70 rounded-xl p-3.5 border border-emerald-100 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <p className={`text-sm sm:text-base font-bold text-emerald-950 ${isUrdu ? 'font-urdu' : ''}`}>
                    {timing.instructions[currentLang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          SECTION 3: SPECIAL PRECAUTIONS & WARNINGS
          (Khaas Hidayat Aur Ehtiyat)
      ======================================================== */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-black text-xl shadow-md shadow-emerald-800/20">
              {t.sec3Number}
            </div>
            <div>
              <h3
                className={`text-xl sm:text-2xl font-black text-slate-900 tracking-tight ${
                  isUrdu ? 'font-urdu-title text-2xl' : ''
                }`}
              >
                {t.sec3Title}
              </h3>
              <p className={`text-sm text-slate-600 ${isUrdu ? 'font-urdu' : ''}`}>{t.sec3Subtitle}</p>
            </div>
          </div>
        </div>

        {/* Medicine-specific precautions */}
        <div className="space-y-4 mb-8">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
            {currentLang === 'en' ? 'Individual Medicine Rules' : currentLang === 'romanUrdu' ? 'Har Dawai Ki Khaas Ehtiyat' : 'ہر دوائی کے لیے ضروری احتیاط'}
          </h4>

          {analysis.medicines.map((med, index) => (
            <div
              key={med.id || index}
              className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3.5"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-sm font-black text-slate-900 block mb-0.5">
                  {med.name} ({med.form}):
                </strong>
                <p className={`text-sm font-medium text-amber-950 ${isUrdu ? 'font-urdu' : ''}`}>
                  {med.precautions[currentLang]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor's Overall Advice Box */}
        {analysis.overallAdvice && (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <FileCheck2 className="w-5 h-5 text-emerald-700" />
              <h4 className={`text-base font-extrabold text-emerald-950 ${isUrdu ? 'font-urdu text-lg' : ''}`}>
                {t.doctorNotesTitle}
              </h4>
            </div>
            <p className={`text-base font-medium text-emerald-900 leading-relaxed ${isUrdu ? 'font-urdu text-lg' : ''}`}>
              {analysis.overallAdvice[currentLang]}
            </p>
          </div>
        )}

        {/* Safety Warnings List */}
        {analysis.warnings && analysis.warnings.length > 0 && (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <h4 className={`text-sm font-bold text-slate-900 uppercase tracking-wider ${isUrdu ? 'font-urdu' : ''}`}>
                {t.safetyWarningsTitle}
              </h4>
            </div>
            <ul className="space-y-2">
              {analysis.warnings.map((warning, wIdx) => (
                <li key={wIdx} className="text-sm text-slate-700 font-medium flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Patient Care Utilities: Save / Download & Share via WhatsApp */}
      <PrescriptionExportBar currentLang={currentLang} analysis={analysis} />

      {/* Modal / Lightbox for Scanned Paper Slip */}
      {showSlipModal && prescriptionImageSrc && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowSlipModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-4 sm:p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                {currentLang === 'en' ? 'Original Prescription Slip' : currentLang === 'romanUrdu' ? 'Asal Parchi Ki Tasweer' : 'اصل کاغذی پرچی'}
              </h3>
              <button
                type="button"
                onClick={() => setShowSlipModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
              <img
                src={prescriptionImageSrc}
                alt="Scanned Doctor Prescription"
                className="max-h-[70vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
