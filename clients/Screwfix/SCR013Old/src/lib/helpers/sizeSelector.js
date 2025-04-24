import shared from "../../../../../../core-files/shared";
import { bootsInfoFinder } from "./utils";

const { ID, VARIATION } = shared;
const cancelIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
<path d="M16.78 12.0814C16.78 12.4133 16.6535 12.6998 16.4004 12.9412L14.4769 14.6606C14.2069 14.8869 13.8863 15 13.5151 15C13.1439 15 12.8233 14.8869 12.5534 14.6606L8.40265 10.9276L4.25195 14.6606C3.98198 14.8869 3.6614 15 3.29019 15C2.919 15 2.59841 14.8869 2.32844 14.6606L0.404943 12.9412C0.134978 12.6998 0 12.4133 0 12.0814C0 11.7496 0.134987 11.463 0.404943 11.2217L4.55565 7.51131L0.404943 3.8009C0.134978 3.55958 0 3.273 0 2.94117C0 2.60935 0.134978 2.32277 0.404943 2.08145L2.32844 0.361988C2.59841 0.12066 2.91899 0 3.29019 0C3.66139 0 3.98197 0.12066 4.25195 0.361988L8.40265 4.0724L12.5534 0.361988C12.8233 0.12066 13.1439 0 13.5151 0C13.8863 0 14.2069 0.12066 14.4769 0.361988L16.4004 2.08145C16.6535 2.30769 16.78 2.59427 16.78 2.94117C16.78 3.28808 16.6535 3.57466 16.4004 3.8009L12.2497 7.51131L16.4004 11.2217C16.6535 11.448 16.78 11.7345 16.78 12.0814Z" fill="#D0030B"/>
</svg>`;

const qtyOption = `<div class="qty-option">
  <div class="text">QUANTITY</div>
  <div class="number"><input type="number" min="1" max="999" step="1" id="sticky_qty" value="1"></div>
</div>`;

const textAtWarning = `<div class="text-at-warning ${ID}-x__hidden">${cancelIcon} <span class="${ID}-x__hidden text-at-warning-choose-size">Please choose a size</span><span class="text-at-warning-size-notAvailable">Please choose a valid size</span></div>`;

export const sizeSelector = (product, size = "") => {
  let prdName = product?.textContent.trim()?.replace(/  +/g, " ").toLowerCase();
  if (prdName.includes(`scruffs switchback ladies safety boots tan`)) prdName = "scruffs switchback 3 safety boots tan";
  console.log("prdName", prdName);
  const bootsInfo = bootsInfoFinder(false, prdName);
  const chooseSize = {
    ProductName: "",
    Size: "Choose Size",
    SKU: "",
    URL: "",
  };
  if (bootsInfo.length > 0) {
    bootsInfo.unshift(chooseSize);
    return `<div class="${ID}-sizeSelect" id="${ID}-sizeSelect">
          <div class="${ID}-sizeSelect-container">
          ${VARIATION == 2 ? `${qtyOption}` : `<div class="size-heading-text">SIZE</div>`}
            <div class="size-option">
              <div class="size-option-text">
                <div class="text">CHOOSE SIZE</div>
                <div class="icon"></div>
              </div>
              ${VARIATION == 1 ? `${textAtWarning}` : ``}
              <div class="size-option-items">
              <!-- <div data-size="Choose Size" data-sku="" data-url="" class="size-option-item selected-dropdown">Choose Size</div> -->
            ${bootsInfo
              .map((elem) => {
                // console.log(elem);
                const { SKU, Size, URL } = elem;
                return `<div data-size="${Size}" data-sku="${SKU}" data-url="${URL}" class="size-option-item${
                  size && size == Size ? ` selected-dropdown` : ``
                }"><a href="${URL}">${Size}</a></div>`;
              })
              .join("")} 
              </div>
            </div>
          </div>
        </div>`;
  }
};
