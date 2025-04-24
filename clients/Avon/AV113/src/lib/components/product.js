import { formatPrice } from '../helpers/formatPrice';

const renderProductCard = (expId, productData, totalCards) => {
  const { available, compare_at_price, featured_image, id, name, price, primaryImg, sku, title, productUrl } = productData;
  const prevPrice = formatPrice(compare_at_price / 100);
  const currPrice = formatPrice(price / 100);
  const variantIfo = () => {
    if (!featured_image) return `<div class="${expId}__variant_info"></div>`;
    return `<a href="${productUrl}" class="${expId}__variant_info">
        <div class="variant-info--img" style="background-image: url(${featured_image.src})"></div>
        <span class="variant-info--name">${title}</span>
      </a>`;
  };

  const htmlStr = `
    <div class="${expId}__product--card ${totalCards < 4 ? `${expId}__singlecard` : ''}">
        <a href="${productUrl}" class="${expId}__product--img">
            <img src="${primaryImg}" alt="${name}" />
        </a>
        <div class="${expId}__product--details">
            <a href="${productUrl}" class="${expId}__product-title">${name}</a>
            ${variantIfo()}
            <div class="product_price">
                <span class="prev-price ${!compare_at_price ? `${expId}__hide` : ''}">${prevPrice}</span>
                <span class="curr-price">${currPrice}</span>
            </div>
            <div class="${expId}__product_add-to-cart ${expId}__btn " data-sku="${sku}" data-id="${id}">Add to basket</div>
        </div>
    </div>
    `;

  return htmlStr;
};
export default renderProductCard;
