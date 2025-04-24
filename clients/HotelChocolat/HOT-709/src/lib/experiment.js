/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import uspsWrapper from './components/uspsWrapper';
import { uspsData } from './data/data';
import renderFeatureDetails from './helpers/renderFeatureDetails';
import renderShippingChanges from './helpers/renderShippingChanges';

const { ID, VARIATION } = shared;
const thresholdPrice = 11;

const formatToPounds = (price) => {
  const numericPrice = parseFloat(price);

  if (isNaN(numericPrice)) {
    return 'Invalid price';
  }

  return numericPrice.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP',
  });
};

const domRender = (order_total_price) => {
  pollerLite(['.order-totals-table'], () => {
    const orderShippingElements = document.querySelectorAll('.order-totals-table .order-shipping > td');
    const orderTotalElement = document.querySelector('.order-totals-table .order-total > td + td');
    orderShippingElements[0].textContent = 'Click & Collect';
    orderShippingElements[1].textContent = 'From £0.95';
    const newOrderTotalPrice = order_total_price + 0.95;
    orderTotalElement.textContent = `${formatToPounds(newOrderTotalPrice)}`;
  });
};
const preSelcetAllClickAndCollectBoxes = () => {
  const allBoxes = document.querySelectorAll('.shipment-container li[data-delivery-type="clickandcollect"]');
  pollerLite([() => allBoxes && allBoxes.length], () => {
    allBoxes.forEach((box) => {
      box.querySelector('a')?.click();
    });
  });
};
const init = () => {
  const basketDataElement = document.querySelector('input[name="basketData"]');
  const basketData = JSON.parse(basketDataElement.value);
  const { order_delivery_total, order_total_price } = basketData;
  const basketHasNonCAndCItems =
    document.querySelectorAll('#cart-table .delivery-info img[src*="click-and-collect-no"]').length > 0;
  const totalPrice = order_total_price;

  if (order_delivery_total > 0 && totalPrice <= thresholdPrice && !basketHasNonCAndCItems) {
    const { pathname } = window.location;
    if (pathname.includes('/basket')) {
      domRender(order_total_price);

      const orderShippingRow = document.querySelector('.order-shipping');
      if (orderShippingRow && pathname.includes('/basket')) {
        const deliveryOptionText = `<tr class="${ID}__delivery-option-message"><td colspan="2">More delivery options available at checkout.</td></tr>`;
        orderShippingRow.insertAdjacentHTML('afterend', deliveryOptionText);
      }
    } else if (pathname.includes('/checkout/shipping')) {
      preSelcetAllClickAndCollectBoxes();
    }
  }

  // USPS OPTIONS WRAPER RENDERIMG AND MODAL
  if (VARIATION === '1') {
    const cartItemsForm = document.querySelector('.cart-items-form form');
    if (!document.querySelector(`.${ID}__uspsWrapper`)) {
      cartItemsForm && cartItemsForm.insertAdjacentHTML('beforeend', uspsWrapper(ID, uspsData));
    }

    const callOutMsgLists = document.querySelectorAll('.li-callout-msg .delivery-info-title .view');
    if (callOutMsgLists.length > 0) {
      callOutMsgLists.forEach((item) => {
        item.textContent = item.textContent.replace('View', '').trim();
      });
    }
    renderFeatureDetails(ID);
  }

  // changes for shiipping page for both variations
  if (window.location.pathname.includes('/checkout/shipping')) {
    renderShippingChanges(ID);
  }
};

export default () => {
  newEvents.initiate = true;
  newEvents.method = ['ga4'];
  newEvents.property = 'G-B37NQR1RWZ';

  setup();

  fireEvent('Conditions Met');

  document.body.addEventListener('pointerup', (e) => {
    const { target } = e;
    
    if (target.closest('.continue') && target.closest('.checkout-multi-shipping')) {
      if (VARIATION !== 'control') window.ABTastyClickTracking('continue securely at checkout');

      fireEvent('user clicks on continue securely cta at Checkout');
    }
  });

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest(`.${ID}__uspsItem`)) {
      const clickedItem = target.closest(`.${ID}__uspsItem`);
      const { model } = clickedItem.dataset;
      const modelElem = document.querySelector(`.${ID}__modalContainers`);
      modelElem.classList.toggle('open');
      modelElem.setAttribute('data-model', model);
    } else if (target.closest(`.${ID}-ways-to-pay-slide-close svg`) || target.closest(`.${ID}__modal-overlay`)) {
      //close modal
      const modelElem = document.querySelector(`.${ID}__modalContainers`);
      modelElem.classList.toggle('open');
      modelElem.removeAttribute('data-model');
    } else if (target.closest(`.${ID}-continue-shopping a`)) {
      //close modal
      const modelElem = document.querySelector(`.${ID}__modalContainers`);
      modelElem.classList.toggle('open');
      modelElem.removeAttribute('data-model');
    } else if (target.closest('[data-delivery-type="home"] a')) {
      fireEvent('user clicks on "Delivery" tab');
    } else if (target.closest('[data-delivery-type="clickandcollect"] a')) {
      fireEvent('user clicks on "Click and Collect" tab');
    } else if (target.closest('#primary .cart-total .button-fancy-large')) {
      fireEvent('user clicks on checkout securely cta');
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  init();
};
