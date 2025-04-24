/**
 * Avon Utilities
 * @author User Conversion
 */

import Promise from 'promise-polyfill';
import { pollerLite } from '../utils';

/**
 * Pass a callback function to run within the Angular context.
 * By wrapping it in a $timeout we add it to the end of the current
 * $digest cycle which can prevent errors
 *
 * It's recommended to wrap all code in this when Angular features as they
 * might call the digest cycle
 * @param {Function} callback
 * @param {Number} timeout
 */
export const angularContextWrap = (callback, timeout) => {
  $(document)
    .injector()
    .invoke([
      '$timeout',
      function invoke($timeout) {
        /*
        $timeout must be used to avoid an error that occurs when $apply or
        $digest is called whilst that service is currently running

        Read more:
        https://code.angularjs.org/1.4.2/docs/error/$rootScope/inprog?p0=$apply
      */
        $timeout(() => {
          callback();
        }, timeout || 0);
      },
    ]);
};

/**
 * Run the compiler to parse any markup injected into the app
 * This allows us to make use of controllers already defined in the Avon app
 * @param {jQuery} $elements Elements to compile, must be wrapped in a jQuery object
 * @param {jQuery} jq Can be either jqLite (angular.element) or jQuery
 * @param {Object} scope Usually the scope of the closest parent with an ng-controller attribute
 * @param {function} cb Callback
 */
export const angularCompile = ($elements, jq, scope, cb) => {
  /* eslint-disable prefer-arrow-callback */
  const thisScope = scope || window.AppModule.RootScope;
  const $ = jq || window.angular.element;
  const $document = $(document);
  $document.injector().invoke([
    '$compile',
    '$timeout',
    function invokeInjector($compile, $timeout) {
      /*
        $timeout must be used to avoid an error that occurs when $apply or
        $digest is called whilst that service is currently running

        Read more:
        https://code.angularjs.org/1.4.2/docs/error/$rootScope/inprog?p0=$apply
      */
      $timeout(function compileElements() {
        $compile($elements)(thisScope);
        if (cb && cb instanceof Function) {
          $timeout(function runCallback() {
            cb();
          }, 0);
        }
      }, 0);
    },
  ]);
  /* eslint-enable prefer-arrow-callback */
};

/**
 * Resolve promise when the app has loaded
 * @returns {Promise}
 */
export const waitForApp = () =>
  new Promise((resolve) => {
    pollerLite(
      [() => window.angular?.element, () => window.AppModule?.RootScope, () => window.AppModule?.RootScope?.$on],
      (elements) => {
        const [$, rootScope] = elements;
        resolve({ $, rootScope });
      }
    );
  });

/**
 * Pass an array of product IDs and return a promise which resolves with
 * product data such as price, rating etc.
 *
 * Note: I've noticed an error in using this API for multiple IDs. It will only pull in
 * variants for one item in the array and the others will remain blank. This works fine
 * for a single ID but not multiple. If you need the variant data for multiple products
 * the only way is to call loadProductData with one ID at a time. Recommended you use
 * Promise.all to make this easier
 * @param {Array<String>} productIds
 * @param {Object} rootScope
 * @returns {Promise}
 */
export const loadProductData = (productIds, rootScope) =>
  new Promise((resolve) => {
    const scope = rootScope || window.AppModule.RootScope;

    /*
   When the API is used a $Broadcast is sent to ProductService.ProductsLoadedSuccess
   We need to watch for the broadcast before making the API call so we can handle the
   response
  */
    const productsLoadedListener = scope.$on('ProductService.ProductsLoadedSuccess', (event, productData) => {
      /*
      Check to see if the response is what we expected. If it isn't this broadcast was likely
      sent by a different set of products loading in
    */
      const isExpectedResponse =
        productData.length === productIds.length &&
        productData.every((data) => {
          const id = data.Id;
          return id && (productIds.indexOf(id.toString()) > -1 || productIds.indexOf(id) > -1);
        });

      if (isExpectedResponse) {
        resolve(productData);

        // De-register event listener once we have the data
        productsLoadedListener();
      }
    });

    // Make the request to the API
    window.ProductServiceModule.ProductService.prototype.GetProductsWithIds(productIds);
  });

/**
 * Return category data from an array of category IDs
 * @param {Array<Number>} categoryIds
 * @returns {Promise<Object>}
 */
export const loadCategoryData = (categoryIds) =>
  new Promise((resolve, reject) => {
    const { BaseService } = window;
    const url = `/api/CategoryApi/ReducedCategoryPageData?ids=${categoryIds
      .toString()
      .replace(/,$/, '')}&${BaseService.prototype.QueryStringCampaignLanguage()}`;

    BaseService.prototype.GetJson(url, 8, !1).then(resolve, reject);
  });

/**
 * Return a promise that resolves with cart data
 * @param {Object} rootScope
 * @returns {Promise<Object>}
 */
export const loadCartData = (rootScope) =>
  new Promise((resolve) => {
    const scope = rootScope || window.AppModule.RootScope;

    /*
   When the API is used a $Broadcast is sent to CartService_GetCartSuccess/CartService_GetCartFailed
   We need to watch for this broadcast before making the API call so we can handle the response
  */
    const broadcastListener = scope.$on('CartService_GetCartSuccess', (event, data) => {
      resolve(data);

      // De-register broadcast listener once we have the data
      broadcastListener();
    });

    angularContextWrap(() => {
      /*
      Update session hash to a random alphanumeric value before each call

      This is important as the site's caching is very strict and at times flawed.
      If you were to run loadCartData, add another product to cart and then run
      loadCartData again to retrieve the updated data, you will continue to recieve
      the same data as the first call until you refresh the page. Changing the hash
      value of the session is a workaround for this.
    */
      scope.$apply(() => {
        scope.Session.Hash.Session = `${Math.random().toString(36).substr(2)}`;
      });

      // Make the request to the API
      window.CartServiceModule.CartService.prototype.GetCart();
    });
  });

/**
 * Helper to extract all cart products from the loadCartData response
 * as they are split by campaign in the original response
 * @param {Object} cartData Cart data returned from loadCartData
 * @returns {Array.<Object>}
 */
export const getProductsFromCartData = (cartData) => {
  const allProducts = [];

  // Push each product from the campaigns to allProducts array
  cartData.Campaigns.forEach((campaign) => {
    const { Products } = campaign;
    Products.forEach((product) => allProducts.push(product));
  });

  return allProducts;
};

/**
 * Finds out if a product is sample or not by checking the category name
 * @param {Object} productScope Product scope object. Contains price, qty, variants etc.
 *  Can be retrieved from .scope() on certain pages, by retrieving the cart data or by
 *  loading product data (see loadProductData func)
 * @returns {Boolean}
 */
export const productIsSample = (productScope) => productScope?.Categories[0]?.Level2?.Name.toLowerCase() === 'sample shop';

/**
 * 
 * Get the name of the product category
 * @param {Object} productScope Product scope object. Contains price, qty, variants etc.
 *  Can be retrieved from .scope() on certain pages, by retrieving the cart data or by
 *  loading product data (see loadProductData func)
 * @returns {String}
 */
export const getProductCategory = (productScope) => productScope?.Categories[0]?.PDept?.Name;

/**
 * Returns a promise that resolves with the sample products in the cart
 * @returns {Promise<Array>}
 */
export const getSamplesInCart = () =>
  new Promise((resolve, reject) => {
    loadCartData()
      .then((cartData) => {
        const cartProducts = getProductsFromCartData(cartData);
        const sampleProducts = cartProducts.filter((product) => productIsSample(product));
        resolve(sampleProducts);
      })
      .catch(reject);
  });

/**
 * Make API request to retrieve promo data (including products)
 * Returns a promise that resolves with promo data if available
 * @param {String} promoId
 * @returns {Promise<Object>}
 */
export const requestPromoData = (promoId) =>
  new Promise((resolve, reject) => {
    const promoUrl = `/api/specialoffersapi/getdetails?promotionId=${promoId}`;
    window.BaseService.prototype.GetJson(promoUrl, 0, !1).then(resolve, reject);
  });

/**
 * Add a product to the cart
 * @param {String} sku
 * @param {Number} quantity
 * @param {Number} customCampaign A custom campaign number
 * If none is provided it will use the current campaign number
 */
export const addToCart = (sku, quantity, customCampaign) => {
  const qty = quantity || 1;
  const campaign = customCampaign || window.AppModule.RootScope.ShopContext.CampaignNumber;
  window.AppModule.RootScope.AddToCart(sku, qty, campaign);
};

/**
 * Get the current layout name
 * @param {Object} rootScope
 * @returns {String}
 */
export const getLayoutName = (rootScope) => {
  const scope = rootScope || window.AppModule.RootScope;
  return scope.Layout.Name;
};

/**
 * Return the product SKU when on a PDP page
 * @param {Object} rootScope
 * @returns {String}
 */
export const getProductSkuPDP = () => {
  const $productControllerEl = $('[ng-controller="GlobalProductController"]:first');
  if (!$productControllerEl.length) {
    throw new Error('GlobalProductController does not exist');
  } else {
    const scope = $productControllerEl.scope();
    let sku;
    // Is /productdetail page
    if (scope.ViewModel) {
      sku = scope.ViewModel.Product.Id;
    } else {
      sku = scope.ProductDetail.Product.Id;
    }

    return sku;
  }
};

/**
 * Get an Angular template by name
 * @param {String} name Name of the template
 * @returns {String}
 */
export const getTemplate = (name) => {
  const templateScript = document.getElementById(name);
  return templateScript ? templateScript.innerHTML : undefined;
};

/**
 * Replace an existing Angular template with a new one
 * This is performed in two parts. First the template is replaced in
 * the script tag on the page. Second, the template is purged from
 * Angular's $templateCache and replaced with the new one
 * @param {String} name Name of the template
 * @param {String} markup New template markup
 * @param {Function} cb Callback to run once template has been replaced.
 *  Usually makes sense to run angularCompile on an element to force the
 *  new template to load in
 */
export const replaceTemplate = (name, markup, cb) => {
  // Replace template in the DOM
  const templateScript = document.getElementById(name);
  if (templateScript && markup) {
    templateScript.innerHTML = markup;
  }

  // Replace template in the $templateCache
  /* eslint-disable prefer-arrow-callback */
  const $document = $(document);
  $document.injector().invoke([
    '$templateCache',
    '$timeout',
    function invokeInjector($templateCache, $timeout) {
      /*
        $timeout must be used to avoid an error that occurs when $apply or
        $digest is called whilst that service is currently running

        Read more:
        https://code.angularjs.org/1.4.2/docs/error/$rootScope/inprog?p0=$apply
      */
      $timeout(function replaceTemplates() {
        $templateCache.remove(name);
        $templateCache.put(name, markup);

        if (cb && cb instanceof Function) {
          $timeout(function runCallback() {
            cb();
          }, 0);
        }
      }, 0);
    },
  ]);
  /* eslint-enable prefer-arrow-callback */
};

/**
 * Get a product image from an ID
 * The API methods construct a URL from fragments in the Angular scope
 * rather than making any XHR requests
 * @param {String} productId ID of product
 * @param {String} imageNumber Product image number to return, defaults to 1
 * @param {String} size Small, Medium, Large or XtraLarge, defaults to Medium
 * @returns {String} url
 */
export const getProductImage = (productId, imageNumber, size) => {
  /**
   * Get the name of the API method from rootScope.Cdn
   * @returns {String}
   */
  const getSizeMethodName = () => {
    const sizeMethodNames = {
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      xtralarge: 'XtraLarge',
      default: 'Medium',
    };

    return size && sizeMethodNames[size] ? sizeMethodNames[size] : sizeMethodNames.default;
  };

  const CdnService = window.CdnServiceModule.CdnService.prototype;
  const apiMethod = CdnService[`ProductImage${getSizeMethodName()}`].bind(CdnService);
  const callApi = () => apiMethod(productId, imageNumber || '1');

  return callApi();
};

/**
 * Get a product variant image from a product ID and variant ID
 * The API methods construct a URL from fragments in the Angular scope
 * rather than manking any XHR requests
 * @param {String} productId ID of product
 * @param {String} imageNumber Product image number to return, defaults to 1
 * @param {String} size Small, Medium, Large or XtraLarge, defaults to Medium
 * @returns {String} url
 */
export const getProductVariantImage = (productId, variantId) => {
  const rootScope = window.AppModule.RootScope;
  const apiMethod = rootScope.Cdn.VariantImage;
  const callApi = () => apiMethod(productId, variantId);

  return callApi();
};

/**
 * Get the current site language
 * @param {Object} rootScope
 * @returns {string}
 */
export const getLanguage = (rootScope) => {
  const scope = rootScope || window.AppModule.RootScope;
  return scope.ShopContext.Language;
};

/**
 * Get the current market
 * @param {Object} rootScope
 * @returns {string}
 */
export const getMarket = (rootScope) => {
  const scope = rootScope || window.AppModule.RootScope;
  return scope.ShopContext.Market.toLowerCase();
};

/**
 * Returns an object this is a required argument for changing the
 * sort order on PLPs
 * @param {Object} productListSortScope Scope object for sort dropdown
 * @param {Number} sortOrderIndex Index of sort object to retrieve
 * @param {jQuery} jq Can be either jqLite (angular.element) or jQuery
 * @returns {Object}
 */
const getSortOrderObject = (productListSortScope, sortOrderIndex, jq) => {
  const $ = jq || window.angular.element;
  let sortOrderObject;

  $(productListSortScope.$select.items).each((index, item) => {
    if (item?.ProductSortOrder === sortOrderIndex) {
      sortOrderObject = item;
      return false;
    }
  });

  return sortOrderObject;
};

/**
 * Helper to change the sort order of a PLP
 * @param {Number} sortOrderIndex
 * @param {jQuery} jq Can be either jqLite (angular.element) or jQuery
 */
export const changePlpSortBy = (sortOrderIndex, jq) => {
  const $ = jq || window.angular.element;
  const productListSortScope = $('.ProductListSort .select2').scope();
  const sortOrderObject = getSortOrderObject(productListSortScope, sortOrderIndex);
  if (sortOrderObject) productListSortScope.$select.select(sortOrderObject, false);
};
