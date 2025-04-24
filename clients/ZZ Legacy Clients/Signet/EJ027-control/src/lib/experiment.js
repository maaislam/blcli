/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();

  const basketButton = document.querySelector('.buying-buttons #buy');
  basketButton.addEventListener('click', () => {
    events.send('EJ027 control', 'click buy button', { sendOnce: true });
  });

  // Experiment code
};

export default activate;
