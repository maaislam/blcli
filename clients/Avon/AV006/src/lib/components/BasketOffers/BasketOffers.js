import { angularCompile, getLayoutName } from '../../../../../../../lib/utils/avon';
import shared from '../../shared';
import { events } from '../../../../../../../lib/utils';

export default class BasketOffers {
  constructor() {
    const { ID, $ } = shared;
    this.$ = $;
    this.componentName = `${ID}_BasketOffers`;
    this.cartScope = $('#CartPage').scope();
    this.freeDeliveryThreshold = 20;
    this.hasOffers = (this.cartScope.CartData.QualifiedPromotions.length + this.cartScope.CartData.PartQualifiedPromotions.length) > 0;

    this.create = this.create.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.render = this.render.bind(this);

    // Check if it already exists to prevent duplication
    const componentAlreadyExists = !!$(`.${this.componentName}`).length;

    if (!componentAlreadyExists && this.hasOffers) {
      this.create();
      this.bindEvents();
      this.render();
      angularCompile(this.$component, $, this.cartScope);
    }
  }

  create() {
    const { $, componentName, freeDeliveryThreshold } = this;

    const $component = $(`
      <div class="${componentName}" ng-show="(CartData.QualifiedPromotions.length + CartData.PartQualifiedPromotions.length) > 0">
        <div class="${componentName}_title">
          <span ng-bind="(CartData.QualifiedPromotions.length)"></span> of <span ng-bind="(CartData.QualifiedPromotions.length + CartData.PartQualifiedPromotions.length)"></span> OFFERS unlocked!
        </div>

        <div class="${componentName}_offers" ng-class="{'${componentName}_offers--expanded' : AV006_expanded}">
          <ul class="${componentName}_qualifiedOffers">
            <!--
            <li ng-if="CartData.Price >= ${freeDeliveryThreshold}">
              <div class="${componentName}_offerInner">
                <div class="${componentName}_offerIcon"></div>
                <div class="${componentName}_offerContent">
                  <p><em>FREE DELIVERY</em> when you spend £${freeDeliveryThreshold} or over</p>
                  <a target="_blank" href="https://www.avon.uk.com/help#deliverymethods">Learn more about this offer</a>
                </div>
              </div>
            </li>
            -->

            <li ng-repeat="offer in CartData.QualifiedPromotions">
              <div class="${componentName}_offerInner">
                <div class="${componentName}_offerIcon"></div>
                <div class="${componentName}_offerContent">
                  <p>{{offer.Description}}</p>
                  <a target="_blank" href="{{offer.Url}}">Learn more about this offer</a>
                </div>
              </div>
            </li>
          </ul>

          <ul class="${componentName}_partialOffers">
            <!--
            <li ng-if="CartData.Price < ${freeDeliveryThreshold}">
              <div class="${componentName}_offerInner">
                <div class="${componentName}_offerIcon"></div>
                <div class="${componentName}_offerContent">
                  <p><em>FREE</em> delivery when you spend £${freeDeliveryThreshold} or over</p>
                  <a target="_blank" href="https://www.avon.uk.com/help#deliverymethods">Learn more about this offer</a>
                </div>
              </div>
            </li>
            -->

            <li ng-repeat="offer in CartData.PartQualifiedPromotions">
              <div class="${componentName}_offerInner">
                <div class="${componentName}_offerIcon"></div>
                <div class="${componentName}_offerContent">
                  <p>{{offer.Description}}</p>
                  <a href="{{offer.Url}}">Unlock this offer</a>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="${componentName}_offersExpand" ng-click="AV006_expanded = !AV006_expanded" ng-bind="AV006_expanded ? 'View less offers' : 'View all offers'" ng-show="(CartData.QualifiedPromotions.length + CartData.PartQualifiedPromotions.length) > 2"></div>

      </div>
    `);

    this.$component = $component;
  }

  bindEvents() {
    const { ID, $component } = this;
    $component.on('click', 'ul li a', () => {
      events.send(ID, 'Clicked', 'Clicked offer link');
    });
  }

  render() {
    const { $, $component } = this;

    const layout = getLayoutName();
    if (layout === 'Phone') {
      $('.CartHeader').after($component);
    } else {
      const $promotions = $('.Cart_Promotion');
      if ($promotions.length) {
        $promotions.before($component);
      } else {
        $('.CartHeader').before($component);
      }
    }
  }
}
