import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { isMobile } from './helpers/utils';

if (window.location.pathname.includes('/tc/')) {
  const pollingFor = isMobile() ? '[data-test-id="order-hub-header"]' : '[data-test-id="order-hub-header"]';
  pollerLite(['[data-test-id="pay-button"]', () => pollingFor], activate);
}
