/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import popup from './components/popup';
import reopenTab from './components/reopenTab';
import { popupData } from './data';
import obsIntersection from './helpers/observeIntersection';
import observeDOM from './helpers/observerDOM';
import scrollDepth from './helpers/scrollDepth';
import { invalidUrls } from './helpers/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();
  fireEvent('Test Code Fired');
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

    const closeBtnSelector = `.${ID}__close-icon`;
    const savetimeBtnSelector = `.${ID}__reopen-tab`;
    if (targetMatched(closeBtnSelector) || target.matches(`.${ID}__overlay`)) {
      document.querySelector(savetimeBtnSelector).classList.remove(`${ID}__hide`);
      document.querySelector(`.${ID}__popup`).classList.add(`${ID}__fade-out-bck`);
      setTimeout(() => {
        document.querySelector(`.${ID}__overlay`).classList.add(`${ID}__hide`);
      }, 700);
      if (target.matches(`.${ID}__overlay`)) {
        fireEvent('Clicked outside popup to close popup');
      } else {
        fireEvent('Interacts with X');
      }
    } else if (targetMatched(savetimeBtnSelector)) {
      document.querySelector(savetimeBtnSelector).classList.add(`${ID}__hide`);
      // document.querySelector(`.${ID}__popup`).classList.remove(`${ID}__hide`);
      document.querySelector(`.${ID}__overlay`).classList.remove(`${ID}__hide`);
      document.querySelector(`.${ID}__popup`).classList.remove(`${ID}__fade-out-bck`);
      fireEvent('User interacts with tab');
    } else if (gaEventTriggerConditions('css-uvst04', 'css-1al32y9', 'Resources')) {
      fireEvent('Interacts with resources');
    } else if (targetMatched('.css-82sp25') || targetMatched('[aria-labelledby="mobilePrimaryNavigation"] .css-u5fmlx')) {
      fireEvent('Interacts with pricing');
    } else if (gaEventTriggerConditions('css-1xur3gc', 'css-1al32y9', 'Partners')) {
      fireEvent('Interacts with Partners');
    } else if (gaEventTriggerConditions('css-uvst04', 'css-1al32y9', 'Why GoCardless?')) {
      fireEvent('Interacts with Why GoCardless');
    } else if (gaEventTriggerConditions('css-uvst04', 'css-1al32y9', 'Product')) {
      fireEvent('Interacts with Product');
    } else if (gaEventTriggerConditions('css-1ks30qh', 'css-1bwxyks', 'Sign up')) {
      fireEvent('Interacts with Sign up in header');
    }
  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    let timer0;
    timer0 = setTimeout(() => {
      const intersectionAnchor = document.querySelector('.css-1lhp3fc') || document.querySelector('.css-nyg3r3>div:first-child');

      const intersectionCallback = (entry) => {
        if (!entry.isIntersecting && !document.body.classList.contains(`${ID}__conditions-met`)) {
          document.body.classList.add(`${ID}__conditions-met`);

          fireEvent('Conditions Met', true);
        }
      };
      obsIntersection(intersectionAnchor, 0.1, intersectionCallback);
    }, 10000);
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------

  // ...

  const convigData = popupData;

  const init = (configData) => {
    const parentContainer = document.querySelector('body');

    const intersectionAnchor = document.querySelector('.css-1lhp3fc') || document.querySelector('.css-nyg3r3>div:first-child');

    parentContainer.style.position = 'relative';
    parentContainer.style.overflowX = 'hidden';

    popup(ID, parentContainer, configData, fireEvent);
    reopenTab(ID, parentContainer);

    const intersectionCallback = (entry) => {
      const popupOverlay = document.querySelector(`.${ID}__overlay`);
      const reopenTab = document.querySelector(`.${ID}__reopen-tab`);
      // console.log(entry);
      if (!entry.isIntersecting && popupOverlay && reopenTab.classList.contains(`${ID}__hide`)) {
        popupOverlay.classList.remove(`${ID}__hide`);
        document.querySelector(`.${ID}__popup`).classList.remove(`${ID}__fade-out-bck`);
        document.body.classList.add(`${ID}__conditions-met`);
        fireEvent('Conditions Met', true);
        scrollDepth(fireEvent);
      } else if (entry.isIntersecting) {
        reopenTab.classList.remove('adjuste-position');
      } else if (!entry.isIntersecting && popupOverlay.classList.contains(`${ID}__hide`) && reopenTab) {
        reopenTab.classList.add('adjuste-position');
      }
    };
    obsIntersection(intersectionAnchor, 0.1, intersectionCallback);
  };
  let timer0;
  timer0 = setTimeout(() => {
    if (location.href.indexOf('/en-us/guides/') !== -1 || (location.href.indexOf('/en-us/blog/') !== -1 && !invalidUrls())) {
      init(convigData);
    }
  }, 10000);

  let oldHref = location.href;
  const callbackFn = (mutations) => {
    const newHref = location.href;

    //const landingUrls = convigData.map((url) => url.landingUrl);
    let timer1;
    if (
      newHref !== oldHref &&
      !document.querySelector(`.${ID}__overlay`) &&
      (newHref.indexOf('/en-us/guides/') !== -1 || location.href.indexOf('/en-us/blog/') !== -1)
    ) {
      clearTimeout(timer0);
      oldHref = document.location.href;
      timer1 = setTimeout(() => {
        //  console.log('test2');
        init(convigData);
      }, 10000);
    } else if (
      newHref !== oldHref &&
      document.querySelector(`.${ID}__overlay`) &&
      newHref.indexOf('/en-us/guides/') === -1 &&
      !invalidUrls()
    ) {
      // console.log('test3');
      clearTimeout(timer1);
      clearTimeout(timer0);
      document.querySelector(`.${ID}__overlay`)?.remove();
      document.querySelector(`.${ID}__reopen-tab`)?.remove();
    }
  };

  observeDOM('body', callbackFn);
};
