import globals from './lib/global';
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getPageType } from './lib/services';

/** Triggers for each page type */
const triggers = {
  home: () => {
    pollerLite([
      '#ctl00_ContentPane',
      '.price-slider',
      () => !!window.jQuery,
    ], activate);
  },

  category: () => {
    pollerLite([
      '#main-body',
      '#ctl00_ContentPane',
      '.price-slider',
      () => !!window.jQuery,
    ], activate);
  },
};

const pageType = getPageType();
if (triggers[pageType]) {
  // Pass variables to global object for re-use in experiment.js
  globals.pageType = pageType;

  // Init
  triggers[pageType]();
}
