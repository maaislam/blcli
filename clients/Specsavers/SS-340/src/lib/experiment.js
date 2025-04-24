/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  if (VARIATION == "control") return;

  (function changeHeadingText() {
    const heading = document.querySelector(
      "div.form-group.sphere.prescription-selector-content .font-heading-bold span"
    );
    heading.innerText = "Sphere (SPH) / Power";
  })();

  function renderExperimentUI() {
    const entry = document.querySelector(
      "div.form-group.sphere.prescription-selector-content"
    );
    const root = /* html */ `
			<div class="${ID}-root">
				<details>
					<summary>
						<h3>What is Sphere / Power?</h3>
						<p>Sphere refers to the power of the lens required to correct any short or long sight and it’ll often be different in each eye.</p>
					</summary>
					<div class="${ID}-content">
						<p>There will be a plus or minus sign in front of the sphere value and it’s important you enter this accurately to allow us to provide the correct prescription.</p>
					</div>
				</details>
				<button>Read more</button>
			</div>
		`;

    entry.insertAdjacentHTML("beforeend", root);
  }

  function rebindSummaryEventToButton() {
    const summary = document.querySelector(`div.${ID}-root summary`);
    const button = document.querySelector(`div.${ID}-root button`);

    summary.addEventListener("click", (e) => {
      e.preventDefault();
    });

    button.addEventListener("click", (e) => {
      e.preventDefault();

      fireEvent("Click CTA");

      if (summary.parentElement.hasAttribute("open")) {
        summary.parentElement.removeAttribute("open");
        button.textContent = "Read more";
      } else {
        summary.parentElement.setAttribute("open", "");
        button.textContent = "Read less";
      }
    });
  }

  function renderExperiment() {
    renderExperimentUI();
    rebindSummaryEventToButton();
  }

  renderExperiment();

  (function reRenderExperimentOnRouteChange() {
    new MutationObserver(() => {
      const entry = document.querySelector(
        "div.form-group.sphere.prescription-selector-content"
      );

      if (entry && !document.querySelector(`div.${ID}-root`)) {
        renderExperiment();
      }
    }).observe(document.querySelector("ss-root"), { childList: true });
  })();
};
