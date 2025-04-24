/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  if (VARIATION == "control") {
    (function bindTrackingToAllShowMoreElements() {
      document
        .querySelectorAll("li.product__item div.seemore_wrapper .seemore_text")
        .forEach((showMoreElement) => {
          showMoreElement.addEventListener("click", () => {
            fireEvent("Show More Clicked");
          });
        });
    })();

    return;
  }

  (function removeTargetElements() {
    if (VARIATION == 2) {
      document
        .querySelectorAll(
          "li.product__item div.category-key-features-container"
        )
        .forEach((el) => el.remove());
    } else {
      document
        .querySelectorAll("li.product__item div.seemore_wrapper")
        .forEach((el) => el.remove());
    }
  })();

  (function addBottomPaddingToAllElements() {
    document
      .querySelectorAll("div.product-item__body")
      .forEach((el) => (el.style.paddingBottom = "10px"));
  })();
};
