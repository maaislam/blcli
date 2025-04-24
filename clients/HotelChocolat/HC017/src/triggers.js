/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import dataJSON from './lib/productData';

window.addEventListener('load', () => {

    pollerLite([
    'body',
    '.inventory',
    '#pid',
    '.slick-initialized',
    '.einstain-inited',
    '.einstain-inited .slick-active',
    () => !!(window.einstein && window.einstein.loaded),
    () => !!window.__zmags && !!window.zmagsJsonp,
    () => {
        return !!window.jQuery;
    }, 
    () => {
        if(typeof window.jQuery.fn.slick !== 'undefined') {
          return true;
        }
    },
    () => {
    
        const matchingData = () => {
            const sku = parseInt(document.querySelector('#product-content .pdpForm #pid').value, 10);
            let matchingInfo;
        
            // loop through JSON to get matching details
            dataJSON.forEach(el => {
              if(el.productSKU === sku) {
                matchingInfo = el;
              }
            });
        
            return matchingInfo;
        }
    
        if(matchingData()) {
            return true;
        }
    },
    ], () => {
      window.einstein.loaded = true;
      activate();

    });
});
