/**
 * BIC-164 - PDP Personalisation Options - mobile only
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver } from './winstack';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const checkProductType = () => {

  logMessage("Checking product type");

  addPoller(['about-delivery'], () => {

    setTimeout(() => {

      let aboutDeliveryInnerDiv = document.querySelector('about-delivery div[click-event="delivery-details.modal.open.request"] > div');

      if(!aboutDeliveryInnerDiv.getAttribute('ng-switch-when')) {
        
        if(shared.VARIATION == 'control') {
          return;
        }

        let aboutDelivery = document.querySelector('about-delivery');
        aboutDelivery.classList.add(`${ID}-hidden`);

        let newUserMessage = "The product shows the full 'about us' delivery modal - so is hidden";
        logMessage(newUserMessage);
        fireEvent(newUserMessage, true);

      } else {
        
        let notNewUserMessage = "This product doesn't show the full 'about us' delivery modal";
        logMessage(notNewUserMessage);
        fireEvent(notNewUserMessage, true);


      }

    }, 500);

  });

}

export default () => {
  

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');  

  checkProductType();

  let currHref = window.location.href;

  const wrap = document.body;
  addObserver(wrap, () => {
    logMessage(`${ID} observer event triggered`);
    if(currHref !== window.location.href && document.querySelector('about-delivery')) {
      checkProductType();
    } 
  }, {
    config: {
    attributes: true,
    childList: true,
    subtree: false,
    }
  })

  
};
