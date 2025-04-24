import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if (document.documentElement.classList.contains('mobile')) {
  pollerLite([
    '#main-nav',
    '#mobile-cta-block .col-xs-6 a',
    '.mobile-call-us-btn',
    '.navbar-toggle',
  ], activate);
} else if (window.innerWidth > 992) {
  pollerLite([
    '#top-nav .contact',
    '.col-lg-4.logo-block',
  ], activate);
}
