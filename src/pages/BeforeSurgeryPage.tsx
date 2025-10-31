
import React from 'react';
import QASection from '@/components/QASection';
import { useLanguage } from '@/contexts/LanguageContext';
import { useImageData } from '@/contexts/ImageDataContext';

const BeforeSurgeryPage: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { getImagesForSection } = useImageData();
  
  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center">{t('before.title')}</h1>
      <p className="text-base sm:text-lg text-neutral-dark max-w-3xl mx-auto mb-6 md:mb-10 text-center">
        {currentLanguage === 'si' ? 'නිර්වින්දනය යනු ඔබට වේදනාවෙන් තොරව සහ ආරක්ෂිතව ශල්‍යකර්මයකට භාජනය වීමට ඉඩ සලසන ක්‍රමයකි. නිර්වින්දන වෛද්‍යවරයෙකු විසින් ඔබව පරික්ශා කිරීමෙන් පසුව ආරක්ශාකාරී සහ සුවපහසු ලෙස ශල්යකර්මය සිදු කිරීමට පහසුකම් සලස දෙයි.' : t('before.intro')}
      </p>

      <div className="max-w-3xl mx-auto">
        <QASection 
          question={t('before.qa1.question')} 
          defaultOpen={true}
          images={getImagesForSection('before.qa1')}
        >
          {currentLanguage === 'si' ? (
            <>
              <p className="text-sm sm:text-base">
                නිර්වින්දනයට පෙර අවදානම් හඳුනා ගැනීම සහ ඔබේ සෞඛ්‍යය වැඩිදියුණු කිරීම සඳහා ඔබේ වෛද්‍ය ඉතිහාසය, ශාරීරික පරීක්ෂණය, රුධිර පරීක්ෂණ, ECG සහ වෙනත් පරීක්ෂණ පිළිබඳ සවිස්තරාත්මක සමාලෝචනයකි.
              </p>
              <p className="mt-2 sm:mt-4 text-sm sm:text-base">
                මෙම තක්සේරුව අතරතුර, ඔබේ නිර්වින්දන වෛද්‍යවරයා විසින්:
              </p>
              <ul className="list-disc pl-4 sm:pl-6 mt-1 sm:mt-2 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>ඔබේ වෛද්‍ය ඉතිහාසය සහ පෙර ශල්‍යකර්ම සමාලෝචනය කරනු ඇත</li>
                <li>ආසාත්මිකතා සහ වත්මන් ඖෂධ ගැන විමසනු ඇත</li>
                <li>ඔබේ හෘදය සහ පෙනහළු කේන්ද්‍ර කර ගත් ශාරීරික පරීක්ෂණයන් සිදු කරනු ඇත</li>
                <li>රුධිර පරීක්ෂණ සහ ECG ඇතුළු පරීක්ෂණ ප්‍රතිඵල ඇගයීම කරනු ඇත</li>
                <li>නිර්දවින්දන සැලැස්ම සාකච්ඡා කර ඔබේ ප්‍රශ්නවලට පිළිතුරු දෙනු ඇත</li>
              </ul>
            </>
          ) : (
            <>
              <p className="text-sm sm:text-base">
                {t('before.qa1.answer1')}
              </p>
              <p className="mt-2 sm:mt-4 text-sm sm:text-base">
                {t('before.qa1.answer2')}
              </p>
              <ul className="list-disc pl-4 sm:pl-6 mt-1 sm:mt-2 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>{t('before.qa1.list1')}</li>
                <li>{t('before.qa1.list2')}</li>
                <li>{t('before.qa1.list3')}</li>
                <li>{t('before.qa1.list4')}</li>
                <li>{t('before.qa1.list5')}</li>
              </ul>
            </>
          )}
        </QASection>

        <QASection 
          question={t('before.qa2.question')}
          images={getImagesForSection('before.qa2')}
        >
          {currentLanguage === 'si' ? (
            <>
              <p className="text-sm sm:text-base">
                ශල්‍යකර්මයට පෙර නිරාහාරව සිටීමට අවශ්‍ය වන්නේ ඇයි?
                නිර්දවින්දනය අතරතුර ඔබේ ආමාශයේ අඩංගු දේ ඔබේ පෙනහළු වලට ඇතුළු වීමේ අවදානම අඩු කිරීම සඳහා ශල්‍යකර්මයට පෙර උපවාසය අත්‍යවශ්‍ය වේ, එය අස්පිරටිඔන් නම් බරපතල සංකූලතාවයකි.
              </p>
              <div className="mt-3 md:mt-4 bg-amber/10 p-3 sm:p-4 rounded-lg border border-amber">
                <h4 className="font-semibold text-sm sm:text-base">නිරහාරව සිටීමේ මාර්ගෝපදේශය:</h4>
                <ul className="list-disc pl-4 sm:pl-6 mt-1 sm:mt-2 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>ඝන ආහාර සහ කිරි: ශල්‍යකර්මයට පැය 6කට පෙර නවත්වන්න</li>
                  <li>පැහැදිලි ද්‍රව (ජලය, කිරි නොමැති තේ): ශල්‍යකර්මයට පැය 2කට පෙර නවත්වන්න</li>
                </ul>
              </div>
              <div className="mt-3 md:mt-4">
                <h4 className="font-semibold text-sm sm:text-base">සිප් ටිල් සෙන්ඩ් වැඩසටහන:</h4>
                <p className="text-sm sm:text-base">
                  බොහෝ රෝහල් දැන් ශල්‍යකර්මයට පැය 2කට පෙර තෙක් පැහැදිලි ද්‍රව පානය කිරීමට රෝගීන් දිරිමත් කරයි. මෙය විජලනය වීම වැළැක්වීමට උපකාරී වන අතර ඔබේ පහසුව වැඩි කළ හැක.
                </p>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base">
                  <a 
                    href="https://cpoc.org.uk/sites/cpoc/files/documents/2025-01/Sip%20Til%20Send%20information%20for%20patients_0.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/90 underline break-words"
                  >
                    "සිප් ටිල් සෙන්ඩ්" ක්‍රමය ගැන ඔබේ සෞඛ්‍ය සේවා සපයන්නාගෙන් විමසන්න.
                  </a>
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm sm:text-base">
                {t('before.qa2.answer1')}
              </p>
              <div className="mt-3 md:mt-4 bg-amber/10 p-3 sm:p-4 rounded-lg border border-amber">
                <h4 className="font-semibold text-sm sm:text-base">{t('before.qa2.guidelines')}</h4>
                <ul className="list-disc pl-4 sm:pl-6 mt-1 sm:mt-2 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>{t('before.qa2.list1')}</li>
                  <li>{t('before.qa2.list2')}</li>
                </ul>
              </div>
              <div className="mt-3 md:mt-4">
                <h4 className="font-semibold text-sm sm:text-base">{t('before.qa2.siptitle')}</h4>
                <p className="text-sm sm:text-base">
                  {t('before.qa2.siptext1')}
                </p>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base">
                  <a 
                    href="https://cpoc.org.uk/sites/cpoc/files/documents/2025-01/Sip%20Til%20Send%20information%20for%20patients_0.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/90 underline break-words"
                  >
                    {t('before.qa2.siptext2')}
                  </a>
                </p>
              </div>
            </>
          )}
        </QASection>

        <QASection 
          question={t('before.qa3.question')}
          images={getImagesForSection('before.qa3')}
        >
          {currentLanguage === 'si' ? (
            <>
              <p>
                සමහර ඖෂධ නිර්දවින්දනයට බාධා කළ හැකි හෝ ශල්‍යකර්ම ලේ ගැලීමේ අවදානම වැඩි කළ හැකිය. ඔබ ගන්නා සියලුම ඖෂධ, සහ අතිරේක ඇතුළුව, ගැන සැම විටම ඔබේ නිර්වින්දන වෛද්‍යවරයාට දැනුම් දෙන්න.
              </p>
              <div className="mt-4">
                <h4 className="font-semibold">නැවැත්වීමට හෝ සකස් කිරීමට අවශ්‍ය විය හැකි ඖෂධ ඇතුළත්:</h4>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>ලේ තුනී කරන: ඇස්පිරින්, ක්ලොපිඩොග්රෙල්, වෝෆරින්</li>
                  <li>NSAIDS: අයිබූප්‍රෝෆන්, ඩයික්ලෝෆෙනැක්</li>
                  <li>පැළෑටි අතිරේක: ගින්කෝ, සුදුලූණු, මාළු තෙල්</li>
                </ul>
                <p className="mt-4 text-sm bg-neutral-light p-3 rounded-lg">
                  වැදගත්: ඔබේ වෛද්‍යවරයා හෝ නිර්වින්දන වෛද්‍යවරයා හා සාකච්ඡා කිරීමෙන් තොරව කිසිවිටෙකත් බෙහෙත් දීම නතර නොකරන්න.
                </p>
              </div>
            </>
          ) : (
            <>
              <p>
                {t('before.qa3.answer1')}
              </p>
              <div className="mt-4">
                <h4 className="font-semibold">{t('before.qa3.subtitle')}</h4>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>{t('before.qa3.list1')}</li>
                  <li>{t('before.qa3.list2')}</li>
                  <li>{t('before.qa3.list3')}</li>
                </ul>
                <p className="mt-4 text-sm bg-neutral-light p-3 rounded-lg">
                  {t('before.qa3.important')}
                </p>
              </div>
            </>
          )}
        </QASection>

        <QASection 
          question={t('before.qa4.question')}
          images={getImagesForSection('before.qa4')}
        >
          {currentLanguage === 'si' ? (
            <>
              <div>
                <h4 className="font-semibold">ශාරීරික සූදානම:</h4>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>ශල්‍යකර්මයට පෙර හොඳ රාත්‍රී නින්දක් ලබා ගන්න</li>
                  <li>ඔබේ ශල්‍ය කණ්ඩායමගෙන් ලැබෙන විශේෂිත උපදෙස් අනුගමනය කරන්න</li>
                  <li>ශල්‍යකර්මයට සතියකට පෙර සිට මධ්‍යසාර භාවිතයෙන් වළකින්න</li>
                  <li>ඔබ දුම්පානය කරන්නේ නම්, ශල්‍යකර්මයට පෙර එය නැවැත්වීමට හෝ අඩු කිරීමට උත්සාහ කරන්න</li>
                  <li>ශල්‍යකර්මයට පෙර ස්නානය කිරීම පිළිබඳ විශේෂිත උපදෙස් අනුගමනය කරන්න</li>
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold">මානසික සූදානම:</h4>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>ඔබේ ශල්‍යකර්මයට පෙර තක්සේරුවේදී ඕනෑම ගැටළුවක් විසඳීමට ප්‍රශ්න අසන්න</li>
                  <li>ගැඹුරු හුස්ම ගැනීම හෝ භාවනාව වැනි සැහැල්ලු කිරීමේ ක්‍රම පුහුණු කරන්න</li>
                  <li>රෝහල් මාර්ගෝපදේශ තුළ සනසන අයිතම රැගෙන එන්න</li>
                  <li>නිකුත් කිරීමෙන් පසු පවුලේ අය හෝ මිතුරන්ගේ සහය සලසා ගන්න</li>
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold">ප්‍රායෝගික සූදානම:</h4>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>රෝහලට යාමට සහ රෝහලෙන් ආපසු පැමිණීමට ප්‍රවාහනය සකස් කරන්න</li>
                  <li>ඔබේ ආපසු පැමිණීම සඳහා ඔබේ නිවස සූදානම් කරන්න (පහසු ආහාර, පහසු සුවය ලැබීමේ ප්‍රදේශය)</li>
                  <li>ඔබේ ඖෂධ, ආසාත්මිකතා සහ පෙර නිර්වින්දන අත්දැකීම් ලැයිස්තුවක්/ ක්ලිනික් පොත්/පරීක්ශන වර්තා රැගෙන එන්න</li>
                  <li>ශල්‍යකර්මයට පෙර ආභරණ, පැළඳුම් සහ නිය තීන්ත ඉවත් කරන්න</li>
                  <li>ශල්‍යකර්මයට පෙර ස්නානය කිරීම පිළිබඳ විශේෂිත උපදෙස් අනුගමනය කරන්න</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-semibold">{t('before.qa4.physical')}</h4>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>{t('before.qa4.plist1')}</li>
                  <li>{t('before.qa4.plist2')}</li>
                  <li>{t('before.qa4.plist3')}</li>
                  <li>{t('before.qa4.plist4')}</li>
                  <li>{t('before.qa4.plist5')}</li>
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold">{t('before.qa4.mental')}</h4>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>{t('before.qa4.mlist1')}</li>
                  <li>{t('before.qa4.mlist2')}</li>
                  <li>{t('before.qa4.mlist3')}</li>
                  <li>{t('before.qa4.mlist4')}</li>
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold">{t('before.qa4.practical')}</h4>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>{t('before.qa4.prlist1')}</li>
                  <li>{t('before.qa4.prlist2')}</li>
                  <li>{t('before.qa4.prlist3')}</li>
                  <li>{t('before.qa4.prlist4')}</li>
                  <li>{t('before.qa4.prlist5')}</li>
                </ul>
              </div>
            </>
          )}
        </QASection>
      </div>
    </div>
  );
};

export default BeforeSurgeryPage;
