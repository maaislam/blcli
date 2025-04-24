/**
 * ID - Description
 *
 * WB012 - Add Xmas panel to PDPs. Scroll to panel on product added to basket.
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, events } from '../../../../../lib/utils';
import shared from './shared';

export default () => {
  const runMobileChanges = () => {
    if ($(`.${shared.ID}_wrapper`).length) return;

    // Get base URL and locale URL.
    const localeUrl = document.querySelector('.home-link').getAttribute('href');
    const baseUrl = `https://www.wolfandbadger.com${localeUrl}`;
    const panelMarkup = `
      <div class="${shared.ID}_wrapper" id="${shared.ID}_panel">
        <h3 class="${shared.ID}_heading">Explore the gift shop...</h3>
        <div class="${shared.ID}_image-wrapper">
          <a href="${baseUrl}christmas/">
            <img src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/2620bea8145bd4c4fe994022ed2c58a3_768_434.jpeg" />
          </a>
        </div>
        <div class="christmas-categories-menu">
          <h2 class="category-menu-1">
            <a href="${baseUrl}christmas/#for-for%20her" class="heading ${shared.ID}_trackClick">
              for her
            </a>
          </h2>

          <h2 class="category-menu-2">
            <a href="${baseUrl}christmas/#for-for%20him" class="heading ${shared.ID}_trackClick">
              for him
            </a>
          </h2>

          <h2 class="category-menu-3">
            <a href="${baseUrl}christmas/#for-for%20them" class="heading ${shared.ID}_trackClick">
              for them
            </a>
          </h2>

          <h2 class="category-menu-4">
            <a href="${baseUrl}christmas/#for-beauty" class="heading ${shared.ID}_trackClick">
              beauty
            </a>
          </h2>

          <h2 class="category-menu-5">
            <a href="${baseUrl}christmas/#for-home" class="heading ${shared.ID}_trackClick">
              home
            </a>
          </h2>
        </div>
    `;

    $('.related-products-container').before(panelMarkup);

    $(`.${shared.ID}_trackClick`).click(() => {
      events.send(shared.ID, 'Category click', 'Gift category link clicked');
    });

    $(document).on('productAddedToBasket', () => {
      // Scroll to the Xmas panel
      const panel = document.getElementById(`${shared.ID}_panel`);
      const headerHeight = document.querySelector('.navbar-fixed-top').offsetHeight;
      const topPos = panel.offsetTop - headerHeight - 24; // Offset nav plus add a bit of spacing.

      $('html, body').animate({
        scrollTop: topPos,
      }, {
        duration: 1,
      });
    });
  };

  const init = () => {
    pollerLite([
      '.on-phone',
      '.product-details-container',
    ], () => {
      runMobileChanges();
    });
    setup();
  };

  init();
};
