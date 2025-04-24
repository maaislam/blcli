import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory('GD040', `Variation ${VARIATION}`);
  document.body.classList.add(ID);
}

export { setup }; // eslint-disable-line
