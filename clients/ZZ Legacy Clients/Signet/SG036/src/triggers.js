/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from './lib/shared';
import { pollerLite } from '../../../../lib/uc-lib';

const exclusions = shared.EXCLUSIONS;

pollerLite([
  'body',

  // If a user has visited hsamuel.co.uk or ernestjones.co.uk they are not at risk
  // of seeing the built-in 10% off newsletter (it only runs on page first land); 
  // where they land on a PDP page, they risk seeing it so we can't run in that instance...
  () => document.referrer.match('hsamuel.co.uk') || document.referrer.match('ernestjones.co.uk'),

  () => {
    if(window.innerWidth <= shared.BREAKPOINT) {
      // Only run on PDPs on mobile
      return window.digitalData && window.digitalData.page
       && window.digitalData.page.pageInfo.pageType == 'PDP';
    }

    return true;
  },

  () => {
    const pName = window.digitalData.page.pageInfo.pageName;

    if(pName) {
      let result = true;

      exclusions.forEach((e) => {
        if(pName.match(e)) {
          result = false;
        }
      });

      return result;
    }

    return true;
  }
], activate);
