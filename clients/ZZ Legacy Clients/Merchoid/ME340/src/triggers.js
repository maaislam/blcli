/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {

  const regex = new RegExp('.*(christmas|the-little-mermaid-ugly)(-)(sweater|jumper).*');
  const urls = ['stranger-things-hellfire-club-christmas-sweater-jumper', 'lord-of-the-rings-christmas-sweater-jumper', 'star-wars-hoth-christmas-sweater', 'teenage-mutant-ninja-turtles-knitted-christmas-sweater-jumper', 'invader-zim-knitted-christmas-sweater-jumper', 'lord-of-the-rings-knitted-christmas-sweater-jumper', 'star-wars-lack-of-cheer-disturbing-unisex-knitted-christmas-sweaterjumper', 'the-little-mermaid-ugly-sweater-jumper', 'pokemon-christmas-sweater-jumper'];

  pollerLite([
    'body',
    '#maincontent',
    '.product.media',
    '.product-info-main',
    '.product-secondary-tabs-wrapper',
    '.product-title-bottom-text',
    () => {
      if(window.location.href.match(regex)) {
        return true
      }
    },
    () => {
      const PDPurl = window.location.pathname.replace(/\/+$/, '').replace('/uk/', '').replace('/eu/', '').replace('/row/', '').replace('/', '');
      if(urls.indexOf(PDPurl) > -1) {
        return true
      }
    }
  ], activate);
}
