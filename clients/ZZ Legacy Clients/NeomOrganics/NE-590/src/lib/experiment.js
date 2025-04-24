/**
 * NE-590 - New User email capture incentivisation
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";
import { checkboxClickEvents } from "./helpers";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");
  // console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  // Goals For All
  const url = window.location.href;
  if (url.indexOf("/checkouts/") > -1 && !/\bcheckouts\b.*\bthank_you\b/.test(url)) {
    checkboxClickEvents(`checkout`);
  } else if (/\bcheckouts\b.*\bthank_you\b/.test(url)) {
    checkboxClickEvents(`after checkout`);
  } else if (/register/.test(url)) {
    checkboxClickEvents(`register`);
  }
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") return;

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  let emailCheckbox;
  let hiddenCheckbox;
  const emailBox = `<div class="${ID}-email-msg__wrapper v${VARIATION}">
  <div class="${ID}-email-msg__container"></div>
</div>`;

  if (url.indexOf("/checkouts/") > -1 && !/\bcheckouts\b.*\bthank_you\b/.test(url)) {
    emailCheckbox = document.querySelector("input#checkout_buyer_accepts_marketing");
    hiddenCheckbox = document.querySelector('input[name="checkout[buyer_accepts_marketing]"]');
    emailCheckbox.closest(".section__content").insertAdjacentHTML("beforeend", emailBox);
  } else if (/register/.test(url)) {
    emailCheckbox = document.querySelector("input#acceptsMarketingFalse");
    hiddenCheckbox = document.querySelector('input[name="customer[accepts_marketing]"]');
    emailCheckbox.closest("div.field").insertAdjacentHTML("beforeend", emailBox);
  }

  let boxMessage = "";
  if (VARIATION == "1") {
    boxMessage = `<h2>Don’t want to be part of our wellbeing community?</h2>
      <div>You sure? Subscribe and receive the latest wellbeing news and exclusive offers - you really don’t want to miss out!</div>`;
  } else if (VARIATION == "2") {
    boxMessage = `<h2>Are you sure?</h2>
    <div>You are about to unsubscribe from emails. To subscribe for the latest wellbeing news and exclusive offers, untick the box.</div>`;
  }
  document.querySelector(`.${ID}-email-msg__container`).innerHTML = boxMessage;

  const msgHide = () => {
    document.querySelector(`.${ID}-email-msg__wrapper`).classList.add("scale-out-tl");
    document.querySelector(`.${ID}-email-msg__wrapper`).classList.remove("scale-in-tl");
    setTimeout(() => {
      document.querySelector(`.${ID}-email-msg__wrapper`).classList.remove("show");
    }, 440);
  };
  const msgShow = () => {
    document.querySelector(`.${ID}-email-msg__wrapper`).classList.add("show");
    document.querySelector(`.${ID}-email-msg__wrapper`).classList.add("scale-in-tl");
    document.querySelector(`.${ID}-email-msg__wrapper`).classList.remove("scale-out-tl");
    fireEvent(`Visible - Email message shown`);
  };
  emailCheckbox.addEventListener("click", (e) => {
    setTimeout(() => {
      // hiddenCheckbox.value == "1" is eqaul to hiddenCheckbox.checked == true
      if (hiddenCheckbox.name.includes("checkout")) {
        // console.log("hiddenCheckbox.value", hiddenCheckbox.value);
        if (hiddenCheckbox.value == "1") {
          msgHide();
        } else {
          msgShow();
        }
      } else {
        // console.log("hiddenCheckbox.checked", hiddenCheckbox.checked);
        if (hiddenCheckbox.checked == true) {
          msgHide();
        } else {
          msgShow();
        }
      }
    }, 500);
  });
};
