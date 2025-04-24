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
    'main > .section',
    () => {
      return !!window.data1 || !!window.data2;
    },
    () => {
      let runExp = false;
      let pagesToRun = ['/collections/home',
      '/collections/bath-body',
      '/collections/skincare',
      '/collections/wellbeing-fragrances',
    
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
}
