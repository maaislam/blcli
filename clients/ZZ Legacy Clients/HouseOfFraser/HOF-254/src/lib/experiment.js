/**
 * HOF-254 - Continue to bag / back to plp
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.houseoffraser.co.uk/brand/jack-wills/forton-sherpa-collar-aviator-jacket-603364#colcode=60336499
 */
import { setup, fireEvent, clickEvents, getBagTotal, pageIsPlp } from './services';
import shared from './shared';
import { events, logMessage, setCookie, getCookie } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

const { ID, VARIATION } = shared;

// Force set analytics reference
events.analyticsReference = '_gaUAT';

const scrollToEl = (el) => {
  if (el) {
    el.scrollIntoView({behavior: "auto", block: "center", inline: "nearest"});
  }
}

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  let plpTitle = "Browsing";

  if (VARIATION == 'control') {
    fireEvent('Conditions Met - Control');
  } else if (VARIATION == '1') {
    fireEvent('Conditions Met - V1');

    const request = new XMLHttpRequest();

    if(document.referrer.indexOf('houseoffraser') > -1) {
      request.open('GET', document.referrer, true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          const div = document.createElement('div');
          const resp = request.responseText;
          div.innerHTML = resp;

          let plpName = div.querySelector('#lblCategoryHeader').innerText.trim();
          plpTitle = plpName;
        } 
      };

      request.send();

    }
    
    pollerLite(['.sizeButtonli.sizeVariantHighlight', '#divBagItems', '#aAddToBag',], () => {
      const addToBagCta = document.querySelector('#aAddToBag');

      addToBagCta.addEventListener('click', (e) => {
        // --- Check Go Back page
        let goBackLink = '';

        if (document.referrer !== '') {
          goBackLink = `<div class="${ID}-addedToBagMsg__footer" style="background-color: #EEEEEE;">
            <a class="${ID}-goBackLink" href="${document.referrer}" style="background-color: transparent;">Back to ${plpTitle}</a>
          </div>`;
        }
        // --- Check Size
        let sizeMessage = '';
        let sizeSelected = document.querySelector('.sizeButtonli.sizeVariantHighlight').getAttribute('data-text');
        if (sizeSelected.toLowerCase().indexOf('one size') == -1) {
          sizeMessage = `Size ${sizeSelected}`;
        }

        // --- Generate 'Added to Bag' Message
        const addedToBagContainer = `<div class="${ID}-addedToBagMsg__wrapper ImgButWrap">
          <div class="${ID}-addedToBagMsg__container">
            <div class="${ID}-addedToBagMsg__top">
              <span class="success-msg">Added To Your Bag</span>
              <p class="product-added">
                <svg height='15px' width='15px'  fill="#e10098" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><style type="text/css">.st0{fill:none;}</style><path class="st0" d="M26,26h48v48H26V26z"></path><path d="M33.3,71.3L11,49l-7.6,7.5l29.9,29.9l64.1-64.1l-7.5-7.5L33.3,71.3z"></path></svg>
                1 x ${document.querySelector('#lblProductBrand').innerText.trim()} ${document.querySelector('#lblProductName').innerText.trim()}
              </p>
              <p class="size-added">${sizeMessage}</p>
              <a class="${ID}-goToBag addToBag" href="/cart">
                  <span class="addToBagInner" data-addtobag="Go to your bag">Go to your bag</span>
              </a>
            </div>
          </div>
          ${goBackLink}
        </div>`;

        fireEvent(`Click - Product Added to Bag - ${window.location.pathname} - ${sizeMessage}`);

        if (!document.querySelector(`.${ID}-addedToBagMsg__wrapper`)) {
          document.querySelector('#addToWishListContainer').insertAdjacentHTML('afterend', addedToBagContainer);

          // let atbMessageWrapper = document.querySelector(`.${ID}-addedToBagMsg__wrapper`);
          scrollToEl(document.querySelector(`.${ID}-addedToBagMsg__wrapper`));

          fireEvent(`Visible - Added to Bag Message`);
          clickEvents();
        } else {
          document.querySelector(`.${ID}-addedToBagMsg__wrapper`).outerHTML = addedToBagContainer;

          // let atbMessageWrapper = document.querySelector(`.${ID}-addedToBagMsg__wrapper`);
          scrollToEl(document.querySelector(`.${ID}-addedToBagMsg__wrapper`));

          fireEvent(`Visible - Added to Bag Message`);
          clickEvents();
        }

        /**
         * @desc Checks Basket Total and Shows/Hides message
         */
        let bagTotal = getBagTotal();
    
        observer.connect(document.querySelector('#divBagItems'), () => {
          let updatedBagTotal = getBagTotal();

          if (updatedBagTotal > bagTotal) {
            bagTotal = getBagTotal();
          } else if (updatedBagTotal < bagTotal
            && document.querySelector(`.${ID}-addedToBagMsg__wrapper`)) {
            // --- Remove "Added to bag" message
            let addedToBagMsg = document.querySelector(`.${ID}-addedToBagMsg__wrapper`);
            addedToBagMsg.parentElement.removeChild(addedToBagMsg);
          }
          
        }, {
          throttle: 200,
          config: {
            attributes: true,
            childList: false,
            // subtree: true,
          },
        });
        
      });

    });



  }
  
  
  

};
