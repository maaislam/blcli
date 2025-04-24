/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../utilities';
import shared from '../utilities/shared';
import menuData from './data';
import handleMouseInOut from './handleMouseInOut';
import renderNav from './renderNewNav';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  const burgerMenu = document.querySelector('.menu-item.menu-top-toggle');
  const controlNav = document.querySelectorAll('nav');

  burgerMenu.addEventListener('click', (e) => {
    if (e.target.closest('.menu-item').firstElementChild.classList.contains('x')) {
      fireEvent('Customer opened the burger menu');
    }
  });

  controlNav[1].querySelectorAll('#menu-main-nav-1>li').forEach((item) => {
    item.addEventListener('mouseenter', (e) => {
      fireEvent(`Customer has hovered over the menu option ${e.target.firstElementChild.innerText}.`);
    });
  });

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

  //hide control nav bar

  controlNav[1].classList.add(`${ID}__control--nav`);
  //place new Nav
  renderNav(menuData);

  document.querySelectorAll(`.${ID}__nav-container`).forEach((item) => {
    item.style.display = 'flex';
  });

  //manage mouse In & out
  handleMouseInOut(fireEvent);

  //tracking
  controlNav[1].querySelectorAll('.primary__list').forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.target.matches('a.primary__list-item--title')) {
        fireEvent(`Customer has clicked the top navigation item ${e.target.innerText}`);
      } else if (e.target.closest('.secondary__list-item')) {
        fireEvent(
          `Customer has clicked the secondary navigation item ${
            e.target.closest('.secondary__list-item').querySelector('.HH077a__title').innerText
          }`
        );
      }
    });
  });
};
