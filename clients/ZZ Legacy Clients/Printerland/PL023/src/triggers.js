import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    let poller = false;
    const urlPathname = window.location.pathname.toLowerCase();
    if (urlPathname.indexOf('printer') > -1) {
      pollerLite(['.content .cell', '.key-features .box'], () => {
        poller = true;
      });
    } else if (urlPathname.indexOf('/product/') > -1) {
      pollerLite(['section.container.product.printer', 'section.container.product.printer .images',  'section.container.features', '.feature-content'], () => {
        poller = true;
      });
    }
    return poller;
  },
], activate);
