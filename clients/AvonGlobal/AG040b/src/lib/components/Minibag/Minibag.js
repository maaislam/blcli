import shared from '../../shared';
import { angularCompile } from '../../../../../../../lib/utils/avon';
import { events } from '../../../../../../../lib/utils';

export default class Minibag {
  constructor(shouldShowExtraHtml) {
    const { ID, $, VARIATION } = shared;

    this.shouldShowExtraHtml = !!shouldShowExtraHtml;

    this.ID = ID;
    this.VARIATION = VARIATION;
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
    } = this;

    // Minibag category buttons.
    let MinibagButtons = localStorage.getItem('minibag-categories');
    if (MinibagButtons) MinibagButtons = JSON.parse(MinibagButtons);

    const $component = $(`
      <div class="${componentName}">
        <div class="MiniCartWithItems ng-scope">
          <div class="${componentName}_close" ng-click="CloseMiniCart()">×</div>

          <h3>Last product added:</h3>

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
                  <p class="${componentName}_pink">${this.getCurrencySymbol()}${lastProductData.Price.toFixed(2).toString().replace(".", ",")}</p>
                </div>

                <div class="${componentName}_productQty">
                <p>Quantity: ${lastProductData.Quantity}</p>
                </div>
              </div>
            </div>
          </div>

          <div style="height: 1px; background: #CCCCCC;"></div>

          <div class="${componentName}_summary">
            <p><em>Shopping Bag:</em> <em class="${componentName}_pink">${cartSummary.NumberItemsInCart}</em> ${cartSummary.NumberItemsInCart > 1 ? 'items' : 'item'}</p>
            <p>Sub-total: <em class="${componentName}_pink">${this.getCurrencySymbol()}${cartSummary.SubTotalPrice.toFixed(2).toString().replace(".", ",")}</em></p>
          </div>

          <a href="/cart" class="${componentName}_cta">
            <p>View Bag</p>
          </a>

          ${this.shouldShowExtraHtml ? `
            ${MinibagButtons && MinibagButtons[0] ? `
              <h3 style="margin-top: 1.5rem;">Continue Shopping:</h3>
              <a href="${MinibagButtons[0].Url}" class="${componentName}_subtle">
                <p>${MinibagButtons[0].Text}</p>
              </a>`
            :
              ''
            }

            ${MinibagButtons && MinibagButtons[1] ? `
              <a href="${MinibagButtons[1].Url}" class="${componentName}_subtle">
                <p>${MinibagButtons[1].Text}</p>
              </a>`
          :
          ''
            }
            ` : ''
          }
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
      default: 'R',
    };

    return symbols[rootScope.ShopContext.Market] || symbols.default;
  }

  /**
   * Bind event handlers
   */
  bindEvents() {
    const { ID, VARIATION, componentName, $component } = this;

    // Event tracking
    const $cta = $component.find(`.${componentName}_subtle`);
    $cta.click(() => {
      events.send(`${ID}-${VARIATION}`, 'Click', 'Category Page');
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
