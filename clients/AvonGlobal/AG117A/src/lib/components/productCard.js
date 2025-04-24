import quantitySelector from './quantity';
import ratingStars from './ratingStar';

const productCard = (id, data) => {
  const { Id, ListPriceFormatted, SalePrice, SalePriceFormatted, Name, SingleVariantSku, ProfileNumber, Slug, Rating } = data;

  //const sku = VariantGroups[0].Variants[0].Sku;
  const url = `/produs/${Id}/${Slug}`;
  const htmlStr = `
    <div href="${url}" class="${id}__productcard swiper-slide" data-name="${Name}">
        <a href="${url}" class="image-block">
            <img src="/assets/ro-ro/images/product/prod_${ProfileNumber}_1_613x613.jpg" alt="">
        </a>
        <a href="${url}" class="name-block">${Name}</a>
        <a href="${url}" class="${id}__rating-block">${ratingStars(id, Rating)}</a>
        <a href="${url}" class="price-block">
            <div class="price-block__price">${ListPriceFormatted}</div>
            ${SalePrice ? `<div class="price-block__oldprice">${SalePriceFormatted}</div>` : ''}
        </a>
        
        <div class="quantity-block">${quantitySelector(id)}</div>
        <div class="${id}__addtocart-block" data-sku="${SingleVariantSku}">
            <div class="addtocart-block__icon">
                <svg-icon icon="basket_pdp" class="ng-isolate-scope"><svg ng-if="Ready" class=""><use xlink:href="#Svg_basket_pdp" ng-attr-xlink:href="{{TrustedSvgHref()}}"></use></svg></svg-icon>
            </div>
            <div class="addtocart-block__text" >${window.atcText || 'ADD TO BAG'}</div>
        </div>
    </div>`;

  return htmlStr;
};

export default productCard;
