/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import { waitForApp } from "../../../../lib/utils/avon";
import { share, getPageType, setup, fireEvent } from "./lib/services";
import { events } from "../../../../lib/utils";
import shared from "./lib/shared";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

if (!ieChecks) {
  const { ID, VARIATION } = shared;

  // Force set GA reference to 360 account
  // As of March 2020 we noticed the default tracker isn't always
  // this core account
  events.setPropertyId("UA-142145223-1");

  /**
   * Poll for elements the run experiment
   */
  const urls = [
    "/6498/darky",
    "/6498-6528/darky/pro-ni",
    "/6498-6529/darky/pro-nej",
    "/6498-6530/darky/pro-deti",
    "/6498-6525/darky/darky-do-300-kc",
    "/6498-6526/darky/darky-do-500-kc",
    "/6498-6527/darky/darky-nad-500-kc",
    "/6498-6586/darky/parfemove-sady",
    "/6498-6587/darky/dekorativni-kosmetika",
    "/6498-6589/darky/pece-o-plet",
    "/6498-6588/darky/pece-o-telo",
    "/6498-6590/darky/pece-o-vlasy",
  ];
  const pollAndFire = () => {
    pollerLite(
      [
        // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
        // Specify polling elements
        // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
        "body",
        ".SubCategoryName",
        '[ng-controller="ProductListController"]',
        () => urls.indexOf(window.location.pathname) !== -1,
        () => window.$,
      ],
      () => {
        setup();
        // Fire did meet conditions
        fireEvent("did-meet-conditions");
        if (VARIATION.toLowerCase() !== "control") activate();
        else {
          // Control tracking.
          $(`#CategoryLeftNav .CategoryLevel3 a`).click(function () {
            fireEvent(`Click - Sidebar filter: ${$(this).text().trim()}`);
          });

          $("#CategoryPage async-block")
            .first()
            .find("a")
            .click(function () {
              fireEvent(`Click - Top filter: ${$(this).text().trim()}`);
            });

          $(document).on("click", `.ProductList .QtyUp`, function () {
            fireEvent(`Click - Quantity increase`);
          });
          $(document).on("click", `.ProductList .QtyDown`, function () {
            fireEvent(`Click - Quantity decrease`);
          });
          $(document).on("change", `.ProductList .Quantity input`, function () {
            fireEvent(`Change - quantity change`);
          });
          $(document).on(
            "click",
            `.ProductList .ProductListItem .Button`,
            function () {
              fireEvent(`Click - Add to cart`);
            }
          );
        }
      }
    );
  };

  /**
   * Top-level polling entry point for code execution
   */
  waitForApp().then((data) => {
    share(data);
    pollAndFire();
  });
}
