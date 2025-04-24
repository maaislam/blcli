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
  document.body.classList.add(`${ID}-${VARIATION}`);
};


export const observeWindowWidth = () => {
  const { ID, VARIATION } = shared;

  let windowWidth = document.body.clientWidth;
  let device = '';
  if (windowWidth > 767) {
    device = 'desktop';
  } else {
    device = 'mobile';
  }
  window.addEventListener("resize", function(event) {
    if (document.body.clientWidth > 767 && device == 'mobile') {
      device = 'desktop';
      // --- Window re-size - From MOBILE to DESKTOP
      let thumbnailEl = document.querySelector(`.${ID}-productThumbnails__wrapper`);
      document.querySelector('.price-wrapper').insertAdjacentElement('beforebegin', thumbnailEl);
    } else if (document.body.clientWidth <= 767 && device == 'desktop') {
      device = 'mobile';
      // --- Window re-size - From DESKTOP to MOBILE
      let thumbnailEl = document.querySelector(`.${ID}-productThumbnails__wrapper`);
      document.querySelector(`#thumbnails`).insertAdjacentElement('afterend', thumbnailEl);
    }
  });
  
};
