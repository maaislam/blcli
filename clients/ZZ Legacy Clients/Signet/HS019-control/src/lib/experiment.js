/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();

  const filterButton = document.querySelector('.cta.js-modal-trigger.filter-toggle');
  filterButton.addEventListener('click', () => {
    events.send('HS019 Control', 'click', 'Clicked filters', { sendOnce: true });
  });

};

export default activate;
