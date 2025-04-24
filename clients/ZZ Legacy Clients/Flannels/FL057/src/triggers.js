import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', () => {
    let run = false;
    if (window.dataLayer && window.dataLayer[1]) {
      run = true;
    }
    return run;
  },
], activate);
