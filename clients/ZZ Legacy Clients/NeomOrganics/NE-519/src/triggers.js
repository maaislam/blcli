/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite(['body', '#MainContent .columns .column'], activate);

  window.addEventListener('resize', function(event) {
    pollerLite([
      'body', '#MainContent .columns .column',
    ], () => {
      if (document.querySelector(`.NE-519-pod`)) {
        const allPods = document.querySelectorAll(`.NE-519-pod`);
        [].forEach.call(allPods, (pod) => {
          pod.parentElement.removeChild(pod);
        });

        activate();
      }
    });
  }, true);
}
