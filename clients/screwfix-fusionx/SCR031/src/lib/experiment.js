/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { isPdp, isPlp } from './helpers/utils';
import plpChanges from './helpers/plpChanges';
import { pollerLite } from '../../../../../lib/utils';
import pdpClickHandler from './handlers/pdpClickHandler';
import plpClickHandler from './handlers/plpClickHandler';
import pdpChanges from './helpers/pdpChanges';

const { VARIATION } = shared;

const init = () => {
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  if (isPlp()) {
    pollerLite(['body', '[data-qaid="product-grid"]'], plpChanges);
  } else if (isPdp()) {
    pollerLite(['body', '[data-qaid="pdp_sticky_product_footer"]'], pdpChanges);
  }
};

export default () => {
  setup();
  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    isPlp() ? plpClickHandler(e) : pdpClickHandler(e);
  });

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  init();
  let oldHref = document.location.href;
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;

        setTimeout(() => {
          console.log('url updated');
          pollerLite([() => !document.querySelector('._5veyB0')], () => {
            init(); //need to fix here when screwfix fixs the issue with filter
          });
        }, 2000);
      }
    });
  });

  const config = {
    childList: true,
    subtree: true,
  };

  observer.observe(document.body, config);
  // window.addEventListener('hashchange', () => {
  //   console.log('hashchange');
  // });
};
