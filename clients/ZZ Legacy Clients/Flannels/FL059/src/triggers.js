import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.SizeDropDown',
  () => {
    let run = false;
    if (window._gaUAT) {
      run = true;
    }
    return run;
  },
], activate);
