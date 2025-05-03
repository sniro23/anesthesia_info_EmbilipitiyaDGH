
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageCode } from '@/translations';

// Define language buttons for better maintainability
const LANGUAGE_OPTIONS: {code: LanguageCode; label: string}[] = [
  { code: 'en', label: 'EN' },
  { code: 'si', label: 'සිං' },
  { code: 'ta', label: 'தமி' }
];

const Header: React.FC = () => {
  const {
    t,
    currentLanguage,
    setLanguage
  } = useLanguage();
  
  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-neutral-mid z-10">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-3 sm:mb-0">
          <NavLink to="/" className="text-2xl font-semibold text-indigo mx-0 my-[2px]">
            {t('site.title')}
          </NavLink>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto justify-center sm:justify-end">
          <nav className="flex flex-wrap items-center justify-center space-x-1 md:space-x-4 text-sm md:text-base mb-3 sm:mb-0">
            <NavLink to="/" className={({isActive}) => 
              isActive ? "text-indigo font-medium px-2 py-1" : "text-neutral-dark hover:text-indigo transition px-2 py-1"
            }>
              {t('nav.home')}
            </NavLink>
            <NavLink to="/resources" className={({isActive}) => 
              isActive ? "text-indigo font-medium px-2 py-1" : "text-neutral-dark hover:text-indigo transition px-2 py-1"
            }>
              {t('nav.resources')}
            </NavLink>
          </nav>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:ml-4 mb-2 sm:mb-0">
            {LANGUAGE_OPTIONS.map(lang => (
              <button 
                key={lang.code}
                onClick={() => setLanguage(lang.code)} 
                className={`text-xs px-3 py-1.5 rounded-full ${
                  currentLanguage === lang.code 
                    ? 'bg-indigo text-white' 
                    : 'bg-neutral-mid/50 text-neutral-dark hover:bg-neutral-mid'
                }`}
                aria-label={`Switch to ${lang.code} language`}
                aria-pressed={currentLanguage === lang.code}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
