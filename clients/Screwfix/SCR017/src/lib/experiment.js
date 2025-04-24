/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import stockMsg from './components/msgContainer';



const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  const getLocation = document.querySelector('[data-qaid="qa-store-label"]').textContent;
  if(getLocation === "Select a store") return;
  console.log("SCR017 Running...")

  setup();

  fireEvent('Conditions Met');
  //console.log("Condition Met")

  //fire events
  document.body.addEventListener('click', ({ target }) => {
    //console.log(target, "target")
    if (target.closest(".btn.btn--lg.btn--col.fill")) {
      fireEvent('Interactions with click and collect CTA.');
      //console.log("Interactions with click & collect CTA.")
    } else if (target.closest(".btn.btn--lg.btn--del.fill.light")) {
      fireEvent(`Interactions with deliver CTA.`);
      //console.log("Interactions with deliver CTA.")
    } else if(target.closest(".delivery-btn-col")){
      fireEvent(`Interactions with deliver CTA.`);
    }else if(target.closest(".btn.btn--green.fill")){
      fireEvent('Interactions with click and collect CTA.');
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
    console.log("ControlD")
    return;
  }

  if(document.querySelector('[data-qaid="pdp_sticky_product_footer"]')){

    const delivery_CTA = document.querySelector('[data-qaid="pdp-button-deliver"]').parentElement;
    const click_and_collect_CTA = document.querySelector('[data-qaid="pdp-button-click-and-collect"]').parentElement;
    click_and_collect_CTA.insertAdjacentElement("afterend", delivery_CTA);
    click_and_collect_CTA.style = "margin-bottom: 15px;";


    //const skuAvailabilityCollcetion = window.dataLayer[0].prodSkuAvailabilityCollection;

    // if((skuAvailabilityCollcetion === "CPC")||(skuAvailabilityCollcetion === "TCND")){
      // document.querySelector(".pr__btns.sm-hide .pr__p").classList.add("displayNone");
      //get data
      // const product_id = document.querySelector("#product_code_container span").innerText;
      // const stockAmount = document.querySelector("#collectionQuantity").value;
      
      

      //flip deliver and click & collect btn as per design
      // const targetElem = document.querySelectorAll(".pr__btns.sm-hide .row .lg-24.md-12.cols")[1];
      // document.querySelector(".pr__btns.sm-hide .row").insertAdjacentElement("afterbegin", targetElem);
      // document.querySelectorAll(".pr__btns.sm-hide .row .lg-24.md-12.cols")[0].insertAdjacentElement("afterend", document.querySelector("#weHaveAGasSafeError"));
      // document.querySelectorAll("#weHaveAGasSafeError")[0].insertAdjacentElement("afterend", document.querySelector("#prodId"));
      // //add new classs to mute
      // document.querySelectorAll(".pr__btns.sm-hide .row .lg-24.md-12.cols p")[0].classList.add(`${shared.ID}__display_off`);

      // //render dom
      // document.querySelector(".pr__btns.sm-hide .row").insertAdjacentHTML("afterbegin", stockMsg(skuAvailabilityCollcetion, location, stockAmount));

    // }
  }

  

  



  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
};
