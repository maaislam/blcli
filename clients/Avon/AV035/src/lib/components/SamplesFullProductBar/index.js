import shared from '../../shared';
import { loadProductData, angularCompile, getProductImage } from '../../../../../../../lib/utils/avon';
import { events, pollerLite } from '../../../../../../../lib/utils';

export default class SamplesFullProductBar {
  /**
   * @param {Array<Number>} productIds Array of product IDs to show in bar
   */
  constructor(productIds) {
    this.create = this.create.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.render = this.render.bind(this);

    const { $, ID, rootScope } = shared;
    const PRODUCT_LIMIT = 3;

    this.ID = ID;
    this.componentName = `${ID}_SamplesFullProductBar`;
    this.$ = $;
    this.rootScope = rootScope;

    // Get the last products from the productsId array as they are most recent
    const mostRecentProducts = productIds
      .slice(productIds.length > PRODUCT_LIMIT ? productIds.length - PRODUCT_LIMIT : 0, productIds.length);

    // Load in full product data
    this.create(mostRecentProducts);
    this.bindEvents();
    this.render();
  }

  /**
   * Create component
   * @param {Array<Object>} productData
   */
  create(productData) {
    const {
      componentName,
      $,
      rootScope,
    } = this;

    const scope = rootScope.$new();

    // Initial state
    scope.$apply(() => {
      scope.products = [];
    });

    const $component = $(`
      <div class="${componentName}" ng-show="products.length > 0">
       <div class="${componentName}Text">
        <p><em>Welcome Back!</em> Did you like your samples?</p>
       </div>
        <div class="${componentName}ProductsWrap">
          <ul class="${componentName}Products"></ul>
        </div>
      </div>
    `);

    /**
     * Insert a product into the component
     * @param {Object} data
     */
    const insertProduct = (data) => {
      // Create new scope object
      const productScope = scope.$new();
      const productObject = $.extend(true, {}, data);

      productScope.$apply(() => {
        // Add product data so it can be used when rendering
        productScope.product = productObject;

        // Add product image to data
        productScope.product.ImageUrl = getProductImage(data.ProfileNumber);

        // Add product URL to data
        productScope.product.ProductDetailUrl = rootScope.Url.GetProductAbsoluteUrl(data.Id, data.Slug);
      });

      /*
        The product HTML is a modified version of the the template 'productListTemplate.html'
        which can be found on category pages
      */
      const $product = $(`
        <li class="${componentName}Product">
          <div class="${componentName}ProductImage">
            <div class="ImageWrapper">
              <div class="ImageAspectRatio" style="padding-bottom: 100%;"></div>
                <img lazy-load="" itemprop="image" data-src="{{::product.ImageUrl}}" fallback-src="/styles/core/images/productfallback.svg" alt="{{::product.Name}}" resize="">
              </div>
            </div>
          </div>
          <div class="${componentName}ProductDetails">
            <a href="{{::product.ProductDetailUrl}}" class="${componentName}ProductTitle" ng-bind="::product.Name"></a>
            <a class="Button" href="{{::product.ProductDetailUrl}}">
              <span>Order Now</span>
            </a>
          </div>
        </li>
      `);

      angularCompile($product, $, productScope, () => {
        // Push product to parent model
        scope.$apply(() => {
          scope.products.push(productObject);
        });
      });
      $component
        .find(`.${componentName}Products`)
        .append($product);
    };

    angularCompile($component, $, scope, () => {
      // Add products to list
      productData.forEach((product) => {
        loadProductData([product])
          .then((data) => {
            insertProduct(data[0]);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    });

    this.$component = $component;
  }

  bindEvents() {
    const { $component, ID, componentName } = this;

    const handleLinkClick = () => {
      events.send(ID, 'Click', 'Clicked Product');
    };

    $component.on('click', `.${componentName}Product a`, handleLinkClick);
  }

  render() {
    const { $, $component } = this;

    const $header = $('#HeaderPlaceholder');
    $header.after($component);
  }
}
