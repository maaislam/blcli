import { fullStory, events } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);

  events.send(ID, 'V' + VARIATION, + ' activated');
}

export { setup }; // eslint-disable-line
