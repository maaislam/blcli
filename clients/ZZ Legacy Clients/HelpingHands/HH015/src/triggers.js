import Run from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#intro', // Render location for content - Mobile, Desktop
  '#content > .row', // Render location for content - Tablet
  '.col-xs-12 > h2', // All headers
  '.sub-nav', // sub nav
  '#sidebar > .row', // Subnav moved here - desktop
  '#main', // Content container
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], Run);
