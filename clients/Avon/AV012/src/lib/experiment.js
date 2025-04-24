/**
 * AV012 - Daily Mail Promotion
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { pollerLite } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  const { ID } = settings;
  const { angular } = window;
  const rootScope = window.AppModule.RootScope;

  /**
   * Get the device layout name
   * @returns {string}
   */
  const getLayoutName = () => rootScope.Layout.Name.toLowerCase();

  /**
   * Change the product image width
   * @param {string} layout
   */
  const changeGalleryWidth = (layout) => {
    const dependencyElements = [
      '[ng-controller="MediaGalleryController"]',
      '#ProductMediaContainer',
    ];
    const change = () => {
      const layoutWidths = {
        desktop: '400px',
        tablet: '400px',
      };
      const carouselWidth = layoutWidths[layout];
      if (carouselWidth) {
        const $mediaGallery = angular.element('[ng-controller="MediaGalleryController"]');
        const $mediaGalleryContainer = angular.element('#ProductMediaContainer');
        const mediaGalleryScope = $mediaGallery.scope();

        // Update width
        pollerLite([() => !!mediaGalleryScope.Carousel], () => {
          $mediaGalleryContainer.css('width', carouselWidth);
          mediaGalleryScope.Carousel.trigger('update');
        });
      }
    };

    pollerLite(dependencyElements, change);
  };

  /**
   * Separate the brand and product name
   */
  const changeTitle = () => {
    const dependencyElements = [
      '#ProductNameAndRating .ProductName',
    ];
    const change = () => {
      const template = `<div class="${ID}_titleBrand">mark.</div><div class="${ID}_titleName">Epic Lip Powder Pen</div>`;

      const $productName = angular.element('#ProductNameAndRating .ProductName');
      if (!$productName.find(`.${ID}_titleBrand`).length) {
        $productName.html(template);
      }
    };

    pollerLite(dependencyElements, change);
  };

  /**
   * Add a new savings row to the price info
   */
  const addSavings = () => {
    const dependencyElements = [
      '#ProductDetails .Prices',
    ];
    const change = () => {
      const template = `<div class="${ID}_savings">Save <em>25%</em> on this product</div>`;

      const $prices = angular.element('#ProductDetails .Prices');
      if (!$prices.find(`.${ID}_savings`).length) {
        $prices.append(template);
      }
    };

    pollerLite(dependencyElements, change);
  };

  /**
   * Add a bulleted list to product description
   */
  const addUvpList = () => {
    const dependencyElements = [
      '#ProductDetails',
    ];
    const change = () => {
      const template = `
        <ul class="${ID}_uvpList">
          <li>Bold, Light, Precise</li>
          <li>Creamy Matte Colour</li>
          <li>Lightweight Feel</li>
        </ul>
      `;

      const $productDetails = angular.element('#ProductDetails');
      if (!$productDetails.find(`.${ID}_uvpList`).length) {
        $productDetails.find('.Prices').after(template);
      }
    };

    pollerLite(dependencyElements, change);
  };

  /**
   * Move AV005 delivery messaging to beside add to bag
   */
  const moveDeliveryMessaging = () => {
    const dependencyElements = [
      '.AV005_DeliveryMessaging',
      '#ProductDetails .ProductActions .AddToCart.FormField',
    ];
    const change = () => {
      const $deliveryMessaging = angular.element('.AV005_DeliveryMessaging');
      const $addToCart = angular.element('#ProductDetails .ProductActions .AddToCart.FormField');
      $addToCart.append($deliveryMessaging);
    };

    pollerLite(dependencyElements, change);
  };

  /**
   * Make all changes
   */
  const init = () => {
    const layout = getLayoutName();

    changeGalleryWidth(layout);
    changeTitle();
    addSavings();
    addUvpList();
    moveDeliveryMessaging();
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', init);

  init();
};

export default activate;
