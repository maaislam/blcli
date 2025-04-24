import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

if (!window.location.href.includes('/tc/')) {
  pollerLite(['[data-test-id="header-search-button"]'], activate);
}
