/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    if(!document.documentElement.classList.contains('BO165')) {
      pollerLite([
        'body',
        '#estore_header_bottom_row',
        '#globalNavigationContainer',
        '#loggedIn_name',
        '#shipToMessage',
        '#topLevelMenu li a',
        () => {
          if(window.userObj) {
            return true;
          }
        },
        () => {
          if(window.userObj && window.userObj.isLoggedIn) {
            return true;
          }
        },
        () => {
          if(window.innerWidth > 1100 || window.innerWidth < 768) {
            return true;
          }
        }
      ], activate);
    }
  }
}
