/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";
import { keyFeaturesFunc } from "./helper/keyFeaturesFunc";

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");

  // console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);
  // if (window.usabilla_live) {
  //   window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
  // }

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
  } else {
    const locationPath = window.location.pathname;
    const keyFeaturesAllData = window.keyFeatures;
    const pageURLs = Object.keys(keyFeaturesAllData);
    const isValidUrl = pageURLs.findIndex((url) => url.includes(locationPath));
    const keyFeaturesData = Object.values(keyFeaturesAllData)[isValidUrl];
            keyFeaturesFunc(keyFeaturesData);
  }
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
};
