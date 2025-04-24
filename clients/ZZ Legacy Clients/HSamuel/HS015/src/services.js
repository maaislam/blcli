import { fullStory, events } from '../../../../lib/utils';
import settings from './settings';

/**
 * @desc Runs all setup functions
 */
function setup() {
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
  events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
  document.body.classList.add(settings.ID);
  if (settings.VARIATION > 1) {
    document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
  }
}

export { setup }; // eslint-disable-line
