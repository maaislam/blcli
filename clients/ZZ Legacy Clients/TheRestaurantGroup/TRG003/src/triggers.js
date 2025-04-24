import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  'section.menu-header',
  () => window.location.pathname.indexOf('/restaurants/') > -1 && window.location.pathname.indexOf('/menu') > -1,
  () => {
    let poller = false;
    const str = window.location.pathname;
    const patt = new RegExp("(?=.*?(restaurants))(?=.*?(menu))");
    const res = patt.test(str);
    if (res) {
      poller = true;
    }

    return poller;
  },
], activate);
