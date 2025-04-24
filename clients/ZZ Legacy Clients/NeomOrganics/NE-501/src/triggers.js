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
    '#MainContent section .columns.is-multiline.is-mobile.has-padding-top-tiny',
    '.nosto_element#categorypage-nosto-2',
    '.is-pagination.is-size-5.has-text-weight-light.is-flex.is-justify-content-center.has-margin-top-small .parts.is-flex span',
    // () => {
    //   let runExp = false;

    //   const pagesToRun = ['/collections/all',
    //     '/collections/bestsellers',
    //     '/collections/candles',
    //     '/collections/gifts-for-her',
    //   ];
    //   if (pagesToRun.indexOf(`${window.location.pathname}`) > -1) {
    //     runExp = true;
    //   }

    //   return runExp;
    // },
    () => {
      return !!window.jQuery;
    }, 
  ], activate);
}
