import shared from "../../../../../../core-files/shared";
import { bootsInfoFinder } from "./utils";

const { ID, VARIATION } = shared;

const qtyOption = `<div class="qty-option">
  <div class="text">QUANTITY</div>
  <div class="number"><input type="number" min="1" max="999" step="1" id="sticky_qty" value="1"></div>
</div>`;

export const sizeSelector = (size = "", prdName) => {
  const bootsInfo = bootsInfoFinder(false, prdName);
  // console.log(`bootsInfo from size selector DOM maker`, bootsInfo);
  if (bootsInfo.length > 0) {
    return `<div class="${ID}-sizeSelect" id="${ID}-sizeSelect">
          <div class="${ID}-sizeSelect-container">
            ${VARIATION == 2 ? `${qtyOption}` : `<div class="size-heading-text">SIZE</div>`}
              <div class="size-option-items">
                ${bootsInfo
                  .map((elem) => {
                    const { SKU, Size, URL } = elem;
                    return `<div data-size="${Size}" data-sku="${SKU}" data-url="${URL}" class="size-option-item"><a href="${URL}" class="size-option-item-anchor${
                      size && size == Size ? ` selected-size` : ``
                    }">${Size}</a></div>`;
                  })
                  .join("\n")} 
            </div>
          </div>
        </div>`;
  }
};
