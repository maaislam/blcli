import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function whatPage() {
  let page = null;
  if (window.dataLayer) {
    if (window.dataLayer[0].page_type === 'Product Grid Page') {
      page = 'PLP';
    } else if (window.dataLayer[0].page_type === 'Product Detail Page') {
      page = 'PDP';
    }
  }
  return page;
}

export { setup, whatPage }; // eslint-disable-line
