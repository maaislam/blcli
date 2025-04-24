/**
 * FL079 - Brand Recommendations From PDP
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { events, setCookie, getCookie, deleteCookie, fetchAffinity } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';
import { cacheDom } from '../../../../../lib/cache-dom';
import { config } from './config';
import { buildModule } from './buildModule';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  if (VARIATION == 2) {
    events.send(ID, 'FL079 Control', 'Control is active');
    
  } else {
    events.send(ID, 'FL079 Variation', 'Variation 1 is active');
  }
  
  // Poll for PDP, set cookie with URL
  pollerLite(['.FlanProdDet .addToBasketContainer .ImgButWrap a'], () => {
    
    setCookie('FL079Show', 'true');
  });


  pollerLite(['#FiltersAndProductsWrapper'], () => {
    
    // Check for Sortedbrand in LS
    // const storedBrands = window.localStorage.getItem('brandStorage');
    // if (!storedBrands) return;
    
    // // Just get brand words
    // const storedBrandsObj = JSON.parse(storedBrands);
    

    // if (!storedBrandsObj.brand) return;

    // const storedBrandsArr = storedBrandsObj.brand;
    // const storedBrandsArr = storedBrandsObj.brand.map((obj) => obj.word);
    

    fetchAffinity.then((res) => {
      let storedBrandsArr = res;
      // Check Sb list against config
      // const matchedBrand = storedBrandsArr.filter(brand => config.includes(brand)); Match against all brands
      console.log(storedBrandsArr);
      let keyToUse = 0;
      // const matchedBrand = config.includes(storedBrandsArr[0]);
      const matchedBrand = storedBrandsArr.map((brand, key) => {
        if (typeof brand === 'string') {
          if (config.includes(brand)) {
            keyToUse = key;
            return brand;
          }
        }
      });
      
      console.log('matched brand = ', matchedBrand);
      
      // First match, show module
      // if (matchedBrand && matchedBrand[0]) {
      if (matchedBrand) {
        const brandToUse = storedBrandsArr[keyToUse];

      
        // Check if cookie is set and matches refferer.
        const pdpCookie = getCookie('FL079Show');
        
        if (pdpCookie) {
          if (!document.querySelector('.FL079-popup')) {
            
            

            const ref = document.querySelector('#BodyWrap');
            buildModule(brandToUse, ref, VARIATION);

            deleteCookie('FL079Show');
          }
        }
      }

    }).catch((err) => console.log('FL079 DY affinity error, ', err));
    
    
  });
  

};
