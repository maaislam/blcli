/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import renderUspContent from './components/uspProposition';
import observeDOM from './helper/observerDOM';
import obsIntersection from './helper/observeIntersection';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION === 'control') {
    const intersectionCallback = (entry, observer) => {
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        console.log('seen review section');
        fireEvent('customer has scrolled to the reviews');
        observer.disconnect();
      }
    };
    const target = document.querySelector(`.yotpo-nav-content`);

    obsIntersection(target, 0.1, intersectionCallback);
  } else {
    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...

    document.querySelector('#MainContentWrapper').classList.add(`${ID}__MainContentWrapper`);

    const callbackFunction = (mutation) => {
      if (document.querySelectorAll(`.${ID}__last-point`).length === 0) {
        renderUspContent(ID);
        fireEvent('variation has Loaded');

        document.querySelector('nav>a[ng-href="/returns"]').addEventListener('click', () => {
          fireEvent('Customer clicked returns link');
        });

        const intersectionCallback = (entry, observer) => {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            console.log('seen new section');
            fireEvent('customer has scrolled to the new content area');
            observer.disconnect();
          }
        };
        const target = document.querySelector(`.${ID}__proposition-container`);

        obsIntersection(target, 0.6, intersectionCallback);
      }
    };

    observeDOM(`.${ID}__MainContentWrapper`, callbackFunction);
  }
};
