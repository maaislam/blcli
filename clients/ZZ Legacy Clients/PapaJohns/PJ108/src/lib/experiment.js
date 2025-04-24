/* eslint-disable indent */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, updateStep } from "./services";
import { events, getCookie, setCookie } from "../../../../../lib/utils";
import shared from "./shared";
import sheets from "./sheets";

export default () => {
  setup();

  const { ID } = shared;

  const getStep = () => getCookie(`${ID}_step`) || "1";
  const isOffersPage = () => window.location.pathname.indexOf("/offers") != -1;
  const isOrderPage = () => {
    return window.location.pathname.indexOf("/order-confirmation") != -1;
  };

  const showTest = () => {
    let pass = false;

    // Disqualify based on these conditions.
    const step = getStep();
    if (step === "1") pass = true;
    if (!isOrderPage()) pass = false;

    return pass;
  };

  const makeNPS = () => {
    let markup = "";
    for (let i = 1; i < 11; i++) {
      markup += `
        <button data-score="${i}" type="button" class="${ID}_npsButton">
          ${i}
        </button>
      `;
    }
    return markup;
  };

  const renderHTML = () => {
    let anchor;
    if (isOffersPage()) {
      anchor = document.querySelector(".menuItems");
    } else if (isOrderPage()) {
      anchor = document.querySelector(".orderInfo");
    } else {
      anchor = null;
    }
    if (!anchor) return;

    anchor.insertAdjacentHTML(
      'beforebegin',
      `
        <div class="${ID}_wrapper" data-step="${getStep()}">
          <span class="${ID}_close"><i class="fa fa-times" aria-hidden="true"></i></span>
          <div class="${ID}_content">
            <div class="${ID}_body1">
              <div>
                <p>How would you rate your website experience so far today?</p>
                <p class="PJ-small">*Your answers will be recorded anonymously.</p>
              </div>

              <div class="${ID}_buttons">
                <span class="PJ-small">Very low</span>
                ${makeNPS()}
                <span class="PJ-small">Very high</span>
              </div>

              <div class="${ID}_mobileLabels">
                <div>
                  <span>1 = Very low</span>
                  <span>10 = Very high</span>
                </div>
                <span>*Your answers will be recorded anonymously.</span>
              </div>
            </div>

            <div class="${ID}_body2">
              <div>
                <p>Thank you, how can we further improve your website experience?</p>
                <p class="PJ-small">*Your answers will be recorded anonymously.</p>
              </div>
              <div class="${ID}_formWrapper">
                <input placeholder="Start typing here..." type="text" class="${ID}_feedback" />
                <button type="button" class="${ID}_send">Send</button>
              </div>
              <div class="${ID}_mobileLabels">
                <span>*Your answers will be recorded anonymously.</span>
              </div>
            </div>
          </div>
        </div>
      `
    );

    const wrapper = document.querySelector(`.${ID}_wrapper`);
    const close = document.querySelectorAll(`.${ID}_close`);

    close.forEach((btn) => {
      btn.addEventListener("click", () => {
        wrapper.classList.add(`${ID}_hidden`);
        updateStep("done");
      });
    });
  };

  if (showTest()) {
    if (isOffersPage()) {
      // Wait a minute before any functionality on offers page
      // setTimeout(() => {
        renderHTML();
        sheets();
      // }, 60000);
    } else {
      renderHTML();
      sheets();
    }
  }
};
