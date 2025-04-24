/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import settings from './lib/shared';

pollerLite([
  'body', 
  '.box-basket .box-wrapper .box-filled-data',
  //() => !!window.BD006config, // Comment for local builds
  () => {
    if(settings && settings.VARIATION == 2 && document.body.classList.contains('page-products')) {
      let ref = document.querySelector('#amasty-shopby-product-list .layout__max-width');
      return !!ref && document.readyState == 'complete';
    } else {
      return true;
    }
  }
], activate);
