/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '#productImage',
    () => {
        if(window.digitalData.product && window.digitalData.product[0].productInfo.brand && window.digitalData.product[0].productInfo.brand === 'TAG Heuer'){
            return true;
        }
    }
], activate);
