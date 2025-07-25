import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import useMenuData from './menu-data';

const MobileMenus = () => {
  const { menu_data } = useMenuData();
  const [toggle, setToggle] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setToggle(false);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggle]);

  // Close menu when clicking on link
  const handleLinkClick = () => {
    setToggle(false);
  };

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setToggle(!toggle)}
        className={`meanmenu-reveal ${toggle ? 'meanclose' : ''}`}
        style={{
          position: 'absolute',
          right: '0px',
          top: '0px',
          textAlign: 'center',
          fontSize: '18px',
          background: 'transparent',
          border: '1px solid #444',
          color: '#444',
          cursor: 'pointer',
          padding: '8px 9px',
          width: '40px',
          height: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '1000'
        }}
        aria-label={toggle ? 'Close menu' : 'Open menu'}
      >
        {toggle ? (
          <span style={{ fontSize: '20px', lineHeight: '1' }}>✕</span>
        ) : (
          <>
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '2px',
                backgroundColor: '#444',
                margin: '2px 0',
                transition: '0.3s'
              }}
            ></span>
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '2px',
                backgroundColor: '#444',
                margin: '2px 0',
                transition: '0.3s'
              }}
            ></span>
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '2px',
                backgroundColor: '#444',
                margin: '2px 0',
                transition: '0.3s'
              }}
            ></span>
          </>
        )}
      </button>

      {toggle && (
        <nav
          className='mean-nav'
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            backgroundColor: '#0c1923',
            zIndex: '999',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '0 0 8px 8px'
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              margin: '0',
              padding: '0'
            }}
          >
            {menu_data?.map((menu, i) => (
              <li
                key={i}
                style={{
                  borderBottom: i < menu_data.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}
              >
                <Link
                  href={menu.link}
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '15px 20px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'background-color 0.3s',
                    borderRadius: i === menu_data.length - 1 ? '0 0 8px 8px' : '0'
                  }}
                  onMouseEnter={e => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default MobileMenus;
