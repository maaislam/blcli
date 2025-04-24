import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
export const setup = () => {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

/**
 * Get PLP category name
 * @returns {string}
 */
export const getCategory = () => {
  let category = '';
  const url = window.location.href;

  switch (true) {
    case /\/make-up\/lips/.test(url):
      category = 'lips';
      break;

    case /\/make-up\/nails/.test(url):
      category = 'nails';
      break;

    case /\/make-up\/face/.test(url):
      category = 'face';
      break;

    case /\/make-up\/eyes/.test(url):
      category = 'eyes';
      break;

    default:
      break;
  }

  return category;
};
