import React from 'react';
import { Language, PrescriptionAnalysis } from '../types';
import { translations } from '../translations';
import { Volume2, Square, Sparkles, Radio } from 'lucide-react';

interface AudioPlayerBannerProps {
  currentLang: Language;
  analysis: PrescriptionAnalysis;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioPlayerBanner: React.FC<AudioPlayerBannerProps> = ({
  currentLang,
  analysis,
  isPlaying,
  onTogglePlay,
}) => {
  const t = translations[currentLang];
  const isUrdu = currentLang === 'ur';
  const isUrduMode = currentLang === 'ur' || currentLang === 'romanUrdu';

  return (
    <div className="w-full bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-3xl p-5 sm:p-7 shadow-lg shadow-emerald-900/15 border border-emerald-600/50 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Left Side: Audio Engine Info & Status */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="relative">
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner ${
                isPlaying ? 'ring-4 ring-emerald-400/50 animate-pulse' : ''
              }`}
            >
              {isPlaying ? (
                <Radio className="w-7 h-7 text-emerald-300 animate-spin" style={{ animationDuration: '4s' }} />
              ) : (
                <Volume2 className="w-8 h-8 text-emerald-200" />
              )}
            </div>

            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-900/60 text-emerald-200 border border-emerald-500/30">
                {isUrduMode ? 'Natural Urdu Speech Engine (ur-PK)' : 'English Voice Engine (en-US)'}
              </span>
            </div>

            <h3
              className={`text-xl sm:text-2xl font-black text-white tracking-tight ${
                isUrdu ? 'font-urdu-title text-2xl' : ''
              }`}
            >
              {isPlaying ? t.audioPlayingBadge : t.btnPlayFullAudio}
            </h3>

            <p className={`text-xs sm:text-sm text-emerald-100/90 mt-0.5 ${isUrdu ? 'font-urdu' : ''}`}>
              {isUrduMode
                ? 'Roman Urdu aur Urdu ko saaf qudrati Urdu talaffuz mein sunata hai.'
                : 'Listen to complete medicine names, timings, and warnings read aloud.'}
            </p>
          </div>
        </div>

        {/* Right Side: Big High-Visibility Audio Toggle Button */}
        <div className="shrink-0 w-full md:w-auto">
          <button
            type="button"
            onClick={onTogglePlay}
            className={`w-full md:w-auto px-8 py-4 rounded-2xl text-base sm:text-lg font-black flex items-center justify-center gap-3 transition-all duration-200 shadow-xl cursor-pointer active:scale-97 ${
              isPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-900/30 ring-4 ring-rose-400/40'
                : 'bg-white hover:bg-emerald-50 text-emerald-950 shadow-emerald-950/20 ring-4 ring-white/20'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-5 h-5 fill-current" />
                <span className={isUrdu ? 'font-urdu text-xl' : ''}>{t.btnStopAudio}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-6 h-6 text-emerald-700 animate-bounce" />
                <span className={isUrdu ? 'font-urdu text-xl' : ''}>{t.btnPlayFullAudio}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual Audio Waveform Graphic when playing */}
      {isPlaying && (
        <div className="mt-5 pt-4 border-t border-emerald-600/40 flex items-center justify-center gap-1.5 h-8">
          {[40, 75, 100, 60, 90, 45, 80, 100, 70, 50, 95, 65, 85, 40, 75, 100, 60, 90].map((h, i) => (
            <div
              key={i}
              className="w-1.5 bg-emerald-300 rounded-full transition-all duration-150"
              style={{
                height: `${h}%`,
                animation: `pulse 0.8s ease-in-out infinite alternate ${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
