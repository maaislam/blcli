import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.offers-m-cont',
  '.offer-m',
  () => window.location.pathname.indexOf('/offers.aspx') > -1,
  () => {
    let poller = false;
    const ctaBtn = document.querySelector('.offer-m a.actionButton');
    if (ctaBtn) {
      const ctaText = ctaBtn.innerText.toLowerCase();
      if (ctaText.indexOf('pick a store') === -1) {
        poller = true;
      }
    }
    return poller;
  },
], activate);
