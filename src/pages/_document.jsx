import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const language = typeof window !== 'undefined' ? localStorage.getItem('language') || 'vi' : 'vi';

  return (
    <Html lang={language}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Rubik:300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
