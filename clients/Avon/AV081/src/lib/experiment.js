/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from "./services";
import debounce from "lodash/debounce";

const runChanges = () => {
  const totalPriceWrap = document.querySelector(".total-price");
  if (totalPriceWrap) {
    const priceText = parseFloat(
      totalPriceWrap.querySelector(".value").innerText.replace("£", "")
    );
    if (priceText < 20) {
      let remainingAmount = 20 - priceText;
      remainingAmount = remainingAmount.toFixed(2);

      const freeDeliveryMessage = document.querySelectorAll(
        ".free-delivery-message"
      );

      if (freeDeliveryMessage) {
        freeDeliveryMessage.forEach((dm) => {
          dm.innerText = `Standard delivery is £3 but it is FREE if you spend £${remainingAmount} more`;
        });
      }
    }
  }
};

export default () => {
  setup();

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    runChanges();
  };
  var elm = document.querySelector(
    ".basket-sidebar-background .free-delivery-message"
  );
  let elmText = elm.innerText.trim();

  const observer = new MutationObserver(
    debounce(() => {
      const newElmText = elm.innerText.trim();
      if (newElmText !== elmText) {
        runChanges();
        elmText = newElmText;
      }
    }, 200)
  );

  var config = {
    childList: true,
    subtree: false,
    attributes: true,
    characterData: true,
  };
  observer.observe(elm, config);

  // Make device specific changes when layout changes
  // rootScope.$on('App_LayoutChanged', () => {
  //   setTimeout(init, 500);
  // });

  init();
};
