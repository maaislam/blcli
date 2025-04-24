/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup, getPageData } from './services';
import shared from './shared';
import settings from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events, observer } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  let stockHolder, colvarID, prodData, productID, productSKU;
  

  const getUrlParam = (name, url) => {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,'\\\]');
    const regexS = `[\\?#&]${name}=([^&#]*)`;
    const regex = new RegExp(regexS);
    const results = regex.exec(url);
    return results == null ? null : results[1];
  };

  const showMessage = (stockMessage) => {

    if(document.querySelector('.stock-holder')) {
      // already on the page, just needs updated.
      stockHolder.innerHTML = stockMessage;
    } else {
      // not shown yet, needs added to page.
      stockHolder = document.createElement('div');
      stockHolder.classList.add('stock-holder');
      stockHolder.innerHTML = stockMessage;
      let sizeHolder = document.querySelector('.BasketWishContainer');
      sizeHolder.prepend(stockHolder);
    }
  }

  const removeMessage = () => {
    // remove the element
    stockHolder.parentElement.removeChild(stockHolder);
  }

  const buildStockLogic = (stockQuant) => {
    let stockMessage = "";
    if(stockQuant > 0 && stockQuant <= 20) {
      // if the stock is between 1-20
      if(stockQuant >= 1 && stockQuant <= 10) {
        events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, 'reports stock quantity between 1 and 10, displays RUNNING LOW');
        stockMessage = "<p class='highlight-text'><span class='boldtext'>RUNNING LOW</span> - Less than 10 available</p>"; 
      }
      else if(stockQuant >= 11 && stockQuant <= 20) {
        events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, 'reports stock quantity between 11 and 20, displays HURRY Selling fast');
        stockMessage = "<p class='highlight-text'><span class='boldtext'>HURRY</span> - Selling fast</p"; 
      }
      // show the message
      showMessage(stockMessage);
      
    } else if(stockQuant == 0) {
      // if stock is zero, don't show, remove any existing, and fire event
      events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, 'reports stock quantity of 0, experiment not shown');
      if(document.querySelector('.stock-holder')) {
        removeMessage();
      }
    } else {
      // if stock is 21+, don't show, remove any existing, and fire event
      events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, 'reports stock quantity of over 21, experiment not shown');
      if(document.querySelector('.stock-holder')) {
        removeMessage();
      }
    }

  }

  const getProductDetails = (colCode) => {

    let colourCode;
    // set up the colour code
    if(colCode == null) {
      if(getUrlParam('colcode')) {
        // if there is a URL param, use that
        colourCode = getUrlParam('colcode');
      } else {
        // if not, grab colour variant ID from datalayer
        colourCode = prodData.colourVariantId;
      }     
    } else {
      // if value passed, use that value
      colourCode = colCode;
    }

    let atbButton = document.querySelector('#aAddToBag > span');
    if(atbButton.innerText == "PRE-ORDER NOW") {
      events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, 'this product is pre-order, not relevant');
      return false;
    }

    colvarID = colourCode;
    productID = prodData.productSequenceNumber;
    productSKU = colvarID + "-" + productID;
    window.DY.ServerUtil.getProductsData([productSKU], ['daily'], "", true, function(err, res) {
      let colourStockQuant = 0;
      colourStockQuant = res[productSKU].productData.stock_quantity;
      console.log("product SKU: "+productSKU+ " -- colour stock quant: "+colourStockQuant);
      buildStockLogic(colourStockQuant);
    });

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
      prodData = getPageData();
      // initial run for when user lands on the page
      getProductDetails();

      // event handlers to determine if the colour has been changed
      const colourButtons = document.querySelectorAll('#ulColourImages > li');
      [].slice.call(colourButtons).forEach((colourButton) => {
        colourButton.addEventListener('click', (e) => {
          // grab colour variant of clicked button and re-process
          colvarID = e.target.getAttribute('data-colvarid');
          events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, 'colour option checked, re-calculating');
          getProductDetails(colvarID);
          
        }, false);
      });
    });




  

};

