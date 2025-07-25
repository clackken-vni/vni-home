import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import footer_logo from '@assets/img/logo/logo.png';
import { CopyRight } from '@/src/components/common/social-links';
import SocialLinks from '@/src/components/common/social-links';

import useLanguage from '@/src/hooks/useLanguage';

const footer_data = {
  footer_links: [
    {
      id: 1,
      title: 'About Us',
      links: [
        { title: 'Managed Website', link: '#' },
        { title: 'Power Tools', link: '#' },
        { title: 'Marketing Service', link: '#' },
        { title: 'Customer Service', link: '#' },
        { title: 'Manage Reputation', link: '#' }
      ]
    },
    {
      id: 2,
      title: 'Quick Links',
      links: [
        { title: 'Store Hours', link: '#' },
        { title: 'Brand Assets', link: '#' },
        { title: 'Investor Relations', link: '#' },
        { title: 'Terms of Service', link: '#' },
        { title: 'Privacy &  Policy', link: '#' }
      ]
    },
    {
      id: 3,
      title: 'My Account',
      links: [
        { title: 'Press Inquiries', link: '#' },
        { title: 'Media Directories', link: '#' },
        { title: 'Investor Relations', link: '#' },
        { title: 'Terms of Service', link: '#' },
        { title: 'Speaker Request', link: '#' }
      ]
    },
    {
      id: 4,
      title: 'Resources',
      links: [
        { title: 'Application Security', link: '#' },
        { title: 'Software Policy', link: '#' },
        { title: 'Supply Chain', link: '#' },
        { title: 'Agencies Relation', link: '#' },
        { title: 'Manage Reputation', link: '#' }
      ]
    }
  ]
};

const { footer_links } = footer_data;

const Footer = ({ style_footer_el }) => {
  const { translations } = useLanguage();
  return (
    <>
      <footer
        className={`footer-shape ${style_footer_el && 'mt-80'}`}
        style={{ backgroundImage: `url(/assets/img/bg/footer.png)` }}
      >
        <div className='footer-area pt-150 pb-10'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-4 col-lg-6 col-md-8'>
                <div className='footer-widget mb-40'>
                  <div className='footer-text-black'>
                    <Image src={footer_logo} alt='theme-pure' />
                    <p className='pt-20'>{translations.home?.footer_intro}</p>
                  </div>
                  <div className='footer-social-black'>
                    <SocialLinks />
                  </div>
                </div>
              </div>
              {/* {footer_links.map((item, i) => (
                <div key={i} className='col-xl-2 col-lg-3 col-md-4'>
                  <div className='footer-widget-black mb-40'>
                    <h3>{item.title}</h3>
                    <ul>
                      {item.links.map((list, index) => (
                        <li key={index}>
                          <Link href={list.link}>{list.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </div>
        <div className='copyright-area'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-12 '>
                <div className='copyright-black text-center'>
                  <p>
                    {' '}
                    <CopyRight />{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
