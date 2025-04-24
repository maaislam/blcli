import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

pollerLite([
  '.buying-info__price--current',
  '#js-ifcBuyButton',
  '#ifcProductUpdate',
  '.buying-info__name',
  '#productDeposit',
  '.ifcAddToBasketButton',
], () => {
  events.send('EJ012', 'View', 'EJ012 activated - Control');

  const financeBtn = document.querySelector('#js-ifcBuyButton');
  financeBtn.addEventListener('click', () => {
    events.send('EJ012', 'Click', 'EJ012 clicked pay by finance - Variation Control', { sendOnce: true });
  });
});
