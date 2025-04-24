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
  
  logMessage("HOF-134");

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

  const showSocialProof = (number, socialType) => {

    if(document.querySelector('.HOF-134-social-notification')) {
      notificationHolder.remove();
    } 

    let iconHTML = "<svg class='HOF-134-eye-icon' xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><path fill='#666' d='M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z'/></svg>";
    if(VARIATION == 2) {
      iconHTML = "<svg class='HOF-134-eye-icon' version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='18' height='18' viewBox='0 0 395.025 395.025' style='enable-background:new 0 0 395.025 395.025;' xml:space='preserve'> <g> <path d='M357.507,380.982L337.914,82.223c-0.431-6.572-5.887-11.682-12.473-11.682h-54.69V62.5c0-34.462-28.038-62.5-62.5-62.5 h-21.495c-34.462,0-62.5,28.038-62.5,62.5v8.041h-54.69c-6.586,0-12.042,5.11-12.473,11.682L37.45,381.709 c-0.227,3.449,0.986,6.838,3.35,9.361c2.364,2.525,5.666,3.955,9.124,3.955h295.159c0.007,0,0.013,0,0.02,0 c6.903,0,12.5-5.596,12.5-12.5C357.601,382.004,357.57,381.488,357.507,380.982z M149.255,62.5c0-20.678,16.822-37.5,37.5-37.5 h21.495c20.678,0,37.5,16.822,37.5,37.5v8.041h-96.495V62.5z M63.27,370.025L81.272,95.542h42.983v11.154 c-8.895,4.56-15,13.818-15,24.482c0,15.164,12.336,27.5,27.5,27.5s27.5-12.336,27.5-27.5c0-10.664-6.105-19.922-15-24.482V95.542 h96.495v11.154c-8.896,4.56-15,13.818-15,24.482c0,15.164,12.336,27.5,27.5,27.5s27.5-12.336,27.5-27.5 c0-10.664-6.105-19.922-15-24.482V95.542h42.983l18.002,274.483H63.27z'/> </g> </svg>";
    }

    let socialNotificationHTML = `
        <div class="HOF-134-social-notification">
          <div class="HOF-134-social-notification-holder">
            ${iconHTML}
            <p> <span class="HOF-134-boldtext">${number}</span> others ${socialType == "views" ? 'viewed' : 'bought'} this in the past <span class="HOF-134-boldtext">24 hours</span> </p>
          </div>
          <div class="HOF-134-social-notification-close">
            <a href="#" id="HOF-134-hide-notification" class="HOF-134-hide-notification"><svg class="HOF-134-close-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15" height="15" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><path d="M500,442.7L79.3,22.6C63.4,6.7,37.7,6.7,21.9,22.5C6.1,38.3,6.1,64,22,79.9L442.6,500L22,920.1C6,936,6.1,961.6,21.9,977.5c15.8,15.8,41.6,15.8,57.4-0.1L500,557.3l420.7,420.1c16,15.9,41.6,15.9,57.4,0.1c15.8-15.8,15.8-41.5-0.1-57.4L557.4,500L978,79.9c16-15.9,15.9-41.5,0.1-57.4c-15.8-15.8-41.6-15.8-57.4,0.1L500,442.7L500,442.7z"/></g></svg></a>
          </div>
        </div>
      `;

    let imageContainer = document.getElementById('productImageContainer');
    imageContainer.insertAdjacentHTML('afterbegin', socialNotificationHTML);

    notificationHolder = document.querySelector('.HOF-134-social-notification');

    let hideNotification = document.getElementById('HOF-134-hide-notification');

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

    }, 4000); 

    

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
        let numberOfInteractions = 0;
        if(VARIATION == 2) {
          numberOfInteractions = res[productSKU].productInterest.purchase.daily;
        } else {
          numberOfInteractions = res[productSKU].productInterest.view.daily;
        }
        
        logMessage("product SKU: "+productSKU+ " -- purchases today: "+res[productSKU].productInterest.purchase.daily+" views today: "+res[productSKU].productInterest.view.daily);

        if(numberOfInteractions > 10 && VARIATION == 2) {
          setTimeout(() => {
            showSocialProof(numberOfInteractions, 'purchases');
            events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, 'social proof notification shown, purchases on product in previous 24hrs: '+numberOfInteractions);
          }, 2500);
        } else if(numberOfInteractions > 100 && VARIATION == 1) {
          setTimeout(() => {
            showSocialProof(numberOfInteractions, 'views');
            events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, 'social proof notification shown, views on product in previous 24hrs: '+numberOfInteractions);
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

      
    });




  

};

