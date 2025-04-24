import shared from '../../shared';
import { angularCompile, loadProductData } from '../../../../../../../lib/utils/avon';
import { events, pollerLite } from '../../../../../../../lib/utils';
import { translate } from '../../services';

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

    const extraHtml = `
      ${MinibagButtons && MinibagButtons[0] ? `<h3 style="margin-top: 1.5rem;">Продолжить покупки:</h3>` : ''}

      ${MinibagButtons && MinibagButtons[0] ? `
        <a href="${MinibagButtons[0].Url}" class="${componentName}_subtle">
          <p>${MinibagButtons[0].Text}</p>
        </a>`
      :
        ''
      }

      ${MinibagButtons && MinibagButtons[1] ? `
        <a href="${MinibagButtons[1].Url}" class="${componentName}_subtle">
          <p>${MinibagButtons[1].Text}</p>
        </a>` : ''
      }
    `;

    const $component = $(`
      <div class="${componentName}">
        <div class="MiniCartWithItems ng-scope">
          <div class="${componentName}_close" ng-click="CloseMiniCart()">×</div>

          <h3>${translate('Last product added')}:</h3>

          <div class="${componentName}_products">
            <div class="${componentName}_product">
              <div class="${componentName}_productImage">
                <img src="${rootScope.Cdn.ProductImageMedium(lastProductData.ProfileNumber, 1)}" />
              </div>
              <div class="${componentName}_productDetails">
                <div class="${componentName}_productName">
                  <a href="${window.location.origin}/tovar/${this.lastProductData.Id}/${this.lastProductData.Slug}">
                    <p>${lastProductData.Name}</p>
                  </a>
                </div>
                <div class="${componentName}_productPrice">
                  <p class="${componentName}_pink">${lastProductData.Price.toFixed(0)}${this.getCurrencySymbol()}</p>
                </div>

                <div class="${componentName}_productQty">
                <p>${translate('Quantity')}: ${lastProductData.Quantity}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="AG049a__divider" style="height: 1px; background: #CCCCCC;"></div>

          <div class="${componentName}_summary">
            <p><em>${translate('Number in basket')}:</em> <em class="${componentName}_pink">${cartSummary.NumberItemsInCart}</em></p>
            <p>${translate('Sub-total')}: <em class="${componentName}_pink">${cartSummary.SubTotalPrice.toFixed(0)}${this.getCurrencySymbol()}</em></p>
          </div>

          <a href="/korzina" class="${componentName}_cta">
            <p>${translate('View Bag')}</p>
          </a>

          ${ (shared.VARIATION != 2 && this.shouldShowExtraHtml) ? extraHtml : ''}
        </div>
      </div>
    `);

    const $overlay = $(`<div class="${componentName}_overlay ng-scope ng-hide" ng-show="BasketUI.MiniCartVisible" ng-click="CloseMiniCart()"></div>`);

    this.$component = $component;
    this.$overlay = $overlay;

    const showSaving = (pData) => {
      const divider = document.querySelector('.AG049a__divider');
      if(divider && (pData.ListPrice != pData.SalePrice && pData.SalePrice > 0)) {
        const markup = `
          <div class="AG052a__banner">
            <p class="AG052a__banner__text">Вы экономите ${pData.ListPrice - pData.SalePrice} руб.</p>
          </div>
        `;
        divider.insertAdjacentHTML('afterend', markup);

        divider.parentNode.removeChild(divider);
      }
    };

    if(this.pData) {
      showSaving(pData[0]);
    } else {
      loadProductData([lastProductData.Id]).then((pData) => {
        showSaving(pData[0]);
      });
    }


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
      default: ' руб.',
      RU: ' руб.',
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
