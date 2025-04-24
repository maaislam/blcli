/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, observer, poller, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const checkCheckoutStepAndFireEvent = () => {

  if(document.querySelector('.sectionWrap .welcomeSection.activeSection')) {
    fireEvent('User reached to My Details Step of checkout', true);
  }

  if(document.querySelector('.sectionWrap .deliverySection.activeSection')) {
    fireEvent('User reached to Delivery Step of checkout', true);

    pollerLite(['.radioOptionsGroup.FinalOptions'], () => {
      let allOptions = document.querySelectorAll('.radioOptionsGroup.FinalOptions > ul > li');
      let optionsArray = [];
      [].slice.call(allOptions).forEach((option) => {
        optionsArray.push({ 'name': option.querySelector('h3').innerText, 'value': option.querySelector('.estimatedDateValue time') !== null ? option.querySelector('.estimatedDateValue time').innerText : `notime` });
      });
      localStorage.setItem(`${ID}-delivery-option-dates-timestamp`, JSON.stringify(Date.now()));
      localStorage.setItem(`${ID}-delivery-option-dates`, JSON.stringify(optionsArray));

    });
    

  }

  if(document.querySelector('.sectionWrap .paymentSection.activeSection')) {
    
    if(VARIATION !== "control") {
      pollerLite(['.alertText'], () => {
        let theAlertText = document.querySelector('.alertText');
        let theAlertTextValue = theAlertText.innerText;
        let theAlertTextValueSplit = theAlertTextValue.split('+');
        theAlertText.innerText = theAlertTextValueSplit[0];

        fireEvent('Interaction - delivery pricing was hidden from the user by updating the alert', true)
      });
    }
    


    let allDeliveryOptions = document.querySelectorAll('.progressContainer .progressTitleTop');
    let theDeliveryOptionWrapper;
    [].slice.call(allDeliveryOptions).forEach((option) => {
      if(option.innerText.includes('Delivery Option')) {
        theDeliveryOptionWrapper = option;
      }
    });

    if (theDeliveryOptionWrapper) {

      

      let theDeliveryOption = theDeliveryOptionWrapper.nextElementSibling;
      let theDeliveryOptionValue = theDeliveryOption.innerText;
      let theDeliveryOptionValueSplit = theDeliveryOptionValue.split('+');

      fireEvent(`Interaction - the user selected ${theDeliveryOptionValueSplit[0]} for their delivery option`, true);

      if(VARIATION == 1) {
        if(!theDeliveryOption.classList.contains(`${ID}-priceupdated`)) {
          theDeliveryOption.innerText = theDeliveryOptionValueSplit[0];
          theDeliveryOption.classList.add(`${ID}-priceupdated`);

          fireEvent('Interaction - v1 delivery pricing was hidden from the user', true);
        }
      } else if(VARIATION == 2) {

        if (!theDeliveryOption.classList.contains(`${ID}-priceupdated`)) {
          theDeliveryOption.innerText = theDeliveryOptionValueSplit[0];
          theDeliveryOption.classList.add(`${ID}-priceupdated`);

          fireEvent('Interaction - v2 delivery pricing was hidden from the user', true);
        }

        let currentDayOfWeek = new Date().getDay();
        let lsDateStampDayOfWeek = new Date(JSON.parse(localStorage.getItem(`${ID}-delivery-option-dates-timestamp`))).getDay();

        if(currentDayOfWeek != lsDateStampDayOfWeek) { 
          fireEvent('Interaction - v2 delivery dates are out of date, so v2 was not displayed to the user', true);
        } else {
          
          let currDeliveryTimes = JSON.parse(localStorage.getItem(`${ID}-delivery-option-dates`));

          [].slice.call(currDeliveryTimes).forEach((option) => {
            if(theDeliveryOption.innerText.indexOf(option.name) > -1 && !theDeliveryOption.classList.contains(`${ID}-timeupdated`) && option.value !== 'notime') {
              theDeliveryOption.innerHTML = theDeliveryOptionValueSplit[0] + ` - Estimated Delivery by: <span style="font-weight: 700;">${option.value}</span>`;
              theDeliveryOption.classList.add(`${ID}-timeupdated`);
            }
          });

          fireEvent('Interaction - v2 delivery dates were displayed to the user', true);

        }


      } else {
        fireEvent('Interaction - control, no changes made', true);
      }
      

    }

    fireEvent('User reached to Payment Step of checkout');

  }

  if(document.querySelector('.sectionWrap .confirmationSection.activeSection')) {
    fireEvent('User reached to Confirmation Step of checkout');
  }

}

export default () => {

  events.analyticsReference = window.ga ? 'ga' : '_gaUAT';

  setup();

  fireEvent('Conditions Met');

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
