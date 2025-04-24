import shared from '../../../../../../core-files/shared';
import { isMobile } from '../helpers/utils';

const accountPageHandler = () => {
  const { VARIATION } = shared;
  //fireEvent('User sees the my account page');

  if (VARIATION == 'control') {
    return;
  }

  if (!isMobile()) {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const myHomeserve = document.querySelector('.dropdown-menu > li:nth-child(1) > a');
    myHomeserve.childNodes[0].textContent = 'My HomeServe account';
    dropdownMenu.insertAdjacentHTML(
      'beforeend',
      '<li><a href="/uk/account/B2C-logout?logout=show">Logout<span class="caret"></span></a></li>'
    );
    return;
  }
  const caret = '<span class="caret"></span>';
  const firstMenuItem = document.querySelector('.navbar-nav > li:nth-child(1) > a');
  const secondMenuItem = document.querySelector('.navbar-nav > li:nth-child(2) > a');

  firstMenuItem.insertAdjacentHTML('beforeend', caret);
  secondMenuItem.insertAdjacentHTML('beforeend', caret);

  const manageAccountDropdown = document.querySelector('.navbar-nav li.dropdown');
  const submenus = document.querySelectorAll('.dropdown-menu > li');

  submenus.forEach((submenu) => {
    manageAccountDropdown.insertAdjacentElement('beforebegin', submenu);
  });
  manageAccountDropdown.style.display = 'none';
};

export default accountPageHandler;
