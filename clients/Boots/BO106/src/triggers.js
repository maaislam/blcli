/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    pollerLite([
      'body',
      '*[id^="iFrameResizer"]',
    () => {
      return !!window.OnetrustActiveGroups;
    },
    () => {
        return !!window.Optanon
    },
    () => {
      return !!window.jQuery
    }
    ], () => {
      var timer = setInterval(function () {
        var iframe =  document.querySelector('*[id^="iFrameResizer"]')
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        // Check if loading is complete
        if (iframeDoc.readyState == 'complete' || iframeDoc.readyState == 'interactive') {
            activate();
            clearInterval(timer);
            return;
        }
    }, 4000);
     /* document.querySelector('*[id^="iFrameResizer"]').addEventListener( "load", function(e) {
       activate();
      });*/
    });
  }
}
