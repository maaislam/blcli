import { fullStory, events } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
  events.send('TG073', 'activated', 'TG073 activated', { sendOnce: true });
}

export { setup }; // eslint-disable-line
