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
import {getLocalStorageItem, dnu, attachTriggers, modalMutationObs, } from "./helpers"
import {postCodeObs} from "./helpers/postcodeObs";
const { ID, VARIATION } = shared;

const init = () => {
  const componentAlreadyExists = false; 

  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  let url = window.location.href;
  let addressMeta = getLocalStorageItem("preselectedDeliveryAddress")
  let postcode = addressMeta.postalCode
  let mobileDevices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const collectionMsg = document.querySelectorAll('[data-test-id="collection-availability-message"]');
  
  if(VARIATION == 'control') {
    if(url.includes("product") || url.includes("search") || url.includes("products") && postcode !== ''){
      //1 working fine
        let deliveryBtns = document.querySelectorAll('[data-test-id="add-to-delivery-btn"]');
        attachTriggers(deliveryBtns, ()=>{
          fireEvent('User interacts with Delivery CTA')
        })

        //2 working fine
        let collectionBtns = document.querySelectorAll('[data-test-id="add-to-collection-btn"]');
        attachTriggers(collectionBtns, ()=>{
          fireEvent('User interacts with Collection CTA')
        })
        //3 working fine
        let qtyCounter = document.querySelectorAll('[data-test-id="qty-input"]');
        attachTriggers(qtyCounter, ()=>{
          fireEvent('User interacts with quantity selector')
        })
        //4 working fine
        let variationDd = document.querySelectorAll('[data-test-id="variations-text"]');
        attachTriggers(variationDd, ()=>{
          fireEvent('User interacts with the variant dropdown')
        })
        //5 working
         //6 working
         //7 working (6 & 7 nested in 5)
        modalMutationObs('[class*="__PageWrapper"]', false);
      }
           /**
     * Mutation when postcode changes
     */
    pollerLite(['[class^="CompactDeliveryAndBranchSelectorstyled__AddressValue"] [color="text-on-primary"]'], ()=>{
      const Mutation = new MutationObserver((mutations)=>{
        postCodeObs(VARIATION);
    })
    const config = {
      characterData: true,
      characterOldValue : true
    }
    Mutation.observe(document.querySelector('[class^="CompactDeliveryAndBranchSelectorstyled__AddressValue"] [color="text-on-primary"]').firstChild, config);
    })
  }
  if(VARIATION == 1){
    if(url.includes("product") || url.includes("search") || url.includes("products") && postcode !== ''){
    //1 working fine
    let deliveryBtns = document.querySelectorAll('[data-test-id="add-to-delivery-btn"]');
    attachTriggers(deliveryBtns, ()=>{
      fireEvent('User interacts with Delivery CTA')
    })
    //2 working fine
    let collectionBtns = document.querySelectorAll('[data-test-id="add-to-collection-btn"]');
    attachTriggers(collectionBtns, ()=>{
      fireEvent('User interacts with Collection CTA')
    })
    //3 working fine
    let qtyCounter = document.querySelectorAll('[data-test-id="qty-input"]');
    attachTriggers(qtyCounter, ()=>{
      fireEvent('User interacts with quantity selector')
    })
    //6 working fine
    let variationDd = document.querySelectorAll('[data-test-id="variations-text"]');
    attachTriggers(variationDd, ()=>{
      fireEvent('User interacts with the variant dropdown')
    });
    //5 working fine
    const deliveryMsg = document.querySelectorAll('[data-test-id="delivery-availability-message"]');
    dnu(deliveryMsg, true, ()=>{
      fireEvent("User tries to interact with delivery badge")
    })
    //5 working fine
   dnu(collectionMsg, true, ()=>{
     fireEvent("User tries to interact with collection badge")
   })
   //7 working
    //8 working
    //9 working (8 & 9 nested inside 7)
    document.body.addEventListener("click", function(e){
      const target = e.target;
      const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
      if(targetMatched('[data-test-id="variant-row"]') || targetMatched('[data-test-id="variant-row"] [data-test-id="qty-selector"]')){
        fireEvent('User interacts with the quantity selector in the pop up');
      }else if(targetMatched('[data-test-id="variant-buttons-modal"] [data-test-id="add-to-delivery-btn"]')){
        fireEvent('User interacts with delivery CTA on the pop up')
      }else if(targetMatched('[data-test-id="variant-buttons-modal"] [data-test-id="add-to-collection-btn"]')){
        fireEvent('User interacts with collection CTA on the pop up')
      }
    })
    modalMutationObs('[class*="__PageWrapper"]', true);
    
   //commented out as it was firing event twice
    pollerLite(['[color="text-subdued"]'], ()=>{
      dnu(collectionMsg, false)
    })
    /**
     * Mutation when postcode changes
     */ 
          //pollerLite(['[class^="CompactDeliveryAndBranchSelectorstyled__AddressValue"] [color="text-on-primary"]'], ()=>{
          const Mutation = new MutationObserver((mutation)=>{
              postCodeObs(VARIATION);
          })
          const config = {
            characterData: true,
            characterOldValue : true
          }
          if(!mobileDevices){
            Mutation.observe(document.querySelector('[class^="CompactDeliveryAndBranchSelectorstyled__AddressValue"] [color="text-on-primary"]').firstChild, config);
          }else{
            Mutation.observe(document.querySelector('[data-test-id="address-description"] [color="text-default"]').firstChild, config)
          }
          //})
          
      /**
       * Mutation when collection changes
       */
    const collMutation = new MutationObserver((mutation)=>{
        postCodeObs(VARIATION);
    })
    const options = {
      characterData: true,
      characterOldValue : true,
      childList: true,
      subtree: true
    }
    if(!mobileDevices){
      collMutation.observe(document.querySelectorAll('[data-test-id="branch-address"] [color="text-on-primary"]')[1].firstChild, options)
    }else{
      collMutation.observe(document.querySelectorAll('[data-test-id="address-description"] [color="text-default"]')[1].firstChild, options)
    }
    }
      
  }
}

export default () => {
  init();

  // Poll and re-run init
  pollerLite([
    '#app-container',
  ], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          document.body.classList.remove(`${shared.ID}`);

          setTimeout(() => {
            // -----------------------------------
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
            init();
          }, 2000);
        }
      });
    });

    const config = {
        childList: true,
        subtree: true
    };

    observer.observe(appContainer, config);
  });
};
