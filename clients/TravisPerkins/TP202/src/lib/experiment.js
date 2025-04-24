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
import { observePageChange, observer } from "../../../../../lib/utils";

const { ID, VARIATION } = shared;

/*
  Helpers for adding in icons.
*/
const collectionIcon = `<img class="${shared.ID}__icon" src="http://sb.monetate.net/img/1/581/3628349.png" />`;
const deliveryIcon = `<img class="${shared.ID}__icon" src="http://sb.monetate.net/img/1/581/3628365.png" />`;
const addButtonIcon = (elm, icon) => {
  if (!elm.querySelector(`.${shared.ID}__icon`)) {
    elm.insertAdjacentHTML("afterbegin", icon);
  }
};

const getSubtotal = (product) => {
  // Add price to subtotal.
  let subtotal = 0;
  let qtyTotal = 0;
  const priceElm = product.querySelector(
    '[data-test-id="price"] [data-test-id="price"]'
  );

  // Get selected quantity
  let qtyElm = product.querySelector('[data-test-id="qty-input"] input');
  let qty = 1;
  if (!qtyElm) {
    // Mobile.
    qtyElm = product.querySelector(
      '[class*="QuantityDropdownMobile__QuantityText"]'
    );
    if (qtyElm) qty = parseInt(qtyElm.textContent, 10);
  } else {
    qty = parseInt(qtyElm.value, 10);
  }

  if (priceElm) {
    // Multiply product quantity by its price.
    let price = parseFloat(priceElm.textContent.replace(/^\D+/g, ""));
    if (qtyElm) {
      price *= qty;
      qtyTotal += qty;
    }
    subtotal += price;
  }

  return { subtotal, qtyTotal };
};

const runCartChanges = () => {
  // Add icons to collection items
  pollerLite(['[data-test-id="basket-collection-items"]'], () => {
    const basketCollectionElem = document.querySelector(
      `[data-test-id="basket-collection-items"]`
    );
    if (basketCollectionElem) {
      const products = basketCollectionElem.querySelectorAll(
        `[data-test-id="product"]`
      );
      if (products) {
        // Subtotal
        let subtotal = 0;
        let qtyTotal = 0;
        [].forEach.call(products, (product) => {
          const totals = getSubtotal(product);
          subtotal += totals.subtotal;
          qtyTotal += totals.qtyTotal;

          // Add collection icon
          const firstButtonWrap = product.querySelector(
            `[data-test-id="highlight"]`
          );
          if (firstButtonWrap) {
            addButtonIcon(firstButtonWrap, collectionIcon);
          }

          // Add delivery icon
          const secondButtonWrap = product.querySelector(
            `[data-test-id="add-to-delivery-btn"]`
          );
          if (secondButtonWrap) {
            addButtonIcon(secondButtonWrap, deliveryIcon);
          }
        });
        // Add subtotal
        const headingWrapper = document.querySelector(
          '[data-test-id="basket-branch-wr"]'
        );
        if (headingWrapper) {
          // Either update existing subtotal, or create an new one.
          const subtotalContent = `${qtyTotal} items £${subtotal.toFixed(2)}`;
          const subtotalElm = basketCollectionElem.querySelector(
            `.${ID}_subtotal`
          );

          if (subtotalElm) subtotalElm.textContent = subtotalContent;
          else {
            headingWrapper.insertAdjacentHTML(
              "afterend",
              `
                <p class="${ID}_subtotal">${subtotalContent}</p>
              `
            );
          }
        }
      }
    }
  });

  // Add icons to delivery items
  pollerLite(['[data-test-id="basket-delivery-items"]'], () => {
    const basketDeliveryElem = document.querySelector(
      `[data-test-id="basket-delivery-items"]`
    );
    if (basketDeliveryElem) {
      const products = basketDeliveryElem.querySelectorAll(
        `[data-test-id="product"]`
      );
      if (products) {
        let subtotal = 0;
        let qtyTotal = 0;
        [].forEach.call(products, (product) => {
          const totals = getSubtotal(product);
          subtotal += totals.subtotal;
          qtyTotal += totals.qtyTotal;

          const firstButtonWrap = product.querySelector(
            `[data-test-id="highlight"]`
          );
          if (firstButtonWrap) {
            addButtonIcon(firstButtonWrap, deliveryIcon);
          }

          const secondButtonWrap = product.querySelector(
            `[data-test-id="add-to-collection-btn"]`
          );
          if (secondButtonWrap) {
            addButtonIcon(secondButtonWrap, collectionIcon);
          }
        });

        // Add subtotal
        const headingWrapper = document.querySelector(
          '[data-test-id="basket-delivery-title"]'
        );
        if (headingWrapper) {
          // Either update existing subtotal, or create an new one.
          const subtotalContent = `${qtyTotal} items <span class="${ID}_hideMobile">£${subtotal.toFixed(
            2
          )}</span>`;
          const subtotalElm = basketDeliveryElem.querySelector(
            `.${ID}_subtotal`
          );

          if (subtotalElm) subtotalElm.innerHTML = subtotalContent;
          else {
            headingWrapper.insertAdjacentHTML(
              "beforeend",
              `
                <p class="${ID}_subtotal">${subtotalContent}</p>
              `
            );
          }
        }
      }

      // Move 'split delivery' message to the delivery element.
      const splitDelivery = document.querySelector(
        "[class*='Basket__SplitDeliveryWr']"
      );
      if (splitDelivery && !document.querySelector(`.${ID}_split`)) {
        splitDelivery.classList.add(`${ID}_hidden`);
        const title = basketDeliveryElem.querySelector(
          `[data-test-id="basket-delivery-title"]`
        );
        if (title) {
          title.insertAdjacentHTML(
            "afterend",
            `
            <div class="${ID}_split">
              If your order contains more than one item it may be split into two deliveries. We apologise for any inconvenience.
            </div>
          `
          );
        }
      }
    }
  });

  pollerLite(['[data-test-id="basket-out-stock-items"]'], () => {
    const basketCollectionElem = document.querySelector(
      `[data-test-id="basket-out-stock-items"]`
    );
    if (basketCollectionElem) {
      const products = basketCollectionElem.querySelectorAll(
        `[data-test-id="product"]`
      );
      if (products) {
        // Subtotal
        let subtotal = 0;
        let qtyTotal = 0;
        [].forEach.call(products, (product) => {
          const totals = getSubtotal(product);
          subtotal += totals.subtotal;
          qtyTotal += totals.qtyTotal;

          // Add collection icon
          const firstButtonWrap = product.querySelector(
            `[data-test-id="add-to-collection-btn"]`
          );
          if (firstButtonWrap) {
            addButtonIcon(firstButtonWrap, collectionIcon);
          }

          // Add delivery icon
          const secondButtonWrap = product.querySelector(
            `[data-test-id="add-to-delivery-btn"]`
          );
          if (secondButtonWrap) {
            addButtonIcon(secondButtonWrap, deliveryIcon);
          }
        });
        // Add subtotal
        const headingWrapper = document.querySelector(
          '[data-test-id="basket-out-of-stock-wr"]'
        );
        if (headingWrapper) {
          // Either update existing subtotal, or create an new one.
          const subtotalContent = `${qtyTotal} items <span class="${ID}_hideMobile">£${subtotal.toFixed(
            2
          )}</span>`;
          const subtotalElm = basketCollectionElem.querySelector(
            `.${ID}_subtotal`
          );

          if (subtotalElm) subtotalElm.innerHTML = subtotalContent;
          else {
            headingWrapper.insertAdjacentHTML(
              "afterend",
              `
                <p class="${ID}_subtotal">${subtotalContent}</p>
              `
            );
          }
        }
      }
    }
  });
};

const init = () => {
  // Experiment Code...
  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  runCartChanges();

  pollerLite(['[data-test-id="entries-list-wrapper"]'], () => {
    // Basket updates.
    const basketList = document.querySelector(
      '[data-test-id="entries-list-wrapper"]'
    );
    observer.connect(basketList, () => {
      setTimeout(runCartChanges, 1000);
    });
  });
};

export default () => {
  init();

  // Poll and re-run init
  pollerLite(["#app-container"], () => {
    // URL changes
    const appContainer = document.querySelector("#app-container");
    observePageChange(appContainer, () => {
      setTimeout(init, 2000);
    });
  });
};
