/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import { waitForApp } from '../../../../lib/utils/avon';
import { events, pollerLite } from '../../../../lib/utils';
import shared from './lib/shared';

events.setPropertyId('UA-142145223-1');

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite(['.CartHeader', '.Cart-Products'], () => {
    const { ID, VARIATION } = shared;
    events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
  });
};

const isBasket = /https?:\/\/www.avon.uk.com\/cart\/.*/.test(window.location.href);
if (isBasket) {
  waitForApp().then(() => {
    pollAndFire();
  });
}
