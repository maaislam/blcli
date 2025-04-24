/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import DeliveryGiftMessaging from './deliveryGiftUsps';
import Dropdowns from './contentTab';
import shared from './shared';
import { viewabilityTracker, events } from '../../../../../lib/utils';

export default () => {
  setup();

  if(shared.VARIATION === 'control') {
    viewabilityTracker(document.querySelector(`.tab-target-mobile`), () => {
      events.send(`${shared.ID} variation:${shared.VARIATION}`, 'scrolled to accordion', '', { sendOnce: true });
    }, {
      allElementHasToBeInView: false
    });
  }

  if(shared.VARIATION === '1'){
    new DeliveryGiftMessaging();
    new Dropdowns();
    viewabilityTracker(document.querySelector(`.${shared.ID}-deliveryDetails`), () => {
      events.send(`${shared.ID} variation:${shared.VARIATION}`, 'experiment in view',`${shared.ID} variation:${shared.VARIATION} accordian in view`, { sendOnce: true });
    }, {
      allElementHasToBeInView: false
    });
  }

  
  
};
