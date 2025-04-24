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
import { createBanner, hideBanner, showBanner } from './components/stockBanner';
import upsellProducts from './components/upsellProducts';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, just add increasingly
  // -----------------------------

  const addIncreasingly = () => {
    return new Promise((resolve,reject) => {

      
       const versionUpdate = (new Date()).getTime();
       const incre_fileListToLoad = [{
        url: 'https://www.increasingly.co/Implementation/bTSx98/js/increasingly_bTSx98.js?v=' + versionUpdate,
        type: 'js'
      }]

      function loadAssets(incre_fileListToLoad) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = incre_fileListToLoad[0].url;
        script.async = true;
        document.getElementsByTagName("head")[0].appendChild(script);
        resolve();
      }
      
      loadAssets(incre_fileListToLoad);
    });

  }

  if(VARIATION == 'control') {
    if(!document.querySelector('.inc_af_block.inc_recommendations')) {
      addIncreasingly().then(() => {
        fireEvent('Control, increasingly added');
      });
    }
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  if(VARIATION === '1') {
    pollerLite([
      () => {
          var recommendedProducts = document.querySelector('#item_page.rec1rrItemsContainer');
          var othersViewed2 = document.querySelector('.rrPlacements');
          if(recommendedProducts || othersViewed2) {
              return true
          }
      }], () => {
        createBanner();
        showBanner();
        hideBanner();
        upsellProducts();
      });
  }

  if(VARIATION === '2') {

    if(!document.querySelector('.inc_af_block.inc_recommendations')) {
      addIncreasingly().then(() => {
        pollerLite(['.inc_af_block.inc_recommendations', '.inc_product_desc_title_text a div'], () => {
          createBanner();
          showBanner();
          hideBanner();
          upsellProducts();
        });
      });
    }
  }
  

};
