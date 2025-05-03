
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'si' | 'ta';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Basic translations object - would be expanded for a full site
const translations: Record<Language, Record<string, string>> = {
  en: {
    'site.title': 'Anaesthesia Info Hub',
    'nav.home': 'Home',
    'nav.before': 'Before Surgery',
    'nav.during': 'During Surgery',
    'nav.after': 'After Surgery',
    'nav.resources': 'Resources',
    'hero.title': 'Understanding Anaesthesia: What to Expect Before, During, and After Your Surgery',
    'hero.subtitle': 'Your guide to a safe, comfortable surgical experience',
    'hero.intro': 'Anaesthesia is a medical specialty that allows you to undergo surgery pain-free and safely. Today's anaesthetic techniques are carefully monitored by your anaesthetist, a trained physician dedicated to your comfort and well-being.',
    'cta.before': 'Before Surgery',
    'cta.during': 'During Surgery',
    'cta.after': 'After Surgery',
    'about.title': 'About Us',
    'about.who': 'A collaborative initiative by Sri Lankan anaesthesia and critical care teams to share trustworthy patient information.',
    'about.why': 'To answer common patient questions, reduce anxiety, and promote informed consent.',
  },
  si: {
    'site.title': 'නිර්වේදන තොරතුරු මධ්‍යස්ථානය',
    'nav.home': 'මුල් පිටුව',
    'nav.before': 'ශල්‍යකර්මයට පෙර',
    'nav.during': 'ශල්‍යකර්මය අතරතුර',
    'nav.after': 'ශල්‍යකර්මයෙන් පසු',
    'nav.resources': 'සම්පත්',
    'hero.title': 'නිර්වේදනය ගැන අවබෝධ කර ගැනීම: ඔබේ ශල්‍යකර්මයට පෙර, අතරතුර සහ පසුව බලාපොරොත්තු විය හැකි දේ',
    'hero.subtitle': 'ආරක්ෂිත, පහසු ශල්‍යකර්ම අත්දැකීමක් සඳහා ඔබේ මාර්ගෝපදේශය',
    'hero.intro': 'නිර්වේදනය යනු ඔබට වේදනාවෙන් තොරව සහ ආරක්ෂිතව ශල්‍යකර්මයකට භාජනය වීමට ඉඩ සලසන වෛද්‍ය විශේෂතාවකි. අද දින නිර්වේදන තාක්ෂණයන් ඔබේ සුවපහසුව සහ යහපැවැත්ම සඳහා කැපවූ පුහුණු වෛද්‍යවරයෙකු වන ඔබේ නිර්වේදකයා විසින් සාවධානව නිරීක්ෂණය කරනු ලැබේ.',
    'cta.before': 'ශල්‍යකර්මයට පෙර',
    'cta.during': 'ශල්‍යකර්මය අතරතුර',
    'cta.after': 'ශල්‍යකර්මයෙන් පසු',
    'about.title': 'අප ගැන',
    'about.who': 'විශ්වාසදායක රෝගී තොරතුරු බෙදා ගැනීම සඳහා ශ්‍රී ලාංකික නිර්වේදන හා දැඩි සත්කාර කණ්ඩායම් විසින් සිදු කරන සහයෝගී මුල පිරීමකි.',
    'about.why': 'පොදු රෝගී ප්‍රශ්න වලට පිළිතුරු දීමට, කනස්සල්ල අඩු කිරීමට සහ දැනුවත් කැමැත්ත ප්‍රවර්ධනය කිරීමට.',
  },
  ta: {
    'site.title': 'மயக்கவியல் தகவல் மையம்',
    'nav.home': 'முகப்பு',
    'nav.before': 'அறுவை சிகிச்சைக்கு முன்',
    'nav.during': 'அறுவை சிகிச்சையின் போது',
    'nav.after': 'அறுவை சிகிச்சைக்குப் பின்',
    'nav.resources': 'வளங்கள்',
    'hero.title': 'மயக்கவியலைப் புரிந்துகொள்ளுதல்: உங்கள் அறுவை சிகிச்சைக்கு முன், போது மற்றும் பின் எதிர்பார்க்க வேண்டியவை',
    'hero.subtitle': 'பாதுகாப்பான, வசதியான அறுவை சிகிச்சை அனுபவத்திற்கான உங்கள் வழிகாட்டி',
    'hero.intro': 'மயக்கவியல் என்பது வலியின்றி மற்றும் பாதுகாப்பாக அறுவை சிகிச்சை செய்ய உங்களை அனுமதிக்கும் ஒரு மருத்துவ சிறப்பு. இன்றைய மயக்கவியல் நுட்பங்கள் உங்கள் ஆசுவாசம் மற்றும் நல்வாழ்வுக்காக அர்ப்பணிக்கப்பட்ட பயிற்சி பெற்ற மருத்துவரான உங்கள் மயக்கவியல் நிபுணரால் கவனமாக கண்காணிக்கப்படுகின்றன.',
    'cta.before': 'அறுவை சிகிச்சைக்கு முன்',
    'cta.during': 'அறுவை சிகிச்சையின் போது',
    'cta.after': 'அறுவை சிகிச்சைக்குப் பின்',
    'about.title': 'எங்களைப் பற்றி',
    'about.who': 'நம்பகமான நோயாளி தகவல்களைப் பகிர இலங்கை மயக்கவியல் மற்றும் தீவிர சிகிச்சைக் குழுக்களின் கூட்டு முயற்சி.',
    'about.why': 'பொதுவான நோயாளிகளின் கேள்விகளுக்கு பதிலளிக்க, கவலையைக் குறைக்க மற்றும் அறிவார்ந்த ஒப்புதலை ஊக்குவிக்க.',
  }
};

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
