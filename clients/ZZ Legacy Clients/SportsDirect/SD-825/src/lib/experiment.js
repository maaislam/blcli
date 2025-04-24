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

// Force set analytics reference

const { ID } = shared;

const startExperiment = () => {

  let newPaymentInfoHTML = `
  
    <div class="${ID}-payment">

      <h4>Accepted Cards</h4>
    
      <img src="https://www.sportsdirect.com/images/payment/payment-icons-2022-uk.svg" alt="payment icons SD" class="${ID}-payment--icons" />
    
    </div>
  
  `;

  pollerLite(['.cardPayment .paymentContent > h4'], () => {
    if(!document.querySelector(`.${ID}-payment`)) {
      let insertionPoint = document.querySelector('.cardPayment .paymentContent > h4');
      insertionPoint.classList.add(`${ID}-enterccheader`);
      insertionPoint.insertAdjacentHTML('beforebegin', newPaymentInfoHTML);

      fireEvent('Visible - card information displayed', true);
    }
  });

}

const checkProgress = (url) => {

  if(url.indexOf('#payment_method') > -1) {
    if(url.indexOf('credit_card') > -1 && !document.querySelector(`.${ID}-payment`)) {
      startExperiment();
    } else {
      pollerLite(['.selectedRadioGroup.cardPayment .paymentContent h4'], () => {
        if(!document.querySelector(`.${ID}-payment`)) {
          startExperiment();
        }
        
      });

    }

    observer.connect(document.querySelector('div[name="paymentSection"] .innerContent'), () => {  
      if(!document.querySelector(`.${ID}-payment`)) {
        startExperiment();
      }
    }, {
        config: {
            attributes: true,
            childList: true,
            subtree: false,
        }
    })


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
      checkProgress(url);
    }

  }).observe(document, {subtree: true, childList: true});
  
  if(window.location.href.indexOf('payment_method') > -1) {
    checkProgress(window.location.href);
  }

  

};
