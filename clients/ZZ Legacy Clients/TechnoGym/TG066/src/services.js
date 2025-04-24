import { fullStory } from '../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);
}

export { setup }; // eslint-disable-line
