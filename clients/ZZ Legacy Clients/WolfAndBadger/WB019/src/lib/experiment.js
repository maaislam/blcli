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

    let innerMarkup = '';

    (window.WB019_data?.items || []).forEach(d => {
      innerMarkup += `
        <h2 class="category-menu">
          <a href="${d.url}" class="heading ${shared.ID}_trackClick">
            ${d.text}
          </a>
        </h2>
      `;
    });

    const panelMarkup = `
      <div class="${shared.ID}_wrapper" id="${shared.ID}_panel">
        <h3 class="${shared.ID}_heading">${window.WB019_data?.element_title}</h3>
        <div class="${shared.ID}_image-wrapper">
          <a href="${window.WB019_data?.main_image_url}">
            <img src="${window.WB019_data?.main_image}" />
          </a>
        </div>
        <div class="sale-categories-menu">
          ${innerMarkup}
        </div>
    `;

    $('.related-products-container').before(panelMarkup);

    $(`.${shared.ID}_trackClick`).click((e) => {
      events.send(shared.ID, 'Category click', e.currentTarget.innerText.trim());
    });
    $(`.${shared.ID}_image-wrapper > a`).click((e) => {
      events.send(shared.ID, 'Banner Click', 'Winter Sale');
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
