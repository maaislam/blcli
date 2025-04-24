/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { clickHandler } from './clickHandler';
import listIcon from './components/listIcon';
import specificationList from './components/specList';
import { fireEventTraker } from './helpers/eventTracker';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;
const isMobile = window.matchMedia('(max-width: 640px)').matches;

export default () => {

  setup();
  
  document.body.addEventListener(`click`, function ({ target }) {
    clickHandler(target, `${ID}`, VARIATION);
  });

  document.body.addEventListener(`mousedown`, function ({ target }) {
    if(target.textContent === "Click & Collect" && !isMobile){
      //console.log(`Customer clicks on click & collect button`);
      fireEvent(`Customer clicks on click & collect button`);
    }
  });

  //console.log("SCR030 Running...")

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    fireEventTraker(document.querySelector('#product_description'), isMobile, `${ID}`);
    return;
  }else{

    //clone element and inject
    let clonedItem = document.querySelector("#product_specification_more").cloneNode(true);
    let dom = `<div class="${ID}__see_full_specification"></div>`
    document.querySelector(".pr__infobox").insertAdjacentHTML("beforebegin", dom);
    document.querySelector(`.${ID}__see_full_specification`).appendChild(clonedItem);

    //add new class and dom
    document.querySelector(`.${ID}__see_full_specification #product_specification_more_ref`).classList.add(`${ID}__product_specification_more`);
    const anchoreElem = document.querySelector(`.${ID}__product_specification_more`);
    anchoreElem.innerText = "View all specifications";
    anchoreElem.insertAdjacentHTML("beforebegin", listIcon(`${ID}`));
   
    //get specification data
    let get_spec_list_data =[...document.querySelectorAll(".pr__spec-list li")];
    get_spec_list_data.length = 3;

    pollerLite([`.${ID}__see_full_specification`], () => {
      document.querySelector(`.${ID}__see_full_specification`).insertAdjacentHTML("beforebegin", specificationList(get_spec_list_data, `${ID}`));
    });

    
  }

  //custom conditions met and event
  fireEventTraker(document.querySelector('#product_description'), isMobile, `${ID}`);

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
};
