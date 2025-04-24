import { fullStory, events } from '../../../../lib/utils';

/**
 * {{NH045}} - {{Recently Viewed}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH045',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    events.setTrackerName('tracker2');
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const currentURL = components.getURL();

    const store = localStorage.getItem('NH45Visited');
    let storage = [];
    if (store !== null) {
      storage = JSON.parse(store);
    }
    if (currentURL.match(/itineraries/g)) {
      storage.push(currentURL);
      localStorage.setItem('NH45Visited', JSON.stringify(storage));
    }
    // On search results page
    const elements = document.querySelectorAll('.search-content .container .right .result-item .result-content .buttons a:first-of-type');
    if (elements.length) {
      [].forEach.call(elements, (element) => {
        const url = element.pathname;
        const elWrapper = element.parentNode.parentNode.parentNode;
        if (storage.indexOf(url) > -1) {
          elWrapper.classList.add('NH045-visited');
          if (!elWrapper.querySelector('.NH045-visited-bar')) {
            components.addVisitedElement(elWrapper);
          }
        }
      });
    }


    // Tracking
    services.testTracking();
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
    testTracking() {
      const itinButtons = document.querySelectorAll('.search-content .container .right .result-item .result-content .buttons a:first-of-type');
      [].forEach.call(itinButtons, (link) => {
        const elWrapper = link.parentNode.parentNode.parentNode;
        if (link && elWrapper.classList.contains('NH045-visited')) {
          link.addEventListener('click', () => {
            events.send(Experiment.settings.ID, 'Click', 'Previously viewed itinerary');
          });
        }
      });
      function isScrolledIntoView(el) {
        const rect = el.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = rect.bottom;
        // Only completely visible elements return true:
        const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        return isVisible;
      }
      const firstVisitedOnSearch = document.querySelector('.NH045-visited');
      if (firstVisitedOnSearch) {
        window.addEventListener('scroll', () => {
          if (isScrolledIntoView(firstVisitedOnSearch)) {
            events.send(Experiment.settings.ID, 'User saw', 'Previously viewed itinerary on search results - active', { sendOnce: true });
            return false;
          }
        });
      }
      const trips = document.querySelectorAll('.container .result-item');
      if (trips) {
        // Click function
        const clickFunction = (eventString) => {
          events.send(Experiment.settings.ID, 'Click', eventString, { sendOnce: true });
        };
        for (let i = 0; trips.length > i; i += 1) {
          // Trips with a badge
          if (trips[i].classList.contains('NH045-visited')) {
            const recentTrip = trips[i];
            const recentBookNow = recentTrip.querySelector('.buttons a.btn-book-now');
            const recentShortlist = recentTrip.querySelector('.buttons a.shortlist');
            if (recentBookNow) {
              recentBookNow.addEventListener('click', () => {
                clickFunction('Recently Viewed, Book Now');
              });
            }
            if (recentShortlist) {
              recentShortlist.addEventListener('click', () => {
                clickFunction('Recently Viewed, Shortlist');
              });
            }
          }
        }
      }
    },
  },

  components: {
    getPreviousUrl() {
      return document.referrer;
    },
    getURL() {
      return window.location.pathname;
    },
    addVisitedElement(elRef) {
      elRef.insertAdjacentHTML('afterbegin', `
        <div class="NH045-visited-bar">
          <div>
            <p>Recently Viewed</p>
          </div>
        </div>
      `);
    },
  },
};

export default Experiment;
