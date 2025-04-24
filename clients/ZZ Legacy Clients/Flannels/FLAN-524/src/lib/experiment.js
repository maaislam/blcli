/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, getCookie, setCookie, logMessage, pollerLite } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

let prodData;

const fireAndLogEvent = (event) => {
  logMessage(event);
  fireEvent(event, true);
}

const getPageData = () => {

	let dataObject;
	for (let i = 0; i < window.dataLayer.length; i += 1) {
	  const data = window.dataLayer[i];
	  if (typeof data === 'object' && data.event && data.event === 'FLAN_onLoad') {
	    dataObject = data;
	    break;
	  }
	}
	return dataObject;

}

const closePopup = () => {

  let bagAlertHolder = document.querySelector(`.${ID}-bag-alert`);

  bagAlertHolder.remove();

  document.documentElement.classList.remove(`${ID}-noscroll`);


}

const createModal = (item) => {

  document.documentElement.classList.add(`${ID}-noscroll`);

  let hideCartButton = false;
  if(window.location.href.indexOf('cart') > -1) {
    hideCartButton = true;
  }

  let hidePDButton = false;
  if(window.location.href == item.productData.url) {
    hidePDButton = true;
  }

  let modalHTML = `

    <div class="${ID}-bag-alert ${ID}-bag-alert-holder">
    
      <a href="#" id="${ID}-section-close" class="${ID}-section-close-link"> <svg height='17px' width='17px' fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 100 100"><defs><g id="a"><path fill="#000000" stroke="#000" stroke-width="3" d=" M 81.75 21.75 Q 82.503515625 21.0390625 82.5 20 82.503515625 18.9607421875 81.75 18.2 81.0390625 17.4962890625 80 17.5 78.9607421875 17.4962890625 78.2 18.2 L 50 46.45 21.75 18.2 Q 21.0390625 17.4962890625 20 17.5 18.9607421875 17.4962890625 18.2 18.2 17.4962890625 18.9607421875 17.5 20 17.4962890625 21.0390625 18.2 21.75 L 46.45 50 18.2 78.2 Q 17.4962890625 78.9607421875 17.5 80 17.4962890625 81.0390625 18.2 81.75 18.9607421875 82.503515625 20 82.5 21.0390625 82.503515625 21.75 81.75 L 50 53.55 78.2 81.75 Q 78.9607421875 82.503515625 80 82.5 81.0390625 82.503515625 81.75 81.75 82.503515625 81.0390625 82.5 80 82.503515625 78.9607421875 81.75 78.2 L 53.55 50 81.75 21.75 Z"></path></g></defs><g transform="matrix( 1, 0, 0, 1, 0,0) "><use xlink:href="#a"></use></g></svg> </a>
    
      <div class="${ID}-bag-alert-detail">

        <div class="${ID}-bag-alert-detail--text">
        
          <h2> Bag Alert </h2>

          <p class="${ID}-sellingtext"> Selling fast! </p>
    
          <p> ${item.productInterest.view.daily} views in the last 24 hours </p>
        
        </div>

        <div class="${ID}-bag-alert-detail--image">

          <a href="${item.productData.url}"><img src="${item.productData.image_url}" alt="${item.productData.name} image" /></a>

        </div>
        
      </div>

      <div class="${ID}-bag-alert-links">
      
        <a href="/checkoutselect" class="${ID}-bag-alert-links--primary">Secure Checkout</a>

        <a href="/cart" class="${ID}-bag-alert-links--secondary ${hideCartButton == true ? `${ID}-hidden` : ``}">View Bag</a>

        <a href="${item.productData.url}" class="${ID}-bag-alert-links--tertiary ${hidePDButton == true ? `${ID}-hidden` : ``}">View product details</a>

      </div>

    </div>  
  
  `;

  let insertionPoint = document.getElementById('divBag');

  insertionPoint.insertAdjacentHTML('afterend', modalHTML);

  setCookie(`${ID}-seen-popup`, true);

  fireAndLogEvent('Visible - modal displayed');

  let closeBag = document.getElementById('clsBasketMob');

  closeBag.click();

  let closeModal = document.getElementById(`${ID}-section-close`);

  closeModal.addEventListener('click', (e) => {

    closePopup();

    fireAndLogEvent('Click - user closed the modal using the close X');

  })

  document.getElementById('HeaderGroup').addEventListener('click', (e) => {
    if (document.documentElement.classList.contains(`${ID}-noscroll`)) {
      closePopup();

      fireAndLogEvent('Click - user closed the modal by clicking outside it');
    } 
  })

  let primaryCTA = document.querySelector(`.${ID}-bag-alert-links--primary`);
  let secondaryCTA = document.querySelector(`.${ID}-bag-alert-links--secondary`);
  let tertiaryCTA = document.querySelector(`.${ID}-bag-alert-links--tertiary`);

  primaryCTA.addEventListener('click', () => {
    fireAndLogEvent('Click - user clicked on Secure Checkout button');
  })

  secondaryCTA.addEventListener('click', () => {
    fireAndLogEvent('Click - user clicked on View Bag button');
  })

  tertiaryCTA.addEventListener('click', () => {
    fireAndLogEvent('Click - user clicked on View Product Details button');
  })

  let timeout = setTimeout(() => {

    closePopup();

    fireAndLogEvent('Interaction - modal closed automatically after 10s');

  }, 10000);

}

const checkBasketItems = () => {

    const request = new XMLHttpRequest();
    request.open('GET', 'https://www.flannels.com/cart', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        
        const data = request.responseText;
        // const sizeVariantId = request.responseURL;
        if (data) {
          let brandPage = document.createElement('div');

          brandPage.classList.add('hidden')
          brandPage.id = "no-visual";
          brandPage.innerHTML = data;

          let allScriptBlocks = [].slice.call(brandPage.querySelectorAll('script[type="text/javascript"]'));

          allScriptBlocks = allScriptBlocks.filter((block) => {

            if(block.outerHTML.indexOf('recommendationContext') > -1) {
              return true;
            } else {
              return false;
            }

          });

          let dyString = allScriptBlocks[0].innerHTML;
          let basketData = dyString.substring(dyString.indexOf('data') + 7, dyString.length);
          basketData = basketData.substring(0, basketData.indexOf(']'));
          basketData = basketData.replaceAll('"', '');
          basketData = basketData.split(',');

          window.DY.ServerUtil.getProductsData(basketData, ['daily'], "", true, function(err, res) {
            let allItems = Object.values(res);

            allItems = allItems.filter((item) => {

              if(item.productInterest.view.daily > 20) {
                return true;
              } else {
                return false;
              }

            })

            logMessage(allItems);

            if(allItems.length == 0) {

              fireAndLogEvent('No items with over 20 views found in user basket');

            } else {

              fireAndLogEvent('Item with over 20 views found')

              // -----------------------------
              // If control, bail out from here
              // -----------------------------
              if(shared.VARIATION == 'control') {
                return;
              }



              allItems = allItems.sort((a, b) => b.productInterest.view.daily - a.productInterest.view.daily);  
              createModal(allItems[0]);
              
            }

            

          });


        }
      } else {
        // We reached our target server, but it returned an error
        fireAndLogEvent('ERROR - failed to retrieve basket info from basket page');
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
  
}

const startExperiment = () => {

  if(!getCookie(`${ID}-seen-popup`)) {

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
        checkBasketItems();
      });

  } 

  



  


}


export default () => {
  setup();
  
  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  startExperiment();

}
