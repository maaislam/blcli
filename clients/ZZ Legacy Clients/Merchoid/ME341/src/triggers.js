/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {

  const regex = new RegExp('.*(christmas)(-)(sweater|jumper).*');

  pollerLite([
      'body',
      '.price',
      '.product-item',
      () => {
        if(window.location.href.indexOf('glcid') > -1 ){
          localStorage.setItem('ME341-exclude', 'true');
        }
        else if (localStorage.getItem('ME341-exclude') === 'true'){
        }
        else {
          return true;
        }
      },
  ], activate);

}
