/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from "./services";
import shared from "./shared";

export default () => {
  setup();
  const { ID } = shared;
  const hasGA = typeof ga !== "undefined" && ga;

  // Active quote - highlight menu
  const activeQuote = sessionStorage.getItem("activeQuote");
  if (activeQuote) {
    document.body.classList.add(`${ID}_activeQuote`);
  } else {
    const cta = `<div class="${ID}_wrapper"><a href="https://www.insuremytrip.com/travel-insurance/quote/destination/" class="btn btn-primary">Get a quote</a></div>`;
    // const ctaMobile = `<div class="${ID}_wrapperMobile"><a href="https://www.insuremytrip.com/travel-insurance/quote/destination/" class="btn btn-secondary">Get a quote</a><span class="${ID}_close"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L26 26" stroke="white" stroke-width="5"/><path d="M1.76782 26L25.8095 1.95837" stroke="white" stroke-width="5"/></svg></span></div>`;

    const nav = document.querySelector(".navbar-collapse");

    if (nav) {
      nav.insertAdjacentHTML("beforeend", cta);
      const ctaElm = document.querySelector(`.${ID}_wrapper a`);
      if (ctaElm) {
        ctaElm.addEventListener("click", () => {
          if (hasGA) {
            ga("send", "event", ID, "Click", "Desktop CTA");
          }
        });
      }
    }

    // document.body.insertAdjacentHTML("beforeend", ctaMobile);

    // const ctaMobileELm = document.querySelector(`.${ID}_wrapperMobile a`);
    // if (ctaMobileELm) {
    //   ctaMobileELm.addEventListener("click", () => {
    //     if (hasGA) {
    //       ga("send", "event", ID, "Click", "Mobile CTA");
    //     }
    //   });
    // }

    // document.querySelector(`.${ID}_close`).addEventListener("click", () => {
    //   document.querySelector(`.${ID}_wrapperMobile`).remove();
    //   if (hasGA) {
    //     ga("send", "event", ID, "Click", "Mobile CTA Hidden");
    //   }
    // });
  }
};
