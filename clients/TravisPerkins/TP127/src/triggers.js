import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';
// import flicker from './flickerprevention';


// flicker();
pollerLite([
  '#tab-overview .featureClass ul > li', // Overiew points
  '#tpPdpRightPanelComponent > .tpInfoWrapper', // Price/login container
  '#tab_01', // Overview tab
  'body:not(.TP127)', // Body without test class, prevent test duplication
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
