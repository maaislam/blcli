/**
 * AV013 - Hero Lips PLP
 * AV014 - Hero Lips Search
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import {
  setup,
  getLayoutName,
  share,
  getPageNumber,
} from './services';
import shared from './shared';
import productsData from './products';
import ProductBox from './components/ProductBox/ProductBox';

export default () => {
  setup();
  const { rootScope } = shared;
  const layoutName = getLayoutName();
  let components;
  share({ layoutName });

  /**
   * Create and render all components
   */
  const buildComponents = () => {
    components = productsData.map((productData, i) => new ProductBox(productData, i));
  };

  /**
   * Remove all components from the page
   */
  const removeComponents = () => {
    // Remove any existing components
    components.forEach((component) => {
      const { $component, $mostPopularContainer } = component;
      if ($mostPopularContainer && $mostPopularContainer.length) {
        $mostPopularContainer.remove();
      }

      if ($component && $component.length) {
        $component.remove();
      }
    });
  };

  /**
   * Remove all components from the page then rebuild them
   * Useful for when Angular refreshes and breaks your changes
   */
  const rebuildComponents = () => {
    removeComponents();
    buildComponents();
  };

  /**
   * Return the name of the layout the component was rendered for
   * Used for comparing if the rendered version of the component matches
   * the current layout. If it doesn't you should rebuild the component(s)
   * @returns {string}
   */
  const getComponentBuildLayout = () => components[0].layoutName;

  /**
   * Watch for Angular broadcasts to trigger a rebuild of the experiment
   */
  const bindRebuildEvents = () => {
    // Re-render components on layout or page change
    rootScope.$on('App_LayoutChanged', (e, newLayout) => {
      share({ layoutName: newLayout });

      if (getComponentBuildLayout() !== newLayout) {
        rebuildComponents();
      }
    });

    // Rebuild when page changes back to page 1
    rootScope.$on('ProductListUI.FilteredProducts', () => {
      if (getPageNumber() === 1) {
        setTimeout(rebuildComponents, 500);
      }
    });
  };

  /**
   * Pass an array of product IDs and return a promise which resolves with
   * product data such as price, rating etc,
   * @param {Array.<string>} productIds
   * @returns {Promise}
   */
  const loadProductData = productIds => new Promise((resolve) => {
    // Add an event listener for when products are loaded
    const productsLoadedListener = rootScope.$on('ProductService.ProductsLoadedSuccess', (event, productData) => {
      // Check to see if the response is what we expected
      // If not this was likely triggered by a different set of products loading in
      // Check if Ids of response were all in the the productIds argument
      const isExpectedResponse = productData.length === productIds.length
        && productData.every(data => data.Id && productIds.indexOf(data.Id.toString()) > -1);

      if (isExpectedResponse) {
        resolve(productData);

        // De-register event listener
        productsLoadedListener();
      }
    });

    // Make the request to the API
    window.ProductServiceModule.ProductService.prototype.GetProductsWithIds(productIds);
  });

  /**
   * Extract the relevant data from the response and store it in
   * our products data
   * @param {Array.<object>} responses
   */
  const handleLoadProductDataResponse = (responses) => {
    // Extract data from response
    responses.forEach((apiResponse) => {
      // Find matching object in our products data

      const productData = productsData.filter(data => data.id.toString() === apiResponse.Id.toString())[0];
      if (productData) {
        if (apiResponse.SalePriceFormatted) {
          productData.price = apiResponse.SalePriceFormatted;
          productData.wasPrice = apiResponse.ListPriceFormatted;
        } else {
          productData.price = apiResponse.ListPriceFormatted;
        }

        productData.rating = apiResponse.Rating;
        productData.ratingCount = apiResponse.RatingCount;
      }
    });
  };

  /**
   * Init experiment
   */
  const init = () => {
    const productIds = productsData.map(productData => productData.id);
    loadProductData(productIds).then((response) => {
      handleLoadProductDataResponse(response);
      buildComponents();
      bindRebuildEvents();
    });
  };

  init();
};
