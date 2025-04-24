import { fullStory } from '../../../../../lib/utils';
import { observer } from '../../../../../lib/uc-lib';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
const setup = () => {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

const clickEl = (el) => {
  if (el) {
    el.click();
  }
};


export { setup, clickEl }; // eslint-disable-line
