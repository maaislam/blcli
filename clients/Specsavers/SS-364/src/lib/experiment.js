/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { h, render } from "preact";
import Wizard from "./Wizard";

// Tree nodes
import nodes from "./nodes";

const { ID, VARIATION } = shared;

/**
 * Entry point for experiment
 */
export default (textNode) => {
  setup();

  fireEvent("Conditions Met");

  if (VARIATION == "control") {
    return;
  }

  textNode.textContent =
    "Find out if you are eligible for an NHS-funded eye test in as little as 2 minutes.";

  // Add initialiser markup
  // const h1 = document.querySelector(".page-header h1");
  // h1.insertAdjacentHTML(
  //   "afterend",
  //   `
  //   <div class="${ID}-init-wrap">
  //     <p>Find out if you are eligible for an NHS-funded eye test in as little as 2 minutes</p>
  //     <p>
  //       <a class="${ID}-init">Let's get started</a>
  //     </p>
  //   </div>
  // `
  // );

  // Create Wizard
  const root = document.createElement("div");
  root.id = `${ID}-root`;
  document.body.append(root);

  function selectCtaByText(text) {
    const callToActions = document.querySelectorAll(
      "div.container .dev-section a"
    );
    for (let i = 0; i < callToActions.length; i++) {
      if (callToActions[i].innerText.includes(text)) {
        return callToActions[i];
      }
    }
  }

  render(
    <Wizard
      nodes={nodes}
      trigger={selectCtaByText("Check if you're eligible for a free eye test")}
    />,
    root
  );
};
