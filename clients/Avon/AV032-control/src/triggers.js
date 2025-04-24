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
  pollerLite([
    'product-list',
    '.ProductList',
    '.ProductListItem',
  ], () => {
    const { ID, VARIATION } = shared;
    events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
  });
};

const isSamplesPLP = /https?:\/\/www.avon.uk.com\/[\d-]+\/sample-shop.*/.test(window.location.href);
if (isSamplesPLP) {
  waitForApp().then(() => {
    pollAndFire();
  });
}
