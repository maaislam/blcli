import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

// Don't run experiment if touch device
const isTouchDevice = !!('ontouchstart' in window) || !!('onmsgesturechange' in window && (navigator && navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0));
if (!isTouchDevice) {
  poller([
    '#siteHeader .logo',
    '#footerNav',
    '.siteNavigation',
    '#search',
    '.basketIcon',
  ], Experiment.init);
}
