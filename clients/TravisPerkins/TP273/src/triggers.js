import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if (window.location.pathname.includes('/tc/')) {
  pollerLite(['[data-test-id="order-hub-header"]'], activate);
}
