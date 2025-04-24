/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import { waitForApp } from "../../../../lib/utils/avon";
import { share, getPLPType } from "./lib/services";
import { events } from "../../../../lib/utils";
import shared from "./lib/shared";

const { ID, VARIATION } = shared;
let cookieBannerOn = false;
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
      ".Layout_Phone",
      ".SessionReady",
      () => document.documentElement.clientHeight > 650, // Larger mobiles
      () => window.$,
      () => {
        if (cookieBannerOn) return false;
        // No cookie modal
        const cookie = $("#Notification");
        if (!cookie) return false;

        // If app is not ready, false
        if (!window.AppModule.RootScope.Session.Ready) return false;

        // When app ready, and cookie not showing, true
        const $cookieScope = cookie.scope();

        // If the cookie banner was on during this session, don't load this experiment.
        if ($cookieScope.ShowCookiePolicy === true) {
          cookieBannerOn = true;
        }

        return (
          typeof $cookieScope.ShowCookiePolicy === "boolean" &&
          $cookieScope.ShowCookiePolicy === false
        );
      },
    ],
    () => {
      // Must be one of PLP pages.
      const trigger = getPLPType();
      if (trigger) {
        // Custom Usabilla var.
        let clientID = null;
        const value = `; ${document.cookie}`;
        const parts = value.split("; _ga=");
        if (parts.length === 2) clientID = parts.pop().split(";").shift();

        if (window.usabilla_live) {
          window.usabilla_live("data", {
            custom: {
              clientID,
            },
          });
        }

        // Fire did meet conditions
        events.send(`${ID}-${VARIATION}`, "did-meet-conditions");
        if (VARIATION.toLowerCase() !== "control") activate();
        else {
          // Control.
          sessionStorage.setItem(`${ID}-init`, "1");

          if (window.usabilla_live)
            window.usabilla_live("trigger", `${ID} Control`);
        }
      }
    }
  );
};

/**
 * Top-level polling entry point for code execution
 */
if (!sessionStorage.getItem(`${ID}-init`)) {
  waitForApp().then((data) => {
    // Make $ and rootScope global
    share(data);
    pollAndFire();
  });
}
