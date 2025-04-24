/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from "../../../../../lib/utils";
import shared from "./shared";

const { ID } = shared;

const isMobile = () => {
  return !!document.querySelector(`.${ID}_mobile`);
};

const isDetailsStep = () => {
  return document.querySelector(
    '[class*="DeliveryAndCollectionBlock__BlockWrap-"]'
  );
};

const moveDelivery = () => {
  // Group delivery after this element
  const deliveryAddr = document.querySelector(
    '[class*="DeliveryAddressBlock__ContentWrap"]'
  );

  // Elements to move
  const deliveryBranch = document.querySelector(
    '[data-test-id="product-details-block-branch"]'
  );
  const deliveryCarrier = document.querySelector(
    '[data-test-id="product-details-block-carrier"]'
  );
  const details = document.querySelector(
    '[data-test-id="delivery-instructions-input"]'
  );
  const supplier = document.querySelector(
    '[data-test-id="product-details-block-supplier"]'
  );

  if (deliveryAddr) {
    const wrapper = deliveryAddr.parentNode;
    wrapper.classList.add(`${ID}_group`);
    deliveryAddr.insertAdjacentHTML(
      "afterbegin",
      `
      <h3 class="${ID}_groupHeading">Delivery information</h3>
    `
    );

    if (details) {
      deliveryAddr.insertAdjacentElement(
        "afterend",
        details.closest('[data-test-id="product-details-block"]')
      );
    }
    if (deliveryCarrier) {
      deliveryAddr.insertAdjacentElement("afterend", deliveryCarrier);
    }
    if (deliveryBranch) {
      deliveryAddr.insertAdjacentElement("afterend", deliveryBranch);
    }
    if (supplier) {
      deliveryAddr.insertAdjacentElement("afterend", supplier);
    }
  }
};

const moveCollection = () => {
  // Group collection after this element
  const collectionAddr = document.querySelector(
    '[data-test-id="collection-wr"]'
  );

  const collectionBranch = document.querySelector(
    '[data-test-id="product-details-block-collection"]'
  );
  if (collectionAddr) {
    const wrapper = collectionAddr.parentNode;
    wrapper.classList.add(`${ID}_group`);

    collectionAddr.insertAdjacentHTML(
      "afterbegin",
      `
        <h3 class="${ID}_groupHeading">Collection information</h3>
        `
    );
    if (collectionBranch) {
      collectionAddr.insertAdjacentElement("afterend", collectionBranch);
    }
  }
};

const moveDeliveryDesktop = () => {
  const deliveryCollectionBox = document.querySelector(
    "[class*='DeliveryAndCollectionBlock__Wrap']"
  );

  if (deliveryCollectionBox) {
    const wrapper = document.createElement("div");
    wrapper.classList.add(`${ID}_group`);
    deliveryCollectionBox.insertAdjacentElement("afterend", wrapper);

    // Elements to move
    const deliveryBranch = document.querySelector(
      '[data-test-id="product-details-block-branch"]'
    );
    const deliveryCarrier = document.querySelector(
      '[data-test-id="product-details-block-carrier"]'
    );
    const details = document.querySelector(
      '[data-test-id="delivery-instructions-input"]'
    );
    const supplier = document.querySelector(
      '[data-test-id="product-details-block-supplier"]'
    );

    if (details) {
      wrapper.insertAdjacentElement(
        "afterbegin",
        details.closest('[data-test-id="product-details-block"]')
      );
    }
    if (deliveryCarrier) {
      wrapper.insertAdjacentElement("afterbegin", deliveryCarrier);
    }
    if (deliveryBranch) {
      wrapper.insertAdjacentElement("afterbegin", deliveryBranch);
    }
    if (supplier) {
      wrapper.insertAdjacentElement("afterbegin", supplier);
    }
  }
};

const addCollectionLink = () => {
  const markup = `
    <div class="${ID}_scrollLink">
      <svg data-test-id="styled-svg" fill="#117258" class="sc-fzozJi jXxmuO"><use xlink:href="#fill"></use></svg>
      <span>View items for collection</span>
    </div>
  `;
  const collectionAddr = document.querySelector(
    '[data-test-id="collection-wr"]'
  );

  if (collectionAddr) {
    collectionAddr.insertAdjacentHTML("beforeend", markup);

    const link = document.querySelector(`.${ID}_scrollLink`);
    link.addEventListener("click", () => {
      const collectionBranch = document.querySelector(
        '[data-test-id="product-details-block-collection"]'
      );
      if (collectionBranch) {
        collectionBranch.scrollIntoView({
          behavior: "smooth",
        });
      }

      events.send(ID, "Click", "View items for collection");
    });
  }
};

const init = () => {
  // skip if already modified the dom.
  if (document.querySelector(`.${ID}_group`)) return;
  if (isMobile()) {
    moveDelivery();
    moveCollection();
  } else {
    moveDeliveryDesktop();
    addCollectionLink();
  }
};

export default () => {
  // Initial load
  if (window.location.pathname.indexOf("/checkout") !== -1 && isDetailsStep()) {
    setTimeout(init, 500);
  }

  const appContainer = document.querySelector("#app-container");
  const checkoutWrapper = document.querySelector(
    "[class*='pageLayout__ContentBlockWrapper']"
  );

  // ------------------------------------
  // Checks for page changes and checks to see if the URL has changed
  // ------------------------------------
  let oldHref = document.location.href;
  const observer = new MutationObserver(() => {
    if (oldHref != document.location.href) {
      oldHref = document.location.href;
    }

    // Rerun
    if (
      window.location.pathname.indexOf("/checkout") !== -1 &&
      isDetailsStep()
    ) {
      setTimeout(init, 1000);
    }
  });

  const config = {
    childList: true,
    subtree: true,
  };

  if (appContainer) observer.observe(appContainer, config);
  if (checkoutWrapper) observer.observe(checkoutWrapper, config);
};
