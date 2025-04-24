/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { topSellers } from './productData';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  const productSku = window.digitalData.product[0].productInfo.masterSku;
  const currentURL = window.location.pathname;

  const scarcityMessage = () => {
    const message = document.createElement('div');
    message.classList.add(`${shared.ID}-scarcity`);
    if(window.innerWidth > 767) {
      document.querySelector('.product-gallery__main').insertAdjacentElement('afterbegin', message);
    } else {
      document.querySelector('.product-gallery__main').appendChild(message);
    }
  }

  function jsonp(url, callback) {
      const callbackName = 'callback';
      window[callbackName] = function(data) {
          delete window[callbackName];
          document.body.removeChild(script);
          callback(data);
      };
  
      const script = document.createElement('script');
      script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
      document.body.appendChild(script);
  }
    if(topSellers.indexOf(productSku) > -1) {
      scarcityMessage();

      const topSellerMessage = document.querySelector(`.${shared.ID}-scarcity`);
      topSellerMessage.classList.add(`${shared.ID}-sellingFast`);
      topSellerMessage.innerHTML = 'This Product is Selling Fast';

      // test event
      events.send(`${shared.ID} v${shared.VARIATION}`, 'fired');
      events.send(`${shared.ID} v${shared.VARIATION}`, 'Selling fast product');
    }
};