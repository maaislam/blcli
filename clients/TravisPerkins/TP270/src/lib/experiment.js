/*eslint-disable object-curly-newline */
/*eslint-disable function-paren-newline */

//import Swiper styles
//import 'swiper/css';

import Swiper from 'swiper';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import deliveryDates from './components/dekiveryDates';

import checkoutAdjust from './helpers/checkoutAdjust';
import clickHandler from './helpers/clickHandler';
import { getBasketEntries, getBrnchDeliveryDays, getEligibility } from './helpers/getApiData';
import initSwiper from './helpers/initSwiper';
//import swiper from './helpers/swiper';
import { formatDateStr, getCustomerLocation, getItemData, isPDP, removeExisting } from './helpers/utils';
import swiper from './helpers/swiper';

const { ID, VARIATION } = shared;

const DOM_RERENDER_DELAY = 2000;

// const swiperJs = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js';
// const swiperCss = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css';

const init = async () => {
  fireEvent('Conditions Met Test0');
  //remove existing incase of re render
  removeExisting(`.${ID}__deliverydates`);
  if (!window.location.pathname.includes('/tc/')) {
    return;
  }
  if (window.location.pathname === '/tc/basket') {
    setTimeout(() => {
      checkoutAdjust(ID, fireEvent, shared);
    }, DOM_RERENDER_DELAY);
    return;
  }
  fireEvent('Conditions Met Test1');
  //run only in PDP
  const locationData = getCustomerLocation();

  if (!isPDP() || !locationData) return;
  //console.log('init');

  //get data
  const eligibility = await getEligibility(getItemData(), locationData);

  //console.log(eligibility, "getEligibility");
  //console.log(locationData, "locationData")

  const anchorElem = document.querySelector('[class^="styled__ProductDetailsWrapper-sc-"]');
  document.querySelector('[class^="ProductDetailMobile__PriceWr-sc"] [data-test-id="price"]');

  const { status, type } = eligibility[0].deliveryEligibility;

  const { deliveryPostcode } = locationData;

  //get availavle days
  const deliveryDays = await getBrnchDeliveryDays(deliveryPostcode);

  //add swiper js

  // addJsToPage(swiperJs, `${ID}__swiperjs`);
  // addCssToPage(swiperCss, `${ID}__swipercss`);
  swiper();

  const deleiveryDateParsed = deliveryDays
    .map(({ date, slotAvailable }) => slotAvailable && { parsedDate: formatDateStr(date), date })
    .filter(Boolean)
    .slice(0, 14);
  //console.log(deleiveryDateParsed);

  //branchdelivery item not in cart and user seeing the dateslider 1st in a session
  //fire Conditions Met
  const basketData = await getBasketEntries();
  const { basketEntries } = basketData;
  const hasDeliveryItemInCart = basketEntries.some((item) => item.deliveryType === 'BRANCH');

  //check if delivery button is disabled
  // const deliveryButton = document.querySelector('[data-test-id="add-to-delivery-btn"]');
  // if (deliveryButton && deliveryButton.disabled) {
  //   return;
  // }

  // if (status === 'AVAILABLE' && type === 'BRANCH' && !hasDeliveryItemInCart) {
  // }

  //console log each
  console.log('status', status);
  console.log('type', type);
  console.log('hasDeliveryItemInCart', hasDeliveryItemInCart);
  fireEvent('Conditions Met Test2');
  //do not render incase status or type or hasDeliveryItemInCart  invalid
  if (status !== 'AVAILABLE' || type !== 'BRANCH') return;

  if (!hasDeliveryItemInCart && sessionStorage.getItem(`${ID}__seen-once`) !== 'true') {
    fireEvent('Conditions Met');
    //console.log("Conditions Met")
    sessionStorage.setItem(`${ID}__seen-once`, 'true');
  }

  if (VARIATION === 'control') {
    return;
  }

  removeExisting(`.${ID}__deliverydates`);
  anchorElem.insertAdjacentHTML('afterend', deliveryDates(ID, deleiveryDateParsed));
  console.log('rendered', document.querySelector(`.${ID}__deliverydates`));
  pollerLite([() => typeof window.Swiper === 'function'], () => {
    initSwiper(`.${ID}__deliverydates--swiper`, fireEvent);
  });

  //css adjustments
  const bulkSavingBlock = document.querySelector('[class^="ProductDetailDesktop__BulkSavingsWrapper-sc"]');
  if (bulkSavingBlock && bulkSavingBlock.innerText === '') {
    bulkSavingBlock.classList.add(`${ID}__bulksaving--empty`);
  }
};

export default () => {
  setup();
  setTimeout(init, DOM_RERENDER_DELAY);
  //Poll and re-run init
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');
    let oldLocation = JSON.stringify(getCustomerLocation());
    let oldProductInfo = JSON.stringify(getItemData());
    let oldHref = window.location.href;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        if (
          oldLocation !== JSON.stringify(getCustomerLocation()) ||
          oldProductInfo !== JSON.stringify(getItemData()) ||
          oldHref !== window.location.href
        ) {
          oldLocation = JSON.stringify(getCustomerLocation());
          oldProductInfo = JSON.stringify(getItemData());
          oldHref = window.location.href;
          console.log('url changed');
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

    observer.observe(appContainer, config);
  });
};
