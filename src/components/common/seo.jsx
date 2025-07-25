import Head from "next/head";

const SEO = ({ sdata }) => {
  const pageTitle = sdata && sdata.page && sdata.page.title ? sdata.page.title : "Default Title";
  const pageSlogan = sdata && sdata.common && sdata.common.slogan ? sdata.common.slogan : "Default Slogan";
  const pageDescription = sdata && sdata.common && sdata.common.description ? sdata.common.description : "Default Description";

  return (
    <>
      <Head>
        <title>{`${pageTitle} - ${pageSlogan}`}</title>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="noindex, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" href="/favicon.png" />
      </Head>
    </>
  );
};

export default SEO;
