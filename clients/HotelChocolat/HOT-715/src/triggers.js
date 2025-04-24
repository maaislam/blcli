import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
const { pathname } = window.location;

if(!ieChecks && pathname.includes('/uk/help/delivery')) {
  pollerLite([
    '.content-container'
  ], activate);
}
