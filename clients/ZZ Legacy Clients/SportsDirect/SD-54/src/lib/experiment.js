/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

const getAllBasketItems = () => {

  let basketHolder = document.getElementById('gvBasketDetails');
  let basketItems = basketHolder.querySelectorAll('.productLine');
  return basketItems;

}

const getPageData = () => {

	let dataObject;
	for (let i = 0; i < window.dataLayer.length; i += 1) {
	  const data = window.dataLayer[i];
	  if (typeof data === 'object' && data.event && data.event === 'SD_onLoad') {
	    dataObject = data;
	    break;
	  }
	}
	return dataObject;

}

export default () => {
  setup();

  fireEvent('Conditions Met');

  if(VARIATION == "control") {
    return;
  }

  // start experiment
  // run poller to wait on DataLayer & DY
  pollerLite([
    () => {
      return window?.DY?.ServerUtil?.getProductsData;
    },
    () => {
      if(typeof getPageData() !== 'undefined') {
        return true;
      }
    }],
    () => {

      let pageData = getPageData();
      let basketItems = getAllBasketItems();
      let allDYData = window.DY.itemsData;
      let iterator = 0;
      [].slice.call(basketItems).forEach((item, iterator) => {

        let href = item.querySelector('.productTitle').href;

        if(href != "") {

          let orderLinesProductSequenceNumbers = pageData.orderLinesProductSequenceNumberList.split("_");

          orderLinesProductSequenceNumbers = orderLinesProductSequenceNumbers.map((item) => {
            let newItem = item.substring(item.indexOf('=') + 1, item.length);
            return newItem;
          });

          let colvarID = href.substring(href.indexOf('#col') + 9, href.length).toUpperCase();
          let productID = orderLinesProductSequenceNumbers[iterator];
          let productSKU = colvarID + "-" + productID;

          let theDYData = allDYData.find(element => element.sku == productSKU);

          let stockQuant = theDYData.stock_quantity;
          if(stockQuant > 0 && stockQuant <= 10) {

            let stockMessageHTML = `<div class="${ID}-stock-message-holder"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="11" height="11" viewBox="0 0 11 11"><defs><style>.a{fill:#181EED;}.b{clip-path:url(#a);}</style><clipPath id="a"><rect class="a" width="11" height="11"/></clipPath></defs><g transform="translate(0 0)"><g class="b" transform="translate(0 0)"><path class="a" d="M11.009,5.754a5.254,5.254,0,1,0-5.254,5.254,5.26,5.26,0,0,0,5.254-5.254m-10.018,0A4.813,4.813,0,1,1,5.8,10.567,4.82,4.82,0,0,1,.991,5.754" transform="translate(-0.254 -0.254)"/><path class="a" d="M5.5,11A5.5,5.5,0,1,1,11,5.5,5.506,5.506,0,0,1,5.5,11M5.549.933A4.567,4.567,0,1,0,10.116,5.5,4.572,4.572,0,0,0,5.549.933M.491,5.5v0Zm0,0v0Z" transform="translate(0 0)"/><path class="a" d="M12.552,9.946H9.9V7h.491V9.455h2.161Z" transform="translate(-5.039 -3.562)"/><path class="a" d="M12.543,9.938H9.4V6.5h.982V8.955h2.161ZM9.891,9.446h0Z" transform="translate(-4.784 -3.308)"/></g></g></svg> <span class="${ID}-stock-message">LOW IN STOCK</span> </div>`;
            item.querySelector('.productsize').insertAdjacentHTML('afterend', stockMessageHTML);
            fireEvent(`Visible - reports stock quantity of ${stockQuant} on SKU: ${productSKU}, Low in Stock message shown`);
          } else if(stockQuant == 0) {
            // if stock is zero, don't show, remove any existing, and fire event
            fireEvent(`Interaction - reports stock quantity of 0 on SKU: ${productSKU}, experiment not shown`);
          } else {
            // if stock is 21+, don't show, remove any existing, and fire event
            fireEvent(`Interaction - reports stock quantity of over 11 on SKU: ${productSKU}, experiment not shown`);
          }
          

        } else {
          fireEvent('Interaction - experiment not run on this product, zero stock displayed on site');
        }

        iterator ++;

      });

    });

};

