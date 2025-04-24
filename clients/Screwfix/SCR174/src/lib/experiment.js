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
import priceWrapper from './components/priceWrapper';
import isIncludingVat from './helpers/isIncludingVat';
import { obsIntersection, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 500;

const intersectionCallback = (entry) => {
  if (entry.isIntersecting) {
    fireEvent('User has seen the discount price');
  }
};

const renderPriceWrapper = (cartItems, mainModifiedData, cartItemtype) => {
  cartItems.forEach((cartItem) => {
    const targetPoint = cartItem.querySelector('.product__total');
    const prodSkuElem =
      cartItem.querySelector('span[id^="CPC_trolley_page_product_quote_number"]') ||
      cartItem.querySelector('span[id^="trolley_page_product_quote_number"]');
    const prodSku = prodSkuElem ? prodSkuElem.textContent.replace(/[()]/g, '') : '';
    const isValidSku = mainModifiedData.find(
      (data) => data.sku === prodSku && data.fulfillmentType.toLocaleLowerCase().includes(cartItemtype)
    );

    if (isValidSku && !cartItem.querySelector(`.${ID}__priceWrapper`)) {
      targetPoint.insertAdjacentHTML('beforebegin', priceWrapper(ID, isValidSku));
    }
  });
};

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'basket'; //add page check conditions here based on experiment requirement

  if (!pageCondition) {
    //remove DOM element added by the experiment
    const priceWrapperElements = document.querySelectorAll(`.${ID}__priceWrapper`);
    if (priceWrapperElements.length > 0) {
      priceWrapperElements.forEach((priceWrapperElement) => priceWrapperElement.remove());
    }

    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  setup();

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  fireEvent('Conditions Met');

  const cartItemsData = window.orderLines;
  const isIncludingVatToggle = isIncludingVat();

  if (VARIATION === 'control') {
    const validDiscountedCartItem = cartItemsData.find((cartItem) => !cartItem.skuSavePound.includes('-'));
    if (validDiscountedCartItem) {
      const { sku } = validDiscountedCartItem;
      const productTitleElem = document.querySelector(`a[descriptionproductid="${sku}"]`);
      const discountedProductWrapper = productTitleElem?.closest('.product__row');
      if (discountedProductWrapper) {
        obsIntersection(discountedProductWrapper, 1, intersectionCallback);
      }
    }
    return;
  }

  /*****add experiment specific code here*****/
  const mainModifiedData = cartItemsData.map(({ sku, price, quantity, fulfillmentType, skuSavePercent, skuWasPrice }) => {
    const isValidDiscount = !skuSavePercent.includes('-');
    const oldPrice = isValidDiscount ? Math.abs(parseFloat(skuWasPrice)) / (isIncludingVatToggle ? 1 : 1.2) : null;
    const newPrice = parseFloat(price) * (isIncludingVatToggle ? 1.2 : 1);

    return {
      sku,
      price,
      quantity,
      fulfillmentType,
      skuSavePercent: isValidDiscount ? skuSavePercent : null,
      oldPrice,
      newPrice,
    };
  });

  const collectionTabContentElem = document.querySelector('#collection_tab_content');
  const collectionRelatedCartItems = collectionTabContentElem?.querySelectorAll('.product__row');

  const deliveryTabContentElem = document.querySelector('#delivery_tab_content');
  const deliveryRelatedCartItems = deliveryTabContentElem?.querySelectorAll('.product__row');

  if (collectionRelatedCartItems.length > 0) {
    renderPriceWrapper(collectionRelatedCartItems, mainModifiedData, 'collection');
  }

  if (deliveryRelatedCartItems.length > 0) {
    renderPriceWrapper(deliveryRelatedCartItems, mainModifiedData, 'delivery');
  }

  const disCountElement = document.querySelector(`.${ID}__savings`);
  if (disCountElement) {
    obsIntersection(disCountElement, 1, intersectionCallback);
  }
};

export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }
  /*****Request from Screwfix*****/

  const clickHandler = (e) => {
    //check if page is correct
    //if (window.utag.data.basicPageId !== 'lister Page') return;

    const { target } = e;

    console.log('🚀 ~ clickHandler ~ target', target);
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(
      [
        () => typeof window.tealiumDataLayer === 'object',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
      ],
      () => {
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
