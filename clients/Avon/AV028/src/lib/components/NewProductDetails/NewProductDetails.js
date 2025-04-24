import shared from '../../shared';
import { angularCompile } from '../../../../../../../lib/utils/avon';
import { translate } from '../../services';
import { pollerLite } from '../../../../../../../lib/utils';

export default class {
  /**
   * @param {Object<String>} savingType 'total' or 'percentage'
   */
  constructor({ savingType }) {
    const {
      $,
      ID,
      isNewPDP,
    } = shared;

    this.isNewPDP = isNewPDP;
    this.saving = savingType || 'total'; // Set to 'percentage' or 'total'
    this.$ = $;
    this.ID = ID;
    this.productDetailScope = $('.ProductDetail').scope();
    this.productInfo = this.productDetailScope.Controller.ViewModel.Product;
    this.originalPrice = this.productInfo.ListPriceFormatted;
    this.salePrice = this.productInfo.SalePriceFormatted;

    // Bind scope
    this.create.bind(this.create);
    this.addLegalInfo.bind(this.addLegalInfo);
    this.bindEvents.bind(this.bindEvents);
    this.render.bind(this.render);

    this.create();
    this.bindEvents();
    this.render();
    angularCompile(this.$component, $, this.productDetailScope, () => {
      this.addLegalInfo();
    });
  }

  create() {
    const { ID, saving } = this;

    const $component = $(`
      <div class="${ID}_productDetails">
        <div class="${ID}_productDetailsLeft">
          <div ng-show="!!Controller.ViewModel.Product.SalePriceFormatted">
            <p class="${ID}_offerText">${translate('Limited Offer')}</p>
          </div>
          <div class="${ID}_price">
            <div class="${ID}_salePrice" ng-class="{ ${ID}_actualPrice: !!Controller.ViewModel.Product.SalePriceFormatted }" ng-bind="Controller.ViewModel.Product.SalePriceFormatted"></div>
            <div class="${ID}_listPrice" ng-class="{ ${ID}_actualPrice: !Controller.ViewModel.Product.SalePriceFormatted, ${ID}_oldPrice: !!Controller.ViewModel.Product.SalePriceFormatted }" ng-bind="Controller.ViewModel.Product.ListPriceFormatted"></div>
          </div>
        </div>
        <div class="${ID}_productDetailsRight">
          <div ng-show="!!Controller.ViewModel.Product.SalePriceFormatted" class="${ID}_saleBadge">
            <div class="${ID}_saleBadgeText">
              <div>${translate('you save')}</div>
              <div class="${ID}_saleBadgePrice" ng-show="${saving === 'percentage'}">
                <div><span ng-bind="(((Controller.ViewModel.Product.ListPrice - Controller.ViewModel.Product.SalePrice) / Controller.ViewModel.Product.ListPrice) * 100 | number:0)"></span>%</div>
              </div>

              <div class="${ID}_saleBadgePrice" ng-show="${saving === 'total'}">
                <div><span ng-bind="((Controller.ViewModel.Product.ListPrice - Controller.ViewModel.Product.SalePrice) | currency : Locale.NUMBER_FORMATS.CURRENCY_SYM : 2)"></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);

    this.$component = $component;
  }

  addLegalInfo() {
    const { $component, $, ID } = this;

    pollerLite(['legal-info'], ([legalInfo]) => {
      const $legalInfo = $(legalInfo.cloneNode());
      angularCompile($legalInfo, $, $(legalInfo).scope());
      $component
        .find(`.${ID}_productDetailsLeft`)
        .append($legalInfo);
    });
  }

  bindEvents() {
  }

  render() {
    const { $component } = this;

    const $priceRow = $('.ListPrice').parent();
    $priceRow
      .prepend($component)
      .children('.ListPrice, .SalePrice')
      .remove();
  }
}
