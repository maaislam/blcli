/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'h1.page-title span.base',
'.product-info-main .product.attribute.sku',
// 'select.super-attribute-select',
// '.product-info-main .product.attribute.sku',
() => !!window.jQuery,
], activate);
