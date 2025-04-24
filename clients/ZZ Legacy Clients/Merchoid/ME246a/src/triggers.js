/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body','.banner-home-slider','#banner-slider-carousel .owl-carousel', '.banner-home-slider .item-image',
    () => {
        return !!window.jQuery;
    }, 
], activate);
