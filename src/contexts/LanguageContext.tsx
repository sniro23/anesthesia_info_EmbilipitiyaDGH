
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'si' | 'ta';

interface LanguageContextType {
  language: Language;
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
    'whatToExpected.during.title': 'During Surgery',
    'whatToExpect.during.description': 'Types of anaesthesia, monitoring, safety measures, and what happens in the operating room.',
    'whatToExpect.after.title': 'After Surgery',
    'whatToExpect.after.description': 'Recovery process, pain management, side effects, and discharge planning.',
    'whatToExpect.learnMore': 'Learn More',

    // Footer
    'footer.disclaimer': 'This information is for educational purposes only and should not replace professional medical advice.',
    'footer.copyright': '© 2024 Sri Lankan Anaesthesia Education Initiative. All rights reserved.',
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
    'hero.subtitle': 'பாதுகாப்பான, சௌகரியமான அறுவை சிகிச்சை அனுபவத்திற்கான உங்கள் வழிகாட்டி',
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
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
