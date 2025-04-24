import shared from '../../shared';
import { events } from '../../../../../../../lib/utils';
import { angularCompile } from '../../../../../../../lib/utils/avon';
import { translate, addProductToCart } from '../../services';

/**
 * Modified version of ProductBox component from AV014
 */
export default class ProductBox {
  /**
   * @param {Object} productData
   */
  constructor(productData) {
    const {
      $,
      ID,
      rootScope,
      layoutName,
    } = shared;

    this.ID = ID;
    this.$ = $;
    this.rootScope = rootScope;
    this.layoutName = layoutName;
    this.productData = productData;
    this.componentName = `${ID}_ProductBox`;

    this.changeQtySelector = this.changeQtySelector.bind(this);
    this.getProductPageUrl = this.getProductPageUrl.bind(this);
    this.createComponent = this.createComponent.bind(this);
    this.createMostPopularContainer = this.createMostPopularContainer.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.render = this.render.bind(this);

    // Create new scope object
    const productScope = rootScope.$new();
    productScope.$apply(() => {
      // Add product data so it can be used when rendering
      productScope.product = $.extend(true, {}, productData);

      // Add add to cart function to scope
      productScope.addProductToCart = addProductToCart;
    });

    this.createComponent();
    this.bindEvents();
    this.render();

    angularCompile(this.$component, $, productScope, () => {
      this.changeQtySelector();
    });
  }

  changeQtySelector() {
    const { $component } = this;

    // Change Qty selector
    const newDecreaseQty = `
      <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" class="Qty">
        <g fill="none" fill-rule="evenodd">
          <rect width="54" height="54" x=".5" y=".5" rx="4" ></rect>
          <path stroke-linecap="square" stroke-width="2" d="M20 27.5h15"></path>
        </g>
      </svg>
    `;

    const newIncreaseQty = `
      <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" class="Qty">
        <g fill="none" fill-rule="evenodd">
          <rect width="54" height="54" x=".5" y=".5" rx="4"></rect>
          <g stroke-linecap="square" stroke-width="2">
            <path d="M20 27.5h14.242M27.5 20v14.242"></path>
          </g>
        </g>
      </svg>
    `;

    $component.find('.QtyDown').html(newDecreaseQty);
    $component.find('.QtyUp').html(newIncreaseQty);
  }

  /**
   * @returns {String}
   */
  getProductPageUrl() {
    const { rootScope, productData } = this;
    // return rootScope.Url.GetProductAbsoluteUrl(productData.Id, productData.Slug);
    return rootScope.Url.GetCacheUrl(`/vyrobek/${productData.Id}/${productData.Slug}`, 8);
  }

  /**
   * Create the box component
   * @returns {jQuery}
   */
  createComponent() {
    const {
      $,
      componentName,
      productData,
      getProductPageUrl,
    } = this;

    const productUrl = getProductPageUrl();

    const $component = $(`
      <div class="${componentName}_wrap">
        <div class="${componentName}">
          <div class="${componentName}_titleBlock">
            <a class="${componentName}_title" href="${productUrl}">
              ${productData.Name}
            </a>

            <div class="${componentName}_priceBlock">
              ${productData.ListPriceFormatted ? `<div class="${componentName}_wasPrice">${productData.ListPriceFormatted}</div>` : ''}
              <div class="${componentName}_price">${productData.PriceFormatted}</div>
            </div>

            <div class="${componentName}_reviewStars" ng-hide="${!productData.Rating}">
              <rating value="${productData.Rating}"></rating>
            </div>
          </div>

          <div class="${componentName}_detailsBlock">
            <div class="${componentName}_productImage">
              <a href="${productUrl}">
                <img src="${productData.Img}" />
              </a>
            </div>

            <div class="${componentName}_details">
              <ul class="${componentName}_bullets">
                ${productData.bullets.map(bullet => `<li><p>${bullet}</p></li>`).join('')}
              </ul>

              <productquantity quantity="Qty" quantitydefault="1" min="1"></productquantity>
            </div>
          </div>

          <div class="${componentName}_ctaBlock">
            <a ng-click="addProductToCart(product, Qty)" class="${componentName}_cta Button">${translate('Add to bag')}</a>
          </div>
        </div>
      </div>
    `);

    this.$component = $component;
    return $component;
  }

  /**
   * Create a container for the most popular products
   * @returns {jQuery}
   */
  createMostPopularContainer() {
    const { componentName } = this;

    const $mostPopularContainer = $(`
      <div class="${componentName}_mostPopular">
        <div class="${componentName}_mostPopularInner">
          <div class="${componentName}_mostPopularTitle">${translate('Most Popular')}</div>
          <div class="${componentName}_mostPopularProducts"></div>
        </div>
      </div>
    `);

    this.$mostPopularContainer = $mostPopularContainer;
    return $mostPopularContainer;
  }

  /**
   * Bind event handlers
   */
  bindEvents() {
    const {
      ID,
      componentName,
      $component,
    } = this;

    // Event tracking
    const $productLinks = $component.find(`.${componentName}_cta:not(".${componentName}_modalLink")`);
    $productLinks.click(() => {
      events.send(ID, 'Click', 'Product Link');
    });
  }

  /**
   * Render component
   */
  render() {
    const {
      $,
      componentName,
      $component,
    } = this;

    let $mostPopularContainer = $(`.${componentName}_mostPopular`);

    const prodController = document.querySelector('[ng-controller="ProductListController"]');

    // Create container if it doesn't exist
    if (!$mostPopularContainer.length && prodController) {
      $mostPopularContainer = this.createMostPopularContainer();
      // $mostPopularContainer.insertBefore('#CategoryPage [ng-controller="ProductListController"]');
      if(document.body.classList.contains('Layout_Phone')) {
        $mostPopularContainer.insertBefore(prodController);
      } else {
        $mostPopularContainer.insertBefore('main');
      }
    }

    $mostPopularContainer.find(`.${componentName}_mostPopularProducts`).append($component);
  }
}
