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
  
  //the error is occurring here, where we're looking for the product name, but it's not matching due to too many conditions

  const productName = document.querySelector('#estore_product_title').textContent.trim().replace(/\s(-).*/, '').replace(/^\s+|\s+$/g, '' );

    const productSizes = sizes[productName];
    if(productSizes) {

      if(VARIATION == 'control') {
        fireEvent('Sizes would have shown');
      } else {
        console.log('size to be shown');
        fireEvent('Sizes shown');
        const sizeOfCurrent = document.querySelector('#estore_product_title').textContent.match(/(\d+(?:\.\d+)?)\s?\b/i)[0];

        if(document.querySelector('#estore_pdp_trcol_6') && document.querySelector('#NDDCountdownContainer')) {
          document.querySelector('#estore_pdp_trcol_6').parentNode.insertAdjacentElement('afterend', document.querySelector('#NDDCountdownContainer'));
        }

        const root = `
        <div class="${ID}-root">
          <div class="${ID}-container">
          </div>
        </div>`;

        document.querySelector('#estore_pdp_trcol_2').insertAdjacentHTML('afterend', root);

        let testProductSizes = productSizes;

        testProductSizes.sort((a, b) => {
        
          let aSizeValue = parseInt(a.size.replace('ml', ''));
          let bSizeValue = parseInt(b.size.replace('ml', ''));
          
          return aSizeValue - bSizeValue;
          
        });

        for (const key in testProductSizes) {
          if (Object.hasOwnProperty.call(testProductSizes, key)) {
            const element = testProductSizes[key];

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
                let savingPriceBestValue = 0;
                if(element.bestValue) {
                  let smallSizeSaving = document.querySelector(`.${ID}-size:first-of-type .${ID}-sizeMLinner`).innerText.split(' per')[0].trim().replace('£', '');
                  let biggerSizeSaving = hits[0].pricePerUnit.split(' per')[0].trim().replace('£', '');
                  smallSizeSaving = parseFloat(smallSizeSaving);
                  biggerSizeSaving = parseFloat(biggerSizeSaving);

                  savingPriceBestValue = (smallSizeSaving - biggerSizeSaving).toFixed(2);
                }
                
                
                sizeEl.innerHTML = `
                <div class="${ID}-size_inner">
                  <p class="${ID}-sizevalue">${element.size}</p>
                  <h3>£${hits[0].currentPrice.toFixed(2)}</h3>
                  <span ${element.bestValue ? `id="${ID}-bestvalue"` : ``} class="${ID}-sizeML ${element.bestValue ? `${ID}-bestvalue` : ``}"><span class="${ID}-sizeMLinner">${hits[0].pricePerUnit}</span>${element.bestValue ? `<span class="${ID}-sizeMLbestvalue">Best Value</span>` : ''} </span>
                </div>`;

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
        
        document.body.addEventListener('click', (e) => {

          if(e.target.closest(`.${ID}-size`) || e.target.classList.contains(`.${ID}-size`)) {

            fireEvent(`Click - size button ${e.target.closest(`.${ID}-size`).querySelector(`.${ID}-sizevalue`).innerText ? e.target.closest(`.${ID}-size`).querySelector(`.${ID}-sizevalue`).innerText : `no size found`} clicked, this was ${e.target.closest(`.${ID}-size`).classList.contains(`${ID}-current`) ? 'the current size' : 'not the current size' }`, true);

          }

        });

        pollerLite([`.${ID}-current .${ID}-sizevalue`], () => {
          let currSize = document.querySelector(`.${ID}-current .${ID}-sizevalue`).innerText;
          fireEvent(`Interaction - the current size is ${currSize}`, true);
        });
        



        setInterval(() => {

          document.getElementById(`${ID}-bestvalue`).classList.toggle(`${ID}-bestvalue--active`);

        }, 5000);
      }
  }
};
