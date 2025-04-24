import { events } from '../../../../../lib/utils';
import settings from './settings';

const { ID } = settings;
/**
 * Standard experiment setup
 */
function setup() {
  events.send(`${ID} v${settings.VARIATION}`, 'Activated', `${ID} Activated`);
}

export { setup }; // eslint-disable-line
