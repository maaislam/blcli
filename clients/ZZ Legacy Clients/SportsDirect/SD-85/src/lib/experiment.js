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
import { events, observer, logMessage } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  let notificationHolder, colvarID, prodData, productID, productSKU, productTimeout;
  
  logMessage("SD-85");

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

  const removeMessage = () => {
    // remove the element
    notificationHolder.remove();
  }

  const showSocialProof = (views) => {

    if(document.querySelector('.SD-85-social-notification')) {
      notificationHolder.remove();
    } 

    let socialNotificationHTML = `
        <div class="SD-85-social-notification">
          <svg class="SD-85-eye-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path fill="#666" d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/></svg>
          <p> <span class="SD-85-boldtext">${views}</span> people have viewed this in the past <span class="SD-85-boldtext">24 hours</span> </p>
          <a href="#" id="SD-85-hide-notification" class="SD-85-hide-notification"><svg class="SD-85-close-icon" height="14px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="14px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg></a>
        </div>
      `;

    let imageContainer = document.getElementById('productImageContainer');
    imageContainer.insertAdjacentHTML('afterbegin', socialNotificationHTML);

    notificationHolder = document.querySelector('.SD-85-social-notification');

    let hideNotification = document.getElementById('SD-85-hide-notification');

    hideNotification.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, 'user closed the social notification with the close arrow');
      notificationHolder.classList.add('fading');
      let removeTimeout = setTimeout(() => {
        notificationHolder.remove();
      }, 500);
    });


    clearTimeout(productTimeout);
    productTimeout = setTimeout(() => {

      notificationHolder.classList.add('fading');
      let removeTimeout = setTimeout(() => {
        notificationHolder.remove();
      }, 500);

    }, 2000);

    

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

      if(typeof res !== undefined || res !== null) {
        let viewsToday = 0;
        viewsToday = res[productSKU].productInterest.view.daily;
        logMessage("product SKU: "+productSKU+ " -- views today: "+viewsToday);
        if(viewsToday > 100) {
          setTimeout(() => {
            showSocialProof(viewsToday);
            events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, 'social proof notification shown, views on product in previous 24hrs: '+viewsToday);
          }, 2500);
          
        }
      } 
      
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
      // check for dropship product
      if(document.querySelector('.dropShipSupplierInfoSummary #supplierLogo') && document.querySelector('.dropShipSupplierInfoSummary #supplierLogo').innerHTML == "") {
        getProductDetails();
        // event handlers to determine if the colour has been changed
        const colourButtons = document.querySelectorAll('#ulColourImages > li');
        [].slice.call(colourButtons).forEach((colourButton) => {
          colourButton.addEventListener('click', (e) => {
            // grab colour variant of clicked button and re-process
            colvarID = e.currentTarget.getAttribute('data-colvarid');
            events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, 'colour option checked, re-calculating');
            getProductDetails(colvarID);
            
          }, false);
        });
      } else {
        logMessage("Dropship product, test exits");
        return false;
      }

      
    });




  

};

