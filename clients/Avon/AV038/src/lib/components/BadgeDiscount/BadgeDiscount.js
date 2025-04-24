import shared from '../../shared';
import { angularCompile } from '../../../../../../../lib/utils/avon';

/**
 * Build a discount badge for products on PLPs
 *
 * @class BadgeDiscount
 */
export default class BadgeDiscount {
  /**
   * @param {jQuery} $product Product element
   */
  constructor($product) {
    const { ID, $ } = shared;
    this.$product = $product;
    this.productScope = $product.scope();
    this.componentName = `${ID}_BadgeDiscount`;
    this.create = this.create.bind(this);
    this.render = this.render.bind(this);
    this.create();
    this.render();
    angularCompile(this.$component, $, this.productScope);
  }

  create() {
    const { componentName } = this;
    const $component = $(`
      <div 
      ng-show="!!product.SalePrice" 
      class="${componentName}" 
      ng-init="value = (((product.ListPrice - product.SalePrice) / product.ListPrice) * 100 | number:0)"
      ng-class="{
        '${componentName}--weight_1': value < 10,
        '${componentName}--weight_2': value >= 10 && value < 25,
        '${componentName}--weight_3': value >= 25 && value < 50,
        '${componentName}--weight_4': value >= 50
      }">
        <div class="${componentName}Text">{{value}}% OFF</div>
      </div>
    `);
    this.$component = $component;
  }

  render() {
    const { $product, $component } = this;
    const $pricesContainer = $product.find('.Prices');
    $pricesContainer.after($component);
  }
}
