import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

/** Local Triggers */
if (/\/compatible\/hometrial\//.test(window.location.href)) {
  pollerLite([
    () => !!window.jQuery,
    () => !!window.Promise,
    'li.product',
    '#hero-banner',
  ], activate);
}

/** Qubit Triggers */
/*
module.exports = function triggers (options, cb) {
  // Set true to bypass triggers
  const DEBUG = false;
  require('@qubit/remember-preview')();

  const pollAndFire = () => {
    if (!window.Promise) return false;

    options.poll([
      'window.jQuery',
      '.search-product-list',
      '.product-info .product-image',
      '#hero-banner',
    ]).then(() => {
      cb(true);
    });
  };

  if (!DEBUG) {
    const isPLP = window.universal_variable.page.type === 'Category';

    // Show to new users or returning users that have seen the experiment before
    options.getBrowserState().then(data => {
      const cm = require('cookieman');
      const sessionNumber = cm.get('_qst_s')[0].value;
      const deviceType = data.ua.deviceType;
      const isMobile = deviceType === 'mobile';
      if (isMobile && sessionNumber) {
        const isFirstSession = Number(sessionNumber) <= 1;
        const hasSeenExperiment = cm.get('GD050_shown');

        // Only fire if first session or if user has seen the expeirment before
        if (isPLP && (isFirstSession || hasSeenExperiment)) {
          // Refresh page when hometrial compatible filter is selected/deselected to force
          // changes to apply or be removed
          options.poll(['#option-compatible-home-trial']).then((elements) => {
            const hometrialFilter = elements[0];
            hometrialFilter.addEventListener('click', () => {
              // Refresh page
              setTimeout(() => {
                window.location.reload();
              }, 400);
            });
          });

          // Apply changes if hometrial compatible filter is active
          if (/\/compatible\/hometrial\//.test(window.location.href)) {
            pollAndFire();
          }
        }
      }
    });
  } else {
    pollAndFire();
  }
}
*/
