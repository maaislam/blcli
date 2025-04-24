import { fullStory } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';
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

export const bindClickEventOnCtaHeader = (cta) => {
  let orderMethod = "";
  cta.addEventListener('click', () => {
    orderMethod = cta.getAttribute('value');
      if (orderMethod && orderMethod !== "") {
        localStorage.setItem(`${shared.ID}-orderMethod`, orderMethod);

        // --- SHOW LOADER HERE
        pollerLite(['#fancyStoreConfirm'], () => {
          // ADD LOADER HERE
          document.querySelector('#fancyStoreConfirm').insertAdjacentHTML('afterbegin', `<div class="${shared.ID}-loader__wrapper"><div class="${shared.ID}-loader"></div></div>`);

          // document.querySelector('.${shared.ID}-lightboxContainer').style.display = 'none !important';
          document.querySelector(`.${shared.ID}-lightboxContainer`).setAttribute('style', 'display: none !important;');
        });
      }
  });
};
