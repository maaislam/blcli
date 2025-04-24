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

export const closeLightbox = (lightboxEl) => {
  const { ID, VARIATION } = shared;

  // // --- Close Icon
  // const closeIcon = document.querySelector(`.${shared.ID}-lightbox__close`);
  
  // closeIcon.addEventListener('click', () => {
  //   lightboxEl.classList.add('hide');
  //   if (pageType === 'pdp') {
  //     lightboxEl.parentNode.removeChild(lightboxEl);
  //   }
  // });

  // --- Clicked outside Lightbox
  lightboxEl.addEventListener('click', (e) => {
    if (!document.querySelector(`.PL029-emailForm__content`).classList.contains('hidden')) {
      if (!document.querySelector(`.PL029-emailForm__content`).contains(e.target)) {
        // Clicked outside the box
        lightboxEl.classList.add('hidden');
      }
    }
  });
  
};
