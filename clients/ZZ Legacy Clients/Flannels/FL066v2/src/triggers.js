import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.CheckoutProgressBack',
  '.LogoCheck a',
  () => {
    let run = false;
    if (window.dataLayer && window.dataLayer[1]) {
      run = true;
      // if (window.navigator && window.navigator.platform) {
      //   var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
      //   if (!iOS) {
      //   }
      // }
    }
    return run;
  }
], activate);
