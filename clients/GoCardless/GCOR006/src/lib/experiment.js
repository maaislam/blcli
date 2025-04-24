/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import observeDOM from './helper/observerDOM';
import calcCta from './components/calcCTA';

import obsIntersection from './helper/observeIntersection';
import findMiddle from './helper/findMiddle';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  if (location.pathname === '/') {
    document.body.addEventListener('click', (e) => {
      if (e.target.closest('a[href="https://gocardless102.outgrow.us/valuecalculator/"]')) {
        fireEvent('customer clicked the Calculate impact CTA in homepage');
      }
    });
  }

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  //
  document.querySelector('body').classList.add(`${ID}__body`);
  let oldHref = document.location.href;

  const decideCTAUrl = () => {
    const usaUrl = 'https://gocardless102.outgrow.us/valuecalculator-og-us';
    const ukUrl = 'https://gocardless102.outgrow.us/valuecalculator-og-uk';

    if (location.href.indexOf('/en-us/') !== -1) {
      return usaUrl;
    } else {
      return ukUrl;
    }
  };
  const initMain = () => {
    const mainContainer = document.querySelector('main');
    const ctaContainerDesktop =
      mainContainer.querySelector('article')?.children[2] || mainContainer.querySelector('[data-testid="readNextSection"]');

    mainContainer.classList.add(`${ID}__main`);

    if (document.querySelectorAll(`.${ID}__roi--button`).length === 0 || oldHref !== location.href) {
      oldHref = document.location.href;
      setTimeout(() => {
        if (ctaContainerDesktop) {
          calcCta(ID, ctaContainerDesktop, decideCTAUrl, fireEvent);
          calcCta(ID, findMiddle(), decideCTAUrl, fireEvent, '-middle');
        }

        const intersectionCallback = (entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            console.log('intersection found');
            document.querySelector(`.${ID}__roi-container`).classList.add(`${ID}__hide`);
          } else {
            document.querySelector(`.${ID}__roi-container`).classList.remove(`${ID}__hide`);
          }
        };
        const target = document.querySelector('#publicationsShowcaseHeader')?.closest('div');

        obsIntersection(target, 0.6, intersectionCallback);
      }, 2000);
    }
  };
  initMain();

  const callbackFunction = (mutation) => {
    initMain();
  };

  observeDOM('#gatsby-focus-wrapper', callbackFunction);
};
