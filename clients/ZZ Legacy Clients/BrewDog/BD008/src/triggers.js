/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'.box-basket',
'.box-basket .box-meta-container .box-container',
'span[data-bind="text: filledSlots"]',
'span[data-bind="text: totalSlots"]',
'div[data-trigger="box-modal-trigger"]',
], activate);
