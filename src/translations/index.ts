import { Language } from '../types';

export interface UIStrings {
  brandTitle: string;
  brandTagline: string;
  appPurposeText: string;
  langEnglish: string;
  langRomanUrdu: string;
  langUrdu: string;

  // Header & Navigation
  navNewScan: string;
  navSamples: string;
  navHowItWorks: string;
  navHelpline: string;
  emergencyNotice: string;

  // Hero & Upload Section
  heroTitle: string;
  heroSubtitle: string;
  dropzoneTitle: string;
  dropzoneSubtitle: string;
  btnBrowsePhoto: string;
  btnCamera: string;
  dragActiveText: string;
  compressionNotice: string;
  cameraNotSupported: string;

  // Samples Section
  samplesTitle: string;
  samplesSubtitle: string;
  btnTrySample: string;
  sampleBadge: string;
  sample1Title: string;
  sample1Condition: string;
  sample2Title: string;
  sample2Condition: string;
  sample3Title: string;
  sample3Condition: string;

  // Processing & Loading States
  analyzingTitle: string;
  step1: string;
  step2: string;
  step3: string;
  fastProcessingHint: string;

  // Output Sections
  resultsHeaderTitle: string;
  resultsDoctor: string;
  resultsClinic: string;
  resultsDate: string;
  resultsPatient: string;

  // Section 1
  sec1Number: string;
  sec1Title: string;
  sec1Subtitle: string;
  medicineGenericLabel: string;
  medicineFormLabel: string;
  medicinePurposeLabel: string;

  // Section 2
  sec2Number: string;
  sec2Title: string;
  sec2Subtitle: string;
  timingMorning: string;
  timingAfternoon: string;
  timingNight: string;
  timingMorningDesc: string;
  timingAfternoonDesc: string;
  timingNightDesc: string;
  mealBefore: string;
  mealAfter: string;
  mealWith: string;
  mealAnytime: string;
  durationLabel: string;
  dosageLabel: string;

  // Section 3
  sec3Number: string;
  sec3Title: string;
  sec3Subtitle: string;
  doctorNotesTitle: string;
  safetyWarningsTitle: string;

  // Audio Engine Controls
  btnPlayFullAudio: string;
  btnStopAudio: string;
  audioPlayingBadge: string;
  audioPausedBadge: string;
  btnListenThisMed: string;
  audioSpeechTooltip: string;

  // Save / Download & Share Actions
  btnSaveDownload: string;
  btnDownloadText: string;
  btnPrintPdf: string;
  btnShareWhatsApp: string;
  whatsappShareTooltip: string;
  exportDownloadedNotice: string;
  copiedToClipboardNotice: string;

  // Emergency Helplines
  emergencyAlertTitle: string;
  emergencyAlertSubtitle: string;
  rescue1122Title: string;
  rescue1122Desc: string;
  edhi1020Title: string;
  edhi1020Desc: string;
  healthHelplineTitle: string;
  healthHelplineDesc: string;
  policeEmergencyTitle: string;
  policeEmergencyDesc: string;
  btnDirectCall: string;
  customClinicTitle: string;
  customClinicSubtitle: string;
  emergencyDisclaimer: string;

  // Error & Retry Modal
  errorTitle: string;
  errorDefaultMsg: string;
  btnRetry: string;
  btnUploadNew: string;

  // How it works guide
  howItWorksTitle: string;
  stepPhotoTitle: string;
  stepPhotoDesc: string;
  stepAnalyzeTitle: string;
  stepAnalyzeDesc: string;
  stepListenTitle: string;
  stepListenDesc: string;

  // Footer & Disclaimer
  medicalDisclaimer: string;
  footerRights: string;
}

export const translations: Record<Language, UIStrings> = {
  en: {
    brandTitle: 'CureBridge AI',
    brandTagline: 'Prescription Voice & Visual Reader for Patients',
    appPurposeText: 'Empowering low-literacy patients with easy medical prescription analysis & audio guidance.',
    langEnglish: 'English',
    langRomanUrdu: 'Roman Urdu',
    langUrdu: 'اردو',

    navNewScan: 'Analyze Prescription',
    navSamples: 'Sample Prescriptions',
    navHowItWorks: 'How It Works',
    navHelpline: 'Emergency Help',
    emergencyNotice: 'Emergency? Dial 1122 for Rescue or 1020 for Edhi Ambulance.',

    heroTitle: 'Upload Your Doctor’s Prescription',
    heroSubtitle:
      'Take a photo of your paper prescription slip or choose an image. CureBridge will read the handwriting and explain the medicines with pictures and voice.',
    dropzoneTitle: 'Drop prescription image here, or browse',
    dropzoneSubtitle: 'Supports smartphone camera photos (JPG, PNG, WebP) · Auto-downscaled for instant 3s speed',
    btnBrowsePhoto: 'Choose Prescription Photo',
    btnCamera: 'Capture With Camera',
    dragActiveText: 'Release photo here to analyze...',
    compressionNotice: 'Optimized via fast client-side compression',
    cameraNotSupported: 'Camera is not available on this device. Please upload a saved photo.',

    samplesTitle: 'Or Try Pre-Loaded Sample Prescriptions',
    samplesSubtitle: 'Click any sample below to see how CureBridge AI translates handwriting into simple schedules and speech.',
    btnTrySample: 'Load Sample',
    sampleBadge: 'Sample Slip',
    sample1Title: 'Fever & Infection',
    sample1Condition: 'Panadol · Augmentin · Arinac',
    sample2Title: 'Stomach Acidity & Gastritis',
    sample2Condition: 'Risek · Gaviscon · Motilium',
    sample3Title: 'Diabetes & High Blood Pressure',
    sample3Condition: 'Glucophage · Norvasc · Disprin',

    analyzingTitle: 'Analyzing Your Prescription...',
    step1: 'Scanning doctor’s handwriting & clinic slip...',
    step2: 'Translating medicine names and purposes...',
    step3: 'Generating visual morning, afternoon & night schedule...',
    fastProcessingHint: 'Target turnaround: 3 to 5 seconds',

    resultsHeaderTitle: 'Prescription Analysis',
    resultsDoctor: 'Prescribed by',
    resultsClinic: 'Clinic / Hospital',
    resultsDate: 'Prescription Date',
    resultsPatient: 'Patient',

    sec1Number: '1',
    sec1Title: 'Medicine Name & Purpose',
    sec1Subtitle: 'What is this medicine and why did the doctor prescribe it?',
    medicineGenericLabel: 'Formula / Generic',
    medicineFormLabel: 'Medicine Type',
    medicinePurposeLabel: 'Why to take it',

    sec2Number: '2',
    sec2Title: 'Dosage & Timings',
    sec2Subtitle: 'When and how many times to take each medication',
    timingMorning: 'Morning',
    timingAfternoon: 'Afternoon',
    timingNight: 'Night',
    timingMorningDesc: 'Breakfast time (approx 8 AM)',
    timingAfternoonDesc: 'Lunch time (approx 1 PM - 2 PM)',
    timingNightDesc: 'Dinner / Bedtime (approx 8 PM - 9 PM)',
    mealBefore: 'Before Food (Empty Stomach)',
    mealAfter: 'After Food (Full Stomach)',
    mealWith: 'During Meals',
    mealAnytime: 'Anytime / As Needed',
    durationLabel: 'Treatment Length',
    dosageLabel: 'Single Dose',

    sec3Number: '3',
    sec3Title: 'Special Precautions & Warnings',
    sec3Subtitle: 'Important food rules, storage, and safety instructions',
    doctorNotesTitle: 'General Doctor Advice',
    safetyWarningsTitle: 'Important Safety Alerts',

    btnPlayFullAudio: '🔊 Play Audio / Sunein',
    btnStopAudio: '⏹️ Stop Audio / Rokein',
    audioPlayingBadge: 'Speaking Prescription...',
    audioPausedBadge: 'Audio Paused',
    btnListenThisMed: 'Listen to this medicine',
    audioSpeechTooltip: 'Speaks using native voice engine',

    btnSaveDownload: '📥 Save / Download Summary',
    btnDownloadText: 'Download Text File (.txt)',
    btnPrintPdf: 'Print or Save as PDF',
    btnShareWhatsApp: '📲 Share via WhatsApp',
    whatsappShareTooltip: 'Send formatted schedule to family or caregiver on WhatsApp',
    exportDownloadedNotice: 'Prescription summary downloaded successfully.',
    copiedToClipboardNotice: 'Summary copied to clipboard!',

    emergencyAlertTitle: '🚨 Emergency Help & Medical Assistance',
    emergencyAlertSubtitle: 'Immediate direct-dial links for rapid emergency ambulances and health hotlines.',
    rescue1122Title: 'Rescue 1122 (Ambulance & Emergency)',
    rescue1122Desc: 'Free government emergency ambulance, trauma, and rescue response.',
    edhi1020Title: 'Edhi Ambulance Service (1020 / 115)',
    edhi1020Desc: '24/7 nationwide emergency medical transport and ambulance fleet.',
    healthHelplineTitle: 'National Health Helpline (1166)',
    healthHelplineDesc: 'Government health advisory and medical consultation service.',
    policeEmergencyTitle: 'Police Emergency Assistance (15)',
    policeEmergencyDesc: 'Instant emergency assistance across all districts.',
    btnDirectCall: 'Call Now',
    customClinicTitle: 'Direct Clinic Emergency Contact',
    customClinicSubtitle: 'Quick dial your local doctor or emergency hospital',
    emergencyDisclaimer: 'In life-threatening situations, call 1122 or head to the nearest hospital emergency room immediately.',

    errorTitle: 'Unable to Read Prescription',
    errorDefaultMsg:
      'We could not clearly read the prescription image. Please ensure the paper is well-lit, fully visible without shadows or blur, and try again.',
    btnRetry: '🔄 Try Again / Dubara Koshish',
    btnUploadNew: 'Upload Different Photo',

    howItWorksTitle: 'How CureBridge AI Helps Low-Literacy Patients',
    stepPhotoTitle: '1. Take a Clear Photo',
    stepPhotoDesc: 'Snap a picture of the paper slip received from the doctor or pharmacy.',
    stepAnalyzeTitle: '2. Smart Visual Breakdown',
    stepAnalyzeDesc: 'See medicines categorized with sun, noon, and moon icons for morning, afternoon, and night.',
    stepListenTitle: '3. Listen in Clear Urdu Voice',
    stepListenDesc: 'Press "Sunein" to hear authentic, accent-free spoken Urdu voice guidance.',

    medicalDisclaimer:
      'Important Medical Advisory: CureBridge AI is an assistive digital aid to enhance health literacy. Always verify dosage with your certified doctor or registered pharmacist before beginning any medication.',
    footerRights: 'All rights reserved. Dedicated to patient health accessibility.',
  },

  romanUrdu: {
    brandTitle: 'CureBridge AI',
    brandTagline: 'Mareezon Ke Liye Dawai Ki Parchi Samjhne Ka Asaan Zariya',
    appPurposeText: 'Aasani se apni dawai ki parchi samjhein aur sunaein.',
    langEnglish: 'English',
    langRomanUrdu: 'Roman Urdu',
    langUrdu: 'اردو',

    navNewScan: 'Parchi Check Karein',
    navSamples: 'Misaali Parchiyan',
    navHowItWorks: 'Yeh Kaise Kaam Karta Hai',
    navHelpline: 'Emergency Madad',
    emergencyNotice: 'Emergency? Foran 1122 Rescue ya 1020 Edhi Ambulance par call karein.',

    heroTitle: 'Apni Dawai Ki Parchi Ki Photo Upload Karein',
    heroSubtitle:
      'Doctor ki likhi hui parchi ki saaf photo kheenchein ya phone se chunein. CureBridge AI likhai ko parh kar tasweeron aur awaaz mein asaan karke samjhaye ga.',
    dropzoneTitle: 'Parchi ki photo yahan drag karein ya browse karein',
    dropzoneSubtitle: 'Mobile camera ki photo (JPG, PNG) · 3 second mein foran natija',
    btnBrowsePhoto: 'Parchi Ki Photo Chunein',
    btnCamera: 'Camera Se Photo Kheenchein',
    dragActiveText: 'Photo yahan chhor dein...',
    compressionNotice: 'Photo ka size foran chhota kar diya gaya hai taake foran parhi jaye',
    cameraNotSupported: 'Is device par camera dastiyab nahi hai. Baraye meharbani gallery se photo chunein.',

    samplesTitle: 'Ya Yahan Se Kisi Misaali Parchi Par Click Karein',
    samplesSubtitle: 'Neeche di gayi kisi bhi parchi ko chunein aur dekhein ke kaise mushkil tehreer asaan schedule aur awaaz ban jati hai.',
    btnTrySample: 'Yeh Parchi Dekhein',
    sampleBadge: 'Misaali Parchi',
    sample1Title: 'Bukhar Aur Infection',
    sample1Condition: 'Panadol · Augmentin · Arinac',
    sample2Title: 'Meda Aur Tezabiat',
    sample2Condition: 'Risek · Gaviscon · Motilium',
    sample3Title: 'Sugar Aur High BP Ki Dawai',
    sample3Condition: 'Glucophage · Norvasc · Disprin',

    analyzingTitle: 'Aap Ki Parchi Parhi Ja Rahi Hai...',
    step1: 'Doctor ki tehreer aur clinic slip ka jaiza liya ja raha hai...',
    step2: 'Dawaeeyon ke naam aur maqsad asaan alfaz mein samjhay ja rahe hain...',
    step3: 'Subah, dopahar aur raat ka asaan schedule tayyar ho raha hai...',
    fastProcessingHint: '3 se 5 second mein natija samnay aa jaye ga',

    resultsHeaderTitle: 'Parchi Ka Mukammal Khulasa',
    resultsDoctor: 'Doctor ka naam',
    resultsClinic: 'Hospital / Clinic',
    resultsDate: 'Parchi ki tareekh',
    resultsPatient: 'Mareez',

    sec1Number: '1',
    sec1Title: '1. Dawai Ka Naam Aur Maqsad',
    sec1Subtitle: 'Yeh dawai kis bimari ya dard ke liye di gayi hai?',
    medicineGenericLabel: 'Formula (Asal Cheez)',
    medicineFormLabel: 'Dawai Ki Qisam',
    medicinePurposeLabel: 'Fayeda / Kis Liye Hai',

    sec2Number: '2',
    sec2Title: '2. Kab Aur Kitni Dafa Leni Hai',
    sec2Subtitle: 'Subah 🌞, Dopahar 🌤️, aur Raat 🌙 ka timetable',
    timingMorning: 'Subah 🌞',
    timingAfternoon: 'Dopahar 🌤️',
    timingNight: 'Raat 🌙',
    timingMorningDesc: 'Nashtay ka waqt (taqreeban 8 baje)',
    timingAfternoonDesc: 'Dopahar khane ka waqt (1 se 2 baje)',
    timingNightDesc: 'Raat khane ya sone ka waqt (8 se 9 baje)',
    mealBefore: 'Khana Khane Se Pehle (Nehar Munh)',
    mealAfter: 'Khana Khane Ke Baad',
    mealWith: 'Khane Ke Sath (Darmiyan Mein)',
    mealAnytime: 'Zaroorat Ke Mutabiq / Kisi Bhi Waqt',
    durationLabel: 'Kitne Din Leni Hai',
    dosageLabel: 'Ek Dafa Ki Miqdaar',

    sec3Number: '3',
    sec3Title: '3. Khaas Hidayat Aur Ehtiyat',
    sec3Subtitle: 'Khane peene ke ehtiyat aur zaroori hidayat',
    doctorNotesTitle: 'Doctor Ka Ahem Mashwara',
    safetyWarningsTitle: 'Khaas Ehtiyati Tadabeer',

    btnPlayFullAudio: '🔊 Sunein / Play Audio',
    btnStopAudio: '⏹️ Rokein / Stop Audio',
    audioPlayingBadge: 'Parchi parh kar sunayi ja rahi hai...',
    audioPausedBadge: 'Awaaz ruki hui hai',
    btnListenThisMed: 'Is dawai ke bare mein sunein',
    audioSpeechTooltip: 'Saaf Urdu awaaz mein sunein',

    btnSaveDownload: '📥 Summary Download Karein',
    btnDownloadText: 'File Download Karein (.txt)',
    btnPrintPdf: 'Print Ya PDF Banayein',
    btnShareWhatsApp: '📲 WhatsApp Par Bhejein',
    whatsappShareTooltip: 'Ghar walon ko WhatsApp par timetable bhejein',
    exportDownloadedNotice: 'Parchi ka khulasa download ho gaya hai.',
    copiedToClipboardNotice: 'Khulasa copy ho gaya!',

    emergencyAlertTitle: '🚨 Emergency Madad Aur Rescue Services',
    emergencyAlertSubtitle: 'Fori madad ke liye qareebi ambulance aur helplines par call karein.',
    rescue1122Title: 'Rescue 1122 (Ambulance & Fire)',
    rescue1122Desc: 'Muft sarkari ambulance aur emergency rescue service.',
    edhi1020Title: 'Edhi Ambulance Service (1020 / 115)',
    edhi1020Desc: '24 ghante dastiyab mulk-geer emergency ambulance.',
    healthHelplineTitle: 'Sehat Tahaffuz Helpline (1166)',
    healthHelplineDesc: 'Sarkari tibbi mashwara aur sehat ki helpline.',
    policeEmergencyTitle: 'Police Emergency Madad (15)',
    policeEmergencyDesc: 'Khatray ya emergency ki soorat mein police rabta.',
    btnDirectCall: 'Call Karein',
    customClinicTitle: 'Qareebi Clinic Ka Number',
    customClinicSubtitle: 'Apne doctor ya hospital se foran rabta karein',
    emergencyDisclaimer: 'Agar mareez ki halat shadeed kharab ho to foran 1122 milayein ya qareebi emergency le jayen.',

    errorTitle: 'Parchi Parhi Nahi Ja Saki',
    errorDefaultMsg:
      'Tasweer saaf nahi thi ya roshni kam thi. Baraye meharbani achhi roshni mein seedhi aur saaf photo kheench kar dobara koshish karein.',
    btnRetry: '🔄 Dubara Koshish Karein / Retry',
    btnUploadNew: 'Doosri Photo Upload Karein',

    howItWorksTitle: 'CureBridge AI Kaise Madad Karta Hai?',
    stepPhotoTitle: '1. Photo Kheenchein',
    stepPhotoDesc: 'Doctor se mili hui kaaghaz ki parchi ki saaf photo lein.',
    stepAnalyzeTitle: '2. Tasweeron Wala Schedule',
    stepAnalyzeDesc: 'Suraj aur Chaand ke nishan se pehchanein ke dawai kab khani hai.',
    stepListenTitle: '3. Saaf Urdu Mein Sunein',
    stepListenDesc: '"Sunein" ka button dabayein aur saaf Urdu awaaz mein poori parchi samjhein.',

    medicalDisclaimer:
      'Tibbi Hidayat: CureBridge AI sirf parchi samjhne mein madad ke liye hai. Dawai shuru karne se pehle apne doctor ya medical store walay se zaroor tasdeeq kar lein.',
    footerRights: 'Jumla huqooq mehfooz hain. Har mareez ki sehat ke liye asaan zariya.',
  },

  ur: {
    brandTitle: 'CureBridge AI',
    brandTagline: 'مریضوں کے لیے نسخہ سمجھنے اور آواز میں سننے کا آسان ذریعہ',
    appPurposeText: 'آسانی سے اپنی دوائی کی پرچی سمجھیں اور سنیں۔',
    langEnglish: 'English',
    langRomanUrdu: 'Roman Urdu',
    langUrdu: 'اردو',

    navNewScan: 'نسخہ چیک کریں',
    navSamples: 'نمونہ نسخہ جات',
    navHowItWorks: 'یہ کیسے کام کرتا ہے؟',
    navHelpline: 'ایمرجنسی سروسز',
    emergencyNotice: 'ہنگامی حالت؟ فوری ۱۱۲۲ ریسکیو یا ۱۰۲۰ ایدھی ایمبولینس پر کال کریں۔',

    heroTitle: 'اپنے ڈاکٹر کے نسخے کی تصویر اپلوڈ کریں',
    heroSubtitle:
      'ڈاکٹر کی لکھی ہوئی کاغذی پرچی کی صاف تصویر لیں یا موبائل سے منتخب کریں۔ کیور برج اے آئی لکھائی کو پڑھ کر آسان تصویروں اور آواز میں سمجھائے گا۔',
    dropzoneTitle: 'نسخے کی تصویر یہاں ڈریگ کریں یا منتخب کریں',
    dropzoneSubtitle: 'موبائل کیمرہ فوٹو (جے پی جی، پی این جی) · ۳ سیکنڈ میں فوری نتیجہ',
    btnBrowsePhoto: 'تصویر منتخب کریں',
    btnCamera: 'کیمرہ سے تصویر لیں',
    dragActiveText: 'تصویر یہاں چھوڑیں...',
    compressionNotice: 'فوری اور تیز رفتار جائزے کے لیے سائز خودکار طور پر کم کیا گیا ہے',
    cameraNotSupported: 'اس ڈیوائس پر کیمرہ دستیاب نہیں۔ براہِ کرم گیلری سے تصویر منتخب فرمائیں۔',

    samplesTitle: 'یا نیچے دی گئی نمونہ پرچیوں میں سے کسی ایک کو آزمائیں',
    samplesSubtitle: 'کسی بھی نمونے پر کلک کریں اور دیکھیں کہ کس طرح مشکل لکھائی آسان شیڈول اور اردو آواز میں تبدیل ہو جاتی ہے۔',
    btnTrySample: 'یہ نسخہ دیکھیں',
    sampleBadge: 'نمونہ پرچی',
    sample1Title: 'بخار اور انفیکشن',
    sample1Condition: 'پیناڈول · آگمنٹن · ایرینیک',
    sample2Title: 'معدے کی تیزابیت اور جلن',
    sample2Condition: 'رائزک · گیویسکون · موٹیلیم',
    sample3Title: 'شوگر اور بلڈ پریشر کی پرچی',
    sample3Condition: 'گلوکوفیج · نورواسک · ڈسپرین',

    analyzingTitle: 'آپ کے نسخے کا جائزہ لیا جا رہا ہے...',
    step1: 'ڈاکٹر کی لکھائی اور کلینک کی پرچی پڑھی جا رہی ہے...',
    step2: 'دوائیوں کے نام اور مقاصد کو آسان الفاظ میں سمجھا جا رہا ہے...',
    step3: 'صبح، دوپہر اور رات کا تصویری شیڈول تیار ہو رہا ہے...',
    fastProcessingHint: '۳ سے ۵ سیکنڈ میں مکمل تفصیلات سامنے آ جائیں گی',

    resultsHeaderTitle: 'نسخے کی مکمل تفصیل',
    resultsDoctor: 'ڈاکٹر کا نام',
    resultsClinic: 'ہسپتال / کلینک',
    resultsDate: 'نسخے کی تاریخ',
    resultsPatient: 'مریض کا نام',

    sec1Number: '۱',
    sec1Title: '۱. دوائی کا نام اور استعمال کا مقصد',
    sec1Subtitle: 'یہ دوائی کس بیماری یا تکلیف کے علاج کے لیے تجویز کی گئی ہے؟',
    medicineGenericLabel: 'فارمولا (بنیادی دوا)',
    medicineFormLabel: 'دوائی کی قسم',
    medicinePurposeLabel: 'استعمال کا مقصد / فائدہ',

    sec2Number: '۲',
    sec2Title: '۲. دوائی کی مقدار اور اوقات',
    sec2Subtitle: 'صبح 🌞، دوپہر 🌤️ اور رات 🌙 کا باقاعدہ شیڈول',
    timingMorning: 'صبح 🌞',
    timingAfternoon: 'دوپہر 🌤️',
    timingNight: 'رات 🌙',
    timingMorningDesc: 'ناشتے کا وقت (تقریباً صبح ۸ بجے)',
    timingAfternoonDesc: 'دوپہر کھانے کا وقت (۱ سے ۲ بجے)',
    timingNightDesc: 'رات کھانے یا سونے کا وقت (۸ سے ۹ بجے)',
    mealBefore: 'کھانا کھانے سے پہلے (نہار منہ)',
    mealAfter: 'کھانا کھانے کے بعد',
    mealWith: 'کھانے کے ساتھ (کھانے کے دوران)',
    mealAnytime: 'حسبِ ضرورت / کسی بھی وقت',
    durationLabel: 'کتنے دن کھانی ہے',
    dosageLabel: 'ایک وقت کی خوراک',

    sec3Number: '۳',
    sec3Title: '۳. خاص ہدایات اور احتیاطی تدابیر',
    sec3Subtitle: 'کھانے پینے کے اصول، پرہیز اور ضروری طبی احتیاطیں',
    doctorNotesTitle: 'ڈاکٹر کا عمومی مشورہ',
    safetyWarningsTitle: 'اہم احتیاطی ہدایات',

    btnPlayFullAudio: '🔊 آواز سنیں / Play Audio',
    btnStopAudio: '⏹️ آواز بند کریں / Stop Audio',
    audioPlayingBadge: 'نسخہ پڑھ کر سنایا جا رہا ہے...',
    audioPausedBadge: 'آواز رکی ہوئی ہے',
    btnListenThisMed: 'اس دوائی کی تفصیل سنیں',
    audioSpeechTooltip: 'صاف اردو آواز میں سنیں',

    btnSaveDownload: '📥 خلاصہ محفوظ / ڈاؤنلوڈ کریں',
    btnDownloadText: 'فائل ڈاؤنلوڈ کریں (.txt)',
    btnPrintPdf: 'پرنٹ کریں یا پی ڈی ایف محفوظ کریں',
    btnShareWhatsApp: '📲 واٹس ایپ پر شیئر کریں',
    whatsappShareTooltip: 'اہل خانہ یا تیمار دار کو واٹس ایپ پر نسخہ بھیجیں',
    exportDownloadedNotice: 'نسخے کا خلاصہ ڈاؤنلوڈ ہو گیا۔',
    copiedToClipboardNotice: 'خلاصہ کاپی ہو گیا!',

    emergencyAlertTitle: '🚨 ہنگامی طبی امداد اور ایمرجنسی ہیلپ لائنز',
    emergencyAlertSubtitle: 'کسی بھی فوری ضرورت یا ہنگامی حالت میں نیچے دیے گئے نمبروں پر بلا جھجھک رابطہ کریں۔',
    rescue1122Title: 'ریسکیو ۱۱۲۲ (ایمبولینس اور ایمرجنسی)',
    rescue1122Desc: 'مفت حکومتی ایمرجنسی ایمبولینس اور ریسکیو فورس۔',
    edhi1020Title: 'ایدھی ایمبولینس سروس (۱۰۲۰ / ۱۱۵)',
    edhi1020Desc: 'چوبیس گھنٹے فعال ملک گیر ہنگامی ایمبولینس سروس۔',
    healthHelplineTitle: 'صحت تحفظ ہیلپ لائن (۱۱۶۶)',
    healthHelplineDesc: 'حکومتی طبی معلوماتی اور رہنمائی ہیلپ لائن۔',
    policeEmergencyTitle: 'پولیس مدد (۱۵)',
    policeEmergencyDesc: 'کسی بھی ہنگامی تحفظ کے لیے پولیس ایمرجنسی۔',
    btnDirectCall: 'کال کریں',
    customClinicTitle: 'مقامی کلینک یا ڈاکٹر سے رابطہ',
    customClinicSubtitle: 'اپنے معالج یا ہسپتال کے ایمرجنسی نمبر پر رابطہ کریں',
    emergencyDisclaimer: 'اگر مریض کی حالت تشویشناک ہو تو بغیر تاخیر فوراً ۱۱۲۲ ملائیں یا قریبی ہسپتال لے جائیں۔',

    errorTitle: 'نسخہ پڑھنے میں دشواری پیش آئی',
    errorDefaultMsg:
      'تصویر دھندلی تھی یا روشنی ناکافی تھی۔ براہِ کرم اچھی روشنی میں سیدھی اور واضح تصویر کھینچ کر دوبارہ کوشش فرمائیں۔',
    btnRetry: '🔄 دوبارہ کوشش کریں / Retry',
    btnUploadNew: 'دوسری تصویر منتخب کریں',

    howItWorksTitle: 'کیور برج اے آئی کس طرح مریضوں کی مدد کرتا ہے؟',
    stepPhotoTitle: '۱. صاف تصویر کھینچیں',
    stepPhotoDesc: 'ڈاکٹر یا میڈیکل سٹور سے ملی ہوئی کاغذی پرچی کی صاف تصویر بنائیں۔',
    stepAnalyzeTitle: '۲. آسان تصویری شیڈول',
    stepAnalyzeDesc: 'سورج اور چاند کے نشانات سے آسانی سے سمجھیں کہ کون سی دوا کس وقت لینی ہے۔',
    stepListenTitle: '۳. صاف اردو آواز میں سنیں',
    stepListenDesc: 'صرف "آواز سنیں" کا بٹن دبائیں اور قدرتی اردو لہجے میں پوری پرچی سنیں۔',

    medicalDisclaimer:
      'طبی تنبیہ: کیور برج اے آئی محض مریضوں کی آگاہی اور نسخہ سمجھنے کی سہولت کے لیے ہے۔ کوئی بھی دوا استعمال کرنے سے پہلے اپنے ڈاکٹر یا مستند فارماسسٹ سے لازماً تصدیق فرمائیں۔',
    footerRights: 'جملہ حقوق محفوظ ہیں۔ کم پڑھے لکھے افراد کی صحت اور فلاح کے لیے وقف۔',
  },
};
