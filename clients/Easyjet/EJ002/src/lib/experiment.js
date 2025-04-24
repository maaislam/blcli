import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  if (VARIATION == "control") {
    return;
  }

  const targetInput = document.getElementById("mailing-option-ej-out");

  new MutationObserver((mutations, observer) => {
    for (let i = 0; i < mutations.length; i += 1) {
      targetInput.click();
      observer.disconnect();
    }
  }).observe(targetInput, {
    attributeFilter: ["aria-checked"],
  });
};
