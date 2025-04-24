import { fullStory, events, destroyPollers } from '../../../../lib/utils';
import { poller, observer } from '../../../../lib/uc-lib';

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
    ID: 'BI011',
    VARIATION: '{{VARIATION}}',
  },

  /**
   * @desc Reference to experiment on the window
   */
  winExp: null,

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
    exp.observers = exp.observers || [];
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
    const obs = observer.connect(elements, cb, opts);

    Experiment.winExp.observers.push(obs);

    return obs;
  },

  /**
   * Kill all observers
   */
  killObservers() {
    const winObservers = Experiment.winExp.observers;
    if (winObservers) {
      winObservers.forEach((obs) => {
        obs.disconnect();
      });
      window.UC.experiments[Experiment.settings.ID].observers = [];
    }
  },

  /**
   * @desc Init
   */
  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}-V${settings.VARIATION}`);
    /**
     * Poll for nav elements
     */
    const navReference = document.querySelector('.off-canvas__nav-menu');
    // Experiment.addPoller([
    //   navReference,
    // ], () => {
    //   console.log('run');
    // });
    components.buildElements(navReference, 'afterbegin');
    events.send(`${settings.ID}`, 'Added', `Component ${settings.ID} has been added`, { sendOnce: true });

    const navItems = document.querySelectorAll('.BI011-V2--navigation ul.BI011-pop--list li a.BI011-list--item');
    if (navItems) {
      components.currentPage(navItems);
    }
    /**
     * Best sellers click events
     */
    const clickE = () => {
      events.send(`${settings.ID}`, 'Clicked', 'Best sellers was clicked', { sendOnce: true });
    };
    const links = document.querySelectorAll('.BI011-navigation a');
    poller([
      links,
    ], () => {
      [].forEach.call((links), (link) => {
        const linkText = link.textContent;
        if (linkText && linkText.match('best sellers')) {
          Experiment.addEventListener(link, 'click', clickE);
        }
      });
    });
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
     * @desc If element already exists, then remove. Dependant on variation
     * show one of two HTML blocks. Pass in ref and position and the HTML
     * will be appended.
     * @param {HTML Element} ref
     * @param {String} position // options; beforeend, afterend, beforebegin, afterbegin
     */
    buildElements(ref, position) {
      const newNav = document.querySelector('.BI011-navigation');
      if (newNav) {
        newNav.remove();
      }
      let navHtml = null;
      if (Experiment.settings.VARIATION === '1') { // V1
        navHtml = `
          <div class="BI011-navigation">
            <h3>most popular</h3>
            <div class="BI011-nav--pop">
              <div class="BI011-pop--wrap">
                <a href="https://www.biscuiteers.com/biscuits" class="BI011-pop--el"><span>all biscuits</span></a>
              </div>
              <div class="BI011-pop--wrap">
                <a href="https://www.biscuiteers.com/biscuits/personalised-biscuits" class="BI011-pop--el"><span>personalised biscuits</span></a>
              </div>
              <div class="BI011-pop--wrap">
                <a href="https://www.biscuiteers.com/send-a-gift/our-top-picks#show=24" class="BI011-pop--el"><span>best sellers</span></a>
              </div>
            </div>
          </div>
        `;
      } else if (Experiment.settings.VARIATION === '2') { // V2
        navHtml = `
          <div class="BI011-navigation BI011-V2--navigation">
            <h3>most popular</h3>
            <div class="BI011-nav--pop">
              <ul class="BI011-pop--list">
                <li><a href="https://www.biscuiteers.com/biscuits" class="BI011-list--item">all biscuits</a></li>
                <li><a href="https://www.biscuiteers.com/biscuits/personalised-biscuits" class="BI011-list--item">all personalised biscuits</a></li>
                <li><a href="https://www.biscuiteers.com/send-a-gift/our-top-picks#show=24" class="BI011-list--item">best sellers</a></li>
                <li><a href="https://www.biscuiteers.com/biscuits/new-biscuits#show=25" class="BI011-list--item">new biscuits</a></li>
              </ul>
            </div>
          </div>
        `;
      }
      if (ref && navHtml !== null) {
        ref.insertAdjacentHTML(position, navHtml);
      }
    },
    currentPage(elems) {
      const url = window.location.pathname;
      if (elems) {
        [].forEach.call(elems, (el) => {
          if (el.classList.contains('BI011-current-page')) {
            el.classList.remove('BI011-current-page');
          }
          const elHref = el.getAttribute('href');
          const elPathname = elHref.replace('https://www.biscuiteers.com', '');
          // Trim elHref to remove any queries.
          const toMatch = /#show=\d+/;
          const currentPathname = elPathname.replace(toMatch, '');
          if (url === currentPathname) {
            el.classList.add('BI011-current-page');
          }
        });
      }
    },
  },
};

export default Experiment;
