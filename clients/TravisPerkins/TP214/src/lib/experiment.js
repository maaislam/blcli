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

import skus from './data';
import timeValidity from './helpers/checkTimeValidity';
import skuValidity from './helpers/checkSkuValidity';

import renderDeliveryMsg from './components/renderDeliveryMsg';

const { ID, VARIATION } = shared;

const init = () => {
  const componentAlreadyExists = false;

  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...  var target = document.querySelector('#app-container');

  // create an observer instance
  var target = document.querySelector('#app-container');
  var observer = new MutationObserver((mutations) => {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType !== 3 &&
          (node.matches('[class^="CollectionBranchSelector__ListBlock"]') ||
            node.querySelectorAll('[class^="CollectionBranchSelector__ListBlock"]').length > 0)
        ) {
          const addressTitles =
            node.querySelectorAll('[data-test-id="branch-title"]') ||
            node.parentNode.querySelectorAll('[data-test-id="branch-title"]');

          addressTitles.forEach((title, i) => {
            if (title.innerText.toLowerCase() === 'kingswinford delivery & click & collect only') {
              const kingswinfordRow = title.closest('[data-test-id="branch-title-wrapper"]').parentNode;

              fireEvent(`Customer has seen Kingwinsford branch in the collection lightbox--${i}`);
              kingswinfordRow.addEventListener('click', () => {
                fireEvent(`Customer has clicked Kingwinsford branch in the collection lightbox--${i}`);
              });
              observer.disconnect();
            }
          });
        }
      });
    });
  });

  // configuration of the observer:
  var config = { attributes: false, childList: true, characterData: false, subtree: true };

  observer.observe(target, config);

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
  const persistStyleOnSelectChange = (mutation) => {
    const isPreviousElmWinford = mutation.previousSibling.innerText
      .toLowerCase()
      .includes('kingswinford delivery & click & collect only');
    if (isPreviousElmWinford) {
      mutation.previousSibling.parentNode.classList.add(`${ID}__greenbox`);
      renderDeliveryMsg(ID, timeValidity, skuValidity, mutation.previousSibling.parentNode, skus);
    }
  };

  var target1 = document.querySelector('#app-container');

  // create an observer instance
  var observer1 = new MutationObserver((mutations) => {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType !== 3 &&
          (node.matches('[class^="CollectionBranchSelector__ListBlock"]') ||
            node.querySelectorAll('[class^="CollectionBranchSelector__ListBlock"]').length > 0)
        ) {
          const addressTitles =
            node.querySelectorAll('[data-test-id="branch-title"]') ||
            node.parentNode.querySelectorAll('[data-test-id="branch-title"]');

          addressTitles.forEach((title) => {
            if (title.innerText.toLowerCase() === 'kingswinford delivery & click & collect only') {
              const kingswinfordRow = title.closest('[data-test-id="branch-title-wrapper"]').parentNode;
              kingswinfordRow.classList.add(`${ID}__greenbox`);
              renderDeliveryMsg(ID, timeValidity, skuValidity, kingswinfordRow, skus);
            }
          });
        } else if (node.nodeType !== 3 && node.matches('[class^="CollectionBranchSelector__SelectedBranchIcon"]')) {
          persistStyleOnSelectChange(mutation);
        }
      });
      mutation.removedNodes.length > 0 &&
        mutation.removedNodes.forEach((removedNode) => {
          if (removedNode.nodeType !== 3 && removedNode.matches('[class^="CollectionBranchSelector__SelectedBranchIcon"]')) {
            persistStyleOnSelectChange(mutation);
          }
        });
    });
  });

  // configuration of the observer:
  var config1 = { attributes: false, childList: true, characterData: false, subtree: true };

  observer1.observe(target1, config1);
};

export default () => {
  init();

  // Poll and re-run init
  // pollerLite(['#app-container'], () => {
  //   const appContainer = document.querySelector('#app-container');

  //   // ------------------------------------
  //   // Added Poller:
  //   // Checks for page changes and checks to see if the URL has changed
  //   // ------------------------------------
  //   let oldHref = document.location.href;
  //   const observer = new MutationObserver(function (mutations) {
  //     mutations.forEach(function (mutation) {
  //       if (oldHref != document.location.href) {
  //         oldHref = document.location.href;

  //         document.body.classList.remove(`${shared.ID}`);

  //         setTimeout(() => {
  //           // -----------------------------------
  //           // Timeout ensures router has started to rebuild DOM container
  //           // and we don't fire init() too early
  //           // -----------------------------------
  //           //init();
  //         }, 2000);
  //       }
  //     });
  //   });

  //   const config = {
  //     childList: true,
  //     subtree: true,
  //   };

  //   observer.observe(appContainer, config);
  // });
};
