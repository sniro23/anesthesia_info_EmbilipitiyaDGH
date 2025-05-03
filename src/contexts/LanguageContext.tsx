
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { LanguageCode, enTranslations, siTranslations, taTranslations } from '@/translations';

// Create a type for the translations
type TranslationsType = typeof enTranslations;

// Define the context type
interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  translations: TranslationsType;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create the provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get stored language or default to English
  const savedLanguage = localStorage.getItem('language') as LanguageCode;
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(savedLanguage || 'en');

  // Get translations based on current language
  const getTranslations = (): TranslationsType => {
    switch (currentLanguage) {
      case 'si':
        return siTranslations;
      case 'ta':
        return taTranslations;
      default:
        return enTranslations;
    }
  };

  const translations = getTranslations();

  // Function to set language
  const setLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function that returns the translated string or the key if not found
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations;

    // Navigate through the nested objects
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key as fallback
      }
    }

    return result;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};
