import React, { useState } from 'react';
import { Language, PrescriptionAnalysis } from '../types';
import { translations } from '../translations';
import {
  downloadPrescriptionTextSummary,
  generateWhatsAppShareUrl,
  printPrescriptionSummary,
} from '../utils/exportPrescription';
import { Download, Share2, Printer, Check, FileText } from 'lucide-react';

interface PrescriptionExportBarProps {
  currentLang: Language;
  analysis: PrescriptionAnalysis;
}

export const PrescriptionExportBar: React.FC<PrescriptionExportBarProps> = ({
  currentLang,
  analysis,
}) => {
  const t = translations[currentLang];
  const isUrdu = currentLang === 'ur';

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    downloadPrescriptionTextSummary(analysis, currentLang);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleWhatsApp = () => {
    const url = generateWhatsAppShareUrl(analysis, currentLang);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    printPrescriptionSummary(analysis, currentLang);
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm mt-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
            {currentLang === 'en' ? 'Patient Care Utilities' : currentLang === 'romanUrdu' ? 'Mareez Ki Sahulat' : 'مریض کی سہولت'}
          </span>
          <h4
            className={`text-xl sm:text-2xl font-black text-slate-900 tracking-tight ${
              isUrdu ? 'font-urdu-title text-2xl' : ''
            }`}
          >
            {currentLang === 'en'
              ? 'Save & Share Prescription Schedule'
              : currentLang === 'romanUrdu'
              ? 'Schedule Save Karein Ya Family Ko Bhejein'
              : 'نسخے کا شیڈول محفوظ کریں یا اہل خانہ کو بھیجیں'}
          </h4>
          <p className={`text-xs sm:text-sm text-slate-600 mt-1 ${isUrdu ? 'font-urdu' : ''}`}>
            {currentLang === 'en'
              ? 'Download offline file or send formatted medicine timings directly to family on WhatsApp.'
              : currentLang === 'romanUrdu'
              ? 'Offline parhne ke liye file download karein ya WhatsApp par foran ghar walon ko bhejein.'
              : 'آف لائن پڑھنے کے لیے فائل محفوظ کریں یا واٹس ایپ پر اہل خانہ کو فوری شیڈول بھیجیں۔'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
          {/* Download Text Summary */}
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 shadow-md shadow-emerald-800/20 transition-all cursor-pointer whitespace-nowrap"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-5 h-5 text-emerald-200" />
                <span>{currentLang === 'en' ? 'Downloaded!' : currentLang === 'romanUrdu' ? 'Download Ho Gaya!' : 'محفوظ ہو گیا!'}</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span className={isUrdu ? 'font-urdu' : ''}>{t.btnSaveDownload}</span>
              </>
            )}
          </button>

          {/* Share via WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsApp}
            title={t.whatsappShareTooltip}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 shadow-md shadow-emerald-700/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <Share2 className="w-5 h-5" />
            <span className={isUrdu ? 'font-urdu' : ''}>{t.btnShareWhatsApp}</span>
          </button>

          {/* Print / Save as PDF */}
          <button
            type="button"
            onClick={handlePrint}
            title="Print or Save as PDF"
            className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-98 border border-slate-200 transition-all cursor-pointer whitespace-nowrap"
          >
            <Printer className="w-5 h-5" />
            <span className="hidden lg:inline">{t.btnPrintPdf}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
