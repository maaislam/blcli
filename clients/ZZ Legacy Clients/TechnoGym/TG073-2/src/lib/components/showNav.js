export default () => {
  const businessNav = document.querySelector('.menu-item.level-0.navbar_section.business_section');
  if (localStorage.getItem('TG073.2-business')) {
    businessNav.classList.add('TG073-2-active');
  } else {
    businessNav.classList.remove('TG073-2-active');
  }
};
