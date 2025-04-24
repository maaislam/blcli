/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getCookie } from '../../../../lib/utils';
// import shared from '/shared';

// const { ID, VARIATION } = shared;

pollerLite(['body',
  // () => {
  //   let poller = false;
  //   if (getCookie('homepagePreference') === 'TRADE') {
  //     poller = true;
  //   }

  //   return poller;
  // },
], activate);