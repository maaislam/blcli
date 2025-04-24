/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body','#estore_category_heading', '.slick-slider', 
    () => {
        var url = window.location.pathname.split('/')[1];
        var pages = ['health-pharmacy', 'beauty', 'baby-child'];

        if (pages.indexOf(url) === -1) {
            return false;
        } else {
            return true;
        }
    },
], activate);
