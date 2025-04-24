/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.menu-trigger', '#divMobSearch', '#ui-id-2', '.am-container', '#mp-menu', '#BodyWrap'], activate);
