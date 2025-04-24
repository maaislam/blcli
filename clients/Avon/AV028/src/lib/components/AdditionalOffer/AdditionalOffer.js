import shared from '../../shared';
import { angularCompile } from '../../../../../../../lib/utils/avon';
import { translate } from '../../services';

export default class {
  constructor() {
    const { $, ID } = shared;

    this.ID = ID;
    this.$ = $;
    this.productDetailScope = $('.ProductDetail').scope();

    // Bind scope
    this.create.bind(this.create);
    this.bindEvents.bind(this.bindEvents);
    this.render.bind(this.render);

    this.create();
    this.bindEvents();
    this.render();
    angularCompile(this.$component, $, this.productDetailScope);
  }

  create() {
    const { ID } = this;

    const $component = $(`
      <div class="${ID}_additionalOffers">
        <div class="${ID}_additionalOffer" ng-repeat="promotion in ViewModel.Product.Promotions">
          <div ng-click="HideElementByClass('PromotionOverlay');Controller.GoToPromotion(promotion.Id)">
            <div class="${ID}_additionalOfferTitle"><p>${translate('Special Offer')}<p></div>
            <div class="${ID}_additionalOfferDesc" ng-bind="promotion.Description"></div>
          </div>
        </div>
      </div>
    `);

    this.$component = $component;
  }

  bindEvents() {
  }

  render() {
    const { $component, $ } = this;

    const $addToCartCtas = $('pdp-add-to-cart');
    $addToCartCtas.after($component);

    // Hide original offer
    $('.Details .Exclusive').hide();
  }
}
