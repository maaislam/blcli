import shared from "../../../../../../core-files/shared";
import { buttonDOMFn } from "./buttonDom";
import { addClass, attributeCheck, removeClass } from "./utils";

const { ID } = shared;

export const selectorEditor = (info) => {
  console.log(info);
  info.forEach((el) => {
    const { productSize, productSku } = el;
    addClass(`.${ID}-sizeSelect .size-option-item[data-sku="${productSku}"]`, `${ID}-x__warning-item`);
    let selectedTextContainers = document.querySelectorAll(`.${ID}-sizeSelect div.size-option div.size-option-text[data-sku="${productSku}"]`);
    selectedTextContainers.length > 0 && selectedOptionEditor(false, productSize, productSku);
  });
};

export const selectedOptionEditor = (available = "", size, sku) => {
  const textContainers = document.querySelectorAll(`.${ID}-sizeSelect div.size-option div.size-option-text`);
  console.log("textContainer", textContainers);
  if (textContainers.length > 0) {
    textContainers.forEach((text) => {
      !text.closest(`.text-selected`) && text.classList.add(`text-selected`);
      if (!available) {
        // updating text at main selector
        addClass(text, `${ID}-x__warning`);
        // updating warning text
        text.closest(`.size-option`)?.querySelector(`.text-at-warning`) &&
          removeClass(text.closest(`.size-option`)?.querySelector(`.text-at-warning`), `${ID}-x__hidden`);
      } else {
        removeClass(text, `${ID}-x__warning`);
        addClass(text.closest(`.size-option`)?.querySelector(`.text-at-warning`), `${ID}-x__hidden`);
      }
      text.setAttribute(`data-size`, size);
      text.setAttribute(`data-sku`, sku);
      text.querySelector(`.text`).innerText = `${size}`;
    });
  }
  // buttonDOMFn(available, size, sku);
};

export const productInfoEditor = (name, size, sku, url) => {
  if (name && size && sku && url) {
    // const title = `${name} size ${size}`;
    const title = /(?<=\/p\/).*(?=\/[A-Za-z0-9])+/gi.exec(url)[0]?.replace(/\-/g, " ")?.toUpperCase();
    console.log(title, sku);
    const productConatainer = document.querySelector(`.pr__product`);
    const productDescription = productConatainer?.querySelector(`#product_description`);
    const productName = productDescription?.querySelector(`span[itemprop="name"]`);
    const productCodeContainer = productDescription?.querySelector(`#product_code_container`);
    const productID = productCodeContainer?.querySelector(`span[itemprop="productID"]`);
    const productSKU = productCodeContainer?.querySelector(`meta[itemprop="sku"]`);
    productName && (productName.textContent = `${title}`);
    productID && (productID.textContent = `${sku}`);
    productSKU?.setAttribute(`content`, `${sku}`);

    // replacing URL
    history.replaceState({}, null, url);
    // Updating all input and button to the selected product info
    const requiredFields = document.querySelectorAll(
      `input[id^="analytics_prodName"], input[id^="analytics_categoryName"], input[id^="analytics_categoryID"], button[id^="add_for_collection_button"], button[id^="add_for_sticky_collection_button"], p[id^="branch_collection"], a[id^="click_and_collect"], input[id="checkStockPageLink"], input#prodId`
    );
    // console.log(`requiredFields`, requiredFields);
    requiredFields.length > 0 &&
      requiredFields.forEach((field) => {
        if (attributeCheck(field, `id`, `analytics_prodName`)) {
          field.setAttribute(`id`, `analytics_prodName_${sku}`);
          field.setAttribute(`value`, `analytics_prodName_${title}`);
        } else if (attributeCheck(field, `id`, `analytics_categoryName`)) {
          field.setAttribute(`id`, `analytics_categoryName_${sku}`);
        } else if (attributeCheck(field, `id`, `analytics_categoryID`)) {
          field.setAttribute(`id`, `analytics_categoryID_${sku}`);
        } else if (attributeCheck(field, `id`, `add_for_collection_button`)) {
          field.setAttribute(`id`, `add_for_collection_button_${sku}`);
        } else if (attributeCheck(field, `id`, `add_for_sticky_collection_button`)) {
          field.setAttribute(`id`, `add_for_sticky_collection_button_${sku}`);
        } else if (attributeCheck(field, `id`, `branch_collection`)) {
          field.setAttribute(`id`, `branch_collection_${sku}`);
        } else if (attributeCheck(field, `id`, `click_and_collect`)) {
          field.setAttribute(`id`, `click_and_collect_${sku}`);
          const href = field.getAttribute(`href`);
          const paramLess = href?.split(`?`)[0];
          const link = paramLess ? paramLess + `?product_id=${sku}` : ``;
          link && field.setAttribute(`href`, `${link}`);
        } else if (attributeCheck(field, `id`, `checkStockPageLink`)) {
          const href = field.getAttribute(`value`);
          const paramLess = href?.split(`?`)[0];
          const link = paramLess ? paramLess + `?product_id=${sku}` : ``;
          link && field.setAttribute(`value`, `${link}`);
        } else if (attributeCheck(field, `id`, `prodId`)) {
          field.setAttribute(`value`, `${sku}`);
        }
      });
  }
};
