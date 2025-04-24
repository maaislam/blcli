import { fullStory, events, destroyPollers } from '../../../../../lib/utils';
import { poller } from '../../../../../lib/uc-lib';
import { topNavLinks, sideNavLinks } from './data';

/**
 * Biscuiteers
 *
 * Use Experiment.addPoller and Experiment.addEventListener rather than calling
 * those methods generally. This allows us to hold references to pollers and event
 * listeners which we can destroy in future
 *
 * <code>
 *
 * // On every page request we can do this to kill last run pollers...
 *
 * Experiment.setup();
 * Experiment.destroyPollers();
 * Experiment.killAllEventListeners();
 *
 * // Then in experiment code...
 *
 * Experiment.addEventListener(document.body, 'click', () => {
 *   console.log('my event listener');
 * });
 *
 * Experiment.addPoller([
 *   'body'
 * ], Experiment.init);
 *
 * </code>
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'BI022',
    VARIATION: '{{VARIATION}}',
  },

  /**
   * @desc Reference to experiment on the window
   */
  winExp: null,

  /* eslint-disable */
  /**
   * @desc This holds a reference to the experiment on the window
   * and we can push to winExp.pollers and winExp.eventListeners
   * These are used in triggers.js to destroy listeners and pollers
   * on every load of experiment
   */
  setup() {
    window.UC = window.UC || {};

    const experiments = window.UC.experiments = (window.UC.experiments || {});
    const exp = experiments[Experiment.settings.ID] = experiments[Experiment.settings.ID] || {};

    exp.pollers = exp.pollers || [];
    exp.eventListeners = exp.eventListeners || [];
    exp.exp = Experiment;

    Experiment.winExp = exp;
  },
  /**
   * @desc Kill all event listeners that we held a reference to
   */
  killAllEventListeners() {
    Experiment.winExp.eventListeners.forEach((listener) => {
      if (listener.elm && listener.eventType && listener.listenerFunction) {
        listener.elm.removeEventListener(listener.eventType, listener.listenerFunction);
      }
    });
  },

  /**
   * @desc Hold a reference to a poller
   * @param {object} poller
   */
  addPoller(conditionsArray, callbackFunction, settings = {}) {
    const p = poller(conditionsArray, callbackFunction, settings);

    Experiment.winExp.pollers.push(p);
  },

  /**
   * @desc Event Listener
   *
   * @param {string} eventType
   * @param {function} listenerFunction
   */
  addEventListener(elm, eventType, listenerFunction) {
    const listener = elm.addEventListener(eventType, listenerFunction);

    Experiment.winExp.eventListeners.push({
      elm: elm,
      eventType: eventType,
      listenerFunction: listenerFunction
    });
  },

  /**
   * Helper destroy all pollers
   */
  destroyPollers() {
    destroyPollers(Experiment.settings.ID);
  },

  /**
   * Add mutation observer
   */
  addObserver(elements, cb, opts = {}) {
    var obs = observer.connect(elements, cb, opts);

    Experiment.winExp.observers.push(obs);

    return obs;
  },

  /**
   * Kill all observers
   */
  killObservers() {
    var winObservers = Experiment.winExp.observers;
    winObservers.forEach((obs) => {
      obs.disconnect();
    });

    window.UC.experiments[Experiment.settings.ID].observers = [];
  },
   /* eslint-enable */
  /**
   * @desc Init
   */
  init() {
    const { settings, services, components } = Experiment;
    services.tracking();
    // Setup
    if (document.querySelector('.BI022_nav')) {
      return;
    }

    document.body.classList.add(settings.ID);
    components.navigationBar();
    if (document.querySelector('.BI022_nav')) {
      components.addMainCategories();
    }
    components.topSideLinks();
    components.showAllBiscuits();
    components.sendEvents();
    components.changeAddLinks();
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
     * @desc Create the new navigation bar
     */
    navigationBar: () => {
      const oldNav = document.querySelector('.meganav');
      const newNav = document.createElement('div');
      newNav.classList.add('BI022_nav');

      newNav.style.display = 'none';
      oldNav.insertAdjacentElement('beforebegin', newNav);
    },

    /**
     * @desc Add the markup and smaller links
     */
    addMainCategories: () => {
      const allCategory = document.createElement('div');
      allCategory.classList.add('BI022_allItems');
      allCategory.innerHTML = `
      <div class="BI022-top_level">
        <h3>Our Biscuits</h3>
        <div class="BI022-side_links"></div>
      </div>
      <div class="BI022-second_level">
      </div>`;
      document.querySelector('.BI022_nav').appendChild(allCategory);

      for (let i = 0; i < Object.keys(topNavLinks).length; i += 1) {
        const data = Object.entries(topNavLinks)[i];
        const key = data[0];
        const secondaryLink = document.createElement('div');
        secondaryLink.classList.add('BI022-secondary_link');
        secondaryLink.innerHTML = `<a href="${data[1]}">${key}</a>`;

        document.querySelector('.BI022-second_level').appendChild(secondaryLink);
      }
    },
    /**
     * @desc Add the top side nav links
     */
    topSideLinks: () => {
      for (let i = 0; i < Object.keys(sideNavLinks).length; i += 1) {
        const linkName = Object.entries(sideNavLinks)[i][0];
        const link = Object.entries(sideNavLinks)[i][1];

        const topLink = document.createElement('div');
        topLink.classList.add('BI022-side_link');
        topLink.innerHTML = `<a href="${link}">${linkName}</a>`;

        document.querySelector('.BI022-side_links').appendChild(topLink);
      }
    },
    /**
    * @desc Show more on hover
    */
    showAllBiscuits: () => {
      const { settings } = Experiment;
      let timeout;
      const biscuitsDropdown = document.querySelector('.meganav__item:first-child .ng-hide-animate.hide-up.ng-hide');

      const moreLink = document.querySelector('.BI022-secondary_link:last-child');

      // enter more link
      moreLink.addEventListener('mouseenter', () => {
        moreLink.classList.add('BI022-more_show');
        biscuitsDropdown.classList.remove('ng-hide');
      });

      // leave more link
      moreLink.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
          moreLink.classList.remove('BI022-more_show');
          biscuitsDropdown.classList.add('ng-hide');
        }, 500);
      });

      biscuitsDropdown.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        events.send(settings.ID, 'Hover', 'Hovered over more link');
      });

      biscuitsDropdown.addEventListener('mouseleave', () => {
        moreLink.classList.remove('BI022-more_show');
        biscuitsDropdown.classList.add('ng-hide');
      });
    },
    /**
    * @desc Change the names of some links and add new ones
    */
    changeAddLinks: () => {
      const chocolatesLink = document.createElement('li');
      chocolatesLink.classList.add('BI022-chocolates');
      chocolatesLink.classList.add('meganav__item-dropdown__item');
      chocolatesLink.innerHTML = '<a href="/chocolates">all chocolates</a>';

      const occasionLinks = {
        'engagement biscuits': '/send-a-gift/engagement-gifts',
        'best of british biscuits': '/send-a-gift/best-of-british-gifts',
        'we love you biscuits': '/send-a-gift/we-love-you-gifts',
        'sympathy biscuits': '/send-a-gift/sympathy-gifts',
      };

      const biscuitsDropdownLinks = document.querySelectorAll('.meganav__item:first-child .ng-hide-animate.hide-up.ng-hide a');
      for (let index = 0; index < biscuitsDropdownLinks.length; index += 1) {
        const element = biscuitsDropdownLinks[index];
        if (element.textContent === 'make your own biscuits') {
          element.textContent = 'other gifts';
          element.parentNode.querySelector('.meganav__item-dropdown__links-list').appendChild(chocolatesLink);
        }
        // add the new occasion links
        if (element.textContent === 'biscuits by occasion') {
          for (let i = 0; i < Object.keys(occasionLinks).length; i += 1) {
            const data = Object.entries(occasionLinks)[i];
            const key = data[0];
            const link = data[1];
            const newLink = document.createElement('li');
            newLink.classList.add('BI022-occasion_link');
            newLink.innerHTML = `<a href="${link}">${key}</a>`;
            element.parentNode.querySelector('.meganav__item-dropdown__links-list').appendChild(newLink);
          }
        }
      }
    },
    /**
    * @desc Show more on hover
    */
    sendEvents: () => {
      const { settings } = Experiment;
      const secondLevelLinks = document.querySelectorAll('.BI022-secondary_link');
      for (let index = 0; index < secondLevelLinks.length; index += 1) {
        const element = secondLevelLinks[index];
        const linkName = element.textContent;
        element.addEventListener('click', () => {
          events.send(settings.ID, 'Click', `${settings.ID} top level secondary category click - ${linkName}`);
        });
      }

      const thirdLevelLinks = document.querySelectorAll('.meganav__item:first-child .ng-hide-animate.hide-up.ng-hide a');
      for (let index = 0; index < secondLevelLinks.length; index += 1) {
        const element = thirdLevelLinks[index];
        element.addEventListener('click', () => {
          events.send(settings.ID, 'Click', `${settings.ID} tertiary category click`);
        });
      }
    },
  },
};

export default Experiment;
