import {getLocalStorageItem, dnu, attachTriggers, modalMutationObs, } from "./index";
import { pollerLite } from '../../../../../../lib/uc-lib';
import { setup, fireEvent } from '../../../../../../core-files/services';
/**
 * For changes to top menu
 */
 export function postCodeObs(VARIATION){
  if(VARIATION == 'control') {
    if(url.includes("product") || url.includes("search") && postcode !== ''){
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
  }
  if(VARIATION == 1){
    pollerLite(['[data-test-id="product"]:last-of-type'], ()=>{
    //setTimeout(()=>{
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
        const collectionMsg = document.querySelectorAll('[data-test-id="collection-availability-message"]');
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
        })
    //}, 5000)
  }
  }