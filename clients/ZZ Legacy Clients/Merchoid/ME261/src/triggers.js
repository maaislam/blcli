/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body','.product-info-main .page-title','.price-box.price-final_price [data-price-type=finalPrice]',

], activate);
