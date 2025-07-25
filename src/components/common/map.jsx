import React from 'react';

const ContactMap = () => {
  return (
    <>
      <div className='contact-map'>
        <div id='contact-map'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d340.46216310373615!2d106.63408641188202!3d10.794478917023861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zODJBIC0gODJCIETDom4gVOG7mWMsIFAuVMOibiBTxqFuIE5ow6w!5e0!3m2!1sen!2ssg!4v1753424606399!5m2!1sen!2ssg'
            width='100%'
            height='100%'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactMap;
