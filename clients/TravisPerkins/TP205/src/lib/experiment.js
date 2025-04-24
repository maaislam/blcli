/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/uc-lib";
import { elementIsInView, poller } from "../../../../../lib/utils";
import debounce from "lodash/debounce";
import {toggleClasses, checkForChanges, changesInFilter} from "./helpers/utils"
import { postCodeObs } from "./helpers/postCodeObs";

const { ID, VARIATION } = shared;
let ctaBar;
let searchCounter = 0;

let mobileDevices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const init = () => {
  const componentAlreadyExists = false;

  if (componentAlreadyExists) {
    return;
  }
  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  let url = window.location.href;
  let count;
  let productCount;
  let plpList;
  let mobileDevices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
    //** Get product count total*/
    if(document.querySelector("[data-test-id='listing-header-count']")){
      count = document.querySelector("[data-test-id='listing-header-count']").innerText;
        //** Strip out all the text and get the number */
      productCount = count.replace(/\D/g, "");
    }

  if (VARIATION == "control") {
    pollerLite(['[data-test-id="plp-list"]'],  ()=>{
      let prodArr = document.querySelectorAll('[data-test-id="product"]');
      for(let i = 0; i <= prodArr.length - 1 ;i++){
        if( i == 8){
          prodArr[i].classList.add("TP205-ninth")
        }
      }
    })

    pollerLite(['.TP205-ninth'], ()=>{
      if (url.includes("search") 
     && document.querySelector("[data-test-id='plp-list']")) {
      const elementNine = document.querySelector(".TP205-ninth")
      if (elementIsInView(elementNine, false) && productCount >= 30) {
        fireEvent("Customer scrolls and reaches the 9th product", true);
      }
      window.addEventListener(
        "scroll",
        debounce(() => {
          if (elementIsInView(elementNine, false) && productCount >= 30) {
            fireEvent("Customer scrolls and reaches the 9th product", true);
          }
        }, 100)
      );
    const element = document.querySelector(".TP205-ninth");
    if (elementIsInView(element, false) && productCount >= 30) {
      fireEvent("Customer scrolls and reaches the 9th product", true);
    }
    window.addEventListener(
      "scroll",
      debounce(() => {
        if (elementIsInView(element, false) && productCount >= 30) {
          fireEvent("Customer scrolls and reaches the 9th product", true);
        }
      }, 100)
    );
  }
    })
  }
 if(VARIATION == 1){
  //** Get product count total*/
  if (url.includes("search") && searchCounter < 1) {
    document.querySelector('[data-test-id="plp-list"]').nextSibling.style.display = "none"
    if (mobileDevices){
      plpList = document.querySelectorAll('[class^="ProductListMobile__"]');
      toggleClasses(plpList,10)
    }else{
      plpList= document.querySelectorAll('[data-test-id="product"]');
      toggleClasses(plpList, 8)
    }
    pollerLite(['[data-test-id="plp-list"]'], ()=>{
    })


   //Add event listener to all checkbox end
    ctaBar = document.createElement("div");
    ctaBar.classList.add("TP205-pagination","TP205-ctabar")
    let ctaButton = document.createElement("button");
    ctaButton.setAttribute("class", "TP205-CTA");
    ctaButton.innerText = "See Full Range";
    ctaButton.addEventListener("click", function(){
        fireEvent("Customer clicks a “See Full Range” CTA");
        if (mobileDevices){
            document.querySelectorAll('[class^="ProductListMobile__"]').forEach((el)=>{
              el.classList.remove("TP205-toggle")
              el.style.display = "block"
            })
          }else{
            document.querySelectorAll('[data-test-id="product"]').forEach((el)=>{
              el.classList.remove("TP205-toggle")
              el.style.display = "block"
            })
          }
        document.querySelector(".TP205-pagination.TP205-ctabar").style.display = "none";
        document.querySelector('[data-test-id="plp-list"]').nextSibling.style.display = "block"
    })
    if(productCount >=30){
      let footerText = `
      <span class='TP205-count'>
        ${productCount} items available. 
        We recommend using the 
        <span class="TP205-mobile-block TP205-desktop-hide"><strong>filters below</strong>, </span>
        <span class="TP205-desktop-block TP205-mobile-hide"><strong>filters to the left</strong>, </span>
        <span class="TP205-desktop-block TP205-mobile-hide">or</span></span>`;
        ctaBar.innerHTML = footerText;
        ctaBar.appendChild(ctaButton)
        let counter = 0;
        if(counter < 1){
        document.querySelector('[data-test-id="plp-list"]').appendChild(ctaBar);
        }
        counter+=1
    }else{
        document.querySelector('[data-test-id="plp-list"]').nextSibling.style.display = "block";
        document.querySelector('[class^="Pagination__PaginationWrapper"]').style.display = "block"
        
    }

  //   //** for mobile only */
    if (mobileDevices) {
      //Get reference to the sort
      const sort = document.querySelector(
        '[data-test-id="listing-header-filter"]'
      );
      sort.classList.add("TP-original");
      //clone the sort deep
      const sortClone = sort.cloneNode(true);
      sortClone.classList.add("TP205-button");
      let textSpan = document.querySelector(".TP205-count");
      textSpan.appendChild(sortClone);
      ctaButton.insertAdjacentText("beforebegin", "or");

      //  clone the original click
      document.querySelector(".TP205-button").addEventListener("click", () => {
        document.querySelector(".TP-original").click();
        fireEvent("Customer uses filters from the new element (mobile)");
      });
      //** for mobile only end */
    }
  }else{
    document.querySelector('[data-test-id="plp-list"]').nextSibling.style.display = "block"
  }
  searchCounter +=1
 }
};
    /**
     * Mutation when postcode changes
     */ 
          pollerLite(['[class^="CompactDeliveryAndBranchSelectorstyled__AddressValue"] [color="text-on-primary"]'], ()=>{
            const Mutation = new MutationObserver((mutation)=>{
              postCodeObs(VARIATION,elementIsInView, fireEvent);
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
          })
          
      /**
       * Mutation when collection changes
       */
       pollerLite(['[class^="CompactDeliveryAndBranchSelectorstyled__AddressValue"] [color="text-on-primary"]'], ()=>{
    const collMutation = new MutationObserver((mutation)=>{
        postCodeObs(VARIATION,elementIsInView, fireEvent);
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
  });

export default () => {
  init();

  // Poll and re-run init
  pollerLite(["#app-container"], () => {
    const appContainer = document.querySelector("#app-container");

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
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
      subtree: true,
    };

    observer.observe(appContainer, config);
  });
};
