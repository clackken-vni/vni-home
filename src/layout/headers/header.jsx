import useSticky from '@/src/hooks/use-sticky';
import Link from 'next/link';
import React from 'react';
import NavMenu from './nav-menu';
import MobileMenus from './mobile-menus';
import useLanguage from '@/src/hooks/useLanguage';
import LanguageSwitcher from '@/src/components/LanguageSwitcher';

const Header = ({ style_7 }) => {
  const { sticky } = useSticky();
  const { translations } = useLanguage();

  return (
    <>
      <header
        id='header-sticky'
        className={`${style_7 ? 'header-transparent header-green' : 'header-normal'}  ${sticky && 'sticky-bar'}`}
      >
        <div className='header-area'>
          <div className='container'>
            <div className='position-relative'>
              <div className='row align-items-center'>
                <div className='col-xl-2 col-lg-2'>
                  <div className='logo'>
                    <Link href='/'>
                      {' '}
                      <img src='assets/img/logo/logo.png' alt='theme-pure' />{' '}
                    </Link>
                  </div>
                </div>
                <div className='col-xl-8 col-lg-8 position-static'>
                  <div className={`main-menu ${style_7 ? '' : 'pink-menu'} text-center d-none d-lg-block`}>
                    <nav id='mobile-menu'>
                      <NavMenu />
                    </nav>
                  </div>
                  <div className='mobile-menu mean-container d-lg-none'>
                    <div className='mean-push'></div>
                    <div className='mean-bar'>
                      <MobileMenus />
                    </div>
                  </div>
                </div>
                <div className='col-xl-2 col-lg-2 d-none d-lg-block'>
                  <div className='d-flex align-items-center justify-content-end gap-3'>
                    <div className='header-btn text-right flex-shrink-0'>
                      <LanguageSwitcher className='flex-shrink-0' />
                      {/* <Link href='/register' className={`x-btn btn-border ${style_7 ? '' : 'btn-radius'}`}>
                        {translations?.header?.btn?.signup || 'Sign Up'}
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
