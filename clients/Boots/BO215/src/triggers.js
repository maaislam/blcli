/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import { getCookie, pollerLite } from "../../../../lib/utils";
import shared from "../../../../core-files/shared";
import { fireEvent } from "../../../../core-files/services";
import testToRun from "./lib/experiment";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
const { VARIATION } = shared;

const isPDP = !!window.location.href.match(/(\d+)[^-]*$/g);
  const PDPRE = /.*(-)([\d]{7,8}(p)|[\d]{7,8}).*/;
  const PDPcode = window.location.pathname.match(PDPRE)[2];

if (!ieChecks && isPDP) {
  
  if (!getCookie("Synthetic_Testing")) {
    if (VARIATION == "1" || VARIATION === "3") {
      if (PDPcode) {
        const time1 = performance.now();
        fetch(`https://octopus-app-c6o8t.ondigitalocean.app/compare-similar-items/${PDPcode}/`)
          .then((r) => r.json())
          .then((d) => {
        
              pollerLite(["body", "#estore_productpage_template_container > .rowContainer > .row"], () => {
                testToRun(d.Data);
                const time2 = performance.now();
                if (time2 - time1 > 1000) {
                  fireEvent("Request took over a second");
                }
              });
              
          })
          .catch(() => {
            return;
          });
      }
    } else {
      pollerLite(["body", "#estore_productpage_template_container"], () => {
        testToRun();
      });
    }
  }
}
