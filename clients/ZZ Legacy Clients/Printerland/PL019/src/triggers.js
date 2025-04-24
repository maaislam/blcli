import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    let triggerPassed = false;
    if (window.location.href.indexOf('/printers') > -1 && document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_pnlProductList') && document.documentElement.clientWidth > 340) {
      triggerPassed = true;
    } else if (window.location.href.indexOf('/product/') > -1) {
      triggerPassed = true;
    }

    return triggerPassed;
  },
], activate);
