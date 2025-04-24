/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { clickHandler } from './clickHandler';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  const body = document.body;
  body.addEventListener("click", function ({ target }) {
    // Trackings and mobile functionality
    clickHandler(target);
  });
  console.log("Running V2")

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

  if(window.innerWidth < 640){
    const targetNode = document.querySelector("#category");
   

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: false, subtree: false };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      
      if(document.querySelector("#facet_brand .n.ln__cats.ln__cats--fh")){
        document.querySelector(".lb-DataHolder-Wrap #facet_brand").classList.add(`${shared. ID}__view_brand`);
        const makita = document.querySelector(`.${shared.ID}__view_brand #possible_option_brand_9 .ln__facet + span`).innerText;
        const bosch = document.querySelector(`.${shared.ID}__view_brand #possible_option_brand_2 .ln__facet + span`).innerText;
        const dewalt = document.querySelector(`.${shared.ID}__view_brand #possible_option_brand_3 .ln__facet + span`).innerText;
           

        //dom
        let elem = `<div class="${shared.ID}__view_brands">
          <div class="${shared.ID}__brand_wrapper">
            <a class="${shared.ID}__makita" href="https://www.screwfix.com/c/tools/drills/cat830704?brand=makita">Makita
            <span class="${shared.ID}__brand_count"></span>
            </a>
          </div>
          <div class="${shared.ID}__brand_wrapper">
          <a class="${shared.ID}__dewalt" href="https://www.screwfix.com/c/tools/drills/cat830704?brand=dewalt">DeWalt
          <span class="${shared.ID}__brand_count"></span>
          </a>           
          </div>
          <div class="${shared.ID}__brand_wrapper ${shared.ID}__closest_for_view">
            <a class="${shared.ID}__bosch" href="https://www.screwfix.com/c/tools/drills/cat830704?brand=bosch">Bosch
            <span class="${shared.ID}__brand_count"></span>
            </a>
          </div>
          <h3 class="ln__cat ln__cat--fh show-leftnav-popup show-leftnav-popup_l3 custom_view" data-content="facet_brand">View all</span><span class="icon-facet-plus"></span></h3>
        </div>`

          

          if(document.querySelector(".lb-DataHolder-Wrap #facet_brand h3")){
            if(document.querySelector(".SCR011_v2__view_brands")){
              //do nothing

            }else{

              document.querySelector(`.lb-DataHolder-Wrap .${shared. ID}__view_brand h3`).insertAdjacentHTML("afterend", elem);

            }
            
            document.querySelector(".SCR011_v2__makita .SCR011_v2__brand_count").innerText = makita;
            document.querySelector(".SCR011_v2__bosch .SCR011_v2__brand_count").innerText = bosch;
            document.querySelector(".SCR011_v2__dewalt .SCR011_v2__brand_count").innerText = dewalt;
            document.querySelector("#facet_brand h3").addEventListener("click",(e)=>{
              console.log("inn")
              e.stopPropagation();
            })

          }else{
            document.querySelector(`.${shared.ID}__view_brands`).remove();
            document.querySelector("#possible_option_brand_9").classList.add(`${shared.ID}__display_off`);
            document.querySelector("#possible_option_brand_3").classList.add(`${shared.ID}__display_off`);
            document.querySelector("#possible_option_brand_2").classList.add(`${shared.ID}__display_off`);
            document.querySelector(".view-all").click();
            

          }

          
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

      
      
  }


  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
};
