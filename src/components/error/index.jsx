import Header from '@/src/layout/headers/header';
import React from 'react';
import Breadcrumb from '../common/breadcrumb/breadcrumb';
import ErrorArea from './error-area';
import Footer from '@/src/layout/footers/footer';

const Error = () => {
  return (
    <>
      <Header />
      <main>
        {/* <Breadcrumb top_title="404 Error Page"  title="404 Error"/> */}
        <ErrorArea />
      </main>
      <Footer />
    </>
  );
};

export default Error;
