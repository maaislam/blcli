/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

const isValidCustomer = (window.saso?.customer?.tags || []).indexOf('mdoptout') == -1;

if(!ieChecks && isValidCustomer) {
  pollerLite([
    'body',
    '#MainContent .columns .column',
  ], () => {
    events.send(`${shared.ID} Cutout Candles`, `V-${shared.VARIATION}`, 'Init');

    activate();
  });
}
