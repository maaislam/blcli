import { Run, capturePrev } from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#HeaderGroup', '#MoreFromLinks > ul > .MoreFromLinksRow > a', '#mp-pusher > .mp-scroller',
  () => {
    let trigger = false;
    if (localStorage.getItem('FL009_title') && localStorage.getItem('FL009_href')) {
      trigger = true;
    }

    return trigger;
  },
], Run);

poller([
  'body.AltProdList',
  '.topheadbox h1 span', () => {
    // Prevents test running on branded category pages causing both breadcrumbs to link to same page
    // Allows test to run on seach results
    let trigger = false;
    if (window.location.pathname.match(/^(\/)(mensclearancehome|men|mens|kids|womensclearancehome|women|Women|womens|moncler|clearancehome|kidshome|homeware|flannelswoman|gift)(($|\?.*)|(\/)[\w\d_+-]+($|\?.*)|(\/)[\w\d_+-]+(\/)[\w\d_+-]+($|\?.*)|(\/)[\w\d_+-]+(\/)[\w\d_+-]+(\/)[\w\d_+-]+($|\?.*)|(\/)[\w\d_+-]+(\/)[\w\d_+-]+(\/)[\w\d_+-]+(\/)[\w\d_+-]+($|\?.*))/) || window.location.pathname.toUpperCase() === '/SEARCHRESULTS') {
      trigger = true;
    }
    return trigger;
  },
], capturePrev);
