/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();

  // Experiment code
  document.querySelector('.buying-buttons__buy.js-buyingButton').addEventListener('click', () => {
    events.send('HS008 control', 'click', 'Buy Button', { sendOnce: true });
  });

  if (document.querySelector('.js-ifcBuyButton.buying-buttons-ifc__button')) {
    document.querySelector('.js-ifcBuyButton.buying-buttons-ifc__button').addEventListener('click', () => {
      events.send('HS008 control', 'click', 'Finance Button', { sendOnce: true });
    });

    document.querySelector('.ifc-calculator__add-to-bag').addEventListener('click', () => {
      events.send('HS008 control', 'click', 'Finance Add to Bag Button', { sendOnce: true });
    });
  }
};

export default activate;
