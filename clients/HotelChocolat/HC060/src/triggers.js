/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from './lib/shared';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  const { ID, VARIATION } = shared;

  pollerLite([
    'body',
    '#main button#add-to-cart',
    '#main-header div#mini-cart',
    () => {
      return !!window.jQuery;
    }, 
    () => {
      let runExperiment = false;
      
      if (localStorage.getItem(`${ID}-add-to-basket-modal`) !== null) {
        let pagesExperimentHasRun = JSON.parse(localStorage.getItem(`${ID}-add-to-basket-modal`));

        if (pagesExperimentHasRun.indexOf(`${window.location.pathname}`) == -1) {
          runExperiment = true;
        }
      } else if (localStorage.getItem(`${ID}-add-to-basket-modal`) == null) {
        runExperiment = true;
      }

      return runExperiment
    },
    // () => {
    //   return !!window.jQuery.fn.slick
    // }, 
    // -----------------
    // If slick needed
    // -----------------
    // () => {
    //   if(typeof window.jQuery.fn.slick !== 'undefined') {
    //     return true;
    //   }
    // },
    // -----------------
    //
    () => !!(document.readyState == 'complete'), // Platform workaround rather than win-onload
  ], () => {
    activate();
  });
}
