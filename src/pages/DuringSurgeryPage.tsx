import React from 'react';
import QASection from '@/components/QASection';
import { useLanguage } from '@/contexts/LanguageContext';
import { useImageData } from '@/contexts/ImageDataContext';

const DuringSurgeryPage: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { getImagesForSection } = useImageData();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">{t('during.title')}</h1>
      <p className="text-lg text-neutral-dark max-w-3xl mx-auto mb-10 text-center">
        {currentLanguage === 'si' ? 'නිර්වින්දනය යනු කුමක්ද?' : t('during.intro')}
      </p>

      <div className="max-w-3xl mx-auto">
        <QASection 
          question={t('during.qa1.question')} 
          defaultOpen={true}
          images={getImagesForSection('during.qa1')}
          imageLayout="carousel"
        >
          {currentLanguage === 'si' ? (
            <>
              <div>
                <h4 className="font-semibold">සම්පුර්න නිර්වින්දනය/ සිහිනැති කිරීම ම (General Anaesthesia):</h4>
                <p>ඖෂධ මගින් ඇති කරන සිහිනැතිකිරීම . ඔබේ ශල්‍යකර්මය අතරතුර ඔබ සම්පූර්ණයෙන්ම නොදැනුවත්ව සිටින අතර වේදනාවක් දැනීමට නොහැකි වනු ඇත.</p>
                <p className="mt-2 text-sm italic">සාමාන්‍යයෙන් භාවිතා කරන්නේ: ප්‍රධාන ශල්‍යකර්ම, ශරීර කුහර වල ශල්‍යයකර්ම , හෝ වෙනත් ආකාර සුදුසු නොවන විට.</p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold">සුෂුම්නා නිර්දවින්දනය:</h4>
                <p>ස්නායු සම්ප්‍රේෂණය අවහිර කිරීම සඳහා Subarachnoid අවකාශයට (කශේරුකාව) හෝ එපිඩුරල් අවකාශයට නිර්වේදකය එන්නත් කිරීම.</p>
                <p className="mt-2 text-sm italic">සාමාන්‍යයෙන් භාවිතා කරන්නේ: පහළ ශරීරයේ ශෛල්‍යයකර්ම , සීසර් සැත්කම්, ඉඟටිය/දණහිස ශල්‍යකර්ම සඳහා.</p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold">පර්යන්ත ස්නායු අවහිර කිරීම:</h4>
                <p>ශරීරයේ විශේෂිත ප්‍රදේශයක් අමාරුවෙන් තොරව සිටීම සඳහා නිශ්චිත ස්නායු අසලට පෙදෙසීය නිර්වේදකය එන්නත් කිරීම.</p>
                <p className="mt-2 text-sm italic">සාමාන්‍යයෙන් භාවිතා කරන්නේ: අත්, උරහිස, හෝ කකුල් ශල්‍යකර්ම සඳහා, ඉලක්කගත වේදනා සහනය ලබා දෙමින්.</p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold">සැහැල්ලු කිරීම (Sedation):</h4>
                <p>නිර්වේදනය යනු සැහැල්ලු වීමෙන් සිට ගැඹුරු මන්දගාමී කිරීම දක්වා විය හැක, ප්‍රමාණවත් තරමට විසංයෝජනය කරන අතර තවමත් ස්වයංව හුස්ම ගැනීමට ඉඩ සලසයි.</p>
                <p className="mt-2 text-sm italic">රඝශිඔප්ක්ගෂ කිරීමේ ක්‍රියා පටිපාටි, දන්ත ක්‍රියා පටිපාටි, හෝ පුංචි ක්‍රියා පටිපාටි සඳහා භාවිතා කරන ලදී.</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-semibold">{t('during.qa1.general')}</h4>
                <p>{t('during.qa1.generalDesc')}</p>
                <p className="mt-2 text-sm italic">{t('during.qa1.generalUse')}</p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold">{t('during.qa1.spinal')}</h4>
                <p>{t('during.qa1.spinalDesc')}</p>
                <p className="mt-2 text-sm italic">{t('during.qa1.spinalUse')}</p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold">{t('during.qa1.nerve')}</h4>
                <p>{t('during.qa1.nerveDesc')}</p>
                <p className="mt-2 text-sm italic">{t('during.qa1.nerveUse')}</p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold">{t('during.qa1.sedation')}</h4>
                <p>{t('during.qa1.sedationDesc')}</p>
                <p className="mt-2 text-sm italic">{t('during.qa1.sedationUse')}</p>
              </div>
            </>
          )}
        </QASection>

        <QASection 
          question={t('during.qa2.question')}
          images={getImagesForSection('during.qa2')}
          imageLayout="single"
        >
          {currentLanguage === 'si' ? (
            <>
              <div>
                <h4 className="font-semibold">සම්පුර්න නිර්වින්දනය:</h4>
                <p>
                  සාමාන්‍ය නිර්වේදනය ක්‍රියා කරන්නේ කැනියුලාව හරහා එන්නත් කරන ඖෂධවල සංයෝගයක් හරහාය:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>සිහිමූර්ජාව ඇති කරයි</li>
                  <li>මාංශපේශි ලිහිල් කරයි</li>
                  <li>වේදනාව සමනය කරයි</li>
                  <li>ශරීර ක්‍රියාකාරිත්වය පවත්වා ගැනීම පාලනය කරයි</li>
                </ul>
                <p className="mt-2">
                  ශල්‍යකර්මය අවසන් වන විට, නිර්වින්දන වෛද්‍ය වරයා ඖෂධ පාලනය නවත්වනු ඇත, ඔබ ටිකෙන් ටික අවදි විය හැකිය.
                </p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold">සුෂුම්නා නිර්වින්දනය:</h4>
                <p>
                  කශේරුකාවට/ කොන්දට හිරිවැටෙන බෙහෙතක් එන්නත් කරනු ලැබේ:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>ස්නායු ආවේග සුෂුම්නාව ඔස්සේ මොළයට ගමන් කිරීම වළක්වයි</li>
                  <li>ශරීරයේ පහළ කොටස හිරිවැටී යාමට සලස්වයි</li>
                </ul>
                <p className="mt-2">
                  ශල්‍යකර්මය අවසන් වන විට නිර්වේදය සාමාන්‍යයෙන් පැය 2-4 අතර කාලයක් ඇතුළත ඉවත් වේ.
                </p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold">පර්යන්ත ස්නායු හිරිවැට්ටීම:</h4>
                <p>
                  අල්ට්‍රාසවුන්ඩ් මඟපෙන්වීම/ Scan භාවිතා කරමින්, විශේෂිත ස්නායු වටා නිර්වේදක එන්නත් කරති. සිහි නැති වීමක් සිදු නොවෙ.
                </p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold">සැහැල්ලු කිරීම (Sedation)</h4>
                <p>
                  සැහැල්ලු කිරීම ගැඹුරට සිදු කරන විට:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>විසංයෝජනය සහ සැහැල්ලු කිරීම සඳහා සිරාව හරහා ඖෂධ ලබාදෙන ලදී</li>
                  <li>වේදනාව අඩු කිරීමට පෙදෙසීය නිර්වේදකයද භාවිතා කළ හැකිය</li>
                  <li>ඔබ විහිළු වලට ප්‍රතිචාර දැක්විය හැකි නමුත් සම්පූර්ණයෙන්ම දැනුවත්ව නොසිටිය හැකිය</li>
                  <li>මතක ශක්තිය යම් ආකාරයකට අඩු විය හැකිය</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-semibold">{t('during.qa2.general')}</h4>
                <p>
                  {t('during.qa2.generalDesc')}
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>{t('during.qa2.generalList1')}</li>
                  <li>{t('during.qa2.generalList2')}</li>
                  <li>{t('during.qa2.generalList3')}</li>
                  <li>{t('during.qa2.generalList4')}</li>
                </ul>
                <p className="mt-2">
                  {t('during.qa2.generalEnd')}
                </p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold">{t('during.qa2.spinal')}</h4>
                <p>
                  {t('during.qa2.spinalDesc')}
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>{t('during.qa2.spinalList1')}</li>
                  <li>{t('during.qa2.spinalList2')}</li>
                </ul>
                <p className="mt-2">
                  {t('during.qa2.spinalEnd')}
                </p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold">{t('during.qa2.nerve')}</h4>
                <p>
                  {t('during.qa2.nerveDesc')}
                </p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold">{t('during.qa2.sedation')}</h4>
                <p>
                  {t('during.qa2.sedationDesc')}
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>{t('during.qa2.sedationList1')}</li>
                  <li>{t('during.qa2.sedationList2')}</li>
                  <li>{t('during.qa2.sedationList3')}</li>
                  <li>{t('during.qa2.sedationList4')}</li>
                </ul>
              </div>
            </>
          )}
        </QASection>

        <QASection 
          question={t('during.qa3.question')}
          images={getImagesForSection('during.qa3')}
        >
          <div>
            <h4 className="font-semibold">{t('during.qa3.minor')}</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{t('during.qa3.minorList1')}</li>
              <li>{t('during.qa3.minorList2')}</li>
              <li>{t('during.qa3.minorList3')}</li>
              <li>{t('during.qa3.minorList4')}</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">{t('during.qa3.regional')}</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{t('during.qa3.regionalList1')}</li>
              <li>{t('during.qa3.regionalList2')}</li>
              <li>{t('during.qa3.regionalList3')}</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">{t('during.qa3.serious')}</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{t('during.qa3.seriousList1')}</li>
              <li>{t('during.qa3.seriousList2')}</li>
              <li>{t('during.qa3.seriousList3')}</li>
              <li>{t('during.qa3.seriousList4')}</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">{t('during.qa3.airway')}</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{t('during.qa3.airwayList1')}</li>
              <li>{t('during.qa3.airwayList2')}</li>
              <li>{t('during.qa3.airwayList3')}</li>
            </ul>
            <p className="mt-4 text-sm bg-neutral-light p-3 rounded-lg">
              {t('during.qa3.remember')}
            </p>
          </div>
        </QASection>

        <QASection 
          question={t('during.qa4.question')}
          images={getImagesForSection('during.qa4')}
        >
          <div>
            <h4 className="font-semibold">{t('during.qa4.standard')}</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{t('during.qa4.standardList1')}</li>
              <li>{t('during.qa4.standardList2')}</li>
              <li>{t('during.qa4.standardList3')}</li>
              <li>{t('during.qa4.standardList4')}</li>
              <li>{t('during.qa4.standardList5')}</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">{t('during.qa4.advanced')}</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{t('during.qa4.advancedList1')}</li>
              <li>{t('during.qa4.advancedList2')}</li>
              <li>{t('during.qa4.advancedList3')}</li>
              <li>{t('during.qa4.advancedList4')}</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">{t('during.qa4.targets')}</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{t('during.qa4.targetsList1')}</li>
              <li>{t('during.qa4.targetsList2')}</li>
              <li>{t('during.qa4.targetsList3')}</li>
              <li>{t('during.qa4.targetsList4')}</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">{t('during.qa4.safety')}</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{t('during.qa4.safetyList1')}</li>
              <li>{t('during.qa4.safetyList2')}</li>
              <li>{t('during.qa4.safetyList3')}</li>
              <li>{t('during.qa4.safetyList4')}</li>
              <li>{t('during.qa4.safetyList5')}</li>
            </ul>
            <p className="mt-4 text-sm bg-neutral-light p-3 rounded-lg">
              {t('during.qa4.modern')}
            </p>
          </div>
        </QASection>

        <QASection 
          question={t('during.qa5.question')}
          images={getImagesForSection('during.qa5')}
        >
          <p>
            {t('during.qa5.intro')}
          </p>
          
          <div className="mt-4">
            <h4 className="font-semibold">{t('during.qa5.responsibilities')}</h4>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                {t('during.qa5.respList1')}
              </li>
              <li>
                {t('during.qa5.respList2')}
              </li>
              <li>
                {t('during.qa5.respList3')}
              </li>
              <li>
                {t('during.qa5.respList4')}
              </li>
              <li>
                {t('during.qa5.respList5')}
              </li>
              <li>
                {t('during.qa5.respList6')}
              </li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">{t('during.qa5.team')}</h4>
            <p>
              {t('during.qa5.teamDesc')}
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{t('during.qa5.teamList1')}</li>
              <li>{t('during.qa5.teamList2')}</li>
              <li>{t('during.qa5.teamList3')}</li>
            </ul>
            <p className="mt-4 text-sm bg-neutral-light p-3 rounded-lg">
              {t('during.qa5.think')}
            </p>
          </div>
        </QASection>
      </div>
    </div>
  );
};

export default DuringSurgeryPage;
