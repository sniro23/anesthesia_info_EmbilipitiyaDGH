
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

    // CTA Buttons
    'cta.before': 'සැත්කම් කිරීමට පෙර',
    'cta.during': 'සැත්කම් කරන අතරතුර',
    'cta.after': 'සැත්කම් කිරීමෙන් පසු',

    // About Section
    'about.title': 'මෙම සම්පත ගැන',
    'about.whoTitle': 'අපි කවුද',
    'about.who': 'මෙය ශ්‍රී ලංකාවේ නිර්වින්දන සහ අධි සත්කාර කණ්ඩායම්වල සහයෝගී ප්‍රයත්නයකි. අපගේ ලක්ෂ්‍යය වන්නේ රෝගීන් සමග විශ්වසනීය තොරතුරු බෙදාගැනීමයි.',
    'about.whyTitle': 'මෙම සම්පත පවතින්නේ ඇයි',
    'about.why': 'මෙය සාදන ලද්දේ රෝගීන්ගේ සාමාන්‍ය ප්‍රශ්නවලට පිළිතුරු දීම, ඔවුන්ගේ කනස්සල්ල අඩු කිරීම සහ සැත්කම් පිළිබඳ පැහැදිලි අවබෝධයක් ප්‍රවර්ධනය කිරීම සඳහා ය.',

    // What to Expect Section
    'whatToExpect.title': 'අපේක්ෂා කළ හැකි දේ',
    'whatToExpect.before.title': 'සැත්කම් කිරීමට පෙර',
    'whatToExpect.before.description': 'සැත්කමට පෙර තක්සේරුව, නිරාහාර මාර්ගෝපදේශ, ඖෂධ කළමනාකරණය සහ සූදානම් වීමේ ඉඟි.',
    'whatToExpect.during.title': 'සැත්කම් කරන අතරතුර',
    'whatToExpect.during.description': 'නිර්වින්දන වර්ග, නිරීක්ෂණය, ආරක්ෂක පියවර සහ සැත්කම් කාමරයේ සිදුවන්නේ කුමක්ද.',
    'whatToExpect.after.title': 'සැත්කම් කිරීමෙන් පසු',
    'whatToExpected.after.description': 'සුවය ලැබීමේ ක්‍රියාවලිය, වේදනා කළමනාකරණය, අතුරු ප්‍රතිවිධි සහ විසර්ජන සැලසුම්.',
    'whatToExpect.learnMore': 'වැඩිදුර ඉගෙන ගන්න',

    // Footer
    'footer.disclaimer': 'මෙම තොරතුරු අධ්‍යාපනික අරමුණු සඳහා පමණක් වන අතර වෘත්තීය වෛද්‍ය උපදෙස් ආදේශ නොකළ යුතුය.',
    'footer.copyright': '© 2024 ශ්‍රී ලංකා නිර්වින්දන අධ්‍යාපන මුලපිරීම. සියලුම අයිතිවාසිකම් ඇවිරිණි.',

    // Before Surgery
    'before.title': 'සැත්කම් කිරීමට පෙර',
    'before.intro': 'ඔබේ සැත්කමට පෙර සිදුවන්නේ කුමක්ද යන්න තේරුම් ගැනීම කනස්සල්ල අඩු කිරීමට සහ ඔබ හොඳින් සූදානම් වී සිටීම සහතික කිරීමට උපකාරී වේ.',
    'before.qa1.question': 'සැත්කමට පෙර තක්සේරුව යනු කුමක්ද?',
    'before.qa1.answer1': 'නිර්වින්දනයට පෙර අවදානම් හඳුනා ගැනීම සහ ඔබේ සෞඛ්‍යය වැඩිදියුණු කිරීම සඳහා ඔබේ වෛද්‍ය ඉතිහාසය, ශාරීරික පරීක්ෂණය, රුධිර පරීක්ෂණ, ECG සහ වෙනත් පරීක්ෂණ පිළිබඳ සවිස්තරාත්මක සමාලෝචනයකි.',
    'before.qa1.answer2': 'මෙම තක්සේරුව අතරතුර, ඔබේ නිර්වින්දන වෛද්‍යවරයා:',
    'before.qa1.list1': 'ඔබේ වෛද්‍ය ඉතිහාසය සහ පෙර ශල්‍යකර්ම සමාලෝචනය කරනු ඇත',
    'before.qa1.list2': 'ආසාත්මිකතා සහ වත්මන් ඖෂධ ගැන විමසනු ඇත',
    'before.qa1.list3': 'ඔබේ හෘදය සහ පෙනහළු කේන්ද්‍ර කර ගත් ශාරීරික පරීක්ෂණයන් සිදු කරනු ඇත',
    'before.qa1.list4': 'රුධිර පරීක්ෂණ සහ ECG ඇතුළු පරීක්ෂණ ප්‍රතිඵල ඇගයීම කරනු ඇත',
    'before.qa1.list5': 'නිර්වින්දන සැලැස්ම සාකච්ඡා කර ඔබේ ප්‍රශ්නවලට පිළිතුරු දෙනු ඇත',
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

    // CTA Buttons
    'cta.before': 'அறுவை சிகிச்சைக்கு முன்',
    'cta.during': 'அறுவை சிகிச்சையின் போது',
    'cta.after': 'அறுவை சிகிச்சைக்குப் பின்',

    // About Section
    'about.title': 'இந்த வளத்தைப் பற்றி',
    'about.whoTitle': 'நாங்கள் யார்',
    'about.who': 'இது ஸ்ரீலங்காவின் மயக்க மருந்து மற்றும் முக்கிய சிகிச்சைக் குழுக்களின் கூட்டு முயற்சியாகும். நோயாளிகளுடன் நம்பகமான தகவல்களைப் பகிர்ந்துகொள்வது எங்கள் நோக்கம்.',
    'about.whyTitle': 'ஏன் இந்த வளம் உள்ளது',
    'about.why': 'நோயாளிகளின் பொதுவான கேள்விகளுக்குப் பதிலளிக்க, அவர்களின் கவலையைக் குறைக்க, மற்றும் அறுவை சிகிச்சை பற்றிய தெளிவான புரிதலை ஊக்குவிக்க இது உருவாக்கப்பட்டது.',

    // What to Expect Section
    'whatToExpect.title': 'எதிர்பார்க்கக்கூடியவை',
    'whatToExpect.before.title': 'அறுவை சிகிச்சைக்கு முன்',
    'whatToExpect.before.description': 'அறுவை சிகிச்சைக்கு முந்தைய மதிப்பீடு, உணவு வெளியேற்றுவதற்கான வழிகாட்டுதல்கள், மருந்து மேலாண்மை மற்றும் தயாரிப்பு குறிப்புகள்.',
    'whatToExpect.during.title': 'அறுவை சிகிச்சையின் போது',
    'whatToExpect.during.description': 'மயக்க மருந்து வகைகள், கண்காணிப்பு, பாதுகாப்பு நடவடிக்கைகள் மற்றும் அறுவை சிகிச்சை அறையில் என்ன நடக்கிறது.',
    'whatToExpect.after.title': 'அறுவை சிகிச்சைக்குப் பின்',
    'whatToExpect.after.description': 'மீட்கும் செயல்முறை, வலி மேலாண்மை, பக்க விளைவுகள் மற்றும் வெளியேற்ற திட்டமிடல்.',
    'whatToExpect.learnMore': 'மேலும் அறிய',

    // Footer
    'footer.disclaimer': 'இந்த தகவல் கல்வி நோக்கங்களுக்காக மட்டுமே மற்றும் தொழிலார்ந்த மருத்துவ ஆலோசனையை மாற்றக்கூடாது.',
    'footer.copyright': '© 2024 ஸ்ரீலங்கன் மயக்க மருந்து கல்வி முன்முயற்சி. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டுள்ளன.',

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
    'before.qa2.question': 'உணவு வெளியேற்ற வேண்டும் ஏன்?',
    'before.qa2.answer1': 'மயக்க மருந்தின் போது உங்கள் வயிற்றின் உள்ளடக்கங்கள் உங்கள் நுரையீரலில் நுழையும் அபாயத்தைக் குறைக்க அறுவை சிகிச்சைக்கு முன் உணவு வெளியேற்றுதல் அத்தியாவசியமானது, இது ஆஸ்பிரேஷன் என்று அழைக்கப்படும் ஒரு தீவிர சிக்கலாகும்.',
    'before.qa2.guidelines': 'உணவு வெளியேற்றும் வழிகாட்டுதல்கள்:',
    'before.qa2.list1': 'திட உணவுகள் மற்றும் பால்: அறுவை சிகிச்சைக்கு 6 மணி நேரம் முன் நிறுத்துங்கள்',
    'before.qa2.list2': 'தெளிவான திரவங்கள் (தண்ணீர், பால் இல்லாத தேநீர்): அறுவை சிகிச்சைக்கு 2 மணி நேரம் முன் நிறுத்துங்கள்',
    'before.qa2.siptitle': 'சிப் டில் செண்ட் திட்டம்:',
    'before.qa2.siptext1': 'பல மருத்துவமனைகள் இப்போது அறுவை சிகிச்சைக்கு 2 மணி நேரம் வரை தெளிவான திரவங்களை குடிக்க நோயாளிகளை ஊக்குவிக்கின்றன. இது நீரிழப்பைத் தடுக்க உதவுகிறது மற்றும் உங்கள் வசதியை மேம்படுத்தலாம்.',
    'before.qa2.siptext2': '"சிப் டில் செண்ட்" அணுகுமுறை பற்றி உங்கள் சுகாதார வழங்குநரிடம் கேளுங்கள்.',
    'before.qa3.question': 'நான் எந்த மருந்துகளைத் தவிர்க்க வேண்டும்?',
    'before.qa3.answer1': 'சில மருந்துகள் மயக்க மருந்துடன் தலையிடலாம் அல்லது அறுவை சிகிச்சையின் போது இரத்தப்போக்கு அபாயத்தை அதிகரிக்கலாம். நீங்கள் எடுத்துக்கொள்ளும் அனைத்து மருந்துகள், சப்ளிமெண்ட்ஸ் உட்பட, உங்கள் மயக்க மருந்து நிபுணரிடம் எப்போதும் தெரிவிக்கவும்.',
    'before.qa3.subtitle': 'நிறுத்த வேண்டிய அல்லது சரிசெய்ய வேண்டிய மருந்துகள்:',
    'before.qa3.list1': 'இரத்த மெலிப்பான்கள்: ஆஸ்பிரின், க்ளோபிடோக்ரெல், வார்ஃபரின்',
    'before.qa3.list2': 'NSAIDs: இபுப்ரோஃபன், டிக்லோஃபெனாக்',
    'before.qa3.list3': 'மூலிகை சப்ளிமெண்ட்ஸ்: ஜின்கோ, பூண்டு, மீன் எண்ணெய்',
    'before.qa3.important': 'முக்கியம்: உங்கள் மருத்துவர் அல்லது மயக்க மருந்து நிபுணருடன் விவாதிக்காமல் மருந்துகளை நிறுத்த வேண்டாம்.',
    'before.qa4.question': 'நான் மனதளவிலும் உடல் ரீதியாகவும் எவ்வாறு தயாராக வேண்டும்?',
    'before.qa4.physical': 'உடல் தயாரிப்பு:',
    'before.qa4.plist1': 'அறுவை சிகிச்சைக்கு முன் நல்ல இரவு தூக்கம் பெறுங்கள்',
    'before.qa4.plist2': 'உங்கள் அறுவை சிகிச்சை குழுவின் குறிப்பிட்ட வழிகாட்டுதல்களைப் பின்பற்றுங்கள்',
    'before.qa4.plist3': 'அறுவை சிகிச்சைக்கு ஒரு வாரம் முன் மது அருந்துவதைத் தவிர்க்கவும்',
    'before.qa4.plist4': 'நீங்கள் புகைபிடித்தால், அறுவை சிகிச்சைக்கு முன் நிறுத்த அல்லது குறைக்க முயற்சி செய்யுங்கள்',
    'before.qa4.plist5': 'அறுவை சிகிச்சைக்கு முன் குளிப்பதற்கான குறிப்பிட்ட வழிகாட்டுதல்களைப் பின்பற்றுங்கள்',
    'before.qa4.mental': 'மன தயாரிப்பு:',
    'before.qa4.mlist1': 'எந்தவொரு கவலைகளையும் தீர்க்க உங்கள் அறுவை சிகிச்சைக்கு முந்தைய மதிப்பீட்டின் போது கேள்விகள் கேளுங்கள்',
    'before.qa4.mlist2': 'ஆழ்ந்த சுவாசம் அல்லது தியானம் போன்ற தளர்வு நுட்பங்களைப் பயிற்சி செய்யுங்கள்',
    'before.qa4.mlist3': 'மருத்துவமனை வழிகாட்டுதல்களுக்குள் ஆறுதல் பொருட்களைக் கொண்டு வாருங்கள்',
    'before.qa4.mlist4': 'வெளியேற்றத்திற்குப் பின் குடும்பம் அல்லது நண்பர் ஆதரவை ஏற்பாடு செய்யுங்கள்',
    'before.qa4.practical': 'நடைமுறை தயாரிப்பு:',
    'before.qa4.prlist1': 'மருத்துவமனைக்கு மற்றும் அங்கிருந்து போக்குவரத்து ஏற்பாடு செய்யுங்கள்',
    'before.qa4.prlist2': 'உங்கள் திரும்புவதற்காக உங்கள் வீட்டைத் தயார் செய்யுங்கள் (எளிய உணவுகள், வசதியான மீட்பு பகுதி)',
    'before.qa4.prlist3': 'உங்கள் மருந்துகள், ஒவ்வாமைகள் மற்றும் முந்தைய மயக்க மருந்து அனுபவங்களின் பட்டியலைக் கொண்டு வாருங்கள்',
    'before.qa4.prlist4': 'அறுவை சிகிச்சைக்கு முன் நகைகள், ஒப்பனை மற்றும் நகப் பெயிண்ட் அகற்றுங்கள்',
    'before.qa4.prlist5': 'அறுவை சிகிச்சைக்கு முன் குளிப்பதற்கான குறிப்பிட்ட வழிகாட்டுதல்களைப் பின்பற்றுங்கள்',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const currentTranslations = translations[language];
    
    // Check if the key exists in current language
    if (currentTranslations && currentTranslations[key]) {
      return currentTranslations[key];
    }
    
    // Fallback to English if not found in current language
    if (language !== 'en') {
      const englishTranslations = translations['en'];
      if (englishTranslations && englishTranslations[key]) {
        return englishTranslations[key];
      }
    }
    
    // If still not found, return the key itself
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
