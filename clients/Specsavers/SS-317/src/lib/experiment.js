/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

/**
 * Helper function insert button
 */
const render = () => {
  if (document.querySelector(`.${ID}-new-btn`)) {
    return;
  }

  const ctaDiv = document.querySelector(".cta-btn-set");
  ctaDiv.classList.add(`${ID}-btns`);

  const ctaButtons = ctaDiv.querySelectorAll(".cta-btn");

  const btn = document.createElement("a");
  btn.setAttribute("href", "/book/location");
  btn.classList.add("cta-btn");
  btn.classList.add(`${ID}-new-btn`);
  btn.textContent = "Book a contact lens appointment";

  // ---------
  // Insert Button after 1st button on mobile, at end on desktop
  // ---------
  if (VARIATION != "control") {
    if (window.innerWidth < 600) {
      const targetBtn = ctaButtons[0];

      targetBtn.insertAdjacentElement("afterend", btn);
    } else {
      ctaDiv.insertAdjacentElement("beforeend", btn);
    }
  }

  // ---------
  // Change button text if variation 2
  // ---------
  if (VARIATION == 2) {
    ctaButtons[0].innerText = "Eye test";
    ctaButtons[1].innerText = "Hearing test";
    btn.textContent = "Contact lens appointment";
  }

  // ---------
  // Click Listener
  // ---------
  document.querySelectorAll(`.${ID}-btns .cta-btn`).forEach((b) => {
    b.addEventListener("click", (e) => {
      fireEvent(`Click CTA - ${e.target.textContent}`);
    });
  });
};

export default () => {
  setup();

  fireEvent("Conditions Met");

  render();
};
