import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.benefit-bar .o-unit-1of3--m .benefits-bar__content span',
  '.product--short-description',
  () => {
    let run = false;
    if (window.dataLayer && window.dataLayer[0]) {
      run = true;
    }
    return run;
  },
], activate);
