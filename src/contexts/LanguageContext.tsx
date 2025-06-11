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
    'whatToExpect.before.description': 'Pre-operative assessment, fasting guidelines, medication management, and preparation tips.',
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
    'hero.subtitle': 'பாதுகாப்பான, சௌகர்யமான அறுவை சிகிச்சை அனுபவத்திற்கான உங்கள் வழிகாட்டி',
    'hero.intro': 'மயக்க மருந்தியல் (Anaesthesia) என்பது ஒரு மருத்துவத் துறையாகும். இது நீங்கள் வலியில்லாமல், பாதுகாப்பாக அறுவை சிகிச்சை செய்துகொள்ள உதவுகிறது. இன்றைய நவீன மயக்க மருந்து நுட்பங்கள், உங்கள் சௌகரியம் மற்றும் நலனில் அர்ப்பணிப்புடன் செயற்படும் மயக்க மருந்து நிபுணரால் (Anaesthetist) கவனமாகக் கண்காணிக்கப்படுகின்றன.',

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
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    // First try to get from current language
    const currentTranslations = translations[language] as Record<string, any>;
    const keys = key.split('.');
    let value: any = currentTranslations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }
    
    // If found and is string, return it
    if (typeof value === 'string') {
      return value;
    }
    
    // Fallback to English if not found in current language
    if (language !== 'en') {
      const englishTranslations = translations['en'] as Record<string, any>;
      let englishValue: any = englishTranslations;
      
      for (const k of keys) {
        if (englishValue && typeof englishValue === 'object' && k in englishValue) {
          englishValue = englishValue[k];
        } else {
          englishValue = undefined;
          break;
        }
      }
      
      if (typeof englishValue === 'string') {
        return englishValue;
      }
    }
    
    // If still not found, return the key
    return key;
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
