/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { insertAfterElement, pollerLite } from "./../../../../../lib/utils";

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");

  document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem(`${ID}`) !== "Fired") {
      window.cmCreateManualLinkClickTag(
        `/${ID}?cm_sp=AdobeTarget${ID}-_-${ID} V${VARIATION}-_-fired`
      );

      sessionStorage.setItem(`${ID}`, "Fired");
    }
  });

  if (window.usabilla_live) {
    window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
  }

  const findInStoreButton = document.getElementById("showCvosDialogue");

  if (VARIATION == "control") {
    if (findInStoreButton)
      findInStoreButton.addEventListener("click", () =>
        fireEvent("Find in store click")
      );
    return;
  }

  else {

  document.getElementById("sold_out_text").remove();

  const productTitleBlock = document.getElementById(
    "estore_product_title"
  ).parentElement;

  const newOutOfStockSection = document.createElement("div");
  newOutOfStockSection.id = `${ID}-root`;
  newOutOfStockSection.innerHTML = /* HTML */ `
    <div id="${ID}-header">
      <p>Out of stock</p>
    </div>
  `;

  insertAfterElement(productTitleBlock, newOutOfStockSection);

  pollerLite([".primaryBtn.cvos-btn-checkavailbility"], () => {
    const findInStoreButton = document.getElementById("showCvosDialogue");

    findInStoreButton.innerText = "Check Store Stock";

    newOutOfStockSection.insertAdjacentHTML(
      "beforeend",
      /* HTML */ `
        <div id="${ID}-content">
          <p>Why not check your local stores for availability?</p>
        </div>
      `
    );

    document.getElementById(`${ID}-content`).appendChild(findInStoreButton);

    findInStoreButton.addEventListener("click", () =>
      fireEvent("Check store stock click")
    );
  });
}
};
