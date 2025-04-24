import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    let poller = false;
    if (window.location.pathname.indexOf('/pizzas.aspx') > -1) {
      poller = true;
    }
    return poller;
  },
], activate);
