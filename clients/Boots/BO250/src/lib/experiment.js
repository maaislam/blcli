/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import sizes from './data';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  

  const productName = document.querySelector('#estore_product_title').textContent.trim().replace(/25ml|30ml|50ml|60ml|75ml|80ml|90ml|100ml|200ml/, '').replace(/^\s+|\s+$/g, '' );

    const productSizes = sizes[productName];
    if(productSizes) {

      if(VARIATION == 'control') {
        fireEvent('Sizes would have shown');
      } else {
        fireEvent('Sizes shown');
        const sizeOfCurrent = document.querySelector('#estore_product_title').textContent.match(/(\d+(?:\.\d+)?)\s?(ml)\b/i)[0];

        if(document.querySelector('#estore_pdp_trcol_6') && document.querySelector('#NDDCountdownContainer')) {
          document.querySelector('#estore_pdp_trcol_6').parentNode.insertAdjacentElement('afterend', document.querySelector('#NDDCountdownContainer'));
        }

        const root = `
        <div class="${ID}-root">
          <div class="${ID}-container">
          </div>
        </div>`;

        document.querySelector('#estore_pdp_trcol_2').insertAdjacentHTML('afterend', root);

        for (const key in productSizes) {
          if (Object.hasOwnProperty.call(productSizes, key)) {
            const element = productSizes[key];

            const sizeEl = document.createElement('a');
            sizeEl.classList.add(`${ID}-size`);

            
            const sapCode = element.sku;
            const client = window.__algolia.algoliasearch('89JDFPR8F6', '057d489220f6a6a7675568b41438c324');
            const index = client.initIndex('prod_live_products_uk');
            index.search(sapCode).then(({
              hits
            }) => {
              if(hits[0].pricePerUnit && hits[0].currentPrice) {
                sizeEl.setAttribute('href', hits[0].actionURL);

                sizeEl.innerHTML = `
                <div class="${ID}-size_inner">
                  <h3>£${hits[0].currentPrice.toFixed(2)}</h3>
                  <p>${element.size}</p>
                </div>
                <span class="${ID}-sizeML">${hits[0].pricePerUnit}</span>
                ${element.bestValue ? `<span class="${ID}-bestValueMsg">Best Value</span>` : ''}`;

                if(element.size === sizeOfCurrent) {
                  sizeEl.classList.add(`${ID}-current`);
                  sizeEl.removeAttribute('href');
                }
    
                if(element.bestValue) {
                  sizeEl.classList.add(`${ID}-bestValue`);
                }
    
                document.querySelector(`.${ID}-container`).appendChild(sizeEl);
              }
            });

           
          }
        }
        setTimeout(function() {
        console.log('adding events 1')
        const allSizes = document.querySelectorAll(`.${ID}-size`);
        console.log(allSizes);
        for (let index = 0; index < allSizes.length; index += 1) {
          console.log('adding events')
          const element = allSizes[index];
          element.addEventListener('click', () => {
            fireEvent('Size Clicked');
          });
        }
        }, 2000);
      }
  }
};
