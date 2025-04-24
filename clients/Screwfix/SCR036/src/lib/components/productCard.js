import { formatPrice } from '../helpers/utils';

const productCard = (id, data) => {
  const { detailPageUrl, longDescription, imageUrl, skuId, priceInformation } = data;
  const excludeVat = document.getElementById('toggle-vat').checked;
  const price = excludeVat ? priceInformation.currentPriceExVat.amount : priceInformation.currentPriceIncVat.amount;
  const vatText = excludeVat ? 'Ex VAT' : 'Inc VAT';
  const htmlStr = `<div class="${id}__productCard">
        <div class="${id}__cardcontent-container">
          <a href ="${detailPageUrl}" class="${id}__productCard-image">
            <img src="${imageUrl}" alt="${longDescription}" />
            <div class="rating"></div>
          </a>
          <a href="${detailPageUrl}" class="${id}__productCard-info">
              <div class="${id}__productCard-info-name">${longDescription}</div>
              <div class="${id}__productCard-info-sku">(${skuId})</div>
              <div class="${id}__productCard-info-price">${formatPrice(price)} <span>${vatText}</span></div>
              <div class="${id}__productCard-info-btn ${id}__button ${id}__button-primary">View Product</div>
          </a>
        </div>
    </div>`;
  return htmlStr;
};
export default productCard;
