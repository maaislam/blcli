/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

if (
    window.location.pathname.indexOf('c/access/ladders-and-steps') > -1 
    || window.location.pathname.indexOf('c/heating/electric-heaters') > -1
) {
    pollerLite([
        'body'
    ], () => {
      if (shared.VARIATION == 'control') {
        events.send('CRO Experiment', `${shared.ID}`, 'Control - Activated');
      } else {
        // rest of experiment code
        events.send('CRO Experiment', `${shared.ID}`, 'V1 - Activated');

        activate();
      }
    });
}
