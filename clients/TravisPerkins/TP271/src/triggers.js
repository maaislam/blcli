import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if (window.location.pathname.includes('/cart') && !window.location.pathname.includes('/tc/')) {
  pollerLite(['[data-test-id="total-section"]'], () => {
    activate();
  });
}
