import useLanguage from '../../hooks/useLanguage';

const useMenuData = () => {
  const { translations } = useLanguage();
  const menu_data = [
    {
      id: 1,
      mega_menu: false,
      has_dropdown: true,
      has_children: false,
      title: translations?.menu?.home || 'Home',
      link: '/'
    },
    {
      id: 2,
      mega_menu: false,
      has_dropdown: true,
      has_children: false,
      title: translations?.menu?.about || 'About Us',
      link: '/about'
    },
    {
      id: 3,
      mega_menu: false,
      has_dropdown: true,
      has_children: false,
      title: translations?.menu?.contact || 'Contact Us',
      link: '/contact'
    }
  ];

  return { menu_data };
};
export default useMenuData;
