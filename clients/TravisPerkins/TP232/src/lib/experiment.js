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
import { colorConfig } from './config';
import obsIntersection from './helpers/observeIntersection';

import { getCustomerLocation, isPDP } from './helpers/utils';

const { ID, VARIATION } = shared;

const init = (reEvaluate) => {
  // console.log(reEvaluate);
  // check if PDP

  //if (!isPDP() && !window.location.pathname.includes('/cart')) return;

  // Experiment Code...
  setup();

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  document.querySelector('[data-test-id="delivery-availability-message"]').classList.add(`${ID}__delivery-notice`);
  document.querySelector('[data-test-id="collection-availability-message"]').classList.add(`${ID}__collection-notice`);

  const deliveryNotices = [`.${ID}__delivery-notice`, '.TP204_notice'];
  const collectionNotice = document.querySelector(`.${ID}__collection-notice`);

  const userLocation = getCustomerLocation();
  const isVariantProd =
    document.querySelector('[class^="ProductVariantSelect"]>[data-test-id="selected-option"]') ||
    document.querySelector('[data-test-id="product-variants"]');

  const possibleVariations = [
    'Length',
    'Dimensions',
    'Width',
    'Height',
    'Pack quantity',
    'Colour',
    'Thickness',
    'Diameter',
    'Size',
  ];
  const variantNotSelected = () => {
    if (!isVariantProd) return false;
    const firstSelectCheck = possibleVariations.some((item) => isVariantProd?.innerText.indexOf(item) !== -1);
    const secondSelectCheck = ![...document.querySelectorAll('a[class^="ProductVariantSelect"]')].some(
      (item) => item.getAttribute('href') === location.pathname
    );
    return document.querySelector('[class^="PDPDesktop__PDP"]') ? firstSelectCheck : firstSelectCheck || secondSelectCheck;
  };

  const getCollectionStatus = () => {
    const DELIVERY_THRESHOLD = 20;
    const stockText = collectionNotice.hasAttribute('title')
      ? collectionNotice.getAttribute('title').match(/\d+/)
      : collectionNotice.innerText.match(/\d+/) || '0';
    const stockLevel = parseInt(stockText[0]);
    return stockLevel > DELIVERY_THRESHOLD ? 'greenAvailablity' : stockLevel == 0 ? 'unavailable' : 'orangeAvailability';
  };

  const collectionTrafficLight = () => {
    document.querySelectorAll(`.${ID}__collectionIcon`).forEach((item) => {
      item?.remove();
    });
    collectionNotice?.classList.remove(`${ID}__green`, `${ID}__red`, `${ID}__orange`);

    const collectionStatus = getCollectionStatus();

    if (!userLocation.collectionBranchId || (isVariantProd && variantNotSelected())) return;

    collectionNotice.classList.add(`${colorConfig.collectionColors[collectionStatus]}`);
    collectionNotice?.insertAdjacentHTML(
      'afterbegin',
      `<span class="${ID}__collectionIcon">${colorConfig.icon[collectionStatus]}</span>`
    );
  };
  const deliveryTrafficLight = () => {
    document.querySelectorAll(`.${ID}__deliveryIcon`).forEach((item) => {
      item?.remove();
    });
    deliveryNotices.forEach((deliveryNotice) => {
      document.querySelector(deliveryNotice)?.classList.remove(`${ID}__green`, `${ID}__red`);
    });
    //ideally I would use api but the data seems inconsistant
    const deliveryStatus = document.querySelector('[data-test-id="add-to-delivery-btn"]').disabled ? 'unavailable' : 'available'; //JSON.parse(localStorage.getItem(`${ID}-productEligibility`)).deliveryStatus;

    if (!userLocation.deliveryPostcode || (isVariantProd && variantNotSelected())) return;

    deliveryNotices.forEach((deliveryNotice) => {
      const item = document.querySelector(deliveryNotice);
      item?.classList.add(`${colorConfig.deliveryColors[deliveryStatus]}`);

      item?.insertAdjacentHTML('afterbegin', `<span class="${ID}__deliveryIcon">${colorConfig.icon[deliveryStatus]}</span>`);
    });
  };

  //get cutomer location and product id
  // get collection Eligibility Data
  if (reEvaluate == false) {
    if (VARIATION == 'control') return;
    deliveryTrafficLight();
    collectionTrafficLight();
    return;
  }

  if (!userLocation || (isVariantProd && variantNotSelected())) return;
  // getEligibility(productCode, userLocation).then((response) => {
  //   console.log(response);

  //for easy tracking
  const intersectionAnchor =
    document.querySelector(`[class^="ProductDetailDesktop__OrderButtonsWrapper"]`) ||
    document.querySelector(`[class^="ProductDetailMobile__OrderButtonsWr"]`);

  const deliveryStatus = document.querySelector('[data-test-id="add-to-delivery-btn"]').disabled ? 'unavailable' : 'available';
  const collectionStatus = getCollectionStatus();

  intersectionAnchor.classList.remove(`${ID}__seen`);

  const elemInViewCallback = (entry) => {
    if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
      entry.target.classList.add(`${ID}__seen`);
      if (userLocation.deliveryPostcode && deliveryStatus == 'unavailable') {
        fireEvent('User recieves a “unavailable” delivery message');
      }

      const eventText = colorConfig.collectionEvents[collectionStatus];

      if (userLocation.collectionBranchId && eventText != '') {
        fireEvent(eventText);
      }

      if (userLocation.deliveryPostcode || userLocation.collectionBranchId) {
        fireEvent('Conditions Met');
      }
    }
  };

  obsIntersection(intersectionAnchor, 0.7, elemInViewCallback);

  if (VARIATION == 'control') return;
  deliveryTrafficLight();
  collectionTrafficLight();
  // });
};

export default () => {
  setup();
  setTimeout(() => {
    init(true);
  }, 2000);

  // Poll and re-run init
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');

    appContainer.addEventListener('click', (e) => {
      const target = e.target;
      if (!isPDP()) return;
      const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
      if (targetMatched('[data-test-id="add-to-delivery-btn"]')) {
        fireEvent('User interacts with Delivery CTA');
      } else if (targetMatched('[data-test-id="add-to-collection-btn"]')) {
        fireEvent('User interacts with Collection CTA');
      } else if (targetMatched('[data-test-id="qty-wrapper"]') || targetMatched('[data-test-id="qty-selector"]')) {
        fireEvent('User interacts with quantity selector');
      } else if (targetMatched('[data-test-id="delivery-availability-message"]')) {
        fireEvent('User tries to interact with delivery badge');
      } else if (targetMatched('[data-test-id="collection-availability-message"]')) {
        fireEvent('User tries to interact with collection badge');
      }
    });

    let oldUserLocation = JSON.stringify(getCustomerLocation());
    let oldHref = location.href;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const newUserLocation = JSON.stringify(getCustomerLocation());
        const reEvaluate = (oldUserLocation != newUserLocation && newUserLocation != 'false') || oldHref != location.href;

        oldUserLocation = newUserLocation;
        oldHref = location.href;

        document.body.classList.remove(`${shared.ID}`);

        const { addedNodes, removedNodes } = mutation;
        const modifiedNodes = [...addedNodes, ...removedNodes];

        if (
          modifiedNodes.length > 0 &&
          modifiedNodes.some(
            (node) => node.nodeType !== 3 && (node.matches(`.${ID}__collectionIcon`) || node.matches(`.${ID}__deliveryIcon`))
          )
        ) {
          return;
        }
        setTimeout(() => {
          init(reEvaluate);
        }, 2000);
      });
    });

    const config = {
      childList: true,
      subtree: true,
      characterData: true,
    };

    observer.observe(appContainer, config);
  });
};
