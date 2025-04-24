/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import { stringToHTML } from "../../../../lib/utils";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

fetch("/basket-confirmation.aspx")
  .then((res) => res.text())
  .then((data) => {
    const dom = stringToHTML(data);
    const page = dom.querySelector("#aspnetForm").action;
    const pizzas = dom.querySelectorAll(".intBasket td.pic img");

    if (pizzas) {
      const imageUrls = [...pizzas].reduce((prev, curr) => prev + curr.src, "");

      if (
        !imageUrls.includes("papadias") &&
        page !== "https://www.papajohns.co.uk/"
      ) {
        if (!ieChecks) {
          pollerLite(["body", ".header .basket .menuLinkTop"], activate);
        }
      }
    }
  });
