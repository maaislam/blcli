/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events, pollerLite } from "../../../../../lib/utils";
import { addToBagActionVar1, addToBagActionVar2 } from "./assets";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

export default () => {
  // console.log("Inside Setup");
  setup();

  fireEvent("Conditions Met");

  // Mini Bag Visible
  (function miniBagObserver() {
    let miniBag = document.querySelector("#divBagItems");
    if (miniBag) {
      const observer = new MutationObserver(function (mutationList, observer) {
        observer.disconnect();
        if (miniBag.classList.contains("open") && !document.querySelector("#divBag").classList.contains("activeHover")) {
          // console.log(miniBag.classList, document.querySelector("#divBag").classList);
          // console.log("firing");
          fireEvent(`Mini Bag Visible`);
        }
        miniBagObserver();
      });
      observer.observe(miniBag, { attributeFilter: ["class"], childList: true, subtree: false });
    }
  })();

  // Click “View Bag” in mini bag & Click “Checkout” in mini bag
  pollerLite([`#divButtons #aViewBag`, `#divButtons #aCheckout`], () => {
    document.querySelector("#divButtons #aViewBag").addEventListener("click", () => {
      fireEvent(`Clicks on the view CTA in the minibag`);
    });
    document.querySelector("#divButtons #aCheckout").addEventListener("click", () => {
      fireEvent(`Clicks on the checkout CTA in the minibag`);
    });
  });

  // console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION == "control") {
    return;
  }
  pollerLite([`#divBagItems .innerdivBagItems`], () => {
    if (VARIATION == 1) {
      addToBagActionVar1();
      return;
    } else if (VARIATION == 2) {
      addToBagActionVar2();
      return;
    }
  });
  // Write experiment code here
  // ...
};
