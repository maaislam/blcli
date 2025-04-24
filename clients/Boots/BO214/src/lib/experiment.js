/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import { poller, pollerLite } from "../../../../../lib/utils";
import shared from "../../../../../core-files/shared";
import { processOfferItemsFromOldBasket } from "./helper/processOfferItemsFromOldBasket";
import { modalClickEvent } from "../../../BO214/src/lib/helper/modalClickEvent";
// import { modalViewAction } from "./helper/modal";

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");
  //   console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);
  if (window.usabilla_live) {
    window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
  }
  pollerLite([`body`], () => {
    const body = document.querySelector(`body`);
    body.addEventListener("click", function (e) {
      if (e.target.matches(`.item-description-cta a`)) {
        // console.log(`User clicks "add to deal"`);
        fireEvent(`User clicks "add to deal"`);
      }
    });
  });
  if (VARIATION == "control") {
    return;
  }

  pollerLite(
    [
      `#page div[id$="template_container"]`,
      `#oct-basket-container`,
      `#oct-notification-sticky .oct-notification`,
      `#oct-notification-sticky .oct-notification__ctas`,
    ],
    () => {
      // creating a div for new modal
      if (VARIATION == 1) {
        document.body.insertAdjacentHTML("afterbegin", `<div class="${ID}-promotional-modal-mainContainer"></div>`);
      } else if (VARIATION == 2) {
        document
          .querySelector(`#page div[id$="template_container"]`)
          .insertAdjacentHTML("beforebegin", `<div class="${ID}-promotional-modal-mainContainer"></div>`);
      } else {
        document
          .querySelector(`#oct-notification-sticky .oct-notification__ctas`)
          ?.insertAdjacentHTML("beforebegin", `<div class="${ID}-promotional-modal-mainContainer"></div>`);
      }

      // processOfferItemsFromOldBasket();
      if (localStorage.getItem(`oldBasketProducts`)) {
        localStorage.setItem("oldBasketData", localStorage.getItem(`oldBasketProducts`));
        processOfferItemsFromOldBasket(true);
      }

      window.addEventListener("add-to-basket:success", function (e) {
        setTimeout(() => {
          processOfferItemsFromOldBasket(false);
        }, 500);
      });
      // window.addEventListener("update-basket:success", function (e) {
      //   setTimeout(() => {
      //     processOfferItemsFromOldBasket(false);
      //   }, 500);
      // });
      window.addEventListener("oct-basket:updated", function (e) {
        setTimeout(() => {
          processOfferItemsFromOldBasket(false);
        }, 500);
      });
      if (VARIATION == 3) {
        const octNotification = document.querySelector(`#oct-notification-sticky .oct-notification`);
        const observer = new MutationObserver((mutationList, observer) => {
          if (!octNotification.classList.contains(`oct-notification--visible`)) {
            if ($(`.${ID}-acc-container .acc-head.accordion-active`).hasClass("active")) {
              $(`.${ID}-acc-container .acc-head.accordion-active`).siblings(".acc-content").slideUp();
              $(`.${ID}-acc-container .acc-head.accordion-active`).removeClass("active");
            }
          }
        });
        observer.observe(octNotification, { attributes: true, childList: true, subtree: true });
      }
      modalClickEvent();
    }
  );
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
};
