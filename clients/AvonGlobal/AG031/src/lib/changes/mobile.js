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
   * Add new header and remove old one
   */
  const editCartHeader = () => {
    const componentExists = !!$(`.${ID}_cartSummaryTop`).length;

    if (!componentExists) {
      const checkoutBtnMarkup = $('.Cart-ButtonsBottom .Button:not(".Alt"):last')[0].outerHTML;
      const $component = $(`
        <div class="${ID}_cartSummaryTop">
          <div class="${ID}_cartSummaryTopLeft">
            <div class="${ID}_cartTitle">
              <h2><span>${translate('Basket')}</span></h2>
              <div><span ng-bind="CartData.NumberOfItemsInCart"></span> <em>${translate('Items')}</em></div>
            </div>
          </div>
          <div class="${ID}_cartSummaryTopMiddle">
            <em><span ng-bind="(CartData.TotalPrice | currency)"></span></em>
          </div>
          <div class="${ID}_cartSummaryTopRight">
            ${checkoutBtnMarkup}
          </div>
        </div>
      `);

      // Render
      $('#CartPage ng-include').prepend($component);
      angularCompile($component, $, cartScope);

      // If anything banners exist in the header move it out of the container element
      pollerLite(['.CartHeader [class*="banner"]'], () => {
        const $bannersWrap = $(`<div class="${ID}_cartHeaderExtra"></div>`);
        const $banners = $('.CartHeader [class*="banner"]');
        $bannersWrap.insertAfter($component);
        $bannersWrap.append($banners);
      });

      // Hide old header
      const $cartHeader = $('.CartHeader');
      $cartHeader.hide();
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

    // Wrap variants in container
    $variants.wrapAll(`<div class="${ID}_productVariants"></div>`);

    // Move total price to bottom
    $product.append($totalPrice);

    // Move price to after title
    $header.after($price);

    // Wrap title and price in container
    $header.add($price).wrapAll(`<div class="${ID}_productTitleAndPrice"></div>`);

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
      $removeLink.closest(`.${ID}_links`).prepend($updateLink);
      angularCompile($updateLink, $, variantScope);
    });

    // Edit variants
    $variants.each((i, el) => {
      const $variant = $(el).find('.Cart-VariantItem');
      const $variantName = $variant.find('.Cart-VariantName');
      $variant.prepend($variantName);
    });

    // Remove price if product is free
    if (productScope.product.Price === 0) {
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

        <div class="Cart-SubTotal-Wrapper">
          <div class="Cart-SubTotalLabel">
            <span>${translate('Total')}</span>
          </div>
          <div class="Cart-SubTotal" ng-bind="(CartData.TotalPrice | currency)"></div>
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

      $cartSummary.prepend($component);
      angularCompile($component, $, cartScope);
    }
  };

  /**
   * From T09_New_Basket test
   * Make coupon collapsable
   */
  const toggleCartCoupon = () => {
    pollerLite(['.Cart-Coupon .code'], () => {
      if (!document.querySelector('.mm-t09-promocode')) {
        const cartCoupongWrapper = document.querySelector('.Cart-Coupon');
        const cartHaveCouponInput = document.querySelector('.Cart-Coupon .Cart-HaveCoupon > input');
        if (cartCoupongWrapper && cartHaveCouponInput && !cartHaveCouponInput.value) {
          cartCoupongWrapper.insertAdjacentHTML('afterbegin', `
            <div class="mm-t09-promocode">
              <span>+</span> &nbsp;${translate('Add Voucher Code')}
            </div>
          `);
          cartCoupongWrapper.querySelector('.code').classList.add('mm-t09-hide');
        }
        const promocodeEl = cartCoupongWrapper.querySelector('.mm-t09-promocode');
        if (promocodeEl) {
          promocodeEl.addEventListener('click', () => {
            cartCoupongWrapper.querySelector('.code').classList.remove('mm-t09-hide');
            cartCoupongWrapper.style.backgroundColor = 'transparent';
            promocodeEl.parentNode.removeChild(promocodeEl);
          });
        }
      }
    });

    pollerLite([() => !!cartScope.CartData.CouponCode], () => {
      const promocodeEl = document.querySelector('.mm-t09-promocode');
      const cartCoupongWrapper = document.querySelector('.Cart-Coupon');
      if (cartCoupongWrapper) {
        cartCoupongWrapper.querySelector('.code').classList.remove('mm-t09-hide');
        cartCoupongWrapper.style.backgroundColor = 'transparent';
      }
      if (promocodeEl) {
        promocodeEl.parentNode.removeChild(promocodeEl);
      }
    }, {
      timeout: 0,
      multiplier: 0,
      wait: 50,
    });
  };

  const init = () => {
    editCartHeader();
    replaceAllImagesToBiggerOne();
    updateTotalPrices();
    editProducts();
    toggleCartCoupon();
  };

  init();
};
