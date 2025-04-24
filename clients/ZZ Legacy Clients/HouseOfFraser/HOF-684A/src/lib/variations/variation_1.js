import { pollerLite } from "../../../../../../lib/utils";
import shared from "../../../../../../core-files/shared";
import { card, logoMarks } from "./assets";

const { ID } = shared;
let setFlag = false;
const hof_00x_var_1 = () => {
  const styles = ["color: white", "background: #07090F", "font-size: 20px", "border: 3px solid red", "text-shadow: 1px 1px black", "padding: 5px"].join(";");
  console.log("%cVariation 1", styles);
  pollerLite([`.OrderSumm`], () => {
    document.querySelector("body").insertAdjacentHTML("beforeend", card);
    pollerLite([`.${ID}-sticky-card`], () => {
      let extraPadding = document.querySelector(`.${ID}-sticky-card`).offsetHeight;
      document.querySelector(`.FooterWrap`)?.setAttribute("style", `padding-bottom:${extraPadding}px;`);
      let orderSum = document.querySelector(".newBasketSummary .OrderSumm");
      let basket = document.querySelector(".MainOrderSummary .newBasketSummary");
      if (basket) {
        basket.querySelector("h2")?.classList.add(`${ID}--x-hidden`);
        basket.querySelector(".OrderSumm")?.classList.add(`${ID}--x-hidden`);
        basket.querySelector("#buttonWrapper")?.classList.add(`${ID}--x-hidden`);
      }
      document.querySelector("#BasketDiv")?.insertAdjacentHTML("beforeend", logoMarks);
      if (orderSum) {
        if (orderSum.querySelector("#TotalValue").innerHTML) {
          document.querySelector(`.${ID}-total`).innerHTML = orderSum.querySelector("#TotalValue").innerHTML;
        }
        document.querySelectorAll(`.${ID}-sticky-card--item`).forEach((elem) => {
          if (elem.querySelector('span[class$="subtotal-label"]')) {
            if (orderSum.querySelector("#SubtotalLabel")?.innerHTML && orderSum.querySelector("#SubtotalRow div:last-child")?.innerHTML) {
              document.querySelector(`.${ID}-subtotal-label`).innerHTML = orderSum.querySelector("#SubtotalLabel").innerHTML;
              document.querySelector(`.${ID}-subtotal`).innerHTML = orderSum.querySelector("#SubtotalRow div:last-child").innerHTML;
              elem.style.marginBottom = "5px";
            }
          } else if (elem.querySelector('span[class$="shipping"]')) {
            if (!(orderSum.querySelector("#ShippingRow").style.display === "none") && orderSum.querySelector("#BasketSummaryShippingValue")?.innerHTML) {
              document.querySelector(`.${ID}-shipping-label`).innerHTML = `Delivery`;
              document.querySelector(`.${ID}-shipping`).innerHTML = orderSum.querySelector("#BasketSummaryShippingValue").innerHTML;
              elem.style.marginBottom = "5px";
            }
          } else if (elem.querySelector('span[class$="promotion"]')) {
            if (orderSum.querySelector(".PromotionRow div:last-child")?.innerHTML) {
              document.querySelector(`.${ID}-promotion-label`).innerHTML = `Promotion`;
              document.querySelector(`.${ID}-promotion`).innerHTML = orderSum.querySelector(".PromotionRow div:last-child").innerHTML;
              elem.style.marginBottom = "5px";
            }
          } else if (!(orderSum.querySelector("#DiscountRow").style.display === "none") && elem.querySelector('span[class$="discount"]')) {
            if (orderSum.querySelector("#DiscountRow div:last-child")?.innerHTML) {
              document.querySelector(`.${ID}-discount-label`).innerHTML = `Staff discount`;
              document.querySelector(`.${ID}-discount`).innerHTML = orderSum.querySelector("#DiscountRow div:last-child").innerHTML;
              elem.style.marginBottom = "5px";
            }
          }
        });
      }
      document.querySelector(`.${ID}-sticky-card--primary`)?.addEventListener("click", () => {
        document.querySelector(`.${ID}-sticky-card--items`).classList.toggle(`${ID}-sticky-card--x-animation`);
        document.querySelector(`.${ID}-sticky-card--arrow svg`).classList.toggle(`${ID}-sticky-card--arrow-rotate`);
        if (!setFlag) {
          setTimeout(() => {
            extraPadding = document.querySelector(`.${ID}-sticky-card`).offsetHeight;
            document.querySelector(`.FooterWrap`)?.setAttribute("style", `padding-bottom:${extraPadding}px;`);
          }, 1000);
          setFlag = true;
        }
      });
      document.querySelector(`.${ID}-sticky-card--button`)?.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector('#buttonWrapper a[data-action="checkout"]')?.click();
      });
    });
  });
  return;
};

export default hof_00x_var_1;
