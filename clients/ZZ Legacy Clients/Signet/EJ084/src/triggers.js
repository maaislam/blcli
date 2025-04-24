/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';


/**
 * Longines
9301828

Longines
8070903

Longines
6959385

Longines
8152284

Longines
9301569

Tissot
1125184

Tissot
6148263

Tissot
9272186

Tissot
9271457

Tissot
6904424

 */

pollerLite(['body', '.product-price','.product-summary',
    () => {
        const SKUS = ['9301828', '8070903', '6959385', '8152284', '9301569', '1125184', '6148263', '9272186', '9271457', '6904424'];
        const productSKU = window.digitalData.product[0].productInfo.masterSku;
        if(SKUS.indexOf(productSKU) > -1) {
            return true;
        }
    },
    () => {
        return !!window.Swiper;
    },
], activate);
