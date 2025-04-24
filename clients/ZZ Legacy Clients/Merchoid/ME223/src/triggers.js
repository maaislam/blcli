/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
    'body', 
    '.products-grid .product-item', 
    '.product-item-link', 
    '.product-image-container',
], activate);
