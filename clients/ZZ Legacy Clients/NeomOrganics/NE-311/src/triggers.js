/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import { isReturningUser } from "./lib/helpers";
import shared from "../../../../core-files/shared";

const { ID } = shared;

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

if (!ieChecks) {
  pollerLite(
    [
      () => {
        return !!window.ga && !!window.ga.loaded;
      },
    ],
    () => {
      setTimeout(() => {
        isReturningUser().then(() => {
          const timestamp = localStorage.getItem(`${ID}-timestamp`);
          const now = new Date().getTime();

          if (timestamp && Math.abs(timestamp - now) / (60 * 60 * 1000) > 24) {
            localStorage.removeItem(`${ID}-timestamp`);
            localStorage.removeItem(`${ID}-email-sign-up-submitted`);
          }

          pollerLite(
            [
              "body",
              'input.input[name="contact[email]"]',
              () => {
                let runExp = false;
                if (
                  window.location.href.indexOf("/challenge#contact_form") == -1
                ) {
                  runExp = true;
                } else if (
                  window.location.href.indexOf("/challenge#contact_form") > -1
                ) {
                  pollerLite([".shopify-challenge__message"], () => {
                    document.body.scrollTop =
                      document.documentElement.scrollTop = 0;
                  });
                }
                return runExp;
              },
              () => {
                let runExp = false;
                if (
                  localStorage.getItem(`NE-311-email-sign-up-submitted`) == null
                ) {
                  runExp = true;
                }
                return runExp;
              },
            ],
            activate
          );
        });
      }, 3000);
    }
  );
}
