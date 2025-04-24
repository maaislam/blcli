/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */

import activate from './lib/experiment';
import { getCookie, pollerLite } from './lib/helpers/utils';

if (!window.location.pathname.includes('/checkout') && !window.location.pathname.includes('/cart')) {
  pollerLite(['body', () => window.DYO?.recommendationWidgetData], () => {
    //user seen exit intent modal
    if (getCookie('MAM542-exitIntentModal') !== 'true') {
      //setCookie('MAM542-exitIntentModal', 'true', 1);
      window.setDebugCookies = (debugScenario, debugValue = 'true') => {
        document.cookie = `bl-debug-scenario=${debugScenario}; path=/`;
        document.cookie = `bl-debug=${debugValue}; path=/`;
      };
      activate();
    }
  });
}
