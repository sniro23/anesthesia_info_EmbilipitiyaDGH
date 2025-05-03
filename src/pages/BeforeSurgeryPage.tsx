
import React from 'react';
import QASection from '@/components/QASection';
import { useLanguage } from '@/contexts/LanguageContext';

const BeforeSurgeryPage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">{t('before.title')}</h1>
      <p className="text-lg text-neutral-dark max-w-3xl mx-auto mb-10 text-center">
        {t('before.intro')}
      </p>

      <div className="max-w-3xl mx-auto">
        <QASection question={t('before.qa1.question')} defaultOpen={true}>
          <p>
            {t('before.qa1.answer1')}
          </p>
          <p className="mt-4">
            {t('before.qa1.answer2')}
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>{t('before.qa1.list1')}</li>
            <li>{t('before.qa1.list2')}</li>
            <li>{t('before.qa1.list3')}</li>
            <li>{t('before.qa1.list4')}</li>
            <li>{t('before.qa1.list5')}</li>
          </ul>
        </QASection>

        <QASection question={t('before.qa2.question')}>
          <p>
            {t('before.qa2.answer1')}
          </p>
          <div className="mt-4 bg-amber/10 p-4 rounded-lg border border-amber">
            <h4 className="font-semibold">{t('before.qa2.guidelines')}</h4>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>{t('before.qa2.list1')}</li>
              <li>{t('before.qa2.list2')}</li>
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">{t('before.qa2.siptitle')}</h4>
            <p>
              {t('before.qa2.siptext1')}
            </p>
            <p className="mt-2">
              <a 
                href="https://cpoc.org.uk/sites/cpoc/files/documents/2025-01/Sip%20Til%20Send%20information%20for%20patients_0.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo hover:text-indigo-light underline"
              >
                {t('before.qa2.siptext2')}
              </a>
            </p>
          </div>
        </QASection>

        <QASection question={t('before.qa3.question')}>
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
        </QASection>

        <QASection question={t('before.qa4.question')}>
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
        </QASection>
      </div>
    </div>
  );
};

export default BeforeSurgeryPage;
