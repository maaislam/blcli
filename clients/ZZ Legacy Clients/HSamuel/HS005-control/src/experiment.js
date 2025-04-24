import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

pollerLite([
  '.buying-info__price--current',
  '#js-ifcBuyButton',
  '#js-ifcProductUpdate',
  '.buying-info__name',
  '#js-productDeposit',
  '.ifcAddToBasketButton',
], () => {
  events.send('HS005', 'View', 'HS005 activated - Variation Control');

  const financeBtn = document.querySelector('#js-ifcBuyButton');
  financeBtn.addEventListener('click', () => {
    events.send('HS005', 'Click', 'HS005 clicked pay by finance - Variation Control', { sendOnce: true });
  });
});
