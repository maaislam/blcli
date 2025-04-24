/**
 * AZ004 - Prioritised products on PLP (AV014 iteration)
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import debounce from 'lodash/debounce';
import {
  setup,
  share,
  getPageNumber,
  getPageType,
} from './services';
import ProductBox from './components/ProductBox';
import allProductsData from './data/products';
import {
  getLayoutName,
  loadProductData,
  getProductImage,
} from '../../../../../lib/utils/avon';
import shared from './shared';
import { mergeObjects, group } from '../../../../../lib/utils';

export default () => {
  setup();
  const {
    $,
    ID,
    rootScope,
  } = shared;
  const { Market } = rootScope.ShopContext;
  const layoutName = getLayoutName();
  const productsData = allProductsData?.[Market]?.[getPageType()];
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
   * Set all products to same height as tallest
   */
  const equaliseProductHeights = () => {
    const componentName = `${ID}_ProductBox`;
    const $products = components.reduce(($elements, component) => $elements.add(component.$component), $());
    const isPhone = $('body').hasClass('Layout_Phone');
    const isTablet = $('body').hasClass('Layout_Tablet');
    const columnCount = isPhone ? 1 : 3;
    const $productGroups = $(group($products, columnCount));

    $products.addClass(`${ID}_reset-height`);
    $productGroups.each((groupIndex, productGroup) => {
      const $productGroup = $(productGroup);
      let tallestDetailsHeight = 0;
      let tallesetNameHeight = 0;

      $productGroup.each((index, element) => {
        const $element = $(element);
        const $details = $element.find(`.${componentName}_detailsBlock`);
        const $name = $element.find(`.${componentName}_titleBlock`);

        // Save details height
        if ($details.length) {
          const totalDetailsHeight = $details.outerHeight();
          if (totalDetailsHeight > tallestDetailsHeight) {
            tallestDetailsHeight = totalDetailsHeight;
          }
        }

        // Save name height
        if ($name.length) {
          const totalNameHeight = $name.outerHeight();
          if (totalNameHeight > tallesetNameHeight) {
            tallesetNameHeight = totalNameHeight;
          }
        }
      });

      // Set height
      $productGroup
        .find(`.${componentName}_detailsBlock`)
        .css({ minHeight: tallestDetailsHeight });

      $productGroup
        .find(`.${componentName}_titleBlock`)
        .css({ minHeight: tallesetNameHeight });
    });
    $products.removeClass(`${ID}_reset-height`);
  };

  /**
   * Remove all components from the page then rebuild them
   * Useful for when Angular refreshes and breaks your changes
   */
  const rebuildComponents = () => {
    removeComponents();
    buildComponents();
    equaliseProductHeights();
    setTimeout(equaliseProductHeights, 600);
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

    // Resize products after window resize
    window.addEventListener('resize', debounce(() => {
      equaliseProductHeights();
    }, 250, { trailing: true }));
  };

  /**
   * Extract the relevant data from the response and store it in
   * our products data
   * @param {Array.<object>} responses
   */
  const handleLoadProductDataResponse = (responses) => {
    responses.forEach((apiResponse) => {
      const productData = productsData.filter(data => data.id.toString() === apiResponse.Id.toString())[0];
      if (productData) mergeObjects(productData, apiResponse);
      productData.Img = getProductImage(apiResponse.ProfileNumber);
    });
  };

  /**
   * Init experiment
   */
  const init = () => {
    const productIds = productsData.map(productData => productData.id);
    loadProductData(productIds)
      .then((response) => {
        handleLoadProductDataResponse(response);
        buildComponents();
        equaliseProductHeights();
        setTimeout(equaliseProductHeights, 600);
        bindRebuildEvents();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  init();
};
