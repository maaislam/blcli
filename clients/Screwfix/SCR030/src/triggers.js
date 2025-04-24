/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from "../../../../core-files/shared";

const { VARIATION } = shared;
const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks && window.location.href.includes("/p/")) {
  pollerLite(["body"], () => {
    if (VARIATION != "control") {
      pollerLite([() => window.dataLayer?.length > 0], () => {
        const dataLayer = window.dataLayer[0];
        let prodCategory = dataLayer?.prodCategory;
        if (prodCategory.toLowerCase() === "boilers") {          
          activate();
        }
      });
    } else {
      activate();
    }
  });
}
