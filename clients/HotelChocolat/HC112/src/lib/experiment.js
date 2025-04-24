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
      <a href="https://www.hotelchocolat.com/uk/shop/easter-eggs/"><b>FREE EXPRESS DELIVERY</b> WHEN YOU SPEND £40 OR MORE</a>
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
            data: `dwfrm_cart_couponCode=FREEDEL40&dwfrm_cart_addCoupon=dwfrm_cart_addCoupon`,
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

        let targetCode = false;

        temp.querySelectorAll(".applied-coupon").forEach((c) => {
          const code = c.querySelector(".applied-coupon-code").innerText;
          const num = c
            .querySelector(".button-text.remove-coupon")
            .name.match(/.*(coupons_)([\w\d]{2}).*/)[2];

          if (code === '"FREEDEL40"') {
            targetCode = num;
          }
        });

        if (formAction && targetCode) {
          window.jQuery.ajax({
            url: formAction,
            type: "post",
            data: `dwfrm_cart_coupons_${targetCode}_deleteCoupon`,
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
    removeBanner();
    deliveryBanner();

    const basketTotalEl = document.querySelector(
      ".mini-cart-wrapper .mini-cart-subtotals .subtotal"
    );

    let basketAmount = "";
    if (basketTotalEl) {
      basketAmount = parseInt(basketTotalEl.textContent.replace("£", ""), 10);
    }

    if (basketAmount === "" || basketAmount < 40) {
      getFormURLandRemoveCode();
    } else {
      getFormURLandAddCode();
    }

    if (window.location.pathname === "/uk/basket") {
      const balanceToPay = parseInt(
        document
          .querySelector(".order-subtotal td:last-of-type")
          .textContent.replace("£", ""),
        10
      );

      const otherDeductions = Math.abs(
        parseInt(
          document
            .querySelector(".order-discount.discount td:last-of-type")
            .textContent.replace("£", ""),
          10
        )
      );

      if (balanceToPay - otherDeductions < 40) {
        const codes = document.querySelectorAll(".applied-coupon");

        codes.forEach((c) => {
          const code = c.querySelector(".applied-coupon-code").innerText;

          if (code === '"FREEDEL40"') {
            c.style.display = "none";
          }
        });
      }
    }
  };

  trigger();

  // when mini basket qty is updated
  observer.connect(
    document.querySelector(".minicart-total-qty"),
    () => {
      // removeBanner();
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
