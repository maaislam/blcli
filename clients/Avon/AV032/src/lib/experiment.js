/**
 * AV032 - Samples Shop: Samples Category Shop
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import StickyHeader from './components/StickyHeader';
import CategoryFilters from './components/CategoryFilters';
import Lightbox from './components/Lightbox';
import VariantSelectorPLP from './components/VariantSelectorPLP';
import { group, pollerLite } from '../../../../../lib/utils';
import {
  getTemplate,
  replaceTemplate,
  angularCompile,
  angularContextWrap,
  loadProductData,
} from '../../../../../lib/utils/avon';

export default () => {
  setup();

  const { ID } = shared;

  /**
   * Modify product list template
   * @returns {Promise}
   */
  const modifyProductListTemplate = () => new Promise((resolve, reject) => {
    const templateName = 'productListTemplate.html';
    const directiveName = 'product-list';
    const template = getTemplate(templateName);
    const $template = $('<div>').html(template);
    const $product = $template.find('.ProductListCell .ProductListItem');

    // Add product ID to DOM
    $product.attr('data-product-id', '{{::product.Id}}');

    // Add product type classes
    $product.attr('ng-class', `{"${ID}_hasVariants": !product.SingleVariantSku, "${ID}_isConditional": product.Conditional}`);

    // Make layout 3 columns
    $template
      .find('.ProductList')
      .removeClass('Columns_2')
      .addClass('Columns_3 ReadyToDisplay')
      .removeAttr('ng-class');

    // Move product badge to below image
    const $badge = $template.find('.product-badge');
    $badge.appendTo($badge.parent());

    // Filter out 3 for £1 from exclusive offers
    $template
      .find('.ExclusiveOffers')
      .attr('ng-if', '::(product.Availability==1 && (product.Promotions | filter: !{Id: 1207}).length && product.HasActiveVariant)')
      .find('.PromotionLink')
      .attr('ng-repeat', 'promotion in ::product.Promotions | filter: !{Id: 1207}');

    // Remove prices
    $template
      .find('.Prices')
      .remove();

    // Add 3 for £1 badge
    $template
      .find('.ProductDetailsTop')
      .prepend(`
        <div class="${ID}_offerBadge" ng-if="(product.Promotions | filter: {Id: 1207}).length">
          3 for £1
        </div>
      `);

    // Custom CTAs
    $template
      .find('.ProductAction')
      .html(`
        <productquantity quantity='Qty' quantitydefault="1" min="1"></productquantity>

        <div ng-if="::(product.Availability==1 && product.HasActiveVariant && product.SingleVariantSku)" class="AddToCart" ng-class="{'${ID}_AddToCart--success': (($parent.$parent.$parent.$parent.$parent.$parent.samplesInBasket | filter: {Id: product.Id}).length)}">
          <a class="Button" ng-click="addProductToCart(product, Qty)">
            <span ng-if="!($parent.$parent.$parent.$parent.$parent.$parent.samplesInBasket | filter: {Id: product.Id}).length">
              Add to bag (<span ng-bind="(($parent.$parent.$parent.$parent.$parent.$parent.totalSamplesQty + 1) % 3 === 0) ? 'FREE' : product.PriceFormatted"></span>)
            </span>
            
            <span ng-if="($parent.$parent.$parent.$parent.$parent.$parent.samplesInBasket | filter: {Id: product.Id}).length">
              Add another
            </span>
          </a>
        </div>

        <div ng-if="::(product.Availability==1 && product.HasActiveVariant && !product.SingleVariantSku && product.IsShadeVariant)" class="AddToCart" ng-class="{'${ID}_AddToCart--success': (($parent.$parent.$parent.$parent.$parent.$parent.samplesInBasket | filter: {Id: product.Id}).length)}">
          <a class="Button" ng-click="showVariants(product, addProductToCart)">
            <span ng-if="!($parent.$parent.$parent.$parent.$parent.$parent.samplesInBasket | filter: {Id: product.Id}).length">
              Add to bag (<span ng-bind="(($parent.$parent.$parent.$parent.$parent.$parent.totalSamplesQty + 1) % 3 === 0) ? 'FREE' : product.PriceFormatted"></span>)
            </span>
            
            <span ng-if="($parent.$parent.$parent.$parent.$parent.$parent.samplesInBasket | filter: {Id: product.Id}).length">
              Add another shade
            </span>
          </a>
        </div>

        <div ng-if="::(product.Availability==1 && product.HasActiveVariant && !product.SingleVariantSku && product.IsSizeVariant && !product.IsShadeVariant)" class="viewProduct">
          <a class="Button" ng-click="viewProduct(product)">
            <span>View Size Options</span>
          </a>
        </div>

        <div ng-if="::(product.Availability!=1 || !product.HasActiveVariant || (!product.SingleVariantSku && !product.IsShadeVariant && !product.IsSizeVariant))" class="viewProduct">
          <a class="Button" ng-click="viewProduct(product)">
            <span>View product</span>
          </a>
        </div>
      `);

    replaceTemplate(templateName, $template.html(), () => {
      // Re-compile directive
      const $section = $(directiveName);
      $section.empty();
      angularCompile($section, $, $section.scope(), () => {
        angularContextWrap(resolve);
      });
    });
  });

  /**
   * Run this function to recalculate the correct heights for products
   * in the grid. The height will be set to the tallest on the same row
   */
  const calculateProductHeights = () => {
    const isPhone = $('body').hasClass('Layout_Phone');
    const columnCount = isPhone ? 2 : $('.ProductList')[0].className.match(/Columns_(\d+)/)[1];
    const $products = $('.ProductListCell').filter((index, element) => $(element).css('display') !== 'none');
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

  /**
   * Store any variants in here to avoid making multiple AJAX requests
   * for the same product. Format so the keys are product IDs and the
   * properties are an array of variants. E.g.
    {
     '1120': [{}, {}]
    }
   */
  const variantsCache = {};

  let variantsLoading;

  /**
   * Keep a reference to the first lightbox we create so we can update
   * the content per request instead of creating multiple lightboxes
   */
  shared.variantLightbox = null;

  /**
   * Load in variant data
   * @param {Number} productId
   */
  const getVariantData = productId => new Promise((resolve, reject) => {
    if (variantsCache[productId]) {
      resolve(variantsCache[productId]);
    } else {
      loadProductData([productId])
        .then((data) => {
          // Reduce variant groups to a single array then flatten for an array of all variants
          const variants = data[0].VariantGroups
            .reduce((acc, val) => acc.concat(val.Variants), [])
            .flat();

          // Cache response
          variantsCache[productId] = variants;
          resolve(variants);
        })
        .catch(reject);
    }
  });

  /**
   * Pull in variants and display them inside a lightbox
   * @param {Object} product Product scope object
   * @param {Function} addProductToCart Add to cart function
   * must be passed down as there is no way for us to reference
   * the product scope from here.
   */
  const showVariants = (product, addProductToCart) => {
    if (variantsLoading) return false;
    variantsLoading = true;
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
        variantsLoading = false;
      })
      .catch((error) => {
        variantsLoading = false;
        console.error(error);
      });
  };

  /** Make changes */
  const init = () => {
    // Build new components
    const stickyHeader = new StickyHeader();
    const categoryFilters = new CategoryFilters();

    // Make changes to product template
    modifyProductListTemplate()
      .then(() => {
        // Wrap any scope changes in angularContextWrap to queue after current $digest cycle
        pollerLite([() => {
          try {
            return $('.ProductList').scope();
          } catch(e) {}
        }], () => {
          const productListScope = $('.ProductList').scope();
          productListScope.$apply(() => {
            /*
              Replace the equalizeColumnsForProductIndexRange function with a custom
              one that accounts for multiple columns. This is necessary as the stock
              function only accounts for 2 column layouts
            */
            productListScope.equalizeColumnsForProductIndexRange = calculateProductHeights;

            /**
             * Force equalizeColumns to run if product list changes on mobile
             * The site isn't set up to run this by default on mobile
             */
            const equalizeColumnsMobile = () => {
              if ($('body').hasClass('Layout_Phone')) productListScope.equalizeColumnsForProductIndexRange();
            };
            equalizeColumnsMobile();
            productListScope.$parent.$watch('ProductListUI.Products', equalizeColumnsMobile);

            /*
              Bind the showVariants function to scope. This has been referenced in the new
              product template to request variants if available instead of redirecting to PDP
            */
            productListScope.showVariants = showVariants;

            // Set top padding on body
            const setTopPadding = () => {
              $('body').css({ paddingTop: stickyHeader.$component.outerHeight() });
            };
            setTopPadding();

            // Re-calculate top padding on body when stickyHeader scope changes
            stickyHeader.scope.$watch('totalSamplesQty', () => {
              setTimeout(setTopPadding, 100);
            });

            // Add a title to page
            if(!document.querySelector(`h1.${shared.ID}-custom-title`)) {
              const main = document.querySelector('#MainContentWrapper main');
              if(main) {
                main.insertAdjacentHTML('beforebegin', `<h1 class="${shared.ID}-custom-title ng-binding">Sample Shop</h1>`);
              }
            }
          });
        });
      });
  };

  init();
};
