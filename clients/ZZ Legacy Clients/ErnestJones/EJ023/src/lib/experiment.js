import settings from './settings';
import { events } from '../../../../../lib/utils';
import pubSub from './PublishSubscribe';
import cache from './cache';
import { reorganiseDetailsSection, addTitleToPersonalFields } from './actions/details';
import { buildCustomDeliveryMethods } from './actions/delivery-options';
import { checkBillingAddressOnInterval, buildAddress, handleGiftRecipient, handleBillingAddress, setAlternativeAddressAsChosen, initDeliveryAddressLookup, moveDeliveryAddressAfterDetails } from './actions/address';
import { showCutoff } from './actions/cutoff';
import { initSteps } from './stepper';
import { isUserLoggedIn } from './user';

/**
 * Add body classes
 *
 * @access private
 */
const addBodyClasses = () => {
  document.body.classList.add(settings.ID);

  document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
};

/**
 * Entry point for running experiment
 *
 * @access public
 */
export default () => {
  // --------------------------------------------
  // Experiment is running
  // --------------------------------------------
  pubSub.publish('experiment-init');

  // --------------------------------------------
  // Track user logged in or not
  // --------------------------------------------
  if(isUserLoggedIn()) {
    events.send(settings.ID, `Variation ${settings.VARIATION}`, 'user-logged-in', {
      sendOnce: true  
    });
  } else {
    events.send(settings.ID, `Variation ${settings.VARIATION}`, 'user-not-logged-in', {
      sendOnce: true  
    });
  }

  // --------------------------------------------
  // Add classes to body
  // --------------------------------------------
  addBodyClasses();
  
  // Step 1 / Your Details
  reorganiseDetailsSection();
  addTitleToPersonalFields('Your Details');

  // Delivery Options
  buildCustomDeliveryMethods();

  // Address
  setAlternativeAddressAsChosen();

  buildAddress();
  handleGiftRecipient();
  handleBillingAddress();
  initDeliveryAddressLookup();

  moveDeliveryAddressAfterDetails();

  checkBillingAddressOnInterval();

  // ------------------------------------------------------------------
  // V2 considerations
  // ------------------------------------------------------------------
  if(settings.VARIATION === '2') {
    showCutoff();
  }

  // ------------------------------------------------------------------
  // V3 considerations
  // ------------------------------------------------------------------
  if(settings.VARIATION === '3' || settings.VARIATION === '4') {
    initSteps();
  }
  
  // ------------------------------------------------------------------
  // Other events
  // ------------------------------------------------------------------
  const submitButton = document.querySelector('#placeOrder');
  if(submitButton) {
    submitButton.addEventListener('click', () => pubSub.publish('did-click-place-order'));
  }
};
