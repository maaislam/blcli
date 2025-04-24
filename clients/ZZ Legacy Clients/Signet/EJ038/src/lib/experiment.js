/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import {
  setup
} from './services';
import shared from './shared';
import {
  events
} from '../../../../../lib/utils';

export default () => {
  setup();

  const {
    ID
  } = shared;

  var sku = window.digitalData.product[0].productInfo.masterSku;
	
  var request = new XMLHttpRequest();
    request.open('GET', 'https://api.tangiblee.com/api/productvalidateany?ids=' + sku + '&domain=www.hsamuel.co.uk', true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        var temp = document.createElement('html');
          temp.innerHTML = request.responseText;
          if(temp.querySelector('body').textContent === 'true') {
            
            window.tangibleeAnalytics =
            window.tangibleeAnalytics ||
            function () {
              (window.tangibleeAnalytics.q = window.tangibleeAnalytics.q || []).push(arguments);
            };
          window.tangibleeAnalytics('setVariation', 'Tangiblee AR');
  
          events.send('SG038', 'Tangiblee Triggered AR');
  
          } else {
            return false;
          }
      }
    };
    request.send();

      }
