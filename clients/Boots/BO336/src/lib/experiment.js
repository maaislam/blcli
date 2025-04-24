
import { setup, fireEvent, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { elementIsInView, pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import elementTypes from './elementTypes';
import triggerRatingEvent from './helper/triggerRatingEvent';


export default () => {
  const { ID, VARIATION } = shared;

  const testID = `${ID}|Star Rating Position on Listers`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;


  bootsEvents.initiate = true;
  bootsEvents.methods = ["datalayer"];
  bootsEvents.property = "G-C3KVJJE2RH";
  bootsEvents.testID = testIDAndVariant;

  setup();

  fireBootsEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  
  const offerDetailsContainer = document.querySelector('.oct-listers-facets__item--roundedReviewScore');
  if (VARIATION == 'control') {
    const scrollHandler = () => {
      if (elementIsInView(offerDetailsContainer)) {
        //console.log(' ~ scrollHandler ~ offerDetailsContainer:', offerDetailsContainer);
        triggerRatingEvent(fireBootsEvent, elementIsInView, elementTypes, eventTypes, offerDetailsContainer);
  
        // Remove the event listener using the same function reference
        window.removeEventListener('scroll', scrollHandler);
      }
    };
  
    // Add the event listener
    window.addEventListener('scroll', scrollHandler);
  } else {
    triggerRatingEvent(fireBootsEvent, elementIsInView, elementTypes, eventTypes, offerDetailsContainer);
  }
};
