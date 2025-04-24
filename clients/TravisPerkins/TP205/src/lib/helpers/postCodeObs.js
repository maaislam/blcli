/**
 * This file contain copy of experiment.js expect CM
 */
import { toggleClasses } from "../helpers/utils";
import { pollerLite } from "../../../../../../lib/uc-lib";
export function postCodeObs(VARIATION, elementIsInView, fireEvent) {
  let ctaBar;
  let searchCounter = 0;
  let url = window.location.href;
  let count;
  let counter = 0;
  let productCount;
  let plpList;
  let mobileDevices =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  //** Get product count total*/
  if (document.querySelector("[data-test-id='listing-header-count']")) {
    count = document.querySelector(
      "[data-test-id='listing-header-count']"
    ).innerText;
    //** Strip out all the text and get the number */
    productCount = count.replace(/\D/g, "");
  }
  if (VARIATION == "control") {
    //  if (url.includes("search")){
    pollerLite(['[data-test-id="plp-list"]'], () => {
      let prodArr = document.querySelectorAll('[data-test-id="product"]');
      for (let i = 0; i <= prodArr.length - 1; i++) {
        if (i == 8) {
          prodArr[i].classList.add("TP205-ninth");
        }
      }
      //if (url.includes("search") ) {
      const elementNine = document.querySelector(".TP205-ninth");
      let fired = false;

      window.addEventListener(
        "scroll",
        function () {
          if (
            elementIsInView(elementNine, false) &&
            productCount >= 30 &&
            fired === false
          ) {
            fireEvent("Customer scrolls and reaches the 9th product");
            fired = true;
          }
        },
        true
      );
      //}
    });
  }
  if (VARIATION == 1) {
    if (url.includes("search") && searchCounter < 1) {
      if(document.querySelector('[class^="Pagination__PaginationWrapper"]')){
        document.querySelector('[class^="Pagination__PaginationWrapper"]').style.display = "none";
      }
      pollerLite(['[data-test-id="plp-list"]'], ()=>{
        if (mobileDevices) {
            plpList = document.querySelectorAll('[class^="ProductListMobile__"]');
            toggleClasses(plpList, 10);
          } else {
            plpList = document.querySelectorAll('[data-test-id="product"]');
            toggleClasses(plpList, 8);
          }
      })
      ctaBar = document.createElement("div");
      ctaBar.classList.add("TP205-pagination", "TP205-ctabar");
      const ctaDups = document.querySelectorAll(".TP205-ctabar");

      ctaDups.length > 1 && ctaDups.forEach((item)=>{
          item?.remove();
      })
      let ctaButton = document.createElement("button");
      ctaButton.setAttribute("class", "TP205-CTA");
      ctaButton.innerText = "See Full Range";
      ctaButton.addEventListener("click", function () {
        fireEvent("Customer clicks a “See Full Range” CTA");
        if (mobileDevices) {
          document
            .querySelectorAll('[class^="ProductListMobile__"]')
            .forEach((el) => {
              el.classList.remove("TP205-toggle")
              el.style.display = "block";
            });
        } else {
          document
            .querySelectorAll('[data-test-id="product"]')
            .forEach((el) => {
              el.classList.remove("TP205-toggle")
              el.style.display = "block";
            });
        }
            document.querySelector('.TP205-pagination.TP205-ctabar').style.display ="none";
            document.querySelector('[class^="Pagination__PaginationWrapper"]').style.display = "block";
    });
      if (productCount >= 30) {
        let footerText = `
        <span class='TP205-count'>
          ${productCount} items available. 
          We recommend using the 
          <span class="TP205-mobile-block TP205-desktop-hide"><strong>filters below</strong>, </span>
          <span class="TP205-desktop-block TP205-mobile-hide"><strong>filters to the left</strong>, </span>
          <span class="TP205-desktop-block TP205-mobile-hide">or</span></span>`;
        ctaBar.innerHTML = footerText;
        ctaBar.appendChild(ctaButton);
                pollerLite(['[data-test-id="plp-list"]'], () => {
                    document
                    .querySelector('[data-test-id="plp-list"]')
                    .appendChild(ctaBar);
                });
      } else {
        document.querySelector(
          '[data-test-id="plp-list"]'
        ).nextSibling.style.display = "block";
        document.querySelector(
          '[class^="Pagination__PaginationWrapper"]'
        ).style.display = "block";
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
        document
          .querySelector(".TP205-button")
          .addEventListener("click", () => {
            document.querySelector(".TP-original").click();
            fireEvent("Customer uses filters from the new element (mobile)");
          });
        //** for mobile only end */
      }
    } else {
      document.querySelector(
        '[data-test-id="plp-list"]'
      ).nextSibling.style.display = "block";
    }
  }
}
