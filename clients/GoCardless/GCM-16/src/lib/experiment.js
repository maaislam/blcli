/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import calcCta from './components/calcCTA';
import { ctaConfigV1, ctaConfigV2 } from './data';
import obsIntersection from './helpers/observeIntersection';
import observeDOM from './helpers/observerDOM';

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
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------

  // ...

  const convigData = VARIATION == 1 ? ctaConfigV1 : ctaConfigV2;

  const init = (convigData) => {
    const parentContainer = document.querySelectorAll('[data-testid="mediaAndInfoSlice"]');
    // location.pathname.indexOf('/es-es/') !== -1
    //   ? document.querySelectorAll('.css-16zg5j')
    //   : document.querySelectorAll('[data-testid="mediaAndInfoSlice"]');

    const intersectionAnchor = document.querySelector('[data-testid="heroSlice"]');
    const currentPath = location.pathname;

    const currentCtaData = convigData.filter((item) => item.landingUrl === currentPath);
    console.log(currentCtaData);

    if (currentCtaData.length <= 0) {
      return;
    }
    parentContainer[0].style.position = 'relative';

    calcCta(ID, parentContainer[0], currentCtaData, fireEvent);

    calcCta(ID, parentContainer[1], currentCtaData, fireEvent, '-middle');
    (function pollForElement() {
      if (parentContainer.length >= 2) {
        // console.log('found');
      } else {
        setTimeout(pollForElement, 25);
      }
    })();

    const intersectionCallback = (entry) => {
      const goalCalc = document.querySelector('.GCM-16__goalcalc-container');

      if (!entry.isIntersecting && goalCalc) {
        goalCalc.classList.add('GCM-16__fixed');
      } else {
        goalCalc.classList.remove('GCM-16__fixed');
      }
    };
    obsIntersection(intersectionAnchor, 0.1, intersectionCallback);
  };
  setTimeout(() => {
    init(convigData);
  }, 2000);

  let oldHref = location.href;
  const callbackFn = () => {
    const newHref = location.href;

    const landingUrls = convigData.map((url) => url.landingUrl);

    if (newHref !== oldHref || landingUrls.indexOf(location.pathname) !== -1) {
      setTimeout(() => {
        init(convigData);
      }, 2000);
    }
  };

  observeDOM('body', callbackFn);
};
