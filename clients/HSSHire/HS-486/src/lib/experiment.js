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

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();
  // console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);
  fireEvent("Conditions Met");

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

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  pollerLite([`.center_block.mob_vista`], () => {
    const headerLogos = document.querySelectorAll(`.center_block.mob_vista .siteLogo a img`);
    headerLogos.length > 0 &&
      headerLogos.forEach((logo) => {
        if (logo.matches(`.desktop_logo`)) logo.src = `https://blcro.fra1.digitaloceanspaces.com/HS-486/HSSProLogo.png`;
        else logo.src = `https://blcro.fra1.digitaloceanspaces.com/HS-486/HSSProLogoLarge.png`;
      });
  });
};
