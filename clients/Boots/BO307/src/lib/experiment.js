/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { logMessage, pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import { arrive } from 'arrive';
const { ID, VARIATION } = shared;

const clickDeliveryMethod = (deliveryMethod) => {

  if(VARIATION !== "control") {
    if (deliveryMethod == "Home Delivery") {
      document.querySelector('.oct-delivery-header__tabs button[data-testid="delivery-header-home-delivery"]').click();
    } else if (deliveryMethod == "Click & Collect") {
      document.querySelector('.oct-delivery-header__tabs button[data-testid="delivery-header-cfs"]').click();
    }
  }
  

  fireEvent(`Interaction - Delivery Method ${VARIATION == "control" ? `would have been` : `was`} pre-clicked: ${deliveryMethod}`, true);

}

const rearrangePaymentMethods = (paymentMethod) => {

  if(VARIATION !== "control") {
    let paymentWrapper = document.querySelector('.oct-payment-options__options-buttons-wrapper');

    let allChildrenOfPaymentOptions = paymentWrapper.children;

    allChildrenOfPaymentOptions[0].classList.add(`${ID}-cardpayment`);
    allChildrenOfPaymentOptions[1].classList.add(`${ID}-paypal`);
    allChildrenOfPaymentOptions[2].classList.add(`${ID}-paypallater`);
    if(allChildrenOfPaymentOptions.length == 4) {
      allChildrenOfPaymentOptions[3].classList.add(`${ID}-klarna`);
    } else {
      allChildrenOfPaymentOptions[3].classList.add(`${ID}-applepay`);
      allChildrenOfPaymentOptions[4].classList.add(`${ID}-klarna`);
    }

    if (paymentMethod == "Card") {
      paymentWrapper.classList.add(`${ID}-cardpayment-promoted`);
    } else if (paymentMethod == "Paypal" || paymentMethod == "PayPal") {
      paymentWrapper.classList.add(`${ID}-paypal-promoted`);
    } else if (paymentMethod == "Klarna") {
      paymentWrapper.classList.add(`${ID}-klarna-promoted`);
    } else if (paymentMethod == "Apple Pay") {
      paymentWrapper.classList.add(`${ID}-applepay-promoted`);

    }
  }

  fireEvent(`Interaction - Payment Methods ${VARIATION == "control" ? `would have been` : `were`} rearranged with the following first: ${paymentMethod}`, true);

}

const startExperiment = () => {


  pollerLite(['.oct-checkout',
    () => { return localStorage.getItem('ATPersObj') }
  ], () => {

    fireEvent('Conditions Met');
    
    let persObj = JSON.parse(localStorage.getItem('ATPersObj'));

    let transactions = persObj.transactions;
    let allDeliveryMethods = [];
    let allPaymentTypes = [];

    transactions.forEach(transaction => {

      allDeliveryMethods.push(transaction.deliveryOption);

      allPaymentTypes.push(transaction.paymentMethod);

    });

    // find the most common delivery method

    let deliveryMethodCount = {};
    let maxDeliveryMethod = '';
    let maxDeliveryMethodCount = 0;

    allDeliveryMethods.forEach(deliveryMethod => {
      deliveryMethodCount[deliveryMethod] = (deliveryMethodCount[deliveryMethod] || 0) + 1;
      if (deliveryMethodCount[deliveryMethod] > maxDeliveryMethodCount) {
        maxDeliveryMethod = deliveryMethod;
        maxDeliveryMethodCount = deliveryMethodCount[deliveryMethod];
      }
    });

    // find the most common payment type

    let paymentTypeCount = {};
    let maxPaymentType = '';
    let maxPaymentTypeCount = 0;

    allPaymentTypes.forEach(paymentType => {
      paymentTypeCount[paymentType] = (paymentTypeCount[paymentType] || 0) + 1;
      if (paymentTypeCount[paymentType] > maxPaymentTypeCount) {
        maxPaymentType = paymentType;
        maxPaymentTypeCount = paymentTypeCount[paymentType];
      }
    });

    // Preselecting the delivery method

    if (document.querySelector('.oct-delivery-header__tabs')) {
      clickDeliveryMethod(maxDeliveryMethod);
    } else {
      let deliveryMethodInterval = setInterval(() => {
        if(document.querySelector('.oct-delivery-header__tabs')) {
          clearInterval(deliveryMethodInterval);
          setTimeout(() => {
            clickDeliveryMethod(maxDeliveryMethod);
          }, 500);
        }
      }, 1000);
    }

    if (document.querySelector('.oct-payment-options__options-buttons-wrapper')) {
      rearrangePaymentMethods(maxPaymentType);
    } else {

      let paymentMethodInterval = setInterval(() => {
        if (document.querySelector('.oct-payment-options__options-buttons-wrapper')) {
          clearInterval(paymentMethodInterval);
          setTimeout(() => {
            rearrangePaymentMethods(maxPaymentType);
          }, 500);
        }
      }, 1000);
    }

  });

  
  

}

export default () => {

  setup();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  startExperiment();

};
