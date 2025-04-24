/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import { insertAfterElement } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";
import { h, render } from "preact";
import App from "./App";
import data from "./data/data";
import data2 from "./data/data-v2";

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");

  document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem(`${ID}`) !== "Fired") {
      window.cmCreateManualLinkClickTag(
        `/${ID}?cm_sp=AdobeTarget${ID}-_-${ID} V${VARIATION}-_-fired`
      );

      sessionStorage.setItem(`${ID}`, "Fired");
    }
  });

  if (window.usabilla_live) {
    window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
  }

  if (VARIATION == "control") {
    return;
  }

  const entryElement = document.querySelectorAll(
    ".oct-grid__row.oct-grid__row--full-width"
  )[1];

  const rootElement = document.createElement("div");
  rootElement.id = `${ID}-root`;

  insertAfterElement(entryElement, rootElement);

  render(
    <App data={VARIATION === "3" ? data2 : data} variation={VARIATION} />,
    rootElement
  );
};
