import activate from './lib/experiment';
import settings from './lib/settings';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers } from './lib/winstack';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  destroyPollers();
  killAllEventListeners();
  killObservers();
  destroyIntervals();

  document.body.classList.remove(`${settings.ID}`);
  document.body.classList.remove(`${settings.ID}-${settings.VARIATION}`);

  document.body.classList.remove(`${settings.ID}-no_scroll`);

  const removeElms = [`.${settings.ID}-container`, `.${settings.ID}_customBox`, `.${settings.ID}-deliver_text`, `.${settings.ID}_deliveryTab`, `.${settings.ID}_buyNowTab`, `.${settings.ID}-upsell_content`, `.${settings.ID}-ctaButtons`, `.${settings.ID}-buyButton`, `.${settings.ID}-delivery`, `.${settings.ID}_aboutDelivery`];
  removeElms.forEach((elm) => {
    const queriedElm = document.querySelectorAll(elm);
    [].forEach.call(queriedElm, (queriedElm) => {
      if (queriedElm) {
        queriedElm.parentNode.removeChild(queriedElm);
      }
    });
  });

  document.documentElement.style = 'overflow-y: auto';
};

addPoller([
  'body',
  'local-product-view',
  'breadcrumbs',
], activate);
