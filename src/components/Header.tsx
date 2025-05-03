
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Header: React.FC = () => {
  const { t, currentLanguage, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-neutral-mid z-10">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <NavLink to="/" className="text-2xl font-semibold text-indigo">
            {t('site.title')}
          </NavLink>
        </div>
        
        <div className="flex items-center space-x-1 md:space-x-4 mt-4 md:mt-0">
          <nav className="flex flex-wrap items-center space-x-1 md:space-x-4 text-sm md:text-base">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo font-medium px-2 py-1" 
                  : "text-neutral-dark hover:text-indigo transition px-2 py-1"
              }
            >
              {t('nav.home')}
            </NavLink>
            <NavLink 
              to="/before-surgery" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo font-medium px-2 py-1" 
                  : "text-neutral-dark hover:text-indigo transition px-2 py-1"
              }
            >
              {t('nav.before')}
            </NavLink>
            <NavLink 
              to="/during-surgery" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo font-medium px-2 py-1" 
                  : "text-neutral-dark hover:text-indigo transition px-2 py-1"
              }
            >
              {t('nav.during')}
            </NavLink>
            <NavLink 
              to="/after-surgery" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo font-medium px-2 py-1" 
                  : "text-neutral-dark hover:text-indigo transition px-2 py-1"
              }
            >
              {t('nav.after')}
            </NavLink>
            <NavLink 
              to="/resources" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo font-medium px-2 py-1" 
                  : "text-neutral-dark hover:text-indigo transition px-2 py-1"
              }
            >
              {t('nav.resources')}
            </NavLink>
          </nav>
          
          <div className="flex items-center ml-4 space-x-2">
            <button 
              onClick={() => setLanguage('en')} 
              className={`text-xs px-2 py-1 rounded-full ${
                currentLanguage === 'en' 
                  ? 'bg-indigo text-white' 
                  : 'bg-neutral-mid/50 text-neutral-dark hover:bg-neutral-mid'
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('si')} 
              className={`text-xs px-2 py-1 rounded-full ${
                currentLanguage === 'si' 
                  ? 'bg-indigo text-white' 
                  : 'bg-neutral-mid/50 text-neutral-dark hover:bg-neutral-mid'
              }`}
            >
              සිං
            </button>
            <button 
              onClick={() => setLanguage('ta')} 
              className={`text-xs px-2 py-1 rounded-full ${
                currentLanguage === 'ta' 
                  ? 'bg-indigo text-white' 
                  : 'bg-neutral-mid/50 text-neutral-dark hover:bg-neutral-mid'
              }`}
            >
              தமி
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
