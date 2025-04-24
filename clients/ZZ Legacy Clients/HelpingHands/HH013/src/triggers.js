import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#sidebar > .row > .col-md-12', // Content rendered after here for desktop
  '#mobile-cta-block', // Render location for mobile
  '#intro', // Render location for tablet
  'a[href*="@helpinghands"]', // Contains email link
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], Run);
