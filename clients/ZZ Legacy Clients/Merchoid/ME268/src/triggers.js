/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.page-header', '.item.product', '.products.wrapper.grid.products-grid .item.product.product-item', '.product-item-name', '#brand-mobile-logo'], activate);
