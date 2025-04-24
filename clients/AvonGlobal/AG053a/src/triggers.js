/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

const { ID, VARIATION } = shared;

// pollerLite(['body'], activate);

const pollAndFire = () => {
    pollerLite([
        'body',
        '.v7__app'
    ],
    () => {
        // -- Establish date
        const date = new Date();
        const day = date.getDay();
        const hour = date.getHours();

        // -- Check if day = Monday - Thursday, time before 1pm
        if((day < 5) && (hour < 16)) {
          // Fire did meet conditions
          events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
          if (VARIATION.toLowerCase() !== 'control') activate();
        }
    })
}

pollerLite([
    '.v7__app'
], () => {
    pollAndFire();
})
