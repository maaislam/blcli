/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!document.documentElement.classList.contains(`${shared.ID}`)) {
    pollerLite([
      'body',
      'finance-options',
      '.product-buy-now',
      () => {
        let runExp = false;
        let url  = window.location.href;
        url = url.toLowerCase();
        const regex = new RegExp('omega|tudor|tag|breitling');
        if (regex.test(url)) {
          runExp = true;
        }

        return runExp;
      },
    ], activate);

    let windowWidth = document.body.clientWidth;
    let device = '';
    if (windowWidth >= 900) {
      device = 'desktop';
    } else {
      device = 'mobile';
    }
    window.addEventListener("resize", function(event) {
      if (document.body.clientWidth >= 900 && device == 'mobile') {
        device = 'desktop';
        // --- Window re-size - From MOBILE to DESKTOP
        // -- Re-run exp
        if (document.querySelector(`.SG143-ifc-banner__wrapper`)) {
          document.querySelector(`.SG143-ifc-banner__wrapper`).parentElement.removeChild(document.querySelector(`.SG143-ifc-banner__wrapper`));
        }
        if (!document.querySelector(`.SG143-ifc-banner__wrapper`)) {
          activate();
        }
      } else if (document.body.clientWidth < 900 && device == 'desktop') {
        device = 'mobile';
        // --- Window re-size - From DESKTOP to MOBILE
        // -- Re-run exp
        if (document.querySelector(`.SG143-ifc-banner__wrapper`)) {
          document.querySelector(`.SG143-ifc-banner__wrapper`).parentElement.removeChild(document.querySelector(`.SG143-ifc-banner__wrapper`));
        }
        if (!document.querySelector(`.SG143-ifc-banner__wrapper`)) {
          activate();
        }
      }
    });

  }
}
