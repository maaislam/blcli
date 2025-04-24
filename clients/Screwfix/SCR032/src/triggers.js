/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import swiper from './lib/helpers/swiper';
import shared from '../../../../core-files/shared';

const { VARIATION } = shared;
if (VARIATION === '2') {
  swiper();
}
pollerLite(['body', () => typeof window.Swiper === 'function' || VARIATION !== '2'], activate);
