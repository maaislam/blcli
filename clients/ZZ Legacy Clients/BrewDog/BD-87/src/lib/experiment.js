/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

const map = {
  '/uk/punk-ipa-4-can': {
    4: true,
    24: '/uk/punk-ipa-24-x-can',
    48: '/uk/punk-ipa-48-can',
  },
  '/uk/lost-lager-4': {
    4: true,
    12: '/uk/lost-lager-12-can',
    24: '/uk/lost-lager-24-x-can',
    48: '/uk/lost-lager-48-x-can',
  },
  '/catalog/product/view/id/8812/s/hazy-jane-5/category/914/': {
    4: true,
    12: '/uk/hazy-jane-12-can',
    24: '/uk/hazy-jane-24',
    48: '/uk/hazy-jane-48',
  },
};

export default () => {
  setup();

  fireEvent('Activated');

  setTimeout(() => {
    const mapItems = Object.keys(map);
    const links = document.querySelectorAll('.header__menu .link');
    [].forEach.call(links, l => {
      if(mapItems.indexOf(l.pathname) > -1) {

        if(shared.VARIATION == 'control') {
          // ---------------------------
          // Show 4 items [control, this is the default number]
          // ---------------------------
          const mappedResult = map[l.pathname]['4'];
          if(mappedResult) {
            l.addEventListener('click', () => {
              fireEvent('Clicked Replaced Link - ' + l.innerText.trim());
            });
          }
        }

        if(shared.VARIATION == 1) {
          // Show 12 items
          const mappedResult = map[l.pathname]['12'];
          if(mappedResult) {
            l.href = mappedResult;

            l.addEventListener('click', () => {
              fireEvent('Clicked Replaced Link - ' + l.innerText.trim());
            });
          }
        }

        if(shared.VARIATION == 2) {
          // Show 24 items
          const mappedResult = map[l.pathname]['24'];
          if(mappedResult) {
            l.href = mappedResult;

            l.addEventListener('click', () => {
              fireEvent('Clicked Replaced Link - ' + l.innerText.trim());
            });
          }
        }

        if(shared.VARIATION == 3) {
          // Show 48 items
          const mappedResult = map[l.pathname]['48'];
          if(mappedResult) {
            l.href = mappedResult;

            l.addEventListener('click', () => {
              fireEvent('Clicked Replaced Link - ' + l.innerText.trim());
            });
          }
        }

      }

    });
  }, 4000);
};
