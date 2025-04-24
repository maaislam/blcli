/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, events } from '../../../../../lib/utils';
import settings from './shared';
export default () => {
  setup();

  const { ID, VARIATION } = settings; 
  
  let cartEventString = "";
  let numCartItems = 0;

  function fetchProductDetails(link, obj) {
  
    if (link) {
      const request = new XMLHttpRequest();
      request.open('GET', link, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          const data = request.responseText;
          // const sizeVariantId = request.responseURL;
          if (data) {
            const html = document.createElement('div');
            html.innerHTML = data;

            let deliveryText = html.querySelector('.stock_level').innerHTML;
            let prodName = html.querySelector('h1').innerText;
            let prodID = html.querySelector('.productDescriptionText > p:first-of-type').innerText;
            prodID = prodID.replace('Product Code: ', '');

            if(deliveryText.indexOf('pre-order') > 0) {
              
              const delTextObj = document.createElement('div');
              delTextObj.innerHTML = deliveryText;
              let deliveryNewText = delTextObj.querySelector('p:nth-of-type(3)').innerHTML.replace('Order now for d', '- D');

              let additionalInfo = `
                <span class="additional-delivery-info"> ${deliveryNewText} </span>
              `;
              obj.querySelector('.in-stock').insertAdjacentHTML('beforeend', additionalInfo);

              cartEventString += "Product: "+prodName+" ("+prodID+") - pre-order "+deliveryNewText+" | ";

            } else {

              cartEventString += "Product: "+prodName+" ("+prodID+") - immediate delivery | ";
            
            }

            numCartItems ++;
          }
        }

        

      };

      request.onerror = () => {
        // There was a connection error of some sort
      };

      request.send();
    }
  }

  function checkBasketItems() {

    Array.from(cartItems).map((cartItem, index) => {

      let link = cartItem.querySelector('.checkout_thumb > a').getAttribute('href');

      fetchProductDetails(link, cartItem);

    });

  }

  const cartItems = document.querySelectorAll('.checkout_item');
  const cartItemsLength = cartItems.length - 1;

  // run the basket item check
  checkBasketItems();

  pollerLite([() => {
      return numCartItems == cartItemsLength;
    }], () => {
      events.send(ID, 'MAM-53 Variation 1 update', 'cart item detail: '+cartEventString);
    }, 
    {
      wait: 20,
      multiplier: 1,
      timeout: 0,
    });

};
