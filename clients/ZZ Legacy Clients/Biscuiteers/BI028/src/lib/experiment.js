import { fullStory, events, destroyPollers, viewabilityTracker } from '../../../../../lib/utils';
import { poller, observer } from '../../../../../lib/uc-lib';

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
    ID: 'BI028',
    VARIATION: '{{VARIATION}}',
    OCCASION_SELECTED: '',
    RECIPIENT_SELECTED: '',
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
    const { settings, services, components, bindExperimentEvents } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    let $ = window.jQuery;
    // Workaround bind jQuery window to attach plugins
    const jqs = 'jQuery';
    if(!window[jqs]) {
      window[jqs] = $;
    }
    
    components.changeUpsellText();
    components.amendUpSellProductsContent();
    components.modifyUpsellTexts();
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
    /**
     * @desc Inits Slick Slider
     */
    runSlick() {
      const jq = window['j' + 'Query'];

      const $slides = jq('upsell-products .flex.flex-wrap');
      const numSlides = $slides.find('upsell-products-item').length;

      let slider = null;

      const doSlick = () => {
        slider  = $slides.slick({
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1
        });

        slider.on('afterChange', (event, slick, currentSlide, nextSlide) => {
          const cloneSlide = document.querySelector('upsell-products .slick-active.slick-cloned');

          if(cloneSlide) {
            // ------------------------------
            // Switch the clone slide with the first element so as to bring into
            // view the real slide rather than the clone
            // ------------------------------
            const target1 = document.querySelector(`upsell-products .slick-slide[data-slick-index="0"]`);
            const sibling1 = document.querySelector(`upsell-products .slick-slide[data-slick-index="1"]`);
            const target2 = document.querySelector(`upsell-products .slick-slide[data-slick-index="${numSlides}"]`);
            const sibling2 = document.querySelector(`upsell-products .slick-slide[data-slick-index="${numSlides-1}"]`);

            if(target1 && sibling1 && target2 && sibling2) {
              sibling1.insertAdjacentElement('beforebegin', target2);
              sibling2.insertAdjacentElement('afterend', target1);
            }
          } else if(currentSlide == 0) {
            // ------------------------------
            // Switch the clone slide with the first element so as to bring into
            // view the real slide rather than the clone
            // ------------------------------
            const target1 = document.querySelector(`upsell-products .slick-slide[data-slick-index="0"]`);
            const sibling1 = document.querySelector(`upsell-products .slick-slide[data-slick-index="1"]`);
            const target2 = document.querySelector(`upsell-products .slick-slide[data-slick-index="${numSlides}"]`);
            const sibling2 = document.querySelector(`upsell-products .slick-slide[data-slick-index="${numSlides-1}"]`);

            if(target1 && sibling1 && target2 && sibling2) {
              sibling1.insertAdjacentElement('beforebegin', target1);
              sibling2.insertAdjacentElement('afterend', target2);
            }
          }
        });
      }

      doSlick();

      poller(['button.slick-next.slick-arrow'], () => {
        const nextButtonText = document.querySelector('button.slick-next.slick-arrow');
        if (nextButtonText) {
          nextButtonText.innerHTML = '';
        }
      });
    },
  },

  components: {
    /**
     * @desc Change Upsell Text
     */
    changeUpsellText() {
      poller(['upsell-products .m-t-6.m-t-8-s.p-r-5-x p.fs-4.col-12.lh-2'], () => {
        const upsellText = document.querySelector('upsell-products .m-t-6.m-t-8-s.p-r-5-x p.fs-4.col-12.lh-2');
        if (upsellText) {
          upsellText.innerHTML = 'Give someone special a little extra, it will make their day we promise';
        }
      });
    },
    /**
     * @desc Change Upsell Products Container and Content
     */
    amendUpSellProductsContent() {
      const { settings, services } = Experiment;
      poller(['upsell-products-item.m-t-2.flex-column.c-4-set', '.flex.flex-wrap'], () => {
        const upsellProducts = document.querySelectorAll('upsell-products-item.m-t-2.flex-column.c-4-set');
        [].forEach.call(upsellProducts, (product) => {
          const price = product.querySelector('.bg-col-11.col-w.b-radius-max.fs-2.center.pos-absolute.z-1.right-1.bottom-0.price-upsell price.inline-block.fs-4.price span.price-value');
          if (price) {
            const priceText = price.innerText.trim();
            const productPrice = parseFloat(priceText).toFixed(2);
  
            const addCheckbox = product.querySelector('checkbox-array.checkbox.checkbox-square.va-m.p-l-0.m-t-1.fs-6');
            if (addCheckbox) {
              addCheckbox.insertAdjacentHTML('beforebegin', `<div class='BI028-upsellProduct__price'>Only +<span>${productPrice}</span></div>`);
            }
          }
        });
  
        const jq = window['j' + 'Query'];

        if(jq && jq.fn.slick) {
            services.runSlick();  
        } else {
          window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
            services.runSlick();  
          });
        }
  
        viewabilityTracker(document.querySelector('upsell-products-item.m-t-2.flex-column.c-4-set'), () => {
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `User Saw - Up sell component`, { sendOnce: true });
        }, {removeOnView: true});
      });
    },

    modifyUpsellTexts() {
      const upsellLinks = document.querySelectorAll('upsell-products a');
      [].forEach.call(upsellLinks, (link) => {
        if(link.innerText.trim() == 'gusbourne sparkling rose 2013') {
          link.innerHTML = 'gusbourne <span>home-grown luxury sparking rose (2013 vintage)</span>';
        }
        if(link.innerText.trim() == 'prosecco') {
          link.innerHTML = 'prosecco <span>a bottle of our favourite Italian fizz</span>';
        }
      });
    },
  },

  bindExperimentEvents: {
  }
};

export default Experiment;
