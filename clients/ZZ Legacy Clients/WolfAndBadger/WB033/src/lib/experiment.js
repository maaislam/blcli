/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { observer } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

// Inject the Snap script into the page.
const injectScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.setAttribute(
      "data-config",
      "https://widgets.snap.vision/configs/wolfandbadger.json"
    );
    script.setAttribute("id", "uc_snap_script");
    script.setAttribute("data-font", "futura-pt");
    script.async = true;
    script.type = "text/javascript";
    script.src = `https://widgets.snap.vision/latest/downloads/dynamic-widget-snap.js`;
    script.addEventListener("load", resolve);
    script.addEventListener("error", (e) => reject(e.error));
    document.head.appendChild(script);
  });
};

export default () => {
  // Prevent duplicates.
  if (document.getElementById("uc_snap_script")) return;
  setup();

  fireEvent("Conditions Met");

  // track tracking.
  let snapTracked = false;
  let discoverTracked = false;

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // Inject the Snap script on all variants (inc. control)
  injectScript()
    .then(() => {})
    .catch((error) => {
      console.error(error);
    });

  // Observe for changes on PDP
  observer.connect(
    document.getElementById("content"),
    () => {
      // ALL - Snap Element added?
      if (document.querySelector(".SNAP-widgetContainer") && !snapTracked) {
        fireEvent("Loaded - Snap panel");
        snapTracked = true;

        // V1 - place after Discover more
        if (VARIATION !== "control") {
          let anchor = document.querySelector(".related-products");
          const snap = document.querySelector(".SNAP-widgetContainer");
          if (!anchor) {
            anchor = document.querySelector(".related-products-container");
          }
          if (!anchor) {
            anchor = document.querySelector(".WB013_wrapper");
          }
          if (!anchor) {
            anchor = document.querySelector(".product-details-container");
          }

          // Move Snap after anchor.
          if (anchor && snap) {
            anchor.insertAdjacentElement("afterend", snap);
          }
        }
      }

      // ALL - Discover More loaded?
      if (document.querySelector(".related-products") && !discoverTracked) {
        fireEvent("Loaded - Discover more");
        discoverTracked = true;
      }
    },
    {
      childList: true,
      subtree: true,
    }
  );
};
