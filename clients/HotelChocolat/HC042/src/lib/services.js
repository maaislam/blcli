import { events, fullStory } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);
};

export const generateSavedProductsElements = () => {
  const { ID, VARIATION } = shared;

  const savedProductsTab = `<div class="${ID}-tab__close mobile">
    <div class="close-icon"></div>
  </div>
  <div class="${ID}-savedItems__wrapper show" >
    <div class="${ID}-savedItems__container">
      <div class="${ID}-savedItems__content">
        <div class="icon"></div>
        <div class="label-text">Recently Viewed</div>
      </div>
    </div>
  <div>`;

  if (!document.querySelector(`.${ID}-savedItems__wrapper`)) {
    document.querySelector('#main').insertAdjacentHTML('beforebegin', savedProductsTab);


    /**
     * @desc ON MOBILE - When the user clicks on 'X' 
     * then hide RECENTLY VIEWED tab and do not show
     */
    if (document.querySelector(`.${ID}-tab__close.mobile`)) {
      document.querySelector(`.${ID}-tab__close.mobile .close-icon`).addEventListener('click', (e) => {
        sessionStorage.setItem(`${ID}-recentlyViewed-removed`, true);
        document.querySelector(`.${ID}-savedItems__wrapper`).setAttribute('style', 'display: none !important;');
        document.querySelector(`.${ID}-tab__close.mobile`).setAttribute('style', 'display: none !important;');
        
        events.send(`${ID}`, 'Clicked', 'Close - Mobile Tab');
      });
    }
  }

  const savedProductsList = `<div class="${ID}-savedItemsList__wrapper hidden v${VARIATION}">
    <div class="${ID}-savedItemsList__overlay"></div>
    <div class="${ID}-savedItemsList__container">
      <div class="${ID}-header__wrapper">
        <div class="${ID}-closeIcon"></div>
        <h2>Recently Viewed</h2>
      </div>
      <div class="${ID}-content">
        <ul class="${ID}-savedItemsList v${VARIATION}"></ul>
      </div>
      <div class="${ID}-clearAll__wrapper">
        <div class="${ID}-clearAll__cta">Clear All</div>
      </div>
    </div>
  </div>`;
  const savedItemsTab = document.querySelector(`.${ID}-savedItems__wrapper`);
  // savedItemsTab.insertAdjacentHTML('beforebegin', savedProductsList);
  if (!document.querySelector(`.${ID}-savedItemsList__wrapper`)) {
    document.querySelector('#main').insertAdjacentHTML('beforebegin', savedProductsList);

    const savedItemsList = document.querySelector(`.${ID}-savedItemsList__wrapper`);
    savedItemsTab.addEventListener('click', (e) => {
      savedItemsList.classList.toggle('hidden');
      if (savedItemsList.classList.contains('hidden')) {
        document.querySelector('body').setAttribute('style', 'overflow: visible;');
      } else {
        document.querySelector('body').setAttribute('style', 'overflow: hidden;');
        // events.send(`${ID} variation:${VARIATION}`, 'click', 'Saved products list');
      }

      events.send(`${ID}`, 'Clicked', 'Open - Recently Viewed');
      /**
       * @desc Saved Products List DOES NOT contain hidden
       * Shows the Saved list lightbox -------------------
       * and updates the content -------------------------
       */
      updateSavedItemsContent(savedItemsList);


      /**
       * @desc Clear All Recently Viewed Products
       * and update experiment
       */
      clearAllProducts(savedItemsList);

    });

    /**
     * @desc Show/Hide 'Saved Products' list
     */
    savedItemsList.querySelector(`.${ID}-savedItemsList__overlay`).addEventListener('click', (e) => {
      savedItemsList.classList.toggle('hidden');
      if (savedItemsList.classList.contains('hidden')) {
        document.querySelector('body').setAttribute('style', 'overflow: visible;');
      } else {
        document.querySelector('body').setAttribute('style', 'overflow: hidden;');
      }
    });
    document.querySelector(`.${ID}-closeIcon`).addEventListener('click', (e) => {
      savedItemsList.classList.toggle('hidden');
      if (savedItemsList.classList.contains('hidden')) {
        document.querySelector('body').setAttribute('style', 'overflow: visible;');
      } else {
        document.querySelector('body').setAttribute('style', 'overflow: hidden;');
      }
    });
  }
  


  
};


export const updateSavedItemsContent = (savedItemsList) => {
  const { ID, VARIATION } = shared;
  let savedItems = {};

  if (!savedItemsList.classList.contains('hidden')) {
    if (JSON.parse(sessionStorage.getItem(`${ID}-saved-products`)) !== null) {
      savedItems = JSON.parse(sessionStorage.getItem(`${ID}-saved-products`));
      let listItems = '';
      const keys = Object.keys(savedItems);


      /**
       * @desc Reverse order of products in Object
       * to show lastly added first etc.
       */
      Object.keys(savedItems).reverse()
        .forEach(function(index) {
            const item = savedItems[index];
            let productTitle = item.title;
            
            if (productTitle.length > 30) {
              const length = 30;
              const trimmedString = productTitle.substring(0, length);
              productTitle = `${trimmedString}...`;
            }
            let device = '';
            if (window.innerWidth <= 420) {
              device = 'mobile';
            }

            listItems += `<li class="${ID}-product__wrapper ${ID}-product__wrapper-v${VARIATION} ${device}">
              <div class="${ID}-closeIcon__remove" data-to-remove="${item.url}"></div>
              <div class="${ID}-productImg__wrapper">
                <a href="${item.url}"><img src="${item.img}"/></a>
              </div>
              <div class="${ID}-productTitle__wrapper">
                <a href="${item.url}">
                  <p>${productTitle}</p>
                  <div class="${ID}-productPrice__wrapper">
                    ${item["price"]}
                  </div>
                </a>
              </div>
              
            </li>`;

        });

        if (Object.keys(savedItems).length > 0 
        && Object.keys(savedItems).length == 1) {
          listItems += `<li class="${ID}-product__wrapper" style="visibility:hidden !important;"></li>`;
        }

      document.querySelector(`.${ID}-savedItemsList`).innerHTML = listItems;

      const allRecentlyViewedProducts = document.querySelectorAll(`.${ID}-product__wrapper`);
      [].forEach.call(allRecentlyViewedProducts, (prod) => {
        prod.addEventListener('click', (e) => {
          events.send(`${ID}`, 'Clicked', 'Product - On Recently Viewed');
        });
      });
      
    }

  }
};


export const clearAllProducts = (savedItemsList) => {
  const { ID, VARIATION } = shared;

  const clearAllCTA = document.querySelector(`.${ID}-clearAll__cta`);
  if (clearAllCTA) {
    clearAllCTA.addEventListener('click', (e) => {
      sessionStorage.removeItem(`${ID}-saved-products`);

      // --- REMOVE ALL PRODUCTS
      document.querySelector(`.${ID}-savedItemsList`).innerHTML = '';
      savedItemsList.classList.add('hidden');

      // --- HIDE RECENTLY VIEWED TAB
      document.querySelector(`.${ID}-savedItems__wrapper`).classList.remove('show');
      document.querySelector(`.${ID}-savedItems__wrapper`).classList.add('hide');

      // --- MAKE BODY SCROLLABLE AGAIN
      document.querySelector('body').setAttribute('style', 'overflow: visible;');

      // --- IF ON MOBILE - HIDE 'X'
      if (document.querySelector(`.${ID}-tab__close.mobile`)) {
        document.querySelector(`.${ID}-tab__close.mobile`).setAttribute('style', 'display: none !important;');
      }
    });
  }
};
