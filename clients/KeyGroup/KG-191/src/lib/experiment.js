/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import {
  setup,
  fireEvent,
  newEvents,
} from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { logMessage, pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  pollerLite(["body .main-header"], () => {
    const targetElem = document.querySelector(".main-header");

	let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


    let msg;

    const proccessMsgBasedonTime = () => {
      const date = new Date();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const day = date.getDay();
      if (date.getDay() === 5) {
        // Friday
        if (hour < 9) {
          msg = `Closed till 9am. <a href="/equity-release/callback">Schedule a callback</a>`;
        } else {
          if (hour > 8 && hour < 18) {
            if (hour === 17 && minutes < 30) {
              msg = `Open until 5:30pm, call free on <a href="tel:0808 252 9170">0808 252 9170</a>`;
            } else if (hour < 17) {
              msg = `Open until 5:30pm, call free on <a href="tel:0808 252 9170">0808 252 9170</a>`;
            } else {
              msg = `Closed till ${
                days[day + 1]
              }. <a href="/equity-release/callback">Schedule a callback</a>`;
            }
          } else {
            msg = `Closed till ${
              days[day + 1]
            }. <a href="/equity-release/callback">Schedule a callback</a>`;
          }
        }
      } else if (date.getDay() === 6) {
        // Saturday
        if (hour < 9) {
          msg = `Closed till 9am. <a href="/equity-release/callback">Schedule a callback</a>`;
        } else {
          if (hour > 8 && hour < 18) {
            msg = `Open until 5pm, call free on <a href="tel:0808 252 9170">0808 252 9170</a>`;
          } else {
            msg = `Closed till ${days[1]}. <a href="/equity-release/callback">Schedule a callback</a>`;
          }
        }
      } else if (date.getDay() === 0) {
        // Sunday
        msg = `Closed till ${
          days[day + 1]
        }. <a href="/equity-release/callback">Schedule a callback</a>`;
      } else {
        if (hour < 9) {
          msg = `Closed till 9am. <a href="/equity-release/callback">Schedule a callback</a>`;
        } else {
          if (hour > 8 && hour < 20) {
            msg = `Open until 8pm, call free on <a href="tel:0808 252 9170">0808 252 9170</a>`;
          } else {
            msg = `Closed till ${
              days[day + 1]
            }. <a href="/equity-release/callback">Schedule a callback</a>`;
          }
        }
      }
      return msg;
    };
    proccessMsgBasedonTime();

    const openingTime = `<section class="${ID}_top_bar">
							<div class="${ID}_top_bar_container">${proccessMsgBasedonTime()}</div>
						</section>`;
    document.querySelector(`${ID}_top_bar`)?.remove();
    targetElem.insertAdjacentHTML("afterbegin", openingTime);

    // Update time every second
    setInterval(() => {
      const targetElem = document.querySelector(`.${ID}_top_bar_container`);
      targetElem.innerHTML = proccessMsgBasedonTime();
    }, 1000);
  });
};

const addTracking = () => {
  document.querySelector("body").addEventListener("click", ({ target }) => {
    //console.log(target, "target")
    if (target.getAttribute("href") === "tel:0808 252 9170") {
      fireEvent("User clicked on phone number to make a call");
    } else if (target.getAttribute("href") === "/equity-release/callback") {
      fireEvent("User clicked on schedule callback link");
    } else if (target.closest(".contact__open-today")) {
      fireEvent("User clicked to open the opening times");
    } else if (target.closest(".submit-button")) {
      fireEvent("User completes schedule callback form");
    }
  });
};

export default () => {
  let loadCount = parseInt(localStorage.getItem("ucdebug_count")) || 0;

  if (loadCount === 1) {
    console.log("load count 1 retur");
    // This is the second time the page is loaded
    localStorage.removeItem("ucdebug_count");
    return;
  }

  // Increment the load count
  localStorage.setItem("ucdebug_count", loadCount + 1);
  newEvents.initiate = true;
  newEvents.methods = ["datalayer"];
  newEvents.property = "G-LNFZ1KRLB8";

  setup();

  logMessage(ID + " Variation: " + VARIATION);

  fireEvent("Conditions Met");

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  addTracking();
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  startExperiment();
};
