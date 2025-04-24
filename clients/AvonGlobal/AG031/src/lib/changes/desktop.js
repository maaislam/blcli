import shared from '../shared';
import { angularCompile } from '../../../../../../lib/utils/avon';
import { pollerLite } from '../../../../../../lib/utils';
import { translate } from '../services';

export default () => {
  const {
    ID,
    $,
    rootScope,
    cartScope,
  } = shared;

  /**
   * Add continue shopping button above breadcrumbs
   */
  const addContinueShoppingButton = () => {
    const componentExists = !!$(`.${ID}_continueShopping`).length;

    if (!componentExists) {
      const $component = $(`
        <a class="Button Alt ${ID}_continueShopping" href="/" data_action="continueshopping" data_nav="cart">
          <svg-icon icon="arrow-left-lrg"></svg-icon>
         <span>${translate('Continue Shopping')}</span>
        </a>
      `);
      const $container = $('#CartPage');
      $container.prepend($component);
      angularCompile($component, $, rootScope);
    }
  };

  /**
   * Add item count and total price to top
   */
  const editCartHeader = () => {
    const componentExists = !!$(`.${ID}_cartSummaryTop`).length;

    if (!componentExists) {
      const $component = $(`
        <div class="CartHeader-middle ${ID}_cartSummaryTop">
          <ul>
            <li><em>${translate('Items')}:</em> <span ng-bind="CartData.NumberOfItemsInCart"></span></li>
            <li><em>${translate('Total Price')}:</em> <span ng-bind="(CartData.TotalPrice | currency)"></span></li>
          </ul>
        </div>
      `);
      const $cartHeaderLeft = $('.CartHeader-left');
      $cartHeaderLeft.after($component);
      angularCompile($component, $, cartScope);

      // Change title text
      const $title = $cartHeaderLeft.find('h2 > span:first');
      $title.text(translate('Basket'));

      // If AV006 is running move header to above offers
      pollerLite(['.AV006_BasketOffers'], () => {
        const $AV006Offers = $('.AV006_BasketOffers');
        const $cartHeader = $('.CartHeader');
        $AV006Offers.before($cartHeader);
      });

      // If banners exist in the header move them out of the container element
      pollerLite(['.CartHeader [class*="banner"]'], () => {
        const $cartHeader = $('.CartHeader');
        const $banners = $('.CartHeader [class*="banner"]');
        const $bannersWrap = $(`<div class="${ID}_cartHeaderExtra"></div>`);
        $bannersWrap.insertAfter($cartHeader);
        $bannersWrap.append($banners);
      });
    }
  };

  /**
   * Changes to the product elements
   * @param {Number} index
   * @param {HTMLElement} element
   */
  const productChanges = (index, element) => {
    const $product = $(element);
    const $header = $product.find('.Cart-ProductName');
    const $price = $product.find('.Cart-ProductPrice');
    const $totalPrice = $product.find('.Cart-ProductTotalPrice');
    const $variants = $product.find('[ng-repeat="variant in product.Variants"]');
    const $removeLinks = $product.find('.Cart-ProductRemove');
    const productScope = $product.scope();

    $product.addClass(`${ID}_product--modified`);

    // Move header to top
    $product.prepend($header);

    // Move variants to before price
    $price.before($variants);

    // Wrap variants in container
    $variants.wrapAll(`<div class="${ID}_productVariants"></div>`);

    // Move total price to top
    $header.after($totalPrice);

    // Move price to end
    $product.append($price);

    // Edit action links
    $removeLinks.each((i, el) => {
      const $removeLink = $(el);
      const variantScope = $removeLink.scope();

      // Remove x from remove link
      const removeText = $removeLink.find('span').text();
      $removeLink.children('span').text(removeText.replace('x ', ''));

      // Wrap remove link in container and add update link
      const $linksContainer = $(`<div class="${ID}_links"></div>`);
      const $updateLink = $(`<div class="${ID}_updateLink" ng-click="UpdateCart(0)" ng-show="variant.QuantityChanged || product.QuantityChanged">${translate('Update')}</div>`);
      $removeLink.wrapAll($linksContainer);

      // Add update link
      $removeLink.closest(`.${ID}_links`).append($updateLink);
      angularCompile($updateLink, $, variantScope);
    });

    // Add product price to each variant row
    $variants.each((i, el) => {
      const $variant = $(el).find('.Cart-VariantItem');
      const variantScope = $variants.scope();
      const $priceClone = $price.clone();
      $priceClone.attr('ng-show', 'variant.VariantType !== VariantType.None && variant.VariantName !== null && variant.VariantFsc !== null');
      $variant.after($priceClone);
      angularCompile($priceClone, $, variantScope);
    });

    // Remove price if product is free
    if (productScope.product.Price === 0) {
      $price.remove();
    }

    // Remove subtotal if variants exist
    const $visibleVariants = $variants.filter(($all, variant) => !$(variant).find('.Cart-VariantItem').hasClass('ng-hide'));
    const hasVariants = !!$visibleVariants.length;
    if (hasVariants) {
      $price.remove();
    }

    // Add savings to each product
    if (productScope.product.Savings) {
      const $priceWrapper = $product.find('.Cart-ProductPriceWrapper');
      const $savings = $(`
        <div class="${ID}_productSavings" ng-show="HasProductSavings(product)">
          ${translate('You have saved')} <span ng-bind="(product.Savings | currency)"></span> (<span ng-bind="(((product.Savings / product.RegularPrice).toFixed(2) * 10 * 10).toFixed(0))"></span>%)
        </div>
      `);
      $priceWrapper.append($savings);
      angularCompile($savings, $, productScope);
    }
  };

  /**
   * Edit product markup
   */
  const editProducts = () => {
    const componentExists = !!$(`.${ID}_product--modified`).length;

    if (!componentExists) {
      const $products = $('.Cart-Product');
      $products.each(productChanges);
    }
  };

  /**
   * Move position of offers
   */
  const movePromoInformation = () => {
    pollerLite(['#CartPage .Cart_Promotion'], () => {
      const $offers = $('#CartPage .Cart_Promotion');
      const $banners = $(`.${ID}_cartHeaderExtra`);
      const $before = $banners.length ? $banners : $('.CartHeader');
      if ($before.length) {
        $before.after($offers);
      }
    });
  };

  /**
   * From T09_New_Basket test
   * Changes size of all product images
   */
  const replaceAllImagesToBiggerOne = () => {
    const images = Array.prototype.slice.call(document.querySelectorAll('.Cart-list-product-image'));
    if (images) {
      images.forEach((image) => {
        image.src = image.src.replace('60x60', '613x613');
      });
    }
  };

  /**
   * From T09_New_Basket test
   * Add more info to the totals
   */
  const updateTotalPrices = () => {
    const componentExists = !!$('.mm-t09-SubTotal-Wrapper').length;

    if (!componentExists) {
      const $component = $(`
        <div>
          <div class="mm-t09-SubTotal-Wrapper">
            <div>
              <span>${translate('Subtotal')} (<span ng-bind="CartData.NumberOfItemsInCart"></span>)</span>
            </div>
            <div class="${ID}_Subtotal">
              <span></span>
            </div>
          </div>
          
          <div class="mm-t09-Savings-Wrapper">
            <div>
              <span>${translate('Discount')}</span>
            </div>
            <div class="${ID}_Savings">
              -<span></span>
            </div>
          </div>
        </div>
      `);

      const $subtotalWrap = $component.find('.mm-t09-SubTotal-Wrapper');
      const $subtotalEl = $subtotalWrap.find(`.${ID}_Subtotal span`);
      const $savingsWrap = $component.find('.mm-t09-Savings-Wrapper');
      const $savingsEl = $savingsWrap.find(`.${ID}_Savings span`);

      // Render
      const $cartSummary = $('.Cart-Summary');
      $cartSummary.prepend($component);

      let savings = 0;
      let subtotal = 0;

      /**
       * @returns {Number}
       */
      const getProductSavings = () => {
        const campaigns = cartScope.CartData.Campaigns;
        return campaigns.reduce((savingsTotal, campaign) => savingsTotal + campaign.Savings, 0);
      };

      /**
       * @returns {Number}
       */
      const getSubtotal = () => {
        const fullPrice = cartScope.CartData.RegularPrice;
        return fullPrice + savings;
      };

      /**
       * Update total product savings
       * @param {Number|String} value
       */
      const updateProductSavings = (value) => {
        // Render
        $savingsEl.attr('ng-bind', `(${value.toString()} | currency)`);
      };

      /**
       * Update subtotal
       * @param {Number|String} value
       */
      const updateSubtotal = (value) => {
        $subtotalEl.attr('ng-bind', `(${value.toString()} | currency)`);
      };

      const updateValues = () => {
        savings = getProductSavings();
        subtotal = getSubtotal();
        updateProductSavings(savings);
        updateSubtotal(subtotal);
        angularCompile($component, $, cartScope);
      };

      updateValues();

      // Watch for changes to the basket products
      // If anything changes, recalculate the savings
      cartScope.$watch('CartData.Campaigns', updateValues);

      // Change total text
      $('.Cart-SubTotalLabel > span').text(`${translate('Total Price')}:`);
    }
  };

  const init = () => {
    addContinueShoppingButton();
    editCartHeader();
    replaceAllImagesToBiggerOne();
    movePromoInformation();
    updateTotalPrices();
    editProducts();
  };

  init();
};
