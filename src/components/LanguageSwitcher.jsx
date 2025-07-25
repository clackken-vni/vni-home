import React from 'react';
import useLanguage from '@/src/hooks/useLanguage';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const changeLanguage = lang => {
    setLanguage(lang);
    window.location.reload();
  };

  return (
    <div className='btn-group mb-1'>
      <button
        className='me-1 btn btn-warning'
        type='button'
        id='dropdownMenuButton1'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        {language === 'en' ? 'English' : 'Tiếng Việt'}
      </button>
      <div className='dropdown-menu' role='menu'>
        <a className='dropdown-item' href='#' onClick={() => changeLanguage('en')}>
          English
        </a>
        <a className='dropdown-item' href='#' onClick={() => changeLanguage('vi')}>
          Tiếng Việt
        </a>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
