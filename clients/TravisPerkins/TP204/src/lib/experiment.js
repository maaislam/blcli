/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { pollerLite } from "../../../../../lib/utils";
import { postcodes, skus } from "./data";
import { isMobile } from "./services";
import shared from "./shared";

const { ID } = shared;

const outsideHours = () => {
  // Don't show between 8pm and midnight
  const startTime = "16:00:00";
  const endTime = "23:59:99";

  const currentDate = new Date();

  const startDate = new Date(currentDate.getTime());
  startDate.setHours(startTime.split(":")[0]);
  startDate.setMinutes(startTime.split(":")[1]);
  startDate.setSeconds(startTime.split(":")[2]);
  const endDate = new Date(currentDate.getTime());
  endDate.setHours(endTime.split(":")[0]);
  endDate.setMinutes(endTime.split(":")[1]);
  endDate.setSeconds(endTime.split(":")[2]);
  const valid = startDate < currentDate && endDate > currentDate;
  return valid;
};

// Control (after 4pm)
const noticePLPControl = `<p class="${ID}_notice"><strong>Day of choice</strong> delivery available</p>`;
const noticePDPControl = `<p class="${ID}_notice"><strong>Day of choice</strong> delivery available</p>`;
const noticePopupControl = `
  <div class="${ID}_noticePopup">
    <img src="http://sb.monetate.net/img/1/581/3437428.png" />
    <p><strong>Day of choice</strong> delivery is available on this product</p>
  </div>`;
const noticeCartControl = "Day of choice delivery is available";
const noticePostcodeControl = `
<p>
  <strong>Good news! Day of choice delivery</strong> is available in your area on
  selected products
</p>
`;

// Variant 1 (before 4pm)
const noticePLPV1 = `<p class="${ID}_notice"><strong>Next day</strong> delivery available</p>`;
const noticePDPV1 = `<p class="${ID}_notice"><strong>Next day</strong> delivery available before 4pm</p>`;
const noticePopupV1 = `
  <div class="${ID}_noticePopup">
    <img src="http://sb.monetate.net/img/1/581/3437428.png" />
    <p><strong>Next day delivery</strong> is available on this product <span style="font-weight: 700; color: #182D3D;">if you order before 4pm</span></p>
  </div>`;
const noticeCartV1 = "Next day delivery is available if you order before 4pm";
const noticePostcodeV1 = `
<p>
  <strong>Good news! Next day delivery</strong> is available in your area on selected products <span style="font-weight: 700; color: #182D3D;">if you order before 4pm</span>
</p>
`;

// Set notices based on hours
let noticePLP = noticePLPV1;
let noticePDP = noticePDPV1;
let noticePopup = noticePopupV1;
let noticeCart = noticeCartV1;
let noticePostcode = noticePostcodeV1;
if (outsideHours()) {
  noticePLP = noticePLPControl;
  noticePDP = noticePDPControl;
  noticePopup = noticePopupControl;
  noticeCart = noticeCartControl;
  noticePostcode = noticePostcodeControl;
}

const getPostcode = () => {
  const addr = localStorage.getItem("preselectedDeliveryAddress");
  if (!addr) return false;

  const postcode = JSON.parse(addr).postalCode;
  if (!postcode) return false;
  return postcode;
};

const postcodeMatch = () => {
  const postcode = getPostcode();
  if (!postcode) return false;
  const space = postcode.indexOf(" ");
  return postcodes.indexOf(postcode.substr(0, space).toUpperCase()) !== -1;
};

const isPLP = () => {
  return (
    (window.location.pathname.indexOf("/search/") !== -1 ||
      window.location.pathname.indexOf("/c/") !== -1) &&
    !!document.querySelector('[data-test-id="plp-list"]')
  );
};

const isPDP = () => {
  return !!document.querySelector('[data-test-id="pdp-wrapper"]');
};

const isCart = () => {
  return window.location.pathname.indexOf("/cart") !== -1;
};

const updatePLP = () => {
  if (!isPLP()) return;
  const products = document.querySelectorAll('[data-test-id="product"]');
  products.forEach((product) => {
    if (product.querySelector(`.${ID}_notice`)) return;
    const code = product
      .querySelector('[data-test-id="product-card-code"]')
      .childNodes[0].wholeText.replace(/^\D+/g, "");
    const isMatch = skus.indexOf(code) !== -1;

    if (isMatch) {
      const notice = product.querySelector(
        '[data-test-id="delivery-availability-message"]'
      );
      notice.insertAdjacentHTML("beforebegin", noticePLP);
    }
  });
};

const updatePDP = () => {
  if (!isPDP()) return;
  if (document.querySelector(`.${ID}_notice`)) return;
  let productDetails = false;
  if (isMobile()) {
    productDetails = document.querySelector(
      '[class*="ProductDetailMobile__OrderButtons"] [data-test-id="delivery-availability-message"]'
    );
  } else {
    productDetails = document.querySelector(
      '[class*="ProductDetailDesktop__OrderButtonsWrapper"] [data-test-id="delivery-availability-message"]'
    );
  }
  const code = document
    .querySelector('[data-test-id="product-code"]')
    .textContent.replace(/^\D+/g, "");
  const isMatch = skus.indexOf(code) !== -1;

  if (isMatch) {
    productDetails.insertAdjacentHTML("beforebegin", noticePDP);
  }
};

const addBasketNotice = (popup) => {
  if (document.querySelector(`.${ID}_noticePopup`)) return;

  const code = window[`${ID}_addedItemCode`];

  const isMatch = skus.indexOf(code) !== -1;
  if (isMatch) {
    const buttons = popup.querySelector('[class*="styled__ButtonGroup"]');
    if (buttons) {
      buttons.insertAdjacentHTML("beforebegin", noticePopup);
    }

    window[`${ID}_addedItemCode`] = null; // Unset
  }
};

const updateCart = () => {
  if (!isCart()) return;
  const products = document.querySelectorAll(
    '[data-test-id="product-container"] [data-test-id="product"]'
  );

  products.forEach((product) => {
    if (product.querySelector(`.${ID}_noticeCart`)) return;
    const code = product
      .querySelector('[data-test-id="product-card-code"]')
      .textContent.replace(/^\D+/g, "");
    const isMatch = skus.indexOf(code) !== -1;

    if (isMatch) {
      const notice = product.querySelector(
        '[data-test-id="delivery-availability-message"]'
      );

      if (
        notice.textContent.indexOf("Unavailable") === -1 &&
        notice.textContent.indexOf("Branch will confirm delivery") === -1
      ) {
        // Add notice
        notice.textContent = noticeCart;
        notice.classList.add(`${ID}_noticeCart`);
      }
    }
  });
};

const runTest = () => {
  if (!postcodeMatch()) return;
  // Rerun
  if (isCart()) {
    pollerLite(
      [
        () =>
          !!document.querySelector('[data-test-id="product-container"]') &&
          !!document.querySelector('[data-test-id="product"]'),
      ],
      updateCart
    );
  } else if (isPLP()) {
    setTimeout(updatePLP, 1000);
  } else if (isPDP()) {
    setTimeout(updatePDP, 1000);
  }
};

const showAddrNoticePopup = () => {
  const postcode = getPostcode();
  if (!postcodeMatch()) return;
  if (document.querySelector(`.${ID}_popup`)) return;

  const markup = `
    <div class="${ID}_popup">
      <div class="${ID}_content">
        <div class="${ID}_header">
          <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20.5" cy="20.5" r="19" fill="#0F7258" stroke="#E3E8ED" stroke-width="3"/>
            <path d="M27.8873 14.3549C27.5345 14.0223 26.9923 14.0066 26.6209 14.3124L18.5968 21.9522L14.263 19.2002C13.8745 18.9675 13.377 19.0369 13.0675 19.371C12.7602 19.7021 12.7267 20.2041 12.9885 20.574L17.8122 26.5111C17.9897 26.7625 18.2783 26.9131 18.5856 26.9161C18.5886 26.9161 18.5916 26.9161 18.5946 26.9161C18.8989 26.9161 19.186 26.7721 19.3665 26.5245L28.0037 15.6168C28.2871 15.2283 28.2386 14.6875 27.8873 14.3549Z" fill="white"/>
          </svg>

          <div class="${ID}_title">
            Thank you for confirming &nbsp;<span class="${ID}_popupPostcode">${postcode}</span>
          </div>
          <svg
            fill="grey9"
            class="${ID}_close"
          >
            <use xlink:href="#close"></use>
          </svg>
        </div>
        <div class="${ID}_noticePopup">
          <img src="http://sb.monetate.net/img/1/581/3437428.png" />
          ${noticePostcode}
        </div>
        <div class="${ID}_buttons">
         <button
            type="button"
            class="${ID}_cta"
          >
            Start browsing
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", markup);
  const onClose = () => {
    document.querySelector(`.${ID}_popup`).remove();
  };

  document.querySelector(`.${ID}_close`).addEventListener("click", onClose);
  document.querySelector(`.${ID}_cta`).addEventListener("click", onClose);
};

const init = () => {
  // if (outsideHours()) return; Ignored, add in when next day notice is added in @DEV
  runTest();

  // Store the last added to basket item code for use within a popup
  document.addEventListener("click", (e) => {
    if (
      e.target &&
      e.target.getAttribute("data-test-id") == "add-to-delivery-btn"
    ) {
      // get parent first, then find code within it.
      const product = e.target.closest('div[data-test-id="product"]');
      if (product) {
        const codeElement = product.querySelector(
          '[data-test-id="product-card-code"]'
        );
        if (codeElement && codeElement.childNodes.length) {
          const code = codeElement.childNodes[0].wholeText.replace(/^\D+/g, "");
          if (code) {
            window[`${ID}_addedItemCode`] = code;
          }
        }
      }
    }
  });

  // ------------------------------------
  // Checks for page changes and checks to see if the URL has changed
  // ------------------------------------
  let oldHref = document.location.href;
  let address = false;
  let popupAddrExtended = false;
  const addrPlp = document.querySelector(
    '[data-test-id="address-description"]'
  );
  if (addrPlp) address = addrPlp.textContent;

  const addressChanged = () => {
    const newAddr = document.querySelector(
      '[data-test-id="address-description"]'
    );
    if (!newAddr) return false;
    if (newAddr.textContent != address) {
      address = newAddr.textContent;
      return true;
    }

    return false;
  };

  const hrefChanged = () => {
    if (oldHref != document.location.href) {
      oldHref = document.location.href;
      return true;
    }
    return false;
  };

  const extendPopupAddr = (btn) => {
    popupAddrExtended = true;
    btn.addEventListener("click", (e) => {
      setTimeout(showAddrNoticePopup, 50);
    });
  };

  const observer = new MutationObserver(() => {
    if (!popupAddrExtended) {
      const popupAddr = document.querySelector(
        '[data-test-id="delivery-address-popup"]'
      );
      if (popupAddr) {
        const btn = popupAddr.querySelector(
          '[data-test-id="apply-delivery-address"]'
        );

        if (btn) extendPopupAddr(btn);
      }
    }

    // Rerun
    if (addressChanged() || hrefChanged()) {
      pollerLite(
        [
          () => {
            return (
              !!document.querySelector("[data-test-id='plp-list']") ||
              !!document.querySelector("[data-test-id='pdp-wrapper']") ||
              !!document.querySelector('[data-test-id="product-container"]')
            );
          },
        ],
        runTest
      );
      return;
    }

    // Basket popup
    const popup = document.querySelector(
      '[data-test-id="add-to-basket-popup-wrapper"]'
    );
    if (popup) {
      setTimeout(() => {
        addBasketNotice(popup);
      }, 250);
    }
  });

  const config = {
    childList: true,
    subtree: true,
  };

  const appContainer = document.querySelector("#app-container");
  const plps = document.querySelector('[data-test-id="plp-list"]');
  if (appContainer) observer.observe(appContainer, config);
  if (plps) observer.observe(plps, config);
};

export default init;
