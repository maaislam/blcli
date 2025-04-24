/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const getCurrBasketAmount = () => {

  return new Promise((resolve, reject) => {

    let headers = {
      siteid: 'UK',
      channel: 'Ecommerce',
      context: 'BASKET'
    };

    $.ajax({
      cache: true,
      type: 'GET',
      url: '/api/checkout/basket?calculatePromotions=true',
      data: '',
      headers: headers,
      dataType: 'json',
      success: function (returnedData) {
        if (returnedData) {

          console.log("RETURNED DATA")
          console.log(returnedData);

          let totalBasketValue = returnedData.basketDetails?.totalAdjustedPrice?.amount ? returnedData.basketDetails.totalAdjustedPrice.amount : 0;
          let totalItemCount = returnedData.basketDetails?.totalItemCount ? returnedData.basketDetails.totalItemCount : 0;

          let basket = {
            totalBasketValue: totalBasketValue,
            totalItemCount: totalItemCount
          }

          resolve(basket);
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        if (textStatus != 'abort') console.error(textStatus + errorThrown);
        return null;
      }
    });


  });



};

export default () => {
  

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
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

  getCurrBasketAmount().then((basket) => {
    console.log("GCB BOOT-412");
    console.log(basket);

  });

  window.addEventListener("oct-basket:updated", () => {
    getCurrBasketAmount().then((basket) => {
      console.log("AFTER UPDATE GCB BOOT-412");
      console.log(basket);

    });
  });
  window.addEventListener("add-to-basket:success", () => {
    getCurrBasketAmount().then((basket) => {
      console.log("AFTER ATB GCB BOOT-412");
      console.log(basket);

    });
  });

};
