/* eslint-disable indent */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from "./services";
import { events, getCookie, setCookie } from "../../../../../lib/utils";
import shared from "./shared";

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  const hasSeen = () => getCookie("PJ106-hasSeen");
  const hasPostcode = () => document.querySelector(".themeC");
  const isOffersPage = () => window.location.pathname.indexOf("/offers") !== -1;

  const showPopup = () => {
    let pass = false;

    // Cookie
    const ckie = getCookie("redwp");
    if (!ckie) {
      events.send("PJ106", "PJ106 No Show");
    }
    if (ckie == "A" || ckie == "B" || ckie == "A%2CB") {
      pass = true;
    }

    // Disqualify based on these conditions.
    if (hasSeen()) pass = false;
    if (!hasPostcode()) pass = false;
    if (!isOffersPage()) pass = false;

    return pass;
  };

  const dontShowAgain = () => setCookie("PJ106-hasSeen", true, 99);

  const renderHTML = () => {
    const offersList = document.querySelector(".menuItems");
    if (!offersList) return;

    offersList.insertAdjacentHTML(
      "afterbegin",
      `
            <div class="${ID}-wrapper">
                <span class="${ID}-close"><i class="fa fa-times" aria-hidden="true"></i></span>
                <div class="${ID}-content">



                    <div class="${ID}-body">
                        <p>Would you like to re-order the same food as last time?</p>

                        ${
                          VARIATION === "2"
                            ? `
                            <p class="PJ-small">We will try to match or better the last offer you had</p>
                        `
                            : ``
                        }

                        <div class="${ID}-buttons">
                        <button type="button" class="PJ-no">No</button>
                        <button type="button" class="PJ-yes">Yes</button>
                        </div>
                    </div>

                    <div class="${ID}-body--two">
                        <p>Great, thanks!</p>
                        <p class="PJ-small">We’re just gauging interest in this feature at this point, please continue with your order</p>

                        <button type="button" class="${ID}-close">Close</button>
                    </div>




                </div>
            </div>
        `
    );

    const wrapper = document.querySelector(`.${ID}-wrapper`);
    const close = document.querySelectorAll(".PJ106-close");
    const yesBtn = document.querySelector(".PJ106-buttons .PJ-yes");
    const noBtn = document.querySelector(".PJ106-buttons .PJ-no");

    close.forEach((btn) => {
      btn.addEventListener("click", () => {
        wrapper.classList.add("PJ106-hide");
        dontShowAgain();
      });
    });

    yesBtn.addEventListener("click", () => {
      wrapper.classList.add("PJ106-showMessage");
      events.send("PJ106", "PJ106 Click Yes", "User clicked Yes");
      dontShowAgain();
    });

    noBtn.addEventListener("click", () => {
      wrapper.classList.add("PJ106-showMessage");
      events.send("PJ106", "PJ106 Click No", "User clicked No");
      dontShowAgain();
    });
  };

  if (showPopup()) {
    renderHTML();
  }
};
