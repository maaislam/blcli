import shared from "../../../../../../core-files/shared";
import { productInfoEditor, selectedOptionEditor } from "./optionEditor";
import { prdInfoFinder } from "./utils";

const { ID } = shared;

const sizeOptionClickHandler = (target) => {
  // const productName = document.querySelector(`.pr__product #product_description span[itemprop="name"]`);
  const dataSize = target.closest(`div.size-option .size-option-item`).getAttribute(`data-size`)?.trim();
  const dataSKU = target.closest(`div.size-option .size-option-item`).getAttribute(`data-sku`)?.trim();
  const dataURL = target.closest(`div.size-option .size-option-item`).getAttribute(`data-url`)?.trim();
  let productName = dataURL ? /(?<=\/p\/).*(?=\/[A-Za-z0-9])+/gi.exec(dataURL)[0]?.replace(/\-/g, " ")?.toUpperCase() : ``;
  console.log("dataSize", dataSize);
  if (!target.closest(`.size-option-item`).classList.contains(`selected-dropdown`)) {
    target.closest(`.${ID}-sizeSelect`).querySelector(`div.size-option .size-option-item.selected-dropdown`).classList.remove(`selected-dropdown`);
    target.closest(`.size-option-item`).classList.add(`selected-dropdown`);
  }
  target.closest(`div.size-option .size-option-items.dropdown-active`)?.classList.remove(`dropdown-active`);
  if (target.closest(`.${ID}-x__warning-item`)) {
    selectedOptionEditor(false, dataSize, dataSKU);
  } else selectedOptionEditor(true, dataSize, dataSKU);
  if (productName && dataSize && dataSKU) {
    const { ProductName, Size, SKU, URL } = prdInfoFinder(dataSize, dataSKU);
    if (ProductName && Size && SKU && URL) {
      productInfoEditor(ProductName, Size, SKU, URL);
    }
  }
};

export const clickHandler = (target) => {
  console.log(target);
  if (target.closest(`div.size-option .size-option-item`)) {
    // const currentOption = target.closest(`div.size-option .size-option-item`);
    sizeOptionClickHandler(target);
  } else if (target.closest(`div.size-option`)) {
    if (!target.closest(`div.size-option`).querySelector(`.dropdown-active`)) {
      target.closest(`div.size-option`).querySelector(`.size-option-items`).classList.add(`dropdown-active`);
    }
  }
};
