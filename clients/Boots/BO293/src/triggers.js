/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
import {
	parentingClubSkus,
	// hairLossProducts,
	// erectileDysfunctionProducts,
	excludedSkus,
} from "./lib/data";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

const hrefArray = location.pathname.split("-");
const sku = hrefArray[hrefArray.length - 1]
  .replace(".p", "")
  .replace(".P", "");

  if (!excludedSkus[sku]) {
    if (parentingClubSkus[sku]) {

    if(!ieChecks) {
      if(!getCookie('Synthetic_Testing')) {
        pollerLite([
          'body',
        ], activate);
      }
    }
  }
}
