/**
 * FLAN-363 - Carbon footprint placeholder
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.flannels.com/checkoutsp
 */
import { setup, addCarbonNeutralTag, fireEvent, observeWindowWidth } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

const { ID, VARIATION } = shared;

// Force set analytics reference
events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();
  // Write experiment code here
  pollerLite(['section.deliverySection.activeSection', 'section.deliverySection.activeSection .radioOptionsGroup ul'], () => {
  
    if (VARIATION == 'control') {
      fireEvent('Conditions Met - Control');
    } else if (VARIATION == '1') {
      fireEvent('Conditions Met - V1');

      addCarbonNeutralTag();
      observeWindowWidth();

      // --- PAGE CHANGES / OBSERVER
      observer.connect(document.querySelector('section.deliverySection.activeSection'), () => {
        setTimeout(() => {
          addCarbonNeutralTag();
        },750);
        
      }, {
        throttle: 200,
        config: {
          attributes: false,
          childList: true,
          // subtree: true,
        },
      });

      observer.connect(document.querySelector('.radioOptionsGroup ul'), () => {
        setTimeout(() => {
          addCarbonNeutralTag();
        },750);
      }, {
        throttle: 200,
        config: {
          attributes: false,
          childList: true,
          // subtree: true,
        },
      });

      
    }
    
  });
};

export default activate;
