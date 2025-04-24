import { fullStory, events } from '../../../../lib/utils';
import settings from './settings';

/**
 * setup
 * @desc Performs standard experiment setup (FullStory tagging, GA event and body class)
 */
function setup() {
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
  events.send(settings.ID, `V${settings.VARIATION}`, 'User viewed Tangiblee');
  document.body.classList.add(settings.ID);
  document.body.classList.add(`${settings.ID}--V${settings.VARIATION}`);
}

export { setup }; // eslint-disable-line
