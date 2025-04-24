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


export const activateStickyNav = (header) => {
  // Get the offset position of the navbar
  const sticky = header.offsetTop;
  // ---- Detects scroll up or down
  let lastScrollTop = 0;
  
  window.addEventListener("scroll", function(){ 
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop){
        // downscroll code
        if (window.pageYOffset > sticky) {
          header.classList.remove(`${shared.ID}-sticky__up`);
          header.classList.add(`${shared.ID}-sticky`);
        } else {
          header.classList.remove(`${shared.ID}-sticky`);
        }
    } else {
        // upscroll code
        if (window.pageYOffset > sticky) {
          header.classList.add(`${shared.ID}-sticky__up`);
        } else {
          header.classList.remove(`${shared.ID}-sticky`);
          header.classList.remove(`${shared.ID}-sticky__up`);
        }
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }, false);
};
