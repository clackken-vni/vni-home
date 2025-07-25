import Link from 'next/link';
import Image from 'next/image';

import breadcrumb_img_1 from '@assets/img/shape/shape2.png';
import breadcrumb_img_2 from '@assets/img/shape/shape3.png';
import breadcrumb_img_3 from '@assets/img/shape/shape-sq.png';
import breadcrumb_img_4 from '@assets/img/shape/shape-c-2.png';

const Breadcrumb = ({ home_title, title, top_title, descriptions, bg }) => {
  return (
    <>
      <div
        className='page-title-area pos-relative gray-bg pt-150 pb-120 fix'
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className='page-title-bar-overlay'></div>
        <div className='shape-slider'>
          <Image className='shape shape-2' src={breadcrumb_img_1} alt='theme-pure' />
          <Image className='shape shape-4' src={breadcrumb_img_2} alt='theme-pure' />
          <Image className='shape shape-5' src={breadcrumb_img_3} alt='theme-pure' />
          <Image className='shape shape-6' src={breadcrumb_img_4} alt='theme-pure' />
        </div>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <div className='page-title title-white-text mb-30 pos-relative'>
                <h3>{top_title}</h3>
                <p>{descriptions}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div
                className={`${
                  home_title != '' && title != '' ? 'breadcrumb-list' : ''
                } list-white text-left text-lg-end mb-30`}
              >
                <ul>
                  <li>
                    <Link href='/'>{home_title}</Link>
                  </li>
                  <li>{title}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
