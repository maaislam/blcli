/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.product-price','.product-summary',
    () => {
        const SKUS = ['2523442','9178066', '9178074', '4981340', '9552200', '3863182', '3863212', '3863271', '3863352', '3863409', '3863530', '3863549','3863557', '3863565', '3863573', '3863891', '3863913', '4953665', '4956486', '4958632', '4953606', '4953541', '3506428', '4885023', '1077228', '3450953', '4981545', '4885058', '9178589'];
        const productSKU = window.digitalData.product[0].productInfo.masterSku;
        if(SKUS.indexOf(productSKU) > -1) {
            return true;
        }
    },
    () => {
        return !!window.Swiper;
    },
], activate);
