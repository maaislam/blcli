/**
 * BIC-142 - PDP Personalisation Options - mobile only
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver } from './winstack';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const makeAmends = () => {

  let lcpoHolder = document.querySelector('local-product-custom-options');

  lcpoHolder.classList.add(`${ID}-alterations`);

  let alterationsMadeMessage = "Visible - changes have been made to the page to alter the personalisation options";
  logMessage(alterationsMadeMessage);
  fireEvent(alterationsMadeMessage, true);


}

const checkProductType = () => {

  logMessage("Checking product type");

  addPoller(['local-product-custom-options'], () => {

    setTimeout(() => {

      addPoller(['ng-transclude', 'local-add-to-basket action'], () => {

        let lcpOptions = document.querySelector('local-product-custom-options');

        if(lcpOptions.childElementCount > 0 && lcpOptions.querySelector('ng-transclude').firstElementChild.nodeName != "INPUT") {
          
          // Additional Tracking

          let persMessage = "Personalised product shown";
          logMessage(persMessage);
          fireEvent(persMessage, true);

          let atbButton = document.querySelector('local-add-to-basket action');

          atbButton.addEventListener('click', (e) => {

            let buttons = document.querySelectorAll('local-product-custom-options ng-transclude .w-12 > div');
            let bothInactive = true;
            let optionSelected = "";
            [].slice.call(buttons).forEach((button) => {
              if(button.classList.contains('b-col-11')) {
                bothInactive = false;
                optionSelected = button.querySelector('.fw-bold').innerHTML;
              }
            })

            if(bothInactive == true) {

              let inactiveMessage = "Click - user hasn't selected either personalised or non-personalised, nothing added";
              logMessage(inactiveMessage);
              fireEvent(inactiveMessage, true);

            } else if(bothInactive == false && optionSelected == "non-personalised") {

              let nonPersMessage = "Click - user has added to basket and selected no personalisation";
              logMessage(nonPersMessage);
              fireEvent(nonPersMessage, true);

            } else if(bothInactive == false && optionSelected == "personalised (+£5)") {

              let persMessage = "Click - user has added to basket and selected personalised (+£5)";
              logMessage(persMessage);
              fireEvent(persMessage, true);

            }

          });

          // make amends (not if control)

          if(VARIATION != 'control') {
            makeAmends();
          } 

          

        } else {
          
          let noPersMessage = "This product does not have personalisation options OR doesn't allow you to change between personalised/not personalised, nothing displayed";
          logMessage(noPersMessage);
          fireEvent(noPersMessage, true);


        }

      });

      

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
    if(currHref !== window.location.href && document.querySelector('local-product-custom-options')) {
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
