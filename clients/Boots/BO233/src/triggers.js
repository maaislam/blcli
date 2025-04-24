/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */

import activate from "./lib/experiment";
import { getCookie, pollerLite } from "../../../../lib/utils";
import shared from "../../../../core-files/shared";
import { fireEvent } from "../../../../core-files/services";

const { VARIATION } = shared;

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

const isPDP = !!window.location.href.match(/(\d+)[^-]*$/g);
const PDPRE = /.*(-)([\d]{7,8}(p)|[\d]{7,8}).*/;

const PDPcode = window.location.pathname.match(PDPRE)[2];

if(VARIATION === '1' || VARIATION === '2' || VARIATION === 'control') {
  if(PDPcode) {
    const time1 = performance.now();
    fetch(`https://octopus-app-c6o8t.ondigitalocean.app/v2/compare-similar-items/${PDPcode}/`)
    .then((r) => r.json())
    .then((d) => {
      if (!ieChecks && isPDP) {
        if (!getCookie("Synthetic_Testing")) {
          pollerLite(["body", "#estore_productpage_template_container > .rowContainer > .row", '#estore_product_longdesc', '#richRelevanceContainer'], () => {
            activate(d.Data)
            const time2 = performance.now();
            if ((time2 - time1) > 1000){
              fireEvent('Request took over a second');
            }
          });
        }
      }
    })
    .catch(() => {
      return;
    });
  }
} else if(VARIATION === '3' || VARIATION === 'control-1') {
  if(PDPcode) {
    const time1 = performance.now();
    fetch(`https://octopus-app-c6o8t.ondigitalocean.app/compare-similar-items/${PDPcode}/`)
    .then((r) => r.json())
    .then((d) => {
      if (!ieChecks && isPDP) {
        if (!getCookie("Synthetic_Testing")) {
          pollerLite(["body", "#estore_productpage_template_container > .rowContainer > .row", '#estore_product_longdesc', '#richRelevanceContainer'], () => {
            activate(d.Data)
            const time2 = performance.now();
            if ((time2 - time1) > 1000){
              fireEvent('Request took over a second');
            }
          });
        }
      }
    })
    .catch(() => {
      return;
    });
  }
}

