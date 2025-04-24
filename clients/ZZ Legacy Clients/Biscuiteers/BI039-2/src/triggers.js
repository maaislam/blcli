import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers } from './lib/winstack';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  destroyPollers();
  killAllEventListeners();
  killObservers();
  destroyIntervals();

  document.body.classList.remove('BI039-2');
  document.body.classList.remove('BI039-2-1');
  document.body.classList.remove('BI039-2-no_scroll');

  const removeElms = ['.BI039-2-container', '.BI039-2_customBox', '.BI039-2-deliver_text', '.BI039-2_deliveryTab', '.BI039-2_buyNowTab', '.BI039-2-upsell_content', '.BI039-2-ctaButtons', '.BI039-2-buyButton', '.BI039-2-delivery'];
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
  'local-add-to-basket .button',
  '.w-12.flex h1',
  () => document.querySelector('local-add-to-basket .button').textContent !== 'out of stock',
], activate);
