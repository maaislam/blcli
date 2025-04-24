/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";
import { autoUpdateQuantityFields } from "./helpers/autoUpdateQuantityFields";
import { buttonDOMFn } from "./helpers/buttonDom";
import { clickHandler } from "./helpers/clickHandler";
import { selectedOptionEditor, selectorEditor } from "./helpers/optionEditor";
import { sizeSelector } from "./helpers/sizeSelector";
import { addClass, bootsInfoFinder, getProductsData, moveElem, prdInfoFinder } from "./helpers/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();
  console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);
  fireEvent("Conditions Met");

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  const body = document.body;
  body.addEventListener(`click`, ({ target }) => clickHandler(target));
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const productConatainer = document.querySelector(`.pr__product`);
  const priceContainer = productConatainer?.querySelector(`.row.pr__prices`);
  const productQuantity = priceContainer?.querySelector(`.pr__qty`);
  const productDescription = productConatainer?.querySelector(`#product_description`);
  const productName = productDescription?.querySelector(`span[itemprop="name"]`);
  // const productCodeContainer = productDescription?.querySelector(`#product_code_container`);
  // const dataObjs = window.dataLayer.filter((item) => typeof item === 'object')[0];

  const { Size, SKU } = prdInfoFinder();
  const sizeSelectorDom = sizeSelector(productName, Size);

  if (VARIATION == 1) {
    moveElem(priceContainer, sizeSelectorDom, `beforebegin`);
    moveElem(productQuantity, sizeSelectorDom, `beforebegin`);
    // buttonDOMFn();
  } else if (VARIATION == 2) {
    moveElem(`.pdp-float-cta__col.pr__btns > .row`, sizeSelectorDom, `afterbegin`);
  }

  pollerLite([`.${ID}-sizeSelect`], async () => {
    addClass(`.${ID}-sizeSelect .size-option-item[data-size="Choose Size"]`, `${ID}-x__warning-item`);
    selectedOptionEditor(true, Size, SKU);
    let prdName = productName?.textContent.trim()?.replace(/  +/g, " ").toLowerCase();
    if (prdName.includes(`scruffs switchback ladies safety boots tan`)) prdName = "scruffs switchback 3 safety boots tan";
    console.log("prdName", prdName);
    const bootsInfo = bootsInfoFinder(false, prdName);
    const urls = [...bootsInfo].map((info) => {
      if (info.URL) return info.URL;
    });
    const info = await getProductsData(urls);
    window[`${ID}-$$info`] = info;
    console.log(window[`${ID}-$$info`]);
    //
    // info[info.length - 1].isCollectionCTAAvailable = false;
    // info[info.length - 1].isDeliverCTAAvailable = false;
    // info[info.length - 2].isCollectionCTAAvailable = false;
    // info[info.length - 2].isDeliverCTAAvailable = false;
    // info[info.length - 4].isCollectionCTAAvailable = false;
    // info[info.length - 4].isDeliverCTAAvailable = false;
    //

    if (info && info.length > 0) {
      const unAvailableProducts = info.filter((el) => {
        const { deliverCTA, collectionCTA } = el;
        console.log(el);
        if (deliverCTA.matches(`span`) && collectionCTA.matches(`span`)) return el;
      });
      console.log("unAvailableProducts", unAvailableProducts);
      unAvailableProducts && unAvailableProducts.length > 0 && selectorEditor(unAvailableProducts);
    }
    if (VARIATION == 2) autoUpdateQuantityFields();
  });
};
