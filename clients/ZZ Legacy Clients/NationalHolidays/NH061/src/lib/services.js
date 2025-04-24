import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/** Standard experiment setup function */
const setup = () => {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

/**
 * Get page type
 * @returns {string|null}
 */
const getPageType = () => {
  const url = window.location.href;
  let page;
  switch (true) {
    case /nationalholidays\.com\/?(\?.*)?(#.*)?$/.test(url):
      page = 'home';
      break;

    case /nationalholidays\.com\/(sports|britain-and-ireland|europe|shows|family-trips)\/?(\?.*)?(#.*)?$/.test(url):
      page = 'category';
      break;

    default:
      page = null;
      break;
  }
  return page;
};

export { setup, getPageType };
