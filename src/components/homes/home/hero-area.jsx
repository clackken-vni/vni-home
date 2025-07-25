import React, { useState } from 'react';
import Image from 'next/image';

const HeroArea = ({ header, description, hero_bg, hero_img_item }) => {
  return (
    <>
      <section
        className='slider-area fix'
        style={{
          backgroundImage: `url(${hero_bg.src})`,
          backgroundPosition: 'right',
          backgroundSize: 'auto', // options: 'cover', 'contain', 'auto', '<length>', '<percentage>'
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className='shape-slider'>
          <span className='shape shape-circle shape-c5-1 '></span>
          <span className='shape shape-circle shape-c6-2 '></span>
          <span className='shape shape-circle shape-c5-3 shape-c6-3 '></span>
        </div>
        {/* <Image
          className='img-shape main-image-shape wow fadeInRight animated'
          src={hero_bg}
          alt=''
          data-wow-duration='2s'
          data-wow-delay='2s'
        /> */}
        <div className='single-slider slider-height-3 slider-height-6-1 pt-230'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-6 col-lg-6'>
                <div className='slider-text slider-text-3 pt-60'>
                  <h2 className='wow fadeInUp animated' data-wow-delay='0.4s'>
                    {header}
                  </h2>
                  <p className='wow fadeInUp animated' data-wow-delay='0.9s'>
                    {description}
                  </p>
                </div>
              </div>
              <div className='col-xl-6 col-lg-6'>
                <div
                  className='slider-img slider-img-6 wow fadeInRight animated'
                  data-wow-duration='2.5s'
                  data-wow-delay='3.5s'
                >
                  <Image src={hero_img_item} alt='theme-pure' className='hero_img_item' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroArea;
