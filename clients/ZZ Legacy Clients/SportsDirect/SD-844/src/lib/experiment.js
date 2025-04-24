/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, pollerLite, observer } from '../../../../../lib/utils';

const startExperiment = () => {
  if(shared.VARIATION !== "control") {
    pollerLite(['.cardPayment .paymentHeader'], () => {
      document.querySelector('.cardPayment .paymentHeader').click();
      fireEvent('Interaction - changes made', true);
    });
  }
  
}

export default () => {

  events.analyticsReference = window.ga ? 'ga' : '_gaUAT';

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  document.body.addEventListener('click', (e) => {

    if(e.target.type == "button" && e.target.id == "cardSubmit") {
      if(!e.target.closest('.formCompleteCTA').classList.contains('inactiveSubmit')) {
        fireEvent('Click - user has clicked on the place order CTA after successfully entering their details', true);
      } else {
        fireEvent('Click - user has clicked on place order CTA but nothing happens as they havent completed their CC details', true)
      }
    } else if(e.target.type == "button" && e.target.closest('li').classList.contains('paypalPayment')) {
      fireEvent('Click - user has clicked on the place order CTA for PayPal to go to Paypal', true);
    } else if(e.target.type == "button" && e.target.closest('li').classList.contains('applepayPayment')) {
      fireEvent('Click - user has clicked on the place order CTA for Apple Pay', true);
    }

  })

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  // observer to check URL changes and add card info if the CC section selected
  let lastUrl = location.href; 
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      if(url.indexOf('payment_method') > -1 && url.indexOf('credit_card') == -1 && url.indexOf('paypal') == -1 && url.indexOf('applepay') == -1) {
        startExperiment();
      }
      
    }

  }).observe(document, {subtree: true, childList: true});
  
  if(window.location.href.indexOf('payment_method') > -1) {
    startExperiment();
  }

  observer.connect(document.querySelector('.paymentSection.activeSection .innerContent'), () => {
    if(window.location.href.indexOf('payment_method') > -1) {
      startExperiment();
    }
  }, {
    config: {
      attributes: false,
      childList: true,
      subtree: false,
    }
  });
};
