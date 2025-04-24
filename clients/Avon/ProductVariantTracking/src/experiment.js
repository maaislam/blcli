/**
 * Push a dataLayer event containing product SKUs with variant
 * and category data when a purchase is made
 */
import {
  loadCartData,
  getProductsFromCartData,
  loadProductData,
} from '../../../../lib/utils/avon';

/**
 * Check if the current url matches the supplied url
 * @param {string|RegExp} url
 * @returns {boolean}
 */
const isUrlMatch = (url) => {
  const thisUrl = `${window.location.origin}${window.location.pathname}`;
  return url instanceof RegExp ? url.test(window.location.href) : url === thisUrl;
};

/**
 * Get the page type
 * @returns {string}
 */
const getPageType = () => {
  // Array elements can be either a string or a regex
  const pages = {
    checkout: [
      /\/checkoutmobile(?!\/confirmation)/i,
      /\/checkoutdirectdelivery\/(?!confirmation)/i,
    ],

    confirmation: [
      /\/confirmation\/\d+/i,
    ],
  };

  let thisPageType;
  Object.keys(pages).some((pageType) => {
    const urls = pages[pageType];
    const isPageType = urls.some(isUrlMatch);
    if (isPageType) thisPageType = pageType;
    return isPageType;
  });

  return thisPageType;
};

/**
 * Get a string containing the products in the order
 * @param {Array.<Object>} products Array containing all product objects
 *  This can be retrieved using getProductsFromCartData on the loadCartData response
 * @returns {String} String of all products in the order and their variants
 *  each product is separated by a pipe (|)
 */
const getProductsString = (productsArr) => {
  let productsString = '';

  productsArr.forEach((product) => {
    const { Name, Variants, Category } = product;

    if (Variants && Variants.length) {
      Variants.forEach((variant) => {
        const VariantName = variant.VariantName.trim();
        productsString += `|${Name}${Category ? `-${Category}` : ''}-${VariantName}`;
      });
    } else {
      productsString += `|${Name}${Category ? `-${Category}` : ''}`;
    }
  });

  // Remove first pipe
  productsString = productsString.substr(1);

  return productsString;
};

/**
 * Get the correct function for this stage in the funnel
 * @returns {Function}
 */
const getStageFunction = () => {
  const stageFunctions = {
    checkout: () => {
      loadCartData().then((data) => {
        const products = getProductsFromCartData(data);
        const productIds = products.map(product => product.Id);

        /*
          To find the category we need to load in additional data for
          each product by passing the IDs to loadProductData
          */
        loadProductData(productIds).then((productsData) => {
          /*
            The array in the response isn't guaranteed to be in the same order
            We need to loop through each array item from the response and find the
            matching ID from the products array. Once a match is found we can add the
            category name to the original array item
          */
          productsData.forEach((productData) => {
            products.forEach((product) => {
              if (product.Id && (product.Id === productData.Id) && productData.Dept && productData.Dept.Name) {
                product.Category = productData.Dept.Name;
              }
            });
          });

          // Save product string to local storage
          const productsString = getProductsString(products);
          window.localStorage.UC_cartProducts = productsString;
        });
      });
    },

    confirmation: () => {
      // Push to dataLayer once the order is complete then remove from local storage
      const cartProducts = window.localStorage.UC_cartProducts;
      if (cartProducts) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'UCOrderComplete',
          products: cartProducts,
        });
        window.localStorage.removeItem('UC_cartProducts');
      }
    },

    default: () => {
      // Remove from local storage to prevent any chance of submitting incorrect data
      const cartProducts = window.localStorage.UC_cartProducts;
      if (cartProducts) {
        window.localStorage.removeItem('UC_cartProducts');
      }
    },
  };

  return stageFunctions[getPageType()] || stageFunctions.default;
};

window.waitForApp().then(() => {
  getStageFunction()();
});
