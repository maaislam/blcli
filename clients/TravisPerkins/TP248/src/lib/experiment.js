/*eslint-disable object-curly-newline */
/*eslint-disable function-paren-newline */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import deliveryMsg from './components/deliveryLeadTimeMessage';
import clickHandler from './helpers/clickHandler';
import { getBasketEntries, getBrnchDeliveryDays, getEligibility } from './helpers/getApiData';
//import initSwiper from './helpers/initSwiper';
import obsIntersection from './helpers/observeIntersection';
import { formatDateStr, getCustomerLocation, getItemData, isPDP, isPLP, removeExisting } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RERENDER_DELAY = 2000;

const init = async () => {
  const basketData = await getBasketEntries();
  //console.log(basketData.basketEntries, 'basketData');
  const { basketEntries } = basketData;

  let result = basketEntries.map((a) => a.deliveryType === basketEntries[0].deliveryType);
  const allEqual = (arr) => arr.every((v) => v === arr[0]); //Bool
  const deliveryType = !allEqual(result);

  //fire event at checkout page
  if (window.location.pathname === '/checkout') {
    setTimeout(() => {
      const deliveryOptions = document.querySelectorAll('[data-test-id^="product-details-block-"]');

      if (deliveryOptions.length > 1 && deliveryType) {
        fireEvent('User has multiple delivery type products in their bag');
        //console.log('User has multiple delivery type products in their bag');
      }
    }, DOM_RERENDER_DELAY);
    return;
  }

  //run only in PDP
  const locationData = getCustomerLocation();
  if (!isPLP() || !locationData) return;

  //get data

  const eligibility = await getEligibility(getItemData(), locationData);
  if (eligibility.length <= 0) return;
  //console.log('eligible:', eligibility);
  //console.log("item", getItemData());

  const { deliveryPostcode } = locationData;

  //get availavle days
  const deliveryDays = await getBrnchDeliveryDays(deliveryPostcode);
  //console.log(deliveryDays, "deliveryDays")

  const deleiveryDateParsed = deliveryDays
    .map(({ date, slotAvailable }) => slotAvailable && { parsedDate: formatDateStr(date), date })
    .filter(Boolean)
    .slice(0, 14);
  //console.log(deleiveryDateParsed, "deleiveryDateParsed");

  const prodCards = document.querySelectorAll('[data-test-id="product"]');

  prodCards.forEach((item, index) => {
    const hasDeliveryItemInCart = basketEntries.some((item) => item.deliveryType === 'BRANCH');

    const { status, type } = eligibility[index].deliveryEligibility;
    //do not render incase status or type or hasDeliveryItemInCart  invalid
    if (
      status !== 'AVAILABLE' ||
      type !== 'BRANCH' ||
      hasDeliveryItemInCart ||
      item.querySelector(`.${ID}__delivery_availability_msg`)
    )
      return;

    const anchorElem = item.querySelector('[data-test-id="delivery-availability-message"]');
    if (VARIATION !== 'control') {
      anchorElem.classList.add('display_none');
      anchorElem.insertAdjacentHTML('beforebegin', deliveryMsg(deleiveryDateParsed));
    }

    if (sessionStorage.getItem(`${ID}__seen-once`) !== 'true') {
      const intersectionCallBack = (entry, observer) => {
        //console.log(entry)
        if (entry.isIntersecting) {
          fireEvent('Conditions Met');
          //console.log("Conditions Met")
          observer.disconnect();
        }
      };
      obsIntersection(item.querySelector(`[data-test-id="add-to-delivery-btn"]`), 0.5, intersectionCallBack);
      sessionStorage.setItem(`${ID}__seen-once`, 'true');
    }
  });

  if (VARIATION === 'control') {
    return;
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
        //console.log(mutation);
        if (
          oldLocation !== JSON.stringify(getCustomerLocation()) ||
          oldProductInfo !== JSON.stringify(getItemData()) ||
          oldHref !== window.location.href
        ) {
          oldLocation = JSON.stringify(getCustomerLocation());
          oldProductInfo = JSON.stringify(getItemData());
          oldHref = window.location.href;

          setTimeout(init, 4000);
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
