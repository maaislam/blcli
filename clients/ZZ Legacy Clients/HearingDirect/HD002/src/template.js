/* eslint-disable */
/*
* IMPORTANT!
* Do not edit this test directly in this platform
* Modify the src files in the experiments repository 
*/

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import copy from './lib/copy';

let VARIATION = null;
if(typeof HD02VARIATION != 'undefined') {
    VARIATION = HD02VARIATION;
} else {
    VARIATION = 1;
} 

// HD002 - Experiment Title
const HD002 = (() => {
  
  let $ = null;
 
	// Experiment code
	const activate = () => {
    if(document.body.classList.contains('HD007')) {
      return;
    }
		document.body.classList.add('HD002');
		
    _gaq.push(['_trackEvent', 'HD002', 'active', 'experiment is active', null, true]);
    
    const url = window.location.pathname;
    const isProductPage = url.match(/((\/)|(\/)[\w]{2}(\/))[\w]+(-).*(.html).*|(\/)(product).*/);

    // control
    if (VARIATION == 1) {
      if(isProductPage && !localStorage.getItem('did-visit-a-non-product-page')) {
        _gaq.push(['_trackEvent', 'HD002', 'is-control-user', 'Control', null, true]);
      } else {
        localStorage.setItem('did-visit-a-non-product-page', 1);
        // and bail out
        return
      }
    }

    // v1 
    if (VARIATION == 2) {
      if(isProductPage && !localStorage.getItem('did-visit-a-non-product-page')) {
        _gaq.push(['_trackEvent', 'HD002', 'is-variation-user', 'Variation', null, true]);
        /*  
        *	Determine which country 
        */ 
        const whichCountry = () => {
          const url = window.location.pathname;
          const usa = url.match('/us/');
          let country = 'gb';
          if (usa) {
            country = 'us';
          }
          return country
        };  
        const country = whichCountry();
        

        /*
        *	Append newly created elements
        */
        const appendEl = (el, ref) => {
          ref.insertAdjacentHTML('beforeend', el);
        }

        /*
        *	Get copy from copy.js
        */
        const text = copy;

        

        /*
        *	Build popup
        */
        const buildPopup = (lang, text) => {
          const popupHTML = `
            <div class="hd02-popup">
              <div class="hd02-popup--container">
                <div class="hd02-popup--wrap">
                  <div class="hd02-close">
                    <span></span>
                    <span></span>
                  </div>
                  
                  <img itemprop="logo" src="https://www.hearingdirect.com/skin/frontend/rwd/hearingdirect/images/hearing-direct-logo.png" alt="Hearing Direct">

                  <img src="${text['popup'][country]['flag']}" alt="flag">

                  <p>${text['popup'][country]['first']}</p>

                  <ul class="hd02-ticklist">
                    <li>${text['popup'][country]['listOne']}</li>
                    <li>${text['popup'][country]['listTwo']}</li>
                    <li>${text['popup'][country]['listThree']}</li>
                  </ul>

                  <p>${text['popup'][country]['last']}</p>
                </div>
              </div>
            </div>
          `;
          return popupHTML;
        }
        const popup = buildPopup(country, text);
        const popupRef = document.querySelector('body');
        const popupSeen = utils.getCookie('productPopup');

        if (popupRef && !popupSeen) {
          appendEl(popup, popupRef);
          _gaq.push(['_trackEvent', 'HD002', 'Popup', 'Popup is displayed', null, true]);
          utils.setCookie('productPopup', '1', 790);
        }

        /* 
        *	Control popup
        */
        const popupControl = (() => {
          const closeBtn = document.querySelector('.hd02-popup .hd02-close');
          const popup = document.querySelector('.hd02-popup');
          const popupWrap = document.querySelector('.hd02-popup .hd02-popup--wrap');

          if (popup) {
            closeBtn.addEventListener('click', function() {
              _gaq.push(['_trackEvent', 'HD002', 'Click', 'User closed popup', null, true]);
              popup.classList.add('hd02-close-popup');
            });
            
      
            // Click outside element.
            document.addEventListener('click', function(e) {
              const isClickInside = popupWrap.contains(e.target);
      
              if (!isClickInside) {
                popup.classList.add('hd02-close-popup');
              }
            });
          }
          
        })();
      } else {
        localStorage.setItem('did-visit-a-non-product-page', 1);
        // and bail out
        return
      }
    }

	}; 

	 

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('HD002', 'Variation 1');
		activate();
	});

	const poller = UC.poller([
    () => !!window.jQuery,
    ".product-info",
		".catalog-product-view",
	], () => {
		 
		$ = window.jQuery;

		triggers();
	});

})();
