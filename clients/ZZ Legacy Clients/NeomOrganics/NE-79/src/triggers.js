/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    'body',
    '#MainContent .columns .column',
  ], () => {
    events.send(`${shared.ID} V-Day PLP Ad Blocks`, `V-${shared.VARIATION}`, 'Init');

    activate();
  });
}
