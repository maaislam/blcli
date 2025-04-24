import { formatPrice } from '../helpers/utils';
import variantOptions from './variantOptions';

const productCard = (id, data) => {
  const { Id, Name, Availability, ProfileNumber, ListPrice, Slug, VariantGroups } = data;

  const imgUrl = `/assets/ro-ro/images/product/prod_${ProfileNumber}_1_613x613.jpg`;
  const prodUrl = `/produs/${Id}/${Slug}`;

  const allVariants = VariantGroups.flatMap((group) => group.Variants);
  const firstVariant = allVariants[0];
  const firstVariantSku = firstVariant.Sku;
  const firstVariantImage = firstVariant.Image;
  //console.log('🚀 ~ productCard ~ firstVariantImage:', firstVariantImage);

  //console.log(allVariants);

  const htmlString = `
    <div class="${id}__carousel-item swiper-slide" data-instock="${Availability}">
        <a href="${prodUrl}" class="${id}__carousel-image">
            <img src="${imgUrl}" alt="${Name}" />
        </a>
        <a href="${prodUrl}" class="${id}__carousel-content">
            <div class="${id}__carousel-content__title">${Name}</div>
            <div class="${id}__carousel-content__price">${formatPrice(ListPrice)}</div>
        </a>
        <div class="${id}__carousel-buttons">
          ${variantOptions(id, allVariants, firstVariantImage)}
          <div class="${id}__product-atc" data-cartsku="${firstVariantSku}">
              Adaugă în coș
          </div>  
        </div>
    </div>`;
  return htmlString;
};

export default productCard;
