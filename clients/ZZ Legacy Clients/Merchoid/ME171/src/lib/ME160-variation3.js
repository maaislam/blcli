import { fullStory, events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

/**
 * {{ME160}} - {{Scarcity Improvements - Returning User}}
 */
const ME160 = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME160',
    VARIATION: '1',
  },

  init() {
    // Setup
    const { settings, services } = ME160;
    document.body.classList.add(settings.ID);

    const url = window.location.href;
    const data = window.localStorage.ME171 || '{"urls":[]}';
    const scarcityMessageViewed = window.localStorage.ME171messageViewed;
    const parsedData = JSON.parse(data);

    if (window.localStorage.ME171_returningUser && !window.sessionStorage.ME171_returningUser) {
      // User is returning, show '2 sold' message on any urls in localStorage.ME171
      if (parsedData.urls.indexOf(url) > -1) {
        /* Product is one of first 3 products visited
        /* and Returning User scarcity message has not been shown
        */
        if (!scarcityMessageViewed) {
          const scarcityMessageContainer = document.querySelector('.ME159_stock-checker.ME159_loaded-stock');
          if (scarcityMessageContainer) {
            let productTitle = '';
            if (document.querySelector('.product-title-region .mobile-target-product-title')) {
              productTitle = document.querySelector('.product-title-region .mobile-target-product-title').innerText.trim();
            }
            const stockCheckerDiv = document.querySelector('.ME159_stock-checker');
            if (stockCheckerDiv) {
              stockCheckerDiv.style.minHeight = '90px';
            }
            scarcityMessageContainer.querySelector('p.ME159_curr-stock').innerHTML = `Limited Stock! Since you were last here 1 more ${productTitle} has sold`; // eslint-disable-line quotes
            window.localStorage.setItem('ME171messageViewed', true);
            // // GA Event
            // events.send(settings.ID, `Variation ${settings.VARIATION}`, `User Viewed - Returning User Scarcity Message`, { sendOnce: true }); // eslint-disable-line quotes
          }
        }
      }
    } else {
      window.sessionStorage.ME171_returningUser = true;
      window.localStorage.ME171_returningUser = true;

      if (parsedData.urls.length < 10 || parsedData.urls.indexOf(url) > -1) {
        /*
        * If less than 10 products have been visited, run the experiment and
        * add the URL to the dataset
        */
        parsedData.urls.push(url);
        window.localStorage.ME171 = JSON.stringify(parsedData);
      }
    }
  },
};

export default ME160;
