/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'ol.products.list.items.product-items li',
'.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="men-banner"]',
'.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="women-banner"]',
'img.lazy.product-image-photo[src]',
], activate);
