import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if(window.innerWidth >= 1024 && window.location.pathname.match(/product/)) {
  pollerLite([
    '.hide_finder',
  ], activate);
}
