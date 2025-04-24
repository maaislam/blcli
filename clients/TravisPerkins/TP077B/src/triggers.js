/* eslint-disable */
import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#addForCollectButton', '#cboxClose', '.postcode-input', '.tpProductInfo', '.search-box > .postcode-input', '#collectionBranchLocatorButton',() => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
}
], Run);
