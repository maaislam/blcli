import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/* eslint-disable */
pollerLite([
  'body',
], () => {
  const addButton = document.querySelector('.buying-buttons__buy.js-buyingButton');
  addButton.addEventListener('click', () => {
    events.send('EJ005 control', 'click', 'Add to bag');
  });

  events.send('EJ005', 'Control', 'EJ005 activated');
});
/* eslint-enable */
