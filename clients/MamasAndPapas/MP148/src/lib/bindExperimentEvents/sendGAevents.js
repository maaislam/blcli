import { events } from '../../../../../../lib/utils';
import settings from '../settings';

export default () => {
  // Clicked - SHOP CTA
  const shopBtn = document.querySelector('a.text-uppercase.px-3.d-none.d-md-inline-block.cursor-pointer.font-size-5.iconShop');
  if (shopBtn) {
    shopBtn.addEventListener('click', () => {
      // send event
      events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - The SHOP button (which opens the menu navigation)`, { sendOnce: true });
    });
  }
  // Clicked - "View All" link
  const viewAllLinks = document.querySelectorAll('.MP148-viewAll__link');
  [].forEach.call(viewAllLinks, (link) => {
    if (link.classList.contains('bottom')) {
      // send bottom link event
      link.addEventListener('click', () => {
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - New "View All" link - Bottom`, { sendOnce: true });
      });
    } else {
      // send top link event
      link.addEventListener('click', () => {
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - New "View All" link - Top`, { sendOnce: true });
      });
    }
  });

  // Clicked - Breadcrumb options
  const breadcrumbs = document.querySelectorAll('.breadcrumb span');
  [].forEach.call(breadcrumbs, (breadcrumb) => {
    breadcrumb.addEventListener('click', () => {
      const title = breadcrumb.querySelector('a');
      if (title) {
        const option = title.innerText;
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Breadcrumb options - "${option}"`, { sendOnce: true });
      }
    });
  });
};