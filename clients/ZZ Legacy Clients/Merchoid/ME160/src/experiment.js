import { fullStory, events } from '../../../../lib/utils';
// import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{ME160}} - {{Scarcity Improvements - Returning User}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME160',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const url = window.location.href;
    const data = window.localStorage.ME160 || '{"urls":[]}';
    const scarcityMessageViewed = window.localStorage.ME160messageViewed;
    const parsedData = JSON.parse(data);

    if (window.localStorage.ME160_returningUser && !window.sessionStorage.ME160_returningUser) {
      // User is returning, show '2 sold' message on any urls in localStorage.ME160
      if (parsedData.urls.indexOf(url) > -1) {
        /* Product is one of first 3 products visited
        /* and Returning User scarcity message has not been shown
        */
        if (!scarcityMessageViewed) {
          const scarcityMessageContainer = document.querySelector('#merchoid-scarcity-message');
          scarcityMessageContainer.innerHTML = `<span class='ME160-message'>Very Low Stock! Since you were last here 2 more have sold</span>`; // eslint-disable-line quotes
          scarcityMessageContainer.classList.add('showMessage');
          window.localStorage.setItem('ME160messageViewed', true);
          // GA Event
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `User Viewed - Returning User Scarcity Message`, { sendOnce: true }); // eslint-disable-line quotes
        }
      }
    } else {
      window.sessionStorage.ME160_returningUser = true;
      window.localStorage.ME160_returningUser = true;

      if (parsedData.urls.length < 3 || parsedData.urls.indexOf(url) > -1) {
        /*
        * If less than 3 products have been visited, run the experiment and
        * add the URL to the dataset
        */
        const scarcityMessageContainer = document.querySelector('#merchoid-scarcity-message');
        scarcityMessageContainer.innerHTML = `<span class='ME160-message'>Currently less than 5 in stock</span>`; // eslint-disable-line quotes
        scarcityMessageContainer.classList.add('showMessage');
        parsedData.urls.push(url);
        window.localStorage.ME160 = JSON.stringify(parsedData);

        // GA Event
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `User Viewed - Low Stock Scarcity Message - ${url}`, { sendOnce: true });
      }
    }
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

  components: {},
};

export default Experiment;
