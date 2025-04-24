/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getUrlParameter } from '../../../../lib/utils';
import { runner } from '../../TG028/src/experiment';

if(getUrlParameter('reason') == 'quote' && getUrlParameter('sku')) {
  runner();

  pollerLite(['body','.post-content', '.container-fluid.content-container', '.tg28-input-row--profile', '[name=product-name]'
  ], () => {
    const productName = document.querySelector('[name=product-name]');
    if(productName && productName.value) {
        window.TGProdName = productName.value;
    }

    activate();
  });
}
 
