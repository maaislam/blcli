/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  // pollerLite([
  //   'body',
  //   // 'input#checkout_email',
  //   // 'input#checkout_buyer_accepts_marketing',
  //   // '.checkbox__input',
  //   // '.prefs input[name="checkout[note]"]',
  //   () => {
  //     let runExp = false;
  //     if (window.location.href.indexOf('/checkouts/') > -1) {
  //       pollerLite(['input#checkout_email',
  //       'input#checkout_buyer_accepts_marketing',
  //       '.checkbox__input',
  //       '.prefs input[name="checkout[note]"]',
  //       'button#continue_button'], () => {
  //         runExp = true;
  //       });
        
  //     } else if (window.location.href.indexOf('/orders/') > -1) {
  //       if (localStorage.getItem(`NE-310-opt-in`) !== null) {
  //         runExp = true;
  //       }
  //     }
  //     return runExp;
  //   },
  // ], activate);

  const successPageRegex = /\bcheckouts\b.*\bthank_you\b/;
  if(successPageRegex.test(window.location.href)) {
    pollerLite(['body',
      () => {
        let runExp = false;
        if (localStorage.getItem(`NE-310-opt-in`) !== null) {
          runExp = true;
        }
        return runExp;
      },
    ], activate);
  } else if(window.location.href.indexOf('/checkouts/') > -1) {
    pollerLite(['body',
    'input#checkout_email',
    'input#checkout_buyer_accepts_marketing',
    '.checkbox__input',
    '.prefs input[name="checkout[note]"]',
    'button#continue_button',
   ], activate);
  }
  
}
