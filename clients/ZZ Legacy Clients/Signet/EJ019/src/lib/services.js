import { fullStory, events } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);

  const overallRating = parseInt(window.digitalData.product[0].productInfo.rating, 0);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
  events.send(`${ID}`, `${ID} v${VARIATION}`, `${overallRating}* review shown`);
}

export { setup }; // eslint-disable-line
