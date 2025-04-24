/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

if (!ieChecks) {
  pollerLite(
    [
      "body",
      () => {
        const urls = [
          "canaldigitaal.nl/tv-app/mobiel/",
          "canaldigitaal.nl/actie/mobiele-app/",
          "canaldigitaal.nl/actie/series/v/",
          "canaldigitaal.nl/actie/series/m/",
          "canaldigitaal.nl/actie/voetbal/ek/",
          "canaldigitaal.nl/klantenservice/alles-over/smart-tv-app/geschikte-smart-tvs/",
        ];

        let result = false;
        urls.forEach((url) => {
          if (window.location.href.indexOf(url) !== -1) result = true;
        });
        return result;
      },
    ],
    activate
  );
}
