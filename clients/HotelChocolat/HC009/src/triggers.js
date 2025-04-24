/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

window.addEventListener('load', () => {

    pollerLite([
    'body',
    '.inventory',
    '#pid',
    '.slick-initialized',
    '.einstain-inited',
    '.einstain-inited .slick-active',
    () => !!(window.einstein && window.einstein.loaded && window.einstein.loaded.length > 0),
    () => !!window.__zmags && !!window.zmagsJsonp,
    () => {
        return !!window.jQuery;
    }, 
    () => {
        if(typeof window.jQuery.fn.slick !== 'undefined') {
          return true;
        }
    },
    ], () => {
      window.einstein.loaded = true;
      activate();

    });
});
