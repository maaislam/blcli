/* eslint-disable import/prefer-default-export */
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
 * @returns {string}
 */
export const getPageType = () => {
  // Array elements can be either a string or a regex
  const pages = {
    foundationPDP: [
      /https?:\/\/www\.avon\.uk\.com\/product\/.*5499.*/i,
      /https?:\/\/www\.avon\.uk\.com\/product\/.*11101.*/i,
      /https?:\/\/www\.avon\.uk\.com\/product\/.*5498.*/i,
      /https?:\/\/www\.avon\.uk\.com\/product\/.*5307.*/i,
      /https?:\/\/www\.avon\.uk\.com\/product\/.*5268.*/i,
      /https?:\/\/www\.avon\.uk\.com\/product\/.*1796.*/i,
      /https?:\/\/www\.avon\.uk\.com\/product\/.*8937.*/i,
      /https?:\/\/www\.avon\.uk\.com\/product\/.*12305.*/i,
    ],

    foundationFinder: [
      /https?:\/\/www\.avon\.uk\.com\/foundation-finder\/?(\?.*)?(&.*)?(#.*)?$/i,
    ],
  };

  let thisPageType;
  Object.keys(pages).some((pageType) => {
    const urls = pages[pageType];
    const isPageType = urls.some(isUrlMatch);
    if (isPageType) thisPageType = pageType;
    return isPageType;
  });

  return thisPageType;
};
