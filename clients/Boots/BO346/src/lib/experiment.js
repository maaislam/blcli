/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { createBanner,hideBanner} from './components/stockBanner';
import { setup, fireEvent , bootsEvents ,fireBootsEvent} from '../../../../../core-files/services';
import eventTypes from './components/eventTypes';
import actionTypes from './components/actionTypes';
// import elementTypes from './components/elementTypes';
import upsellProducts from './components/upsellProducts';
import shared from '../../../../../core-files/shared';
// import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
const { ID, VARIATION } = shared;


const scrollTracking = () => {
  document.querySelector(`.${ID}-carouselWrapper`).addEventListener('scrollend',function(){
    // fireEvent(' to end');
    // console.log('scroll_end')
    fireBootsEvent('User Scrolled', true, eventTypes.experience_action, {
      action: actionTypes.scroll,
      action_detail: 'scroll_end',
    });
  })
}

export default async () => {
  const testID = `${ID} | Category Recommendations`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID} | ${testVariant}`;
  bootsEvents.initiate = true;
  bootsEvents.methods = ['datalayer'];
  bootsEvents.property = 'G-C3KVJJE2RH';
  bootsEvents.testID = testIDAndVariant;

  setup();
  fireEvent('Conditions Met');
  

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  if(VARIATION !== 'Control') {
      createBanner();
      upsellProducts();
      // showBanner();
      hideBanner();
      scrollTracking();
  }

};
