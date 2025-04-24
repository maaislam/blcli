import shared from '../../shared';
import { angularCompile } from '../../../../../../../lib/utils/avon';

export default class freeDeliveryTracker {
  constructor() {
    const { ID, $ } = shared;

    this.ID = ID;
    this.$ = shared.$;
    this.freeDeliveryThreshold = 15;
    this.componentName = `${ID}_FreeDeliveryTracker`;
    this.cartScope = $('[ng-controller="CartController"]').scope();

    this.create = this.create.bind(this);
    this.render = this.render.bind(this);

    this.create();
    this.render();

    angularCompile(this.$component, $, this.cartScope);
  }

  /**
   * Create the component
   * @returns {jQuery}
   */
  create() {
    const {
      $,
      componentName,
      freeDeliveryThreshold,
    } = this;

    const $component = $(`
      <div class="${componentName}Container">
        <div class="${componentName}">
          <span class="${componentName}Icon"></span>
          <p ng-show="CartData.SubTotal < ${freeDeliveryThreshold}">Spend <span ng-bind="((${freeDeliveryThreshold} - CartData.SubTotal) | currency)"></span> more and get <em>FREE</em> delivery!</p>
          <p ng-show="CartData.SubTotal >= ${freeDeliveryThreshold}">Congratulations, you've qualified for <em>FREE</em> delivery!</p>
        </div>
      </div>
    `);

    this.$component = $component;

    return $component;
  }

  /**
   * Render component
   */
  render() {
    const { $component } = this;

    // '.Cart-Footer > .Cart-ButtonsBottom' selector only exists on mobile
    // '.Cart-Footer > .Cart-BottomActions' selector only exists on tablet and desktop
    $('.Cart-Footer > .Cart-ButtonsBottom, .Cart-Footer > .Cart-BottomActions').before($component);
  }
}
