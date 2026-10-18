/**
 * Internal Roman Urdu to Pure Urdu Script (اردو) Converter
 * Converts colloquial Roman Urdu vocabulary, medical dosages, and timing phrases
 * into authentic Urdu script so that the speech engine reads with a 100% native Urdu accent.
 */

const ROMAN_TO_URDU_DICTIONARY: Record<string, string> = {
  // Greetings and General
  'assalam-o-alaikum': 'السلام علیکم',
  'assalamu': 'السلام',
  'alaikum': 'علیکم',
  'aap': 'آپ',
  'apki': 'آپ کی',
  'aapki': 'آپ کی',
  'apni': 'اپنی',
  'aapka': 'آپ کا',
  'apka': 'آپ کا',
  'parchi': 'پرچی',
  'nuskha': 'نسخہ',
  'mein': 'میں',
  'hai': 'ہے',
  'hain': 'ہیں',
  'aur': 'اور',
  'ki': 'کی',
  'ke': 'کے',
  'ka': 'کا',
  'ko': 'کو',
  'se': 'سے',
  'par': 'پر',
  'pe': 'پر',
  'yeh': 'یہ',
  'woh': 'وہ',
  'bhi': 'بھی',
  'sirf': 'صرف',
  'zaroori': 'ضروری',
  'hidayat': 'ہدایات',
  'ehtiyat': 'احتیاط',
  'mashwara': 'مشورہ',
  'doctor': 'ڈاکٹر',
  'mareez': 'مریض',

  // Medicines and Forms
  'dawai': 'دوائی',
  'dawaeeyon': 'دوائیوں',
  'dawain': 'دوائیں',
  'goli': 'گولی',
  'goliyan': 'گولیاں',
  'capsule': 'کیپسول',
  'syrup': 'شربت',
  'drops': 'قطرے',
  'inhaler': 'انہیلر',
  'injection': 'انجکشن',
  'cream': 'مرہم',
  'sachet': 'ساشے',
  'chammach': 'چمچ',
  'dawa': 'دوا',

  // Timings and Meals
  'subah': 'صبح',
  'dopahar': 'دوپہر',
  'shaam': 'شام',
  'raat': 'رات',
  'din': 'دن',
  'waqt': 'وقت',
  'rozana': 'روزانہ',
  'har': 'ہر',
  'ghantay': 'گھنٹے',
  'ghanta': 'گھنٹہ',
  'pehle': 'پہلے',
  'baad': 'بعد',
  'khana': 'کھانا',
  'khane': 'کھانے',
  'nashta': 'ناشتہ',
  'nashtay': 'ناشتے',
  'nihar': 'نہار',
  'munh': 'منہ',
  'darmiyan': 'درمیان',
  'sath': 'ساتھ',
  'sofe': 'سوتے',
  'sonay': 'سونے',

  // Actions and verbs
  'lein': 'لیں',
  'lena': 'لینا',
  'karein': 'کریں',
  'karna': 'کرنا',
  'rakhein': 'رکھیں',
  'piyein': 'پیئیں',
  'peena': 'پینا',
  'khayein': 'کھائیں',
  'rok': 'روک',
  'band': 'بند',
  'chhor': 'چھوڑ',
  'bachayein': 'بچائیں',
  'koshish': 'کوشش',

  // Quantities & Numbers
  'ek': 'ایک',
  'aik': 'ایک',
  'do': 'دو',
  'teen': 'تین',
  'chaar': 'چار',
  'paanch': 'پانچ',
  'chhey': 'چھ',
  'saat': 'سات',
  'aath': 'آٹھ',
  'nau': 'نو',
  'dus': 'دس',
  'aadha': 'آدھا',
  'adhee': 'آدھی',
  'haftay': 'ہفتے',
  'mahine': 'مہینے',
  'chhota': 'چھوٹا',
  'bara': 'بڑا',

  // Medical conditions and symptoms
  'bukhar': 'بخار',
  'dard': 'درد',
  'sar': 'سر',
  'pet': 'پیٹ',
  'meda': 'معدہ',
  'tezabiat': 'تیزابیت',
  'jalan': 'جلن',
  'gala': 'گلا',
  'khansi': 'کھانسی',
  'nazla': 'نزلہ',
  'zukaam': 'زکام',
  'sugar': 'شوگر',
  'pressure': 'پریشر',
  'infection': 'انفیکشن',
  'kamzori': 'کمزوری',
  'paani': 'پانی',
  'khoon': 'خون',
  'saaf': 'صاف',
  'garm': 'گرم',
  'thanda': 'ٹھنڈا',
  'zyada': 'زیادہ',
  'theek': 'ٹھیک',
  'behtar': 'بہتر',
  'course': 'کورس',
  'poora': 'پورا',
};

/**
 * Checks if a string is predominantly in Urdu / Arabic script.
 */
export function isUrduScript(text: string): boolean {
  if (!text) return false;
  // Count characters in Arabic/Urdu unicode block
  const urduCharMatches = text.match(/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/g);
  return (urduCharMatches?.length || 0) > text.replace(/\s+/g, '').length * 0.3;
}

/**
 * Converts Roman Urdu or mixed text to pure Urdu script.
 * If input is already in Urdu script, cleans it and returns it.
 */
export function convertRomanUrduToUrduScript(text: string): string {
  if (!text) return '';

  // If already pure Urdu script, return directly
  if (isUrduScript(text)) {
    return text.trim();
  }

  // Tokenize words, preserving punctuation
  const words = text.toLowerCase().split(/(\s+|[.,!?;:-])/);

  const convertedTokens = words.map((token) => {
    // If it's whitespace or punctuation, preserve
    if (/^\s+$/.test(token) || /^[.,!?;:-]$/.test(token)) {
      if (token === '.') return '۔';
      if (token === '?') return '؟';
      if (token === ',') return '،';
      return token;
    }

    const cleanWord = token.replace(/[^a-z0-9-]/g, '');
    if (!cleanWord) return token;

    // Check direct dictionary
    if (ROMAN_TO_URDU_DICTIONARY[cleanWord]) {
      return ROMAN_TO_URDU_DICTIONARY[cleanWord];
    }

    // Number conversions
    if (cleanWord === '1') return 'ایک';
    if (cleanWord === '2') return 'دو';
    if (cleanWord === '3') return 'تین';
    if (cleanWord === '4') return 'چار';
    if (cleanWord === '5') return 'پانچ';

    // Return the original word if not found (TTS can pronounce drug brand names)
    return token;
  });

  return convertedTokens.join('').replace(/\s+/g, ' ').trim();
}
