/**
 * MP147 - Delivery info tailored to category
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events, viewabilityTracker } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';
import MP147 from './MP074-content/MP147';
import MP074 from './MP074-content/MP074';

const activate = () => {
  setup();

  // Experiment code
  if (settings.VARIATION === '1') {
    MP147.init();
  } else if (settings.VARIATION === '2') {
    MP074.init();
  }
  
  pollerLite(['.MP147-delivery-inner'], () => {
    viewabilityTracker(document.querySelector('.MP074-delivery-inner'), () => {
      events.send(settings.ID, `Variation ${settings.VARIATION}`, `User Saw - Delivery Options`, { sendOnce: true });
    }, {removeOnView: true});
  });
};

export default activate;
