import { fullStory, events } from '../../../../lib/utils';
import settings from './settings';

/**
 * setup
 * @desc Performs standard experiment setup (FullStory tagging, GA event and body class)
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
