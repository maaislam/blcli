import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  'div.menuList',
  'div.menuList a.greenButton',
  () => {
    let poller = false;
    if (window.location.pathname.indexOf('/sides.aspx') > -1) {
      poller = true;
    }
    return poller;
  },
], activate);
