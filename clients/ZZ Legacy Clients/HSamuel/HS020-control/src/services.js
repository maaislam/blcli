import { events } from '../../../../lib/utils';
import settings from './settings';

/**
 * setup
 * @desc Performs standard experiment setup (FullStory tagging, GA event and body class)
 */
function setup() {
  events.send(settings.ID, 'Control', 'User viewed Tangiblee');
}

export { setup }; // eslint-disable-line
