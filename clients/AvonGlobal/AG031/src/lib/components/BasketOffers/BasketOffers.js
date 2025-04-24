/* eslint-disable class-methods-use-this */
import {
  angularCompile,
  getLayoutName,
  requestPromoData,
  addToCart,
  getProductImage,
} from '../../../../../../../lib/utils/avon';
import shared from '../../shared';
import { events } from '../../../../../../../lib/utils';
import Lightbox from '../Lightbox';
import { translate } from '../../services';

export default class BasketOffers {
  constructor() {
    const { ID, $, rootScope } = shared;
    this.$ = $;
    this.ID = ID;
    this.rootScope = rootScope;
    this.componentName = `${ID}_BasketOffers`;
    this.cartScope = $('#CartPage').scope();
    this.freeDeliveryThreshold = 20;
    this.hasOffers = (this.cartScope.CartData.QualifiedPromotions.length
      + this.cartScope.CartData.PartQualifiedPromotions.length) > 0;

    this.loadPromoProducts = this.loadPromoProducts.bind(this);
    this.loadPromoProductsLightbox = this.loadPromoProductsLightbox.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.createProductList = this.createProductList.bind(this);
    this.getProductPageUrl = this.getProductPageUrl.bind(this);
    this.changeQtySelector = this.changeQtySelector.bind(this);
    this.isSpecialOfferUrl = this.isSpecialOfferUrl.bind(this);
    this.getPromoId = this.getPromoId.bind(this);
    this.create = this.create.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.render = this.render.bind(this);

    // Bind functions to cart scope
    this.cartScope.$apply(() => {
      this.cartScope.loadPromoProducts = this.loadPromoProducts;
      this.cartScope.loadPromoProductsLightbox = this.loadPromoProductsLightbox;
      this.cartScope.promoProductsData = {};
      this.cartScope.promoProductsLoading = true;

      // Preload promo products to improve user experience.
      this.loadPromoProducts();
    });

    this.lightbox = new Lightbox({
      content: '',
      closeOnClick: true,
      afterClose() {
        window.location.reload()
      }
    });

    // Check if it already exists to prevent duplication
    const componentAlreadyExists = !!$(`.${this.componentName}`).length;

    if (!componentAlreadyExists && this.hasOffers) {
      this.create();
      this.bindEvents();
      this.render();
      angularCompile(this.$component, $, this.cartScope);
    }
  }

  /**
   * Extract promoId from promo URL
   * @param {string} url
   */
  getPromoId(url) {
    // Account for Uk/Sk versions.
    const isSK = url.indexOf('specialne-ponuky') !== -1;

    if (isSK) return url.match(/specialne-ponuky\/(\d+)/)[1];
    return url.match(/special-offers\/(\d+)/)[1];
  }

  /**
   * Preload promo products and store in cartData scope.
   */
  loadPromoProducts() {
    this.cartScope.promoProductsData = {};

    // Get promotions.
    const promos = [].concat(
      this.cartScope.CartData.QualifiedPromotions.filter(p => !!p.Url),
      this.cartScope.CartData.PartQualifiedPromotions.filter(p => !!p.Url)
    );

    promos.forEach((promo) => {
      // Get promoID.
      const promoId = this.getPromoId(promo.Url);

      // Load products for each promo and store in cartScope.
      requestPromoData(promoId)
        .then((data) => {
          const { GetListProducts, BuyListProducts } = data.Data.PromotionalProducts;
          let products = GetListProducts.length > 0 ? GetListProducts : BuyListProducts;

          // Preload images.
          if (products) {
            products = products.map((product) => {
              const withImage = product;
              withImage.Img = getProductImage(product.ProfileNumber);
              return withImage;
            });
          }

          this.cartScope.promoProductsData[promoId] = products;
        })
        .catch(() => {
          this.cartScope.promoProductsData = null;
        })
        .finally(() => {
          this.cartScope.promoProductsLoading = false;
        });
    });
  }

  /**
   * Detect whether the url links to a special offer for UK/SK.
   * @param {string} url
   */
  isSpecialOfferUrl(url) {
    const isSK = url.indexOf('specialne-ponuky') !== -1;

    if (isSK) return /specialne-ponuky/.test(url);
    return /special-offers/.test(url);
  }

  /**
   * If URL is a special offer page, show a lightbox
   * containing products from that page
   * @param {string} url
   */
  loadPromoProductsLightbox(url, title) {
    const {
      lightbox,
      createProductList,
      componentName
    } = this;

    if (this.isSpecialOfferUrl(url)) {
      const promoId = this.getPromoId(url);

      // Make lightbox content.
      const createContentElements = (products) => {
        const $content = createProductList(products);

        // Clear previous content.
        $(`.${componentName}_productsWrapper`).remove();

        // Create new products content.
        const $contentWrapper = $(`
          <div class="${componentName}_productsWrapper">
            <h2 class="${componentName}_offerTitle">${title || 'Special Offers'}</h2>
          </div>
        `);

        $contentWrapper.append($content);

        lightbox.updateContent($contentWrapper);
        lightbox.open();
      };

      // If products are loading or failed to load, try loading again for this promo.
      if (this.cartScope.promoProductsLoading || !this.cartScope.promoProductsData) {
        // Load in products for this promo.
        requestPromoData(promoId)
          .then((data) => {
            // If GetListProducts has values, use that list.
            const { GetListProducts, BuyListProducts } = data.Data.PromotionalProducts;
            const products = GetListProducts.length > 0 ? GetListProducts : BuyListProducts;
            createContentElements(products);
          });
      } else {
        // Use preloaded list of products.
        const products = this.cartScope.promoProductsData[promoId];
        createContentElements(products);
      }
    } else {
      window.location.href = url;
    }
  }

  /**
   * Add to cart
   * @param {Object} product
   * @param {Number} qty
   */
  addProductToCart(product, qty) {
    if (product.SingleVariantSku) addToCart(product.SingleVariantSku, qty);
  }

  /**
   * @param {Object} productData
   * @returns {String}
   */
  getProductPageUrl(productData) {
    const { rootScope } = this;
    // return rootScope.Url.GetProductAbsoluteUrl(productData.Id, productData.Slug);
    // @TODO this check should be localised for UK/SK.
    return rootScope.Url.GetCacheUrl(`/productdetail/${productData.Id}/${productData.Slug}`, 8);
  }

  /**
   * Change qty selector from old Select element to SVGs
   * @param {jQuery} $product
   */
  changeQtySelector($product) {
    // Change Qty selector
    const newDecreaseQty = `
    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" class="Qty">
        <g fill="none" fill-rule="evenodd">
            <rect width="54" height="54" x=".5" y=".5" rx="4"></rect>
            <path stroke-linecap="square" stroke-width="2" d="M20 27.5h15"></path>
        </g>
    </svg>
    `;

    const newIncreaseQty = `
    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" class="Qty">
        <g fill="none" fill-rule="evenodd">
            <rect width="54" height="54" x=".5" y=".5" rx="4"></rect>
            <g stroke-linecap="square" stroke-width="2">
                <path d="M20 27.5h14.242M27.5 20v14.242"></path>
            </g>
        </g>
    </svg>
    `;

    $product.find('.QtyDown').html(newDecreaseQty);
    $product.find('.QtyUp').html(newIncreaseQty);
  }

  /**
   * @param {Array<Object>} allProductData
   * @return {jQuery}
   */
  createProductList(allProductData) {
    const {
      $,
      componentName,
      rootScope,
      addProductToCart,
      getProductPageUrl,
      changeQtySelector,
    } = this;

    let $productList = $(`.${componentName}_productList`);
    const withOverlay = allProductData && allProductData.length > 6;

    // Check for existing list and clear it, create new list on first run.
    if ($productList.length > 0) {
      // Remove previous offer's products & custom styling.
      $productList.find('ul').empty();
      if (!withOverlay) $productList.removeClass('withOverlay');
      else $productList.addClass('withOverlay');
    } else {
      $productList = $(`
        <div class="${componentName}_productList ${withOverlay ? 'withOverlay' : ''}">
          <ul class="${componentName}_products"></ul>
          <div class="${componentName}_closeButton">
            <span class="${componentName}_close">Close</span>
          </div>
        </div>
      `);
    }


    // Create a dom element with a single product.
    const createProduct = (productData) => {
      // Create new scope object
      const productScope = rootScope.$new();
      // Add product data so it can be used when rendering
      productScope.product = $.extend(true, {}, productData);

      // Add add to cart function to scope
      productScope.addProductToCart = addProductToCart;

      // Add product image to scope
      if (!productScope.product.Img) {
        productScope.product.Img = getProductImage(productData.ProfileNumber);
      }

      let productUrl = getProductPageUrl(productData);
      productUrl = productUrl.replace(/productdetail/, 'product');

      const $product = $(`
        <li>
          <div class="${componentName}_product">
            <div class="${componentName}_productImage">
              <a href="${productUrl}">
                <img src="{{product.Img}}" />
              </a>
            </div>

            <div class="${componentName}_productDetails">
              <div class="${componentName}_productTitleBlock">
                <a class="${componentName}_productTitle" href="${productUrl}">
                  {{product.Name}}
                </a>

                <div class="${componentName}_productReviewStars" ng-hide="${!productData.Rating}">
                  <rating value="${productData.Rating}"></rating>
                </div>

                <div class="${componentName}_productPriceBlock">
                  <div class="${componentName}_productPriceSale" ng-if="product.SalePriceFormatted">
                    <span>{{product.SalePriceFormatted}}</span> Regular price
                  </div>
                  <div class="${componentName}_productPrice">{{product.PriceFormatted}}</div>
                </div>
              </div>

              <div class="${componentName}_productActionWrapper">
                <div class="${componentName}_productAction">
                  <div class="${componentName}_productQuantity">
                    ${(productData.Availability === 1 && productData.HasActiveVariant && productData.SingleVariantSku) ? `
                      <productquantity quantity="Qty" quantitydefault="1" min="1"></productquantity>
                    ` : ''}
                  </div>

                  <div class="${componentName}_productCtaBlock">
                    ${(productData.Availability === 1 && productData.HasActiveVariant && productData.SingleVariantSku) ? `
                      <a ng-click="addProductToCart(product, Qty)" class="${componentName}_productCta Button">${translate('Add to bag')}</a>
                    ` : ''}

                    ${(productData.Availability === 1 && productData.HasActiveVariant && !productData.SingleVariantSku && !productData.IsSizeVariant && productData.IsShadeVariant) ? `
                      <a href="${productUrl}" class="${componentName}_productCta Button">${translate('View Colour Options')}</a>
                    ` : ''}

                    ${(productData.Availability === 1 && productData.HasActiveVariant && !productData.SingleVariantSku && productData.IsSizeVariant && !productData.IsShadeVariant) ? `
                      <a href="${productUrl}" class="${componentName}_productCta Button">${translate('View Size Options')}</a>
                    ` : ''}

                    ${(productData.Availability !== 1 || !productData.HasActiveVariant || (!productData.SingleVariantSku && !productData.IsShadeVariant && !productData.IsSizeVariant)) ? `
                      <a href="${productUrl}" class="${componentName}_productCta Button">${translate('View Product')}</a>
                    ` : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      `);

      angularCompile($product, $, productScope, () => {
        changeQtySelector($product);
        $productList.find('ul').append($product);
        $productList.find(`.${componentName}_close`).click(() => {
          this.lightbox.close();
        });

        $product.find(`.${componentName}_productCta[ng-click^="addProductToCart"]`).on('click', function(e) {
          const $addedMessage = $(`<div class="${shared.ID}-addedmsg">✔ <span>${translate('Added to basket')}</span></div>`);
          $productList.prepend($addedMessage);
          setTimeout(() => {
            $addedMessage.fadeOut();
          }, 800);
        });
      });
    };

    // Create products list.
    allProductData.forEach((product) => {
      createProduct(product);
    });

    return $productList;
  }

  create() {
    const {
      $,
      ID,
      componentName,
    } = this;

    const completeOffers = (this.cartScope?.CartData?.QualifiedPromotions || []).filter((p) => (!!p.Url && this.isSpecialOfferUrl(p.Url)));
    const numCompleteOffers = completeOffers.length;
    const partialOffers = (this.cartScope?.CartData?.PartQualifiedPromotions || []).filter((p) => (!!p.Url && this.isSpecialOfferUrl(p.Url)));
    const numPartialOffers = partialOffers.length;

    const totalUsableOffers = numPartialOffers + numCompleteOffers;

    const $component = $(`
      <div class="${componentName}" ng-show="!!${totalUsableOffers} && (CartData.QualifiedPromotions.length + CartData.PartQualifiedPromotions.length) > 0">
        <div class="${componentName}_title">
          <span>${numCompleteOffers}</span> ${translate('of')} <span>${totalUsableOffers}</span> ${translate('OFFERS unlocked!')}
        </div>

        <div class="${componentName}_offers" ng-class="{'${componentName}_offers--expanded' : ${ID}_expanded}">
          <ul class="${componentName}_qualifiedOffers">
            <li ng-if="offer.Url && (offer.Url.indexOf('specialne-ponuky') > -1 || offer.Url.indexOf('special-offers') > -1)" ng-repeat="offer in CartData.QualifiedPromotions">
              <div class="${componentName}_offerInner">
                <div class="${componentName}_offerIcon"></div>
                <div class="${componentName}_offerContent">
                  <p>{{offer.Description.length < 50 ? offer.Description : offer.Description.substring(0,50) + '...'}}</p>
                  <a ng-click="loadPromoProductsLightbox(offer.Url, offer.Description)">${translate('Learn more about this offer')}</a>
                </div>
              </div>
            </li>
          </ul>

          <ul class="${componentName}_partialOffers">
            <li ng-if="offer.Url && (offer.Url.indexOf('specialne-ponuky') > -1 || offer.Url.indexOf('special-offers') > -1)" 
              ng-repeat="offer in CartData.PartQualifiedPromotions">
              <div class="${componentName}_offerInner">
                <div class="${componentName}_offerIcon"></div>
                <div class="${componentName}_offerContent">
                  <p>{{offer.Description.length < 50 ? offer.Description : offer.Description.substring(0,50) + '...'}}</p>
                  <a ng-click="loadPromoProductsLightbox(offer.Url, offer.Description)">${translate('Unlock this offer')}</a>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="${componentName}_offersExpand" ng-click="${ID}_expanded = !${ID}_expanded" ng-bind='${ID}_expanded == true ? "${translate('View less offers')}" : "${translate('View all offers')}"' ng-show="!!${totalUsableOffers > 2 ? '1' : '0'}">
          
        </div>
      </div>
    `);

    this.$component = $component;
  }

  bindEvents() {
    const { ID, $component } = this;
    $component.on('click', 'ul li a', () => {
      events.send(ID, 'Clicked', 'Clicked offer link');
    });

    // On add to basket, to force clearing the cache, we need to refresh the page
    //this.rootScope.$on('CartService_GetCartSuccess', () => window.location.reload());
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
