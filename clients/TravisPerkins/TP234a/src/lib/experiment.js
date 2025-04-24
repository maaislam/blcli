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

import { getCustomerLocation, isPLP } from './helpers/utils';
import popupStockHandler from './popupStockHandler';

const { ID, VARIATION } = shared;

const init = (reEvaluate) => {
  // check if PDP
  console.log('init ran');
  if (!isPLP()) return;

  // Experiment Code...
  setup();

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const userLocation = getCustomerLocation();
  const updatePlpCard = (plpCard) => {
    plpCard.querySelector('[data-test-id="delivery-availability-message"]').classList.add(`${ID}__delivery-notice`);
    plpCard.querySelector('[data-test-id="collection-availability-message"]').classList.add(`${ID}__collection-notice`);

    const deliveryNotices = [`.${ID}__delivery-notice`, '.TP204_notice'];
    const collectionNotice = plpCard.querySelector(`.${ID}__collection-notice`);

    const isVariantProd = plpCard.querySelector(
      '[data-test-id="variations-text"]'
    ); /*|| plpCard.querySelector('[data-test-id="product-variants"]')*/

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
      const secondSelectCheck = ![...plpCard.querySelectorAll('a[class^="ProductVariantSelect"]')].some(
        (item) => item.getAttribute('href') === location.pathname
      );
      return !!plpCard.querySelector('[class^="ProductItemDesktop"]') ? firstSelectCheck : firstSelectCheck || secondSelectCheck;
    };

    const getCollectionStatus = () => {
      const DELIVERY_THRESHOLD = 20;
      const stockText = collectionNotice.getAttribute('title')?.match(/\d+/) || '0';
      const stockLevel = parseInt(stockText[0]);
      return stockLevel > DELIVERY_THRESHOLD ? 'greenAvailablity' : stockLevel == 0 ? 'unavailable' : 'orangeAvailability';
    };

    const collectionTrafficLight = () => {
      plpCard.querySelectorAll(`.${ID}__collectionIcon`).forEach((item) => {
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
      plpCard.querySelectorAll(`.${ID}__deliveryIcon`).forEach((item) => {
        item?.remove();
      });
      deliveryNotices.forEach((deliveryNotice) => {
        plpCard.querySelector(deliveryNotice)?.classList.remove(`${ID}__green`, `${ID}__red`);
      });
      //ideally I would use api but the data seems inconsistant

      const delBtn = plpCard.querySelector('[data-test-id="add-to-delivery-btn"]');
      if (!delBtn) return;
      const deliveryStatus = delBtn && delBtn.disabled ? 'unavailable' : 'available'; //JSON.parse(localStorage.getItem(`${ID}-productEligibility`)).deliveryStatus;

      if (!userLocation.deliveryPostcode || (isVariantProd && variantNotSelected())) return;

      deliveryNotices.forEach((deliveryNotice) => {
        const item = plpCard.querySelector(deliveryNotice);
        item?.classList.add(`${colorConfig.deliveryColors[deliveryStatus]}`);

        item?.insertAdjacentHTML('afterbegin', `<span class="${ID}__deliveryIcon">${colorConfig.icon[deliveryStatus]}</span>`);
      });
    };

    //get cutomer location and product id
    // get collection Eligibility Data
    if (!reEvaluate) {
      if (VARIATION == 'control') return;
      deliveryTrafficLight();
      collectionTrafficLight();
      return;
    }
    //console.log(`Running test ${ID}`, reEvaluate);
    if (!userLocation || (isVariantProd && variantNotSelected())) return;

    // getEligibility(productCode, userLocation).then((response) => {
    //   console.log(response);

    //for easy tracking

    if (VARIATION == 'control') return;
    deliveryTrafficLight();
    collectionTrafficLight();
    // });
  };
  const plpCards = document.querySelectorAll('[data-test-id="product"]');

  plpCards.forEach((plpCard) => {
    !plpCard.querySelector('[class^="ToolHireProductItemStyled__ToolHireButtonsWrapper"]') && updatePlpCard(plpCard);
  });

  if (!reEvaluate) return;

  pollerLite(['[data-test-id="product"] [data-test-id="add-to-delivery-btn"]'], () => {
    const intersectionAnchor = document.querySelector('[data-test-id="product"] [data-test-id="add-to-delivery-btn"]');

    //  const deliveryStatus = plpCard.querySelector('[data-test-id="add-to-delivery-btn"]').disabled ? 'unavailable' : 'available';
    //  const collectionStatus = getCollectionStatus();

    const elemInViewCallback = (entry) => {
      if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
        entry.target.classList.add(`${ID}__seen`);

        if (userLocation.deliveryPostcode || userLocation.collectionBranchId) {
          fireEvent('Conditions Met');
        }
      }
    };

    intersectionAnchor.classList.remove(`${ID}__seen`);
    // const threshold = document.querySelector('[class^="ProductItemDesktop"]') ? 0.6 : 1;
    obsIntersection(intersectionAnchor, 1, elemInViewCallback);
  });
};

export default () => {
  setup();

  // Poll and re-run init
  pollerLite(['#app-container', '[data-test-id="plp-list"]'], () => {
    setTimeout(() => {
      init(true);
    }, 2000);
    const appContainer = document.querySelector('#app-container');

    appContainer.addEventListener('click', (e) => {
      const target = e.target;

      if (!isPLP()) return;
      const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
      const isPopupOpen = !!document.querySelector('[data-test-id="add-variant-modal"]');
      if (targetMatched('[data-test-id="add-to-delivery-btn"]')) {
        fireEvent(`User interacts with Delivery CTA ${isPopupOpen ? 'on the modal' : ''}`);
      } else if (targetMatched('[data-test-id="add-to-collection-btn"]')) {
        fireEvent(`User interacts with Collection CTA ${isPopupOpen ? 'on the modal' : ''}`);
      } else if (
        (targetMatched('[data-test-id="qty-input"]') || targetMatched('[data-test-id="qty-selector"]')) &&
        !isPopupOpen &&
        !targetMatched('[data-test-id="variations-text"]')
      ) {
        fireEvent('User interacts with quantity selector');
        setTimeout(() => {
          init(false);
        }, 1000);
      } else if (targetMatched('[data-test-id="delivery-availability-message"]')) {
        fireEvent('User tries to interact with delivery badge');
      } else if (targetMatched('[data-test-id="collection-availability-message"]')) {
        fireEvent('User tries to interact with collection badge');
      } else if (
        (targetMatched('[class^="QuantityRange__RangeButton"]') && isPopupOpen) ||
        targetMatched('[data-test-id="variations-text"]')
      ) {
        const isModalQuantityClicked = !targetMatched('[data-test-id="variations-text"]');
        isModalQuantityClicked
          ? fireEvent('User interacts with the quantity selecter in the pop')
          : fireEvent('User interacts with the variant dropdown');
        if (VARIATION == 'control') return;
        setTimeout(() => {
          popupStockHandler(ID, colorConfig);
        }, 1000);
      } else if (targetMatched('[data-test-id="action-sheet"]') && isPopupOpen) {
        if (VARIATION == 'control') return;
        setTimeout(() => {
          popupStockHandler(ID, colorConfig);
        }, 1000);
      } else if (targetMatched('[data-test-id="action-sheet"]') && !isPopupOpen) {
        setTimeout(() => {
          init(false);
        }, 2000);
      } else if (targetMatched('[class^="Pagination__PaginationWrapper"]')) {
        if (VARIATION == 'control') return;
        setTimeout(() => {
          init(false);
        }, 2000);
        let timer;
        //const prodCardNum = document.querySelectorAll('[data-test-id="product"]').length;
        timer = setInterval(() => {
          const numOfCardLoaded = document
            .querySelector('[data-test-id="pag-info"]')
            .innerText.split('Showing 1—')[1]
            .split(' ')[0];
          const newProdCardNum = document.querySelectorAll('[data-test-id="product"]').length;

          if (newProdCardNum == numOfCardLoaded && !document.querySelector('[class^="SkeletonLoader"]')) {
            setTimeout(() => {
              init(false);
            }, 3000);
            clearInterval(timer);
          }
        }, 25);
      }
    });

    let oldUserLocation = JSON.stringify(getCustomerLocation());
    let oldHref = location.href;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // console.log(mutation);
        const newUserLocation = JSON.stringify(getCustomerLocation());
        const reEvaluate = (oldUserLocation != newUserLocation && newUserLocation != 'false') || oldHref != location.href;
        if (reEvaluate) {
          pollerLite(['[data-test-id="plp-list"]'], () => {
            setTimeout(() => {
              init(reEvaluate);
            }, 2000);
          });
        }
        oldHref = location.href;
        oldUserLocation = newUserLocation;

        document.body.classList.remove(`${shared.ID}`);
      });
    });

    const config = {
      childList: true,
      subtree: true,
      characterData: true,
    };

    observer.observe(appContainer, config);
    observer.observe(document.querySelector('[data-test-id="header-top-bar"]'), config);
  });
};
