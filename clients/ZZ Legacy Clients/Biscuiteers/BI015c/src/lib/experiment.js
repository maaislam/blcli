import { fullStory, events, destroyPollers } from '../../../../../lib/utils';
import { poller, countdown } from '../../../../../lib/uc-lib';
import { config } from '../../../BI015/config';

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
    ID: 'BI015c',
    VARIATION: '{{VARIATION}}',
    POPUP_DELAY: 2500, // On page auto appear
    POPUP_DELAY_ADDTOBASKET: 1250, // Product page post add to basket
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
    exp.exp = Experiment;

    Experiment.winExp = exp;
  },

  /**
   * @desc Kill all event listeners that we held a reference to
   */
  killAllEventListeners() {
    Experiment.winExp.eventListeners.forEach((listener) => {
      if(listener.elm && listener.eventType && listener.listenerFunction) {
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
   * @desc Init
   */
  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    if(Experiment.isPopupDead()) {
      return;
    }

    // Remove from DOM as popup will be rebuilt
    Experiment.removePopupFromDom();

    if(window.location.pathname == '/') {
      // 1. On homepage, show popup after delay
      Experiment.initPopup();

      if(Experiment.getPopupState() != 'reminder') {
        setTimeout(() => {
          Experiment.showPopup();

          events.send('BI015c---Popup', 'did-show-on-homepage-after-delay', '');

        }, settings.POPUP_DELAY);
      }
    } else {
      // 2. On add to basket, remind the user if popup state set to reminder
      Experiment.initPopup();
      Experiment.doPopupReminder();
    }
  },

  /**
   * Build popup in DOM
   */
  initPopup() {
    const popupHtml = `
      <div class="bi15c-popup" style="display: none;">
        <div class="bi15c-popup__bg"></div>

        <div class="bi15c-popup__inner">
          <a class="bi15c-popup__close">
            <span></span>
            <span></span>
					</a>

          <h2 class="bi15c-popup__title">Don't Forget Dad!</h2>
          <h2 class="bi15c-popup__subtitle">Order your Father's Day gifts by...</h2>
          <div class="bi15c-popup__countdown" id="bi15c-popup-countdown">
          </div>

          <div class="bi15c-products">
            <div class="bi15c-products__inner">
            </div>

            <h3>Don't worry we've got you covered...<br>Just shop our best selling gifts for Dad.</h3>

            <p class="bi015c-choose-date">
              Order now and choose a date closer to Father's Day!
            </p>

          </div>

          <div lass="bi15c-popup__buttons">
            <div class="bi15c-popup__button">
              <a href="${config.categoryLink}" class="button button--bigger button--pink b-radius-5 bi15c-range-button">Show me the range</a>
            </div>

            <div class="bi15c-popup__button">
              <a class="button button--bigger button--pink b-radius-5 bi15c-remind-later-button">Remind me later</a>
            </div>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', popupHtml);

		const upsellWrap = document.querySelector('.bi15c-products__inner');
    if(upsellWrap) {
      config.upsellProducts.forEach((prod) => {
        upsellWrap.insertAdjacentHTML('beforeend', `
          <div class="bi15c-product">
            <a href="${prod.url}" title="${prod.name} - £${prod.price}" data-bi15cid="${prod.id}">
              <img src="${prod.image}" />
            </a>
          </div>
        `);
      });
    }

    // ----------------------------------------------------
    // On product close and on background clicked, we are
    // done with popup forever
    // ----------------------------------------------------
    const foreverDoneWithPopup = () => {
      Experiment.killPopup();
      Experiment.removePopupFromDom();
    };

    const closeBtn = document.querySelector('.bi15c-popup__close');
    const popupBg = document.querySelector('.bi15c-popup__bg');

    if(closeBtn) {
      closeBtn.addEventListener('click', function() {
        events.send('BI015c---Popup', 'close-button-clicked', '');

        foreverDoneWithPopup();
      });
    }

    if(popupBg) {
      popupBg.addEventListener('click', function() {
        events.send('BI015c---Popup', 'popup-bg-clicked', '');

        foreverDoneWithPopup();
      });
    }
    
    // ----------------------------------------------------
    // On reminder button clicked we set reminder state
    // ----------------------------------------------------
    const reminderBtn = document.querySelector('.bi15c-remind-later-button');
    if(reminderBtn) {
      reminderBtn.addEventListener('click', () => {
        Experiment.setPopupState('reminder');
        Experiment.hidePopup();

        events.send('BI015c---Popup', 'reminder-button-clicked', '');
      });
    }
    
    // ----------------------------------------------------
    // Show me the range
    // ----------------------------------------------------
    const rangeBtn = document.querySelector('.bi15c-range-button');
    if(rangeBtn) {
      rangeBtn.addEventListener('click', () => {
        Experiment.killPopup();
        Experiment.removePopupFromDom();

        events.send('BI015c---Popup', 'show-me-range-button-clicked', '');
      });
    }
  },

  /**
   * Run countdown to Fathers day
   */
  initialiseCountdown() {
		let cutoff = new Date('2018-06-17');

		cutoff.setUTCHours(0, 0, 0);
		cutoff = cutoff.getTime();
		
    const countdownElm = document.querySelector('.bi15c-popup__countdown');
    if(countdownElm) {
      const countdowner = countdown({
        cutoff: cutoff,
        element: '#bi15c-popup-countdown',
        labels: {
            d: 'days',
            h: 'hours',
            m: 'min',
            s: 's'
        },
        delivery: {
            deliveryDays: 0, // How long an item takes to arrive
            excludeDays: [], // Non-working days
            deliveryDayElement: '',
            //tomorrowLabel: true
        }
      });
    }
  },

  /**
   * Show popup in DOM
   */
  showPopup() {
    const popup = document.querySelector('.bi15c-popup');
    if(popup) {
      popup.classList.add('bi15c-popup--active');

      Experiment.initialiseCountdown();
    }
  },

  /**
   * Hide popup in DOM
   */
  hidePopup() {
    const popup = document.querySelector('.bi15c-popup');
    if(popup) {
      popup.classList.remove('bi15c-popup--active');
    }
  },

  /**
   * Popup state killed no longer show
   */
  killPopup() {
    Experiment.setPopupState('dead');

    events.send('BI015c---Popup', 'popup-killed-forever', '');
  },

  /**
   * Popup should never show
   */
  isPopupDead() {
    return Experiment.getPopupState() === 'dead';
  },

  /**
   * Is popup set to reminder state?
   */
  getPopupState() {
    return localStorage.getItem(Experiment.settings.ID + '-popup-state');
  },

  /**
   * Set popup state
   */
  setPopupState(state) {
    localStorage.setItem(Experiment.settings.ID + '-popup-state', state);
  },

  /**
   * Remove popup from DOM
   */
  removePopupFromDom() {
    const popup = document.querySelector('.bi15c-popup');
    if(popup) {
      popup.remove();
    }
  },

  /**
   * Show popup as reminder
   */
  doPopupReminder() {
    if(Experiment.getPopupState() == 'reminder') {
      const addToBasketButton = document.querySelector('[name=productView] [basket-item-id] .button');
      if(addToBasketButton) {
        Experiment.addEventListener(addToBasketButton, 'click', () => {
          setTimeout(() => {
            Experiment.showPopup();

            events.send('BI015c---Popup', 'did-show-popup-as-reminder', '');

          }, Experiment.settings.POPUP_DELAY_ADDTOBASKET);
        });
      }
    }
  },

  /**
   * Event tracking on popup
   */
  eventTracking() {

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
  }
};

export default Experiment;
