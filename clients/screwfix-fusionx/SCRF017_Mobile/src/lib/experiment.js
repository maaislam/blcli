/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { elementIsInView } from '../../../../../lib/utils';
import stockMsg from './components/msgContainer';
import stockMsg_v2 from './components/msgContainer_v2';
import { findObject } from './helpers';
import { elementIsInView_custom } from './utils/elementsInView';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;


const getSkuAvilabilityCollection = () => {
  const pathname = window.location.pathname;
  const sku = pathname.slice(pathname.lastIndexOf('/') + 1);
  const skuAvialabilityCollection = findObject(window.__NEXT_DATA__, 'skuId', sku.toUpperCase());

  return skuAvialabilityCollection;
  
}

export default () => {
  const getLocation = document.querySelector('[data-qaid="qa-store-label"]').textContent;
  if(getLocation === "Select a store") return;
  const skuAvilabilityCollection= getSkuAvilabilityCollection();
  const skuAvailAbilityStatus = skuAvilabilityCollection.fulfilmentAvailability;
  //console.log("SCRF017_M Running")

  setup();
  fireEvent('Conditions Met');
  //console.log("Condition Met")

  //fire events
  document.body.addEventListener('click', ({ target }) => {
    //console.log(target, "target")
    if (target.closest('[data-qaid="pdp-button-click-and-collect"]')) {
      fireEvent('Interactions with click and collect CTA.');
      //console.log("Interactions with click & collect CTA.")
    } else if (target.closest('[data-qaid="pdp-button-deliver"]')) {
      fireEvent(`Interactions with deliver CTA.`);
      //console.log("Interactions with deliver CTA.")
    } 
  });

  let isShown = false;

  document.addEventListener("scroll",()=>{
    if(document.querySelector('[data-qaid="pdp-product-name"]').getClientRects()[0].top < 370 && isShown === false){
      //console.log("Interactions scrolls and see product title.")
      fireEvent(`Interactions scrolls and see product title.`);
      isShown = true;
    }
  })

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }
 
  if(VARIATION == 1){

    if(window.innerWidth <= 640 && document.querySelector('[data-qaid="pdp_sticky_product_footer"]') && (skuAvailAbilityStatus.collectionStatus === "AvailableToday" || skuAvailAbilityStatus.collectionStatus === "AvailableNextDayOnly")){

      //get stock
      const getStock = document.querySelector('[data-qaid="pdp-info-message"]').textContent.split(" ")[0];
      document.querySelector('[data-qaid="pdp_sticky_product_footer"]').classList.add("whiteBackground");
      document.querySelector('[data-qaid="pdp-info-message"]').classList.add(`${ID}__custom_info_message`);
    
  
     //render dom
      document.querySelector('[data-qaid="pdp-info-message"]').insertAdjacentHTML("beforebegin", stockMsg(skuAvailAbilityStatus.collectionStatus, getLocation, getStock));
  
      document.querySelector(`[data-qaid="pdp-button-click-and-collect"]`).classList.add(`${ID}__custom_font_size`);
      document.querySelector(`[data-qaid="pdp-button-deliver"]`).classList.add(`${ID}__custom_font_size`);
  
    }

  }
  
  

  
  if(VARIATION == 2){
    if(window.innerWidth <= 640 && document.querySelector('[data-qaid="pdp_sticky_product_footer"]') && (skuAvailAbilityStatus.collectionStatus === "AvailableToday" || skuAvailAbilityStatus.collectionStatus === "AvailableNextDayOnly")){

     //get stock
    const getStock = document.querySelector('[data-qaid="pdp-info-message"]').textContent.split(" ")[0];    

    //render dom
    document.querySelector('[data-qaid="pdp-product-name"]').insertAdjacentHTML("afterend",stockMsg_v2(skuAvailAbilityStatus.collectionStatus, getLocation, getStock) );
  
      
    }
  }

    
    
  

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  //*********variation_1 start***********//

  
};
