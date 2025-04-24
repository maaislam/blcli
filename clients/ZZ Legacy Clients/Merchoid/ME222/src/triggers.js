/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.product-usps-wrapper .product-usps', 
'.product .gallery-placeholder .fotorama__stage',
'.ME201_scarcityBar'], activate);
