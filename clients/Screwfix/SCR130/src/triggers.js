/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const DOM_RENDER_DELAY = 500;

pollerLite(['#__next', () => typeof window.tealiumDataLayer === 'object', () => window.__NEXT_DATA__ !== undefined], () => {
  setTimeout(activate, DOM_RENDER_DELAY);
});
