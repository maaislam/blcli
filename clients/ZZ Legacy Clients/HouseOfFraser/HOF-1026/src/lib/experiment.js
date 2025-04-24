/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, pollerLite } from '../../../../../lib/utils';

const { ID } = shared;

let emailRegistered = false;

const checkCheckoutStepAndFireEvent = () => {


  if(document.querySelector('.sectionWrap .welcomeSection.activeSection')) {

    
    if (!document.querySelector('.sectionWrap .welcomeSection.activeSection').classList.contains(`${ID}-active`)) {
      fireEvent('Interaction - User reached My Details Step of checkout', true);
    }
    document.querySelector('.sectionWrap .welcomeSection.activeSection').classList.add(`${ID}-active`);

    if (document.querySelector('.sectionWrap .welcomeSection.activeSection .formWrap').innerHTML.indexOf('It looks like you have an account already') > -1 && emailRegistered == false) {
      fireEvent(`Interaction - user has typed in an email address which is registered already`, true);
      emailRegistered = true;

      

    } 
    
  }

  if(document.querySelector('.sectionWrap .deliverySection.activeSection')) {

    let max30Found = false;
    let allErrorMessages = document.querySelectorAll('.errorMessage');
    [].slice.call(allErrorMessages).forEach((error) => {
      if (error.innerText.toLowerCase().indexOf('max 30') > -1 && max30Found === false) {
        max30Found = true;
        fireEvent('Interaction - the user has caused the Max 30 Characters error to appear on the checkout', true);
      }
    })
    
    if (!document.querySelector('.sectionWrap .deliverySection.activeSection').classList.contains(`${ID}-active`)) {
      fireEvent('Interaction - User reached Delivery Step of checkout', true);      
    }
    document.querySelector('.sectionWrap .deliverySection.activeSection').classList.add(`${ID}-active`); 
    

  }

  if(document.querySelector('.sectionWrap .paymentSection.activeSection')) {

    
    if (!document.querySelector('.sectionWrap .paymentSection.activeSection').classList.contains(`${ID}-active`)) {
      

      pollerLite(['.deliverySection.completedSection'], () => {
        let completedDeliverySection = document.querySelector('.deliverySection.completedSection');
        if (completedDeliverySection) {
          let deliveryMethod = "";
          let deliveryOption = "";
          let allTitles = completedDeliverySection.querySelectorAll('.progressTitleTop');
          [].slice.call(allTitles).forEach((title) => {
            if (title.innerText.indexOf('Delivery Method') > -1) {
              deliveryMethod = title.nextElementSibling.innerText;
            } 
            if (title.innerText.indexOf('Delivery Option') > -1) {
              deliveryOption = title.nextElementSibling.innerText;
            } 
          });

          fireEvent(`Interaction - User reached to Payment Step of checkout with the following; DeliveryMethod: ${deliveryMethod} DeliveryOption: ${deliveryOption ? deliveryOption : "NA"}`, true);

        }

        
      });

      pollerLite(['.innerRadio'], () => {

        let allPaymentNodes = document.querySelectorAll('.innerRadio');
        let allPaymentOptions = [];
        [].slice.call(allPaymentNodes).forEach((option) => {

          if (option.querySelector('h3').innerText.toLowerCase().indexOf('credit') > -1 || option.querySelector('h3').innerText.toLowerCase().indexOf('paypal') > -1 || option.querySelector('h3').innerText.toLowerCase().indexOf('apple') > -1) {
            allPaymentOptions.push(option.parentElement);
          }

        });

        [].slice.call(allPaymentOptions).forEach((option) => {
          option.setAttribute('data-option', option.querySelector('h3').innerText);
          option.addEventListener('click', (e) => {
            fireEvent(`Click - user has clicked on the ${e.currentTarget.getAttribute('data-option')} payment option to enter their details`, true);
          });

        });
      });
      
    }
    document.querySelector('.sectionWrap .paymentSection.activeSection').classList.add(`${ID}-active`);
    

  }

  if(document.querySelector('.sectionWrap .confirmationSection.activeSection')) {
    fireEvent('Interaction - User reached Confirmation Step of checkout', true);
  }

  if (document.querySelector('.FinalOptions')) {
    
    if (!document.querySelector('.FinalOptions').classList.contains(`${ID}-finaloptionsactive`)) {
      fireEvent('Interaction - User reached Home Delivery Options Step of checkout', true);
    }
    document.querySelector('.FinalOptions').classList.add(`${ID}-finaloptionsactive`);
    

  }

}

export default () => {

  events.analyticsReference = window.ga ? 'ga' : '_gaUAT';

  setup();

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {

    if(e.target.innerText == 'No thanks, continue without signing in') {
      fireEvent(`Interaction - user has clicked on continue without signing in`, true);
    }

    if (e.target.href?.indexOf('/login/forgottenpassword') > -1) {
      fireEvent(`Interaction - user has clicked on forgotten password link`, true);
    }

    if (e.target.closest('button') && e.target.closest('.activeSection.paymentSection')) {

      let paymentMethod = "";
      let currLiClass = e.target.closest('.innerRadio').parentElement.classList; 
      if (currLiClass.contains('applepayPayment')) {
        paymentMethod = "Apple Pay";
      } else if (currLiClass.contains('cardPayment') && !currLiClass.contains('applepayPayment')) {
        paymentMethod = "Card Payment";
      } else if (currLiClass.contains('paypalPayment')) {
        paymentMethod = "Paypal Payment";
      }
      fireEvent(`Interaction - user has clicked on ${paymentMethod} button`, true);
    }


  });

  

  pollerLite([".sectionWrap .activeSection"], () => {
    checkCheckoutStepAndFireEvent();
    const target = document.querySelector(".leftMain .sectionWrap");

    const Observer = new MutationObserver((mutationList, observer) => {
      observer.disconnect();
      checkCheckoutStepAndFireEvent();
      observer.observe(target, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    });
    Observer.observe(target, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  });
};
