import { scrollTo } from '../../../../../../lib/utils';
import { angularCompile } from '../../../../../../lib/utils/avon';
import shared from '../shared';


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
        <div class="${componentName}QtySelector">
          <div class="${componentName}quantityDiv">
            <div class="Icon">
              <div class="${componentName}QtyDecrease">
                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" class="Qty">
                  <g fill="none" fill-rule="evenodd">
                    <path stroke-linecap="square" stroke-width="2" d="M20 27.5h15"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div class="${componentName}quantity quantity-border Icon text-not-selectable">
              <span class="quantity-border-content ng-binding ${componentName}QtyValue">1</span>
            </div>
            <div class="Icon">
              <div class="${componentName}QtyIncrease">
               <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" class="Qty">
                    <g fill="none" fill-rule="evenodd">
                        <g stroke-linecap="square" stroke-width="2">
                            <path d="M20 27.5h14.242M27.5 20v14.242"></path>
                        </g>
                    </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="Button button-add-to-cart vi-btn vi-btn--primary ng-scope ${componentName}AddToCart" ng-click="addToCartClick()" ng-class="{'button-add-to-cart-disabled': !hasSelectedVariant()}">
          <div class="button-add-to-cart-content button-add-to-cart-text text-not-selectable"><svg-icon icon="basket_pdp" class="ng-isolate-scope"><!-- ngIf: Ready --><svg ng-if="Ready" class="" style=""><use xlink:href="#Svg_basket_pdp" ng-attr-xlink:href="{{TrustedSvgHref()}}"></use></svg><!-- end ngIf: Ready --></svg-icon> Add to bag</div>
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
      console.log(newValue, $qtyValue)

      $qtyValue.text(newValue > MAX_QTY ? MAX_QTY : newValue);
    };

    const decreaseQty = () => {
      const newValue = getQuantity() - 1;
      console.log(newValue, $qtyValue)
      $qtyValue.text(newValue < MIN_QTY ? MIN_QTY : newValue);
    };

    const addToCart = () => {
      scrollTo(0);
      addToCartScope.addToCartClick(getQuantity());
      events.send(`${ID}-${VARIATION}`, 'sticky-add-to-cart-clicked');
    };

    $addToCart.on('click', addToCart);
    $qtyIncrease.on('click', increaseQty);
    $qtyDecrease.on('click', decreaseQty);
  }

  /**
   * Get the current selected quantity
   * @returns {number}
   */
  getQuantity() {
    const { $component, componentName } = this;
    const $qtyValue = $component.find(`.${componentName}QtyValue`);
    return Number($qtyValue.text());
  }

  render() {
    const { ID, $ } = shared;

    const { $component } = this;
    const $ctas = $(`.${ID}_StickyCartHeader_ctas`);
    $ctas.empty().prepend($component);
  }
}
