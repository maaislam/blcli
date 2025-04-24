import shared from '../../shared';
import { angularCompile } from '../../../../../../../lib/utils/avon';
import { events } from '../../../../../../../lib/utils';

export default class Minibag {
  constructor() {
    const { ID, $ } = shared;

    this.ID = ID;
    this.$ = shared.$;
    this.rootScope = shared.rootScope;
    this.cartSummary = this.rootScope.Session.CartSummary;
    this.lastProductData = this.cartSummary.LastProductChanged;
    this.freeDeliveryThreshold = 20;
    this.componentName = `${ID}_Minibag`;
    this.$miniCart = $('#Basket #MiniCart');
    this.cartScope = this.$miniCart.scope();
    this.closeMiniCart = this.cartScope.CloseMiniCart;

    this.create = this.create.bind(this);
    this.getPromotions = this.getPromotions.bind(this);
    this.getCurrencySymbol = this.getCurrencySymbol.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.render = this.render.bind(this);

    const hasProducts = this.cartSummary.NumberItemsInCart;
    if (hasProducts) {
      this.create();
      this.bindEvents();
      this.render();

      // Run digest cycle on miniCart to bind new elements
      angularCompile(this.$miniCart, $, this.cartScope);
      angularCompile(this.$overlay, $, this.cartScope);
    }
  }

  /**
   * Create the component
   * @returns {jQuery}
   */
  create() {
    const {
      $,
      rootScope,
      componentName,
      cartSummary,
      lastProductData,
      freeDeliveryThreshold,
      getPromotions,
      getCurrencySymbol,
    } = this;

    const promotions = getPromotions();
    const currencySymbol = getCurrencySymbol();
    const $component = $(`
      <div class="${componentName}">
        <div class="MiniCartWithItems ng-scope">
          <div class="${componentName}_close" ng-click="CloseMiniCart()">×</div>

          <h3>Last Item Added:</h3>

          <div class="${componentName}_products">
            <div class="${componentName}_product">
              <div class="${componentName}_productImage">
                <img src="${rootScope.Cdn.ProductImageMedium(lastProductData.ProfileNumber, 1)}" />
              </div>
              <div class="${componentName}_productDetails">
                <div class="${componentName}_productName">
                  <a href="${window.location.origin}/product/${this.lastProductData.Id}/${this.lastProductData.Slug}">
                    <p>${lastProductData.Name}</p>
                  </a>
                </div>
                <div class="${componentName}_productPrice">
                  <p class="${componentName}_pink">${currencySymbol}${lastProductData.Price.toFixed(2)}</p>
                </div>
                <div class="${componentName}_productQty">
                  <p>Quantity: ${lastProductData.Quantity}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="${componentName}_delivery">
            <p>
              ${freeDeliveryThreshold - cartSummary.SubTotalPrice > 0 ? `
                Spend ${currencySymbol}${(freeDeliveryThreshold - cartSummary.SubTotalPrice).toFixed(2)} more for Free Delivery!
              ` : `
                You have qualified for free delivery!
              `}
            </p>
          </div>

          <div class="${componentName}_summary">
            <p><em>Shopping Bag:</em> <em class="${componentName}_pink">${cartSummary.NumberItemsInCart}</em> items</p>
            <p>Subtotal: <em class="${componentName}_pink">${currencySymbol}${cartSummary.SubTotalPrice.toFixed(2)}</em></p>
          </div>

          <a href="/cart" class="${componentName}_cta">
            <p>View Bag</p>
          </a>

          ${promotions.length ? `
            <div class="${componentName}_promotions" ng-if="Qualified.length > 0 || PreviousQualified.length">
              <p>You have <em>an offer available</em> in your bag!<br />Click <em>View Bag</em> to see more</p>
            </div>
          ` : ''}
        </div>
      </div>
    `);

    const $overlay = $(`<div class="${componentName}_overlay ng-scope ng-hide" ng-show="BasketUI.MiniCartVisible" ng-click="CloseMiniCart()"></div>`);

    this.$component = $component;
    this.$overlay = $overlay;

    return $component;
  }

  /**
   * Get the available promotions
   * @returns {Array.<Object>}
   */
  getPromotions() {
    const { cartSummary } = this;
    return cartSummary.Qualified;
  }

  /**
   * Get the currency symbol based on the current store
   * @returns {string}
   */
  getCurrencySymbol() {
    const { rootScope } = this;
    const symbols = {
      GB: '£',
      default: '',
    };

    return symbols[rootScope.ShopContext.Market] || symbols.default;
  }

  /**
   * Bind event handlers
   */
  bindEvents() {
    const { ID, componentName, $component } = this;

    // Event tracking
    const $cta = $component.find(`.${componentName}_cta`);
    $cta.click(() => {
      events.send(ID, 'Click', 'View Bag');
    });
  }

  /**
   * Render component
   */
  render() {
    const {
      $,
      componentName,
      $component,
      $overlay,
      $miniCart,
    } = this;

    /**
     * Removes any existing components to prevent duplication
     */
    const removeExistingComponents = () => {
      const $existingOverlay = $(`.${componentName}_overlay`);
      const $existingComponent = $(`.${componentName}`);

      if ($existingOverlay.length) {
        $existingOverlay.remove();
      }

      if ($existingComponent.length) {
        $existingComponent.remove();
      }
    };

    removeExistingComponents();
    $miniCart.empty().append($component);
    $miniCart.before($overlay);
  }
}
