/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/utils';

const runCheckoutChanges = () => {
    const packageContainers = document.querySelectorAll('.package-container');
    if (packageContainers) {
      [].forEach.call(packageContainers, (packageContainer) => {
        var fromCountry = packageContainer.querySelector('.country').innerText;
        var itemsTotalRow = packageContainer.querySelectorAll('.collapse-margins')[1];
        var deliveryCountryRow = itemsTotalRow.querySelectorAll('.text-align-right')[0].innerText;
        var deliveryInfoDiv = itemsTotalRow.querySelectorAll('.text-align-right')[0];
        var splitDelivery = deliveryCountryRow.split('to')[1];
        var deliveryCountry = splitDelivery.substring(0, splitDelivery.length - 1);
        if (deliveryCountry === ' United Kingdom') {
          deliveryCountry = 'UK';
        }
        deliveryInfoDiv.innerText = `${deliveryCountry} delivery (from ${fromCountry})`;
      })
    }
}

export default () => {

  const init = () => {
    pollerLite([
      '.checkout-confirm'
    ], () => {
      runCheckoutChanges();
    });
    pollerLite([
      '.shopping-cart'
    ], () => {
      runCheckoutChanges();
    })
    setup();
  }

  init();
};
