/**
 * PC-196 - Hyperlink basket page products to the Product Page
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { productClickEvents } from './helpers';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  let jQuery = null;
  jQuery = window.jQuery || window.$;

  jQuery.ajax({
    type: "GET",
    url: "/basket/getbasketinfo",
    dataType: "json",
    success: function(e) {
      const basketItems = e.basket.basketItems;
      for (const key in basketItems) {
        const prodName = basketItems[key].spa_name;
        const prodUrl = basketItems[key].productUrl;
        
        if (document.querySelector(`tr.basket-item-row p.availabilityStatus[data-code="${key}"]`)) {
          const productRow = document.querySelector(`tr.basket-item-row p.availabilityStatus[data-code="${key}"]`).closest('tr.basket-item-row');

          productClickEvents(productRow, prodUrl, prodName);

        }
      }
    }
  });

};
