/* eslint-disable no-confusing-arrow */
/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import { share } from './lib/services';

const thisUrl = `${window.location.origin}${window.location.pathname}`;

/**
 * Wait for elements to exist before running experiment
 */
const pollAndFire = () => {
  pollerLite([
    '#ProductMediaContainer .MediaGallery .Slide img',
    () => {
      try {
        return !!window.AppModule.RootScope.$on;
      } catch (e) {
        return false;
      }
    },
    () => {
      try {
        return !!window.AppModule.RootScope.Layout.Name;
      } catch (e) {
        return false;
      }
    },
  ], () => {
    events.send('AV011-variation', 'did-meet-conditions');

    try {
      activate();
    } catch (e) {
      // Used for mobile debugging
      // document.body.insertAdjacentHTML(`<div class="ERROR">${e}</div>`);
    }
  });
};

/**
 * Check if the current url matches the supplied url
 * @param {string|RegExp} url
 * @returns {boolean}
 */
const isUrlMatch = url => url instanceof RegExp ? url.test(thisUrl) : url === thisUrl;

const isPermittedUrl = [
  /https:\/\/www.avon.uk.com\/product\/.*7101/,
  /https:\/\/www.avon.uk.com\/product\/.*10953/,
  /https:\/\/www.avon.uk.com\/product\/.*3907/,
].some(isUrlMatch);

if (isPermittedUrl) {
  share({
    thisUrl,
    functions: {
      isUrlMatch,
      share,
    },
  });
  pollAndFire();
}
