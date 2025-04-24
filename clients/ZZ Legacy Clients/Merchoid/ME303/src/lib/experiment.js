/**
 * ME303 - Email Sign Up Improvements
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.merchoid.com/eu/batman-wayne-s-millions-batarang-folding-money-clip/
 * 
 * https://www.merchoid.com/eu/assassin-s-creed-valhalla-longsleeve-t-shirt/
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getCookie, pollerLite, poller } from '../../../../../lib/utils';
import formSubmit from '../formSubmit';
import EmailPopupDesktop from './emailBoxDesktop';
import EmailPopupMobile from './emailBoxMobile';
import { userSubscribed, getProductPrice, isUserOnPdpAndEligibleForDiscount, applyDiscountCode, generateLoader, checkApplyCodeCtaExists } from './helpers';
import { generateCountdownTimer } from './countdownTimer';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  if (window.location.pathname.indexOf('/checkout/cart/') == -1) {
    const createOverlay = () => {
      document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
    }
    
    if(!getCookie(`${ID}-emailSignUp`)) {
      if(!localStorage.getItem(`${ID}-emailShow`)){
        if (window.innerWidth > 767) {
          // --- DESKTOP
          createOverlay();
          new EmailPopupDesktop();
          formSubmit();
        } else {
          // --- MOBILE
          createOverlay();
          new EmailPopupMobile();
          formSubmit();
        }

        fireEvent('Visible - Email Sign Up Pop Up');
      }
    }
  }
  

  
  if (VARIATION == '1') {
    pollerLite([`.${ID}-emailModal.${ID}-success`], () => {
      userSubscribed();
      fireEvent('Conditions Met - User Subscribed');
    });
  } else if (VARIATION == '2' || VARIATION == '4') {
    /*** all Pages ***/
    if (window.location.pathname.indexOf('/checkout/cart/') == -1) {
      if (localStorage.getItem(`${ID}-subscribed-user-v${VARIATION}`) !== null
      && localStorage.getItem(`${ID}-discount-code`) !== null) {

        isUserOnPdpAndEligibleForDiscount();
      } else {
        pollerLite([`.${ID}-emailModal.${ID}-success`], () => {
          userSubscribed();
          fireEvent('Conditions Met - User Subscribed');

          isUserOnPdpAndEligibleForDiscount();
        });
      }
    /*** on Basket Page ***/
    } else if (window.location.pathname.indexOf('/checkout/cart/') > -1
      && localStorage.getItem(`${ID}-discount-code`) !== null
      && JSON.parse(localStorage.getItem(`${ID}-apply-discount-code`)) == true) {
        generateLoader();

        window.addEventListener('load', function () {

          pollerLite([`.minicart-wrapper__summary-subtotal span.price`], () => {
            applyDiscountCode();
          });

          setTimeout(() => {
            window.location.reload();
          }, 12000);
          
        });
        
       
    }
    
    
  } else if (VARIATION == '3') {
    /*** all Pages ***/
    if (window.location.pathname.indexOf('/checkout/cart/') == -1) {
      if (localStorage.getItem(`${ID}-subscribed-user-v3`) !== null
      && localStorage.getItem(`${ID}-discount-code`) !== null) {
        isUserOnPdpAndEligibleForDiscount();
      } else {
        pollerLite([`.${ID}-emailModal.${ID}-success`], () => {
          generateCountdownTimer(JSON.parse(localStorage.getItem(`${ID}-countdown-timer`)));
          userSubscribed();
          fireEvent('Conditions Met - User Subscribed');

          isUserOnPdpAndEligibleForDiscount();
        });
      }
    } 
    /**
     * @desc If user has subscribed, then add Countdown Bar
     */
    if (localStorage.getItem(`${ID}-discount-code`) !== null
    && localStorage.getItem(`${ID}-subscribed-user-v3`) !== null
    // && localStorage.getItem(`${ID}-apply-discount-code`) == 'true'
    && window.location.pathname.indexOf('/checkout/cart/') == -1) {
      if (localStorage.getItem(`${ID}-countdown-timer`) !== null) {
        generateCountdownTimer(JSON.parse(localStorage.getItem(`${ID}-countdown-timer`)));
        fireEvent('Visible - Countdown Timer');
      } else {
        generateCountdownTimer(null);
        fireEvent('Visible - Countdown Timer');
      }
      
    } else if (window.location.pathname.indexOf('/checkout/cart/') > -1
    && localStorage.getItem(`${ID}-discount-code`) !== null
    && JSON.parse(localStorage.getItem(`${ID}-apply-discount-code`)) == true) {
      generateLoader();

      window.addEventListener('load', function () {
        
        pollerLite([`.minicart-wrapper__summary-subtotal span.price`], () => {
          applyDiscountCode();

          setTimeout(() => {
            window.location.reload();
          }, 12000);
        });
        
      });
    }
  }
  
};
