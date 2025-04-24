import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers } from './lib/winstack';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  destroyPollers();
  killAllEventListeners();
  killObservers();
  destroyIntervals();

  const removeElms = ['.BI039-container', '.BI039_customBox', '.BI039-deliver_text', '.BI039_deliveryTab', '.BI039_buyNowTab', '.BI039-upsell_content'];
  removeElms.forEach((elm) => {
    const queriedElm = document.querySelectorAll(elm);
    [].forEach.call(queriedElm, (queriedElm) => {
      if (queriedElm) {
        queriedElm.remove();
      }
    });
  });
};

addPoller([
  'local-add-to-basket .button',
  '.w-12.flex h1',
  () => document.querySelector('local-add-to-basket .button').textContent !== 'out of stock',
], activate);
