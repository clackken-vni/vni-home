import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('vi');
  const [translations, setTranslations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = localStorage.getItem('language') || 'vi';
        setLanguage(savedLanguage);

        const response = await fetch(`/locales/${savedLanguage}.json`);
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Error loading language:', error);
        setTranslations({});
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguage();
  }, []);

  const value = {
    language,
    translations,
    setLanguage: (lang) => {
      localStorage.setItem('language', lang);
      setLanguage(lang);
    },
    isLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {!isLoading && children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};
