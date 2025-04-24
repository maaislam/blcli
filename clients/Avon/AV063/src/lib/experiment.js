/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import {ProductIds, ProductOffers} from './products';
import { pollerLite } from '../../../../../lib/utils';
import { throttle } from '../../../../../lib/uc-lib';

export default () => {
  setup();
  const { rootScope, ID, pageType } = shared;

  // Helpers.
  const productIdMatched = () => {
    const url = window.location.href;
    if (url.indexOf('/product/') === -1) return false;

    // Split up URL into parts, third array item is the ID.
    let urlProductId = url.match(/.*\/(.*)\/(.*)\/(.*)$/);
    if (!urlProductId.length || urlProductId.length < 3) return false;
    urlProductId = parseInt(urlProductId[2], 10);

    return ProductIds.indexOf(urlProductId) !== -1 ? urlProductId : false;
  };

  // Check whether any of the products on a list page are in our offers list.
  const matchProductsOnPage = () => {
    const productsList = document.querySelectorAll('a.ProductName');

    if (productsList && productsList.length > 0) {
      const matched = [];

      productsList.forEach((item) => {
        // Split up URL into parts, third array item is the ID.
        const href = item.getAttribute('href');
        let urlProductId = href.match(/.*\/(.*)\/(.*)\/(.*)$/);
        if (urlProductId.length && urlProductId.length > 2) {
          urlProductId = parseInt(urlProductId[2], 10);
          if (ProductIds.indexOf(urlProductId) !== -1) matched.push(urlProductId);
        }
      });

      return matched.length > 0 ? matched : false;
    }

    return false;
  };

  const addListPageBadges = () => {
    // Check whether any products have matched.
    const matchedProductIds = matchProductsOnPage();
    if (!matchedProductIds) return;

    // Add a badge after the price of each matched element.
    matchedProductIds.forEach((id) => {
      const $price = $(`a.ProductName[href*="${id}"]`);

      // Add badge (unless already exists)
      if ($price.siblings(`.${ID}_badge`).length < 1) {
        $price.siblings('.Prices').after(`
          <div class="${ID}_badge">Black Friday</div>
        `);
      }
    });
  };

  const addDetailsPageBadges = () => {
    const matchedId = productIdMatched();
    if (!matchedId) return false;

    const $price = $('.ProductDetail .Details .Row').first();
    if ($price.siblings(`.${ID}_badge`).length > 0) return false;

    // Add Black Friday badge below the price.
    $price.after(`
      <div class="${ID}_badge">Black Friday</div>
    `);

    // Add Worth badge above the image,
    const productData = ProductOffers[matchedId];
    if (productData.offerType === 'worth') {
      const worthBadge = `
        <div class="${ID}_badge ${ID}_badgeWorth">Worth ${productData.offerValue}</div>
      `;
      $('.PdpImageDesktop').prepend(worthBadge);
      $('.PdpImageMobile').prepend(worthBadge);
    }
  };

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    if (pageType === 'PLP' || pageType === 'SRP') addListPageBadges();
    else {
      pollerLite(
        ['.ProductDetail .Details'],
        () => addDetailsPageBadges(),
      );

      /*
        Re-run this when browser is resized to simulate layout change check.
      */
      const throttledInit = throttle(addDetailsPageBadges, 1500);
      $(window).resize(throttledInit);
    }
  };

  // Re-run when products are filtered (PLPs)
  rootScope.$on('ProductListUI.FilteringFinished', () => {
    setTimeout(init, 500);
  });

  init();
};
