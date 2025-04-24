/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['#main .cart', '.header-container', '.header-container', '#coupon_code','.totals #shopping-cart-totals-table', '.btn.btn-default.btn-update'], activate);
