import ScrollToTop from '../hooks/scroll-to-top';

const Wrapper = ({ children }) => {
  return (
    <>
      {children}
      <ScrollToTop />
    </>
  );
};

export default Wrapper;
