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
import scrollDepth from './helpers/scrolldepth';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  document.body.addEventListener('click', (e) => {
    const target = e.target;
    // console.log(target);
    const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);

    const gaEventTriggerConditions = (classToCheck, classToCheckmobile, innerString) => {
      return (
        (targetMatched(`.${classToCheck}`) &&
          target.closest(`.${classToCheck}`).getElementsByTagName('span')[0].innerText == innerString) ||
        (targetMatched(`.${classToCheckmobile}`) &&
          target.closest(`.${classToCheckmobile}`).getElementsByTagName('span')[0].innerText == innerString)
      );
    };
    //const test = gaEventTriggerConditions('css-uvst04', 'css-1al32y9', 'Resources');

    if (gaEventTriggerConditions('css-1ks30qh', 'css-1bwxyks', 'Sign up')) {
      fireEvent('Interacts with Sign up in header');
    }
    if (gaEventTriggerConditions('css-1ks30qh', 'css-1bwxyks', "S'inscrire")) {
      fireEvent('Interacts with Sign up in header');
    }
    if (gaEventTriggerConditions('css-1ks30qh', 'css-1bwxyks', 'Demo Vereinbaren')) {
      fireEvent('Interacts with Sign up in header');
    }
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

  const convigData = VARIATION == 1 ? ctaConfigV1 : ctaConfigV2;

  const init = (convigData) => {
    console.log('We are in', ID);
    const parentContainer =
      location.pathname.indexOf('/fr') !== -1 || location.pathname.indexOf('/de') !== -1
        ? document.querySelectorAll('.css-1qj4sqh')[0]
        : document.querySelectorAll('.css-1qj4sqh')[0];
    console.log(`${parentContainer ? 'anchor found' : 'no anchor'}`);

    const intersectionAnchor = document.querySelector('[data-testid="heroSlice"]');
    const currentPath = location.pathname;

    const currentCtaData = convigData.filter((item) => item.landingUrl.indexOf(currentPath) !== -1);
    console.log(currentCtaData);
    if (currentCtaData.length <= 0) {
      return;
    }
    console.log(parentContainer);

    parentContainer.style.position = 'relative';

    calcCta(ID, parentContainer, currentCtaData, fireEvent);

    const intersectionCallback = (entry) => {
      const goalCalc = document.querySelector(`.${ID}__goalcalc-container`);

      if (!entry.isIntersecting) {
        goalCalc.classList.add(`${ID}__fixed`);
      } else {
        goalCalc.classList.remove(`${ID}__fixed`);
      }
    };
    const intersectionObsOptions = {
      threshold: 0,
      rootMargin: '50px',
    };
    obsIntersection(intersectionAnchor, intersectionObsOptions, intersectionCallback);
  };
  setTimeout(() => {
    setup();
    scrollDepth(fireEvent);
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
