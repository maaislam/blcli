import { pollerLite } from '../../../../../lib/utils';

/**
 * Check if the current url matches the supplied url
 * @param {string|RegExp} url
 * @returns {boolean}
 */
export const isUrlMatch = (url) => {
  const thisUrl = `${window.location.origin}${window.location.pathname}`;
  return url instanceof RegExp ? url.test(window.location.href) : url === thisUrl;
};

/**
 * Get the page type
 * @returns {Promise}
 */
export const getPageType = () => new Promise((resolve, reject) => {
  pollerLite(['.Controller_SpecialOffers'], () => {
    resolve('offersPLPDetail');
  });
});
