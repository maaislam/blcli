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
    ID: 'BI023',
    VARIATION: '{{VARIATION}}',
    numProductsBefore: 6,
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

  /**
   * @desc Init
   */
  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /**
     * Remove all exisiting products
     */
    const exisitingProducts = document.querySelectorAll('.listing-container product-list-item.bi23-added-item');
    [].forEach.call(exisitingProducts, (product) => {
      product.remove();
    });
    const productList = services.returnProducts();

    services.addUsp(productList);

    /**
     * Observers
     */
    const productContainer = document.querySelector('.listing-container > div > div');

    // Reference to our cat page observer
    // Keep hold so we can disconnect in between product list reloads
    let obs = null;

		/**
     * Disconnect this observer
     */
    function disconnectObserver() {
      obs.disconnect();
    }

		/**
     * Connect this observer
     */
    function addObserver() {
      obs = Experiment.addObserver(productContainer, () => {
        const addedProducts = document.querySelectorAll('.listing-container product-list-item.bi23-added-item');

        if (addedProducts) {
          disconnectObserver();

          [].forEach.call(addedProducts, (addedProduct) => {
            addedProduct.remove();
          });

          setTimeout(function() {
						var newProductList = services.returnProducts();
						services.addUsp(newProductList);

						setTimeout(function () {
							addObserver();
						}, 500);

					}, 1500);
        }
      }, {
        config: {
          attributes: false,
          childList: true,
        },
      });
    }

    addObserver();

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
    returnProducts() {
      return document.querySelectorAll('.listing-container product-list-item:not(.bi23-added-item)');
    },
    /**
     * @desc Loop over the product items and append
     * a USP every 7th module. Exclude any existing USPs.
     * This is to be called on observers and page load.
     * @param {NodeList} productList
     */
    addUsp(productList) {
      /**
       * USP Image array
       *  https://d191y0yd6d0jy4.cloudfront.net/2nyag90c4cmz8t4.jpg = hand crafted man
       *  https://d191y0yd6d0jy4.cloudfront.net/9aoq25b2wlp7fk1.jpg = over 150 to choose from
       *  https://d191y0yd6d0jy4.cloudfront.net/ldijv701q76sl1x.jpg = made in the UK
       *  https://d191y0yd6d0jy4.cloudfront.net/xbu89vzhehzaxw3.png = van next day without bg
       *  https://d191y0yd6d0jy4.cloudfront.net/gteqz22xw36szwz.jpg = BI icons
       *  https://d191y0yd6d0jy4.cloudfront.net/9qxb1zyy6wp9y2j.png = Worldwide delivery
       */
      const images = [
        { url: 'https://d191y0yd6d0jy4.cloudfront.net/xreumuv9uzkqli5.jpg', animated: false },
        { url: 'https://d191y0yd6d0jy4.cloudfront.net/9aoq25b2wlp7fk1.jpg', animated: false },
        { url: 'https://d191y0yd6d0jy4.cloudfront.net/gteqz22xw36szwz.jpg', animated: false },
        // { url: 'https://d191y0yd6d0jy4.cloudfront.net/2nyag90c4cmz8t4.jpg', animated: false },
        { url: 'https://d191y0yd6d0jy4.cloudfront.net/4hql31lgzcsjkh2.jpg', animated: false },
        { url: 'https://d191y0yd6d0jy4.cloudfront.net/xbu89vzhehzaxw3.png', animated: true },
        { url: 'https://d191y0yd6d0jy4.cloudfront.net/9qxb1zyy6wp9y2j.png', animated: true },
      ];
      let count = 0;
      for (let i = 1; productList.length > i; i += 1) {
        if (i % Experiment.settings.numProductsBefore === 0) {
          if (images.length) {
            const idx = Math.floor(Math.random() * images.length);
            const item = images.splice(idx, 1);
            const imageUrl = item[0].url;
            const shouldAddAnimClass = item[0].animated;
            const imageToUse = imageUrl;
            const html = Experiment.services.createHtml(imageToUse, count, shouldAddAnimClass);
            const ref = productList[i];
            if (imageToUse && html && ref) {
              if (count < 4) {
                ref.insertAdjacentHTML('beforebegin', html);
                count += 1;
              }
            }
          }
        }
      }
    },
    createHtml(image, index, animateOrNot) {
      return `<product-list-item ng-repeat="item in items" class="bi23-added-item bi23-item-${index} bi23-ani-${animateOrNot} c-3-set p-b block-item c-6-set-s" ng-class="{'c-6-set-s': custom.grid, 'c-12-set': !custom.grid}" product-id="item" custom="custom" ee-list-name="biscuits">
        <!---->
        <ng-include src="template">
            <div class="pos-relative" itemscope="" itemtype="http://schema.org/Product">
                
                <div class="m-b-2 block block-item__image">
                    <span class="block ratio-1-1" itemprop="url"><img tco-image="::product.image" loader="1" class="fill" crop="1" trim="1" fit-in="1" ratio="1" zoomfitin="1" scale="1" req-width="342" req-height="342" src="${image}"></span>
                    <!---->
                    <!---->
                </div>
                
            </div>
        </ng-include>
      </product-list-item>`;
    },
  },
};
export default Experiment;
