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
import { events, observer, logMessage } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

const { ID, VARIATION } = shared;

let stockHolder, colvarID, prodData, productID, productSKU;

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

  if(document.querySelector('.SD-213-stock-holder')) {
    // already on the page, just needs updated.
    stockHolder.innerHTML = "<div class='SD-213-stock-inner'>"+stockMessage+"</div>";
  } else {
    
    let stockHolderHTML = `
      <div class="SD-213-stock-holder">
        <div class="SD-213-stock-inner">${stockMessage}</div>
      </div>
    `;

    let sizeHolder = document.querySelector('.BasketWishContainer');
    sizeHolder.insertAdjacentHTML('beforebegin', stockHolderHTML);

    stockHolder = document.querySelector('.SD-213-stock-holder');
  }
}

const removeMessage = () => {
  // remove the element
  stockHolder.remove();
}

const buildStockLogic = (stockQuant) => {
  let stockMessage = "";
  if(stockQuant > 0 && stockQuant <= 20) {
    // if the stock is between 1-20
    if(stockQuant >= 1 && stockQuant < 10) {
      fireEvent('reports stock quantity between 1 and 9, displays RUNNING LOW');
      stockMessage = "<p class='highlight-text'><svg class='clocksvg' id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='-1 -1 26.19 26.19'><defs><style>.cls-1,.cls-2{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:2.5px;}.cls-2{stroke-width:2.5px;}</style></defs><circle class='cls-1' cx='12.09' cy='12.1' r='11.2'/><polyline class='cls-2' points='10.81 6.75 10.81 14.05 17.75 14.05'/></svg><span class='boldtext'>RUNNING LOW</span> - Less than 10 available</p>"; 
    }
    else if(stockQuant >= 10 && stockQuant <= 20) { 
      fireEvent('reports stock quantity between 10 and 20, displays HURRY Selling fast');
      stockMessage = "<p class='highlight-text'><svg class='clocksvg' id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='-1 -1 26.19 26.19'><defs><style>.cls-1,.cls-2{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:2.5px;}.cls-2{stroke-width:2.5px;}</style></defs><circle class='cls-1' cx='12.09' cy='12.1' r='11.2'/><polyline class='cls-2' points='10.81 6.75 10.81 14.05 17.75 14.05'/></svg><span class='boldtext'>HURRY</span> - Selling fast</p"; 
    }

    if(VARIATION == "control") {
      return;
    }

    // show the message
    showMessage(stockMessage);
    
  } else if(stockQuant == 0) {
    // if stock is zero, don't show, remove any existing, and fire event
    fireEvent('reports stock quantity of 0, experiment not shown');
    if(document.querySelector('.SD-213-stock-holder')) {
      removeMessage();
    } 
  } else {
    // if stock is 21+, don't show, remove any existing, and fire event
    fireEvent('reports stock quantity of over 21, experiment not shown');
    if(document.querySelector('.SD-213-stock-holder')) {
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
    fireEvent('this product is pre-order, not relevant');
    return false;
  }

  let stockQuant = window?.DY?.feedProperties?.stock_quantity;
  logMessage("product SKU: "+productSKU+ " -- colour stock quant: "+stockQuant);
  buildStockLogic(stockQuant);

}

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // start experiment
  // run poller to wait on DataLayer & DY
  pollerLite([
    () => {
      return window?.DY?.feedProperties?.stock_quantity;
    },
    () => {
      if(typeof getPageData() !== 'undefined') {
        return true;
      }
    }],
    () => {
      prodData = getPageData();
      // initial run for when user lands on the page
      // check for dropship product
      if(document.querySelector('.dropShipSupplierInfoSummary #supplierLogo') && document.querySelector('.dropShipSupplierInfoSummary #supplierLogo').innerText == "") {
        getProductDetails();
        // event handlers to determine if the colour has been changed
        const colourButtons = document.querySelectorAll('#ulColourImages > li');
        [].slice.call(colourButtons).forEach((colourButton) => {
          colourButton.addEventListener('click', (e) => {
            // grab colour variant of clicked button and re-process
            colvarID = e.currentTarget.getAttribute('data-colvarid');
            fireEvent('colour option checked, re-calculating');
            getProductDetails(colvarID);
            
          }, false);
        });
      } else {
        logMessage("Dropship product, test exits");
        return false;
      }

      
    });




  

};

