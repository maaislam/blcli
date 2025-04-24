/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
    'body',
    '.fotorama-item .fotorama__nav .fotorama__nav__frame img',
    '.mobile-product-title',
    () => {
        if(document.querySelectorAll('.fotorama-item .fotorama__nav .fotorama__nav__frame')[3]) {
            return true;
        }
    }
], activate);
