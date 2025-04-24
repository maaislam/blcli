/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { share } from './lib/services';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

const { ID, VARIATION } = shared;

/** Poll for elements the run experiment */
const pollAndFire = () => {
  pollerLite([
    () => !!document.querySelector('#YMK-module-iframe'),
    () => !!window.jQuery,
    () => !!window?.YMK?.addEventListener,
  ], () => {
    events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
    activate();
  });
};

waitForApp().then((data) => {
  const isNewPDP = /.*\/productdetail\/.*/.test(window.location.href);

  // Make $ and rootScope global
  share(data);
  share({ isNewPDP });

  if (isNewPDP) {
    pollerLite(['#MainContentWrapper'], () => {
      const { IsTryItOnProduct } = $('#MainContentWrapper').scope().ViewModel.Product;
      if (IsTryItOnProduct) {
        pollAndFire();
      }
    });
  } else {
    pollerLite(['#ProductDetailContainer'], () => {
      const { IsTryItOnProduct } = $('#ProductDetailContainer').scope().ProductDetail.Product;
      if (IsTryItOnProduct) {
        pollAndFire();
      }
    });
  }
});
