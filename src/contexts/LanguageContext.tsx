
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'si' | 'ta';

interface LanguageContextType {
  language: Language;
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.beforeSurgery': 'Before Surgery',
    'nav.duringSurgery': 'During Surgery',
    'nav.afterSurgery': 'After Surgery',
    'nav.resources': 'Resources',
    'nav.admin': 'Admin',

    // Hero Section
    'hero.title': 'Understanding Anaesthesia: What to expect before, during, and after your surgery',
    'hero.subtitle': 'Your guide to a safe, comfortable surgical experience',
    'hero.intro': 'Anaesthesia is a medical specialty that helps you undergo surgery without pain and safely. Today\'s modern anaesthetic techniques are carefully monitored by anaesthetists who are dedicated to your comfort and well-being.',

    // CTA Buttons
    'cta.before': 'Before Surgery',
    'cta.during': 'During Surgery',
    'cta.after': 'After Surgery',

    // About Section
    'about.title': 'About This Resource',
    'about.whoTitle': 'Who We Are',
    'about.who': 'This is a collaborative effort by Sri Lanka\'s Anaesthesia and Critical Care teams. Our goal is to share reliable information with patients.',
    'about.whyTitle': 'Why This Resource Exists',
    'about.why': 'This was created to answer patients\' common questions, reduce their anxiety, and promote clear understanding about surgery.',

    // What to Expect Section
    'whatToExpect.title': 'What to Expect',
    'whatToExpect.before.title': 'Before Surgery',
    'whatToExpected.before.description': 'Pre-operative assessment, fasting guidelines, medication management, and preparation tips.',
    'whatToExpect.during.title': 'During Surgery',
    'whatToExpect.during.description': 'Types of anaesthesia, monitoring, safety measures, and what happens in the operating room.',
    'whatToExpect.after.title': 'After Surgery',
    'whatToExpect.after.description': 'Recovery process, pain management, side effects, and discharge planning.',
    'whatToExpect.learnMore': 'Learn More',

    // Footer
    'footer.disclaimer': 'This information is for educational purposes only and should not replace professional medical advice.',
    'footer.copyright': '© 2024 Sri Lankan Anaesthesia Education Initiative. All rights reserved.',

    // Before Surgery
    'before.title': 'Before Surgery',
    'before.intro': 'Understanding what happens before your surgery helps reduce anxiety and ensures you are well-prepared.',
    'before.qa1.question': 'What is pre-operative assessment?',
    'before.qa1.answer1': 'A comprehensive review of your medical history, physical examination, blood tests, ECG and other investigations to identify risks and optimize your health before anaesthesia.',
    'before.qa1.answer2': 'During this assessment, your anaesthetist will:',
    'before.qa1.list1': 'Review your medical history and previous surgeries',
    'before.qa1.list2': 'Ask about allergies and current medications',
    'before.qa1.list3': 'Perform physical examination focusing on your heart and lungs',
    'before.qa1.list4': 'Evaluate test results including blood tests and ECG',
    'before.qa1.list5': 'Discuss the anaesthetic plan and answer your questions',
    'before.qa2.question': 'Why is fasting required?',
    'before.qa2.answer1': 'Fasting before surgery is essential to reduce the risk of your stomach contents entering your lungs during anaesthesia, which is a serious complication called aspiration.',
    'before.qa2.guidelines': 'Fasting Guidelines:',
    'before.qa2.list1': 'Solid foods and milk: Stop 6 hours before surgery',
    'before.qa2.list2': 'Clear fluids (water, tea without milk): Stop 2 hours before surgery',
    'before.qa2.siptitle': 'Sip Till Send Program:',
    'before.qa2.siptext1': 'Many hospitals now encourage patients to drink clear fluids up to 2 hours before surgery. This helps prevent dehydration and may improve your comfort.',
    'before.qa2.siptext2': 'Ask your healthcare provider about the "Sip Till Send" approach.',
    'before.qa3.question': 'Which medications should I avoid?',
    'before.qa3.answer1': 'Some medications can interfere with anaesthesia or increase bleeding risk during surgery. Always inform your anaesthetist about all medications you take, including supplements.',
    'before.qa3.subtitle': 'Medications that may need to be stopped or adjusted include:',
    'before.qa3.list1': 'Blood thinners: Aspirin, clopidogrel, warfarin',
    'before.qa3.list2': 'NSAIDs: Ibuprofen, diclofenac',
    'before.qa3.list3': 'Herbal supplements: Ginkgo, garlic, fish oil',
    'before.qa3.important': 'Important: Never stop taking medications without discussing with your doctor or anaesthetist first.',
    'before.qa4.question': 'How should I prepare mentally and physically?',
    'before.qa4.physical': 'Physical Preparation:',
    'before.qa4.plist1': 'Get a good night\'s sleep before surgery',
    'before.qa4.plist2': 'Follow specific instructions from your surgical team',
    'before.qa4.plist3': 'Avoid alcohol for a week before surgery',
    'before.qa4.plist4': 'If you smoke, try to stop or reduce before surgery',
    'before.qa4.plist5': 'Follow specific bathing instructions before surgery',
    'before.qa4.mental': 'Mental Preparation:',
    'before.qa4.mlist1': 'Ask questions during your pre-operative assessment to address any concerns',
    'before.qa4.mlist2': 'Practice relaxation techniques like deep breathing or meditation',
    'before.qa4.mlist3': 'Bring comfort items within hospital guidelines',
    'before.qa4.mlist4': 'Arrange for family or friend support after discharge',
    'before.qa4.practical': 'Practical Preparation:',
    'before.qa4.prlist1': 'Arrange transportation to and from the hospital',
    'before.qa4.prlist2': 'Prepare your home for your return (easy meals, comfortable recovery area)',
    'before.qa4.prlist3': 'Bring a list of your medications, allergies, and previous anaesthetic experiences',
    'before.qa4.prlist4': 'Remove jewelry, makeup, and nail polish before surgery',
    'before.qa4.prlist5': 'Follow specific bathing instructions before surgery',

    // During Surgery
    'during.title': 'During Surgery',
    'during.intro': 'Understanding the different types of anaesthesia and what happens during surgery.',
    'during.qa1.question': 'What types of anaesthesia exist?',
    'during.qa1.general': 'General Anaesthesia:',
    'during.qa1.generalDesc': 'Complete unconsciousness achieved through medications. You will be completely unaware during your surgery and feel no pain.',
    'during.qa1.generalUse': 'Commonly used for: Major surgeries, body cavity operations, or when other types are not suitable.',
    'during.qa1.spinal': 'Spinal/Epidural Anaesthesia:',
    'during.qa1.spinalDesc': 'Injection of anaesthetic into the space around the spinal cord to block nerve signals.',
    'during.qa1.spinalUse': 'Commonly used for: Lower body surgeries, caesarean sections, hip/knee surgeries.',
    'during.qa1.nerve': 'Peripheral Nerve Blocks:',
    'during.qa1.nerveDesc': 'Injection of local anaesthetic around specific nerves to numb a particular area of the body.',
    'during.qa1.nerveUse': 'Commonly used for: Arm, shoulder, or leg surgeries, providing targeted pain relief.',
    'during.qa1.sedation': 'Sedation:',
    'during.qa1.sedationDesc': 'Ranges from light relaxation to deep sedation, keeping you comfortable while still allowing spontaneous breathing.',
    'during.qa1.sedationUse': 'Used for: Endoscopic procedures, dental procedures, or minor operations.',
    'during.qa2.question': 'How does each work?',
    'during.qa2.general': 'General Anaesthesia:',
    'during.qa2.generalDesc': 'Works through a combination of medications given through your IV line:',
    'during.qa2.generalList1': 'Induces unconsciousness',
    'during.qa2.generalList2': 'Relaxes muscles',
    'during.qa2.generalList3': 'Provides pain relief',
    'during.qa2.generalList4': 'Controls body functions',
    'during.qa2.generalEnd': 'When surgery ends, your anaesthetist stops the medications and you gradually wake up.',
    'during.qa2.spinal': 'Spinal Anaesthesia:',
    'during.qa2.spinalDesc': 'Medication injected into the spinal fluid:',
    'during.qa2.spinalList1': 'Prevents nerve impulses from traveling up the spinal cord to the brain',
    'during.qa2.spinalList2': 'Causes numbness in the lower body',
    'during.qa2.spinalEnd': 'The effect usually wears off within 2-4 hours after surgery.',
    'during.qa2.nerve': 'Peripheral Nerve Blocks:',
    'during.qa2.nerveDesc': 'Using ultrasound guidance, anaesthetic is injected around specific nerves. You remain conscious.',
    'during.qa2.sedation': 'Sedation:',
    'during.qa2.sedationDesc': 'When sedation is given:',
    'during.qa2.sedationList1': 'IV medications provide relaxation and sedation',
    'during.qa2.sedationList2': 'Local anaesthetic may also be used for pain relief',
    'during.qa2.sedationList3': 'You may respond to commands but not be fully aware',
    'during.qa2.sedationList4': 'Memory may be affected',
    'during.qa3.question': 'What are the risks and how are they managed?',
    'during.qa3.minor': 'Minor side effects:',
    'during.qa3.minorList1': 'Shivering (20%)',
    'during.qa3.minorList2': 'Post-operative nausea and vomiting (25%)',
    'during.qa3.minorList3': 'Sore throat (15%)',
    'during.qa3.minorList4': 'Confusion in elderly (temporary)',
    'during.qa3.regional': 'Regional anaesthesia risks:',
    'during.qa3.regionalList1': 'Headache from needle insertion (1-2%)',
    'during.qa3.regionalList2': 'Temporary neurological symptoms (0.5%)',
    'during.qa3.regionalList3': 'Treatment includes hydration and caffeine',
    'during.qa3.serious': 'Serious but rare complications:',
    'during.qa3.seriousList1': 'Severe allergy (1 in 10,000)',
    'during.qa3.seriousList2': 'Malignant hyperthermia (less than 1 in 50,000)',
    'during.qa3.seriousList3': 'Nerve damage (less than 1 in 100,000)',
    'during.qa3.seriousList4': 'Prevention through careful assessment and monitoring',
    'during.qa3.airway': 'Airway complications:',
    'during.qa3.airwayList1': 'Difficult breathing tube insertion (1-3%)',
    'during.qa3.airwayList2': 'Aspiration (less than 1%)',
    'during.qa3.airwayList3': 'Managed with video laryngoscope and rapid sequence induction',
    'during.qa3.remember': 'Remember: Modern anaesthesia is very safe, and your anaesthetist is trained to prevent and manage these complications.',
    'during.qa4.question': 'What monitoring and safety measures are used?',
    'during.qa4.standard': 'Standard monitoring (ASA guidelines):',
    'during.qa4.standardList1': 'ECG for heart rhythm',
    'during.qa4.standardList2': 'Blood pressure monitoring',
    'during.qa4.standardList3': 'Oxygen levels (SpO₂)',
    'during.qa4.standardList4': 'Carbon dioxide levels (ETCO₂)',
    'during.qa4.standardList5': 'Body temperature',
    'during.qa4.advanced': 'Advanced monitoring when needed:',
    'during.qa4.advancedList1': 'Arterial line for continuous blood pressure',
    'during.qa4.advancedList2': 'Central venous pressure monitoring',
    'during.qa4.advancedList3': 'Neuromuscular blockade monitoring',
    'during.qa4.advancedList4': 'Depth of anaesthesia monitoring (BIS)',
    'during.qa4.targets': 'Normal target ranges:',
    'during.qa4.targetsList1': 'SpO₂ > 95%',
    'during.qa4.targetsList2': 'ETCO₂ 35-45 mmHg',
    'during.qa4.targetsList3': 'Mean arterial pressure 65-90 mmHg',
    'during.qa4.targetsList4': 'Body temperature 36-37°C',
    'during.qa4.safety': 'Safety protocols:',
    'during.qa4.safetyList1': 'Audible alarms with preset limits',
    'during.qa4.safetyList2': 'Immediate medical team response',
    'during.qa4.safetyList3': 'Emergency medications readily available',
    'during.qa4.safetyList4': 'Backup equipment systems',
    'during.qa4.safetyList5': 'Regular equipment checks and calibration',
    'during.qa4.modern': 'Modern anaesthesia monitoring ensures your safety throughout the entire surgical procedure.',
    'during.qa5.question': 'What is the role of the anaesthetist during surgery?',
    'during.qa5.intro': 'Your anaesthetist is dedicated to your safety and comfort throughout the entire surgical procedure.',
    'during.qa5.responsibilities': 'Key responsibilities include:',
    'during.qa5.respList1': 'Continuously monitoring your vital signs, depth of anaesthesia, and fluid status',
    'during.qa5.respList2': 'Adjusting medications and managing emergencies like bleeding or heart rhythm changes',
    'during.qa5.respList3': 'Coordinating with surgeons and nurses for optimal patient care',
    'during.qa5.respList4': 'Ensuring your comfort, privacy, and dignity at all times',
    'during.qa5.respList5': 'Managing pain relief during and after surgery',
    'during.qa5.respList6': 'Planning for your safe recovery and discharge',
    'during.qa5.team': 'Team approach:',
    'during.qa5.teamDesc': 'Your anaesthetist works closely with:',
    'during.qa5.teamList1': 'Surgeons to coordinate surgical needs',
    'during.qa5.teamList2': 'Nurses for patient positioning and care',
    'during.qa5.teamList3': 'Recovery staff for smooth transition after surgery',
    'during.qa5.think': 'Think of your anaesthetist as your advocate and guardian during surgery, focused entirely on your wellbeing.',

    // After Surgery
    'after.title': 'After Surgery',
    'after.intro': 'Understanding what happens after your surgery and during recovery.',
    'after.qa1.question': 'What happens in the recovery room?',
    'after.qa1.intro': 'After your surgery, you will be transferred to the Post-Anaesthesia Care Unit (PACU), also called the recovery room. This is a specialized area where you are closely monitored as you wake up from anaesthesia.',
    'after.qa1.expect': 'In the PACU, you can expect:',
    'after.qa1.monitoring': 'Continuous monitoring',
    'after.qa1.monitoringDesc': 'of your vital signs (blood pressure, heart rate, oxygen levels)',
    'after.qa1.nursing': 'One-on-one nursing care',
    'after.qa1.nursingDesc': 'until you are fully awake and stable',
    'after.qa1.assessments': 'Regular assessments',
    'after.qa1.assessmentsDesc': 'of your pain levels and administration of pain medication as needed',
    'after.qa1.oxygen': 'Oxygen therapy',
    'after.qa1.oxygenDesc': 'if needed, through a face mask or nasal cannula',
    'after.qa1.warming': 'Warming blankets',
    'after.qa1.warmingDesc': 'if you feel cold',
    'after.qa1.iv': 'IV fluids',
    'after.qa1.ivDesc': 'to maintain hydration',
    'after.qa1.howLong': 'How long will I stay in the recovery room?',
    'after.qa1.timeFrame': 'Most patients stay in the PACU for 30 minutes to 2 hours, depending on:',
    'after.qa1.timeList1': 'The type of surgery and anaesthesia you received',
    'after.qa1.timeList2': 'How quickly you wake up and become stable',
    'after.qa1.timeList3': 'How well your pain and any nausea are controlled',
    'after.qa1.timeList4': 'Whether there were any complications during surgery',
    'after.qa1.transfer': 'The recovery team will transfer you to a ward or discharge you home once they are satisfied with your condition.',
    'after.qa2.question': 'What are common side effects and how is pain managed?',
    'after.qa2.sideEffects': 'Common side effects:',
    'after.qa2.throat': 'Sore throat',
    'after.qa2.throatDesc': '- from breathing tube; usually resolves within 24-48 hours',
    'after.qa2.nausea': 'Nausea and vomiting',
    'after.qa2.nauseaDesc': '- can be treated with medications',
    'after.qa2.dizziness': 'Dizziness',
    'after.qa2.dizzinessDesc': '- often improves with gentle movement and hydration',
    'after.qa2.drowsiness': 'Drowsiness',
    'after.qa2.drowsinessDesc': '- gradually resolves as anaesthesia wears off',
    'after.qa2.shivering': 'Shivering',
    'after.qa2.shiveringDesc': '- usually temporary; treated with warming blankets',
    'after.qa2.confusion': 'Confusion',
    'after.qa2.confusionDesc': '- more common in elderly patients; usually temporary',
    'after.qa2.painManagement': 'Pain management:',
    'after.qa2.ivPain': 'IV pain medications',
    'after.qa2.ivPainDesc': '- often morphine-based drugs for immediate relief',
    'after.qa2.pca': 'Patient-controlled analgesia (PCA)',
    'after.qa2.pcaDesc': '- allows you to self-administer small doses of pain medication by pressing a button',
    'after.qa2.oral': 'Oral pain medications',
    'after.qa2.oralDesc': '- tablets or liquids once you can drink',
    'after.qa2.blocks': 'Spinal/peripheral nerve blocks',
    'after.qa2.blocksDesc': '- may provide hours of pain relief after surgery',
    'after.qa2.local': 'Local anaesthetic injections',
    'after.qa2.localDesc': '- injected around the surgical site',
    'after.qa2.nonMed': 'Non-medication methods',
    'after.qa2.nonMedDesc': '- ice packs, positioning',
    'after.qa2.tips': 'Important pain management tips:',
    'after.qa2.tipsList1': 'Don\'t wait until pain becomes severe before asking for relief',
    'after.qa2.tipsList2': 'Rate your pain on a 0-10 scale when asked by healthcare staff',
    'after.qa2.tipsList3': 'Tell your nurses if pain medications aren\'t working or wear off quickly',
    'after.qa2.tipsList4': 'Report any unusual symptoms or side effects from pain medications',
    'after.qa3.question': 'When can I eat and drink?',
    'after.qa3.intro': 'The timing of when you can eat and drink depends on your type of surgery and how you\'re feeling.',
    'after.qa3.guidelines': 'General guidelines:',
    'after.qa3.fluids': 'Clear fluids',
    'after.qa3.fluidsDesc': 'Usually allowed within 2 hours of being fully awake',
    'after.qa3.light': 'Light foods',
    'after.qa3.lightDesc': 'May be introduced once you tolerate fluids well',
    'after.qa3.regular': 'Regular diet',
    'after.qa3.regularDesc': 'Typically resumed based on your doctor\'s advice',
    'after.qa3.considerations': 'Special considerations:',
    'after.qa3.abdominal': 'Abdominal surgery',
    'after.qa3.abdominalDesc': 'May require waiting until bowel function returns',
    'after.qa3.throat': 'Throat surgery',
    'after.qa3.throatDesc': 'May need softer foods initially',
    'after.qa3.nausea': 'Nausea',
    'after.qa3.nauseaDesc': 'If present, eating may be delayed until it resolves',
    'after.qa3.medications': 'Some medications',
    'after.qa3.medicationsDesc': 'May need to be taken with food',
    'after.qa3.always': 'Always follow your healthcare team\'s specific instructions about eating and drinking.',
    'after.qa4.question': 'What are the discharge instructions and follow-up care?',
    'after.qa4.instructions': 'Discharge instructions will include:',
    'after.qa4.activity': 'Activity restrictions',
    'after.qa4.activityDesc': 'When you can return to work, driving, exercise, and lifting',
    'after.qa4.wound': 'Wound care',
    'after.qa4.woundDesc': 'How to keep the surgical site clean and dry',
    'after.qa4.medication': 'Medication schedule',
    'after.qa4.medicationDesc': 'Pain medications, antibiotics, and when to resume regular medications',
    'after.qa4.infection': 'Signs of infection',
    'after.qa4.infectionDesc': 'What to watch for and when to contact your doctor',
    'after.qa4.diet': 'Dietary recommendations',
    'after.qa4.dietDesc': 'Any special dietary requirements during recovery',
    'after.qa4.showering': 'Showering/bathing',
    'after.qa4.showeringDesc': 'When and how to safely clean yourself',
    'after.qa4.contact': 'Emergency contact information',
    'after.qa4.contactDesc': 'Who to call if you have concerns',
    'after.qa4.appointments': 'Follow-up appointments:',
    'after.qa4.appointmentsDesc': 'You may need to see:',
    'after.qa4.appointmentsList1': 'Your surgeon for wound check and progress evaluation',
    'after.qa4.appointmentsList2': 'Your family doctor for ongoing care',
    'after.qa4.appointmentsList3': 'Specialists if recommended',
    'after.qa4.keepAppts': 'Keep all scheduled appointments even if you feel well.',
    'after.qa4.seekHelp': 'Seek immediate medical help if you experience:',
    'after.qa4.seekList1': 'Severe or worsening pain not controlled by medication',
    'after.qa4.seekList2': 'Signs of infection (fever, increased redness, warmth, swelling, discharge)',
    'after.qa4.seekList3': 'Difficulty breathing or chest pain',
    'after.qa4.seekList4': 'Persistent nausea and vomiting',
    'after.qa4.seekList5': 'Dizziness or fainting',
    'after.qa4.seekList6': 'Unusual bleeding',
    'after.qa4.seekList7': 'Leg swelling or calf pain',
    'after.qa4.seekList8': 'Any other concerning symptoms',
    'after.qa4.pathway': 'Recovery is a process, and everyone heals at their own pace.',
    'after.qa4.pathwayDesc': 'Your healthcare team is there to support you every step of the way.',
    'after.qa4.keepInstructions': 'Keep your discharge instructions handy and don\'t hesitate to contact your healthcare team with any questions.',
  },
  si: {
    // Navigation
    'nav.home': 'මුල් පිටුව',
    'nav.beforeSurgery': 'සැත්කම් කිරීමට පෙර',
    'nav.duringSurgery': 'සැත්කම් කරන අතරතුර',
    'nav.afterSurgery': 'සැත්කම් කිරීමෙන් පසු',
    'nav.resources': 'සම්පත්',
    'nav.admin': 'පරිපාලක',

    // Hero Section
    'hero.title': 'නිර්වින්දනය තේරුම් ගැනීම: ඔබේ සැත්කමට පෙර, අතරතුර සහ පසුව අපේක්ෂා කළ හැකි දේ',
    'hero.subtitle': 'ආරක්ෂිත, සුවපහසු සැත්කම් අත්දැකීමක් සඳහා ඔබේ මාර්ගෝපදේශය',
    'hero.intro': 'නිර්වින්දනය යනු වේදනාවකින් තොරව සහ ආරක්ෂිතව සැත්කම් කිරීමට ඔබට උපකාර කරන වෛද්‍ය විශේෂත්වයකි. අද නවීන නිර්වින්දන ක්‍රම ඔබේ සුවපහසුව සහ යහපැවැත්මට කැපවී සිටින නිර්වින්දන වෛද්‍යවරුන් විසින් පරිස්සමින් නිරීක්ෂණය කරනු ලැබේ.',

    // CTA Buttons
    'cta.before': 'සැත්කම් කිරීමට පෙර',
    'cta.during': 'සැත්කම් කරන අතරතුර',
    'cta.after': 'සැත්කම් කිරීමෙන් පසු',

    // About Section
    'about.title': 'මෙම සම්පත ගැන',
    'about.whoTitle': 'අප කවුද',
    'about.who': 'මෙය ශ්‍රී ලංකාවේ නිර්වින්දන සහ අධි තීව්‍ර සත්කාර කණ්ඩායම්වල සහයෝගී උත්සාහයකි. රෝගීන් සමඟ විශ්වසනීය තොරතුරු බෙදා ගැනීම අපගේ ඉලක්කයයි.',
    'about.whyTitle': 'මෙම සම්පත පවතින්නේ ඇයි',
    'about.why': 'රෝගීන්ගේ සාමාන්‍ය ප්‍රශ්නවලට පිළිතුරු දීමට, ඔවුන්ගේ කනස්සල්ල අඩු කිරීමට සහ සැත්කම් පිළිබඳ පැහැදිලි අවබෝධයක් ප්‍රවර්ධනය කිරීමට මෙය නිර්මාණය කරන ලදී.',

    // What to Expect Section
    'whatToExpect.title': 'අපේක්ෂා කළ හැකි දේ',
    'whatToExpect.before.title': 'සැත්කම් කිරීමට පෙර',
    'whatToExpect.before.description': 'සැත්කම් කිරීමට පෙර තක්සේරුව, උපවාස මාර්ගෝපදේශ, ඖෂධ කළමනාකරණය සහ සූදානම් වීමේ උපදෙස්.',
    'whatToExpect.during.title': 'සැත්කම් කරන අතරතුර',
    'whatToExpect.during.description': 'නිර්වින්දන වර්ග, නිරීක්ෂණය, ආරක්ෂක පියවර සහ ශල්‍ය කාමරයේ සිදුවන දේ.',
    'whatToExpect.after.title': 'සැත්කම් කිරීමෙන් පසු',
    'whatToExpect.after.description': 'ප්‍රතිසාධන ක්‍රියාවලිය, වේදනා කළමනාකරණය, අතුරු ආබාධ සහ නිදහස් කිරීමේ සැලසුම්.',
    'whatToExpect.learnMore': 'තව දැනගන්න',

    // Footer
    'footer.disclaimer': 'මෙම තොරතුරු අධ්‍යාපනික අරමුණු සඳහා පමණක් වන අතර වෘත්තීය වෛද්‍ය උපදෙස් ප්‍රතිස්ථාපනය නොකළ යුතුය.',
    'footer.copyright': '© 2024 ශ්‍රී ලංකා නිර්වින්දන අධ්‍යාපන මුලපිරීම. සියලුම හිමිකම් ඇවිරිණි.',
  },
  ta: {
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.beforeSurgery': 'அறுவை சிகிச்சைக்கு முன்',
    'nav.duringSurgery': 'அறுவை சிகிச்சையின் போது',
    'nav.afterSurgery': 'அறுவை சிகிச்சைக்குப் பின்',
    'nav.resources': 'வளங்கள்',
    'nav.admin': 'நிர்வாகம்',

    // Hero Section
    'hero.title': 'மயக்க மருந்து பற்றிய முழுமையான புரிதல்: உங்கள் அறுவை சிகிச்சைக்கு முன், அதன் போது, மற்றும் பின் நீங்கள் அறிய வேண்டியவை',
    'hero.subtitle': 'பாதுகாப்பான, சௌகர்�யமான அறுவை சிகிச்சை அனுபவத்திற்கான உங்கள் வழிகாட்டி',
    'hero.intro': 'மயக்க மருந்தியல் (Anaesthesia) என்பது ஒரு மருத்துவத் துறையாகும். இது நீங்கள் வலியில்லாமல், பாதுகாப்பாக அறுவை சிகிச்சை செய்துகொள்ள உதவுகிறது. இன்றைய நவீன மயக்க மருந்து நுட்பங்கள், உங்கள் சௌகரியம் மற்றும் நலனில் அர்ப்பணிப்புடன் செயற்படும் மயக்க மருந்து நிபுணரால் (Anaesthetist) கவனமாகக் கண்காணிக்கப்படுகின்றன.',

    // CTA Buttons
    'cta.before': 'அறுவை சிகிச்சைக்கு முன்',
    'cta.during': 'அறுவை சிகிச்சையின் போது',
    'cta.after': 'அறுவை சிகிச்சைக்குப் பின்',

    // About Section
    'about.title': 'எம்மைப் பற்றி',
    'about.whoTitle': 'நாம் யார்',
    'about.who': 'இலங்கையின் மயக்க மருந்து மற்றும் அதிதீவிர சிகிச்சைப் பிரிவு (Anaesthesia and Critical Care) குழுக்களின் கூட்டு முயற்சி இதுவாகும். நோயாளிகளுக்கு நம்பகமான தகவல்களைப் பகிர்வதே எங்கள் நோக்கம்.',
    'about.whyTitle': 'இந்த வளம் ஏன் உருவாக்கப்பட்டது',
    'about.why': 'நோயாளிகளின் பொதுவான கேள்விகளுக்குப் பதிலளிக்கவும், அவர்களின் பதட்டத்தைக் குறைக்கவும், மற்றும் அறுவை சிகிச்சை குறித்த தெளிவான புரிதலை ஊக்குவிக்கவும் இது உருவாக்கப்பட்டுள்ளது.',

    // What to Expect Section
    'whatToExpect.title': 'என்ன எதிர்பார்க்கலாம்',
    'whatToExpect.before.title': 'அறுவை சிகிச்சைக்கு முன்',
    'whatToExpect.before.description': 'அறுவை சிகிச்சைக்கு முந்தைய மருத்துவப் பரிசோதனை, உணவு அருந்தாமல் இருப்பது (விரதம்), மருந்து மேலாண்மை மற்றும் தயாரிப்பு குறிப்புகள்.',
    'whatToExpect.during.title': 'அறுவை சிகிச்சையின் போது',
    'whatToExpect.during.description': 'மயக்க மருந்துகளின் வகைகள், கண்காணிப்பு, பாதுகாப்பு நடவடிக்கைகள் மற்றும் அறுவை சிகிச்சை அறையில் நடப்பவை.',
    'whatToExpect.after.title': 'அறுவை சிகிச்சைக்குப் பின்',
    'whatToExpect.after.description': 'மீட்சி செயல்முறை, வலி மேலாண்மை, பக்க விளைவுகள் மற்றும் வீட்டிற்கு செல்லும் திட்டமிடல்.',
    'whatToExpect.learnMore': 'மேலும் அறிய',

    // Footer
    'footer.disclaimer': 'இந்த தகவல்கள் கல்வி நோக்கங்களுக்கு மட்டுமே மற்றும் தொழில்முறை மருத்துவ ஆலோசனையை மாற்றக்கூடாது.',
    'footer.copyright': '© 2024 இலங்கை மயக்க மருந்து கல்வி முன்முயற்சி. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',

    // Before Surgery
    'before.title': 'அறுவை சிகிச்சைக்கு முன்',
    'before.intro': 'உங்கள் அறுவை சிகிச்சைக்கு முன் என்ன நடக்கிறது என்பதைப் புரிந்துகொள்வது பதட்டத்தைக் குறைத்து, நீங்கள் நன்றாக தயாராக இருப்பதை உறுதி செய்கிறது.',
    'before.qa1.question': 'அறுவை சிகிச்சைக்கு முந்தைய மருத்துவ மதிப்பீடு என்றால் என்ன?',
    'before.qa1.answer1': 'மயக்க மருந்துக்கு முன் அபாயங்களை அடையாளம் காணவும் உங்கள் ஆரோக்கியத்தை மேம்படுத்தவும் உங்கள் மருத்துவ வரலாறு, உடல் பரிசோதனை, இரத்த பரிசோதனைகள், ECG மற்றும் பிற ஆய்வுகளின் விரிவான மதிப்பாய்வு.',
    'before.qa1.answer2': 'இந்த மதிப்பீட்டின் போது, உங்கள் மயக்க மருந்து நிபுணர்:',
    'before.qa1.list1': 'உங்கள் மருத்துவ வரலாறு மற்றும் முந்தைய அறுவை சிகிச்சைகளை மதிப்பாய்வு செய்வார்',
    'before.qa1.list2': 'ஒவ்வாமை மற்றும் தற்போதைய மருந்துகளைப் பற்றி கேட்பார்',
    'before.qa1.list3': 'உங்கள் இதயம் மற்றும் நுரையீரலில் கவனம் செலுத்தி உடல் பரிசோதனை செய்வார்',
    'before.qa1.list4': 'இரத்த பரிசோதனைகள் மற்றும் ECG உட்பட பரிசோதனை முடிவுகளை மதிப்பீடு செய்வார்',
    'before.qa1.list5': 'மயக்க மருந்து திட்டத்தைப் பற்றி விவாதித்து உங்கள் கேள்விகளுக்கு பதிலளிப்பார்',
    'before.qa2.question': 'ஏன் விரதம் தேவை?',
    'before.qa2.answer1': 'அறுவை சிகிச்சைக்கு முன் விரதம் இருப்பது மயக்க மருந்தின் போது உங்கள் வயிற்றின் உள்ளடக்கங்கள் உங்கள் நுரையீரலில் நுழையும் அபாயத்தைக் குறைக்க அவசியம், இது aspiration எனப்படும் கடுமையான சிக்கலாகும்.',
    'before.qa2.guidelines': 'விரத வழிகாட்டுதல்கள்:',
    'before.qa2.list1': 'திட உணவுகள் மற்றும் பால்: அறுவை சிகிச்சைக்கு 6 மணி நேரத்திற்கு முன் நிறுத்துங்கள்',
    'before.qa2.list2': 'தெளிவான திரவங்கள் (தண்ணீர், பாலில்லாத தேநீர்): அறுவை சிகிச்சைக்கு 2 மணி நேரத்திற்கு முன் நிறுத்துங்கள்',
    'before.qa2.siptitle': 'சிப் டில் செண்ட் திட்டம்:',
    'before.qa2.siptext1': 'பல மருத்துவமனைகள் இப்போது அறுவை சிகிச்சைக்கு 2 மணி நேரம் வரை தெளிவான திரவங்களை குடிக்க நோயாளிகளை ஊக்குவிக்கின்றன. இது நீரிழப்பைத் தடுக்க உதவுகிறது மற்றும் உங்கள் வசதியை மேம்படுத்தலாம்.',
    'before.qa2.siptext2': '"சிப் டில் செண்ட்" அணுகுமுறையைப் பற்றி உங்கள் சுகாதார வழங்குநரிடம் கேளுங்கள்.',
    'before.qa3.question': 'எந்த மருந்துகளை நான் தவிர்க்க வேண்டும்?',
    'before.qa3.answer1': 'சில மருந்துகள் மயக்க மருந்துடன் குறுக்கீடு செய்யலாம் அல்லது அறுவை சிகிச்சையின் போது இரத்தப்போக்கு அபாயத்தை அதிகரிக்கலாம். நீங்கள் எடுத்துக்கொள்ளும் அனைத்து மருந்துகளையும், நிரப்புதல்கள் உட்பட, உங்கள் மயக்க மருந்து நிபுணரிடம் எப்போதும் தெரிவிக்கவும்.',
    'before.qa3.subtitle': 'நிறுத்தப்பட வேண்டிய அல்லது சரிசெய்யப்பட வேண்டிய மருந்துகள்:',
    'before.qa3.list1': 'இரத்த நீர்த்தமாக்கிகள்: ஆஸ்பிரின், க்ளோபிடோக்ரெல், வார்ஃபரின்',
    'before.qa3.list2': 'NSAIDs: ஐபுப்ரோஃபன், டிக்ளோஃபெனாக்',
    'before.qa3.list3': 'மூலிகை நிரப்புதல்கள்: ஜிங்கோ, பூண்டு, மீன் எண்ணெய்',
    'before.qa3.important': 'முக்கியம்: உங்கள் மருத்துவர் அல்லது மயக்க மருந்து நிபுணருடன் விவாதிக்காமல் மருந்துகளை எடுத்துக்கொள்வதை நிறுத்த வேண்டாம்.',
    'before.qa4.question': 'நான் எப்படி மனரீதியாகவும் உடல் ரீதியாகவும் தயாராக வேண்டும்?',
    'before.qa4.physical': 'உடல் தயாரிப்பு:',
    'before.qa4.plist1': 'அறுவை சிகிச்சைக்கு முன் நல்ல இரவு தூக்கம் பெறுங்கள்',
    'before.qa4.plist2': 'உங்கள் அறுவை சிகிச்சை குழுவிடமிருந்து குறிப்பிட்ட வழிமுறைகளைப் பின்பற்றுங்கள்',
    'before.qa4.plist3': 'அறுவை சிகிச்சைக்கு ஒரு வாரத்திற்கு முன் மதுவைத் தவிர்க்கவும்',
    'before.qa4.plist4': 'நீங்கள் புகைபிடித்தால், அறுவை சிகிச்சைக்கு முன் நிறுத்த அல்லது குறைக்க முயற்சிக்கவும்',
    'before.qa4.plist5': 'அறுவை சிகிச்சைக்கு முன் குறிப்பிட்ட குளியல் வழிமுறைகளைப் பின்பற்றுங்கள்',
    'before.qa4.mental': 'மன தயாரிப்பு:',
    'before.qa4.mlist1': 'எந்தவொரு கவலையையும் தீர்க்க உங்கள் அறுவை சிகிச்சைக்கு முந்தைய மதிப்பீட்டின் போது கேள்விகள் கேளுங்கள்',
    'before.qa4.mlist2': 'ஆழ்ந்த சுவாசம் அல்லது தியானம் போன்ற தளர்வு நுட்பங்களைப் பயிற்சி செய்யுங்கள்',
    'before.qa4.mlist3': 'மருத்துவமனை வழிகாட்டுதல்களுக்குள் வசதியான பொருட்களைக் கொண்டு வாருங்கள்',
    'before.qa4.mlist4': 'வெளியேற்றத்திற்குப் பிறகு குடும்பம் அல்லது நண்பர் ஆதரவை ஏற்பாடு செய்யுங்கள்',
    'before.qa4.practical': 'நடைமுறை தயாரிப்பு:',
    'before.qa4.prlist1': 'மருத்துவமனைக்கு மற்றும் மருத்துவமனையிலிருந்து போக்குவரத்து ஏற்பாடு செய்யுங்கள்',
    'before.qa4.prlist2': 'உங்கள் திரும்புதலுக்கு உங்கள் வீட்டைத் தயார் செய்யுங்கள் (எளிதான உணவுகள், வசதியான மீட்பு பகுதி)',
    'before.qa4.prlist3': 'உங்கள் மருந்துகள், ஒவ்வாமை மற்றும் முந்தைய மயக்க மருந்து அனுபவங்களின் பட்டியலைக் கொண்டு வாருங்கள்',
    'before.qa4.prlist4': 'அறுவை சிகிச்சைக்கு முன் நகைகள், மேக்கப் மற்றும் நெயில் பாலிஷ் அகற்றுங்கள்',
    'before.qa4.prlist5': 'அறுவை சிகிச்சைக்கு முன் குறிப்பிட்ட குளியல் வழிமுறைகளைப் பின்பற்றுங்கள்',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations['en'];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in English either
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, currentLanguage: language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageProvider;
