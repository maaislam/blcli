import { fullStory, events, destroyPollers, viewabilityTracker } from '../../../../../lib/utils';
import { poller, observer } from '../../../../../lib/uc-lib';
import { shuffle } from '../../../../../lib/utils/arrays';
import { imagesConfig } from './config';
import { checkInView } from './scrolling';

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
    ID: 'BI033',
    VARIATION: '{{VARIATION}}',
    NUM_TO_SHOW: 6,
    EVERY_NTH_CHILD: 6
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
    (Experiment.winExp.eventListeners || []).forEach((listener) => {
      if(listener.elm && listener.eventType && listener.listenerFunction) {
        listener.elm.removeEventListener(listener.eventType, listener.listenerFunction);
      }
    });

    window.UC.experiments[Experiment.settings.ID].eventListeners = [];
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

    /**
     * Create HTML for an object item
     *
     * @param {Object} prod
     */
    const itemToHtml = (prod) => {
      let html = '';
      if(prod && prod.id) {
        html += `
        <product data-biid="${prod.ID}" class="${settings.ID}-prod-cta p-r-2 p-b-9 p-b-5-s p-l-2 w-3 w-4-m w-6-s w-" ng-class="'w-' + vm.listing.getConfig('size')[vm.app.sizeId]">
        <div class="${settings.ID}-prod-cta__inner" style="background-image: url(${prod.url})">
        <div class="pos-relative product"><!----><!---->
          <div class="pos-relative">
              <div ng-class="::'ratio-1-1'" class="ratio-1-1 ${settings.ID}-prod-cta__text">
                <div ng-class="::'ratio-1-1'" class="${settings.ID}-prod-cta__text-inner">
                ${prod.text}
                </div>
              </div>
          </div>
          <div class="m-t-12px m-t-8px-s ${settings.ID}-prod-cta__buffer">
          </div>
        </div>
        </div>
        </product>
        `;
      }

      return html;
    };

    /**
     * Remove all images from visible grid
     *
     * @param {HTMLElement} grid
     */
    const removeImagesFromVisibleGrid = (grid) => {
      const existing = grid.querySelectorAll(`.${settings.ID}-prod-cta`);
      [].forEach.call(existing, (img) => {

        img.remove();
      });
    };

    /**
     * Apply images to visible grid
     *
     * @param {NodeList} gridProducts
     * @param {Array} images
     */
    const applyImagesToVisibleGrid = (gridProducts, images) => {
      const addedImages = [];
      let counter = 0;
      [].forEach.call(gridProducts, (prod, idx) => {
        if((idx + 1) % settings.EVERY_NTH_CHILD === 0) {
          prod.insertAdjacentHTML('afterend', itemToHtml(images[counter]));
          addedImages.push(images[counter]);
          counter += 1;
        }
      });

      return addedImages;
    };

    /**
     * Run
     *
     * @param {HTMLElement} grid
     * @param {Object} imagesToShow
     * @param {Number} numAvailable
     */
    const run = (grid, imagesToShow, numAvailable) => {
      if(grid) {
        removeImagesFromVisibleGrid(grid);

        const gridProducts = grid.querySelectorAll('product');
        if(gridProducts && gridProducts.length >= settings.EVERY_NTH_CHILD) {
          applyImagesToVisibleGrid(gridProducts, imagesToShow);

          const prodCtas = document.querySelectorAll(`.${settings.ID}-prod-cta`);

          [].forEach.call(prodCtas, (prodCta) => {
            const isInView = checkInView(prodCta);
            if(isInView) {
              prodCta.classList.add(`${settings.ID}-flagged-in-view`);

              Experiment.services.trackElmInView();
            }

            Experiment.addEventListener(prodCta, 'click', () => {
              Experiment.services.trackClickedElm();
            });

            Experiment.addEventListener(prodCta, 'mouseover', () => {
              const timeout = setTimeout(() => {
                Experiment.services.trackHover();
              }, 1000);

              Experiment.addEventListener(prodCta, 'mouseout', () => {
                clearTimeout(timeout);
              });
            });
          });

          Experiment.addEventListener(window, 'scroll', () => {
            [].forEach.call(prodCtas, (prodCta) => {
              if(checkInView(prodCta)) {
                Experiment.services.trackElmInView();
              }
            });
          });
        }
      }
    };

    // ----------------------------------------------------------
    // Add images
    // ----------------------------------------------------------
    const grid = document.querySelector('category-view .grid');
    const imagesToShow = shuffle(imagesConfig).slice(0,settings.NUM_TO_SHOW);
    const numAvailable = imagesToShow.length;

    run(grid, imagesToShow, numAvailable);

    observer.connect(grid, () => {
      const grid = document.querySelector('category-view .grid');

      run(grid, imagesToShow, numAvailable);
    }, {
      childList: true,
      attributes: false  
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
    trackElmInView() {
      const { settings } = Experiment;
      events.send(settings.ID, '1+ Item Seen By User', '', {
        sendOnce: true  
      });
    },
    trackClickedElm() {
      const { settings } = Experiment;
      events.send(settings.ID, 'Did Click a USP', '', {
        sendOnce: true  
      });
    },
    trackHover() {
      const { settings } = Experiment;
      events.send(settings.ID, 'Did Hover 1s+', '', {
        sendOnce: true  
      });
    },
  }
};

export default Experiment;
