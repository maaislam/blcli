/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);



if (!ieChecks) {
  pollerLite([
    'body',
    '#yotpo-main-widget',
    'async-block[url="/block/products%2cproduct-box-1/"]',
    () => location.href.includes('https://www.shopwithmyrep.co.uk/product/19242/glimmerstick-eyeliner')
  ], activate);
}
