import { fullStory, events, destroyPollers } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
import { config } from '../../BI015/config';
import { cacheDom } from '../../../../lib/cache-dom';
import { addToBasket } from '../../BI015/helpers';

let $ = null;

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
 *   §('my event listener');
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
    ID: 'BI032',
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
    const $rootScope = angular.element(document.querySelector('html')).scope();
    if(!$rootScope) {
        angular.reloadWithDebugInfo();

        return;
    }

    Experiment.$rootScope = $rootScope;

    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add('BI015b');

    $ = window.JQSG;

    // Workaround bind jQuery window to attach plugins
    const jqs = 'jQuery'
    if(!window[jqs]) {
      window[jqs] = $;
    }
        
    // -----------------------------------------------------------
    // Remove existing elms
    // -----------------------------------------------------------
    const basketSuccess = document.querySelector('.bi15b-basket-success');
    if(basketSuccess) {
        basketSuccess.remove();
    }

    const upsellWrapper = document.querySelector('.bi15b-upsell-wrapper');
    if(upsellWrapper) {
        upsellWrapper.remove();
    }

    // -----------------------------------------------------------
    // Handle basket add
    // -----------------------------------------------------------
    $rootScope.$on('basket.add', () => {
      if(window.location.pathname.match(/basket/i)) {
        $('body,html').animate({
            scrollTop: $('h1:first').offset().top
        }, 300, () => {
            // Fire did run event
            events.send(Experiment.settings.ID, 'did-successfully-add-to-basket', '', {
                sendOnce: true
            });

            if($('.bi15b-basket-success').length == 0) {
                $('[ng-controller="LocalBasketController"] h1').after(`
                    <div class="bi15b-basket-success p-a-4 fs-14 italic center m-b bg-col-grey-80">
                        Successfully added to your basket.
                    </div>
                `);    
            }

            $('.bi15b-addto-btn').html('add to basket');
        });
      }
    });
    
    // -----------------------------------------------------------
    // Draw Upsell Box
    // -----------------------------------------------------------
    const html = `
        <div class="bi15b-upsell-wrapper bi15b-upsell-wrapper--basket">
          <div class="wrap">
            <div class="bi15b-banner__intro">
              <span class="bi15b-banner__text3">as the summer holidays approach, it's time to say a great big thanks to teacher</span>
            </div>
            <div class="bi15b-banner__upsells">
              <h2>as the summer holidays approach, it's time to say a great big thanks to teacher</h2>
              
              <div class="bi15b-banner__upsells-inner">
              </div>
            </div>
          </div>
        </div>
    `;

    const ngInclude = cacheDom.get('main [ng-controller=LocalBasketController] > ng-include');
    if(window.innerWidth <= 519) {
        ngInclude.querySelector('div:first-of-type > div:first-of-type').insertAdjacentHTML('afterend', html);
    } else {
        ngInclude.insertAdjacentHTML('beforebegin', html);
    }

    const upsellWrap = cacheDom.get('.bi15b-banner__upsells-inner');
    config.upsellProducts.forEach((prod) => {
      const price = parseFloat(prod.price).toFixed(2);
      upsellWrap.insertAdjacentHTML('beforeend', `
        <div class="bi15b-banner__upsell-item">
          <a href="${prod.url}" title="${prod.name} - £${price}" data-bi15bid="${prod.id}">
            <img src="${prod.image}" />
          </a>
          <p class="bi15b-upsell-price">
            £${price}
          </p>
          <p>
            <a class="button button--bigger button--pink b-radius-5 bi15b-addto-btn" data-bi15bid="${prod.id}"
              >add to basket</a>
          </p>
        </div>
      `);
    });

    // upsellWrap.insertAdjacentHTML('beforeend', `
    //   <div class="bi15b-banner__upsell-item">
    //     <a href="${config.categoryLink}" title="Father's Day Gifts">
    //       <img src="${config.categoryImage}" />
    //     </a>
    //     <p class="bi15b-upsell-price">&nbsp;</p>
    //     <p>
    //       <a href="${config.categoryLink}"
    //         class="button button--bigger button--pink b-radius-5">Shop Father's Day</a>
    //     </p>
    //   </div>
    // `);

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
        const pid = e.currentTarget.dataset.bi15bid;

        events.send(settings.ID, 'Clicked Upsell Item', pid ? pid : 'cat');
      });
    });
        

    // -----------------------------------------------------------
    // Event Listeners
    // -----------------------------------------------------------
    [].forEach.call(cacheDom.getAll('.bi15b-upsell-wrapper--basket .bi15b-addto-btn'), (item) => {
      item.addEventListener('click', (e) => {
        $(e.currentTarget).html('adding...');

        const pid = e.currentTarget.dataset.bi15bid;
            
        // Fire did run event
        events.send(Experiment.settings.ID, 'did-click-add-to-basket-button', '', {
          sendOnce: true  
        });
        
        addToBasket(pid, 1);
      });
    });
        
    // ---------------------------------------------
    // Orientation change => refresh page
    // Workaround for DOM rebuliding
    // ---------------------------------------------
    window.addEventListener("orientationchange", function() {
        window.location.reload();
    });
  },

  runSlick() {
    $('.bi15b-banner__upsells-inner').slick({
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
      // events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', 'did-show-basket-upsell');
    },
  },
};

export default Experiment;
