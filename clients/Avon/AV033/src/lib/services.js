import shared from './shared';
import { fullStory, group } from '../../../../../lib/utils';
import { loadProductData, addToCart } from '../../../../../lib/utils/avon';
import Lightbox from './components/Lightbox';
import VariantSelectorPLP from './components/VariantSelectorPLP';

const { ID, VARIATION } = shared;

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

/**
 * Load in variant data
 * @param {Number} productId
 */
export const getVariantData = productId => new Promise((resolve, reject) => {
  if (shared.variantsCache[productId]) {
    resolve(shared.variantsCache[productId]);
  } else {
    loadProductData([productId])
      .then((data) => {
        // Reduce variant groups to a single array then flatten for an array of all variants
        const variants = data[0].VariantGroups
          .reduce((acc, val) => acc.concat(val.Variants), [])
          .flat();

        // Cache response
        shared.variantsCache[productId] = variants;
        resolve(variants);
      })
      .catch(reject);
  }
});

/**
 * Add to cart
 * @param {Object} product
 * @param {Number} qty
 */
export const addProductToCart = (product, qty) => {
  if (product.SingleVariantSku) addToCart(product.SingleVariantSku, qty);
};

/**
 * Pull in variants and display them inside a lightbox
 * @param {Object} product Product scope object
 */
export const showVariants = (product) => {
  if (shared.variantsLoading) return false;
  shared.variantsLoading = true;
  const { Id } = product;

  getVariantData(Id)
    .then((variants) => {
      try {
        // Build content
        const $lightboxContent = $(`
          <div>
            <h3 style="text-align: center;">Choose a Shade</h3>
            <div id="${ID}_VariantSelectorContainer"></div>
          </div>
        `);
        const $VariantSelector = new VariantSelectorPLP(Id, variants, addProductToCart);
        $lightboxContent.find(`#${ID}_VariantSelectorContainer`).append($VariantSelector);

        // Add content to Lightbox component
        if (!shared.variantLightbox) {
          shared.variantLightbox = new Lightbox({
            content: $lightboxContent[0],
            closeOnClick: true,
          });
        } else {
          shared.variantLightbox.updateContent($lightboxContent[0]);
        }

        // Watch for a successful add to cart then close the lightbox
      } catch (err) {
        console.error(err);
      }
      shared.variantLightbox.open();
      shared.variantsLoading = false;
    })
    .catch((error) => {
      shared.variantsLoading = false;
      console.error(error);
    });
};

/**
 * Run this function to recalculate the correct heights for products
 * in the grid. The height will be set to the tallest on the same row
 * @param {jQuery} $products All products
 */
export const calculateProductHeights = ($products) => {
  const isPhone = $('body').hasClass('Layout_Phone');
  const columnCount = isPhone ? 2 : 5;
  const $productGroups = $(group($products, columnCount));

  $products.addClass(`${ID}_reset-height`);
  $productGroups.each((groupIndex, productGroup) => {
    const $productGroup = $(productGroup);
    let tallestDetailsHeight = 0;
    let tallesetNameHeight = 0;

    $productGroup.each((index, element) => {
      const $element = $(element);
      const $details = $element.find('.ProductDetails');
      const $name = $element.find('.ProductName');

      // Save details height
      if ($details.length) {
        const detailsHeight = $element.find('.ProductDetailsTop').outerHeight();
        const actionsHeight = $element.find('.ProductAction').outerHeight();
        const totalDetailsHeight = Math.round(detailsHeight + actionsHeight);
        if (totalDetailsHeight > tallestDetailsHeight) {
          tallestDetailsHeight = totalDetailsHeight;
        }
      }

      // Save name height
      if ($name.length) {
        const totalNameHeight = $name.outerHeight();
        if (totalNameHeight > tallesetNameHeight) {
          tallesetNameHeight = totalNameHeight;
        }
      }
    });

    // Set height
    $productGroup
      .find('.ProductDetails')
      .css({ minHeight: tallestDetailsHeight });

    $productGroup
      .find('.ProductName')
      .css({ minHeight: tallesetNameHeight });
  });
  $products.removeClass(`${ID}_reset-height`);
};
