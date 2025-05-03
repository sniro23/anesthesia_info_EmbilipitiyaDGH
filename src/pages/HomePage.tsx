
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-indigo/10 to-emerald/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-dark mb-6">
              {t('hero.subtitle')}
            </p>
            <p className="text-neutral-dark mb-10">
              {t('hero.intro')}
            </p>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center">
              <Link 
                to="/before-surgery" 
                className="bg-indigo hover:bg-indigo-light text-white font-medium py-3 px-6 rounded-xl transition-colors"
              >
                {t('cta.before')}
              </Link>
              <Link 
                to="/during-surgery" 
                className="bg-indigo hover:bg-indigo-light text-white font-medium py-3 px-6 rounded-xl transition-colors"
              >
                {t('cta.during')}
              </Link>
              <Link 
                to="/after-surgery" 
                className="bg-indigo hover:bg-indigo-light text-white font-medium py-3 px-6 rounded-xl transition-colors"
              >
                {t('cta.after')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              {t('about.title')}
            </h2>
            <div className="bg-white shadow-md rounded-2xl p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{t('about.whoTitle')}</h3>
                <p>{t('about.who')}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t('about.whyTitle')}</h3>
                <p>{t('about.why')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-12 md:py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            {t('whatToExpect.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-indigo">{t('whatToExpect.before.title')}</h3>
              <p className="text-neutral-dark mb-4">
                {t('whatToExpect.before.description')}
              </p>
              <Link 
                to="/before-surgery" 
                className="text-indigo hover:text-indigo-light font-medium inline-flex items-center"
              >
                {t('whatToExpect.learnMore')}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-indigo">{t('whatToExpect.during.title')}</h3>
              <p className="text-neutral-dark mb-4">
                {t('whatToExpect.during.description')}
              </p>
              <Link 
                to="/during-surgery" 
                className="text-indigo hover:text-indigo-light font-medium inline-flex items-center"
              >
                {t('whatToExpect.learnMore')}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-indigo">{t('whatToExpect.after.title')}</h3>
              <p className="text-neutral-dark mb-4">
                {t('whatToExpect.after.description')}
              </p>
              <Link 
                to="/after-surgery" 
                className="text-indigo hover:text-indigo-light font-medium inline-flex items-center"
              >
                {t('whatToExpect.learnMore')}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
