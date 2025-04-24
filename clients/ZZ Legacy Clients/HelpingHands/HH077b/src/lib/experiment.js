/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import renderMobNav from './renderMobNav';
import menuData from './data';
import clickHandler from './handleClick';
import activeStateHandler from './handleActive';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');
  const burgerMenu = document.querySelector('.menu-item.menu-top-toggle');

  burgerMenu.addEventListener('click', (e) => {
    if (e.target.closest('.menu-item').firstElementChild.classList.contains('x')) {
      fireEvent('Customer opened the burger menu');
    }
  });
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const mobNav = document.querySelectorAll('#main-nav')[0];
  const mobileItems = document.querySelector('#menu-main-nav');
  const menuTop = document.querySelector('.menu-top');

  menuTop.classList.add(`${ID}__menu-top`);
  mobNav.setAttribute('id', `${ID}__main-nav`);
  mobNav.classList.add(`${ID}__main-nav`, `${ID}__hide`);
  mobileItems.classList.add(`${ID}__mobile--navitems`);

  //overlay
  const menuOverlay = document.createElement('div');
  menuOverlay.classList.add(`${ID}__menu-overlay`, `${ID}__hide`);

  mobNav.insertAdjacentElement('afterend', menuOverlay);

  renderMobNav(menuData);
  clickHandler(fireEvent);
  activeStateHandler();
  document.querySelectorAll(`nav`)[0].style.opacity = 1;
};
