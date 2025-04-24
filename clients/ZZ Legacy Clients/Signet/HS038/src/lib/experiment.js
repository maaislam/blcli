/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  const { ID } = shared;  

  const addTangibleeToSite = (d) => {

      var s = d.createElement('script'), t = d.getElementsByTagName('body').item(0); s.async = true; s.id = 'tangiblee-integration';
      s.src = "//cdn.tangiblee.com/integration/3.1/managed/www.hsamuel.co.uk/revision_1/variation_new_ux/tangiblee-bundle.min.js";
      t.appendChild(s);
  };
  
  const productSKU = window.digitalData.product[0].productInfo.masterSku;
  let websiteName = 'www.hsamuel.co.uk';

  const tangibleeURL = `https://api.tangiblee.com/api/productvalidateany?ids=${productSKU}&domain=${websiteName}`;
  
  const request = new XMLHttpRequest();
      request.open('GET',tangibleeURL, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement('html');
          temp.innerHTML = request.responseText;
          const requestText = temp.querySelector('body');
          if(requestText.textContent.trim() === 'true') {
            addTangibleeToSite(document);
            events.send('HS038', 'Eligible Product');
          }
        }
      };
     request.send();
};
