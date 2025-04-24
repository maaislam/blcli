import { fullStory, events } from '../../../../lib/utils';
import settings from './settings';

/**
 * setup
 * @desc Performs standard experiment setup (FullStory tagging, GA event and body class)
 */
function setup() {
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
  document.body.classList.add(settings.ID);
  events.send(settings.ID, settings.VARIATION, `${settings.ID} activated`);
  if (settings.VARIATION > 1) {
    document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
  }
}

export { setup }; // eslint-disable-line
