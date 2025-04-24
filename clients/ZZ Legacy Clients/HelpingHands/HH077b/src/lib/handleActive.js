const activeStateHandler = () => {
  const currentPath = location.pathname;

  const navDropdown = document.querySelector('#HH077b__main-nav');

  const activeMenuItem =
    navDropdown.querySelectorAll(`[href="${currentPath}"]`)[1] || navDropdown.querySelectorAll(`[href="${currentPath}"]`)[0];

  activeMenuItem?.classList.add('active-item');
  activeMenuItem?.closest('ul').classList.add('active-list');

  let triggerEvent = new Event('click');

  activeMenuItem?.closest('.HH077b__menu-item--lvl1').dispatchEvent(triggerEvent);
};

export default activeStateHandler;
