/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import renderBanner from './components/newBanner';
import renderShadeSelector from './components/shadeSelector';
//import reRenderDOM from './components/reRender';
import rePositionTopRow from './components/setScrollEvent';
import applyDiscount from './components/applyDiscount';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');
  const checkoutPage = location.pathname.includes('checkouts');

  if (!checkoutPage) {
    document.querySelector(`#MainContent`).addEventListener('click', (e) => {
      if (e.target.classList.contains('klevuFilterOption') && e.target.closest('[data-filter="category"]')) {
        fireEvent(`customer clicked ${e.target.getAttribute('data-value')} in category links`);
      }
    });

    document.querySelectorAll('.current-swatch').forEach((item) => {
      item.addEventListener('click', (e) => {
        const swatchExpanded = e.target
          .closest('.product-swatch-dropdown')
          .querySelector('.product-swatch-listing')
          .classList.contains('active');

        swatchExpanded && fireEvent(`Customer clicked to expand shades`);
      });
    });
    document.querySelectorAll('.swatch-image').forEach((item) => {
      item.addEventListener('click', (e) => {
        fireEvent('Customer clicks to add a shade to basket');
      });
    });
  }
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

  if (location.pathname.includes('checkouts')) {
    applyDiscount('samples');
  } else {
    const initMain = () => {
      document.body.addEventListener('click', (e) => {
        const cartDropdown = e.target.closest('.AV095-pg-header__cart');

        if (cartDropdown && !e.target.closest(`.AV095__cart--dropdown`)) {
          if (document.querySelectorAll('.AV095__cart--dropdown')[1].classList.contains('AV095-hide')) {
            fireEvent('Customer clicked to view summary');
          }

          cartDropdown.querySelectorAll('.start-hidden').forEach((item) => {
            item.classList.toggle(`${ID}-hide`);
          });
          cartDropdown.getElementsByTagName('span')[1].classList.toggle(`${ID}-hide`);
        } else if (!cartDropdown) {
          document.querySelectorAll('.AV095-pg-header__cart').forEach((item) => {
            item.getElementsByTagName('span')[1]?.classList.remove(`${ID}-hide`);
            item.getElementsByTagName('span')[2]?.classList.add(`${ID}-hide`);
          });

          document.querySelectorAll('.AV095__cart--dropdown').forEach((item, i) => {
            item.classList.add('AV095-hide');
          });
        } else if (e.target.closest('.AV095__btn--remove')) {
          fireEvent('Customer clicks to delete a sample from the summary View');
        }
      });

      document.querySelectorAll('header').forEach((item) => {
        item.classList.add(`${ID}`);
      });

      //hide stuff
      document.querySelectorAll('aside.collection-sidebar').forEach((item) => {
        item.classList.add(`${ID}__sidebar`);
      });
      document.querySelectorAll('#collection-main').forEach((item) => {
        item.classList.add(`${ID}__collection-main`);
      });
      renderShadeSelector();
      //reRenderDOM();
      renderBanner(ID);
      rePositionTopRow(130);
    };
    initMain();

    document.body.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('klevuPaginate')) {
        document.querySelector('#MainContent').style.opacity = 0;
        setTimeout(() => {
          initMain();
          document.querySelector('#MainContent').style.opacity = 1;
        }, 2000);
      }
    });
  }
};
