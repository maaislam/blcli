/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { topSellers, limitedStock } from './productData';
import { events } from '../../../../../lib/utils';

const jsonUrl = 'https://storage.googleapis.com/ucimagehost/EJviews.json';

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

  // Control events
  if(shared.VARIATION === 'control') {
    // Does it match the JSON 'viewed X times' ?
    jsonp(jsonUrl, function(data) {
      Object.keys(data).forEach((i) => {
        const items = data[i];
        if(items.URL.trim() === currentURL || encodeURI(items.URL).trim() === currentURL) {
          events.send(`${shared.ID} - Control`, 'Control Fired', 'Viewed X Times Message - Control');
        }
      });
    });
    
    // Limited stock message
    if(limitedStock.indexOf(productSku) > -1) {
      events.send(`${shared.ID} - Control`, 'Control Fired', 'Low Stock Message - Control');
    }

    if(topSellers.indexOf(productSku) > -1) {
      events.send(`${shared.ID} - Control`, 'Control Fired', 'Selling Fast Message - Control');
    }
  }

  // less than 3 in stock 
  if(shared.VARIATION === '1') {
    if(limitedStock.indexOf(productSku) > -1) {
      scarcityMessage();
      const topSellerMessage = document.querySelector(`.${shared.ID}-scarcity`);
      topSellerMessage.classList.add(`${shared.ID}-limitedStock`);
      topSellerMessage.innerHTML = `Limited Stock Available`;
      
      // test event
      events.send(`${shared.ID} v${shared.VARIATION}`, 'fired');
      events.send(`${shared.ID} v${shared.VARIATION}`, 'Limited Stock Product');
    }
  }

  if(shared.VARIATION === '2') {
    if(topSellers.indexOf(productSku) > -1) {
      scarcityMessage();

      const topSellerMessage = document.querySelector(`.${shared.ID}-scarcity`);
      topSellerMessage.classList.add(`${shared.ID}-sellingFast`);
      topSellerMessage.innerHTML = 'This Product is Selling Fast';

      // test event
      events.send(`${shared.ID} v${shared.VARIATION}`, 'fired');
      events.send(`${shared.ID} v${shared.VARIATION}`, 'Selling fast product');
    }
  }

  if(shared.VARIATION === '3') {
  
    jsonp(jsonUrl, function(data) {
      Object.keys(data).forEach((i) => {
        const items = data[i];
        if(items.URL.trim() === currentURL || encodeURI(items.URL).trim() === currentURL) {
          scarcityMessage();
          const topSellerMessage = document.querySelector(`.${shared.ID}-scarcity`);
  
          topSellerMessage.classList.add(`${shared.ID}-viewed`);
  
          topSellerMessage.innerHTML = `Viewed ${items.Count} Times This Week`;
           // test event
          events.send(`${shared.ID} v${shared.VARIATION}`, 'fired');
          events.send(`${shared.ID} v${shared.VARIATION}`, 'People viewed product');
        }
      });
    });
  }
};