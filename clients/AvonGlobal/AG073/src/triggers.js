/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import { waitForApp } from "../../../../lib/utils/avon";
import { events } from "../../../../lib/utils";
import shared from "../../../../core-files/shared";
import ag073_data from "./testdata";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

if (!ieChecks) {
  const { ID, VARIATION } = shared;

  // Force set GA reference to 360 account
  // As of March 2020 we noticed the default tracker isn't always
  // this core account
  events.setPropertyId("UA-142145223-1");

  /**
   * Poll for elements the run experiment
   */
  const pollAndFire = () => {
    pollerLite(
      [
        // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
        // Specify polling elements
        // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
        "body",
        ".ProductListCell",
        () => {
          return !!window.$;
        },
        () => {
          // Targetting from the data element.

          if (!ag073_data || !ag073_data.target) return false;

          // Match any of the provided uris to this page's url.
          let matched = false;
          ag073_data.target.forEach((uri) => {
            if (window.location.href.indexOf(uri) !== -1) matched = true;
          });

          return matched;
        },
      ],
      () => {
        // Fire did meet conditions
        activate();
      }
    );
  };

  /**
   * Top-level polling entry point for code execution
   */
  waitForApp().then((data) => {
    shared.rootScope = data.rootScope;
    pollAndFire();
  });
}
