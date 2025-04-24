import shared from "../../../../../../core-files/shared";

const { ID } = shared;
let biggestPrice;
export const priceTagHTMLGenerator = (id, info) => {
  const { price, offer } = info;
  let mainPrice = price?.split("£")[1];
  if (id == 0) biggestPrice = mainPrice;
  let splitedPrice = mainPrice?.split(".");
  window[`${ID}-$$savingOptions`].push({
    option: id + 1,
    html: `<div id="${ID}-product_price" class="pr__price product_price-option-${id}">
        <span class="pound">£</span>${splitedPrice[0]?.trim()}<span class="pence">.${splitedPrice[1]?.trim()}<span class="incvat">INC VAT</span></span>
        <div class="save-text">
          ${
            biggestPrice - mainPrice > 0
              ? `SAVE <span class="save-text-pound">£</span><span class="save-text-price">${(biggestPrice - mainPrice)
                  .toFixed(2)
                  ?.trim()}</span><span class="save-text-offer"> (${offer?.split(/\s/)[1]?.trim()} off)</span>`
              : ``
          }
        </div>
      </div>`,
  });
};
