/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
 /* all pages */
    pollerLite(['body', '#estore_category_heading',
    () => {
        return !!window.jQuery;
    },
    () => {
        return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
    },
    () => {
      if(window.jQuery && window.jQuery.fn && typeof window.jQuery.fn.owlCarousel !== 'undefined') {
        return true;
      }
    },
    ], activate);
