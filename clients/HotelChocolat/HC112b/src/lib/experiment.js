/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { observer } from "../../../../../lib/utils";
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

export default () => {
  setup();

  const { ID } = shared;

  const deliveryBanner = () => {
    const deliveryMessage = document.createElement("div");
    deliveryMessage.classList.add(`${ID}-deliveryBanner`);
    deliveryMessage.innerHTML = `
    <div class="${ID}-innerContent">
      <a href="https://www.hotelchocolat.com/uk/shop/easter-eggs/"><b>FREE SATURDAY DELIVERY</b> WHEN YOU SPEND £40 OR MORE</a>
    </div>`;

    document
      .querySelector("#main-header")
      .insertAdjacentElement("beforebegin", deliveryMessage);

    fireEvent("Banner shown");
  };

  const getFormURLandAddCode = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "https://www.hotelchocolat.com/uk/basket", true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement("html");
        temp.innerHTML = request.responseText;

        const formAction = temp
          .querySelector(".cart-action-checkout")
          .getAttribute("action");

        if (formAction) {
          window.jQuery.ajax({
            url: formAction,
            type: "post",
            data: `dwfrm_cart_couponCode=HOPTOIT&dwfrm_cart_addCoupon=dwfrm_cart_addCoupon`,
          });

          fireEvent("Voucher added");
        }
      }
    };
    request.send();
  };

  const getFormURLandRemoveCode = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "https://www.hotelchocolat.com/uk/basket", true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement("html");
        temp.innerHTML = request.responseText;

        const formAction = temp
          .querySelector(".cart-coupon-code.toggle-information")
          .getAttribute("action");

        if (formAction) {
          window.jQuery.ajax({
            url: formAction,
            type: "post",
            data: "dwfrm_cart_coupons_i0_deleteCoupon",
          });

          fireEvent("Voucher added");
        }
      }
    };
    request.send();
  };

  const removeBanner = () => {
    const banner = document.querySelector(`.${ID}-deliveryBanner`);
    if (banner) {
      banner.remove();
    }
  };

  const trigger = () => {
    const basketTotalEl = document.querySelector(
      ".mini-cart-wrapper .mini-cart-subtotals .subtotal"
    );

    let basketAmount = "";
    if (basketTotalEl) {
      basketAmount = parseInt(basketTotalEl.textContent.replace("£", ""), 10);
    }

    if (basketAmount === "" || basketAmount < 40) {
      getFormURLandRemoveCode();
      deliveryBanner();
    } else {
      getFormURLandAddCode();
    }
  };

  trigger();

  // when mini basket qty is updated
  observer.connect(
    document.querySelector(".minicart-total-qty"),
    () => {
      removeBanner();
      trigger();
    },
    {
      throttle: 1000,
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      },
    }
  );
};
