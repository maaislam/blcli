/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

if(!getCookie('Synthetic_Testing')) {
  pollerLite([
    '.oct-propositionbanner',
  () => {
    return !!window.OnetrustActiveGroups;
  },
  () => {
      return !!window.Optanon
  },
  () => {
    return !!window.jQuery;
  },
  () => {
      return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
  },
  () => {
    if(document.querySelector('.oct-carousel-hero .oct-carousel-hero__inner .oct-carousel-hero-swiper-slide') || document.querySelector('#cu_2021_pay_day')) {
      return true;
    }
  }
  ], activate);
}
