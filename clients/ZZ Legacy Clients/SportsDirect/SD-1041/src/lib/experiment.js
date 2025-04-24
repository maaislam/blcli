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

const { ID, VARIATION } = shared;
let hasBeenClicked = false;

const checkCheckoutStepAndFireEvent = () => {

  if(document.querySelector('.sectionWrap .welcomeSection.activeSection')) {

    
    if (!document.querySelector('.sectionWrap .welcomeSection.activeSection').classList.contains(`${ID}-active`)) {
      fireEvent('User reached to My Details Step of checkout');
    }
    document.querySelector('.sectionWrap .welcomeSection.activeSection').classList.add(`${ID}-active`);
    
  }

  if(document.querySelector('.sectionWrap .deliverySection.activeSection')) {

    
    if (!document.querySelector('.sectionWrap .deliverySection.activeSection').classList.contains(`${ID}-active`)) {
      fireEvent('User reached to Delivery Step of checkout');
    }
    document.querySelector('.sectionWrap .deliverySection.activeSection').classList.add(`${ID}-active`); 
    

  }

  if(document.querySelector('.sectionWrap .paymentSection.activeSection')) {

    
    if (!document.querySelector('.sectionWrap .paymentSection.activeSection').classList.contains(`${ID}-active`)) {
      fireEvent('User reached to Payment Step of checkout');
    }
    document.querySelector('.sectionWrap .paymentSection.activeSection').classList.add(`${ID}-active`);
    

  }

  if(document.querySelector('.sectionWrap .confirmationSection.activeSection')) {
    fireEvent('User reached to Confirmation Step of checkout');
  }

  if (document.querySelector('.FinalOptions')) {
    
    if (!document.querySelector('.FinalOptions').classList.contains(`${ID}-finaloptionsactive`)) {
      fireEvent('User reached to Final Options Step of checkout');
    }
    document.querySelector('.FinalOptions').classList.add(`${ID}-finaloptionsactive`);
    

    let allOptions = document.querySelectorAll('.FinalOptions ul > li');
    let finalOptionsUL = document.querySelector('.FinalOptions ul');

    if(VARIATION == 1) {

      if (!finalOptionsUL.classList.contains(`${ID}-updated`) && hasBeenClicked !== true) {
        allOptions[0].querySelector('input[type="radio"]').click();
      }
      finalOptionsUL.classList.add(`${ID}-updated`);
      fireEvent('Interaction - first item pre-selected', true);

    } else if(VARIATION == 2) {

      finalOptionsUL.classList.add(`${ID}-updated`);
      finalOptionsUL.classList.add(`${ID}-low-high`);
      fireEvent('Interaction - order updated to low-high, nothing preselected', true);

    } else if(VARIATION == 3) {

      if (!finalOptionsUL.classList.contains(`${ID}-updated`) && hasBeenClicked !== true) {
        if(finalOptionsUL.childElementCount == 1) {
          finalOptionsUL.querySelector('input[type="radio"]').click();
        } else {
          allOptions[3].querySelector('input[type="radio"]').click();
        }
        
      }
      finalOptionsUL.classList.add(`${ID}-updated`);
      finalOptionsUL.classList.add(`${ID}-low-high`);
      
      
      fireEvent('Interaction - order updated to low-high, first option preselected', true);


    } else {
      finalOptionsUL.classList.add(`${ID}-updated`);
      fireEvent('Interaction - no changes', true);

    }
    
    
    

  }

}

export default () => {

  events.analyticsReference = window.ga ? 'ga' : '_gaUAT';

  setup();

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    
    if (e.target.closest(`.${ID}-updated`)) {

      if(e.target.closest('button')) {
        fireEvent(`Click - user has clicked on Continue to Payment button with label: [${e.target.closest('li').querySelector('h3').innerText}]`);
      } else {
        hasBeenClicked = true;
        fireEvent(`Click - user has clicked on a delivery option radio button with label: [${e.target.closest('li').querySelector('h3').innerText}]`);
      }
      
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
