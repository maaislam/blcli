/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'.filter-container.search',
'.filter-container.search .left',
'.page-home .filter-container .svg_home',
], activate);
