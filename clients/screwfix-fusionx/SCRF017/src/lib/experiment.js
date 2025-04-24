/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import {findObject} from '../helpers';
import stockMsg from './components/msgContainer';



const getSkuAvilabilityCollection = () => {
  const pathname = window.location.pathname;
  const sku = pathname.slice(pathname.lastIndexOf('/') + 1);
  const skuAvialabilityCollection = findObject(window.__NEXT_DATA__, 'skuId', sku.toUpperCase());

  return skuAvialabilityCollection;
  
}

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  const getLocation = document.querySelector('[data-qaid="qa-store-label"]').textContent;
  if(getLocation === "Select a store") return;
  const skuAvilabilityCollection= getSkuAvilabilityCollection();
  const skuAvailAbilityStatus = skuAvilabilityCollection.fulfilmentAvailability;
  console.log("SCRF017 Running...")

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

  if(document.querySelector('[data-qaid="pdp_sticky_product_footer"]') && (skuAvailAbilityStatus.collectionStatus === "AvailableToday"||   skuAvailAbilityStatus.collectionStatus === "AvailableNextDayOnly")){

    //flip deliver and click & collect btn as per design
    const delivery_CTA = document.querySelector('[data-qaid="pdp-button-deliver"]').parentElement;
    const click_and_collect_CTA = document.querySelector('[data-qaid="pdp-button-click-and-collect"]').parentElement;
    click_and_collect_CTA.insertAdjacentElement("afterend", delivery_CTA);
    click_and_collect_CTA.classList.add(`${ID}__align-clickCTA-btn`);
    delivery_CTA.classList.add(`${ID}__align-deliveryCTA-btn`);

    //get stock
    const getStock = document.querySelector('[data-qaid="pdp-info-message"]').textContent.split(" ")[0];

    //render dom
    click_and_collect_CTA.parentElement.insertAdjacentHTML("beforebegin", stockMsg(skuAvailAbilityStatus.collectionStatus, getLocation, getStock));
  }

  

  



  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
};
