import run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.lockhart_mobile_homepage_menu_links.clearfix.cms-collection-component',
  '#content > .span-24.section1.last',
  '#content > .span-24.section1.last > .highlights-carousel',
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
