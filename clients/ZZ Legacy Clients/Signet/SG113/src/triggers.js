/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.product-gallery__syte.js-syte-functionality',
  'button.syte-discovery.syte-button.product-gallery__syte-button',
  '.tangiblee-button',
  () => {
    let runExperiment = false;

    if (window.innerWidth <= 480
    && window.digitalData && window.digitalData.page.category.primaryCategory == "Jewellery"
    && window.digitalData.page.category.subCategory1 == "Rings") {
      runExperiment = true;
    }

    return runExperiment;
  },

  
], activate);
