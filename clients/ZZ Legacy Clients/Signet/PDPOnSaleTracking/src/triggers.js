/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
    'body',
    () => {
      if (window.digitalData.page.pageInfo.pageType === "PDP"){
        return true;
      }
    },
    () => {
      return window.ga && window.ga.getAll;
    },
    () => {
      return window.digitalData.product[0].productInfo.productID;
    },
    () => {
    return window.digitalData.product[0].productInfo.stock;
    },
  ], activate);
