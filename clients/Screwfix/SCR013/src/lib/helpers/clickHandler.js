import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { addClass, removeClass } from "./utils";

const { ID } = shared;
export const clickHandler = (target) => {
  if (target.closest(`.size-option-items .size-option-item > a`)) {
    if (!target.closest(`.size-option-items .size-option-item > a.btn--disabled`)) {
      const sku = target.closest(`.size-option-items .size-option-item`).getAttribute(`data-sku`);
      if (sku) {
        // console.log(target);
        removeClass(`.${ID}-sizeSelect .size-option-item > a.selected-size`, `selected-size`);
        addClass(`.${ID}-sizeSelect .size-option-item[data-sku="${sku}"] > a`, `selected-size`);
      }
      // console.log(`User chooses a size: ${target.closest(`.size-option-items .size-option-item > a`).textContent?.trim()}`);
      fireEvent(`User chooses a size: ${target.closest(`.size-option-items .size-option-item > a`).textContent?.trim()}`);
    } else {
      // console.log(`User interacts with an out of stock product size: ${target.closest(`.size-option-items .size-option-item > a`).textContent?.trim()}`);
      fireEvent(`User interacts with an out of stock product size: ${target.closest(`.size-option-items .size-option-item > a`).textContent?.trim()}`);
    }
  } else if (target.closest(`button[id^="add_for_collection_button"]`)) {
    // console.log(`User interacts with click & collect on pdp`);
    fireEvent(`User interacts with click & collect on pdp`);
  } else if (target.closest(`button[id^="add_for_sticky_collection_button"]`)) {
    // console.log(`User interacts with sticky click & collect on pdp`);
    fireEvent(`User interacts with sticky click & collect on pdp`);
  } else if (target.closest(`button[id^="product_add_to_trolley_sticky"]`)) {
    // console.log(`User interacts with Sticky Delivery on pdp`);
    fireEvent(`User interacts with Sticky Delivery on pdp`);
  } else if (target.closest(`button[id^="product_add_to_trolley"]`)) {
    // console.log(`User interacts with Delivery on pdp`);
    fireEvent(`User interacts with Delivery on pdp`);
  } else if (target.closest(`#recommendations_container div[id^="recommended_product"] a`)) {
    const productLink = target.closest(`#recommendations_container div[id^="recommended_product"] a`);
    const productTitle = productLink.querySelector(`.ct__product-desc`)?.textContent.trim().replace(/\n+/gi, " ");
    if (productTitle) {
      // console.log(`User interacts with best sellers product recomendations: ${productTitle}`);
      fireEvent(`User interacts with best sellers product recomendations: ${productTitle}`);
    }
  } else if (target.closest(`.lb-close-bl.js--close-Lightbox`) || target.closest(`.lb-close-bl.js--close-Lightbox .lb-btn-cancel`)) {
    // console.log(`User interacts with close on pop up`);
    fireEvent(`User interacts with close on pop up`);
  }
};
