import { useLanguageContext } from '../context/LanguageContext';

const useLanguage = () => {
  const context = useLanguageContext();

  return {
    language: context.language,
    translations: context.translations || {},
    setLanguage: context.setLanguage
  };
};

export default useLanguage;
