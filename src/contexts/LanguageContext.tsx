
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
    'hero.intro': "Anaesthesia is a medical specialty that allows you to undergo surgery pain-free and safely. Today's anaesthetic techniques are carefully monitored by your anaesthetist, a trained physician dedicated to your comfort and well-being.",
    'cta.before': 'Before Surgery',
    'cta.during': 'During Surgery',
    'cta.after': 'After Surgery',
    'about.title': 'About Us',
    'about.who': 'A collaborative initiative by Sri Lankan anaesthesia and critical care teams to share trustworthy patient information.',
    'about.why': 'To answer common patient questions, reduce anxiety, and promote informed consent.',
    
    // Before Surgery Page Translations
    'before.title': 'Before Surgery',
    'before.intro': 'Understanding what to expect before your procedure can help reduce anxiety and ensure the best possible outcome.',
    'before.qa1.question': 'What is pre-operative assessment?',
    'before.qa1.answer1': 'A pre-operative assessment is a thorough review of your medical history, physical examination, blood tests, ECG and other investigations to identify potential risks and optimize your health before anaesthesia.',
    'before.qa1.answer2': 'During this assessment, your anaesthetist will:',
    'before.qa1.list1': 'Review your medical history and previous surgeries',
    'before.qa1.list2': 'Ask about allergies and current medications',
    'before.qa1.list3': 'Perform a physical examination focused on your heart and lungs',
    'before.qa1.list4': 'Evaluate test results including blood work and ECG',
    'before.qa1.list5': 'Discuss the anaesthetic plan and answer your questions',
    'before.qa2.question': 'Why is fasting required?',
    'before.qa2.answer1': 'Fasting before surgery is essential to reduce the risk of stomach contents entering your lungs during anaesthesia, a serious complication called aspiration.',
    'before.qa2.guidelines': 'Fasting Guidelines:',
    'before.qa2.list1': 'Solids and milk: Stop 6 hours before surgery',
    'before.qa2.list2': 'Clear fluids (water, tea without milk): Stop 2 hours before surgery',
    'before.qa2.siptitle': 'Sip Till Send Program:',
    'before.qa2.siptext1': 'Many hospitals now encourage patients to drink clear fluids until 2 hours before surgery. This helps prevent dehydration and may improve your recovery. Ask your healthcare provider about the "Sip Till Send" protocol.',
    'before.qa2.siptext2': 'Learn more about Sip Till Send fasting information',
    'before.qa3.question': 'Which medications to avoid?',
    'before.qa3.answer1': 'Some medications can interfere with anaesthesia or increase surgical bleeding risk. Always inform your anaesthetist about all medications you\'re taking, including over-the-counter drugs and supplements.',
    'before.qa3.subtitle': 'Medications that may need to be stopped or adjusted include:',
    'before.qa3.list1': 'Blood thinners: Aspirin, clopidogrel, warfarin',
    'before.qa3.list2': 'NSAIDs: Ibuprofen, diclofenac',
    'before.qa3.list3': 'Herbal supplements: Ginkgo, garlic, fish oil',
    'before.qa3.important': 'Important: Never stop prescription medications without consulting your doctor or anaesthetist first.',
    'before.qa4.question': 'How to prepare mentally and physically?',
    'before.qa4.physical': 'Physical Preparation:',
    'before.qa4.plist1': 'Get a good night\'s sleep before surgery',
    'before.qa4.plist2': 'Stay hydrated until fasting time begins',
    'before.qa4.plist3': 'Follow any specific instructions from your surgical team',
    'before.qa4.plist4': 'Avoid alcohol for at least 24 hours before surgery',
    'before.qa4.plist5': 'If you smoke, try to quit or reduce smoking before surgery',
    'before.qa4.mental': 'Mental Preparation:',
    'before.qa4.mlist1': 'Ask questions during your pre-op assessment to address any concerns',
    'before.qa4.mlist2': 'Practice relaxation techniques like deep breathing or meditation',
    'before.qa4.mlist3': 'Bring comforting items to the hospital (within hospital guidelines)',
    'before.qa4.mlist4': 'Arrange for support from family or friends after discharge',
    'before.qa4.practical': 'Practical Preparations:',
    'before.qa4.prlist1': 'Arrange transport to and from the hospital',
    'before.qa4.prlist2': 'Prepare your home for your return (easy meals, comfortable recovery area)',
    'before.qa4.prlist3': 'Bring a list of your medications, allergies, and previous anaesthetic experiences',
    'before.qa4.prlist4': 'Remove jewelry, makeup, and nail polish before surgery',
    'before.qa4.prlist5': 'Follow specific instructions about bathing/showering before surgery',
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
    'hero.intro': "නිර්වේදනය යනු ඔබට වේදනාවෙන් තොරව සහ ආරක්ෂිතව ශල්‍යකර්මයකට භාජනය වීමට ඉඩ සලසන වෛද්‍ය විශේෂතාවකි. අද දින නිර්වේදන තාක්ෂණයන් ඔබේ සුවපහසුව සහ යහපැවැත්ම සඳහා කැපවූ පුහුණු වෛද්‍යවරයෙකු වන ඔබේ නිර්වේදකයා විසින් සාවධානව නිරීක්ෂණය කරනු ලැබේ.",
    'cta.before': 'ශල්‍යකර්මයට පෙර',
    'cta.during': 'ශල්‍යකර්මය අතරතුර',
    'cta.after': 'ශල්‍යකර්මයෙන් පසු',
    'about.title': 'අප ගැන',
    'about.who': 'විශ්වාසදායක රෝගී තොරතුරු බෙදා ගැනීම සඳහා ශ්‍රී ලාංකික නිර්වේදන හා දැඩි සත්කාර කණ්ඩායම් විසින් සිදු කරන සහයෝගී මුල පිරීමකි.',
    'about.why': 'පොදු රෝගී ප්‍රශ්න වලට පිළිතුරු දීමට, කනස්සල්ල අඩු කිරීමට සහ දැනුවත් කැමැත්ත ප්‍රවර්ධනය කිරීමට.',
    
    // Before Surgery Page Translations - Sinhala
    'before.title': 'ශල්‍යකර්මයට පෙර',
    'before.intro': 'ඔබේ ක්‍රියාපටිපාටියට පෙර බලාපොරොත්තු විය හැකි දේ ගැන අවබෝධයක් ලබා ගැනීමෙන් කනස්සල්ල අඩු කිරීමට සහ හැකි උපරිම ප්‍රතිඵලයක් සහතික කිරීමට උපකාරී විය හැක.',
    'before.qa1.question': 'ශල්‍යකර්මයට පෙර ඇගයීම යනු කුමක්ද?',
    'before.qa1.answer1': 'නිර්වේදනයට පෙර අවදානම් හඳුනා ගැනීම සහ ඔබේ සෞඛ්‍යය වැඩිදියුණු කිරීම සඳහා ඔබේ වෛද්‍ය ඉතිහාසය, ශාරීරික පරීක්ෂණය, රුධිර පරීක්ෂණ, ECG සහ වෙනත් පරීක්ෂණ පිළිබඳ සවිස්තරාත්මක සමාලෝචනයකි.',
    'before.qa1.answer2': 'මෙම තක්සේරුව අතරතුර, ඔබේ නිර්වේදකයා:',
    'before.qa1.list1': 'ඔබේ වෛද්‍ය ඉතිහාසය සහ පෙර ශල්‍යකර්ම සමාලෝචනය කරනු ඇත',
    'before.qa1.list2': 'ඇලජි සහ වත්මන් ඖෂධ ගැන විමසනු ඇත',
    'before.qa1.list3': 'ඔබේ හෘදය සහ පෙනහළු කේන්ද්‍ර කර ගත් ශාරීරික පරීක්ෂණයක් සිදු කරනු ඇත',
    'before.qa1.list4': 'රුධිර පරීක්ෂණ සහ ECG ඇතුළු පරීක්ෂණ ප්‍රතිඵල ඇගයීම කරනු ඇත',
    'before.qa1.list5': 'නිර්වේදන සැලැස්ම සාකච්ඡා කර ඔබේ ප්‍රශ්නවලට පිළිතුරු දෙනු ඇත',
    'before.qa2.question': 'උපවාසය අවශ්‍ය වන්නේ ඇයි?',
    'before.qa2.answer1': 'නිර්වේදනය අතරතුර ඔබේ ආමාශයේ අඩංගු දේ ඔබේ පෙනහළු වලට ඇතුළු වීමේ අවදානම අඩු කිරීම සඳහා ශල්‍යකර්මයට පෙර උපවාසය අත්‍යවශ්‍ය වේ, එය aspiration නම් බරපතල සංකූලතාවයකි.',
    'before.qa2.guidelines': 'උපවාස මාර්ගෝපදේශ:',
    'before.qa2.list1': 'ඝන ආහාර සහ කිරි: ශල්‍යකර්මයට පැය 6කට පෙර නවත්වන්න',
    'before.qa2.list2': 'පැහැදිලි ද්‍රව (ජලය, කිරි නොමැති තේ): ශල්‍යකර්මයට පැය 2කට පෙර නවත්වන්න',
    'before.qa2.siptitle': 'සිප් ටිල් සෙන්ඩ් වැඩසටහන:',
    'before.qa2.siptext1': 'බොහෝ රෝහල් දැන් ශල්‍යකර්මයට පැය 2කට පෙර තෙක් පැහැදිලි ද්‍රව පානය කිරීමට රෝගීන් දිරිමත් කරයි. මෙය ජල විරහිත වීම වැළැක්වීමට උපකාරී වන අතර ඔබේ සුවය වැඩිදියුණු කළ හැක. "සිප් ටිල් සෙන්ඩ්" ක්‍රමලේඛය ගැන ඔබේ සෞඛ්‍ය සේවා සපයන්නාගෙන් විමසන්න.',
    'before.qa2.siptext2': 'සිප් ටිල් සෙන්ඩ් උපවාස තොරතුරු ගැන වැඩිදුර දැනගන්න',
    'before.qa3.question': 'මඟ හැරිය යුතු ඖෂධ මොනවාද?',
    'before.qa3.answer1': 'සමහර ඖෂධ නිර්වේදනයට බාධා කළ හැකි හෝ ශල්‍යකර්ම ලේ ගැලීමේ අවදානම වැඩි කළ හැකිය. ඔබ ගන්නා සියලුම ඖෂධ, කවුන්ටරයෙන් ලබාගත් ඖෂධ සහ අතිරේක ද ඇතුළුව ඔබේ නිර්වේදකයාට සැමවිටම දැනුම් දෙන්න.',
    'before.qa3.subtitle': 'නැවැත්වීමට හෝ සකස් කිරීමට අවශ්‍ය විය හැකි ඖෂධ වලට ඇතුළත්:',
    'before.qa3.list1': 'රුධිර තුනී කාරක: ඇස්පිරින්, ක්ලොපිඩොග්රෙල්, වෝෆරින්',
    'before.qa3.list2': 'NSAIDs: අයිබුප්‍රෝෆෙන්, ඩයික්ලොෆෙනැක්',
    'before.qa3.list3': 'පැළෑටි අතිරේක: ජින්ක්ගෝ, සුදුළුණු, මාළු තෙල්',
    'before.qa3.important': 'වැදගත්: ඔබේ වෛද්‍යවරයා හෝ නිර්වේදකයා සමඟ සාකච්ඡා කිරීමෙන් තොරව නියම කරන ලද ඖෂධ භාවිතය නතර නොකරන්න.',
    'before.qa4.question': 'මානසිකව සහ ශාරීරිකව සූදානම් වන්නේ කෙසේද?',
    'before.qa4.physical': 'ශාරීරික සූදානම:',
    'before.qa4.plist1': 'ශල්‍යකර්මයට පෙර හොඳ නින්දක් ලබා ගන්න',
    'before.qa4.plist2': 'උපවාස කාලය ආරම්භ වන තෙක් ජලය පානය කරන්න',
    'before.qa4.plist3': 'ඔබේ ශල්‍ය කණ්ඩායමේ විශේෂිත උපදෙස් අනුගමනය කරන්න',
    'before.qa4.plist4': 'ශල්‍යකර්මයට පැය 24කට පෙර සිට මත්පැන් පානය නොකරන්න',
    'before.qa4.plist5': 'ඔබ දුම්පානය කරන්නේ නම්, ශල්‍යකර්මයට පෙර දුම්පානය අත්හැරීමට හෝ අඩු කිරීමට උත්සාහ කරන්න',
    'before.qa4.mental': 'මානසික සූදානම:',
    'before.qa4.mlist1': 'ඔබේ ශල්‍යකර්මයට පෙර ඇගයීමේදී ප්‍රශ්න අසන්න',
    'before.qa4.mlist2': 'ගැඹුරු හුස්ම ගැනීම හෝ භාවනාව වැනි විවේකී තාක්ෂණයන් පුහුණු කරන්න',
    'before.qa4.mlist3': 'රෝහල් දෙපාර්තමේන්තුවේ මාර්ගෝපදේශ තුළ සුව පහසු භාණ්ඩ රැගෙන යන්න',
    'before.qa4.mlist4': 'රෝහලෙන් පිටවීමෙන් පසු පවුලේ සාමාජිකයන් හෝ මිතුරන්ගේ සහාය ලබා ගැනීමට සැලසුම් කරන්න',
    'before.qa4.practical': 'ප්‍රායෝගික සූදානම්:',
    'before.qa4.prlist1': 'රෝහලට යාමට සහ ඒමට ප්‍රවාහන පහසුකම් සකස් කර ගන්න',
    'before.qa4.prlist2': 'ඔබ ආපසු පැමිණීම සඳහා ඔබේ නිවස සූදානම් කරන්න (පහසු ආහාර, සුව පහසු ප්‍රකෘති කලාපය)',
    'before.qa4.prlist3': 'ඔබේ ඖෂධ, ඇලජි සහ පෙර නිර්වේදන අත්දැකීම් ලැයිස්තුවක් රැගෙන යන්න',
    'before.qa4.prlist4': 'ශල්‍යකර්මයට පෙර ආභරණ, මේක්අප් සහ නිය තීන්ත ඉවත් කරන්න',
    'before.qa4.prlist5': 'ශල්‍යකර්මයට පෙර ස්නානය කිරීම ගැන විශේෂිත උපදෙස් අනුගමනය කරන්න',
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
    'hero.intro': "மயக்கவியல் என்பது வலியின்றி மற்றும் பாதுகாப்பாக அறுவை சிகிச்சை செய்ய உங்களை அனுமதிக்கும் ஒரு மருத்துவ சிறப்பு. இன்றைய மயக்கவியல் நுட்பங்கள் உங்கள் ஆசுவாசம் மற்றும் நல்வாழ்வுக்காக அர்ப்பணிக்கப்பட்ட பயிற்சி பெற்ற மருத்துவரான உங்கள் மயக்கவியல் நிபுணரால் கவனமாக கண்காணிக்கப்படுகின்றன.",
    'cta.before': 'அறுவை சிகிச்சைக்கு முன்',
    'cta.during': 'அறுவை சிகிச்சையின் போது',
    'cta.after': 'அறுவை சிகிச்சைக்குப் பின்',
    'about.title': 'எங்களைப் பற்றி',
    'about.who': 'நம்பகமான நோயாளி தகவல்களைப் பகிர இலங்கை மயக்கவியல் மற்றும் தீவிர சிகிச்சைக் குழுக்களின் கூட்டு முயற்சி.',
    'about.why': 'பொதுவான நோயாளிகளின் கேள்விகளுக்கு பதிலளிக்க, கவலையைக் குறைக்க மற்றும் அறிவார்ந்த ஒப்புதலை ஊக்குவிக்க.',
    
    // Before Surgery Page Translations - Tamil
    'before.title': 'அறுவை சிகிச்சைக்கு முன்',
    'before.intro': 'உங்கள் செயல்முறைக்கு முன் என்ன எதிர்பார்க்கலாம் என்பதைப் புரிந்துகொள்வது கவலையைக் குறைக்கவும், சிறந்த முடிவை உறுதிசெய்யவும் உதவும்.',
    'before.qa1.question': 'அறுவை சிகிச்சைக்கு முந்தைய மதிப்பீடு என்றால் என்ன?',
    'before.qa1.answer1': 'அறுவை சிகிச்சைக்கு முந்தைய மதிப்பீடு என்பது மயக்கவியலுக்கு முன் சாத்தியமான அபாயங்களை அடையாளம் காணவும், உங்கள் உடல்நிலையை மேம்படுத்தவும் உங்கள் மருத்துவ வரலாறு, உடல் பரிசோதனை, இரத்தப் பரிசோதனை, ECG மற்றும் பிற விசாரணைகளின் முழுமையான மதிப்பாய்வு ஆகும்.',
    'before.qa1.answer2': 'இந்த மதிப்பீட்டின் போது, உங்கள் மயக்கவியல் நிபுணர் செய்வார்:',
    'before.qa1.list1': 'உங்கள் மருத்துவ வரலாற்றையும் முந்தைய அறுவை சிகிச்சைகளையும் மதிப்பாய்வு செய்தல்',
    'before.qa1.list2': 'ஒவ்வாமை மற்றும் தற்போதைய மருந்துகளைப் பற்றி கேட்பது',
    'before.qa1.list3': 'உங்கள் இதயம் மற்றும் நுரையீரலில் கவனம் செலுத்தி ஒரு உடல் பரிசோதனையை மேற்கொள்ளுங்கள்',
    'before.qa1.list4': 'இரத்தப் பணி மற்றும் ECG உள்ளிட்ட சோதனை முடிவுகளை மதிப்பீடு செய்தல்',
    'before.qa1.list5': 'மயக்கவியல் திட்டத்தை விவாதித்து, உங்கள் கேள்விகளுக்கு பதிலளிக்கவும்',
    'before.qa2.question': 'உணவு உண்ணாமல் இருப்பது ஏன் தேவை?',
    'before.qa2.answer1': 'மயக்கவியலின் போது வயிற்றில் உள்ள பொருட்கள் நுரையீரலில் நுழையும் அபாயத்தைக் குறைக்க அறுவை சிகிச்சைக்கு முன் உணவு உண்ணாமல் இருப்பது அவசியம், இது ஆஸ்பிரேஷன் என்ற கடுமையான சிக்கல்.',
    'before.qa2.guidelines': 'உணவு உண்ணாமல் இருப்பதற்கான வழிகாட்டுதல்கள்:',
    'before.qa2.list1': 'திட மற்றும் பால்: அறுவை சிகிச்சைக்கு 6 மணி நேரத்திற்கு முன் நிறுத்தவும்',
    'before.qa2.list2': 'தெளிவான திரவங்கள் (தண்ணீர், பால் இல்லாத தேநீர்): அறுவை சிகிச்சைக்கு 2 மணி நேரத்திற்கு முன் நிறுத்தவும்',
    'before.qa2.siptitle': 'சிப் டில் செண்ட் திட்டம்:',
    'before.qa2.siptext1': 'பல மருத்துவமனைகள் இப்போது நோயாளிகளை அறுவை சிகிச்சைக்கு 2 மணி நேரத்திற்கு முன்பு வரை தெளிவான திரவங்களைக் குடிக்க ஊக்குவிக்கின்றன. இது நீரிழப்பைத் தடுக்க உதவுகிறது மற்றும் உங்கள் மீட்பை மேம்படுத்தலாம். "சிப் டில் செண்ட்" நெறிமுறை பற்றி உங்கள் சுகாதார வழங்குநரிடம் கேளுங்கள்.',
    'before.qa2.siptext2': 'சிப் டில் செண்ட் உணவு உண்ணாமல் இருப்பது பற்றிய தகவல்களை அறிக',
    'before.qa3.question': 'எந்த மருந்துகளைத் தவிர்க்க வேண்டும்?',
    'before.qa3.answer1': 'சில மருந்துகள் மயக்கவியலுடன் குறுக்கிட்டு அறுவை சிகிச்சை இரத்தப்போக்கு அபாயத்தை அதிகரிக்கலாம். நீங்கள் எடுத்துக்கொள்ளும் அனைத்து மருந்துகளையும், கவுண்டரில் வாங்கிய மருந்துகளையும் துணை மருந்துகளையும் உட்பட உங்கள் மயக்கவியல் நிபுணருக்கு எப்போதும் தெரிவிக்கவும்.',
    'before.qa3.subtitle': 'நிறுத்தப்பட வேண்டிய அல்லது சரிசெய்யப்பட வேண்டிய மருந்துகளில் அடங்கும்:',
    'before.qa3.list1': 'இரத்தம் மெலிதாக்கிகள்: ஆஸ்பிரின், குளோபிடோகிரெல், வார்ஃபரின்',
    'before.qa3.list2': 'NSAIDs: ஐபுப்ரோஃபென், டிக்லோஃபெனாக்',
    'before.qa3.list3': 'மூலிகை துணை மருந்துகள்: ஜிங்கோ, பூண்டு, மீன் எண்ணெய்',
    'before.qa3.important': 'முக்கியமானது: உங்கள் மருத்துவர் அல்லது மயக்கவியல் நிபுணரிடம் ஆலோசனை செய்யாமல் மருந்து மருந்துகளை நிறுத்த வேண்டாம்.',
    'before.qa4.question': 'மனதளவிலும் உடல் ரீதியாகவும் எவ்வாறு தயாராவது?',
    'before.qa4.physical': 'உடல் தயாரிப்பு:',
    'before.qa4.plist1': 'அறுவை சிகிச்சைக்கு முன் நல்ல இரவு தூக்கத்தைப் பெறுங்கள்',
    'before.qa4.plist2': 'உணவு உண்ணாமல் இருக்கும் நேரம் தொடங்கும் வரை நீரேற்றமாக இருங்கள்',
    'before.qa4.plist3': 'உங்கள் அறுவை சிகிச்சை குழுவின் குறிப்பிட்ட வழிமுறைகளைப் பின்பற்றவும்',
    'before.qa4.plist4': 'அறுவை சிகிச்சைக்கு குறைந்தது 24 மணி நேரத்திற்கு முன்பு மது அருந்துவதைத் தவிர்க்கவும்',
    'before.qa4.plist5': 'நீங்கள் புகைபிடித்தால், அறுவை சிகிச்சைக்கு முன் புகைபிடிப்பதை நிறுத்த முயற்சிக்கவும் அல்லது புகைபிடிப்பதைக் குறைக்கவும்',
    'before.qa4.mental': 'மன தயாரிப்பு:',
    'before.qa4.mlist1': 'எந்த கவலைகளையும் நிவர்த்தி செய்ய உங்கள் அறுவை சிகிச்சைக்கு முந்தைய மதிப்பீட்டின் போது கேள்விகளைக் கேளுங்கள்',
    'before.qa4.mlist2': 'ஆழ்ந்த சுவாசம் அல்லது தியானம் போன்ற தளர்வு நுட்பங்களைப் பயிற்சி செய்யுங்கள்',
    'before.qa4.mlist3': 'மருத்துவமனைக்கு ஆறுதல் தரும் பொருட்களைக் கொண்டு வாருங்கள் (மருத்துவமனை வழிகாட்டுதல்களுக்குள்)',
    'before.qa4.mlist4': 'வெளியேற்றப்பட்ட பிறகு குடும்பத்தினர் அல்லது நண்பர்களிடமிருந்து ஆதரவைப் பெறுங்கள்',
    'before.qa4.practical': 'நடைமுறை தயாரிப்புகள்:',
    'before.qa4.prlist1': 'மருத்துவமனைக்கு போக்குவரத்து ஏற்பாடு செய்யுங்கள்',
    'before.qa4.prlist2': 'உங்கள் வீட்டிற்கு திரும்புவதற்கு உங்கள் வீட்டைத் தயார் செய்யுங்கள் (எளிதான உணவுகள், வசதியான மீட்பு பகுதி)',
    'before.qa4.prlist3': 'உங்கள் மருந்துகள், ஒவ்வாமை மற்றும் முந்தைய மயக்கவியல் அனுபவங்களின் பட்டியலைக் கொண்டு வாருங்கள்',
    'before.qa4.prlist4': 'அறுவை சிகிச்சைக்கு முன் நகைகள், மேக்கப் மற்றும் நெயில் பாலிஷை அகற்றவும்',
    'before.qa4.prlist5': 'அறுவை சிகிச்சைக்கு முன் குளிப்பது/குளிப்பது பற்றிய குறிப்பிட்ட வழிமுறைகளைப் பின்பற்றவும்',
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
