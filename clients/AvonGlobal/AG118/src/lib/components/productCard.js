import quantitySelector from './quantity';
import ratingStars from './ratingStar';

const productCard = (id, data) => {
  const {
    Id,
    ListPrice,
    ListPriceFormatted,
    SalePrice,
    SalePriceFormatted,
    Name,
    SingleVariantSku,
    ProfileNumber,
    Slug,
    Rating,
  } = data;
  const priceToTake = SalePrice || ListPrice;
  const priceSplit = priceToTake.toString().split('.');
  const priceBlock = `<span class="price-block__price--main">${priceSplit[0]}</span><sup class="price-block__price--cents">${
    priceSplit[1] || '00'
  }</sup>`;

  //const sku = VariantGroups[0].Variants[0].Sku;
  const url = `/produs/${Id}/${Slug}`;
  const htmlStr = `
    <div href="${url}" class="${id}__productcard swiper-slide" data-name="${Name}">
        <a href="${url}" class="image-block">
            <img src="/assets/ro-ro/images/product/prod_${ProfileNumber}_1_613x613.jpg" alt="">
        </a>
        <div class="${id}__productcard-details">
            <a href="${url}" class="name-block">${Name}</a>
            <a href="${url}" class="${id}__rating-block ${id}__hide">${ratingStars(id, Rating)}</a>
            <a href="${url}" class="price-block">
                <div class="price-block__price">${priceBlock}</div>
                <div class="price-block__price mobile">${ListPriceFormatted}</div>
                <div class="price-block__oldprice ${
                  SalePrice ? '' : `${id}__invisible ${id}__setheight`
                }">${SalePriceFormatted}</div>
            </a>
            
            <div class="quantity-block ${id}__hide">${quantitySelector(id)}</div>
            <div class="${id}__addtocart-block" data-sku="${SingleVariantSku}">
                <div class="addtocart-block__icon ${id}__hide">
                    <svg-icon icon="basket_pdp" class="ng-isolate-scope"><svg ng-if="Ready" class=""><use xlink:href="#Svg_basket_pdp" ng-attr-xlink:href="{{TrustedSvgHref()}}"></use></svg></svg-icon>
                </div>
                <div class="addtocart-block__text" >${window.atcText || 'KUP TERAZ'}</div>
            </div>
        </div>
    </div>`;

  return htmlStr;
};

export default productCard;
