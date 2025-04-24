/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { conditionMetFireEvent } from './helpers/conditionMetFireEvent';
import clickHandler from './helpers/clickHandler';
// import obsIntersection from './helpers/observeIntersection';
import { credit_account, getCustomerLocation, getItemData, isPDP, isPLP } from './helpers/utils';
import { random } from 'lodash';

const { ID, VARIATION } = shared;
const DOM_RERENDER_DELAY = 4000;

const init = () => {
  // Experiment Code...
  setup();

  //run only in PDP
  const locationData = getCustomerLocation();
  const creditAccount = window.dataLayer.find((item) => item.loggedInType === 'ACC');
  if ((!isPLP() || !locationData) && (!isPDP() || !locationData)) return;

  //console.log("TP252 Ongoing...")
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  if (isPLP() && creditAccount != undefined) {
    pollerLite([`[data-test-id="product"]`], () => {
      const prodCards = document.querySelectorAll('[data-test-id="product"]');

      prodCards.length > 0 &&
        prodCards.forEach((item) => {
          const anchorElem = item.querySelector('[data-test-id="add-to-collection-btn"] span');
          if (VARIATION !== 'control') {
            anchorElem && anchorElem.innerText === 'Collection' ? (anchorElem.innerText = 'Reserve Stock') : '';
            anchorElem && anchorElem.innerText === 'Reserve Stock' ? anchorElem.classList.add(`${ID}__reserve_stock_btn`) : '';

            const stockLevel = item.querySelector(`[data-test-id="collection-availability-message"] span`);
            const renderDom = `<span class="${ID}__stock_level_msg"> </br>for collection</br></span>`;
            item.querySelector(`[data-test-id="add-to-collection-btn"]`).hasAttribute('disabled')
              ? ''
              : stockLevel.insertAdjacentHTML('beforeend', renderDom);
          }
          conditionMetFireEvent(item.querySelector(`[data-test-id="add-to-collection-btn"]`), `${ID}`);
        });
    });
  } else if (isPDP()) {
    const anchorElem = document.querySelector('[data-test-id="add-to-collection-btn"] span');
    if (VARIATION !== 'control') {
      anchorElem && anchorElem.innerText === 'Collection' ? (anchorElem.innerText = 'Reserve Stock') : '';
      anchorElem && anchorElem.innerText === 'Reserve Stock' ? anchorElem.classList.add(`${ID}__reserve_stock_btn`) : '';

      const stockLevel = document.querySelector(`[data-test-id="collection-availability-message"] span`);
      const renderDom = `<span class='${ID}__forCollection'> </br>for collection</span>`;

      document.querySelector(`.${ID}__forCollection`)?.remove();
      //add for collection msg only if stock level is available
      document.querySelector(`[data-test-id="add-to-collection-btn"]`).hasAttribute('disabled')
        ? ''
        : stockLevel.insertAdjacentHTML('beforeend', renderDom);
    }
    conditionMetFireEvent(anchorElem, `${ID}`);
  }
};

export default () => {
  //setup('Experimentation', `TravisPerkins - ${ID}`, shared);
  //setTimeout(init, DOM_RERENDER_DELAY);
  //Poll and re-run init
  pollerLite(
    [
      '#app-container',
      '[data-test-id="collection-availability-message"] span',
      () => !document.querySelector(`[data-test-id="collection-availability-message"] span`).innerText.includes('Loading'),
    ],
    () => {
      setTimeout(init, DOM_RERENDER_DELAY);
      const appContainer = document.querySelector('#app-container');
      let oldLocation = JSON.stringify(getCustomerLocation());
      let oldProductInfo = JSON.stringify(getItemData());
      let oldHref = window.location.href;

      const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
          //console.log(mutation);
          if (
            oldLocation !== JSON.stringify(getCustomerLocation()) ||
            oldProductInfo !== JSON.stringify(getItemData()) ||
            oldHref !== window.location.href
          ) {
            oldLocation = JSON.stringify(getCustomerLocation());
            oldProductInfo = JSON.stringify(getItemData());
            oldHref = window.location.href;

            setTimeout(init, DOM_RERENDER_DELAY);
          }
        });
      });

      const config = {
        childList: true,
        subtree: true,
        characterData: true,
      };

      appContainer.addEventListener('click', ({ target }) => {
        clickHandler(target, fireEvent, shared);
      });

      observer.observe(document.body, config);
    }
  );
};
