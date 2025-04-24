/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.product-gallery__main', () => {
    return !!window.digitalData.product[0].productInfo.masterSku;
    },
    () => {
        const SKU = window.digitalData.product[0].productInfo.masterSku;
        const eligibleItems = ['2776340', '2776537', '2776510', '4763653', '4239911', '8372608', '8372888', '8214883', '9421149', '8539634', '1711342', '9272615', '2607182', '4837355', '2296179', '3828565', '2935880', '4840100', '4115317', '5839149', '9327487',]
        if(eligibleItems.indexOf(SKU) > -1) {
            return true;
        }
    }
], activate);
