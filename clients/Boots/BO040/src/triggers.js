/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '#estore_category_heading',


() => {
    if(typeof window.jQuery.fn.slick !== 'undefined') {
      return true;
    }
},
() => {
    if(typeof window.jQuery.fn.owlCarousel !== 'undefined') {
      return true;
    }
},

], activate);
