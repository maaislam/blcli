/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

const { ID, VARIATION } = shared;

events.setPropertyId('UA-142145223-1');

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite(['#CategoryPage [ng-controller="ProductListController"]'], () => {
    events.send(`${ID}-${VARIATION}`, 'did-meet-conditions'); // GA
  });
};

waitForApp().then(() => {

  pollAndFire();
});
