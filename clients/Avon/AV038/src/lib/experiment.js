/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import BadgeDiscount from './components/BadgeDiscount/BadgeDiscount';

export default () => {
  setup();
  const { rootScope, ID } = shared;
  const $productList = $('.ProductList');

  /**
   * Remove any pre-existing discount badges
   * @param {jQuery} $product
   */
  const removeExistingDiscountBadges = ($product) => {
    const $badges = $product.find('.product-badge');
    $badges.each((badgeIndex, badgeElement) => {
      const $badge = $(badgeElement);
      const isPercentageDiscount = /^\d+%\sOFF$/i.test($badge.text().trim());
      if (isPercentageDiscount) {
        $badge.remove();
      }
    });
  };


  /** Make all changes */
  const init = () => {
    $productList.find('.ProductListCell').each((index, element) => {
      // if (index > 1) return;
      const $product = $(element);
      removeExistingDiscountBadges($product);

      const hasDiscountBadge = $product.find(`.${ID}_BadgeDiscount`).length > 0;
      if (!hasDiscountBadge) {
        new BadgeDiscount($product);
      }
    });
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });

  // Re-run changes on product list change
  rootScope.$on('ProductListUI.FilteredProduct', () => {
    setTimeout(init, 500);
  });

  init();
};
