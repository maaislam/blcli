import { events } from '../../../../../lib/utils';
import settings from './settings';

const { ID } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  events.send(`${ID} Control`, 'Activated', `${ID} Activated`);
}

export { setup }; // eslint-disable-line
