/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { productsSapArr, productsColourSapArr } from './files/data';
import { findNumberAndContainer } from './files/findNumberAndContainer';

const { ID, VARIATION } = shared;
let linkedProductsArr = [];
let spaNumber;
let productListHtml = ``;

const init = () => {

  spaNumber = Number(window.location.pathname?.split('-')?.pop());

  if (!isNaN(spaNumber)) {
    const result = findNumberAndContainer(productsSapArr, spaNumber);
    if (result) {
      setup();
      fireEvent('Conditions Met');

      if (window.usabilla_live) {
        window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
      }

      if (VARIATION == 'control') {
        return;
      }

      linkedProductsArr = result.container;
      

      
      

      main();
    }
  }
};

function fetchProductData(sapCode) {
  return fetch(`https://www.boots-optimisation.co.uk/prod-info/model/${sapCode}`).then((response) => response.json());
}


async function main() {
  try {
    const promises = linkedProductsArr.map(fetchProductData);
    const results = await Promise.all(promises);

    results.forEach((data, index) => {
      if (data[0] !== undefined) {

        let SAPCode = data[0].model;
        let actionURL = data[0].actionURL;
        let referenceImageURL = data[0].referenceImageURL;

        let currProdColour = '';

        productsColourSapArr.forEach((item) => {
          if (item[0] == SAPCode) {
            currProdColour = item[1].toLowerCase();
          } 
        });

        if (SAPCode) {
          let productHtml = `
              <a class="${ID}-product-link" href="${actionURL}">
                <div class="${ID}-product-image-holder"><img class="${ID}-product-image ${spaNumber == SAPCode ? 'active-image' : ''}" src="${referenceImageURL}"></div>
                ${currProdColour !== '' ? `<p class="${ID}-product-colour">${currProdColour}</p>` : ''}              </a>`;
          productListHtml += productHtml;
        }
      }
    });

    if (!document.querySelector(`.${ID}-image-container`)) {
      let linkedProductMarkup = `<div class="${ID}-image-container">${productListHtml}</div>`;
      pollerLite(['#estore_pdp_trcol_2'], () => {
        document.querySelector('#estore_pdp_trcol_2').insertAdjacentHTML('afterend', linkedProductMarkup);
      })

    }
  } catch (error) {
    console.error('THE ERROR', error);
  }
}

export default () => {
  init();

  document.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('.BO274-product-link')) {
      fireEvent('Customers click the linked products.');
    }
  });
};
