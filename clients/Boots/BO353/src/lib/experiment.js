/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { pollerLite } from '../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import offerWrapper from './components/offerWrapper';
import getCartData from './helpers/getCartData';
import collectCardOffersData from './helpers/collectCardOffersData';
import offerCardWrapper from './components/offerCardWrapper';

const { ID, VARIATION } = shared;

const filterPromotions = (keyword) => {
  const items = document.querySelectorAll('#offers_available > li'); // Select all <li> elements
  items.forEach((item) => {
    item.style.display = '';
    const promoPoints = item.querySelector('.promotions_points');
    const text = promoPoints ? promoPoints.innerText.toLowerCase() : '';

    if (keyword === 'saving' || keyword === 'save') {
      item.style.display = text.includes('save') ? '' : 'none';
    } else if (keyword === 'point') {
      item.style.display = text.includes('point') ? '' : 'none';
    } else if (keyword === 'clear') {
      item.style.display = '';
    } else {
      // Hide items that contain either "save" or "point"
      item.style.display = text.includes('save') || text.includes('point') ? 'none' : '';
    }
  });
};

const renderOfferContent = (data, mainWrapper) => {
  if (!mainWrapper.querySelector(`.${ID}__offerCardWrapper`)) {
    mainWrapper.querySelector('.oct-basket-price-advantage').insertAdjacentHTML('beforeend', offerCardWrapper(ID, data));
  }
};

const init = () => {
  pollerLite(['.my_offers_heading'], () => {
    const desktopTargetPoint = document.querySelector('.my_offers_heading');
    const mobileTargetPoint = document.querySelector('.tabContainer');
    const acceptOffers = document.querySelectorAll('#offers_available > li a.btn_acceptOffer');

    //desktop
    if (!document.querySelector(`.${ID}__offerWrapper.${ID}__desktop`)) {
      desktopTargetPoint.insertAdjacentHTML('afterend', offerWrapper(ID, 'desktop', acceptOffers));
    }

    //mobile
    if (!document.querySelector(`.${ID}__offerWrapper.${ID}__mobile`)) {
      mobileTargetPoint.insertAdjacentHTML('afterend', offerWrapper(ID, 'mobile', acceptOffers));
    }
  });
};

export default () => {
  const testID = `${ID}| Ad card offers`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;

  bootsEvents.initiate = true;
  bootsEvents.methods = ['datalayer'];
  bootsEvents.property = 'G-C3KVJJE2RH';
  bootsEvents.testID = testIDAndVariant;

  setup();

  fireBootsEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__filter-button`) && !target.closest(`.${ID}__filter-button--active`)) {
      const clickedItem = target.closest(`.${ID}__filter-button`);
      const text = clickedItem.textContent;
      const { testId } = clickedItem.dataset;

      fireBootsEvent(`User clicks ${text} tab option`, true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: `User clicks ${text} tab option`,
      });

      const allButtons = document.querySelectorAll(`.${ID}__filter-button`);
      allButtons.forEach((item) => {
        item.classList.remove(`${ID}__filter-button--active`);
      });
      clickedItem.classList.add(`${ID}__filter-button--active`);
      filterPromotions(testId);
    } else if (target.closest(`.${ID}__filter-button`) && target.closest(`.${ID}__filter-button--active`)) {
      const allButtons = document.querySelectorAll(`.${ID}__filter-button`);

      allButtons.forEach((item) => {
        item.classList.remove(`${ID}__filter-button--active`);
      });

      filterPromotions('clear');
    } else if (target.closest(`.${ID}__load-button`)) {
      const clickedItem = target.closest(`.${ID}__load-button:not(.${ID}__loaded)`);
      const titleElement = clickedItem.querySelector(`.${ID}__load-card-title`);
      const items = document.querySelectorAll('#offers_available > li');

      fireBootsEvent(`User clicks "Add all offers to card" CTA`, true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: `User clicks "Add all offers to card" CTA`,
      });
      items.forEach((item) => {
        const loadOfferElement = item.querySelector('a.btn_acceptOffer');
        if (loadOfferElement) {
          loadOfferElement.click();
        }
      });
      titleElement.textContent = 'All offers added';
      clickedItem.classList.add(`${ID}__loaded`);
    } else if (target.closest(`.${ID}__offer-filter-button`)) {
      const clickedItem = target.closest(`.${ID}__offer-filter-button`);
      const text = clickedItem.textContent;
      const { testId } = clickedItem.dataset;

      fireBootsEvent(`User clicks ${text} tab option`, true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: `User clicks ${text} tab option`,
      });

      const allContent = document.querySelectorAll(`.${ID}__card`); // Select
      allContent.forEach((item) => {
        if (item.dataset.attr === testId) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    } else if (!target.closest('#oct-basket')) {
      pollerLite(['[data-testid="visible-overlay-id"].oct-overlay--visible'], () => {
        const busketWrapper = document.querySelector('#oct-basket');
        const busketOverlayElement = busketWrapper.querySelector('[data-testid="visible-overlay-id"].oct-overlay--visible');

        if (busketOverlayElement.querySelector(`.${ID}__offerCardWrapper`)) {
          busketOverlayElement.querySelector(`.${ID}__offerCardWrapper`).remove();
        }

        getCartData().then((data) => {
          const { basketDetails } = data;

          const offerData = collectCardOffersData(basketDetails);

          if (offerData && offerData.length > 0) {
            renderOfferContent(offerData, busketOverlayElement);
          }
        });
      });
    }
  });
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  init();
};
