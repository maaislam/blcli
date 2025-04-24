import debounce from 'lodash/debounce';
import shared from '../../shared';
import { loadCategoryData, angularCompile, getProductImage, angularContextWrap } from '../../../../../../../lib/utils/avon';
import { addProductToCart, calculateProductHeights } from '../../services';
import SampleCount from '../SampleCount';

export default class BasketSamples {
  constructor() {
    const {
      rootScope,
      $,
      ID,
      SAMPLES_CATEGORY_ID,
    } = shared;

    this.rootScope = rootScope;
    this.$ = $;
    this.componentName = `${ID}_BasketSamples`;
    this.SAMPLES_CATEGORY_ID = SAMPLES_CATEGORY_ID;

    this.create = this.create.bind(this);
    this.fetchSamples = this.fetchSamples.bind(this);
    this.render = this.render.bind(this);
    this.equaliseProductHeights = this.equaliseProductHeights.bind(this);
    this.bindEvents = this.bindEvents.bind(this);

    this.fetchSamples(4)
      .then((sampleProducts) => {
        this.create(sampleProducts);
        this.bindEvents();
        this.render();

        // Re-render on Layout change
        rootScope.$watch('Layout.Name', () => {
          angularContextWrap(() => {
            const isRendered = () => !!this.$component.closest('body').length;
            if (!isRendered()) {
              this.render();
            }

            // Check again after 1s incase it was removed
            setTimeout(() => {
              if (!isRendered()) {
                this.render();
              }
            }, 1000);
          }, 250);
        });
      });
  }

  /**
   * Create component
   * @param {Array<Object>} sampleProducts
   */
  create(sampleProducts) {
    const {
      rootScope,
      $,
      componentName,
    } = this;

    const scope = rootScope.$new();

    const $component = $(`
      <div class="${componentName}" ng-class="{'${componentName}--open': open}">
        <div class="${componentName}Toggle" ng-click="open = !open" ng-show="$parent.Layout.IsPhone">
          <h2 ng-show="open || (!open && $parent.totalSamplesQty === 0)">Buy 3 Samples for £1</h2>
          <span ng-show="!open && $parent.totalSamplesQty > 0" class="${componentName}ToggleText"></span>
          <span class="${componentName}ToggleIcon"></span>
        </div>
        <div class="${componentName}Content" ng-show="!$parent.Layout.IsPhone || ($parent.Layout.IsPhone && open)">
          <div class="${componentName}Top">
            <div class="${componentName}Heading" ng-show="!$parent.Layout.IsPhone">
              <h2>Buy 3 Samples for £1</h2>
            </div>
            <p class="${componentName}Desc">
              Choose your samples and add to bag to receive the 3 for £1 promotional offer
            </p>
            <div class="${componentName}SampleCount"></div>
          </div>
          <ul class="${componentName}Products">
            <li ng-show="$parent.Layout.IsPhone && ${sampleProducts.length % 2 !== 0}" class="${componentName}Product ${componentName}Product--link">
              <div class="${componentName}Link">
                <a href="/1106/sample-shop" class="Button">Choose Different Samples</a>
              </div>
            </li>
          </ul>
          <div ng-show="!$parent.Layout.IsPhone || $parent.Layout.IsPhone && ${sampleProducts.length % 2 === 0}" class="${componentName}Link">
            <a href="/1106/sample-shop" class="Button">Choose Different Samples</a>
          </div>
        </div>
      </div>
    `);

    angularCompile($component, $, scope, () => {
      // Add products to list
      sampleProducts.map((sampleProduct) => {
        // Create new scope object
        const productScope = scope.$new();
        productScope.$apply(() => {
          // Add product data so it can be used when rendering
          productScope.product = $.extend(true, {}, sampleProduct);

          // Add product image to data
          productScope.product.ImageUrl = getProductImage(sampleProduct.ProfileNumber);

          // Add product URL to data
          productScope.product.ProductDetailUrl = rootScope.Url.GetProductAbsoluteUrl(sampleProduct.Id, sampleProduct.Slug);

          // Add add to cart function
          productScope.addProductToCart = addProductToCart;
        });

        /*
          The product HTML is a modified version of the the template 'productListTemplate.html'
          which can be found on category pages
        */
        const $product = $(`
          <li class="${componentName}Product">
            <div class="ProductListItem" data-product-id="{{::product.Id}}" ng-class="{'${componentName}Product--hasVariants': !product.SingleVariantSku, '${componentName}Product--isConditional': product.Conditional}">
              <a href="{{::product.ProductDetailUrl}}" class="ProductImage">
                <div class="product-options" ng-if="::(!product.SingleVariantSku && product.IsShadeVariant)">
                  <span>More Colours Available</span>
                </div>

                <div class="product-options" ng-if="::(!product.SingleVariantSku && product.IsSizeVariant && !product.IsShadeVariant)">
                  <span>More Sizes Available</span>
                </div>

                <div>    
                  <div class="ImageWrapper">
                    <div class="ImageAspectRatio" style="padding-bottom: 100%;"></div>
                    <img lazy-load="" itemprop="image" data-src="{{::product.ImageUrl}}" fallback-src="/styles/core/images/productfallback.svg" alt="{{::product.Name}}" resize="">
                  </div>

                  <div ng-if="product.BadgeId" class="product-badge badge{{::product.BadgeId}} displayOptionsEnabled" ng-class="{displayOptions: (!product.SingleVariantSku && (product.IsSizeVariant || product.IsShadeVariant))}">
                    {{::product.BadgeText}}
                  </div>
                </div>
                      
                <badge class="BadgeNumber displayOptionsEnabled" ng-if="::product.BadgeNumber" ng-class="{displayOptions: (!product.SingleVariantSku && (product.IsSizeVariant || product.IsShadeVariant))}">
                  {{::product.BadgeNumber}}
                </badge>

                <badge class="BadgeMarketingLabel" ng-if="::(!product.BadgeNumber && product.MarketingLabel1)">
                  {{::product.MarketingLabel1}}
                </badge>
              </a>

              <div class="ProductDetails">
                <div class="ProductDetailsTop">
                  <div class="${componentName}OfferBadge" ng-if="(product.Promotions | filter: {Id: 1207}).length">
                    3 for £1
                  </div>
        
                  <a href="{{::product.ProductDetailUrl}}" class="ProductName" ng-bind="::product.Name"></a>
                  <rating value="{{::product.Rating}}" ng-if="::product.Rating"></rating>
                  <div class="RepFavouriteLabel" ng-if="::product.Customization!=null">
                    <span><svg-icon class="currentLabelIcon" icon="love-recommend"></svg-icon></span>
                    <span class="currentLabelText" ng-bind="::product.Customization.LabelText"></span>
                    <div ng-bind="::product.Customization.Content"></div>
                  </div>

                  <div class="ProductDescription">
                    <div class="DescriptionShort" ng-bind-html="product.DescriptionShort"></div>
                  </div>
                      
                  <legal-info show-vat-info="false" show-unit-price-info="false" show-shipping-info="false" unit="product.PricePerUnitInformation" price="product.UnitPrice" measure-unit="product.UnitPriceMeasureUnit" layout="'Type1'"></legal-info>

                  <div class="Availability" ng-if="::(product.Availability==2 || !product.HasActiveVariant) ">
                    <span>Not Available</span>
                  </div>

                  <div ng-if="::(product.Availability==1 && (product.Promotions | filter: !{Id: 1207}).length && product.HasActiveVariant)" class="ExclusiveOffers">
                    <div class="ExclusiveOfferButton" ng-click="isPhone && modalShowExclusiveOffers(product)" ng-mouseover="promotionsShow(product)" ng-mouseleave="promotionsHide(product)">
                      <svg-icon ng-if="!isPhone" icon="nav-right"></svg-icon>
                      <svg-icon ng-if="isPhone" icon="nav-plus"></svg-icon>

                      <span ng-if="product.Promotions.length==1"><span>Exclusive Offer</span></span>
                      <span ng-if="product.Promotions.length>1"><span>Exclusive Offers</span></span>

                      <div ng-if="!isPhone" class="TooltipBelow" ng-class="{Active: product.PromotionsActive}">
                        <div class="TooltipContent">
                          <div class="PromotionLink" ng-repeat="promotion in ::product.Promotions | filter: !{Id: 1207}">
                            <a ng-click="goToPromotionLink(promotion.Id, $event)" prevent-click="" href="{{goToPromotionUrl(promotion.Id)}}" ng-bind="::promotion.Description"></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>               

                <div class="ProductAction">
                  <productquantity quantity="Qty" quantitydefault="1" min="1"></productquantity>

                  <div ng-if="::(product.Availability==1 && product.HasActiveVariant && product.SingleVariantSku)" class="AddToCart" ng-class="{'${componentName}AddToCart--success': (($parent.samplesInBasket | filter: {Id: product.Id}).length)}">
                    <a class="Button" ng-click="addProductToCart(product, Qty)">
                      <span ng-if="!($parent.samplesInBasket | filter: {Id: product.Id}).length">
                        Add to bag (<span ng-bind="(($parent.totalSamplesQty + 1) % 3 === 0) ? 'FREE' : product.PriceFormatted"></span>)
                      </span>
                      
                      <span ng-if="($parent.samplesInBasket | filter: {Id: product.Id}).length">
                        Add another
                      </span>
                    </a>
                  </div>

                  <div ng-if="::(product.Availability==1 && product.HasActiveVariant && !product.SingleVariantSku && product.IsShadeVariant)" class="AddToCart" ng-class="{'${componentName}AddToCart--success': (($parent.samplesInBasket | filter: {Id: product.Id}).length)}">
                    <a class="Button" ng-click="showVariants(product)">
                      <span ng-if="!($parent.samplesInBasket | filter: {Id: product.Id}).length">
                        Add to bag (<span ng-bind="(($parent.totalSamplesQty + 1) % 3 === 0) ? 'FREE' : product.PriceFormatted"></span>)
                      </span>
              
                      <span ng-if="($parent.samplesInBasket | filter: {Id: product.Id}).length">
                        Add another shade
                      </span>
                    </a>
                  </div>

                  <div ng-if="::(product.Availability==1 && product.HasActiveVariant && !product.SingleVariantSku && product.IsSizeVariant && !product.IsShadeVariant)" class="viewProduct">
                    <a class="Button" href="{{::product.ProductDetailUrl}}">
                      <span>View Size Options</span>
                    </a>
                  </div>

                  <div ng-if="::(product.Availability!=1 || !product.HasActiveVariant || (!product.SingleVariantSku && !product.IsShadeVariant && !product.IsSizeVariant))" class="viewProduct">
                    <a class="Button" href="{{::product.ProductDetailUrl}}">
                      <span>View product</span>
                    </a>
                  </div>
                </div>
              </div> 
            </div> 
          </li>
        `);

        angularCompile($product, $, productScope);
        $component
          .find(`.${componentName}Product--link`)
          .before($product);
      });

      // Add link inside product grid for mobile
      // $component
      //   .find(`.${componentName}Products`)
      //   .append(`
      //     <li class="${componentName}Product ${componentName}Product--link">
      //       <div class="${componentName}Link">
      //         <a href="/1106/sample-shop" class="Button">Choose Different Samples</a>
      //       </div>
      //     </li>
      //   `);

      // Add sample count component
      const $sampleCountComponent = new SampleCount();
      $component.find(`.${componentName}SampleCount`).append($sampleCountComponent);
      $component.find(`.${componentName}ToggleText`).append(new SampleCount());
    });

    this.$component = $component;
  }

  /**
   * Retrieve a list of the top n samples from the samples category
   * @param {Number} number Number of samples to return. Leave undefined to return all
   * @returns {Promise}
   */
  fetchSamples(number) {
    const { SAMPLES_CATEGORY_ID } = this;

    return new Promise((resolve, reject) => {
      loadCategoryData([SAMPLES_CATEGORY_ID])
        .then((resp) => {
          const products = resp?.Data?.Products || [];
          const limit = number || products.length;
          resolve(resp?.Data?.Products.slice(0, limit));
        })
        .catch(reject);
    });
  }

  equaliseProductHeights() {
    const { $component, componentName } = this;

    calculateProductHeights($component.find(`.${componentName}Products`));
  }

  bindEvents() {
    const { $component, equaliseProductHeights } = this;

    window.addEventListener('resize', debounce(() => {
      equaliseProductHeights();
    }, 250, {
      trailing: true,
    }));

    // Watch for open state to change then re-construct product heights
    angularContextWrap(() => {
      $component.scope().$watch('open', () => {
        equaliseProductHeights();
        setTimeout(equaliseProductHeights, 250);
      });
    }, 250);
  }

  render() {
    const { $component, equaliseProductHeights } = this;

    $('.CartHeader').before($component);
    equaliseProductHeights();
    setTimeout(equaliseProductHeights, 250);
  }
}
