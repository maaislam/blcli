/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body','.live-chat__chat-option.js-live-chat-virtual-appointment','.js-live-chat-toggle',
], activate);
