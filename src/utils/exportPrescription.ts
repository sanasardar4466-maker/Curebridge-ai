import { Language, PrescriptionAnalysis } from '../types';

/**
 * Generates and downloads a clean text summary of the prescription in the selected UI language.
 */
export function downloadPrescriptionTextSummary(analysis: PrescriptionAnalysis, lang: Language): void {
  const isUrdu = lang === 'ur';
  const isRoman = lang === 'romanUrdu';

  let content = '';

  if (isUrdu) {
    content = `======================================================
کیور برج اے آئی - نسخے کا مکمل تصویری و صوتی خلاصہ
CureBridge AI - Medical Prescription Summary
======================================================
تاریخ: ${analysis.date || 'نہیں لکھی'}
ہسپتال / کلینک: ${analysis.clinicName || 'کلینک'}
ڈاکٹر کا نام: ${analysis.doctorName || 'معالج'}
مریض کا نام: ${analysis.patientName || 'مریض'}

------------------------------------------------------
تجویز کردہ ادویات اور اوقاتِ خوراک (صبح، دوپہر، رات):
------------------------------------------------------
`;

    analysis.medicines.forEach((med, idx) => {
      const morningStr = med.timing.morning ? 'صبح: ہاں (لینی ہے)' : 'صبح: نہیں';
      const afternoonStr = med.timing.afternoon ? 'دوپہر: ہاں (لینی ہے)' : 'دوپہر: نہیں';
      const nightStr = med.timing.night ? 'رات: ہاں (لینی ہے)' : 'رات: نہیں';
      const mealStr =
        med.timing.withFood === 'before'
          ? 'کھانے سے پہلے (نہار منہ)'
          : med.timing.withFood === 'after'
          ? 'کھانا کھانے کے بعد'
          : med.timing.withFood === 'with'
          ? 'کھانے کے ساتھ'
          : 'حسبِ ضرورت';

      content += `
${idx + 1}. ${med.name} (${med.form}${med.strength ? ' - ' + med.strength : ''})
   • بنیادی فارمولا: ${med.genericName || 'طبی فارمولا'}
   • استعمال کا مقصد: ${med.purpose.ur}
   • اوقات: ${morningStr} | ${afternoonStr} | ${nightStr}
   • کھانے کی ہدایت: ${mealStr}
   • ایک وقت کی مقدار: ${med.timing.dosageAmount}
   • کتنے دن لینی ہے: ${med.duration.ur}
   • ضروری احتیاط: ${med.precautions.ur}
`;
    });

    content += `
------------------------------------------------------
ڈاکٹر کا عمومی مشورہ اور ہدایات:
------------------------------------------------------
${analysis.overallAdvice?.ur || ''}

------------------------------------------------------
ہنگامی طبی ایمرجنسی نمبرز:
------------------------------------------------------
• ریسکیو ۱۱۲۲ (ایمبولینس و ریسکیو فورس): 1122
• ایدھی ایمبولینس سروس: 1020 / 115
• قومی صحت تحفظ ہیلپ لائن: 1166
• پولیس ایمرجنسی: 15

------------------------------------------------------
طبی تنبیہ: کیور برج اے آئی محض مریضوں کی آگاہی اور نسخہ سمجھنے کی سہولت کے لیے ہے۔ کوئی بھی دوا استعمال کرنے سے پہلے اپنے ڈاکٹر یا فارماسسٹ سے لازماً تصدیق فرما لیں۔
`;
  } else if (isRoman) {
    content = `======================================================
CUREBRIDGE AI - DAWAI KI PARCHI KA KHULASA
Medical Prescription Summary
======================================================
Tareekh: ${analysis.date || 'N/A'}
Hospital / Clinic: ${analysis.clinicName || 'Clinic'}
Doctor: ${analysis.doctorName || 'Doctor'}
Mareez: ${analysis.patientName || 'Patient'}

------------------------------------------------------
DAWAEEYON KA SCHEDULE (SUBAH, DOPAHAR, RAAT):
------------------------------------------------------
`;

    analysis.medicines.forEach((med, idx) => {
      const morningStr = med.timing.morning ? 'Subah: HAAN' : 'Subah: NAHI';
      const afternoonStr = med.timing.afternoon ? 'Dopahar: HAAN' : 'Dopahar: NAHI';
      const nightStr = med.timing.night ? 'Raat: HAAN' : 'Raat: NAHI';
      const mealStr =
        med.timing.withFood === 'before'
          ? 'Khane Se Pehle (Nehar Munh)'
          : med.timing.withFood === 'after'
          ? 'Khana Khane Ke Baad'
          : med.timing.withFood === 'with'
          ? 'Khane Ke Sath'
          : 'Zaroorat Ke Mutabiq';

      content += `
${idx + 1}. ${med.name} (${med.form}${med.strength ? ' - ' + med.strength : ''})
   • Formula: ${med.genericName || 'N/A'}
   • Maqsad: ${med.purpose.romanUrdu}
   • Schedule: ${morningStr} | ${afternoonStr} | ${nightStr}
   • Khana: ${mealStr}
   • Miqdaar: ${med.timing.dosageAmount}
   • Kitne Din: ${med.duration.romanUrdu}
   • Ehtiyat: ${med.precautions.romanUrdu}
`;
    });

    content += `
------------------------------------------------------
DOCTOR KA MASHWARA AUR HIDAYAT:
------------------------------------------------------
${analysis.overallAdvice?.romanUrdu || ''}

------------------------------------------------------
EMERGENCY HELPLINES (PAKISTAN):
------------------------------------------------------
• Rescue 1122 Ambulance: 1122
• Edhi Ambulance: 1020 / 115
• Sehat Helpline: 1166
• Police: 15

------------------------------------------------------
Tibbi Hidayat: CureBridge AI sirf parchi samjhne mein madad ke liye hai. Dawai shuru karne se pehle doctor ya pharmacist se tasdeeq zaroor karein.
`;
  } else {
    // English
    content = `======================================================
CUREBRIDGE AI - MEDICAL PRESCRIPTION SUMMARY
======================================================
Date: ${analysis.date || 'N/A'}
Clinic / Hospital: ${analysis.clinicName || 'Clinic'}
Doctor: ${analysis.doctorName || 'Doctor'}
Patient: ${analysis.patientName || 'Patient'}

------------------------------------------------------
PRESCRIBED MEDICINES & DOSAGE SCHEDULE:
------------------------------------------------------
`;

    analysis.medicines.forEach((med, idx) => {
      const morningStr = med.timing.morning ? 'Morning: YES' : 'Morning: NO';
      const afternoonStr = med.timing.afternoon ? 'Afternoon: YES' : 'Afternoon: NO';
      const nightStr = med.timing.night ? 'Night: YES' : 'Night: NO';
      const mealStr =
        med.timing.withFood === 'before'
          ? 'Before Food (Empty Stomach)'
          : med.timing.withFood === 'after'
          ? 'After Food'
          : med.timing.withFood === 'with'
          ? 'During Meals'
          : 'As Needed';

      content += `
${idx + 1}. ${med.name} (${med.form}${med.strength ? ' - ' + med.strength : ''})
   • Generic Formula: ${med.genericName || 'N/A'}
   • Purpose: ${med.purpose.en}
   • Schedule: ${morningStr} | ${afternoonStr} | ${nightStr}
   • Meal Timing: ${mealStr}
   • Dosage: ${med.timing.dosageAmount}
   • Duration: ${med.duration.en}
   • Precautions: ${med.precautions.en}
`;
    });

    content += `
------------------------------------------------------
DOCTOR'S GENERAL ADVICE & PRECAUTIONS:
------------------------------------------------------
${analysis.overallAdvice?.en || ''}

------------------------------------------------------
EMERGENCY MEDICAL HELPLINES (PAKISTAN):
------------------------------------------------------
• Rescue 1122 (Ambulance & Trauma): 1122
• Edhi Ambulance Service: 1020 / 115
• National Health Helpline: 1166
• Police Emergency: 15

------------------------------------------------------
Medical Disclaimer: CureBridge AI is an assistive digital aid. Always verify all dosages and medication choices with your licensed physician or pharmacist.
`;
  }

  // Add UTF-8 BOM so Urdu renders properly in Windows Notepad and all text viewers
  const blob = new Blob(['\uFEFF' + content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const safeName = (analysis.patientName || 'Prescription').replace(/[^a-zA-Z0-9_-]/g, '_');
  anchor.href = url;
  anchor.download = `CureBridge_${safeName}_Summary.txt`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Generates an easy-to-read WhatsApp share message link.
 */
export function generateWhatsAppShareUrl(analysis: PrescriptionAnalysis, lang: Language): string {
  const isUrdu = lang === 'ur';
  const isRoman = lang === 'romanUrdu';

  let msg = '';

  if (isUrdu) {
    msg = `📋 *کیور برج اے آئی - نسخے کا خلاصہ*
🏥 *کلینک:* ${analysis.clinicName || 'کلینک'}
👨‍⚕️ *ڈاکٹر:* ${analysis.doctorName || 'معالج'}
👤 *مریض:* ${analysis.patientName || 'مریض'}
📅 *تاریخ:* ${analysis.date || 'نہیں لکھی'}

💊 *دوائیوں کا شیڈول:*
`;

    analysis.medicines.forEach((med, i) => {
      const times = [
        med.timing.morning ? 'صبح 🌞' : null,
        med.timing.afternoon ? 'دوپہر 🌤️' : null,
        med.timing.night ? 'رات 🌙' : null,
      ]
        .filter(Boolean)
        .join(' + ');

      const foodRule =
        med.timing.withFood === 'before'
          ? 'کھانے سے پہلے'
          : med.timing.withFood === 'after'
          ? 'کھانے کے بعد'
          : med.timing.withFood === 'with'
          ? 'کھانے کے ساتھ'
          : 'حسبِ ضرورت';

      msg += `${i + 1}. *${med.name}* (${med.form})
   • مقصد: ${med.purpose.ur}
   • اوقات: ${times || 'حسب ضرورت'}
   • خوراک: ${med.timing.dosageAmount} (${foodRule})
   • مدت: ${med.duration.ur}

`;
    });

    if (analysis.overallAdvice?.ur) {
      msg += `💡 *ڈاکٹر کی ہدایت:* ${analysis.overallAdvice.ur}\n\n`;
    }

    msg += `🚨 *ایمرجنسی ریسکیو:* 1122 | ایدھی: 1020\n_بشکریہ کیور برج اے آئی (CureBridge AI)_`;
  } else if (isRoman) {
    msg = `📋 *CureBridge AI - Dawai Ki Parchi Ka Khulasa*
🏥 *Clinic:* ${analysis.clinicName || 'Clinic'}
👨‍⚕️ *Doctor:* ${analysis.doctorName || 'Doctor'}
👤 *Mareez:* ${analysis.patientName || 'Patient'}
📅 *Tareekh:* ${analysis.date || 'N/A'}

💊 *Dawaeeyon Ka Schedule:*
`;

    analysis.medicines.forEach((med, i) => {
      const times = [
        med.timing.morning ? 'Subah 🌞' : null,
        med.timing.afternoon ? 'Dopahar 🌤️' : null,
        med.timing.night ? 'Raat 🌙' : null,
      ]
        .filter(Boolean)
        .join(' + ');

      const foodRule =
        med.timing.withFood === 'before'
          ? 'Khane se pehle'
          : med.timing.withFood === 'after'
          ? 'Khana khane ke baad'
          : med.timing.withFood === 'with'
          ? 'Khane ke sath'
          : 'Zaroorat par';

      msg += `${i + 1}. *${med.name}* (${med.form})
   • Maqsad: ${med.purpose.romanUrdu}
   • Waqt: ${times || 'Zaroorat par'}
   • Miqdaar: ${med.timing.dosageAmount} (${foodRule})
   • Din: ${med.duration.romanUrdu}

`;
    });

    if (analysis.overallAdvice?.romanUrdu) {
      msg += `💡 *Doctor Ki Hidayat:* ${analysis.overallAdvice.romanUrdu}\n\n`;
    }

    msg += `🚨 *Emergency Rescue:* 1122 | Edhi: 1020\n_CureBridge AI Se Bheja Gaya_`;
  } else {
    // English
    msg = `📋 *CureBridge AI - Medical Prescription Summary*
🏥 *Clinic:* ${analysis.clinicName || 'Clinic'}
👨‍⚕️ *Doctor:* ${analysis.doctorName || 'Doctor'}
👤 *Patient:* ${analysis.patientName || 'Patient'}
📅 *Date:* ${analysis.date || 'N/A'}

💊 *Medication Schedule:*
`;

    analysis.medicines.forEach((med, i) => {
      const times = [
        med.timing.morning ? 'Morning 🌞' : null,
        med.timing.afternoon ? 'Afternoon 🌤️' : null,
        med.timing.night ? 'Night 🌙' : null,
      ]
        .filter(Boolean)
        .join(' + ');

      const foodRule =
        med.timing.withFood === 'before'
          ? 'Before food'
          : med.timing.withFood === 'after'
          ? 'After food'
          : med.timing.withFood === 'with'
          ? 'During meals'
          : 'As needed';

      msg += `${i + 1}. *${med.name}* (${med.form})
   • Purpose: ${med.purpose.en}
   • Schedule: ${times || 'As needed'}
   • Dose: ${med.timing.dosageAmount} (${foodRule})
   • Duration: ${med.duration.en}

`;
    });

    if (analysis.overallAdvice?.en) {
      msg += `💡 *Doctor Advice:* ${analysis.overallAdvice.en}\n\n`;
    }

    msg += `🚨 *Emergency Rescue:* 1122 | Edhi Ambulance: 1020\n_Sent via CureBridge AI_`;
  }

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
}

/**
 * Triggers standard browser print dialog for printing or saving as PDF.
 */
export function printPrescriptionSummary(analysis: PrescriptionAnalysis, lang: Language): void {
  window.print();
}
