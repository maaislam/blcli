import { fullStory, events } from '../../../../lib/utils';
import { poller, observer } from '../../../../lib/uc-lib';

/**
 * MP112 store finder
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP112',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // -------------------------------------------------
    // Setup
    // -------------------------------------------------
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(settings.ID + '-v' + settings.VARIATION);

    const addToCartButton = document.querySelector('#addToCartForm .addToCartButton');
    if(addToCartButton) {
      addToCartButton.addEventListener('click', () => {
        events.send('MP112', 'did-click-add-to-cart');
      });
    }

    if(settings.VARIATION === 2) {
      // V2 is only the CSS amends
      
      return;
    }

    // -------------------------------------------------
    // Click and collect interface
    //
    // On loaded, poll for the existence of the elements
    // we need to work with within the interface
    // -------------------------------------------------
    const pickupInStoreButton = document.querySelector('.pickupInStoreBtn');
    if(pickupInStoreButton) {
      pickupInStoreButton.addEventListener('click', () => {
        events.send('MP112', 'did-click-find-in-store');

        poller([
          'form[name=pickupInStoreForm]',
          '#pickup_store_results',
        ], () => {
          Experiment.amendClickAndCollect();
        });
      });
    }
  },

  /**
   * Entry point for modifying click and collect
   */
  amendClickAndCollect() {
    // -------------------------------------------------
    // UI on interface load
    // -------------------------------------------------
    const searchBtn = document.querySelector('form[name=pickupInStoreForm] .storepick #pickupstore_search_button');
    const controlsArea = document.querySelector('.storepick .control-group .controls');

    if(searchBtn) {
      controlsArea.insertAdjacentElement('beforeend', searchBtn);

      searchBtn.addEventListener('click', () => {
        events.send('MP112', 'did-click-find-stores-button');
      });
    }
      
    // ------------------------------------
    // Icon for stores near me
    // ------------------------------------
    const storesNearMeMsg = document.querySelector('.MP112-icon.ico.ico-mapPointer');
    if (!storesNearMeMsg) {
      const nearMeBtn = document.querySelector('#find_pickupStoresNearMe_button');
      nearMeBtn.insertAdjacentHTML('beforebegin', '<i class="MP112-icon ico ico-mapPointer"></i><strong>FIND STORES NEAR ME</strong>');
    }

    // -------------------------------------------------
    // Add product image to title
    // -------------------------------------------------
    Experiment.addProductImage();
    
    // -------------------------------------------------
    // Connect an observer to the search results listing
    // -------------------------------------------------
    const results = document.querySelector('#pickup_store_results') ;
    observer.connect([
      document.querySelector('#pickup_store_results')
    ], () => {
      Experiment.onStoreSearch();
    }, {
      clildList: true,
      attributes: false  
    });
  },

  /**
   * Handle search results changed
   */
  onStoreSearch() {
    Experiment.countResults();
    Experiment.amendStoreBoxUi();
  },

  /**
   * Moving elements
   */
  amendStoreBoxUi() {
    const storeItems = document.querySelectorAll('#pickup_store_results .storeFinder');
    [].forEach.call(storeItems, (item, idx) => {
      const title = item.querySelector('.storeFinder_title');
      const distanceDiv = item.querySelector('.storeFinder_distance');

      // ------------------------------------
      // Move title up
      // ------------------------------------
      if(title && distanceDiv) {
        title.insertAdjacentElement('afterend', distanceDiv);
      }
      
      // ------------------------------------
      // Collect in store
      // ------------------------------------
      const collectIn = item.querySelector('.collect-in');
      const form = item.querySelector('.add_to_cart_storepickup_form');
      if(form && collectIn) {
        form.insertAdjacentElement('beforebegin', collectIn);

        form.parentNode.classList.remove('my-3');
      }
      
      // ------------------------------------
      // Event listeners
      // ------------------------------------
      const collectBtn = item.querySelector('.pickup_add_to_bag_instore_button');
      if(collectBtn) {
        collectBtn.addEventListener('click', () => {
          events.send('MP112', 'did-click-collect-here', idx);
        });
      }
    });
  },

  /**
   * Add product image
   */
  addProductImage() {
    const pageImage = document.querySelector('#js-desktopImageContainer img');
    if(pageImage) {
      const imageSrc = pageImage.getAttribute('src');
      if(imageSrc) {
        const storeSearchProductTitle = document.querySelector('#cboxContent .storeFinder h2.detail-product');
        if(storeSearchProductTitle) {
          const titleText = storeSearchProductTitle.textContent.trim();

          storeSearchProductTitle.insertAdjacentHTML('afterbegin', `
            <img src="${imageSrc}" alt="${titleText}" title="${titleText}" />
          `);
        }
      }
    }
  },

  /**
   * Count store search results
   */
  countResults() {
    const storeItems = document.querySelectorAll('#pickup_store_results .storeFinder');
    const numResults = storeItems.length;

    const storepick = document.querySelector('form[name=pickupInStoreForm] .storepick');
    const resultsDiv = document.querySelector('.mp112-num-results');

    if(resultsDiv) {
      resultsDiv.innerHTML = `${numResults} store results for your item:`;
    } else {
      storepick.insertAdjacentHTML('afterend', `
        <div class="mp112-num-results">
          ${numResults} store results for your item:
        </div>
      `);
    }

    return numResults;
  },

  /**
   * Helpers
   */
  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {},
};

export default Experiment;
