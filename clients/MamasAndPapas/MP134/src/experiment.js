import { fullStory, events } from '../../../../lib/utils';

/**
 * {{MP134}} - {{Mobile Search Results (Product Tiling)}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP134',
    VARIATION: '{{VARIATION}}',
    SCROLLED: false,
  },

  init() {
    // Setup
    /*eslint-disable */
    const { settings, services, components, bindExperimentEvents } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /* eslint-enable */
    const inputSearchBox = document.querySelector('#input_SearchBox');
    if (settings.VARIATION === '1') {
      bindExperimentEvents.searchFieldEvent(inputSearchBox);
    } else if (settings.VARIATION === '2') {
      bindExperimentEvents.searchFieldEvent(inputSearchBox);
      components.createResultTabs();
      components.hideStoresInResults();
      components.hideSearchResultsCatTitles();
      bindExperimentEvents.toggleResultTabs();
    }

    // Scroll Event
    bindExperimentEvents.userScroll();
  },

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

  components: {
    /**
     * @desc Inits all page level tracking
     */
    replaceProductImages() {
      const productResults = document.querySelectorAll('#js_searchProducts .col-xs-12.col-md-4.my-2.js_copy');
      [].forEach.call(productResults, (product) => {
        const imgUrl = product.querySelector('.js_productImage').getAttribute('src');
        const newImgUrl = imgUrl.replace('$productpagethumb$', '$pdpimagemobile$');
        product.querySelector('.js_productImage').setAttribute('src', newImgUrl);

        product.classList.add('col-xs-6');
        product.classList.remove('col-xs-12');

        const productRow = product.querySelector('.row > .col-xs-4');
        if (productRow) {
          productRow.classList.add('col-xs-12');
          productRow.classList.remove('col-xs-4');
        }

        const productTitle = product.querySelector('.row > .col-xs-8.text-left');
        if (productTitle) {
          productTitle.classList.add('col-xs-12');
          productTitle.classList.add('MP134-productTitle');
          productTitle.classList.remove('col-xs-8');
        }
      });
    },
    /**
     * @desc Creates Tabs
     */
    createResultTabs() {
      const tabsWrap = `<div class='MP134-tabsWrapper'>
        <span id='MP134-productsTab' class='MP134-tab active' data-key='js_searchProducts'>Products</span>
        <span id='MP134-storesTab' class='MP134-tab' data-key='js_searchStores'>Stores</span>
      </div>`;

      const searchResultsWrap = document.querySelector('#js_searchFormResults');
      searchResultsWrap.insertAdjacentHTML('afterbegin', tabsWrap);
    },
    /**
     * @desc Hides Stores in results
     */
    hideStoresInResults() {
      document.querySelector('#js_searchStores').classList.add('hidden');
    },
    /**
     * @desc Hides Stores and Products Titles
     */
    hideSearchResultsCatTitles() {
      document.querySelector('#js_storeTitle > h3').style.display = 'none';
      document.querySelector('#js_productTitle > h3').style.display = 'none';
    },
  },

  bindExperimentEvents: {
    /**
     * @desc Search Field Event Listener
     */
    searchFieldEvent(field) {
      const { components, bindExperimentEvents } = Experiment;
      let timeout = null;
      field.addEventListener('keyup', () => {
        clearTimeout(timeout);
        // Make a new timeout set to go off in 500ms
        /*eslint-disable */
        timeout = setTimeout(function () {
          components.replaceProductImages();

          // Adds click event on results number
          bindExperimentEvents.clickOnResultsTotalNumber();
        }, 500);
        /* eslint-enable */
      });
    },
    /**
     * @desc Adds click event on results number
     * Generates click on hidden 'show all' element
     */
    clickOnResultsTotalNumber() {
      const resultsTotal = document.querySelector('#js_productTitle span>span');
      resultsTotal.addEventListener('click', () => {
        document.querySelector('#js_productLink').click();
      });
    },
    /**
     * @desc Toggle Results Tabs
     */
    toggleResultTabs() {
      const tabs = document.querySelectorAll('.MP134-tab');
      [].forEach.call(tabs, (tab) => {
        tab.addEventListener('click', (e) => {
          if (!e.currentTarget.classList.contains('active')) {
            // Remove active class from other tab
            document.querySelector('.MP134-tab.active').classList.remove('active');
            e.currentTarget.classList.add('active');

            const key = e.currentTarget.getAttribute('data-key');
            this.toggleResultsShown(key);
          }
        });
      });
    },
    /**
     * @desc Toggle Results Shown
     */
    toggleResultsShown(key) {
      /*eslint-disable */
      switch(key) {
        case 'js_searchProducts':
          document.querySelector(`#${key}`).classList.remove('hidden');
          document.querySelector('#js_searchStores').classList.add('hidden');
          break;
        case 'js_searchStores':
          document.querySelector(`#${key}`).classList.remove('hidden');
          document.querySelector('#js_searchProducts').classList.add('hidden');
          break;
      }
      /* eslint-enable */
    },
    /**
     * @desc Checks user scroll
     * Sends GA Event when scroll exceeds viewport
     */
    userScroll() {
      const { settings } = Experiment;
      const searchPanel = document.querySelector('.slidePanel_content');
      const windowHeight = window.innerHeight;
      let timeout = null;
      searchPanel.addEventListener('scroll', () => {
        clearTimeout(timeout);
        // Make a new timeout set to go off in 500ms
        /*eslint-disable */
        timeout = setTimeout(function () {
          const amountScrolled = searchPanel.scrollTop;
          if (amountScrolled > windowHeight && settings.SCROLLED === false) {
            events.send(settings.ID, `Variation ${settings.VARIATION}`, `User saw - Scrolled beyond normal viewport`, { sendOnce: true });
            settings.SCROLLED = true;
          }
        }, 500);
        /* eslint-enable */
      });
    },
  },
};

export default Experiment;
