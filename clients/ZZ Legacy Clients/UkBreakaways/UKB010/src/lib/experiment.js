/**
 * UKB010 - Increase Recently Viewed (Homepage)
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import getItineraryData from './getItineraryData';

const activate = () => {
  const device = document.documentElement.clientWidth > 500 ? 'desktop' : 'mobile';

  // Experiment code
  /**
   * @desc Check for Returning User
   */
  if (localStorage.getItem("UKB010-returningUser") !== null && sessionStorage.getItem("UKB010-returningUser") === null) {
    /**
     * ///////////// Returning user //////////////
     */
    // Homepage
    if (window.location.pathname === "/") {
      setup();
      const recentlyViewedProducts = document.querySelector('.tmspslot .inspire-masterblock');
      const recentlyViewedContainer = document.querySelector('div[data-mid="10191"]');
      if (recentlyViewedContainer) {
        if (device === 'desktop') {
          document.querySelector('.content').insertAdjacentElement('beforebegin', recentlyViewedContainer);
        } else {
          document.querySelector('.search-panel.home.content').insertAdjacentElement('afterend', recentlyViewedContainer);
        }  
      }

      if (localStorage.getItem('UKB010-visitedItineraries')) {
        const recentlyViewedItineraries = JSON.parse(localStorage.getItem('UKB010-visitedItineraries'));

        const suggestions = recentlyViewedContainer.querySelectorAll('.column1');
        if (suggestions.length > 0) {
          [].forEach.call(suggestions, (item) => {
            const name = item.querySelector('a p.productName').innerText.trim();
            if (recentlyViewedItineraries.indexOf(name) > -1) {
              const recentlyViewedBadge = `<div class="UKB010-recentlyViewed__wrapper">
                <div class="UKB010-recentlyViewed">Recently Viewed</div>
              </div>`;
              item.insertAdjacentHTML('afterbegin', recentlyViewedBadge);
            }
          });
        }
      }
    // Itinerary Page
    } else if (window.location.pathname.indexOf("/itineraries/") > -1) {
      getItineraryData();
    }
  } else {
    /**
     * ///////////// First Visit on page //////////////
     */
    if (window.location.pathname.indexOf("/itineraries/") > -1) {
      getItineraryData();
      localStorage.setItem("UKB010-returningUser", true);
      sessionStorage.setItem("UKB010-returningUser", true);
    }
  }
  
  
};

export default activate;
