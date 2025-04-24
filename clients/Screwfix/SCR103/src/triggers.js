/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(
  [
    '#__next',
    () => typeof window.tealiumDataLayer === 'object',
    () => window.__NEXT_DATA__ !== undefined,
    '[data-qaid="header-bottom-merchArea-0"]',
  ],
  () => {
    const pageCondition = window.utag.data.basicPageId === 'home';
    if (pageCondition) activate();
  }
);
