/**
 * AV009 - PLP Colour Options
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

/**
 * Run experiment
 * @param {object} data
 */
const activate = (data) => {
  setup();

  const { ID } = settings;
  const { category } = data;
  const rootScope = window.AppModule.RootScope;
  const $ = window.angular.element;
  const $productList = $('.ProductList');

  /**
   * Get all existing products
   * @returns {jQuery}
   */
  const getProducts = () => $productList.find('.ProductListItem');

  /**
   * Make changes to product
   */
  const makeProductChanges = (index, product) => {
    const $product = $(product);
    if (!$product.hasClass(`${ID}_productModified`)) {
      $product.addClass(`${ID}_productModified`);
      const $cta = $product.find('a.Button');
      const $ctaText = $cta.find('span');
      const ctaText = $ctaText.text().toLowerCase();

      if (ctaText === 'view product') {
        // Replace CTA text
        switch (category) {
          case 'lips':
          case 'nails':
            $ctaText.text('View colour options');
            break;

          case 'face':
          case 'eyes':
            $ctaText.text('View shade options');
            break;

          default:
            break;
        }

        // Add badging
        const $img = $product.find('.ProductImage');
        if (!$img.find(`.${ID}_badging`).length) {
          $img.prepend(`<div class="${ID}_badging">More Colours Available</div>`);
        }

        // Tracking
        $cta.click(() => {
          events.send(ID, 'View Colour Options Click', category);
        });
      }
    }
  };

  /**
   * Make all changes
   */
  const init = () => {
    const $products = getProducts();
    $products.each(makeProductChanges);
  };

  // Re-evaluate changes on layout size change as they may be removed
  rootScope.$on('App_LayoutChanged', init);

  // Re-evaluate changes on changes to the product list elements
  observer.connect($productList, init, {
    config: { attributes: false, subtree: false, childList: true },
    throttle: 0,
  });

  init();
};

export default activate;
