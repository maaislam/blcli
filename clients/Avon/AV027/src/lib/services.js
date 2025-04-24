
import { fullStory, pollerLite } from '../../../../../lib/utils';
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

/**
 * Get the page type
 * @returns {Promise}
 */
export const getPageType = () => new Promise((resolve, reject) => {
  pollerLite(['.Controller_Category'], () => {
    resolve('PLP');
  });

  pollerLite(['.Controller_Group'], () => {
    resolve('PLP');
  });
// <<<<<<< HEAD

//   pollerLite(['.Controller_SpecialOffers'], () => {
//     resolve('offersPLP');
//   });
// =======
// >>>>>>> d2fd612fad0466cbae1ce1c927086d8d8220d4c6
});


/**
 * Helper get url parameter
 */
export const getUrlParameterAvon = (name, url) => {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,'\\\]');
  const regexS = `[\\?&|\\?#]${name}=([^&#]*)`;
  const regex = new RegExp(regexS);
  const results = regex.exec(url);
  return results == null ? null : results[1];
};
