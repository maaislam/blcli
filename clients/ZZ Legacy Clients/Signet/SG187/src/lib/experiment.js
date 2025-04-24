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

/**
 * Activate
 */
export default () => {
  setup();

  fireEvent("Conditions Met");

  const checkSession = setInterval(function () {
    const { ID, VARIATION } = shared;

    if (
      sessionStorage.getItem("analyticsDataSentFor") &&
      sessionStorage.getItem("analyticsDataSentFor") ===
        window.location.pathname
    ) {
      if (typeof s !== "undefined") {
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }
      clearInterval(checkSession);
    }
  }, 1000);

  var checkCS = setInterval(function () {
    if (window._uxa) {
      window._uxa = window._uxa || [];
      window._uxa.push([
        "trackDynamicVariable",
        { key: `${ID}`, value: `Variation ${VARIATION}` },
      ]);
      clearInterval(checkCS);
    }
  }, 800);

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if (VARIATION !== "control") {
    const cta = document.createElement("div");
    cta.classList.add(`${ID}-cta`);
    cta.innerHTML =
      '<a href="https://www.ernestjones.co.uk/design-a-ring/design/?icid=ej-SIS-create-your-own">Design your ring</a>';

    const doubleCta = document.createElement("div");
    doubleCta.classList.add(`${ID}-cta`);
    doubleCta.innerHTML = `
    <a href="https://www.ernestjones.co.uk/design-a-ring/design/?icid=ej-SIS-create-your-own">Design your ring</a>
    <a href="https://www.ernestjones.co.uk/webstore/in-store-appointment.cdo?icid=ej-fn-appointment">Book a design appointment</a>
    `;

    const rows = document.querySelectorAll(".ejft2");
    rows[0].appendChild(cta);
    rows[8].innerHTML = "";
    rows[8].appendChild(doubleCta);

    const articles = document.querySelectorAll("article");
    articles[2].appendChild(cta.cloneNode(true));
    articles[4].appendChild(cta.cloneNode(true));
    articles[6].appendChild(cta.cloneNode(true));
  }
};
