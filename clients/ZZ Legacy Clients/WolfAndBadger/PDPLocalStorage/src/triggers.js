import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

try {
  const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

  if(!ieChecks) {
    pollerLite([
      'body',
      () => !!window.jQuery,
      () => !!window.universal_variable?.product,
      () => document.readyState == 'complete',
    ], activate, {
      timeout: 2500
    });
  }
} catch(e) {}
