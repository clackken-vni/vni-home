import React from 'react';
import SEO from '../components/common/seo';
import Wrapper from '../layout/wrapper';
import Home from '../components/homes/home';
import withSplashScreen from '../components/common/withSplashScreen';
import useLanguage from '../hooks/useLanguage';

const Index = () => {
  const { translations } = useLanguage();
  
  const sdata = {
    page: translations?.home || {},
    common: translations?.common || {},
  };

  return (
    <Wrapper>
      <SEO sdata={sdata} />
      <Home />
    </Wrapper>
  );
};

export default withSplashScreen(Index);