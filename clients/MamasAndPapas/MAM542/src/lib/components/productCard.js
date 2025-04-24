import shared from '../../../../../../core-files/shared';

const productCard = (id, item) => {
  const { featured_image, title, compare_at_price, price, url, variants } = item;

  const varaintsData = variants.map((variant) => {
    return {
      id: variant.id,
      title: variant.title,
      sku: variant.sku,
      available: variant.available,
      name: variant.name,
    };
  });

  const sku = variants[0].id;
  const singleVariant = variants.length === 1;
  //console.log('🚀 ~ file: productCard.js:5 ~ productCard ~ item:', item);
  const itemsInCart = document.querySelector('[data-cart-count]').innerText;
  const formatPrice = (price) => {
    const currency = window.location.hostname.includes('ie') ? '€' : '£';
    return Number.isInteger(price) ? `${currency}${price}` : `${currency}${price.toFixed(2)}`;
  };
  const oldPrice = Number(compare_at_price / 100);
  const salePrice = Number(price / 100);
  const discountedPrice = oldPrice ? oldPrice - salePrice : 0;

  const isSaleItem = Number(itemsInCart) > 0 || (oldPrice && discountedPrice > 0) ? '' : `${id}__hide`;

  const htmlStr = `<div class="${id}__productCard swiper-slide ${isSaleItem}">
          <a href="${url}" class="${id}__productLink">
              <div class="${id}__imageWrapper">
                  <img src="${featured_image}" alt="${title}" class="${id}__productImage">
                  ${oldPrice && discountedPrice > 0 ? `<div class="${id}__saleBadge">Sale</div>` : ''}
              </div>
              <div class="${id}__productDetails">
                  <h3 class="${id}__productTitle">${title}</h3>
                  <div class="${id}__productPrice">
                      <span class="${id}__productDisplayPrice">${formatPrice(salePrice)}</span>
                      ${
                        oldPrice && discountedPrice > 0
                          ? `<span class="${id}__productComparePrice">${formatPrice(oldPrice)}</span>`
                          : ''
                      }
                  </div>
                  <div class="${id}__productDiscount">
                      ${
                        oldPrice && discountedPrice > 0
                          ? `<span class="${id}__productDiscountedPrice">Save ${formatPrice(discountedPrice)}</span>`
                          : ''
                      }
                  </div>
              </div>
          </a>
          ${
            Number(itemsInCart) <= 0 && singleVariant && shared.VARIATION !== '2'
              ? `<button type='button' class="${id}__productATC single" data-sku="${sku}">Add to Bag</button>`
              : Number(itemsInCart) <= 0 && !singleVariant && shared.VARIATION !== '2'
              ? `<button href="${url}" class="${id}__productATC view-options" data-variants='${JSON.stringify(
                  varaintsData
                )}'>View Options</button>`
              : ''
          } 
      </div>`;
  return htmlStr;
};
export default productCard;
