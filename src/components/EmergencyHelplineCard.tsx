import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import {
  PhoneCall,
  Ambulance,
  HeartPulse,
  ShieldAlert,
  Phone,
  Building,
  Check,
  AlertOctagon,
} from 'lucide-react';

interface EmergencyHelplineCardProps {
  currentLang: Language;
}

export const EmergencyHelplineCard: React.FC<EmergencyHelplineCardProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isUrdu = currentLang === 'ur';

  const [customPhone, setCustomPhone] = useState('');
  const [isCallingCustom, setIsCallingCustom] = useState(false);

  const handleCustomCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPhone.trim()) return;
    const cleanNumber = customPhone.replace(/[^0-9+]/g, '');
    if (cleanNumber) {
      window.location.href = `tel:${cleanNumber}`;
    }
  };

  return (
    <section id="emergency-helpline" className="w-full my-12">
      <div className="rounded-3xl bg-gradient-to-br from-rose-50 via-white to-amber-50 border-2 border-rose-300/80 shadow-md p-6 sm:p-8">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-rose-200">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-600/30 animate-pulse">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <div>
              <h3
                className={`text-xl sm:text-2xl font-black text-rose-950 tracking-tight ${
                  isUrdu ? 'font-urdu-title text-2xl' : ''
                }`}
              >
                {t.emergencyAlertTitle}
              </h3>
              <p className={`text-xs sm:text-sm text-rose-800 font-medium ${isUrdu ? 'font-urdu' : ''}`}>
                {t.emergencyAlertSubtitle}
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
            24/7 Available
          </span>
        </div>

        {/* 4 Emergency Helplines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          {/* Rescue 1122 */}
          <div className="bg-white rounded-2xl p-4 border border-rose-200 shadow-xs flex flex-col justify-between hover:border-rose-400 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-black">
                  <Ambulance className="w-5 h-5" />
                </span>
                <span className="text-xl font-black text-rose-700 font-mono">1122</span>
              </div>
              <h4 className={`text-sm font-bold text-slate-900 mb-1 ${isUrdu ? 'font-urdu' : ''}`}>
                {t.rescue1122Title}
              </h4>
              <p className={`text-xs text-slate-500 mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
                {t.rescue1122Desc}
              </p>
            </div>

            <a
              href="tel:1122"
              className="w-full py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.btnDirectCall} 1122</span>
            </a>
          </div>

          {/* Edhi Ambulance 1020 / 115 */}
          <div className="bg-white rounded-2xl p-4 border border-rose-200 shadow-xs flex flex-col justify-between hover:border-rose-400 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                  <HeartPulse className="w-5 h-5" />
                </span>
                <span className="text-xl font-black text-amber-700 font-mono">1020</span>
              </div>
              <h4 className={`text-sm font-bold text-slate-900 mb-1 ${isUrdu ? 'font-urdu' : ''}`}>
                {t.edhi1020Title}
              </h4>
              <p className={`text-xs text-slate-500 mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
                {t.edhi1020Desc}
              </p>
            </div>

            <a
              href="tel:1020"
              className="w-full py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-98 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.btnDirectCall} 1020</span>
            </a>
          </div>

          {/* Health Helpline 1166 */}
          <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-xs flex flex-col justify-between hover:border-emerald-400 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                  <Phone className="w-5 h-5" />
                </span>
                <span className="text-xl font-black text-emerald-700 font-mono">1166</span>
              </div>
              <h4 className={`text-sm font-bold text-slate-900 mb-1 ${isUrdu ? 'font-urdu' : ''}`}>
                {t.healthHelplineTitle}
              </h4>
              <p className={`text-xs text-slate-500 mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
                {t.healthHelplineDesc}
              </p>
            </div>

            <a
              href="tel:1166"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.btnDirectCall} 1166</span>
            </a>
          </div>

          {/* Police Emergency 15 */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-400 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-black">
                  <ShieldAlert className="w-5 h-5" />
                </span>
                <span className="text-xl font-black text-slate-700 font-mono">15</span>
              </div>
              <h4 className={`text-sm font-bold text-slate-900 mb-1 ${isUrdu ? 'font-urdu' : ''}`}>
                {t.policeEmergencyTitle}
              </h4>
              <p className={`text-xs text-slate-500 mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
                {t.policeEmergencyDesc}
              </p>
            </div>

            <a
              href="tel:15"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 active:scale-98 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.btnDirectCall} 15</span>
            </a>
          </div>
        </div>

        {/* Customizable Local Clinic / Hospital Hotline */}
        <div className="bg-white rounded-2xl p-5 border border-rose-200 mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-sm font-bold text-slate-900 ${isUrdu ? 'font-urdu' : ''}`}>
                {t.customClinicTitle}
              </h4>
              <p className={`text-xs text-slate-500 ${isUrdu ? 'font-urdu' : ''}`}>
                {t.customClinicSubtitle}
              </p>
            </div>
          </div>

          <form onSubmit={handleCustomCall} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="tel"
              value={customPhone}
              onChange={(e) => setCustomPhone(e.target.value)}
              placeholder="e.g. 051-4455882 / 0300..."
              className="flex-1 sm:w-60 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-500 font-mono"
            />
            <button
              type="submit"
              disabled={!customPhone.trim()}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.btnDirectCall}</span>
            </button>
          </form>
        </div>

        {/* Advisory disclaimer */}
        <p className={`text-xs text-rose-900/80 mt-4 text-center font-medium ${isUrdu ? 'font-urdu' : ''}`}>
          ⚠️ {t.emergencyDisclaimer}
        </p>
      </div>
    </section>
  );
};
