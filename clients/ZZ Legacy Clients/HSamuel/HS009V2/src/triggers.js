import { Run, checkErrorPage } from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

function detectIE() {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ');
  const trident = ua.indexOf('Trident/');
  const edge = ua.indexOf('Edge/');
  let detectIE = false;
  
  if (msie > 0) {
    detectIE = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  } else if (trident > 0) {
    var rv = ua.indexOf('rv:');
    detectIE = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  } else if (edge > 0) {
    detectIE = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  } 

  return detectIE;
}

const version = detectIE();

if (version === false) {
  pollerLite([
    '#filters-panel',
    '.filters-panel__refinement-link',
    () => {
      let trigger = false;
      if (window.jQuery) trigger = true;
      return trigger;
    },
  ], Run);

  pollerLite([
    'h1',
  ], checkErrorPage);
}
