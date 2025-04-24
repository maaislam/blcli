import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '.size-guide-wrapper a.size-guide-init', () => {
    let run = false;
    if (window.wc_aelia_currency_switcher_params) {
      run = true;
    }
    return run;
  },
], activate);
