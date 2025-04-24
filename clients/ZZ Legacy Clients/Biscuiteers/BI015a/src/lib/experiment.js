import { fullStory, events, destroyPollers } from '../../../../../lib/utils';
import { poller } from '../../../../../lib/uc-lib';
import { config } from '../../../BI015/config';
import { cacheDom } from '../../../../../lib/cache-dom';

var $ = null;

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
    ID: 'BI015a',
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

    $ = window.JQSG;

    // Workaround bind jQuery window to attach plugins
    const jqs = 'jQuery'
    if(!window[jqs]) {
      window[jqs] = $;
    }
    
    // ----------------------------------------------------------------
    // Remove banner if it already exists
    // ----------------------------------------------------------------
    const existingBanner = cacheDom.get('.bi15a-banner', true);
    if(existingBanner) {
      existingBanner.remove();
    }

    // ----------------------------------------------------------------
    // Create banner
    // ----------------------------------------------------------------
    const titleText = 'Best Selling Items';
    const main = cacheDom.get('main.app-body');

    main.insertAdjacentHTML('beforebegin', `
      <div class="bi15a-banner" style="display: none;">
        <div class="wrap">
          <div class="bi15a-banner__intro">
            <span class="bi15a-banner__text1">Father's Day</span>
            <span class="bi15a-banner__text2">17th June</span>
            <span class="bi15a-banner__text3">Order now for delivery closer to the big day</span>
          </div>
          <div class="bi15a-banner__upsells">
            <div class="bi15a-banner__upsells-inner">
            </div>
          </div>
        </div>
      </div>
    `);

    const upsellWrap = cacheDom.get('.bi15a-banner__upsells-inner');
    config.upsellProducts.forEach((prod) => {
      upsellWrap.insertAdjacentHTML('beforeend', `
        <a class="bi15a-banner__upsell-item" href="${prod.url}" title="${prod.name} - £${prod.price}" data-bi15aid="${prod.id}">
          <div class="bi15a-banner__upsell-item-imgwrap">
            <img src="${prod.image}" />
          </div>
        </a>
      `);
    });

    upsellWrap.insertAdjacentHTML('beforeend', `
      <a class="bi15a-banner__upsell-item" href="${config.categoryLink}" title="Father's Day Gifts">
        <div class="bi15a-banner__upsell-item-imgwrap bi15a-banner__upsell-item-imgwrap--cat">
          <img src="${config.categoryImage}" />
        </div>
      </a>
    `);

    if(window.innerWidth <= 519) {
      if($.fn.slick) {
        Experiment.runSlick();
      } else {
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
          Experiment.runSlick();  
        });
      }
    }

    // Events
    const upsellItems = cacheDom.getAll('.bi15a-banner__upsell-item');
    [].forEach.call(upsellItems, (item) => {
      item.addEventListener('click', (e) => {
        const pid = e.currentTarget.dataset.bi15aid;

        events.send(settings.ID, 'Clicked Upsell Item', pid ? pid : 'cat');
      });
    });
        
    // ---------------------------------------------
    // Orientation change => refresh page
    // Workaround for DOM rebuliding
    //
    // Covers tablet orientation changes
    // ---------------------------------------------
    window.addEventListener("orientationchange", function() {
        window.location.reload();
    });
  },

  runSlick() {
    $('.bi15a-banner__upsells-inner').slick({
      slidesToShow: 1
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
  }
};

export default Experiment;
