import { fullStory, events } from '../../../../lib/utils';


const Experiment = {
  /**
  * @desc Variation settings. Useful for when multiple variations are developed
  * in a single project so you can just toggle the variation number in production
  */
  settings: {
    ID: 'SD061',
    VARIATION: '2',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    // const { components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(settings.ID + settings.VARIATION);

    const searchBar = document.querySelector('.skip-link.skip-search');
    const searchIcon = document.querySelector('#header-search .button');

    searchBar.addEventListener('click', () => {
      events.send(`SD061 Mobile Search v${settings.VARIATION}`, 'Search opened', 'SD061 Search bar opened', { sendOnce: true });
    });
    searchIcon.addEventListener('click', () => {
      events.send(`SD061 Mobile Search v${settings.VARIATION}`, 'Search button click', 'SD061 Search button click', { sendOnce: true });
    });

    if (settings.VARIATION === '1') {
      // create the overlay
      const searchOverlay = document.createElement('div');
      searchOverlay.classList.add('SD061-overlay');
      document.body.appendChild(searchOverlay);

      // overlay click
      searchOverlay.addEventListener('click', () => {
        services.closeSearch();
      });
      searchIcon.addEventListener('click', () => {
        events.send(`SD061 Mobile Search v${settings.VARIATION}`, 'Search button click', 'SD061 Search button click', { sendOnce: true });
      });

      // on click of search show overlay
      searchBar.addEventListener('click', () => {
        if (searchOverlay.classList.contains('SD061-overlay_active')) {
          searchOverlay.classList.remove('SD061-overlay_active');
        } else {
          searchOverlay.classList.add('SD061-overlay_active');
        }
      });
    }

    // add exit on search
    const exitButton = document.createElement('div');
    exitButton.classList.add('SD061-search_exit');
    exitButton.innerHTML = '&times;';
    const headerSearch = document.getElementById('header-search');
    headerSearch.insertBefore(exitButton, headerSearch.firstChild);

    exitButton.addEventListener('click', () => {
      services.closeSearch();
    });
    // VARIATION 2
    if (settings.VARIATION === '2') {
      searchBar.addEventListener('click', () => {
        headerSearch.classList.add('SD061-fullHeight');
      });
    }
  },
  /* put outside functions in here */
  services: {
    /**
    * @desc Inits all page level tracking
    */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
    /**
    * @desc Close search bar function
    */
    closeSearch: function closeSearch() {
      const overlay = document.querySelector('.SD061-overlay.SD061-overlay_active');
      const searchBarTrigger = document.querySelector('.skip-link.skip-search');
      searchBarTrigger.click();
      overlay.classList.remove('SD061-overlay_active');
    },
  },

  components: {},
};

export default Experiment;
