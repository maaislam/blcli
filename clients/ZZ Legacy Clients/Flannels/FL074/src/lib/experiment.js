/**
 * FL074 - Contextual error code
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events, setCookie, getCookie, deleteCookie } from '../../../../../lib/utils';
import { flatConfig, bdayFlatConfig } from './config';
import message from './message';

events.analyticsReference = '_gaUAT';


const activate = () => {
  setup();

  const { ID, VARIATION } = settings;

  if (VARIATION == 3) {
    events.send(ID, 'FL074 Control', 'FL074 Control is active');
    return false;
  } else {
    events.send(ID, `FL074 Variation 1`, 'FL074 Test is active');
  }

  console.log('RUN, ', VARIATION);

  let hasCode = false;
  let bdayCode = false;
  let bdayTreat = false;
  let isLoggedIn = true; // Just to not show the BIRTHDAYTREAT message by default
  let input,
    submitBtn,
    contBack,
    cartForm;


  const runFunc = () => {
    let hasCode = false;
    bdayCode = false;
    bdayTreat = false;
    isLoggedIn = true;
    
    
     // Input
    input.addEventListener('input', (e) => {
      let val = e.target.value;
      
      

      // Remove cookie if set
      if (getCookie('FL074-success')) {
        deleteCookie('FL074-success');
      }
      

      // If NOT logged in
      if (window.dataLayer && window.dataLayer[1] && window.dataLayer[1].visitorLoginState && window.dataLayer[1].visitorLoginState !== 'logged+in') {
        if (val == 'BIRTHDAYTREAT') {
          hasCode = true;
          bdayTreat = true;
          isLoggedIn = false;
          
        }
      }
      
      // If it's in the list, set it to true.
      if (bdayFlatConfig.indexOf(val) > -1) {
        hasCode = true;
        bdayCode = true;
      }

      // If it's in the list, set it to true.
      if (flatConfig.indexOf(val) > -1) {
        hasCode = true;
      }

    });

    const stopForm = (e) => e.preventDefault();
    // Subdue form
    
  


    // Submit Button
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // If the value inputted doesn't exist in the list
      if (!hasCode) {
        // Let it add // Ensure class is removed from body showing the messages.
        document.body.classList.remove('FL074-open');
        
        // cartForm.removeEventListener('submit', stopForm);

        return true; 
      } else { // Does exist,
        // window.onbeforeunload = function() {
        //   return "";
        // }
        if (VARIATION == 2 && !getCookie('FL074-success')) {
          e.preventDefault();
          // Show message
          

          message.init(document.body, null, false, bdayCode, bdayTreat, isLoggedIn);
    
          // Add Back Event
          pollerLite(['#FL074Checkout'], () => {
            message.addEvents(contBack);
          });
          pollerLite(['.GoBackPage'], () => {
            message.addEvents(contBack);
          });
        }
      }

      // Reset defaults
      hasCode = false;
    });
  }

   // On /Cart
   if (window.location.href == 'https://www.flannels.com/cart') {
    
    pollerLite([
      'input#promoCode',
      'a#btnApplyPromoCode',
      '.MainOrderSummary #divContinueSecurely.ImgButWrap a',
      '#main-content form',
    ], () => {
      input = document.querySelector('input#promoCode');
      submitBtn = document.querySelector('a#btnApplyPromoCode');
      contBack = document.querySelector('.MainOrderSummary #divContinueSecurely.ImgButWrap a');
      cartForm = document.querySelector('#main-content form');
      
      // submitBtn.removeEventListener('click');
      
      runFunc();
    });
  }

  // On /usevoucher
  if (window.location.href == 'https://www.flannels.com/checkout/usevoucher') {

    pollerLite([
      '.CheckInpBox input#txtCode',
      'input.ContinueOn',
    ], () => {
      input = document.querySelector('.CheckInpBox input#txtCode');
      submitBtn = document.querySelector('input.ContinueOn');
      contBack = document.querySelector('.ContBackGroup .GoBackPage');
  
      if (!contBack) {
        contBack = document.querySelector('.AddressContainBut .ContinueOn');
      }
      runFunc();
      
    });

  }


  if (VARIATION == 1) {
    // Change message
    pollerLite(['div[id*="PromoCodeApplication_divVoucherError"]'], () => {
      const errorEl = document.querySelector('div[id*="PromoCodeApplication_divVoucherError"]');
      errorEl.textContent = 'Discount code invalid. Currently we have none live on the site, so please enjoy checking out securely with us!';
    });
    pollerLite(['div[id*="ViewBasket_PromoCodeManager_divVoucherError"]'], () => {
      const errorEl = document.querySelector('div[id*="ViewBasket_PromoCodeManager_divVoucherError"]');
      errorEl.textContent = 'Discount code invalid. Currently we have none live on the site, so please enjoy checking out securely with us!';
    });
  }


  // Poll for errors
  // pollerLite(['div[id*="PromoCodeApplication_divVoucherError"]'], () => {
  //   // Hide error

  //   // Show message
  //   message.init(document.body);

  //   // Add Back Event
  //   pollerLite(['#FL074Checkout'], () => {
  //     message.addEvents(contBack);
  //   });

  // });

  // pollerLite(['div[id*="ViewBasket_PromoCodeManager_divVoucherError"]'], () => {
  //   // Hide error

  //   // Show message
  //   message.init(document.body);

  //   // Add Back Event
  //   pollerLite(['#FL074Checkout'], () => {
  //     message.addEvents(contBack);
  //   });

  // });
  

  // Poll for sucess - /usevoucher
  pollerLite(['span[id*="PromoCodeApplication_VoucherApplied"]'], () => {

    if (!getCookie('FL074-success')) {
      if (VARIATION == 2) {
        // Show message
        message.init(document.body, null, true);
    
        // Add Back Event
        pollerLite(['#FL074Checkout'], () => {
          message.addEvents(contBack);
        });
        pollerLite(['.GoBackPage'], () => {
          message.addEvents(contBack);
        });

        // Set cookie so only shows once
        setCookie('FL074-success', 'true', 1);
      }
    } else if (VARIATION == 1) {
      // V1 just change message.
      const errorEl = document.querySelector('span[id*="PromoCodeApplication_VoucherApplied"]');
      errorEl.textContent = '';
    }
  });


  // Poll for sucess - /Cart
  pollerLite(['.ProValue'], () => {
    if (!getCookie('FL074-success') && VARIATION == 2) {
      // Show message
      message.init(document.body, null, true);

      // Add Back Event
      pollerLite(['#FL074Checkout'], () => {
        message.addEvents(contBack);
      });
      
          // Set cookie so only shows once
          setCookie('FL074-success', 'true', 1);
    } else if (VARIATION == 1) {
      // V1 just change message.
      const errorEl = document.querySelector('.ProValue');
      errorEl.textContent = 'Your code has been successfully applied. Please continue to checkout';
    }
    
  });
};

export default activate;
