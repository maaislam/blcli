/**
 * FL070 - Payment Error Code
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { events } from '../../../../../lib/utils';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();

  const { ID, VARIATION } = settings;
  
  if (VARIATION == 2) {
    events.send(ID, 'FL070 Control', 'FL070 Control is active');
    return false;
  } else {
    events.send(ID, `FL070 Variation ${VARIATION}`, 'FL070 test is active');
  }

  const url = window.location.href;

  const pollAndAdd = (message) => {
    pollerLite(['.PaymentStage .alert.alert-block.alert-danger'], () => {
      const currentMessage = document.querySelector('.PaymentStage .alert.alert-block.alert-danger');
      currentMessage.textContent = message;
    });
  };

  if (url == 'https://www.flannels.com/checkout/payment?errorcode=100') {
    pollAndAdd("We're sorry your payment didn't go through. We believe that your Verified by Visa / Mastercard SecureCode might have been incorrect if you were shown it. We recommend you try paying by Paypal, instead, for speed - you can create an account in less than 20 seconds if you don't already have one.");
  }
  if (url == 'https://www.flannels.com/checkout/payment?errorcode=101') {
    pollAndAdd("We're sorry your bank declined the transaction. It is likely that some of your card details like your billing address or CV2 were incorrect. We recommend you try paying by Paypal, instead, for speed - you can create an account in less than 20 seconds if you don't already have one.");
  }
  if (url == 'https://www.flannels.com/checkout/payment?errorcode=105') {
    pollAndAdd("We're sorry your payment didn't go through because you left your browser for too long and your session expired. Please re-add the items to your basket and try again.");
  }
};

export default activate;
