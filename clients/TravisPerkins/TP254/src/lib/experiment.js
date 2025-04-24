/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { getCustomerLocation, isMobile, triggerEvent } from './helpers/utils';
import deliveryAddressPopUp from './components/deliveryAddressPopup';
import searchAddressPopUp from './components/searchDeliveryAddress';
import { conditionMetFireEvent } from './helpers/conditionMetFireEvent';
import clickHandler from './helpers/clickHandler';

const { ID, VARIATION } = shared;
//console.log(VARIATION)
// const DOM_RERENDER_DELAY = 500;

const searchForLocation = (value) => {
  document.querySelector(`[data-test-id="delivery-address-popup"]`).style.display = 'block';
  document.querySelector(`.${ID}__delivery_address_popup`).classList.add(`${ID}__display_hide`);

  if(isMobile()){
    if(value === "get_current_location"){
      triggerEvent(document.querySelector(`[data-test-id="use-my-current-location-button"] button`));
      document.querySelector(`[data-test-id="delivery-address-popup"]`).classList.add(`${ID}__increase_height`);

      fireEvent(`Customer uses “Use my current location”`);
      //console.log(`Customer uses “Use my current location”`);
    }else if(value === "enter_postcode"){
      setTimeout(()=>{
        document.querySelector(`[data-test-id="location-input-wr"] input`).value = "";
      },500);      
      document.querySelector(`[data-test-id="delivery-address-popup"]`).classList.add(`${ID}__increase_height`);

      fireEvent(`Customer enters postcode`);
      //console.log(`Customer enters postcode`);
    }

  }else{
    if(value === "get_current_location"){
      triggerEvent(document.querySelector(`[data-test-id="use-my-current-location-button"] button`));
      fireEvent(`Customer uses “Use my current location”`);
      //console.log(`Customer uses “Use my current location”`);

    }else if(value === "enter_postcode"){
      setTimeout(()=>{
        document.querySelector(`[data-test-id="location-input-wr"] input`).value = "";
      },500);
      fireEvent(`Customer enters postcode`);
      //console.log(`Customer enters postcode`);
    }

  }

   
}


const init = () => {
  // Experiment Code...
  setup();
  

  //run only in PDP
  const locationData = getCustomerLocation();
  const getNewDom = document.querySelector(`.${ID}__delivery_address_popup`);
  if(locationData || getNewDom) return;
  
  //console.log("TP254 Ongoing...")
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION === 'control') {
    const anchorElement = document.querySelector('[data-test-id="delivery-address-popup"]');
    conditionMetFireEvent(anchorElement, `${ID}`);
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const anchorElement = document.querySelector('[data-test-id="delivery-address-popup"]');
  anchorElement && anchorElement.insertAdjacentHTML("beforebegin", deliveryAddressPopUp());
  document.querySelector(`.${ID}__icon_close`) && document.querySelector(`.${ID}__icon_close`).addEventListener("click",()=>{
    triggerEvent(document.querySelector(`[data-test-id="close-button"]`));
  });

  document.querySelector(`.${ID}__current_location_btn`) && document.querySelector(`.${ID}__current_location_btn`).addEventListener("click",()=>{
    searchForLocation("get_current_location");    
  })

  document.querySelector(`.${ID}__enter_postcode_btn`) && document.querySelector(`.${ID}__enter_postcode_btn`).addEventListener("click",()=>{
    searchForLocation("enter_postcode")    
  })

  const targetElem = document.querySelector(`[data-test-id="delivery-address-header"]`);
  targetElem && targetElem.insertAdjacentHTML("beforebegin", searchAddressPopUp());
  anchorElement && anchorElement.insertAdjacentHTML("beforeend", `<div class="${ID}__search_back_btn"><span>Back</span></div>`);

  //close icon click
  document.querySelector(`.${ID}__search_icon_close`) && document.querySelector(`.${ID}__search_icon_close`).addEventListener("click",()=>{
    triggerEvent(document.querySelector(`[data-test-id="close-button"]`));
  })

  //back btn click
  document.querySelector(`.${ID}__search_back_btn`) && document.querySelector(`.${ID}__search_back_btn`).addEventListener("click",()=>{
    anchorElement.style.display = "none";
    document.querySelector(`.${ID}__delivery_address_popup`).classList.remove(`${ID}__display_hide`);
    
    
  })

  conditionMetFireEvent(anchorElement, `${ID}`);

  //conditionMetFireEvent(item.querySelector(`[data-test-id="add-to-collection-btn"]`), `${ID}`);
};

export default () => {
  setup();
  init();
  //setTimeout(init, DOM_RERENDER_DELAY);
  //Poll and re-run init
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');
    let oldLocation = JSON.stringify(getCustomerLocation());
    //let oldProductInfo = JSON.stringify(getItemData());
    let delivery_address_popup = document.querySelector('[data-test-id="delivery-address-popup"]');
    let oldHref = window.location.href;
    //console.log(delivery_address_popup, "delivery_address_popup");

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        //console.log(mutation);
        if (
          oldLocation !== JSON.stringify(getCustomerLocation()) ||
          //oldProductInfo !== JSON.stringify(getItemData()) ||
          oldHref !== window.location.href ||
          delivery_address_popup != null
        ) {
          oldLocation = JSON.stringify(getCustomerLocation());
          //oldProductInfo = JSON.stringify(getItemData());
          oldHref = window.location.href;
          delivery_address_popup != null;
          init();
          //setTimeout(init, 500);
        }
      });
    });

    const config = {
      childList: true,
      subtree: true,
      characterData: true,
    };

    appContainer.addEventListener('click', ({ target }) => {
      clickHandler(target, fireEvent, shared);
    });

    observer.observe(document.body, config);
  });
};
