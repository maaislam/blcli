/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();

  const allNavLinks = document.querySelectorAll('#js--main-nav a');
  for (let index = 0; index < allNavLinks.length; index += 1) {
    const element = allNavLinks[index];
    element.addEventListener('click', () => {
      events.send('HS029 Control', 'clicked nav', 'fired', { sendOnce: true });
    });
  }
};

export default activate;
