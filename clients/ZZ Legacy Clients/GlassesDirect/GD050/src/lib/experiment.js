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

  getHometrialBasketData().then((data) => {
    options.hometrialData = data;
  });

  // Create components
  // Banner at top of page
  const swipeInstructions = new SwipeInstructions();

  /**
   * Apply swipe functionaltiy to all products
   * on the page
   */
  const buildSwipeCards = () => {
    const pages = results.querySelectorAll('.search-product-list');
    for (let i = 0; i < pages.length; i += 1) {
      const page = pages[i];
      if (!page.classList.contains(`${ID}_page--modified`)) {
        page.classList.add(`${ID}_page--modified`);
        const products = page.querySelectorAll('li.product');
        [].forEach.call(products, (product) => {
          // eslint-disable-next-line no-new
          new SwipeCard(product);
        });
      }
    }
  };

  // Init swipe cards
  buildSwipeCards();

  // Watch for more pages loading in
  observer.connect(results, () => {
    // Add swipe card functionality to new products
    buildSwipeCards();

    // Update active state of all products
    SwipeCard.initBasketStateAll();
  }, {
    config: { childList: true, subtree: false, attributes: false },
    throttle: 0,
  });

  // Add in-grid banners
  const products = results.querySelectorAll('.product');
  if (products.length > 2) {
    // Filter reminder
    products[2].insertAdjacentHTML('afterend', `
      <li class="${ID}_inGridBanner">
        <div class="${ID}_filterReminder">
          <h4>Not sure which product to choose?</h4>
          <p>Use the filters below to choose your size, shape and colour</p>
        </div>
      </li>
    `);

    // Swipe reminder
    products[1].insertAdjacentHTML('afterend', `
      <li class="${ID}_inGridBanner">
        <div class="${ID}_swipeReminder">
          <div class="${ID}_swipeIcon"><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/2680/ab6049f82dee5b0bd4c3458306f43ee2_33_50.png" /></div>
          <p>Swipe right to add frames <br>with a <span class="${ID}_hometrialIcon ${ID}_hometrialIcon--white"></span> to your free hometrial</p>
        </div>
      </li>
    `);
  }
};

export default activate;
