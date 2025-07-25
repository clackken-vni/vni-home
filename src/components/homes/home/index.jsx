import Header from '@/src/layout/headers/header';
import React from 'react';
import HeroAreaRight from './hero-area';
import HeroAreaLeft from './hero-area-2';
// import ServiceArea from './service-area';
// import HIWArea from './hiw-area';
// import Brand from './brand';
// import HIWAreaTwo from './hiw-area-2';
// import TestimonialArea from './testimonial-area';
// import PricingAreaHomeSix from './pricing-area-home-6';
// import LatestNewsArea from './latest-news-area';
import Footer from '@/src/layout/footers/footer';

import hero_bg_right from '@assets/img/slider/hero-bg-right.png';
import hero_bg_left from '@assets/img/slider/hero-bg-left.png';

import hero_building from '@assets/img/slider/hero-building.png';
import hero_statistics from '@assets/img/slider/hero-statistic.png';
import hero_it from '@assets/img/slider/hero-it.png';
import hero_training from '@assets/img/slider/hero-training.png';

import useLanguage from '@/src/hooks/useLanguage';

const HomeSix = () => {
  const { translations, isLoading } = useLanguage();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <main>
        {/* <ServiceArea /> */}
        <HeroAreaRight
          header={translations.home?.hero_are_build?.header}
          description={translations.home?.hero_are_build?.description}
          hero_bg={hero_bg_right}
          hero_img_item={hero_building}
        />
        <HeroAreaLeft
          header={translations.home?.hero_are_statistics?.header}
          description={translations.home?.hero_are_statistics?.description}
          hero_bg={hero_bg_left}
          hero_img_item={hero_statistics}
        />
        <HeroAreaRight
          header={translations.home?.hero_are_it?.header}
          description={translations.home?.hero_are_it?.description}
          hero_bg={hero_bg_right}
          hero_img_item={hero_it}
        />
        <HeroAreaLeft
          header={translations.home?.hero_are_training?.header}
          description={translations.home?.hero_are_training?.description}
          hero_bg={hero_bg_left}
          hero_img_item={hero_training}
        />
        {/* <HIWArea /> */}
        {/* <Brand style={true} /> */}
        {/* <HIWAreaTwo /> */}
        {/* <TestimonialArea /> */}
        {/* <PricingAreaHomeSix /> */}
        {/* <LatestNewsArea /> */}
      </main>
      <Footer />
    </>
  );
};

export default HomeSix;
