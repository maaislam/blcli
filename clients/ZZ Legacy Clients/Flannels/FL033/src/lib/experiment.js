/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup, inWeek, beforeTwoPM, timeLeft, buildMessage, clickEvents } from './services';
import { events } from '../../../../../lib/utils';
import { cacheDom } from './../../../../../lib/cache-dom';
import settings from './settings';

const activate = () => {
  events.analyticsReference = '_gaUAT';
  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'Control', 'Control version is active');
    return false;
  }
  setup();
  events.send(settings.ID, 'Active', 'Variation is active');
  if (inWeek() && beforeTwoPM()) {
    // Run
    // Experiment code
    const timeRemaining = timeLeft();
    buildMessage(timeRemaining);
    clickEvents();
  }
  // Amend 21/1/19 Add prices
  const deliveryTitles = document.querySelectorAll('.DeliveryOptions .DeliveryNaming span.DeliveryOptionName');
  if (deliveryTitles[0] && deliveryTitles[1]) {
    deliveryTitles[0].innerHTML = 'Standard Delivery <span>£6.99</span>';
    deliveryTitles[1].innerHTML = 'Next Day Delivery <span>£9.99</span>';
  }
};

export default activate;
