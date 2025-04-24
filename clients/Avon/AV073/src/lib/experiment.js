/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { isAV072Page, setup } from "./services";
import shared from "./shared";
import { events } from "../../../../../lib/utils";
import stickyNav from "./stickyNav";

export default () => {
  setup();
  const { ID, VARIATION } = shared;
  const $window = $(window);

  const trackedState = {
    "sticky-nav-seen": false,
  };

  // Detect if element is in view and track.
  const scrolledPastElement = (element, eventAction, trackStickyNav) => {
    if (element) {
      const topOfElement = element.offset().top;
      const bottomOfElement = element.offset().top + element.outerHeight();
      const bottomOfScreen = $window.scrollTop() + $window.innerHeight();
      const topOfScreen = $window.scrollTop();
      // In view!
      if (topOfElement < bottomOfScreen) {
        if (!trackedState[eventAction]) {
          trackedState[eventAction] = true;
          events.send(`${ID}-${VARIATION}`, eventAction);
        }
      }

      if (trackStickyNav) {
        if (topOfElement < topOfScreen) {
          if (!document.body.classList.contains(`${ID}_stickyNav`)) {
            document.body.classList.add(`${ID}_stickyNav`);
          }
        } else if (document.body.classList.contains(`${ID}_stickyNav`)) {
          document.body.classList.remove(`${ID}_stickyNav`);
        }
      }
    }
  };

  /** Make all changes */
  const init = () => {
    // Match page.
    const skip = isAV072Page();
    if (skip) return;
    // Prevent duplicates.
    if ($(`.${ID}_wrapper`).length) return;
    // Stycky nav.
    stickyNav();

    // Detect scroll to fire tracking events.
    const scrollCallback = () => {
      scrolledPastElement(
        $(`.${ID}_stickyWrapper`).parent().next(),
        "sticky-nav-seen",
        true
      );
    };
    $window.scroll(scrollCallback);
  };
  /*
    Re-run this when browser is resized to simulate layout change check.
  */
  $window.resize(init);

  init();
};
