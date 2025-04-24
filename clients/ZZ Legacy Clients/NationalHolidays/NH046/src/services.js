import { fullStory, events } from '../../../../lib/utils';
import settings from './settings';

/**
 * setup
 * @desc Performs standard experiment setup (FullStory tagging, GA event and body class)
 */
function setup() {
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
  events.setTrackerName('tracker2');
  events.send(settings.ID, 'Activated', `Variation ${settings.VARIATION}`);
  document.body.classList.add(settings.ID);
  if (settings.VARIATION > 1) {
    document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
  }
}

function device() {
  let deviceType = '';
  if (window.innerWidth <= 450) {
    deviceType = 'mobile';
  } else {
    deviceType = 'desktop';
  }
  return deviceType;
}

export { setup, device }; // eslint-disable-line
