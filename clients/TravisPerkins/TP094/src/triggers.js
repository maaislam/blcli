import run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.yCmsContentSlot.header_buttons',
  '.tpMiniCart',
  '.tpHeaderLinks',
  '#header > .tpHeaderContent_holder .nav > li > .button_image',
  // '.mt_endcap.mt_horizontal',
  '#categories-menu-item',
  '#alphabetical-list',
  '.siteSearch.search > form',
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
