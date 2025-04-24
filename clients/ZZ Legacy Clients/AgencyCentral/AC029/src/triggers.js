import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

function detectIE() {
  const ua = window.navigator.userAgent;

  const msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  const trident = ua.indexOf('Trident/');
  if (trident > 0) {
    const rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  const edge = ua.indexOf('Edge/');
  if (edge > 0) {
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  return false;
}

poller([
  '#favourites-navbar-button',
  '.breadcrumb',
  '.search-title-h2',
  '#input-industry-selector',
  '.contact-option-container .agency-primary-link',
  '.search-bar-input-container',
  '#input-location',
  () => {
    let trigger = false;
    const version = detectIE();

    if (version === false) {
      if (window.jQuery) {
        trigger = true;
      }
    }

    return trigger;
  },
], Run);
