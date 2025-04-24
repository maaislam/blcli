/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite(['body',
  '#main-content #productlistcontainer',
  'ul#navlist.s-productscontainer2',
  // --- Filter List
  'ul#filterlist',
  // --- Tile View Selection
  '#divColumnSelection ul.columnselector li',
  () => {
    let runExperiment = false;
    if (window.location.pathname.indexOf('/trainers') > -1
    && (window.location.pathname.indexOf('/mens/') > -1 || window.location.pathname.indexOf('/ladies/') > -1)
    && localStorage.getItem(`SD-396-size-filters-dismissed`) == null) {
      runExperiment = true;
    }

    return runExperiment;
  },
  ], activate);
}
