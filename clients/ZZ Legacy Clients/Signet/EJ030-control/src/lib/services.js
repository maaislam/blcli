import { events } from '../../../../../lib/utils';
import settings from './settings';

const { ID } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  events.send(`EJ030 Control`, 'Activated', `${ID} Activated`);
}

export { setup }; // eslint-disable-line
