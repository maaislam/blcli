import { fullStory, events } from '../../../../lib/utils';
import settings from './settings';

/**
 * setup
 * @desc Performs standard experiment setup (FullStory tagging, GA event and body class)
 */
function setup() {
  const { ID, VARIATION } = settings;
  const ACCOUNT_TYPE = window.dataLayer[0].loggedInType;

  fullStory(ID, `Variation ${VARIATION}`);
  events.send(ID, 'Activated', `Variation ${VARIATION}`);
  events.send(ID, 'Account Type', ACCOUNT_TYPE);

  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

export { setup }; // eslint-disable-line