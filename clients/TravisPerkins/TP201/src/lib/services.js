import { events, getCookie } from "./../../../../../lib/utils";
import shared from "./shared";

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  // set up events
  events.setDefaultCategory("Experimentation");
  events.setDefaultAction(CLIENT + " - " + ID);

  if (LIVECODE == "true") {
    events.sendEvents = false;
  } else {
    events.sendEvents = true;
  }

  // adds document body classlist
  document.documentElement.classList.add(ID);
  document.documentElement.classList.add(`${ID}-${VARIATION}`);
};

export const fireEvent = (label) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  events.sendAuto(VARIATION, label);
};

export const isMobile = () => {
  // Detect if it's a mobile/desktop layout
  return !!document.querySelector('[class*="PageHeaderMobile__HeaderWrapper"]');
};

export const getCustomerLocation = () => {
  // No location set?
  const preselectedDeliveryAddress = JSON.parse(
    localStorage.getItem("preselectedDeliveryAddress")
  );
  const collectionBranch = JSON.parse(localStorage.getItem("collectionBranch"));

  const deliveryPostcode = preselectedDeliveryAddress
    ? preselectedDeliveryAddress.postalCode
    : false;
  const collectionBranchId = collectionBranch ? collectionBranch.code : false;

  if (!deliveryPostcode || !collectionBranchId) return false;
  return { deliveryPostcode, collectionBranchId };
};

export const doScrolling = (elementY, duration) => {
  var startingY = window.pageYOffset;
  var diff = elementY - startingY;
  var start;

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    // Elapsed milliseconds since start of scrolling.
    var time = timestamp - start;
    // Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
};

export const getPageSKU = () => {
  // Get SKU from the product header details.
  const productCodeELm = document.querySelector(
    '[data-test-id="pdp-wrapper"] [data-test-id="product-code"]'
  );
  let pagesku = productCodeELm
    ? productCodeELm.textContent.replace(/^\D+/g, "")
    : null;
  if (!pagesku) {
    // get the last uri part
    pagesku = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );

    // cut out any query params;
    if (pagesku.indexOf("?") !== -1) {
      pagesku = pagesku.substring(0, pagesku.indexOf("?"));
    }
  }

  return pagesku;
};
