/* eslint-disable class-methods-use-this */
import shared from '../../shared';
import { getSamplesInCart as utilGetSamplesInCart, angularCompile, angularContextWrap } from '../../../../../../../lib/utils/avon';

/**
 * Sticky header showing samples currently in basket
 *
 * @class StickyHeader
 */
export default class StickyHeader {
  constructor() {
    const { ID, $, rootScope } = shared;
    this.$ = $;
    this.componentName = `${ID}_StickyHeader`;
    this.rootScope = rootScope;
    this.scope = rootScope.$new();

    // Set initial state
    this.scope.samplesInBasket = [];
    this.scope.totalSamplesPrice = 0;
    this.scope.totalSamplesQty = 0;

    this.bindState = this.bindState.bind(this);
    this.create = this.create.bind(this);
    this.getSamplesInCart = this.getSamplesInCart.bind(this);
    this.updateState = this.updateState.bind(this);
    this.basketChangeHandler = this.basketChangeHandler.bind(this);
    this.bindState = this.bindState.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.render = this.render.bind(this);

    // Update state with async calls
    this.updateState();
    this.create();
    this.bindState();
    this.bindEvents();
    this.render();
  }

  create() {
    const { componentName } = this;

    const $component = $(`
      <div class="${componentName}">
        <span class="${componentName}Inner ${componentName}Inner--progress" ng-show="(totalSamplesQty < 3)">
          <span class="${componentName}Icon"></span>
          <span class="${componentName}Text">
            <span>
              <em><span ng-bind="totalSamplesQty"></span> Sample<span ng-show="totalSamplesQty != 1">s</span> Added<span ng-show="totalSamplesQty > 0"> for <span ng-bind="(totalSamplesPrice | currency : Locale.NUMBER_FORMATS.CURRENCY_SYM : 2)"></span></span></em> 
            </span>
            <span>
              (add <span ng-bind="(3 - totalSamplesQty)"></span> more to get 3 for £1)
            </span>
          </span>
        </span>
        <span class="${componentName}Inner ${componentName}Inner--complete" ng-show="(totalSamplesQty >= 3)">
          <span class="${componentName}Icon"></span>
          <span class="${componentName}Text">
            <span>
              <em>You have qualified for the 3 for £1 offer</em>
            </span>
          </span>
        </span>
      </div>
    `);

    this.$component = $component;
  }

  getSamplesInCart() {
    return utilGetSamplesInCart();
  }

  updateState() {
    const { getSamplesInCart, scope, rootScope } = this;

    angularContextWrap(() => {
      getSamplesInCart().then((samples) => {
        // Apply changes to scope
        scope.$apply(() => {
          scope.samplesInBasket = samples;
          scope.totalSamplesPrice = samples.reduce((acc, sample) => {
            acc += sample.Price * sample.Quantity;
            return acc;
          }, 0);
          scope.totalSamplesQty = samples.reduce((acc, sample) => {
            acc += sample.Quantity;
            return acc;
          }, 0);
        });

        /*
          Apply data to root scope so it can be used to create custom CTAs
          for products.

          Quick and dirty solution - ideally should be abstracted from the
          StickyHeader component
        */
        rootScope.$apply(() => {
          rootScope.samplesInBasket = samples;
          rootScope.totalSamplesPrice = samples.reduce((acc, sample) => {
            acc += sample.Price * sample.Quantity;
            return acc;
          }, 0);
          rootScope.totalSamplesQty = samples.reduce((acc, sample) => {
            acc += sample.Quantity;
            return acc;
          }, 0);
        });
      });
    }, 200);
  }

  basketChangeHandler() {
    const { updateState } = this;

    updateState();
  }

  bindEvents() {
    const { rootScope, basketChangeHandler } = this;

    // Watch for basket changes
    rootScope.$on('CartService_AddSuccess', basketChangeHandler);
    rootScope.$on('CartService_RemoveProductSuccess', basketChangeHandler);
  }

  render() {
    const { $component } = this;
    $component.prependTo('body');
  }

  /**
   * Bind state to the component
   * this.$component must exist before you bind state
   */
  bindState() {
    const { $component, $, scope } = this;

    angularCompile($component, $, scope);
  }
}
