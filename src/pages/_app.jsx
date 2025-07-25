import { Roboto_Mono } from 'next/font/google';
import '@/src/styles/index.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { LanguageProvider } from '../context/LanguageContext';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: '400',
  display: 'swap'
});

if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap');
}

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <main className={robotoMono.className}>
        <Component {...pageProps} />
        <ToastContainer />
      </main>
    </LanguageProvider>
  );
}
