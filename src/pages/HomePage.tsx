import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const HomePage: React.FC = () => {
  const {
    t
  } = useLanguage();
  const isMobile = useIsMobile();
  return <div>
      {/* Hero Section */}
      <section className="py-8 md:py-16 lg:py-20 bg-gradient-to-br from-indigo/10 to-emerald/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-dark mb-4 md:mb-6">
              {t('hero.subtitle')}
            </p>
            <p className="text-neutral-dark mb-6 md:mb-10 text-sm sm:text-base">
              {t('hero.intro')}
            </p>
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3 md:gap-6 justify-center`}>
              <Link to="/before-surgery" className="bg-indigo hover:bg-indigo-light text-white font-medium py-2 md:py-3 px-4 md:px-6 rounded-xl transition-colors text-sm sm:text-base w-full sm:w-auto">
                {t('cta.before')}
              </Link>
              <Link to="/during-surgery" className="bg-indigo hover:bg-indigo-light text-white font-medium py-2 md:py-3 px-4 md:px-6 rounded-xl transition-colors text-sm sm:text-base w-full sm:w-auto">
                {t('cta.during')}
              </Link>
              <Link to="/after-surgery" className="bg-indigo hover:bg-indigo-light text-white font-medium py-2 md:py-3 px-4 md:px-6 rounded-xl transition-colors text-sm sm:text-base w-full sm:w-auto">
                {t('cta.after')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
              {t('about.title')}
            </h2>
            <div className="shadow-md p-4 sm:p-6 md:p-8 rounded-xl bg-slate-100">
              <div className="mb-4 md:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{t('about.whoTitle')}</h3>
                <p className="text-sm sm:text-base">{t('about.who')}</p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{t('about.whyTitle')}</h3>
                <p className="text-sm sm:text-base">{t('about.why')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-8 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center">
            {t('whatToExpect.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 md:mb-3 text-indigo">{t('whatToExpect.before.title')}</h3>
              <p className="text-neutral-dark mb-3 md:mb-4 text-sm sm:text-base">
                {t('whatToExpect.before.description')}
              </p>
              <Link to="/before-surgery" className="text-indigo hover:text-indigo-light font-medium inline-flex items-center text-sm sm:text-base">
                {t('whatToExpect.learnMore')}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 md:mb-3 text-indigo">{t('whatToExpect.during.title')}</h3>
              <p className="text-neutral-dark mb-3 md:mb-4 text-sm sm:text-base">
                {t('whatToExpect.during.description')}
              </p>
              <Link to="/during-surgery" className="text-indigo hover:text-indigo-light font-medium inline-flex items-center text-sm sm:text-base">
                {t('whatToExpect.learnMore')}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-shadow sm:col-span-2 md:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 md:mb-3 text-indigo">{t('whatToExpect.after.title')}</h3>
              <p className="text-neutral-dark mb-3 md:mb-4 text-sm sm:text-base">
                {t('whatToExpect.after.description')}
              </p>
              <Link to="/after-surgery" className="text-indigo hover:text-indigo-light font-medium inline-flex items-center text-sm sm:text-base">
                {t('whatToExpect.learnMore')}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>;
};

export default HomePage;
