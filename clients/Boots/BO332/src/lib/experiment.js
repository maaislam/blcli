/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import elementTypes from './elementTypes';
import sizes from './data';

const { ID, VARIATION } = shared;

const getCurrentSku = () => {
  const { pathname } = window.location;

  const sku = pathname.match(/-([a-zA-Z0-9]+)$/)[1];

  return sku;
};

const formatPrice = (amount, code = 'en-GB', currency = 'GBP') => {
  return new Intl.NumberFormat(code, {
    style: 'currency',
    currency,
  }).format(amount);
};

const getProducts = (productsArr) => {
  return fetch(`https://www.boots-optimisation.co.uk/prod-info/model/${productsArr.join('&')}`, {
    method: 'GET',
    headers: {
      accept: '*/*',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

const variantOption = (variantData) => {
  const { actionURL, currentPrice, isActive, isBestValue, ppuVolume, pricePerUnit, sizeText } = variantData;

  const activeClass = isActive ? `${ID}-current` : '';
  const bestValueClass = isBestValue ? `${ID}-bestvalue` : '';

  const htmlStr = `
      <a class="${ID}-size ${activeClass} ${bestValueClass}" ${isActive ? '' : `href="${actionURL}"`} >
				<div class="${ID}-size_inner multiple">
          ${isBestValue ? `<span class="${ID}-sizeMLbestvalue">Best Value</span>` : ''}
          <div>	
            <p class="${ID}-sizevalue">${sizeText || ppuVolume}</p>
            <h3>${formatPrice(currentPrice)}</h3>
          </div>
          <span class="${ID}-sizeML">
            <span class="${ID}-sizeMLinner">${pricePerUnit}</span>
          </span>
        </div>
			</a>
  `;
  return htmlStr;
};

const init = () => {
  // find the product ids
  const currentSku = getCurrentSku();
  //console.log('🚀 ~ init ~ currentSku:', currentSku);

  if (!currentSku) return;

  //make array from data obj
  const productsArr = Object.values(sizes);

  const variantOptions = productsArr.find((sizeOptions) =>
    sizeOptions.some((sizeOption) => sizeOption.sku == currentSku || currentSku.match(/(\d+)/)[0] == sizeOption.sku)
  );

  if (!variantOptions || variantOptions.length <= 0) return;

  const variantSkus = variantOptions.map((sizeOption) => sizeOption.sku);

  getProducts(variantSkus).then((data) => {
    if (data.some((product) => !product.ppuVolume || !product.pricePerUnit || product.variants?.length >= 0)) return;

    //console.log('🚀 ~ init ~ data:', data);
    const isBestValue = data.reduce((acc, curr) => {
      const { pricePerUnit } = curr;

      if (!acc.pricePerUnit) {
        return curr;
      }

      const getPerUnitValue = (ppu) => (ppu ? parseFloat(ppu.match(/[\d,.]+(?=\s*per)/)[0]) : 0);

      const isBestVal = getPerUnitValue(pricePerUnit) < getPerUnitValue(acc.pricePerUnit) ? curr : acc;

      return isBestVal;
    }, []);

    //modify data to add contextual texts

    const modifiedData = data.map((product) => {
      product.isBestValue = false;
      product.isActive = false;
      product.sizeText = '';

      if (product.model == isBestValue.model) {
        product.isBestValue = true;
      }

      if (product.actionURL === window.location.pathname) {
        product.isActive = true;
      }

      if (product.ppuVolume.includes('UNI')) {
        const sizeText = variantOptions.find((sizeOption) => sizeOption.sku == product.model).size;
        product.sizeText = sizeText;

        // const sizeTextLong = variantOptions.find((sizeOption) => sizeOption.sku == product.model).size;
        // let result = sizeTextLong.match(/[a-zA-Z]+/)[0];
        // let singularResult = result.endsWith('s') ? result.slice(0, -1) : result;
        const fallbackMsg = product.pricePerUnit.replace('UNI', ` UNI`);
        product.pricePerUnit = fallbackMsg;
      }

      if (product.pricePerUnit.includes('�')) {
        const pricePerUnitText = product.pricePerUnit.replace('�', '£');
        product.pricePerUnit = pricePerUnitText;
      }

      return product;
    });

    //sort data by price with lowest first
    modifiedData.sort((a, b) => a.currentPrice - b.currentPrice);

    //console.log('modifiedData ~ modifiedData:', modifiedData);

    //render options

    if (modifiedData.length <= 1) return;

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (VARIATION == 'control') {
      const activeVariant = modifiedData.find((variant) => variant.isActive);
      const currSize = activeVariant.sizeText || activeVariant.ppuVolume;

      fireBootsEvent(`Variant products could be shown on page Currentsize - ${currSize}`, true, eventTypes.experience_render, {
        render_element: elementTypes.Variant_Selector,
        action_detail: `Sizes could be shown on page - ${currSize}`,
      });
      return;
    }

    const attachPoint = document.querySelector('.shopperActions');

    if (!attachPoint) return;

    const variantOptionsHTML = modifiedData.map((variantData) => variantOption(variantData)).join('');

    //wrap in container div
    const containerDiv = document.createElement('div');
    containerDiv.classList.add(`${ID}-size-container`);
    containerDiv.innerHTML = variantOptionsHTML;

    attachPoint.insertAdjacentElement('beforebegin', containerDiv);

    let currSize = document.querySelector(`.${ID}-current .${ID}-sizevalue`).innerText;

    fireBootsEvent(`Variant products shown on page Currentsize - ${currSize}`, true, eventTypes.experience_render, {
      render_element: elementTypes.Variant_Selector,
      action_detail: `Sizes shown on page - ${currSize}`,
    });

    const bestValElem = document.querySelector(`.${ID}-bestvalue`);
    bestValElem.addEventListener('mouseenter', () => {
      fireBootsEvent('Mouse enter - best value shown', true, eventTypes.experience_action, {
        action: actionTypes.hover,
        action_detail: 'Mouse enter - best value shown',
      });
    });
  });
};

export default () => {
  const { ID, VARIATION } = shared;

  const testID = `${ID}|Upsizer Vitamins`; // same as triggers.js
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

    if (target.closest(`.${ID}-size`)) {
      const isBestValue = target.closest(`.${ID}-size`).classList.contains(`${ID}-bestvalue`);
      fireBootsEvent(`Click - ${isBestValue ? 'Best value' : ''} size button clicked`, true, eventTypes.experience_action, {
        action: actionTypes.click_product,
        action_detail: `Click - ${isBestValue ? 'Best value' : ''} size button clicked`,
      });
    }
  });

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  init();
};
