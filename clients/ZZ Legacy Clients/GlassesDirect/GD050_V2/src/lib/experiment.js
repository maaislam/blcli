/**
 * GD050 - Home Trial PLP
 * @author User Conversion
 */
import { setup, getHometrialBasketData } from './services';
import SwipeInstructions from './components/SwipeInstructions/SwipeInstructions';
import SwipeCard from './components/SwipeCard/SwipeCard';
import { observer } from '../../../../../lib/uc-lib';
import settings from './settings';
import options from './options';

const activate = () => {
  setup();
  const { ID } = settings;
  const results = document.querySelector('#search-results');
  const hiddenClass = `${ID}--hide`;

  getHometrialBasketData().then((data) => {
    options.hometrialData = data;
  });

  // Create components
  // Banner at top of page
  const swipeInstructions = new SwipeInstructions();

  /**
   * Apply swipe functionaltiy to all products on the page
   */
  const buildSwipeCards = () => {
    const products = document.querySelectorAll('li.product');
    [].forEach.call(products, (product) => {
      if (!product.classList.contains(`${ID}_product--modified`)) {
        product.classList.add(`${ID}_product--modified`);
        // eslint-disable-next-line no-new
        new SwipeCard(product);
      }
    });

    // Update active state of all products
    SwipeCard.initBasketStateAll();
  };

  /**
   * Insert informational banners between products
   */
  const insertBanners = () => {
    const products = results.querySelectorAll('.product');
    if (products.length > 2) {
      // Filter reminder
      if (!document.querySelector(`.${ID}_filterReminder`)) {
        products[2].insertAdjacentHTML('afterend', `
          <li class="${ID}_inGridBanner">
            <div class="${ID}_filterReminder">
              <h4>Not sure which product to choose?</h4>
              <p>Use the filters below to choose your size, shape and colour</p>
            </div>
          </li>
        `);
      }

      // Swipe reminder
      if (!document.querySelector(`.${ID}_swipeReminder`)) {
        products[1].insertAdjacentHTML('afterend', `
          <li class="${ID}_inGridBanner">
            <div class="${ID}_swipeReminder">
              <div class="${ID}_swipeIcon"><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/2680/ab6049f82dee5b0bd4c3458306f43ee2_33_50.png" /></div>
              <p>Swipe right to add frames <br>with a <span class="${ID}_hometrialIcon ${ID}_hometrialIcon--white"></span> to your free hometrial</p>
            </div>
          </li>
        `);
      }
    }
  };

  /** Activate changes */
  const init = () => {
    // Make changes
    buildSwipeCards();
    insertBanners();

    // Remove hidden styling which is applied when hometrial
    // filter is deselected
    if (document.body.classList.contains(hiddenClass)) {
      document.body.classList.remove(hiddenClass);
    }
  };

  // Watch for product list to update
  // Can be triggered by new pages loading in or filters changing
  observer.connect(results, () => {
    // Add swipe card functionality to new products if
    // hometrial filter is selected
    const hometrialFilterActive = document.querySelector('#search-filters #option-compatible-home-trial').classList.contains('option-ticked');
    if (hometrialFilterActive) {
      // Re-apply changes
      init();
    } else if (!document.body.classList.contains(hiddenClass)) {
      // Hide changes
      document.body.classList.add(hiddenClass);
    }
  }, {
    config: { childList: true, subtree: false, attributes: false },
    throttle: 0,
  });

  init();
};

export default activate;
