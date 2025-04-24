import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';
if (window.location.pathname.includes('/tc/')) {
  pollerLite(
    [
      () =>
        document.querySelector('[data-test-id="header-search-button"]') ||
        document.querySelector('[data-test-id="header-control-bar"]'),
    ],
    activate
  );

  //pollerLite(['[data-test-id="header-search-button"]'], activate);
}
