import React from 'react';
import SplashScreen from './SplashScreen';
import useLanguage from '../../hooks/useLanguage';

const withSplashScreen = (WrappedComponent) => {
  return (props) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const { translations } = useLanguage();

    React.useEffect(() => {
      const intervalId = setInterval(() => {
        if (translations && Object.keys(translations).length > 0) {
          setIsLoaded(true);
          clearInterval(intervalId);
        }
      }, 100);
      return () => clearInterval(intervalId);
    }, [translations]);

    return isLoaded ? <WrappedComponent {...props} /> : <SplashScreen />;
  };
};

export default withSplashScreen;