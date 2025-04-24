/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(
  ['body', 
  '#page',
  () => window.jQuery && window.jQuery.fn && window.jQuery.fn.slick,
  ],
  activate);
