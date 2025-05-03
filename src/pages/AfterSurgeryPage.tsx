import React from 'react';
import QASection from '@/components/QASection';
import { useLanguage } from '@/contexts/LanguageContext';

const AfterSurgeryPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center">{t('after.title')}</h1>
      <p className="text-base sm:text-lg text-neutral-dark max-w-3xl mx-auto mb-6 md:mb-10 text-center">
        {t('after.intro')}
      </p>

      <div className="max-w-3xl mx-auto">
        <QASection question={t('after.qa1.question')} defaultOpen={true}>
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
        </QASection>

        <QASection question={t('after.qa2.question')}>
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
        </QASection>

        <QASection question={t('after.qa3.question')}>
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

        <QASection question={t('after.qa4.question')}>
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
