import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";
import { countdown } from "../../../../../lib/uc-lib";
import { stepMachines } from "./assets";

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");
  // console.log(`%c${ID + "-" + VARIATION}`, `color: green; font-size: 30px`);
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }
  pollerLite([`#main .steps_section .steps_description`, `#main .configurator-container`, `.dynamic-content-slot`], () => {
    fireEvent(`User sees the subscription page`);
    stepMachines();
    const termsAndCondNode = document.querySelector(`.dynamic-content-slot p a[href$="terms-and-conditions.html"]`)?.closest("p")?.cloneNode(true);
    termsAndCondNode.style.textAlign = "center";
    const termsAndCond = document.createElement("div");
    termsAndCond.classList.add(`${ID}-Terms&Condition`);
    termsAndCond.appendChild(termsAndCondNode);
    document.querySelector(`#main .configurator-landing`).insertAdjacentElement("beforeend", termsAndCond);
    // const targetNextStepButton = document.querySelector(`.right_container.visible #nextStep`);
    // const observer = new MutationObserver(() => {
    //   const activeSpan = targetNextStepButton.querySelector(`span.activeStep`);
    //   console.log(activeSpan);
    //   const accordion = document.querySelector(`.${ID}--product-accordion`);
    //   if (activeSpan.getAttribute(`stepbtn-id`) == "addons") {
    //     !accordion?.classList.contains(`${ID}--x-hidden`) && accordion?.classList.add(`${ID}--x-hidden`);
    //   } else {
    //     accordion?.classList.contains(`${ID}--x-hidden`) && accordion?.classList.remove(`${ID}--x-hidden`);
    //   }
    // });
    // observer.observe(targetNextStepButton, { attributes: true, childList: true, subtree: true });
  });
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
};
