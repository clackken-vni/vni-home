import Header from '@/src/layout/headers/header';
import React from 'react';
import Breadcrumb from '../common/breadcrumb/breadcrumb';
import ServiceArea from '../homes/home/service-area';
import HIWArea from '../homes/home/hiw-area';
import BrandArea from '../about/brand-area';
import Footer from '@/src/layout/footers/footer';
import useLanguage from '@/src/hooks/useLanguage';
import SEO from '../common/seo';
import AboutUs from './about-us';
import OurService from './our-service';

const About = () => {
  const { translations } = useLanguage();
  const sdata = {
    page: translations?.about || {},
    common: translations?.common || {}
  };
  return (
    <>
      <SEO sdata={sdata} />
      <Header />
      <main>
        {/* <Breadcrumb
          home_title={translations.breadcrumb?.home.title || 'Home'}
          title={translations.breadcrumb?.about?.title || 'About Us'}
          top_title={translations.breadcrumb?.about?.title || 'About Us'}
          descriptions={translations.breadcrumb?.about?.description || ''}
        /> */}
        <AboutUs />
        {/* <OurService /> */}
        {/* <BrandArea /> */}
        <Footer />
      </main>
    </>
  );
};

export default About;
