/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    'body',
    'section.section .container .column.is-3-desktop.is-4-tablet.is-6-mobile',
    '#MainContent .columns.is-multiline.is-mobile.has-padding-top-tiny .column',
    () => {
      let runExp = false;
      if (window.location.href.indexOf('/collections/') > -1
      && document.querySelectorAll('#MainContent .columns .column.is-3-desktop.is-4-tablet.is-6-mobile').length > 7) {
        runExp = true;
        if (window.location.href.indexOf('?page=') > -1) {
          if (getUrlParameter('page', window.location.href) == '1') {
            runExp = true;
          } else {
            runExp = false;
          }
        }
        
      }

      return runExp;
    },
    () => {
      let runExp = false;
      let pagesToRun = ['/collections/home',
      '/collections/bath-body',
      '/collections/skincare',
      // '/collections/wellbeing-fragrances',
    
      '/collections/mists',
      '/collections/pillow-mist',
      '/collections/reed-diffusers',
      '/collections/candles',
      '/collections/essential-oil-blends',
      '/collections/the-wellbeing-pod-mini',
      '/collections/the-wellbeing-pod',
      '/collections/wellbeing-pod-luxe',
    
      '/collections/bath-body',
      '/collections/super-shower-power-body-cleanser',
      '/collections/anti-bacterial-hand-sanitiser-gel',
      '/collections/body-washes-lotions',
      '/collections/body-butter',
      '/collections/intensive-skin-treatment-candles',
      '/collections/natural-soap',
      '/collections/hand-balms',
      '/collections/bath-oils-foams',
    
      '/collections/skincare',
      '/collections/perfect-nights-sleep-overnight-facial-cream',
      '/collections/cleansing-balm',
      '/collections/face-oil',
      '/collections/face-serum',
      '/collections/spf-moisturiser',
      '/collections/wonder-balm',
      '/products/white-jade-facial-roller'];

      if (pagesToRun.indexOf(window.location.pathname) > -1) {
        runExp = true;
      }

      return runExp;
    },
  ], activate);

  


  window.addEventListener('resize', function(event) {
    if (document.querySelector(`.NE-546-first`)) {
      document.querySelector(`.NE-546-first`).parentElement.removeChild(document.querySelector(`.NE-546-first`));
    }

    if (!document.querySelector(`.NE-546-first`)) {
      activate();
    }
  }, true);
}
