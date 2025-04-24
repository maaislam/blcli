import { fullStory } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};


export const hideOverlay = (el, overlay, speechBubble) => {
  el.addEventListener('click', (e) => {
    if (speechBubble.classList.contains('hidden')) {
      overlay.classList.add(`${shared.ID}-dark`);
      speechBubble.classList.remove('hidden');
      window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
      overlay.classList.remove(`${shared.ID}-dark`);
      speechBubble.classList.add('hidden');
    }
  });
};
