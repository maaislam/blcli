/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { setup, fireEvent } from './lib/services';
import shared from './lib/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks) {
  const { VARIATION, ID } = shared;
  const urls = ['/en/buy/seats', '/en/buy/seats/familyseats'];

  console.log(`${ID} Test Running!`);

  pollerLite(
    [
      'body',
      // '.passenger.infant',
      '.available-seat-map',
      () => urls.indexOf(window.location.pathname) !== -1,
    ],
    () => {
      setup();
      fireEvent('did-meet-conditions');
      if (VARIATION.toLowerCase() !== 'control') activate();
    }
  );
}
