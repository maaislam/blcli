/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
// import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import Swiper from 'swiper/swiper-bundle';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import elementTypes from './elementTypes';
import offerWrapper from './components/offerWrapper';
import offerSlider from './components/offerSlider';
import offerCount from './components/offerCount';
import getProducts from './helpers/getProducts';
import getPersonalisedOffers from './helpers/getPersonalisedOffers';
import filterToggleHandler from './handlers/filterToggleHandler';
import { obsIntersection } from './helpers/utils';

const { ID, VARIATION } = shared;

export const addSwiperElement = (selector) => {
  const swiper = new Swiper(selector, {
    slidesPerView: 3,
    loop: false,
    spaceBetween: 20,
    navigation: {
      nextEl: `.${ID}-carousel--arrow--next`,
      prevEl: `.${ID}-carousel--arrow--prev`,
    },
    pagination: {
      el: `.${ID}__swiper-pagination`,
      type: 'progressbar',
    },

    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
  swiper.on('slideChange', () => {
    fireBootsEvent(`Scrolls - promo carousel`, true, eventTypes.experience_action, {
      action: actionTypes.scroll,
      action_detail: `Scrolls - promo carousel`,
    });
  });
};

const filterByUniqueTags = (arr, uniqueTags) => {
  const uniqueObjects = new Set();

  arr.forEach((item) => {
    const hasMatch = item.category.some((tag) => uniqueTags.includes(tag));

    if (hasMatch) {
      uniqueObjects.add(item);
    }
  });

  return Array.from(uniqueObjects);
};

const getCategoryOffers = async () => {
  const fullPath = window.location.pathname;
  const pathSegments = fullPath.split('/').filter(segment => segment);
  const desiredPath = `/${pathSegments[0]}`;

  const categoryOffer = await fetch(`https://www.boots-optimisation.co.uk/category-promos${desiredPath}`);
  // const categoryOffer = await fetch(`https://www.boots-optimisation.co.uk/category-promos${window.location.pathname}`);
  const categoryOfferData = await categoryOffer.json();
  return categoryOfferData;
};

const findLargestCategoryListNames = (data) => {
  return data.map((product) => {
    // Find the longest categoryListName for the current product
    const largestCategory = product.categoryListName.reduce((longest, category) => {
      return category.length > longest.length ? category : longest;
    }, '');

    return {
      largestListFuzzy: largestCategory,
    };
  });
};

export const personalizedOffers = async () => {
  const getATPersObj = JSON.parse(localStorage.getItem('ATPersObj'));
  if (!getATPersObj) {
    return;
  }
  const { productViews } = getATPersObj;

  if (productViews.length === 0) return;

  const recentViewedSkus = [];
  const personalisedProductsArr = [];

  productViews?.slice(0, 10).map((item) => {
    const sku = item.SAP.includes('.P') ? item.SAP.replace('.P', '') : item.SAP;
    // check for duplicates
    if (!recentViewedSkus.includes(sku)) {
      recentViewedSkus.push(sku);
    }
  });

  try {
    // get product data based on recentViewedSkus
    const data = await getProducts(recentViewedSkus);
    const largestPaths = findLargestCategoryListNames(data);

    // process all personalised offers asynchronously
    const personalisedOffersPromises = largestPaths.map((item, index) => {
      const { largestListFuzzy } = item;
      return getPersonalisedOffers(recentViewedSkus[index]).then((personalisedData) => {
        const promotions = personalisedData?.map((promoOffer) => promoOffer.promotionalTextExact);
        personalisedProductsArr.push({
          categoryListNameFuzzy: largestListFuzzy,
          promotions: promotions,
          countPromos: promotions.length,
        });
      });
    });

    // wait for all personalised offers to complete
    await Promise.all(personalisedOffersPromises);

    // console.log('personalisedProducts: ', personalisedProductsArr);
    return personalisedProductsArr;
  } catch (error) {
    console.error('Error in personalizedOffers:', error);
  }
};

const dynamicElementsReRender = (mainWrapper, data) => {
  const sliderElement = document.querySelector(`.${ID}__offerContentSlider`);
  const offerCountElement = document.querySelector(`.${ID}__offerHeader-available`);
  sliderElement.innerHTML = offerSlider(ID, data);
  offerCountElement.innerHTML = offerCount(ID, data.length);

  addSwiperElement(`.${ID}__swiper`);
  if (mainWrapper.classList.contains(`${ID}__toggle`)) {
    mainWrapper.classList.remove(`${ID}__toggle`);
  }
};

const init = () => {
  const targetElementWrapper = document.querySelector(
    '.oct-decorative-panel__inner__content .oct-grid-aem__cell__width--firstRow div[data-testid="grid"]'
  );

  if (!document.querySelector(`.${ID}__offerWrapper`)) {
    const data = getCategoryOffers();
    data.then((offer) => {
      if (offer && offer.length) {
        console.log('offer:::', offer);
        targetElementWrapper
          .querySelector('div[data-testid="row"]:nth-child(6)')
          ?.insertAdjacentHTML('afterend', offerWrapper(ID, offer));

        filterToggleHandler(ID);
        addSwiperElement(`.${ID}__swiper`);
      }
    });
  }

  const intersectionCallback = (entry) => {
    if (entry.isIntersecting) {
      // console.log('Intersecting');
      if (VARIATION == 'control') {
        fireBootsEvent(`View - user would have seen new component`, true, eventTypes.experience_render, {
          render_element: elementTypes.Product_carousel,
          action_detail: `user would have seen new component ${window.location.pathname}`,
        });
        return;
      }
    }
  };

  const intAttachPoint = targetElementWrapper.querySelector('div[data-testid="row"]:nth-child(6)');

  obsIntersection(intAttachPoint, 1, intersectionCallback);
};

export default () => {
  const testID = `${ID}|Offer Based component`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;

  bootsEvents.initiate = true;
  bootsEvents.methods = ['datalayer'];
  bootsEvents.property = 'G-C3KVJJE2RH';
  bootsEvents.testID = testIDAndVariant;

  setup();

  // fireBootsEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest(`.${ID}__offerHeader-filter`)) {
      const clickedItem = target.closest(`.${ID}__offerHeader-filter`);
      clickedItem.closest(`.${ID}__offerWrapper`).classList.toggle(`${ID}__toggle`);
    } else if (target.closest(`.${ID}__offerFilterBtn`)) {
      const clickedItem = target.closest(`.${ID}__offerFilterBtn`);
      const wrapper = clickedItem.closest(`.${ID}__offerFlterWrapper`);
      const mainWrapper = wrapper.closest(`.${ID}__offerWrapper`);
      const allCheckedInputs = wrapper?.querySelectorAll('input:checked');
      if (allCheckedInputs?.length > 0) {
        const collectedCategoryData = Array.from(allCheckedInputs).map((item) => {
          const parentElement = item.closest(`.${ID}__offerFlterItem`);
          return parentElement && parentElement.dataset.value;
        });

        const filteredArray = filterByUniqueTags(window[`${ID}__offers`], collectedCategoryData);

        dynamicElementsReRender(mainWrapper, filteredArray);

        fireBootsEvent(`Clicks - filter button`, true, eventTypes.experience_action, {
          action: actionTypes.filter,
          action_detail: `Clicks - filter button`,
        });
      } else if (allCheckedInputs?.length === 0) {
        dynamicElementsReRender(mainWrapper, window[`${ID}__offers`]);
      }
    } else if (target.closest(`.${ID}__offerItem`)) {
      const link = target.closest('a').href;
      fireBootsEvent(`Clicks - promo card ${link}`, true, eventTypes.experience_action, {
        action: actionTypes.click_product,
        action_detail: `Clicks - promo card ${link}`,
      });
    }
  });

  const targetElementWrapper = document.querySelector(
    '.oct-decorative-panel__inner__content .oct-grid-aem__cell__width--firstRow div[data-testid="grid"]'
  );

  const intersectionCallback = (entry) => {
    if (entry.isIntersecting) {
      fireBootsEvent(
        `View - user ${VARIATION === 'control' ? 'would have' : ''} seen new component`,
        true,
        eventTypes.experience_render,
        {
          render_element: elementTypes.Product_carousel,
          action_detail: `user ${VARIATION === 'control' ? 'would have' : ''} seen new component ${window.location.pathname}`,
        }
      );
    }
  };

  const intAttachPoint = targetElementWrapper.querySelector('div[data-testid="row"]:nth-child(6)');

  obsIntersection(intAttachPoint, 1, intersectionCallback);

  if (VARIATION == 'control') {
    return;
  }

  init();
};
