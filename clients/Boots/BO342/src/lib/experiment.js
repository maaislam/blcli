/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import elementTypes from './elementTypes';
import { stickyWrapperAnother, stickyWrapper } from './components/stickyWrapper';
import { formatPrice, obsIntersection } from './helpers/utils';

const { ID, VARIATION } = shared;

const getCurrBasketAmount = () => {
  return new Promise((resolve, reject) => {
    let headers = {
      siteid: 'UK',
      channel: 'Ecommerce',
      context: 'BASKET',
    };

    $.ajax({
      cache: true,
      type: 'GET',
      url: '/api/checkout/basket?calculatePromotions=true',
      data: '',
      headers: headers,
      dataType: 'json',
      success: function (returnedData) {
        if (returnedData) {
          let subTotalValue = returnedData.basketDetails?.totalPrice?.amount ? returnedData.basketDetails?.totalPrice?.amount : 0;

          let totalSavingsAmount = returnedData.basketDetails?.totalSavingsAmount?.amount
            ? returnedData.basketDetails?.totalSavingsAmount.amount
            : 0;

          let totalBasketValue = returnedData.basketDetails?.totalAdjustedPrice?.amount
            ? returnedData.basketDetails.totalAdjustedPrice.amount
            : 0;
          let totalItemCount = returnedData.basketDetails?.totalItemCount ? returnedData.basketDetails.totalItemCount : 0;

          let totalPoints = returnedData?.basketDetails?.loyaltyPointsEarned
            ? returnedData?.basketDetails?.loyaltyPointsEarned
            : 0;

          let basket = {
            subTotalValue,
            totalSavingsAmount,
            totalBasketValue: totalBasketValue,
            totalItemCount: totalItemCount,
            totalPoints,
          };

          resolve(basket);
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        if (textStatus != 'abort') console.error(textStatus + errorThrown);
        return null;
      },
    });
  });
};

const getCurrBasketPoints = () => {
  return new Promise((resolve, reject) => {
    let headers = {
      siteid: 'UK',
      channel: 'Ecommerce',
      context: 'BASKET',
    };

    $.ajax({
      cache: true,
      type: 'GET',
      url: '/api/checkout/basket?currencyCode=PTS',
      data: '',
      headers: headers,
      dataType: 'json',
      success: function (returnedData) {
        if (returnedData) {
          let subTotalValue = returnedData.basketDetails?.totalPrice?.amount ? returnedData.basketDetails?.totalPrice?.amount : 0;

          let totalSavingsAmount = returnedData.basketDetails?.totalSavingsAmount?.amount
            ? returnedData.basketDetails?.totalSavingsAmount.amount
            : 0;

          let totalBasketValue = returnedData.basketDetails?.totalAdjustedPrice?.amount
            ? returnedData.basketDetails.totalAdjustedPrice.amount
            : 0;
          let totalItemCount = returnedData.basketDetails?.totalItemCount ? returnedData.basketDetails.totalItemCount : 0;

          let totalPoints = returnedData?.basketDetails?.loyaltyPointsEarned
            ? returnedData?.basketDetails?.loyaltyPointsEarned
            : 0;

          let basket = {
            subTotalValue,
            totalSavingsAmount,
            totalBasketValue: totalBasketValue,
            totalItemCount: totalItemCount,
            totalPoints,
            currencySymbol: 'Points',
          };

          resolve(basket);
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        if (textStatus != 'abort') console.error(textStatus + errorThrown);
        return null;
      },
    });
  });
};

const updateStickyElementValue = (data) => {
  const subTotal = document.querySelectorAll(`.${ID}__subtotal`);
  const totalSavingsAmount = document.querySelectorAll(`.${ID}__totalSavingsAmount`);
  const totalBasketValue = document.querySelectorAll(`.${ID}__totalBasketValue`);
  const totalItemCount = document.querySelectorAll(`.${ID}__totalItemCount`);
  const points = document.querySelectorAll(`.${ID}__points`);

  subTotal.forEach((item) => {
    item.innerText = !data?.currencySymbol ? formatPrice(data.subTotalValue) : `${data.subTotalValue} points`;
  });

  totalSavingsAmount.forEach((item) => {
    item.innerText = !data?.currencySymbol ? formatPrice(data.totalSavingsAmount) : `${data.totalSavingsAmount} points`;
  });

  totalBasketValue.forEach((item) => {
    item.innerText = !data?.currencySymbol ? formatPrice(data.totalBasketValue) : `${data.totalBasketValue} points`;
  });
  totalItemCount.forEach((item) => {
    item.innerText = `Total (${data.totalItemCount} items)`;
  });
  points.forEach((item) => {
    item.innerText = data.totalPoints ? `+${data.totalPoints} POINTS` : '';
  });
};

const renderStickyElement = (data) => {
  pollerLite(['#oct-basket .oct-basket__content'], () => {
    const basketWrapper = document.querySelector('#oct-basket .oct-basket__content');
    if (!basketWrapper) return;
    if (data.totalItemCount === 0 && document.querySelector(`.${ID}__stickyWrapper`)) {
      document.querySelectorAll(`.${ID}__stickyWrapper`).forEach((item) => item?.remove());
      document.querySelectorAll(`.${ID}__stickyWrapperAnother`)?.forEach((item) => item?.remove());
      return;
    }
    if (document.querySelector(`.${ID}__stickyWrapper`) || document.querySelector(`.${ID}__stickyWrapperAnother`)) {
      updateStickyElementValue(data);
    }
    if (VARIATION === '2' && !document.querySelector(`.${ID}__stickyWrapper`)) {
      basketWrapper.querySelector('.oct-basket-header').insertAdjacentHTML('beforeend', stickyWrapper(ID, data, VARIATION));
    }

    if (
      VARIATION === '1' &&
      !document.querySelector(`.${ID}__stickyWrapper.hide-checkout`) &&
      !document.querySelector(`.${ID}__stickyWrapper.hide-calculation`)
    ) {
      basketWrapper
        .querySelector('.oct-basket__scrollable-wrapper')
        .insertAdjacentHTML('afterbegin', stickyWrapperAnother(ID, data, VARIATION, 'hide-checkout'));
      basketWrapper.insertAdjacentHTML('beforeend', stickyWrapper(ID, data, VARIATION, 'hide-calculation'));
    }
    if (!document.querySelector(`.${ID}__conditionsMet`)) {
      fireBootsEvent(`User meets the conditions met set up`, true, eventTypes.experience_render, {
        render_element: elementTypes.Product_carousel,
        action_detail: `User meets the conditions met set up`,
      });

      document.body.classList.add(`${ID}__conditionsMet`);
    }
  });
};

const intersectionHandler = (entry) => {
  const stickyElement = document.querySelectorAll(`.${ID}__stickyWrapper`);
  if (entry.intersectionRatio < 0.33) {
    stickyElement.forEach((item) => item.classList.remove(`${ID}__hide`));
    stickyElement.forEach((item) => item.classList.add(`${ID}__show`));
  } else {
    stickyElement.forEach((item) => item.classList.remove(`${ID}__show`));
    stickyElement.forEach((item) => item.classList.add(`${ID}__hide`));
  }
};

const init = () => {
  const stickyWrapper = document.querySelectorAll(`.${ID}__stickyWrapper`);
  const stickyWrapperAnother = document.querySelectorAll(`.${ID}__stickyWrapperAnother`);
  if (stickyWrapper) {
    stickyWrapper.forEach((item) => item?.remove());
  }

  if (stickyWrapperAnother) {
    stickyWrapperAnother.forEach((item) => item?.remove());
  }
  pollerLite(['#convert-to-points'], () => {
    if (window.currentObserver) {
      window.currentObserver.disconnect();
      window.currentObserver = null;
    }
    const inputElement = document.querySelector('#convert-to-points');
    let calculateAllAmounts;
    if (inputElement.checked) {
      calculateAllAmounts = getCurrBasketPoints();
    } else {
      calculateAllAmounts = getCurrBasketAmount();
    }
    calculateAllAmounts.then((basket) => {
      renderStickyElement(basket);

      if (window.currentObserver) {
        window.currentObserver.disconnect();
        window.currentObserver = null;
      }

      if (document.querySelector(`.oct-basket__scrollable-wrapper  .oct-basket-totals:not(.${ID}__oct-basket-totals)`)) {
        window.currentObserver = obsIntersection(
          document.querySelector(`.oct-basket__scrollable-wrapper  .oct-basket-totals:not(.${ID}__oct-basket-totals)`),
          0.33,
          intersectionHandler
        );
      }
    });
  });
};

export default () => {
  const testID = `${ID}|Fixed Order Summary`;
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;

  bootsEvents.initiate = true;
  bootsEvents.methods = ['datalayer'];
  bootsEvents.property = 'G-C3KVJJE2RH';
  bootsEvents.testID = testIDAndVariant;

  setup();

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  if (VARIATION == 'control') {
    fireBootsEvent(`Conditions met - Control`, true, eventTypes.experience_render, {
      render_element: elementTypes.Product_carousel,
      action_detail: `Conditions met - Control`,
    });
    return;
  }

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__details`)) {
      const clickedItem = target.closest(`.${ID}__details`);
      clickedItem.classList.add('show-details');
    } else if (target.closest(`.${ID}__checkout-button`)) {
      const mainCta = document.querySelector(`.oct-basket-totals:not(.${ID}__oct-basket-totals) #checkout-now-cta`);
      mainCta && mainCta.click();
    }
  });

  window.addEventListener('oct-basket:updated', () => {
    init();
  });
  window.addEventListener('add-to-basket:add', () => {
    init();
  });
};
