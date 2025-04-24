/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from "./services";
import shared from "./shared";
import settings from "./shared";
import {
  events,
  pollerLite,
  logMessage,
  observer,
} from "../../../../../lib/utils";
const { ID, VARIATION, CLIENT, LIVECODE } = settings;

events.analyticsReference = "_gaUAT";

export default () => {
  setup();

  logMessage(ID + " Variation " + VARIATION);

  // let sku = "64200419-459725";
  // let sku2 = "64590718-1247619";

  // window.DY.ServerUtil.getProductsData([sku, sku2], ['daily'], "", true, function(err, res) {

  //   if(typeof res !== undefined || res !== null) {
  //     console.log(res);
  //   }

  // });

  console.log("running ATB exp");

  function addToBag(sizeVariantId, cb) {
    pollerLite(
      [
        () => {
          let run = false;
          if (window.jQuery) {
            $ = window.jQuery;
            run = true;
          }
          return run;
        },
      ],
      () => {
        

        let bagContent = [
          {
            sizeVariantId: "60568406-1176680",
            quantity: "1",
            personalisation: [],
            isProductRec: false,
          },
        ];

        $.ajax({
          type: "POST",
          url: "/api/basket/v1/add",
          data: JSON.stringify(bagContent),
          dataType: "json",
          contentType: "application/json",
          xhrFields: {
            withCredentials: true,
          },
          success: function (data) {
            window.updateSkinBag();
          },
        });
      }
    );
  }

  addToBag(64770403, (e) => {
    alert("added to bag");
    console.log(e);
  });
};
