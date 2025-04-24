import { angularCompile } from '../../../../../../../lib/utils/avon';
import shared from '../../shared';
import { translate } from '../../services';

export default class PDPCtas {
  constructor() {
    const { ID, $ } = shared;
    this.$ = $;
    this.componentName = `${ID}_PDPCtas`;
    this.addToCartScope = $('.AddToCart').scope();

    // Check if it already exists to prevent duplication
    const componentAlreadyExists = !!$(`.${this.componentName}`).length;

    if (!componentAlreadyExists) {
      this.create = this.create.bind(this);
      this.bindEvents = this.bindEvents.bind(this);
      this.getQuantity = this.getQuantity.bind(this);
      this.render = this.render.bind(this);

      this.create();
      this.render();

      angularCompile(this.$component, $, this.addToCartScope, this.bindEvents);
    }
  }

  create() {
    const { $, componentName } = this;

    const $component = $(`
      <div class="${componentName}">
        <div class="${componentName}QtySelector" ng-if="hasActiveVariant()">
          <div class="quantityDiv">
            <div class="Icon">
              <div class="${componentName}QtyDecrease">
                <svg xmlns="http://www.w3.org/2000/svg" &nbsp;width="55" height="55" viewBox="0 0 55 55" class="Qty">
                  <g fill="none" fill-rule="evenodd">
                    <rect width="54" height="54" x=".5" y=".5" rx="4"></rect>
                    <path stroke-linecap="square" stroke-width="2" d="M20 27.5h15"></path>
                  </g>
                </svg>
              </div>
            </div>
            <input type="number" class="quantity Icon text-not-selectable ${componentName}QtyValue" value="1" />
            <div class="Icon">
              <div class="${componentName}QtyIncrease">
                <svg xmlns="http://www.w3.org/2000/svg" &nbsp;width="55" height="55" viewBox="0 0 55 55" class="Qty">
                  <g fill="none" fill-rule="evenodd">
                    <rect width="54" height="54" x=".5" y=".5" rx="4"></rect>
                    <g stroke-linecap="square" stroke-width="2">
                      <path d="M20 27.5h14.242M27.5 20v14.242"></path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="Button button-add-to-cart ${componentName}AddToCart" ng-if="hasActiveVariant()" ng-class="{'button-add-to-cart-disabled': !hasSelectedVariant()}">
          <div class="button-add-to-cart-content button-add-to-cart-text text-not-selectable">
            <svg-icon icon="basket_pdp"></svg-icon> ${translate('Add to bag')}
          </div>
        </div>

        <div class="${componentName}AddToWishlist" ng-if="product.CanAddToWishlist" ng-click="addedToWishlist ? removeFromWishlist() : addToWishlist()">
          <span ng-if="!addedToWishlist">${translate('Add to wishlist')}</span>
          <span ng-if="addedToWishlist">${translate('Remove from wishlist')}</span>
        </div>

        <div class="Button button-add-to-cart NotifyMeButton" ng-if="!hasActiveVariant() && !isConditional()" ng-click="notifyMe()">
          <div class="Icon">
            <span class="ButtonText">${translate('Notify Me')}</span>
          </div>
        </div>
      </div>
    `);

    this.$component = $component;
  }

  bindEvents() {
    const {
      $component,
      componentName,
      addToCartScope,
      getQuantity,
    } = this;
    const $addToCart = $component.find(`.${componentName}AddToCart`);
    const $qtyIncrease = $component.find(`.${componentName}QtyIncrease`);
    const $qtyDecrease = $component.find(`.${componentName}QtyDecrease`);
    const $qtyValue = $component.find(`.${componentName}QtyValue`);
    const MIN_QTY = 1;
    const MAX_QTY = 999;

    const increaseQty = () => {
      const newValue = getQuantity() + 1;
      $qtyValue.val(newValue > MAX_QTY ? MAX_QTY : newValue);
    };

    const decreaseQty = () => {
      const newValue = getQuantity() - 1;
      $qtyValue.val(newValue < MIN_QTY ? MIN_QTY : newValue);
    };

    const addToCart = () => {
      addToCartScope.addToCartClick(getQuantity());
    };

    $addToCart.on('click', addToCart);
    $qtyIncrease.on('click', increaseQty);
    $qtyDecrease.on('click', decreaseQty);

    // If the value is not a number, reset to 1
    $qtyValue.on('change', () => {
      const containsLetters = /.*[a-z].*/i.test($qtyValue.val());
      if (containsLetters) {
        $qtyValue.val(MIN_QTY);
      }
    });

    // Reset number to 1 if user types 0 or a negative number
    $qtyValue.on('focusout', () => {
      if ($qtyValue.val() < MIN_QTY) {
        $qtyValue.val(MIN_QTY);
      } else if ($qtyValue.val() > MAX_QTY) {
        $qtyValue.val(MAX_QTY);
      }
    });
  }

  /**
   * Get the current selected quantity
   * @returns {number}
   */
  getQuantity() {
    const { $component, componentName } = this;
    const $qtyValue = $component.find(`.${componentName}QtyValue`);
    return Number($qtyValue.val());
  }

  render() {
    const { $, $component } = this;
    const $ctas = $('.AddToButtons:first');

    // Move any conditional messages to outside the container as we
    // need to empty it to prevent CTAs from being shown as a user adds to bag
    const $conditionalMessages = $ctas.find('[ng-if="isConditional()"]');
    if ($conditionalMessages.length) {
      $ctas.after($conditionalMessages);
    }

    $ctas
      .find('.AddToButtons')
      .add($ctas.children('[class*=_PDPCtas]'))
      .remove();

    $ctas.prepend($component);
  }
}
