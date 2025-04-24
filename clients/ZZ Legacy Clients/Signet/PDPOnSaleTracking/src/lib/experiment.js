/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import {
  setup
} from './services';

export default () => {
  setup();

    if (window.digitalData.page.pageInfo.pageType === "PDP") {

      var trackerName = window.ga.getAll()[0].get('name');

      if (window.digitalData.product[0].productInfo.onSale === true) {
        var masterSKU = window.digitalData.product[0].productInfo.masterSku;
        window.ga(trackerName + '.send', 'event', 'PDP Messaging', 'On Sale', 'SKU: ' + masterSKU + '', {
          nonInteraction: true
        });
      } else {

        var productID = window.digitalData.product[0].productInfo.masterSku;

        window.ga(trackerName + '.send', 'event', 'PDP Messaging', 'Not On Sale', 'SKU: ' + productID + '', {
          nonInteraction: true
        });
      }

    }

};
