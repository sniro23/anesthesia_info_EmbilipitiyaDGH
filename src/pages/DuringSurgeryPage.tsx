import React from 'react';
import QASection from '@/components/QASection';
import { useLanguage } from '@/contexts/LanguageContext';

const DuringSurgeryPage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">{t('during.title')}</h1>
      <p className="text-lg text-neutral-dark max-w-3xl mx-auto mb-10 text-center">
        {t('during.intro')}
      </p>

      <div className="max-w-3xl mx-auto">
        <QASection question={t('during.qa1.question')} defaultOpen={true}>
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
        </QASection>

        <QASection question={t('during.qa2.question')}>
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
        </QASection>

        <QASection question={t('during.qa3.question')}>
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

        <QASection question={t('during.qa4.question')}>
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

        <QASection question={t('during.qa5.question')}>
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
