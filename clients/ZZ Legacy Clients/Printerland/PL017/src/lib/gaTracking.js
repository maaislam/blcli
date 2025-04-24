import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import settings from './settings';

export default () => {
  // Products click events
  pollerLite(['.slick-slide'], () => {
    const carouselProducts = document.querySelectorAll('.PL017-recentlyViewed__products .cell');
    if (carouselProducts.length > 0) {
      [].forEach.call(carouselProducts, (product) => {
        const image = product.querySelector('header figure a');
        const title = product.querySelector('hgroup h2 a');
        const viewCta = product.querySelector('.content .my-3 a.btn');
        const productSlideWrapper = product.closest('.slick-slide');
        let productIndex = '';

        if (productSlideWrapper) {
          productIndex = productSlideWrapper.getAttribute('data-slick-index');
        }

        if (image && title && viewCta) {
          image.addEventListener('click', () => {
            events.send(settings.ID, `Variation ${settings.VARIATION} - User Clicked`, `On product image - carousel index: ${productIndex}`, { sendOnce: true });
          });
          title.addEventListener('click', () => {
            events.send(settings.ID, `Variation ${settings.VARIATION} - User Clicked`, `On product title - carousel index: ${productIndex}`, { sendOnce: true });
          });
          viewCta.addEventListener('click', () => {
            events.send(settings.ID, `Variation ${settings.VARIATION} - User Clicked`, `On View CTA button - carousel index: ${productIndex}`, { sendOnce: true });
          });
        }
      });
    }
  });

  // Brands click events
  const brandItems = document.querySelectorAll('.PL017-brands__list li');
  if (brandItems) {
    [].forEach.call(brandItems, (brand) => {
      const viewAllBtn = brand.querySelector('.PL017-brands__viewAllBtn');

      if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
          events.send(settings.ID, `Variation ${settings.VARIATION} - User Clicked`, `On View All button`, { sendOnce: true });
        });
      }
    });
  }
};