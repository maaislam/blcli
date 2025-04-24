/**
 * AZ003 - Adding products with shades from PLPs
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, translate } from './services';
import shared from './shared';
import VariantSelectorPLP from './components/VariantSelectorPLP/VariantSelectorPLP';
import {
  getTemplate,
  replaceTemplate,
  angularCompile,
  angularContextWrap,
  loadProductData,
} from '../../../../../lib/utils/avon';
import increasinglyModalPr from './helpers';
import { observer, group } from '../../../../../lib/utils';

export default () => {
  setup();
  const { ID, rootScope } = shared;
  const $productList = $('product-list');

  /**
   * Add product IDs to the DOM by modifying the product template
   * This way we can avoid making lots of calls to $(product).scope() to
   * retrieve each ID
   * @returns {Promise}
   */
  const addProductIdsToDom = () => new Promise((resolve, reject) => {
    const templateName = 'productListTemplate.html';
    const directiveName = 'product-list';
    const template = getTemplate(templateName);
    const $template = $('<div>').html(template);
    const $product = $template.find('.ProductListCell .ProductListItem');

    // Add product ID
    $product.prepend('<span data-product-id="{{::product.Id}}" style="display: none;" ></span>');

    // Move qty input out of ng-if statement so it's available for all products
    const $productActions = $product.find('.ProductAction');
    const $qty = $product.find('productquantity');
    $productActions.prepend($qty);

    // Add product type classes
    $product.attr('ng-class', `{"${ID}_hasVariants": !product.SingleVariantSku, "${ID}_isConditional": product.Conditional}`);

    replaceTemplate(templateName, $template.html(), () => {
      // Re-compile directive
      const $section = $(directiveName);
      $section.empty();
      angularCompile($section, $, $section.scope());
      angularContextWrap(resolve);
    });
  });

  /**
   * Change product item markup
   */
  const changeProducts = () => {
    const $products = $('.ProductListCell');
    $products.each((index, element) => {
      const $container = $(element);
      const $product = $container.find('.ProductListItem');

      if (!$product.hasClass(`${ID}_product-modified`)) {
        $product.addClass(`${ID}_product-modified`);

        // Move CTAs to new row
        const $ctas = $product.find('.ProductAction .Button');
        $ctas.appendTo($product);

        // Move Reviews to below price
        const $price = $product.find('.Prices');
        const $stars = $product.find('.Rating');
        $stars.insertAfter($price);

        // Move product name to top
        const $productName = $product.find('.ProductName');
        $productName.prependTo($product);

        // Change Qty selector
        const newDecreaseQty = `
          <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" class="Qty">
            <g fill="none" fill-rule="evenodd">
              <rect width="54" height="54" x=".5" y=".5" rx="4" ></rect>
              <path stroke-linecap="square" stroke-width="2" d="M20 27.5h15"></path>
            </g>
          </svg>
        `;

        const newIncreaseQty = `
          <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" class="Qty">
            <g fill="none" fill-rule="evenodd">
              <rect width="54" height="54" x=".5" y=".5" rx="4"></rect>
              <g stroke-linecap="square" stroke-width="2">
                <path d="M20 27.5h14.242M27.5 20v14.242"></path>
              </g>
            </g>
          </svg>
        `;

        $product.find('.QtyDown').html(newDecreaseQty);
        $product.find('.QtyUp').html(newIncreaseQty);

        // Move labels to top
        const $labels = $product.find('.product-options, .product-badge');
        if ($labels.length) {
          const $labelsContainer = $(`<div class="${ID}_labels"></div>`);
          $product.prepend($labelsContainer);
          $labelsContainer.append($labels);
        }
      }
    });
  };

  /**
   * Run this function to recalculate the correct heights for products
   * in the grid. The height will be set to the tallest on the same row
   */
  const calculateProductHeights = () => {
    const COL_COUNT = $('body').hasClass('AZ002') ? 3 : 2;
    const $products = $('.ProductListCell').filter((index, element) => $(element).css('display') !== 'none');
    const $productGroups = $(group($products, COL_COUNT));

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

  /**
   * Return an array of all product IDs on the page
   * @returns {Array.<String>}
   */
  const getPageProductIds = () => $('[data-product-id]')
    .map((index, item) => $(item).attr('data-product-id')).toArray();

  /**
   * Get an array of promises for request data
   * @returns {Array.<Promise>}
   */
  const getProductDataPromises = () => getPageProductIds()
    .map(productId => new Promise((resolve, reject) => {
      loadProductData([productId])
        .then(data => {
          resolve(data[0]);
        })
        .catch(() => {
          console.error(`Failed to get variant data for ${productId}`);
        });
    }));

  /**
   * Get all the product data including shade variants for every
   * product on the page
   * @returns {Object}
   */
  const getPageProductData = () => new Promise((resolve, reject) => {
    const productDataPromises = getProductDataPromises();
    Promise
      .all(productDataPromises)
      .then((data) => {
        /*
         * Data is not returned in order so convert it into an object
         * where the keys are the product IDs for easier access
         */
        const formattedData = [...data].reduce(
          (allProductDataObj, productData) => ({ ...allProductDataObj, [productData.Id]: productData }),
          {},
        );

        resolve(formattedData);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  /**
   * Add a variant selector to any eligble product
   * on the page
   */
  const addVariantSelectorsToPage = () => {
    getPageProductData().then((pageProductData) => {
      const $products = $productList.find('.ProductListItem');
      $products.each((index, element) => {
        const $product = $(element);
        if ($product.hasClass(`${ID}_variants-added`)) return false;

        const productId = $product
          .find('[data-product-id]')
          .attr('data-product-id');
        const productData = pageProductData[productId];
        if (
          productData
          && productData.VariantGroups.length
          && productData.CanAddToCart
          && !productData.IsConditional
          && !productData.SingleVariantSku
        ) {
          /*
           * VariantSelectorPLP expects an array of all variants, not variant groups
           * Reduce variant groups to a single array then flatten for an array of all variants
           */
          const variants = productData.VariantGroups
            .reduce((acc, val) => acc.concat(val.Variants), [])
            .flat();

          try {
            $product.addClass(`${ID}_variants-added`);
            new VariantSelectorPLP($product, variants);
          } catch (err) {
            console.error(err);
          }
        }
      });
    });
  };

  /** Make all changes */
  const init = () => {
    changeProducts();
    calculateProductHeights();
    $(document).ready(() => {
      calculateProductHeights();
      setTimeout(calculateProductHeights, 1000);
    });
    addVariantSelectorsToPage();

    [].forEach.call(document.querySelectorAll('[ng-click^="addProductToCart"]'), (btn) => {
      if(!btn.classList.contains('xlistenered')) {
        btn.classList.add('xlistenered');

        btn.addEventListener('click', () => {
          increasinglyModalPr(btn.parentNode.parentNode);
        });
      }
    });
  };

  addProductIdsToDom()
    .then(init);

  // Re-run functions on changes to the product list
  observer.connect($productList.children('.ProductList'), init, {
    config: { attributes: false, subtree: false, childList: true },
    throttle: 0,
  });
};
