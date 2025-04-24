import { fullStory, events, getUrlParameter } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{NH041}} - {{0 Search Results}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH041',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    /*eslint-disable */
    const { settings, services, components, bindExperimentEvents } = Experiment;
    services.tracking();
    /* eslint-enable */

    const url = window.location.href;

    // Gets search results count from page
    const resultsCount = document.querySelector('.search-options > .matching-results > strong').innerText;

    if (url.indexOf('s=') > -1 && resultsCount && resultsCount === '0') {
      // Gets searched term text
      // const searchString = services.getSearchedTerm(url);

      const string = getUrlParameter('s', url);
      // const urlRedirect = url.replace(searchString, '');
      let searchedUrl = window.location.search;
      let redirect = '';
      const host = document.location.host;
      if (searchedUrl.indexOf('?s=') > -1) {
        searchedUrl = searchedUrl.replace('?', '');
        searchedUrl = searchedUrl.replace(`s=${string}`, '');
        redirect = `https://${host}/search-results?${searchedUrl}`;
      } else if (searchedUrl.indexOf('&s=') > -1) {
        searchedUrl = searchedUrl.replace('&', '');
        searchedUrl = searchedUrl.replace(`&s=${string}`, '');
        redirect = `https://${host}/search-results${searchedUrl}`;
      }
      // Hides Search Page Content
      components.hideSearchPageContent();
      // Creates loader
      components.createLoader();

      // Creates sessionStorage Item
      /*eslint-disable */
      const noResultsItem = {
        'url': `${url}`,
        'searchTerm': `${string}`,
      };
      // Adds body class
      document.body.classList.add(settings.ID);
      // Redirects to new page after 2 seconds
      setTimeout(function(){
        sessionStorage.setItem('NH041-noSearchResults',  JSON.stringify(noResultsItem));
        window.location.href = redirect;
      }, 2000);
      /* eslint-enable */
    } else if (sessionStorage.getItem('NH041-noSearchResults')) {
      pollerLite(['.NH015', '.nh15-new-filter'], () => {
        const searchedUrl = window.location.search.replace('?', '');
        // GA Event
        bindExperimentEvents.userRedirectedFromZeroResultsPage();
        // Gets sessionStorage Data
        const data = JSON.parse(sessionStorage.getItem('NH041-noSearchResults'));
        const searchUrl = data.url;
        const searchedTerm = data.searchTerm;

        /**
         * @desc Checks if url stored in sessionStorage contains current url search
         */
        if (searchUrl.indexOf(`${searchedUrl}`) > -1) {
          // Create No Results Message
          components.createNoResultsMessage(searchedTerm);

          // Get number of results and add it on the left side
          components.createTotalNumberOfResults();
        } else if (searchUrl.indexOf(`${searchedTerm}`) > -1) {
          components.createNoResultsMessage(searchedTerm);
          components.createTotalNumberOfResults();
        }
        // Delete Item from sessionStorage
        sessionStorage.removeItem('NH041-noSearchResults');
        // Adds body class
        document.body.classList.add(settings.ID);
        // GA Event - User Clicked on CTA buttons
        bindExperimentEvents.userClickedOnCtaButtons();
      });
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.setTrackerName('tracker2');
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /**
     * @desc Get searched term
     */
    getSearchedTerm(url) {
      return url.substring(
        url.lastIndexOf('?s=') + 1,
        url.indexOf('&'),
      );
    },
  },

  components: {
    /**
     * @desc Hides Content
     */
    hideSearchPageContent() {
      document.querySelector('.content.search-content').classList.add('hide');
    },
    /**
     * @desc Adds Loader
     */
    createLoader() {
      const loaderWrapper = `<div class='NH041-loaderWrapper'></div>`; // eslint-disable-line quotes
      document.querySelector('body').insertAdjacentHTML('beforeend', loaderWrapper);
    },
    /**
     * @desc New No Results Message
     */
    createNoResultsMessage(searchedTerm) {
      const noResultsMessageContainer = `<div class='NH041-container container' style="text-align: center;">
        <h1 style="font-size: 22px;">
        <span>Sorry, no results for ${searchedTerm} were found</span></h1>
        <p style="display: block; font-size:18px;width: 50%;margin: auto;line-height:  30px;">To help with your search, here's a selection of our upcoming breaks. You can filter the results to find what you're looking for here.</p>
      </div>`;
      const searchAgainContainer = document.querySelector('.search-again');
      searchAgainContainer.insertAdjacentHTML('afterend', noResultsMessageContainer);
    },
    /**
     * @desc New Total Results Container
     */
    createTotalNumberOfResults() {
      const numberOfResults = document.querySelector('.search-options > .matching-results > strong').innerText;
      const totalResultsContainer = `<div class='NH041-totalResultsWrapper'>
        <div class='NH041-totalResults'>${numberOfResults} results</div>
      </div>`;

      document.querySelector('aside.nh15-new-filter').insertAdjacentHTML('beforebegin', totalResultsContainer);
    },
  },

  bindExperimentEvents: {
    /**
     * @desc GA Event - User Redirected
     */
    userRedirectedFromZeroResultsPage() {
      const { settings } = Experiment;
      events.send(settings.ID, `Variation ${settings.VARIATION}`, `Experiment Ran - User redirected from zero search results`, { sendOnce: true }); // eslint-disable-line quotes
    },
    /**
     * @desc GA Event - Click on 'More Info' and 'Book Now'
     */
    userClickedOnCtaButtons() {
      const { settings } = Experiment;
      const resultItems = document.querySelectorAll('.result-item');
      [].forEach.call(resultItems, (item) => {
        const blueBtn = item.querySelector('.buttons a.btn-more-info.l-blue-btn.more-info');
        const orangeBtn = item.querySelector('.buttons a.btn-book-now.l-orange-btn.book-now');
        blueBtn.addEventListener('click', () => {
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - User clicks more info on NH014 (new)`, { sendOnce: true }); // eslint-disable-line quotes
        });
        orangeBtn.addEventListener('click', () => {
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - User clicks book now on NH014 (new)`, { sendOnce: true }); // eslint-disable-line quotes
        });
      });
    },
  },
};

export default Experiment;
