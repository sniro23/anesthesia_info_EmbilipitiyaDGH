import React from 'react';
import QASection from '@/components/QASection';
import { useLanguage } from '@/contexts/LanguageContext';
import { useImageData } from '@/contexts/ImageDataContext';

const AfterSurgeryPage: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { getImagesForSection } = useImageData();

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center">{t('after.title')}</h1>
      <p className="text-base sm:text-lg text-neutral-dark max-w-3xl mx-auto mb-6 md:mb-10 text-center">
        {currentLanguage === 'si' ? 'ශල්‍යකර්මයෙන් පසු ඔබට සිදුවන්නේ කුමක්ද?' : t('after.intro')}
      </p>

      <div className="max-w-3xl mx-auto">
        <QASection 
          question={t('after.qa1.question')} 
          defaultOpen={true}
          images={getImagesForSection('after.qa1')}
        >
          {currentLanguage === 'si' ? (
            <>
              <p className="text-sm sm:text-base">
                ඔබේ ශල්‍යකර්මයෙන් පසු, ඔබව ප්‍රකෘතිමත් වීමේ කාමරය ලෙසද හැඳින්වෙන පසු-නිර්වේදන සත්කාර ඒකකයට (PACU) මාරු කරනු ලැබේ. මෙය ඔබ නිර්වින්දනයෙන් ඉවත් වන විට සමීපව අධීක්ෂණය කරනු ලබන විශේෂිත ප්‍රදේශයකි.
              </p>
              
              <div className="mt-3 md:mt-4">
                <h4 className="font-semibold text-sm sm:text-base">PACU හිදී, ඔබට බලාපොරොත්තු විය හැක්කේ:</h4>
                <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>
                    <strong>අඛණ්ඩ අධීක්ෂණය</strong> ඔබේ ප්‍රධාන සංඥා (රුධිර පීඩනය, හෘද වේගය, ඔක්සිජන් මට්ටම)
                  </li>
                  <li>
                    <strong>එක් අයෙකු සඳහා එක් හෙද සත්කාරය</strong> ඔබ සම්පූර්ණයෙන් අවදි වන තුරු සහ ස්ථාවර වන තුරු
                  </li>
                  <li>
                    <strong>නිතිපතා ඇගයීම්</strong> ඔබේ වේදනා මට්ටම් සහ අවශ්‍ය පරිදි වේදනා ඖෂධ පරිපාලනය
                  </li>
                  <li>
                    <strong>ඔක්සිජන් චිකිත්සාව</strong> අවශ්‍ය නම් මුහුණු ආවරණයක් හෝ නාසාග්‍ර හරහා
                  </li>
                  <li>
                    <strong>උණුසුම්ව තබ ගැනීම</strong> - සීතල වීමක් නම් 
                  </li>
                  <li>
                    <strong>දියර වර්ග/සේලයින්</strong> ලබා දීම
                  </li>
                </ul>
              </div>
              
              <div className="mt-3 md:mt-4">
                <h4 className="font-semibold text-sm sm:text-base">මම ප්‍රකෘතිමත් වීමේ කාමරයේ කොපමණ කාලයක් රැඳී සිටින්නේද?</h4>
                <p className="text-sm sm:text-base">
                  බොහෝ රෝගීන් PACU හි මිනිත්තු 30 සිට පැය 2 දක්වා රැඳී සිටිනු ඇත, පහත කරුණු මත රඳා පවතී:
                </p>
                <ul className="list-disc pl-4 sm:pl-6 mt-1 sm:mt-2 space-y-1 text-sm sm:text-base">
                  <li>ඔබට ලැබුණු ශල්‍යකර්මයේ සහ නිර්වින්දන වර්ගය</li>
                  <li>ඔබ කෙතරම් ඉක්මනින් අවදි වන්නේද සහ ස්ථාවර වන්නේද</li>
                  <li>ඔබේ වේදනාව සහ ඕනෑම ඔක්කාරයක් කොපමණ හොඳින් පාලනය කරන්නේද</li>
                  <li>ශල්‍යකර්මය අතරතුර සංකූලතා තිබුණේද</li>
                </ul>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base">
                  ප්‍රකෘතිමත් වීමේ කණ්ඩායම ඔබේ තත්ත්වය ගැන සෑහීමකට පත් වූ පසු ඔබව වාට්ටුවකට මාරු කරනු ලබන්නේ හෝ නිවසට මුදා හරිනු ලබන්නේය.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm sm:text-base">
                {t('after.qa1.intro')}
              </p>
              
              <div className="mt-3 md:mt-4">
                <h4 className="font-semibold text-sm sm:text-base">{t('after.qa1.expect')}</h4>
                <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>
                    <strong>{t('after.qa1.monitoring')}</strong> {t('after.qa1.monitoringDesc')}
                  </li>
                  <li>
                    <strong>{t('after.qa1.nursing')}</strong> {t('after.qa1.nursingDesc')}
                  </li>
                  <li>
                    <strong>{t('after.qa1.assessments')}</strong> {t('after.qa1.assessmentsDesc')}
                  </li>
                  <li>
                    <strong>{t('after.qa1.oxygen')}</strong> {t('after.qa1.oxygenDesc')}
                  </li>
                  <li>
                    <strong>{t('after.qa1.warming')}</strong> {t('after.qa1.warmingDesc')}
                  </li>
                  <li>
                    <strong>{t('after.qa1.iv')}</strong> {t('after.qa1.ivDesc')}
                  </li>
                </ul>
              </div>
              
              <div className="mt-3 md:mt-4">
                <h4 className="font-semibold text-sm sm:text-base">{t('after.qa1.howLong')}</h4>
                <p className="text-sm sm:text-base">
                  {t('after.qa1.timeFrame')}
                </p>
                <ul className="list-disc pl-4 sm:pl-6 mt-1 sm:mt-2 space-y-1 text-sm sm:text-base">
                  <li>{t('after.qa1.timeList1')}</li>
                  <li>{t('after.qa1.timeList2')}</li>
                  <li>{t('after.qa1.timeList3')}</li>
                  <li>{t('after.qa1.timeList4')}</li>
                </ul>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base">
                  {t('after.qa1.transfer')}
                </p>
              </div>
            </>
          )}
        </QASection>

        <QASection 
          question={t('after.qa2.question')}
          images={getImagesForSection('after.qa2')}
        >
          {currentLanguage === 'si' ? (
            <>
              <div>
                <h4 className="font-semibold text-sm sm:text-base">සාමාන්‍ය අතුරු ආබාධ:</h4>
                <ul className="list-disc pl-4 sm:pl-6 mt-1 sm:mt-2 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>
                    <strong>උගුරේ අමාරුව</strong> - හුස්ම නළයෙන්; සාමාන්‍යයෙන් පැය 24-48 තුළ සුව වේ
                  </li>
                  <li>
                    <strong>ඔක්කාරය සහ වමනය</strong> - ඖෂධ මගින් ප්‍රතිකාර කළ හැක
                  </li>
                  <li>
                    <strong>හිස කැරකැවීම</strong> - බොහෝ විට මෘදු චලනය සහ ජලය පානය කිරීමෙන් වැඩි දියුණු වේ
                  </li>
                  <li>
                    <strong>නිදිමත බව</strong> - නිර්වින්දනය පහව යන විට ක්‍රමයෙන් නැති වේ 
                  </li>
                  <li>
                    <strong>සීතල වීම</strong> - සාමාන්‍යයෙන් තාවකාලිකයි; උණුසුම් පොරවන මගින් ප්‍රතිකාර කරනු ලැබේ
                  </li>
                  <li>
                    <strong>වික්ෂිප්තභාවය</strong> - වයස්ගත වැඩිහිටියන් තුළ වඩාත් පොදුය; සාමාන්‍යයෙන් තාවකාලිකයි
                  </li>
                </ul>
              </div>
              
              <div className="mt-3 md:mt-4">
                <h4 className="font-semibold text-sm sm:text-base">වේදනා කළමනාකරණය:</h4>
                <ul className="list-disc pl-4 sm:pl-6 mt-1 sm:mt-2 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>
                    <strong>අයිවී වේදනා ඖෂධ</strong> - වහාම සහනය සඳහා බොහෝ විට මෝෆින් වැනි බෙහෙත් 
                  </li>
                  <li>
                    <strong>රෝගියා-පාලිත වේදනා නාශක (PCA)</strong> - බොත්තමක් එබීමෙන් ඔබට වේදනා ඖෂධ වල කුඩා මාත්‍රා ස්වයං පරිපාලනය කිරීමට ඉඩ සලසයි
                  </li>
                  <li>
                    <strong>මුඛ වේදනා ඖෂධ</strong> - ඔබට ද්‍රව පානය කළ හැකි වූ පසු පෙති හෝ ද්‍රව
                  </li>
                  <li>
                    <strong>සුෂුම්නා / පර්යන්ත ස්නායු</strong> - ශල්‍යකර්මයෙන් පසු පැය ගණනක් වේදනා සහනය ලබා දීමට ඉඩ ඇත
                  </li>
                  <li>
                    <strong>හිරිවට්ටන බෙහෙත් එන්නත් කිරීම</strong> - ශල්‍ය ස්ථානය වටා එන්නත් කරනු ලැබේ
                  </li>
                  <li>
                    <strong>ඖෂධ නොවන ක්‍රම</strong> - අයිස් පැක් තැබීම
                  </li>
                </ul>
              </div>
              
              <div className="mt-3 md:mt-4 bg-neutral-light p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-sm sm:text-base">වැදගත් වේදනා කළමනාකරණ ඉඟි:</h4>
                <ul className="list-disc pl-4 sm:pl-6 mt-1 sm:mt-2 space-y-1 text-sm sm:text-base">
                  <li>වේදනා සහනය ඉල්ලීමට පෙර වේදනාව දරුණු වන තෙක් රැඳී සිටීමෙන් වළකින්න</li>
                  <li>සෞඛ්‍ය කාර්ය මණ්ඩලය විසින් විමසන විට ඔබේ වේදනාව 0-10 පරිමාණයක සිට අගයන්න</li>
                  <li>වේදනා ඖෂධ ක්‍රියා නොකරන්නේ නම් ඉක්මනින් පහව යන්නේ නම් ඔබේ හෙදියන්ට පවසන්න</li>
                  <li>වේදනා ඖෂධ වලින් අසාමාන්‍ය රෝග ලක්ෂණ හෝ අතුරු ආබාධ වාර්තා කරන්න</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-semibold text-sm sm:text-base">{t('after.qa2.sideEffects')}</h4>
                <ul className="list-disc pl-4 sm:pl-6 mt-1 sm:mt-2 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>
                    <strong>{t('after.qa2.throat')}</strong> {t('after.qa2.throatDesc')}
                  </li>
                  <li>
                    <strong>{t('after.qa2.nausea')}</strong> {t('after.qa2.nauseaDesc')}
                  </li>
                  <li>
                    <strong>{t('after.qa2.dizziness')}</strong> {t('after.qa2.dizzinessDesc')}
                  </li>
                  <li>
                    <strong>{t('after.qa2.drowsiness')}</strong> {t('after.qa2.drowsinessDesc')}
                  </li>
                  <li>
                    <strong>{t('after.qa2.shivering')}</strong> {t('after.qa2.shiveringDesc')}
                  </li>
                  <li>
                    <strong>{t('after.qa2.confusion')}</strong> {t('after.qa2.confusionDesc')}
                  </li>
                </ul>
              </div>
              
              <div className="mt-3 md:mt-4">
                <h4 className="font-semibold text-sm sm:text-base">{t('after.qa2.painManagement')}</h4>
                <ul className="list-disc pl-4 sm:pl-6 mt-1 sm:mt-2 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>
                    <strong>{t('after.qa2.ivPain')}</strong> {t('after.qa2.ivPainDesc')}
                  </li>
                  <li>
                    <strong>{t('after.qa2.pca')}</strong> {t('after.qa2.pcaDesc')}
                  </li>
                  <li>
                    <strong>{t('after.qa2.oral')}</strong> {t('after.qa2.oralDesc')}
                  </li>
                  <li>
                    <strong>{t('after.qa2.blocks')}</strong> {t('after.qa2.blocksDesc')}
                  </li>
                  <li>
                    <strong>{t('after.qa2.local')}</strong> {t('after.qa2.localDesc')}
                  </li>
                  <li>
                    <strong>{t('after.qa2.nonMed')}</strong> {t('after.qa2.nonMedDesc')}
                  </li>
                </ul>
              </div>
              
              <div className="mt-3 md:mt-4 bg-neutral-light p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-sm sm:text-base">{t('after.qa2.tips')}</h4>
                <ul className="list-disc pl-4 sm:pl-6 mt-1 sm:mt-2 space-y-1 text-sm sm:text-base">
                  <li>{t('after.qa2.tipsList1')}</li>
                  <li>{t('after.qa2.tipsList2')}</li>
                  <li>{t('after.qa2.tipsList3')}</li>
                  <li>{t('after.qa2.tipsList4')}</li>
                </ul>
              </div>
            </>
          )}
        </QASection>

        <QASection 
          question={t('after.qa3.question')}
          images={getImagesForSection('after.qa3')}
        >
          <p>
            {t('after.qa3.intro')}
          </p>
          
          <div className="mt-3 md:mt-4">
            <h4 className="font-semibold text-sm sm:text-base">{t('after.qa3.guidelines')}</h4>
            <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-2 text-sm sm:text-base">
              <li>
                <strong>{t('after.qa3.fluids')}</strong> {t('after.qa3.fluidsDesc')}
              </li>
              <li>
                <strong>{t('after.qa3.light')}</strong> {t('after.qa3.lightDesc')}
              </li>
              <li>
                <strong>{t('after.qa3.regular')}</strong> {t('after.qa3.regularDesc')}
              </li>
            </ul>
          </div>
          
          <div className="mt-3 md:mt-4">
            <h4 className="font-semibold text-sm sm:text-base">{t('after.qa3.considerations')}</h4>
            <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-2 text-sm sm:text-base">
              <li>
                <strong>{t('after.qa3.abdominal')}</strong> {t('after.qa3.abdominalDesc')}
              </li>
              <li>
                <strong>{t('after.qa3.throat')}</strong> {t('after.qa3.throatDesc')}
              </li>
              <li>
                <strong>{t('after.qa3.nausea')}</strong> {t('after.qa3.nauseaDesc')}
              </li>
              <li>
                <strong>{t('after.qa3.medications')}</strong> {t('after.qa3.medicationsDesc')}
              </li>
            </ul>
            <p className="mt-4 text-sm bg-amber/10 p-3 rounded-lg border border-amber">
              {t('after.qa3.always')}
            </p>
          </div>
        </QASection>

        <QASection 
          question={t('after.qa4.question')}
          images={getImagesForSection('after.qa4')}
        >
          <div>
            <h4 className="font-semibold text-sm sm:text-base">{t('after.qa4.instructions')}</h4>
            <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-2 text-sm sm:text-base">
              <li>
                <strong>{t('after.qa4.activity')}</strong> {t('after.qa4.activityDesc')}
              </li>
              <li>
                <strong>{t('after.qa4.wound')}</strong> {t('after.qa4.woundDesc')}
              </li>
              <li>
                <strong>{t('after.qa4.medication')}</strong> {t('after.qa4.medicationDesc')}
              </li>
              <li>
                <strong>{t('after.qa4.infection')}</strong> {t('after.qa4.infectionDesc')}
              </li>
              <li>
                <strong>{t('after.qa4.diet')}</strong> {t('after.qa4.dietDesc')}
              </li>
              <li>
                <strong>{t('after.qa4.showering')}</strong> {t('after.qa4.showeringDesc')}
              </li>
              <li>
                <strong>{t('after.qa4.contact')}</strong> {t('after.qa4.contactDesc')}
              </li>
            </ul>
          </div>
          
          <div className="mt-3 md:mt-4">
            <h4 className="font-semibold text-sm sm:text-base">{t('after.qa4.appointments')}</h4>
            <p>
              {t('after.qa4.appointmentsDesc')}
            </p>
            <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1 text-sm sm:text-base">
              <li>{t('after.qa4.appointmentsList1')}</li>
              <li>{t('after.qa4.appointmentsList2')}</li>
              <li>{t('after.qa4.appointmentsList3')}</li>
            </ul>
            <p className="mt-2 text-sm sm:text-base">
              {t('after.qa4.keepAppts')}
            </p>
          </div>
          
          <div className="mt-3 md:mt-4 bg-amber/10 p-3 sm:p-4 rounded-lg border border-amber">
            <h4 className="font-semibold text-sm sm:text-base">{t('after.qa4.seekHelp')}</h4>
            <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1 text-sm sm:text-base">
              <li>{t('after.qa4.seekList1')}</li>
              <li>{t('after.qa4.seekList2')}</li>
              <li>{t('after.qa4.seekList3')}</li>
              <li>{t('after.qa4.seekList4')}</li>
              <li>{t('after.qa4.seekList5')}</li>
              <li>{t('after.qa4.seekList6')}</li>
              <li>{t('after.qa4.seekList7')}</li>
              <li>{t('after.qa4.seekList8')}</li>
            </ul>
          </div>
          
          <div className="mt-3 md:mt-4">
            <p className="font-semibold text-sm sm:text-base">{t('after.qa4.pathway')}</p>
            <p>
              {t('after.qa4.pathwayDesc')}
            </p>
            <p className="mt-2 text-sm sm:text-base">
              {t('after.qa4.keepInstructions')}
            </p>
          </div>
        </QASection>
      </div>
    </div>
  );
};

export default AfterSurgeryPage;
