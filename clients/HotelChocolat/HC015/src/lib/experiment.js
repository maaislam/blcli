/**
 * HC015 - Bestsellers on PLP
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, generateBestSellersBanners } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import bestSellersData from './data';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  const page = window.location.pathname;

  /**
   * @desc Add Best Seller Product banner on specific positions
   */
  generateBestSellersBanners(page, bestSellersData);

  /**
   * @desc Change container height every time the product tiles height changes
   */
  observer.connect(document.querySelector('ul#search-result-items li.grid-tile .product-tile'), () => {
    // console.log('SOMETHING HAS CHANGED-------');
    const newHeight = document.querySelector('ul#search-result-items li.grid-tile .product-tile').getAttribute('style');
    const allBanners = document.querySelectorAll(`.${ID}-bestSeller__wrapper`);
    [].forEach.call(allBanners, (banner) => {
      banner.setAttribute('style', newHeight);
    });
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
      // subtree: true,
    },
  });

  /**
   * @desc Observe for changes on results content
   * search-result-content
   */
  observer.connect(document.querySelector('.search-result-content'), () => {
    // console.log('SOMETHING HAS CHANGED-------');
    const allLists = document.querySelectorAll('ul#search-result-items');
    for (let i = 1; i < allLists.length; i += 1) {
      const list = allLists[i];
      const previousList = allLists[0];
      if (!list.classList.contains('list-updated')) {
        const allNewItems = list.querySelectorAll('li.grid-tile');
        [].forEach.call(allNewItems, (item) => {
          // item.setAttribute('style', 'background-color: lightcoral;');
          previousList.insertAdjacentElement('beforeend', item);
        });
        list.classList.add('list-updated');
      }

      // --- Update height of all items
      const newHeight = document.querySelector('ul#search-result-items li.grid-tile .product-tile').getAttribute('style');
      const allTiles = document.querySelectorAll(`li.grid-tile .product-tile`);
      [].forEach.call(allTiles, (tile) => {
        tile.setAttribute('style', newHeight);
      });

      // setTimeout(() => {
        generateBestSellersBanners(page, bestSellersData);
      // }, 500);
      
    }
  }, {
    throttle: 200,
    config: {
      attributes: false,
      childList: true,
      // subtree: true,
    },
  });

  // At end of code, reset window.einstein expect type array
  window.einstein.loaded = [];
};
