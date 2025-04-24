/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
    '.swiper-slide img',
    '.content-container.container-fluid',
    '.product-name h1',
    '.feature-secondary-container',
    '#product-info',
    '#product-info #product_addtocart_form [name="form_key"]',
    () => {
        return !!window.jQuery
    },
], activate);
