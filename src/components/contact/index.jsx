import Header from '@/src/layout/headers/header';
import Breadcrumb from '../common/breadcrumb/breadcrumb';
import ContactMinimalFormArea from './contact-minimal-form-area';
import ContactMap from '../common/map';
import Footer from '@/src/layout/footers/footer';
import SEO from '../common/seo';
import bg from '@assets/img/bg/bg-contact-us.png';
import useLanguage from '@/src/hooks/useLanguage';

const ContactMinimal = () => {
  const { translations } = useLanguage();
  const sdata = {
    page: translations?.contact || {},
    common: translations?.common || {}
  };
  return (
    <>
      <SEO sdata={sdata} />
      <Header />
      <main>
        <Breadcrumb top_title='' title='' bg={bg} />
        <ContactMinimalFormArea />
        <ContactMap />
      </main>
      <Footer home_2={true} />
    </>
  );
};

export default ContactMinimal;
