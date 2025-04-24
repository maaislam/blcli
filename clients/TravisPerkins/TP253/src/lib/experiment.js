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
import { getCustomerLocation, getItemData, isPDP, isPLP } from './helpers/utils';
import alertMsg from './components/alertMsg';

const { ID, VARIATION } = shared;
const DOM_RERENDER_DELAY = 1000;

const init = () => {
  // Experiment Code...
  setup();

  //run only in PDP
  const locationData = getCustomerLocation();
  //console.log(locationData, "locationData")
  const creditAccount = window.dataLayer.find((item) => item.loggedInType === 'ACC');
  if ((!isPLP() || !locationData) && (!isPDP() || !locationData)) return;

  //console.log("TP253 Ongoing...")
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

  if (isPLP() && creditAccount !== undefined) {
    pollerLite([`[data-test-id="product"]`], () => {
      const prodCards = document.querySelectorAll('[data-test-id="product"]');

      prodCards.length > 0 &&
        prodCards.forEach((item, index) => {
          const anchorElem = item.querySelector(`[data-test-id="collection-availability-message"] span`);
          if (VARIATION !== 'control') {
            pollerLite(
              [
                () => anchorElem.textContent != 'Loading...',
                () => !item.querySelector(`[data-test-id="add-to-collection-btn"]`).hasAttribute('disabled'),
              ],
              () => {
                const getStockLevel = anchorElem.textContent.split(' ')[0];
                getStockLevel <= 10 ? (anchorElem.textContent = `Only ${getStockLevel} left. Reserve your stock online`) : '';
                getStockLevel <= 10 ? anchorElem.classList.add(`${ID}__stock_alert`) : '';
                getStockLevel <= 10
                  ? item.querySelector(`[data-test-id="collection-availability-message"]`).setAttribute('low_stock', '')
                  : '';
              }
            );
          }
          conditionMetFireEvent(item.querySelector(`[data-test-id="add-to-collection-btn"]`), `${ID}`);
        });
    });
  } else if (isPDP() && creditAccount != undefined) {
    const anchorElem = document.querySelector(`[data-test-id="collection-availability-message"] span`);
    if (VARIATION !== 'control') {
      pollerLite(
        [
          () => anchorElem.textContent != 'Loading...',
          () => !document.querySelector(`[data-test-id="add-to-collection-btn"]`).hasAttribute('disabled'),
        ],
        () => {
          const getStockLevel = anchorElem.textContent.split(' ')[0];
          getStockLevel <= 10
            ? document.querySelector(`[data-test-id="order-btn"]`).insertAdjacentHTML('beforeend', alertMsg())
            : '';
        }
      );
    }
    conditionMetFireEvent(anchorElem, `${ID}`);
  }
};

export default () => {
  //setup('Experimentation', `TravisPerkins - ${ID}`, shared);
  setTimeout(init, DOM_RERENDER_DELAY);
  //Poll and re-run init
  pollerLite(['#app-container'], () => {
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

          setTimeout(init, 1000);
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
  });
};
