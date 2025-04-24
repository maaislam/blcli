/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { fireEvent, setup } from "./services";
import shared from "./shared";
import { throttle } from "../../../../../lib/uc-lib";
import { setCookie } from "../../../../../lib/utils";

export default () => {
  setup();
  const { ID, VARIATION } = shared;
  const threshold = 40;
  const popup = document.createElement("div");
  let userClosedPopup = false;
  const docHeight = document.body.offsetHeight;
  const trigger = document.createElement("div");

  const trackScroll = (cb) => {
    const throttledListener = throttle(() => {
      if (userClosedPopup) return;
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const scrollPercentRounded = Math.round(scrollPercent * 100);

      cb(scrollPercentRounded);
    }, 100);
    window.addEventListener("scroll", throttledListener);
  };

  const showPopup = () => {
    popup.classList.add(`${ID}_active`);
    document.documentElement.classList.add(`${ID}_noscroll`);
  };

  const closePopup = () => {
    popup.classList.remove(`${ID}_active`);
    document.documentElement.classList.remove(`${ID}_noscroll`);

    if (VARIATION === "1") {
      userClosedPopup = true;
    }
  };

  const addTriggerButtons = () => {
    if (document.querySelector(`.${ID}_trigger`)) return;

    trigger.classList.add(`${ID}_trigger`);
    trigger.textContent = "Zeven dagen gratis kijken?";
    trigger.addEventListener("click", () => {
      showPopup();
      fireEvent("Click - Sticky button");
    });

    document.body.insertAdjacentElement("beforeend", trigger);
  };

  const createPopup = () => {
    if (document.querySelector(`.${ID}_wrapper`)) return;

    // Add popup to the dom
    popup.classList.add(`${ID}_wrapper`);
    popup.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="${ID}_content">
      <h2>Zeven dagen gratis kijken?</h2>
      <p>Meld je vandaag aan en krijg de eerste week gratis, daarna betaal je slechts € 14,95 per maand. De app is maandelijks opzegbaar.</p>
      <div class="${ID}_image"><img src="https://brainlabs-media.s3.eu-west-2.amazonaws.com/cd8/cd8_tv.png" alt="tv" /></div>
      <div class="${ID}_ctas">
      <a href="/checkout/producthandlerott?bomvol" class="${ID}_join">JA GRAAG</a>
      <a class="${ID}_close">Nee bedankt</a>
      </div>
      </div>
      `
    );

    document.body.insertAdjacentElement("beforeend", popup);
  };

  const init = () => {
    createPopup();

    if (localStorage.getItem(`${ID}_dismissed`)) return;

    // Variant specific setup.
    if (VARIATION === "1") {
      const cb = (percScrolled) => {
        if (percScrolled > threshold) {
          showPopup();
          fireEvent("Visible - Popup shown on scroll");
        }
      };
      trackScroll(cb);
    } else {
      // Add buttons which trigger the popup
      addTriggerButtons();

      // Show trigger button on scroll (mobile)
      const banner = document.querySelector(".banner1");
      if (banner) {
        const bannerHeight = banner.offsetHeight;
        const winHeight = window.innerHeight;
        const bannerHeightPerc = Math.round(
          (bannerHeight / (docHeight - winHeight)) * 100
        );

        // Hide trigger button after banner.
        const cb = (percScrolled) => {
          if (percScrolled > bannerHeightPerc) {
            trigger.classList.add(`${ID}_active`);
          } else {
            trigger.classList.remove(`${ID}_active`);
          }
        };

        trackScroll(cb);
      }
    }

    // Events.
    const cta = document.querySelector(`.${ID}_join`);
    if (cta) {
      cta.addEventListener("click", () => {
        fireEvent("Click - CTA");
      });
    }

    const close = document.querySelector(`.${ID}_close`);
    if (close) {
      close.addEventListener("click", () => {
        closePopup();
        fireEvent("Click - Close");
        localStorage.setItem(`${ID}_dismissed`, true);
      });
    }
  };

  init();
};
