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
import { elementIsInView_custom } from './utils/elementsInView';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  console.log("SCR017_M Running")

  setup();

  fireEvent('Conditions Met');
  //console.log("Condition Met")

  //fire events
  document.body.addEventListener('click', ({ target }) => {
    //console.log(target, "target")
    if (target.closest(".collect-btn-col")) {
      fireEvent('Interactions with click and collect CTA.');
      //console.log("Interactions with click & collect CTA.")
    } else if (target.closest(".delivery-btn-col")) {
      fireEvent(`Interactions with deliver CTA.`);
      //console.log("Interactions with deliver CTA.")
    } 
  });

  let executed = false;

  window.addEventListener("scroll", function (e) {
    if(elementIsInView_custom(document.querySelector("#product_description"), false)){

      //execute once
      if(!executed){
        executed = true;
        //console.log("Interactions scrolls and see product title.")
        fireEvent(`Interactions scrolls and see product title.`);

      }
      
    }else{
      executed = false;

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
  }else{
    //*********variation_1 start***********//
    
    // if(window.innerWidth <= 640 && document.querySelector(".pr__btns.sm-hide")){

    //   const skuAvailabilityCollcetion = window.dataLayer[0].prodSkuAvailabilityCollection;
  
    //   if(skuAvailabilityCollcetion === ("CPC") || skuAvailabilityCollcetion === ("TCND")){

    //     document.querySelector(".pr__qty").classList.add("displayHide");
    //     document.querySelector(".pr-btns__container .collect-btn-col p").classList.add("displayHide");
    //     document.querySelector(".pdp-float-cta").classList.add("whiteBackground");
    //     document.querySelector(".pdp-float-cta .row").classList.add("newPosition");
    //     document.querySelector(".pr-btns__container").classList.add("displayView");
    //     document.querySelector(".collect-btn-col button").classList.add("newCollectBtn");
    //     document.querySelector(".delivery-btn-col button").classList.add("newDeliveryBtn");
  
    //     //get data
    //     const product_id = document.querySelector("#product_code_container span").innerText;
    //     const stockAmount = document.querySelector("#collectionQuantity").value;
    //     const location = document.querySelector(".store-location").innerText;
       
    //     //add new classs to mute
    //     document.querySelectorAll(".pr__btns.sm-hide .row .lg-24.md-12.cols p")[0].classList.add(`${shared.ID}__display_off`);
    //     document.querySelector(".delivery-btn-col span") && document.querySelector(".delivery-btn-col span").innerText === "Not available for delivery" && document.querySelector(".delivery-btn-col span").classList.add(`${shared.ID}__custom_color`);
  
    //     //render dom
    //     document.querySelector(".pdp-float-cta__col.col-btns.pr__btns .row .pr-btns__container").insertAdjacentHTML("beforeend", stockMsg(skuAvailabilityCollcetion, location, stockAmount));
       
  
    //   }
    // }
  
    //*********variation_1 end***********//
  
    //*********variation_2 start***********//

    if(VARIATION === 2){
      if(window.innerWidth <= 640 && document.querySelector(".pr__btns.sm-hide")){
  
        const skuAvailabilityCollcetion = window.dataLayer[0].prodSkuAvailabilityCollection;
    
        if((skuAvailabilityCollcetion === "CPC") ||(skuAvailabilityCollcetion === "TCND")){
          //get data
          const product_id = document.querySelector("#product_code_container span").innerText;
          const stockAmount = document.querySelector("#collectionQuantity").value;
          const location = document.querySelector(".store-location").innerText;
         
          document.querySelector("#product_description").insertAdjacentHTML("afterend",stockMsg_v2(skuAvailabilityCollcetion, location, stockAmount) );
    
        }
      }
    }
  
     
    //*********variation_2 end***********//
    
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  //*********variation_1 start***********//

  
};
