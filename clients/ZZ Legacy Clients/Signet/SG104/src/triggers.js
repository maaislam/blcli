/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body','.product-summary','form[action="//www.hsamuelpersonalisedgifts.co.uk/personalisationMicrosite/editItem"]',
], activate);
