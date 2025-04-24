/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
    () => {
        return !!window.digitalData.product[0].productInfo.brand;
    },
    () => {
        const brands = ['Omega', 'TAG Heuer', 'Breitling'];
        const brandData = window.digitalData.product[0].productInfo.brand;
        if(brands.indexOf(brandData) > -1) {
            return true;
        }
    },
], activate);
