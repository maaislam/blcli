/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from '../../../../core-files/shared';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  const { ID, VARIATION } = shared;

  if(!document.documentElement.classList.contains(`${ID}`)) {
    pollerLite([
      'body',
      '.cart-total .order-subtotal td:last-of-type',
      '.shopping-bag-slot-wrapper',
      () => {
        if(!document.querySelector('#cart-table .price-standard')) {
          return true
        }
      },
      () => {
        const dataLayers = window.dataLayer;

        let subExist = false;
        for (let index = 0; index < dataLayers.length; index++) {

          const element = dataLayers[index];

          if (element.order_type === 'Subscription') {
            subExist = true;
          }

        }

        if (subExist !== true) {
          return true
        } else {
          return false
        }
      }
    ], () => {
      activate();
    });
  }
}
