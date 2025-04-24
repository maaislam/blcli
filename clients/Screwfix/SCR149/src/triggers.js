/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const DOM_RENDER_DELAY = 1000; // 2 seconds to about hydration issue
const isMobile = () => {
  //using the user agent to detect mobile devices
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

pollerLite(['#__next', () => typeof window.tealiumDataLayer === 'object', () => window.__NEXT_DATA__ !== undefined], () => {
  if (isMobile()) {
    setTimeout(activate, DOM_RENDER_DELAY);
  }
});
