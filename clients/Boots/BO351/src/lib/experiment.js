import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import TestReporting from '../boots_tracking/TestReporting';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import { successIcon } from '../assets/icons';
import productCard from './components/product';
import getProductDetails from './helpers/getProductDetails';
import handleBagUpdate from './handlers/handleBagUpdate';
import { closeButton } from './assets/icons';
import progressBar from './components/progressBar';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
// import MouseStateTimerInteraction from './helpers/MouseStateTimerInteraction';

const { ID, VARIATION } = shared;
const THRESHOLD_PRICE = 25;

const removeMiniCartContent = () => {
  const closeBtn = document.querySelector('[data-testid="close-basket-notification"]');
  const notificationsContainer = document.querySelector('#oct-notification-container');
  const cardWrapper = document.querySelector(`.${ID}__cardWrapper`);
  const discountProgressContainer = document.querySelector(`.${ID}__discountProgressContainer`);
  closeBtn.click();
  notificationsContainer.classList.remove(`${ID}__show`);
  if (cardWrapper) cardWrapper.remove();
  if (discountProgressContainer) discountProgressContainer.remove();
};

const init = (data, partNumber, sku, varCode, quantity, actionType = '') => {
  pollerLite(['#oct-notification-container .oct-notification.oct-notification--visible'], () => {
    const testID = `${ID}|Mini Basket`; // same as triggers.js
    const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
    const testIDAndVariant = `${testID}|${testVariant}`;

    const reporting = new TestReporting(testID, testVariant);

    bootsEvents.initiate = true;
    bootsEvents.methods = ['datalayer'];
    bootsEvents.property = 'G-C3KVJJE2RH';
    bootsEvents.testID = testIDAndVariant;
    if (!window.BO351_event) {
      reporting.register();
      window.BO351_event = true;
    }
    setup();

    if (VARIATION == 'control') {
      return;
    }

    const notificationsContainer = document.querySelector('#oct-notification-container');
    notificationsContainer.classList.add(`${ID}__show`);

    if (VARIATION == '3') {
      return;
    }

    const notificationHeader = notificationsContainer.querySelector('.oct-notification__header');
    const closeNotificationButtonElem = notificationsContainer.querySelector('.oct-iconButton');

    const recentlyAddedProductElem = notificationsContainer.querySelector(`#${ID}__recentlyAddedProduct`);
    if (recentlyAddedProductElem) {
      recentlyAddedProductElem.remove(); // remove the existing recently Added product card
    }
    //add recently added product card

    const notificationHeaderTitle = document.querySelector('.oct-notification__header__title');
    const title = actionType === 'update' ? 'Item updated in your basket' : 'Item added to your basket';
    notificationHeaderTitle.textContent = title;

    if (document.querySelector(`.${ID}__cardWrapper`)) {
      document.querySelector(`.${ID}__cardWrapper`).remove(); //
    }
    notificationHeader.insertAdjacentHTML('afterend', productCard(ID, data, partNumber, sku, varCode, quantity));

    //add success svg element
    if (!notificationHeader.querySelector('.success-icon')) {
      notificationHeader.insertAdjacentHTML('afterbegin', successIcon);
    }

    //add close button element
    if (closeNotificationButtonElem && !closeNotificationButtonElem.querySelector('.close-oct-btn')) {
      closeNotificationButtonElem.insertAdjacentHTML('afterbegin', closeButton);
    }

    //progressbar add
    if (VARIATION === '2') {
      const progressBarElem = document.querySelector(`.${ID}__discountProgressContainer`);
      if (progressBarElem) {
        progressBarElem.remove();
      }

      setTimeout(() => {
        const orderDeatils = window.localStorage.getItem('orderDetails');
        const orderDetailsData = JSON.parse(orderDeatils);
        const amount = orderDetailsData ? orderDetailsData.ecommerce.checkout.revenue : '';
        const isThresholdMet = amount < THRESHOLD_PRICE;
        const progressWidth = (amount / THRESHOLD_PRICE) * 100;
        const deductedPrice = isThresholdMet && (THRESHOLD_PRICE - amount).toFixed(2);
        const cardWrapper = document.querySelector(`.${ID}__cardWrapper`);
        const loaderWrapper = document.querySelector(`.${ID}__loaderWrapper`);
        if (loaderWrapper) loaderWrapper.remove();
        if (!document.querySelector(`.${ID}__discountProgressContainer`) && amount) {
          cardWrapper.insertAdjacentHTML('afterend', progressBar(ID, progressWidth.toFixed(2), deductedPrice, isThresholdMet));
        }
      }, 1200);
    }
  });
};

export default () => {
  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__plusQtyBtn`)) {
      const quantityWrapper = target.closest(`.${ID}__quantityWrapper`);
      const quantityInput = quantityWrapper.querySelector(`.${ID}__quantityInput`);
      const { partnumber } = quantityWrapper.dataset;
      let currentValue = parseInt(quantityInput.value, 10) || 1;

      quantityInput.value = currentValue + 1;
      quantityWrapper.classList.add(`${ID}__disabledQuantityWrapper`);

      handleBagUpdate(partnumber, currentValue + 1, 'increase');
    } else if (target.closest(`.${ID}__minusQtyBtn`)) {
      const quantityWrapper = target.closest(`.${ID}__quantityWrapper`);
      const quantityInput = quantityWrapper.querySelector(`.${ID}__quantityInput`);
      const { partnumber } = quantityWrapper.dataset;
      let currentValue = parseInt(quantityInput.value, 10) || 1;

      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        quantityWrapper.classList.add(`${ID}__disabledQuantityWrapper`);
        handleBagUpdate(partnumber, currentValue - 1, 'decrease');
      }
    } else if (target.closest('.custom-selected-option')) {
      const dropdown = target.closest('.custom-selected-option');
      const menu = dropdown.parentElement.querySelector('.custom-menu');
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
      menu.style.display === 'none' ? dropdown.classList.remove(`${ID}__show`) : dropdown.classList.add(`${ID}__show`);
    } else if (target.closest('.custom-option')) {
      const option = target.closest('.custom-option');
      const selectedOption = option.closest('.custom-dropdown').querySelector('.custom-selected-option .custom-text');
      const selectedImage = option.closest('.custom-dropdown').querySelector('.custom-selected-option .custom-image');
      const { color, partnumber } = option.dataset;

      selectedOption.textContent = option.querySelector('.custom-text').textContent; // Set selected text
      selectedImage.src = option.querySelector('.custom-image').src; // Set selected image

      // Set data-selected attribute
      option.closest('.custom-dropdown').setAttribute('data-selected', color);

      // Close the menu
      option.closest('.custom-menu').style.display = 'none';

      // Get part number and quantity
      const quantityInput = document.querySelector(`.${ID}__quantityInput`);
      const quantity = parseInt(quantityInput.value, 10) || 1;

      // Call handleBagUpdate with part number and quantity
      handleBagUpdate(partnumber, quantity);
    } else if (!target.closest('.custom-dropdown') && target.closest(`.${ID}__productDetails`)) {
      // Close dropdown if clicked outside
      document.querySelectorAll('.custom-menu').forEach((menu) => (menu.style.display = 'none'));
    } else if (target.closest('[id^="desreseQty"]')) {
      fireBootsEvent('User Decreased Product Quantity', true, eventTypes.experience_action, {
        action: actionTypes.update_quantity,
        action_detail: 'User Decreased Product Quantity',
      });
    } else if (target.closest('[id^="increseQty"]')) {
      fireBootsEvent('User Increased Product Quantity', true, eventTypes.experience_action, {
        action: actionTypes.update_quantity,
        action_detail: 'User Increased Product Quantity',
      });
    } else if (
      target.closest('.oct-iconButton[data-testid="close-basket-notification"]') ||
      (!target.closest('#oct-notification-container') && !target.closest('.quantity_section'))
    ) {
      const notificationsContainer = document.querySelector('#oct-notification-container');
      if (notificationsContainer.classList.contains(`${ID}__show`)) {
        notificationsContainer.classList.remove(`${ID}__show`);
        fireBootsEvent('User Closed Mini Basket', true, eventTypes.experience_action, {
          action: actionTypes.close,
          action_detail: 'User Closed Mini Basket',
        });
      }
    } else if (target.closest('#oct-notification-container') && target.closest('[data-track-element="View basket"]')) {
      fireBootsEvent('User Clicks on View Basket CTA', true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: 'User Clicks on View Basket CTA',
      });
      const notificationsContainer = document.querySelector('#oct-notification-container');
      notificationsContainer.classList.remove(`${ID}__show`);

      pollerLite(['.oct-basket__content', '.oct-tabs__labels', '.oct-products'], () => {
        fireBootsEvent('User Opens Basket', true, eventTypes.experience_action, {
          action: actionTypes.open,
          action_detail: 'User Opens Basket',
        });
      });
    } else if (target.closest('.oct-notification__ctas') && target.closest('[data-testid="checkout-button"]')) {
      fireBootsEvent('User Clicks on Checkout Now CTA', true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: 'User Clicks on Checkout Now CTA',
      });
      const notificationsContainer = document.querySelector('#oct-notification-container');
      notificationsContainer.classList.remove(`${ID}__show`);
    } else if (target.closest(`.${ID}__discountProgressContainer`)) {
      fireBootsEvent('User Clicks on Shipping Progress Bar', true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: 'User Clicks on Shipping Progress Bar',
      });
    } else if (target.closest('.oct-product-buttons-new__remove-cta')) {
      fireBootsEvent('User Removed Product from Basket', true, eventTypes.experience_action, {
        action: actionTypes.remove_from_cart,
        action_detail: 'User Removed Product from Basket',
      });
    }
  });

  // init();

  window.addEventListener('oct-basket:add', (event) => {
    const {
      detail: {
        payload: {
          orderItems: [{ partNumber, quantity }],
        },
      },
    } = event;
    //get SKU and VarCode
    const sku = partNumber.length > 8 ? partNumber.slice(0, 8) : partNumber;
    const varCode = partNumber.length > 8 ? partNumber.slice(8) : null;

    getProductDetails([sku])
      .then((data) => {
        init(data, partNumber, sku, varCode, quantity);
      })
      .catch((err) => {
        console.log('Error fetching product details: ', err);
      });
  });

  window.addEventListener('oct-basket:update', (e) => {
    const {
      detail: { payload },
    } = e;
    const { orderItem } = payload;

    const { partNumber, quantity } = orderItem;

    //get SKU and VarCode
    const sku = partNumber.length > 8 ? partNumber.slice(0, 8) : partNumber;
    const varCode = partNumber.length > 8 ? partNumber.slice(8) : null;

    getProductDetails([sku])
      .then((data) => {
        if (quantity === 0) {
          removeMiniCartContent();
          fireBootsEvent('User Removed Product from Basket', true, eventTypes.experience_action, {
            action: actionTypes.remove_from_cart,
            action_detail: 'User Removed Product from Basket',
          });
        } else {
          init(data, partNumber, sku, varCode, quantity, 'update');
          // fireBootsEvent('User Updated Product Quantity in Basket', true, eventTypes.experience_action, {
          //   action: actionTypes.update_quantity,
          //   action_detail: 'User Updated Product Quantity in Basket',
          // });
        }
      })
      .catch((err) => {
        console.log('Error fetching product details: ', err);
      });
  });
};
