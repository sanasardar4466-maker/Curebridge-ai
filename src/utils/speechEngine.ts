import { Language } from '../types';
import { convertRomanUrduToUrduScript, isUrduScript } from './urduConverter';

let activeUtterance: SpeechSynthesisUtterance | null = null;
let speechKeepAliveInterval: any = null;

// Preload voices cache if browser loads them asynchronously
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    // Warm up voice list
    window.speechSynthesis.getVoices();
  };
}

export interface SpeechController {
  stop: () => void;
  pause: () => void;
  resume: () => void;
}

export interface SpeechPlayOptions {
  text: string;
  language: Language;
  pureUrduFallback?: string;
  englishFallback?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

/**
 * Pre-Speech Text Cleaner:
 * Strips all markdown syntax (*, #, _, **), bullet formatting, bracket codes,
 * and emojis (🌞, 🌤️, 🌙, 💊) before passing text to window.speechSynthesis.
 * Adds natural breathing pauses between sentences and clauses for smooth, human-like cadence.
 */
export function cleanSpeechText(text: string): string {
  if (!text) return '';

  return (
    text
      // Remove markdown bold, italic, strikethrough, headings, blockquotes, bullets
      .replace(/[*#_~`>]/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/^[\s-–—*•]+/gm, ' ')
      // Remove emojis (comprehensive Unicode blocks)
      .replace(
        /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu,
        ' '
      )
      // Specific medical & timing emojis
      .replace(/[🌞🌤️🌙💊⚠️💧🍽️🕒✅❌🩺⏱️🔍📋🏥🚨📲📥]/g, ' ')
      // Clean brackets and braces, replacing with soft comma pause
      .replace(/[\[\]{}()\\\/]/g, ' ، ')
      // Punctuation cadence: ensure commas and full-stops have breath space
      .replace(/([.۔?!،,])/g, '$1 ')
      // Clean multiple punctuation and multiple spaces
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/**
 * Selects the optimal natural human voice based on target language.
 * Strictly filters out legacy robotic mechanical voices (espeak, robotic monocles).
 * Prioritizes:
 * - Urdu / Roman Urdu: Native ur-PK voice engine (with fallback to natural hi-IN / Google Urdu / Hindi)
 * - English: Natural human voices (Google US English, Natural, Microsoft Zira/David/Jenny/Guy, Samantha)
 */
export function getOptimalVoice(isUrduTarget: boolean): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  if (isUrduTarget) {
    // 1. Direct Urdu Pakistan natural voices (e.g. Google Urdu, Microsoft Asad / Uzma Online Natural)
    const urPKNatural = voices.find(
      (v) =>
        (v.lang.toLowerCase() === 'ur-pk' || v.lang.toLowerCase().replace('_', '-') === 'ur-pk') &&
        /natural|google|online|enhanced|neural/i.test(v.name)
    );
    if (urPKNatural) return urPKNatural;

    const urPK = voices.find(
      (v) => v.lang.toLowerCase() === 'ur-pk' || v.lang.toLowerCase().replace('_', '-') === 'ur-pk'
    );
    if (urPK) return urPK;

    // 2. Any Urdu voice (ur, ur-IN)
    const anyUr = voices.find((v) => v.lang.toLowerCase().startsWith('ur'));
    if (anyUr) return anyUr;

    // 3. Fallback to natural hi-IN voices (Hindustani phonology delivers authentic, fluid Urdu speech without robot accents)
    const hiINNatural = voices.find(
      (v) =>
        (v.lang.toLowerCase() === 'hi-in' || v.lang.toLowerCase().replace('_', '-') === 'hi-in') &&
        /natural|google|online|swara|enhanced|neural/i.test(v.name)
    );
    if (hiINNatural) return hiINNatural;

    const hiIN = voices.find(
      (v) => v.lang.toLowerCase() === 'hi-in' || v.lang.toLowerCase().replace('_', '-') === 'hi-in'
    );
    if (hiIN) return hiIN;

    const anyHi = voices.find((v) => v.lang.toLowerCase().startsWith('hi'));
    if (anyHi) return anyHi;

    // 4. Voice name matching Urdu or Hindi
    const nameMatch = voices.find((v) => /urdu|hindi/i.test(v.name));
    if (nameMatch) return nameMatch;

    return null;
  } else {
    // English voice selection: Prioritize Natural Human Voices over robotic synthetics
    const priorityPatterns = [
      /google us english/i,
      /natural.*english/i,
      /microsoft.*zira/i,
      /microsoft.*david/i,
      /microsoft.*jenny/i,
      /microsoft.*guy/i,
      /microsoft.*aria/i,
      /samantha/i,
      /allison/i,
      /ava/i,
    ];

    for (const pattern of priorityPatterns) {
      const match = voices.find(
        (v) => v.lang.toLowerCase().startsWith('en') && pattern.test(v.name) && !/robotic|espeak/i.test(v.name)
      );
      if (match) return match;
    }

    // Google English
    const googleEn = voices.find((v) => v.name.includes('Google') && v.lang.startsWith('en'));
    if (googleEn) return googleEn;

    // Standard en-US or en-GB (avoiding espeak)
    const enUS = voices.find(
      (v) => (v.lang.toLowerCase() === 'en-us' || v.lang.toLowerCase() === 'en_us') && !/espeak/i.test(v.name)
    );
    if (enUS) return enUS;

    const enGB = voices.find(
      (v) => v.lang.toLowerCase().startsWith('en-gb') && !/espeak/i.test(v.name)
    );
    if (enGB) return enGB;

    const anyEn = voices.find((v) => v.lang.toLowerCase().startsWith('en') && !/espeak/i.test(v.name));
    if (anyEn) return anyEn;

    return null;
  }
}

/**
 * Stops any ongoing speech synthesis.
 */
export function stopSpeech(): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  if (speechKeepAliveInterval) {
    clearInterval(speechKeepAliveInterval);
    speechKeepAliveInterval = null;
  }

  try {
    window.speechSynthesis.cancel();
  } catch (e) {
    console.error('Speech cancel error:', e);
  }

  activeUtterance = null;
}

/**
 * Executes crystal-clear, accent-free, natural human-like speech synthesis:
 * - Utterance rate = 0.85 (smooth, calm, intelligible delivery)
 * - Utterance pitch = 1.0 (natural pitch, avoiding artificial high/low squeaks)
 * - For Roman Urdu and Urdu: Properly maps text to clean Urdu script (اردو) before sending to window.speechSynthesis
 *   using the native Urdu voice engine (ur-PK / fallback) so it speaks fluently and clearly.
 */
export function playSpeech(options: SpeechPlayOptions): SpeechController {
  stopSpeech();

  if (typeof window === 'undefined' || !window.speechSynthesis) {
    options.onError?.(new Error('Speech synthesis is not supported on this browser'));
    return { stop: () => {}, pause: () => {}, resume: () => {} };
  }

  const { language, text, pureUrduFallback, englishFallback, onStart, onEnd, onError } = options;

  let finalRawText = text;
  const isUrduMode = language === 'ur' || language === 'romanUrdu';

  if (isUrduMode) {
    // For Roman Urdu and Urdu: ensure text is in pure, clean Urdu script (اردو)
    if (pureUrduFallback && isUrduScript(pureUrduFallback)) {
      finalRawText = pureUrduFallback;
    } else if (isUrduScript(text)) {
      finalRawText = text;
    } else {
      // Map Roman Urdu to clean Urdu script (اردو)
      finalRawText = convertRomanUrduToUrduScript(text);
    }
  } else {
    // English mode
    if (englishFallback) {
      finalRawText = englishFallback;
    }
  }

  // Pre-Speech Text Cleaner with cadence punctuation
  const cleanText = cleanSpeechText(finalRawText);

  if (!cleanText) {
    onError?.(new Error('No speech text available to read'));
    return { stop: () => {}, pause: () => {}, resume: () => {} };
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  activeUtterance = utterance;

  // Voice assignment
  const targetVoice = getOptimalVoice(isUrduMode);
  if (targetVoice) {
    utterance.voice = targetVoice;
    utterance.lang = targetVoice.lang;
  } else {
    utterance.lang = isUrduMode ? 'ur-PK' : 'en-US';
  }

  // Speech parameters tuned for smooth, calm, intelligible delivery:
  // rate = 0.85, pitch = 1.0
  utterance.rate = 0.85;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  utterance.onstart = () => {
    // Chromium fix: prevent speech synthesis pause after 15 seconds
    if (speechKeepAliveInterval) clearInterval(speechKeepAliveInterval);
    speechKeepAliveInterval = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else {
        clearInterval(speechKeepAliveInterval);
        speechKeepAliveInterval = null;
      }
    }, 10000);

    onStart?.();
  };

  utterance.onend = () => {
    if (speechKeepAliveInterval) {
      clearInterval(speechKeepAliveInterval);
      speechKeepAliveInterval = null;
    }
    activeUtterance = null;
    onEnd?.();
  };

  utterance.onerror = (e) => {
    if (speechKeepAliveInterval) {
      clearInterval(speechKeepAliveInterval);
      speechKeepAliveInterval = null;
    }
    activeUtterance = null;
    onError?.(e);
  };

  try {
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Failed to speak utterance:', err);
    onError?.(err);
  }

  return {
    stop: () => stopSpeech(),
    pause: () => {
      if (window.speechSynthesis.speaking) window.speechSynthesis.pause();
    },
    resume: () => {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    },
  };
}
