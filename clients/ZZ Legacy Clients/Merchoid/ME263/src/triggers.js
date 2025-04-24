/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.ME230-sizeGuideLink', '.product-info-main .product-info-price', '#gender-select-options', '#gender-select-options .active', '.super-attribute-select',

], activate);
