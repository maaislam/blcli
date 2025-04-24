/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

const { VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  if (VARIATION == "control") {
    return;
  }

  const steps = document.querySelector(".specs-stepper-labels");
  const widget = document.querySelector(".ss-widget__search");

  function setBookHeader(el) {
    el.innerHTML = /* html */ `
			<h1 class="page-header__title specs-typography specs-typography--h1 specs-typography--color-text-primary">
				Book an appointment
			</h1>
			<p style="margin-top: 0.75rem; margin-bottom: 1rem; color: #222;">Let's find your most convenient store</p>
		`;
  }

  function setNearestHeader(el) {
    el.innerHTML = /* html */ `
			<h1 class="page-header__title specs-typography specs-typography--h1 specs-typography--color-text-primary">
				Your nearest stores
			</h1>
		`;
  }

  const headerObserver = new MutationObserver(() => {
    if (
      document.querySelector(
        ".ss-widget__change-location.change-location-container"
      )
    ) {
      setNearestHeader(document.querySelector("#page-header"));
    } else {
      setBookHeader(document.querySelector("#page-header"));
    }
  });

  setBookHeader(document.querySelector("#page-header"));

  headerObserver.observe(widget, {
    childList: true,
  });

  new MutationObserver(() => {
    pollerLite([".ss-widget__search"], () => {
      const widget = document.querySelector(".ss-widget__search");

      if (steps.firstChild.hasAttribute("aria-current")) {
        setBookHeader(document.querySelector("#page-header"));
        headerObserver.observe(widget, {
          childList: true,
        });
      } else {
        headerObserver.disconnect();
      }
    });
  }).observe(steps, {
    attributes: true,
    childList: true,
    subtree: true,
  });
};
