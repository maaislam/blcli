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

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

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

  // Write experiment code here
  // ...

  pollerLite([`#ui-id-1`], () => {
    const uiAutoComplete = document.querySelector(`#ui-id-1`);
    console.log(uiAutoComplete);
    const promotionalText = `<a id="${ID}-promotional-text" href="javascript:void(0)">70% off today</a>`;
    // uiAutoComplete.insertAdjacentHTML("afterbegin", );
    const observer = new MutationObserver((mutationList, observer) => {
      // console.log(mutationList);
      mutationList.forEach((mutation) => {
        switch (mutation.type) {
          case "childList":
            console.log(mutation.addedNodes);
            let { addedNodes } = mutation;
            if (addedNodes.length > 0) {
              console.log("addedNodes.length > 0", addedNodes.length > 0);
              if (!addedNodes[0].matches(`#${ID}-promotional-text`) && !uiAutoComplete.firstChild.matches(`#${ID}-promotional-text`)) {
                console.log("Inside Main Operation");
                document.querySelector(`#${ID}-promotional-text`) && document.querySelector(`#${ID}-promotional-text`).remove();
                // uiAutoComplete.insertAdjacentHTML("afterbegin", promotionalText);
                uiAutoComplete.insertAdjacentHTML("beforeend", promotionalText);
              }
            }
            break;
          // case "attributes":
          //   break;
        }
      });
    });
    observer.observe(uiAutoComplete, { attributes: true, childList: true, subtree: true });
  });
};
