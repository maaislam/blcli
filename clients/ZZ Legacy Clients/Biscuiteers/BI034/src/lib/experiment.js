import { fullStory, events, destroyPollers } from '../../../../../lib/utils';
import { poller, pollerLite } from '../../../../../lib/uc-lib';
import Lightbox from '../lib/components/lightbox';
import emailForm from './components/emailBox';

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
/* eslint-disable */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'BI034',
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
    exp.timers = exp.timers || [];
    exp.eventListeners = exp.eventListeners || [];
    exp.exp = Experiment;

    Experiment.winExp = exp;
  },

  /**
   * @desc Kill all event listeners that we held a reference to
   */
  killAllEventListeners() {
    (Experiment.winExp.eventListeners || []).forEach((listener) => {
      if (listener.elm && listener.eventType && listener.listenerFunction) {
        listener.elm.removeEventListener(listener.eventType, listener.listenerFunction);
      }
    });

    window.UC.experiments[Experiment.settings.ID].eventListeners = [];
  },

  /**
   * @desc Kill all timers
   */
  killAllTimers() {
    (Experiment.winExp.timers || []).forEach((timer) => {
      clearTimeout(timer);
    });

    window.UC.experiments[Experiment.settings.ID].timers = [];
  },

  /**
   * Add timer
   */
  addTimer(f) {
    Experiment.winExp.timers.push(f);
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
    var winObservers = Experiment.winExp.observers || [];
    winObservers.forEach((obs) => {
      obs.disconnect();
    });

    window.UC.experiments[Experiment.settings.ID].observers = [];
  },

  /**
   * @desc Init
   */
  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    if (!localStorage.getItem(`${settings.ID}-lightbox_shown`)) {
      const lightbox = new Lightbox(settings.ID, {
        content: `
        <div class="BI034-topBanner">
        <div class="BI034-lightbox_close">&times;</div>
          <h2>Welcome to Biscuiteers!</h2>
          <p>Enjoy 15% off your first order on us</p>
        </div>
        <div class="BI034_emailBox">
          <p>The first step to biscuit happiness. Sign up here to get exclusive offers and biscuit news</p>
          <div class="BI034-emailInput"><input class="BI034_email" placeholder="Pop your email here" type="text"></input><div class="BI034_go"></div></div>
          <div class="BI034-email_invalid"></div>
          <div class="BI034-success">Thanks! You can unsubscribe at any time</div>
          <div class="BI034-terms">
            <p><span class="BI034-terms__break">Discount subject to <a target="_blank" class="link" href="https://www.biscuiteers.com/boring-old-ts-and-cs#biscuitnews">terms and conditions</a>.</span> By signing up, you are accepting our <a target="_blank" class="link" href="https://www.biscuiteers.com/boring-old-ts-and-cs">terms and conditions</a> and our <a class="link" href="/privacy-policy" target="_blank">privacy policy</a> and <a class="link" href="/cookie-policy" target="_blank">cookie policy</a></p>
          </div>
        </div>`
      });

      // add the email form
      pollerLite(['.BI034_Lightbox', '.BI034_email'], () => {
        emailForm();
        services.sendEvents();
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
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    sendEvents() {
      const { settings } = Experiment;
      const emailBox = document.querySelector('.BI034_email');
      const privacyPolicy = document.querySelector('.BI034-terms .link');
      const CookiePolice = document.querySelector('.BI034-terms .link:last-of-type');
      emailBox.addEventListener('click', () => {
        events.send(settings.ID, 'Clicked', 'To enter email in box');
      });
      privacyPolicy.addEventListener('click', () => {
        events.send(settings.ID, 'Clicked', 'Privacy policy');
      });
      CookiePolice.addEventListener('click', () => {
        events.send(settings.ID, 'Clicked', 'Cookie policy');
      });
    },
  },
};

export default Experiment;
