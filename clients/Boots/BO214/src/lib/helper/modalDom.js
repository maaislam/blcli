import shared from "../../../../../../core-files/shared";
import { angleRight, closeBtn, qSVG, tickSVG } from "../assets/svgIcons";

const { ID, VARIATION } = shared;

const modalHeadCreator = (offerApplicableItems) => {
  if (VARIATION == 1) {
    const message = `${
      3 - offerApplicableItems.length
        ? `<p class="offer-text">You’ve alread added <span class="product-added product-text-bold">${
            offerApplicableItems.length
          }</span> add aother <span class="product-remained product-text-bold">${3 - offerApplicableItems.length}</span> to complete the deal</p>`
        : ``
    }`;
    const section = `<div class="${ID}-closeButton"><a href="javascript:void(0)">${closeBtn}</a></div>
    <div class="${ID}-promotional-modal-heading">
      <h3 class="header">Make it a deal</h3>
      <p class="description">Mix & match with 3 for 2 on selected baby & child vitamins with your advantage card.</p>
      ${message}
    </div>`;
    return section;
  }
  if (VARIATION == 2 || VARIATION == 3) {
    const message = `${
      3 - offerApplicableItems.length > 0
        ? `<p class="offer-text">Add <span class="product-remained product-text-bold">${3 - offerApplicableItems.length}</span> more products to qualify</p>`
        : ``
    }`;
    const section = `<h3 class="header">Complete your <span class="product-text-bold">3</span> for <span class="product-text-bold">2</span> deal</h3>
      ${message}${angleRight}`;
    return section;
  }
};

const modalBodyCreator = (product, isSVGAvail, isThirdItem) => {
  const { item, unitDiscountedPrice, unitPrice } = product;
  let { imageUrl, name } = item;
  let callbackSrc;
  if (item.swatchImageUrl) {
    imageUrl = `https://boots.scene7.com/is/image/Boots/${item.partNumber}H?wid=120&hei=140&op_sharpen=1`;
    callbackSrc = `https://boots.scene7.com/is/image/Boots/${item.parentPartNumber.replaceAll(".P", "")}?wid=120&hei=140&op_sharpen=1`;
  }
  if (VARIATION == 1) {
    return `<div class="${ID}-promotional-products-item no-border">
        <div class="item-header"><h3 class="header product-text-bold">ADDED</h3></div>
        <div class="item-image">
        <img src="${imageUrl}" onerror="this.onerror=null;this.src='${callbackSrc}'"/>
        </div>
        <div class="item-description">
        <p class="item-name" title="${name}">${name}</p>
        <span class="item-price">
          <span class="item-price-now product-text-bold">Now ${unitDiscountedPrice.currencySymbol} ${isThirdItem ? 0 : unitDiscountedPrice.amount}</span>
          <span class="item-price-was">was ${unitPrice.currencySymbol} ${unitPrice.amount}</span>
        </span>
        </div>
        ${
          isSVGAvail
            ? `<div class="icon-plus"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10.5 9.5V1H9.5V9.5H1V10.5H9.5V19H10.5V10.5H19V9.5H10.5Z" fill="#05054B" stroke="#05054B"/>
        </svg></div>`
            : ``
        }
        </div>`;
  } else if (VARIATION == 2 || VARIATION == 3) {
    return `<div class="${ID}-promotional-products-item item-align-horizontal">
    <div class="${ID}-promotional-products-item-inner-wrapper">
        <div class="item-image" title="${name}">
        <img src="${imageUrl}" onerror="this.onerror=null;this.src='${callbackSrc}'"/>
        </div>
        <div class="item-header">${tickSVG}<span class="header">ADDED</span></div>
        <div class="icon-plus">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10.5 9.5V1H9.5V9.5H1V10.5H9.5V19H10.5V10.5H19V9.5H10.5Z" fill="#05054B" stroke="#05054B"/></svg>
        </div>
    </div>
  </div>`;
  }
};

const emptyPromoProduct = () => {
  if (VARIATION == 1) {
    return `<div class="${ID}-promotional-products-item">
      <div class="item-image-question">
        ${qSVG}
      </div>
      <div class="item-description-cta">
        <a href="https://www.boots.com/sitesearch?promotionalText%5B0%5D=3%2Bfor%2B2%2Bon%2Bselected%2BNo7%2B-%2Bcheapest%2Bfree" class="product-text-bold">ADD TO DEAL</a>
      </div>
      </div>`;
  } else if (VARIATION == 2 || VARIATION == 3) {
    return `<div class="${ID}-promotional-products-item">
<div class="${ID}-promotional-products-item-inner-wrapper">
  <div class="item-image-question">
    ${qSVG}
  </div>
  <div class="item-description-cta">
    <a href="https://www.boots.com/sitesearch?promotionalText%5B0%5D=3%2Bfor%2B2%2Bon%2Bselected%2BNo7%2B-%2Bcheapest%2Bfree" class="product-text-bold">ADD TO DEAL</a>
  </div>
  <div class="icon-plus">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M10.5 9.5V1H9.5V9.5H1V10.5H9.5V19H10.5V10.5H19V9.5H10.5Z" fill="#05054B" stroke="#05054B"/></svg>
</div>
  </div>
  </div>`;
  }
};

export const modalDomCreator = (offerApplicableItems) => {
  const headSection = modalHeadCreator(offerApplicableItems);
  let promoProduct_1, promoProduct_2, promoProduct_3;
  // modalBodyCreator (product, isSVGAvail, isThirdItem)
  promoProduct_1 = offerApplicableItems?.[0] ? modalBodyCreator(offerApplicableItems[0], true, false) : emptyPromoProduct();
  promoProduct_2 = offerApplicableItems?.[1] ? modalBodyCreator(offerApplicableItems[1], false, false) : emptyPromoProduct();
  promoProduct_3 = offerApplicableItems?.[2] ? modalBodyCreator(offerApplicableItems[2], false, true) : emptyPromoProduct();
  if (VARIATION == 1) {
    return `<div class="${ID}-promotional-modal-container">
    ${headSection}
    <div class="${ID}-promotional-modal-products">
    ${promoProduct_1}
    ${promoProduct_2}
    ${promoProduct_3}
    </div>
    </div>
    `;
  } else if (VARIATION == 2 || VARIATION == 3) {
    // promoProduct_2 = window[ID]?.[1] ? modalBodyCreator(window[ID][1], true) : emptyPromoProduct();
    return `<div class="${ID}-promotional-modal-container">
    <div class="${ID}-acc-container">        
      <div class="acc">
        <div class="acc-head">
        ${headSection}
        </div>
        <div class="acc-content">
        <div class="${ID}-promotional-modal-products">
        ${promoProduct_1}
        ${promoProduct_2}
        ${promoProduct_3}
        </div>
        </div>
      </div>
    </div>
    </div>
    `;
  }
};
