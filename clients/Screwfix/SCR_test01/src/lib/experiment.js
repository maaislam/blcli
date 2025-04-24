/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { addToCart } from './helper/addToCart';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const waitForElm = async (selector) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      resolve(document.querySelector(selector));
      return;
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  });
};



export default () => {

  console.log("Running...");

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
  if(VARIATION == 'control') {
    return;
  }

 

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  if(document.querySelector(".pr__product")){
    let elem = `<button id="product_add_to_trolley_image" alt="Add for Delivery" title="Click here to add this item to your basket for delivery" class="btn btn--lg btn--del fill light ${shared.ID}__custom_btn" aria-busy="false">
    Deliver
  </button>`

  //overlay for modal
  let overlay = `<div class="${shared.ID}__overlay"></div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", overlay);
  

  document.querySelector("#product_add_to_trolley_image").insertAdjacentHTML("beforebegin", elem);
  let itemId = document.querySelector("#product_code_container span").innerHTML;


    document.querySelector(".SCR_test01__custom_btn").addEventListener("click",()=>{
      //add class to remove scroll effcet
	    document.querySelector("body").classList.add(`${shared.ID}__display-overlay`);	 
      //call for modal   
      addToCart(
        document.querySelector("#qty").value,
        itemId
      );
      
    })

    //remove all classes when modal close
    document.querySelector(`${shared.ID}__close-btn`).addEventListener("click",()=>{
      document.querySelector(`.${shared.ID}__overlay`).classList.remove(`${shared.ID}__show-overlay`);
      document.querySelector(`${shared.ID}__delivery-modal`).remove();

    })
  }
  
};
