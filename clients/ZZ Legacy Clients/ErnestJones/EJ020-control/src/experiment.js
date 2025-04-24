/**
 * EJ020 - Will It Fit Improvements
 * @author Lewis Needham - User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { events } from '../../../../lib/utils';

const activate = () => {
  setup();

  // Generic tracking
  const willItFit = document.querySelector('.tangiblee-button-wrap');
  willItFit.addEventListener('click', () => {
    events.send(settings.ID, 'Control', 'User clicked Tangiblee', { sendOnce: true });
  });
};

export default activate;
