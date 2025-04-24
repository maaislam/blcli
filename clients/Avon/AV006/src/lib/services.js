import { fullStory } from '../../../../../lib/utils';
import shared from './shared';
import { angularCompile } from '../../../../../lib/utils/avon';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/** Standard experiment setup */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

/**
 * Separate free gift products from main product list
 */
export const separateFreeGifts = () => {
  const { $, ID } = shared;
  const $productList = $('.Cart-Products');
  const $products = $productList.find('.Cart-Product');

  /**
   * @param {string} productImgHtml
   * @param {object} productData
   * @param {boolean} isVariant
   * @returns {string}
   */
  const createMarkup = (productImgHtml, productData, isVariant) => `
    <span class="${ID}_freeGift">
      <span class="${ID}_freeGiftLabel">Enjoy a FREE gift!</span>
      <span class="${ID}_freeGiftProductImg">${productImgHtml}</span>
      <span class="${ID}_freeGiftProductName">${productData.Name}</span>
      <span class="${ID}_freeGiftPrice">FREE</span>
      <span class="${ID}_freeGiftQty">
        <div>${productData.Quantity}</div>
        <a class="${ID}_freeGiftRemove" ng-show="product.CanModify" ng-click="RemoveProduct(${isVariant ? 'variant.Sku' : 'product.LoneVariant.Sku'}, campaign.Campaign)" data_nav="cart"data_action="removefromCart"><span>x remove</span></a>
      </span>
      <span class="${ID}_freeGiftPrice">FREE</span>
    </span>
  `;

  /**
   * Move a product from the product list to a smaller
   * component at the bottom
   * @param {number} index
   * @param {HTMLElement} element
   */
  const separateProduct = (index, element) => {
    const $product = $(element);
    const productScope = $product.scope();
    const productData = productScope.product;
    const allVariants = productData.AllVariants;
    const productImgHtml = $product.find('.Cart-ProductImage').html();

    /**
     * @param {object} variant
     * @param {number} index
     */
    const createSmallComponent = (variant, variantIndex) => {
      const isVariant = variant.VariantName;
      const renderScope = isVariant ? $product.find('.Cart-Variants .Cart-VariantItem').eq(variantIndex).scope() : productScope;
      const $element = $(createMarkup(productImgHtml, productData, isVariant));

      window.$product = $product;

      // Add variant name
      if (isVariant) {
        $element.find(`.${ID}_freeGiftProductName`).append(`
          <div class="${ID}_freeGiftVariants">
            <span class="${ID}_freeGiftVariantsHeading">Chosen options:</span>
            <ul>
              <li>${variant.VariantName.trim()}</li>
            </ul>
          </div>
        `);
      }

      $productList.append($element);
      angularCompile($element, $, renderScope);
      // $product.remove();
    };

    allVariants.forEach(createSmallComponent);
  };

  const $freeProducts = $products
    .filter((index, element) => $(element).scope()?.product?.ProductTotal === 0);

  $freeProducts.each(separateProduct);

  // Hide original listings
  $freeProducts.hide();
};
