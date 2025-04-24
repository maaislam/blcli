/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import HeaderRestyle from './components/headerRestyle';
import Search from './components/search';
import HeaderSimple from './components/simpleHeader';
import { bagNotEmpty, reviewsSlider } from './helpers';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);

  // For V1 & 2
  if(VARIATION === '1' || VARIATION === '2') {
    new HeaderSimple();
  }

  if(VARIATION === '3') {
    new HeaderRestyle();
  }

  // for V1 & 3
  new Search();

  //for all
  bagNotEmpty();

  // if V1 & 2
  if(window.location.href.indexOf('/checkout/cart/') === -1) {
    reviewsSlider();
  }

  // rename desktop links
  if(VARIATION === '3') {
    pollerLite(['.nav-item.level0.nav-0.submenu-alignleft'], () => {
      const allDesktopNavLinks = document.querySelectorAll('.nav-item.level0.nav-0.submenu-alignleft');
      if(allDesktopNavLinks) {
        for (let index = 0; index < allDesktopNavLinks.length; index += 1) {
          const element = allDesktopNavLinks[index];
          if(element.querySelector('span').textContent === 'Shop by Category') {
            element.querySelector('span').textContent = 'Categories';
          }
          if(element.querySelector('span').textContent === 'Shop by Brand') {
            element.querySelector('span').textContent = 'Brands';
          }
        }
      }
    });
  }


  
};
