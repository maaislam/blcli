import quantitySelector from './quantity';
import ratingStars from './ratingStar';

const productCard = (id, data) => {
  const { Id, ListPriceFormatted, SalePrice, SalePriceFormatted, Name, SingleVariantSku, ProfileNumber, Slug, Rating } = data;

  //const sku = VariantGroups[0].Variants[0].Sku;
  const url = `/produs/${Id}/${Slug}`;
  const htmlStr = `
    <div href="${url}" class="${id}__productcard data-name="${Name}">
        <div class='${id}__imgContainer'>
            <a href="${url}" class="image-block">
                <img src="/assets/ro-ro/images/product/prod_${ProfileNumber}_1_613x613.jpg" alt="">
            </a>
        </div>
        <div class="${id}__productDetails">
            <a href="${url}" class="name-block">${Name}</a>
            <a href="${url}" class="${id}__rating-block rating-block">${Rating ? ratingStars(id, Rating) : ''}</a>
            <a href="${url}" class="price-block">
                ${SalePrice ? `<div class="price-block__oldprice">${SalePriceFormatted}</div>` : ''}
                <div class="price-block__price">${ListPriceFormatted}</div>
            </a>
            
            <div class="quantity-block">${quantitySelector(id)}</div>
            <div class="${id}__addtocart-block vi-btn--primary" data-sku="${SingleVariantSku}">
                <div class="addtocart-block__icon">
                    <svg-icon icon="basket_pdp" class="ng-isolate-scope"><svg ng-if="Ready" class=""><use xlink:href="#Svg_basket_pdp" ng-attr-xlink:href="{{TrustedSvgHref()}}"></use></svg></svg-icon>
                </div>
                <div class="addtocart-block__text" >${window.atcText || 'Adaugă în coș'}</div>
            </div>
        </div>
    </div>`;

  return htmlStr;
};

export default productCard;
