/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
if (!ieChecks) {
  pollerLite(['body', () => window._ShopContext !== undefined], () => {
    //get Data
    const fetchURL = (pIds) => {
      const campaignID = window._ShopContext.CampaignNumber;

      return `/api/productsapi/getproducts?language=en&campaignNumber=${campaignID}&productIds=${pIds}`;
    };

    const pIds = ['17651', '14207', '17374', '16796'];

    fetch(fetchURL(pIds.join()))
      .then((response) => response.json())
      .then((result) => {
        const products = result.Data;
        activate(products);
      });
  });
}
