import { fullStory, events, destroyPollers } from '../../../../../lib/utils';
import { poller, observer } from '../../../../../lib/uc-lib';
import occasionsContent from './occasions_content';
import recipientContent from './recipient_content';

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
    ID: 'BI030',
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

    exp.destroyOnPageChange = true;
    exp.destroy = () => {
      Experiment.destroyPollers();
      Experiment.killAllEventListeners();
      Experiment.killObservers();

      const existingElms = [
        document.querySelectorAll('.BI030-giftFinder__wrapper'),
        document.querySelectorAll('.BI030-loader__wrapper'),
      ];

      // Remove elms already created
      existingElms.forEach((existingElm) => {
        if (existingElm && existingElm.length > 0) {
          [].forEach.call(existingElm, (item) => {
            item.remove();
          });
        }
      });
    };
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

    components.createGiftFinderContainer();
    components.addNavOverlay();
    // const sideNav = document.querySelector('off-canvas-menu .p-t.p-r.p-l.flex.flex-middle.form-small');

    // const giftFinder = document.querySelector('.BI030-giftFinder__wrapper');
    // sideNav.insertAdjacentElement('afterend', giftFinder);

    bindExperimentEvents.showGiftFinderSelections();

    Experiment.addPoller(['.BI030-select.occasion-selection'], () => {
      Experiment.addObserver(document.querySelector('.BI030-select.occasion-selection > div.placeholder'), () => {
        settings.OCCASION_SELECTED = document.querySelector('.BI030-select.occasion-selection > div.placeholder').getAttribute('value');
        // GA Event
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - [get 'for what' element: ${settings.OCCASION_SELECTED}]`, { sendOnce: true });
        components.checkAvailableRecipients(settings.OCCASION_SELECTED);
        if (settings.OCCASION_SELECTED !== '' && settings.OCCASION_SELECTED !== 'null' && settings.RECIPIENT_SELECTED !== '' && settings.RECIPIENT_SELECTED !== 'null') {
          const loader = document.querySelector('.BI030-loader__wrapper');
          if (loader) {
            loader.classList.remove('hidden');
          }
          window.location = `${window.location.origin}/${settings.OCCASION_SELECTED}${settings.RECIPIENT_SELECTED}`;
          setTimeout(function(){ 
            loader.classList.add('hidden');
            window.location.reload();
          }, 1200);
        } else if (settings.OCCASION_SELECTED === 'null') {
          document.querySelector('.occasion-selection div.placeholder').innerHTML = 'for what occasion?';
        }
      }, {
        throttle: 200,
        config: {
          attributes: true,
          childList: false,
        },
      });
    });

    Experiment.addPoller(['.BI030-select.recipient-selection'], () => {
      Experiment.addObserver(document.querySelector('.BI030-select.recipient-selection > div.placeholder'), () => {
        settings.RECIPIENT_SELECTED = document.querySelector('.BI030-select.recipient-selection > div.placeholder').getAttribute('value');
        // GA Event
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - [get 'for who' element: ${settings.RECIPIENT_SELECTED}]`, { sendOnce: true });
        components.checkAvailableOccasions(settings.RECIPIENT_SELECTED);
        if (settings.OCCASION_SELECTED !== '' && settings.OCCASION_SELECTED !== 'null' && settings.RECIPIENT_SELECTED !== '' && settings.RECIPIENT_SELECTED !== 'null') {
          const loader = document.querySelector('.BI030-loader__wrapper');
          if (loader) {
            loader.classList.remove('hidden');
          }
          window.location = `${window.location.origin}/${settings.OCCASION_SELECTED}${settings.RECIPIENT_SELECTED}`;
          setTimeout(function(){ 
            loader.classList.add('hidden');
            window.location.reload();
          }, 1200);
        } else if (settings.RECIPIENT_SELECTED === 'null') {
          document.querySelector('.recipient-selection div.placeholder').innerHTML = 'for who?';
        }
      }, {
        throttle: 200,
        config: {
          attributes: true,
          childList: false,
        },
      });
    });

    // // Orientation Change Event
    // window.addEventListener('orientationchange', function() {
    //   window.location.reload();
    // });
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
     * @desc Create Gift Finder Container
     * And Hidden Loader
     */
    createGiftFinderContainer() {
      const sideNav = document.querySelector('off-canvas-menu .p-t.p-r.p-l.flex.flex-middle.form-small');
      const pageHeader = document.querySelector('page-header');
      // Gift Finder
      const giftFinderContainer = `<div class='BI030-giftFinder__wrapper'>
        <div class='BI030-giftFinder__container'>
          <div class='BI030-giftFinder__content'>
            <span id='BI030-giftFinder__icon'></span>
            <span class='BI030-giftFinder__text'>try our gift finder</span>
          </div>
        </div>
      </div>`;
      
      sideNav.insertAdjacentHTML('afterend', giftFinderContainer);
      // Redirect Loader
      const loaderContainer = `<div class='BI030-loader__wrapper hidden'>
        <div class='BI030-loader'></div>
      </div>`;
      pageHeader.insertAdjacentHTML('beforebegin', loaderContainer);
    },
    /**
     * @desc Check available recipient options
     * for selected occasion and re-build recipients list
     * excluding the options on the list
     */
    checkAvailableRecipients(occasion) {
      const occasions = {
        'biscuits#filters.occasion=birthday': [
          '&filters.recipient=for%2520charity',
        ],
        "biscuits#filters.occasion=mother's%2520day": [
          '&filters.recipient=for%2520him',
          '&filters.recipient=for%2520children',
          '&filters.recipient=for%2520families',
          '&filters.recipient=for%2520fathers',
          '&filters.recipient=for%2520grandparents',
          '&filters.recipient=for%2520new%2520mums%2520and%2520dads',
          '&filters.recipient=for%2520pets',
          '&filters.recipient=for%2520corporate%2520clients',
          '&filters.recipient=for%2520charity',
          '&filters.recipient=for%2520couples',
          '&filters.recipient=for%2520soon-to-be%2520marrieds',
        ],
        'biscuits#filters.occasion=thank%2520you': [
            // '&filters.recipient=for%2520fathers',
            // '&filters.recipient=for%2520new%2520mums%2520and%2520dads',
            '&filters.recipient=for%2520soon-to-be%2520marrieds',
            '&filters.recipient=for%2520pets',
            // '&filters.recipient=for%2520corporate%2520clients',
            '&filters.recipient=for%2520charity',
        ],
        'biscuits#filters.occasion=new%2520baby': [
          // '&filters.recipient=for%2520fathers',
          '&filters.recipient=for%2520grandparents',
          // '&filters.recipient=for%2520couples',
          '&filters.recipient=for%2520pets',
          '&filters.recipient=for%2520corporate%2520clients',
          '&filters.recipient=for%2520charity',
        ],
        'biscuits#filters.occasion=congratulations': [
          // '&filters.recipient=for%2520couples',
          '&filters.recipient=for%2520pets',
          '&filters.recipient=for%2520charity',
        ],
        'biscuits#filters.occasion=get%2520well': [
          // '&filters.recipient=for%2520fathers',
          // '&filters.recipient=for%2520new%2520mums%2520and%2520dads',
          '&filters.recipient=for%2520soon-to-be%2520marrieds',
          // '&filters.recipient=for%2520corporate%2520clients',
          '&filters.recipient=for%2520pets',
        ],
        'biscuits#filters.occasion=weddings': [
          '&filters.recipient=for%2520children',
          '&filters.recipient=for%2520families',
          '&filters.recipient=for%2520mothers',
          '&filters.recipient=for%2520fathers',
          '&filters.recipient=for%2520grandparents',
          '&filters.recipient=for%2520new%2520mums%2520and%2520dads',
          '&filters.recipient=for%2520pets',
          '&filters.recipient=for%2520corporate%2520clients',
          '&filters.recipient=for%2520charity',
        ],
        'biscuits#filters.occasion=engagement': [
          '&filters.recipient=for%2520children',
          '&filters.recipient=for%2520families',
          // '&filters.recipient=for%2520mothers',
          // '&filters.recipient=for%2520fathers',
          // '&filters.recipient=for%2520grandparents',
          '&filters.recipient=for%2520new%2520mums%2520and%2520dads',
          '&filters.recipient=for%2520pets',
          '&filters.recipient=for%2520charity',
        ],
        'biscuits#filters.occasion=new%2520home': [
          '&filters.recipient=for%2520children',
          // '&filters.recipient=for%2520mothers',
          // '&filters.recipient=for%2520fathers',
          // '&filters.recipient=for%2520grandparents',
          // '&filters.recipient=for%2520new%2520mums%2520and%2520dads',
          '&filters.recipient=for%2520pets',
          '&filters.recipient=for%2520charity',
        ],
        'biscuits#filters.occasion=dinner%2520party': [
          // '&filters.recipient=for%2520him',
          '&filters.recipient=for%2520children',
          // '&filters.recipient=for%2520fathers',
          '&filters.recipient=for%2520new%2520mums%2520and%2520dads',
          '&filters.recipient=for%2520soon-to-be%2520marrieds',
          '&filters.recipient=for%2520pets',
          '&filters.recipient=for%2520corporate%2520clients',
          '&filters.recipient=for%2520charity',
        ],
        'biscuits#filters.occasion=we%2520love%2520you%2520': [
          // '&filters.recipient=for%2520him',
          // '&filters.recipient=for%2520fathers',
          // '&filters.recipient=for%2520new%2520mums%2520and%2520dads',
          '&filters.recipient=for%2520soon-to-be%2520marrieds',
          '&filters.recipient=for%2520pets',
          // '&filters.recipient=for%2520corporate%2520clients',
          '&filters.recipient=for%2520charity',
        ],
        "biscuits#filters.occasion=valentine's%2520day": [
          // '&filters.recipient=for%2520families',
          // '&filters.recipient=for%2520fathers',
          // '&filters.recipient=for%2520grandparents',
          '&filters.recipient=for%2520new%2520mums%2520and%2520dads',
          '&filters.recipient=for%2520soon-to-be%2520marrieds',
          '&filters.recipient=for%2520couples',
          '&filters.recipient=for%2520pets',
          // '&filters.recipient=for%2520corporate%2520clients',
          '&filters.recipient=for%2520charity',
        ],
      };
      const recipientOptions = document.querySelectorAll('ul.recipient-options li');
      [].forEach.call(recipientOptions, (option) => {
        option.classList.remove('hidden');
      });
      [].forEach.call(recipientOptions, (option) => {
        const optionValue = option.getAttribute('value');
        if (optionValue !== '' && optionValue !== ' ') {
          const occasionsObj = occasions[`${occasion}`];
          for (const key in occasionsObj) {
            if (occasionsObj.hasOwnProperty(key)) {
              const element = occasionsObj[key];
              if (optionValue === element) {
                option.classList.add('hidden');
              }
            }
          }
        }
      });
    },
    /**
     * @desc Check available occasion options
     * for selected recipients and re-build occasions list
     * excluding the options on the list
     */
    checkAvailableOccasions(recipient) {
      const recipients = {
        '&filters.recipient=for%2520him': [
        //   'biscuits#filters.occasion=dinner%2520party',
        //   'biscuits#filters.occasion=we%2520love%2520you%2520',
          "biscuits#filters.occasion=mother's%2520day",
        ],
        '&filters.recipient=for%2520children': [
          'biscuits#filters.occasion=weddings',
          'biscuits#filters.occasion=engagement',
          'biscuits#filters.occasion=new%2520home',
          'biscuits#filters.occasion=dinner%2520party',
          "biscuits#filters.occasion=mother's%2520day",
        ],
        '&filters.recipient=for%2520families': [
          'biscuits#filters.occasion=weddings',
          'biscuits#filters.occasion=engagement',
          "biscuits#filters.occasion=mother's%2520day",
          // "biscuits#filters.occasion=valentine's%2520day",
        ],
        '&filters.recipient=for%2520mothers': [
          'biscuits#filters.occasion=weddings',
          'biscuits#filters.occasion=engagement',
          'biscuits#filters.occasion=new%2520home',
        ],
        '&filters.recipient=for%2520fathers': [
          // 'biscuits#filters.occasion=thank%2520you',
          // 'biscuits#filters.occasion=new%2520baby',
          'biscuits#filters.occasion=weddings',
          "biscuits#filters.occasion=mother's%2520day",
          // 'biscuits#filters.occasion=engagement',
          // 'biscuits#filters.occasion=dinner%2520party',
          // 'biscuits#filters.occasion=new%2520home',
          // 'biscuits#filters.occasion=we%2520love%2520you%2520',
          // "biscuits#filters.occasion=valentine's%2520day",
        ],
        '&filters.recipient=for%2520grandparents': [
          'biscuits#filters.occasion=new%2520baby',
          'biscuits#filters.occasion=weddings',
          "biscuits#filters.occasion=mother's%2520day",
          // 'biscuits#filters.occasion=engagement',
          // 'biscuits#filters.occasion=new%2520home',
          // "biscuits#filters.occasion=valentine's%2520day",
        ],
        '&filters.recipient=for%2520new%2520mums%2520and%2520dads': [
          // 'biscuits#filters.occasion=birthday',
          // 'biscuits#filters.occasion=thank%2520you',
          // 'biscuits#filters.occasion=get%2520well',
          'biscuits#filters.occasion=weddings',
          'biscuits#filters.occasion=engagement',
          'biscuits#filters.occasion=dinner%2520party',
          "biscuits#filters.occasion=mother's%2520day",
          // 'biscuits#filters.occasion=new%2520home',
          // 'biscuits#filters.occasion=we%2520love%2520you%2520',
          "biscuits#filters.occasion=valentine's%2520day",
        ],
        '&filters.recipient=for%2520soon-to-be%2520marrieds': [
          // 'biscuits#filters.occasion=birthday',
          'biscuits#filters.occasion=thank%2520you',
          'biscuits#filters.occasion=new%2520baby',
          'biscuits#filters.occasion=get%2520well',
          'biscuits#filters.occasion=dinner%2520party',
          'biscuits#filters.occasion=we%2520love%2520you%2520',
          "biscuits#filters.occasion=valentine's%2520day",
          "biscuits#filters.occasion=mother's%2520day",
        ],
        '&filters.recipient=for%2520couples': [
        //   'biscuits#filters.occasion=new%2520baby',
        //   'biscuits#filters.occasion=congratulations',
        //   "biscuits#filters.occasion=valentine's%2520day",
          "biscuits#filters.occasion=mother's%2520day",
        ],
        '&filters.recipient=for%2520pets': [
          'biscuits#filters.occasion=birthday',
          'biscuits#filters.occasion=thank%2520you',
          'biscuits#filters.occasion=new%2520baby',
          'biscuits#filters.occasion=congratulations',
          'biscuits#filters.occasion=get%2520well',
          'biscuits#filters.occasion=weddings',
          'biscuits#filters.occasion=engagement',
          'biscuits#filters.occasion=dinner%2520party',
          'biscuits#filters.occasion=new%2520home',
          'biscuits#filters.occasion=we%2520love%2520you%2520',
          "biscuits#filters.occasion=valentine's%2520day",
          "biscuits#filters.occasion=mother's%2520day",
        ],
        '&filters.recipient=for%2520corporate%2520clients': [
          // 'biscuits#filters.occasion=thank%2520you',
          'biscuits#filters.occasion=new%2520baby',
          // 'biscuits#filters.occasion=get%2520well',
          'biscuits#filters.occasion=weddings',
          'biscuits#filters.occasion=dinner%2520party',
          // 'biscuits#filters.occasion=we%2520love%2520you%2520',
          // "biscuits#filters.occasion=valentine's%2520day",
          "biscuits#filters.occasion=mother's%2520day",
        ],
        '&filters.recipient=for%2520charity': [
          'biscuits#filters.occasion=birthday',
          'biscuits#filters.occasion=thank%2520you',
          'biscuits#filters.occasion=new%2520baby',
          'biscuits#filters.occasion=congratulations',
          'biscuits#filters.occasion=weddings',
          'biscuits#filters.occasion=engagement',
          'biscuits#filters.occasion=dinner%2520party',
          'biscuits#filters.occasion=new%2520home',
          'biscuits#filters.occasion=we%2520love%2520you%2520',
          "biscuits#filters.occasion=valentine's%2520day",
          "biscuits#filters.occasion=mother's%2520day",
        ],
      };
      const occasionsOptions = document.querySelectorAll('ul.occasion-options li');
      [].forEach.call(occasionsOptions, (option) => {
        option.classList.remove('hidden');
      });
      [].forEach.call(occasionsOptions, (option) => {
        const optionValue = option.getAttribute('value');
        if (optionValue !== '' && optionValue !== ' ') {
          const recipientsObj = recipients[`${recipient}`];
          for (const key in recipientsObj) {
            if (recipientsObj.hasOwnProperty(key)) {
              const element = recipientsObj[key];
              if (optionValue === element) {
                option.classList.add('hidden');
              }
            }
          }
        }
      });
    },

    /**
     * @desc Add the nav overlay
     */
    addNavOverlay() {
      const navOverlay = document.createElement('div');
      navOverlay.classList.add('BI030-nav_overlay');
      const nav = document.querySelector('off-canvas-menu .lh-1 .p-a');
      nav.appendChild(navOverlay);
    },
  },

  bindExperimentEvents: {
    /**
     * @desc Click on Gift Finder icon
     */
    showGiftFinderSelections() {
      const { bindExperimentEvents, services, settings } = Experiment;
      const occasions = occasionsContent;
      const recipients = recipientContent;
      let occasionsList = '';
      let recipientsList = '';
      for (const key in occasions) {
        const element = occasions[key]
        if (element !== '') {
          occasionsList += `<li value="${element.url}">${element.value}</li>`;
        }
      }
      for (const key in recipients) {
        const element = recipients[key]
        if (element !== '') {
          recipientsList += `<li value="${element.url}">${element.value}</li>`;
        }
      }
      const giftFinderIcon = document.querySelector('.BI030-giftFinder__content');
      if (giftFinderIcon) {
        giftFinderIcon.addEventListener('click', () => {
          // GA Event
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Gift Finder`, { sendOnce: true });
          const giftFinderSelections = `<div class='giftFinder__selectContent'>
          <div class='giftFinder__select' style='overflow: hidden;'>
              <div class='BI030-select occasion-selection'>
                <div class='placeholder'>occasion?</div>
                <div class='icon show-options'></div>
              </div>
              <div class='BI030-options hidden'>
                <div class='options-wrapper'>
                  <ul class='occasion-options'>
                    <li class='placeholder' value="/biscuits">browse all</li>
                    ${occasionsList}
                    <span class='icon hide-options'></span>
                  </ul>
                </div>
              </div>
            </div>
            <div class='giftFinder__select' style='overflow: hidden;'>
              <div class='BI030-select recipient-selection'>
                <div class='placeholder'>for who?</div>
                <div class='icon show-options'></div>
              </div>
              <div class='BI030-options hidden'>
                <div class='options-wrapper'>
                  <ul class='recipient-options'>
                    <li class='placeholder' value=" ">browse all</li>
                    ${recipientsList}
                    <span class='icon hide-options'></span>
                  </ul>
                </div>
              </div>
              </div>
            </div>
          </div>`;

          Experiment.addPoller(['.BI030-giftFinder__container'], () => {
            const giftFinderContainer = document.querySelector('.BI030-giftFinder__container');
            if (giftFinderContainer) {
              giftFinderContainer.innerHTML = giftFinderSelections;
              bindExperimentEvents.clickIconToShowOptions();
              bindExperimentEvents.clickIconToHideOptions();
              bindExperimentEvents.selectOptions();
              bindExperimentEvents.hideOverlayOnNavClose();
            }
          });
        });
      }
    },

    /**
     * @desc Click - Show Options
     */
    clickIconToShowOptions() {
      const navOverlay = document.querySelector('.BI030-nav_overlay');
      const giftFinderContainer = document.querySelector('.BI030-giftFinder__container');
      const selectBlocks = document.querySelectorAll('.BI030-select');
      [].forEach.call(selectBlocks, (select) => {
        select.addEventListener('click', () => {
          const selectOptions = select.parentElement.querySelector('.BI030-options');
          if (selectOptions) {
            selectOptions.classList.remove('hidden');
            selectOptions.parentElement.style.overflow = 'visible';
            navOverlay.classList.add('BI030-visible');
          }
        });
        const showIcon = select.querySelector('div.icon.show-options');
        if (showIcon) {
          showIcon.addEventListener('click', () => {
            const selectOptions = select.parentElement.querySelector('.BI030-options');
            if (selectOptions) {
              selectOptions.classList.remove('hidden');
              selectOptions.parentElement.style.overflow = 'visible';
              navOverlay.classList.add('BI030-visible');
            }
          });
        }
      });
    },

    /**
     * @desc Click - Hide Options
     */
    clickIconToHideOptions() {
      const navOverlay = document.querySelector('.BI030-nav_overlay');
      const giftFinderContainer = document.querySelector('.BI030-giftFinder__container');
      const selectOptions = document.querySelectorAll('.BI030-options');
      [].forEach.call(selectOptions, (selectOption) => {
        const hideIcon = selectOption.querySelector('span.icon.hide-options');
        if (hideIcon) {
          hideIcon.addEventListener('click', () => {
            selectOption.classList.add('hidden');
            navOverlay.classList.remove('BI030-visible');
          });
        }
      });
    },
    /**
     * @desc Select Option
     */
    selectOptions() {
      const selectInputs = document.querySelectorAll('.giftFinder__select');
      [].forEach.call(selectInputs, (selectInput) => {
        const select = selectInput.querySelector('.BI030-options ul');
        for (let i = 0; i < select.children.length; i += 1) {
          select.children[i].addEventListener('click', (e) => {
            selectInput.querySelector('.BI030-options').classList.add('hidden');
            const selectedText = select.children[i].innerText;
            const selectedValue = select.children[i].getAttribute('value');
            selectInput.querySelector('.BI030-select > div.placeholder').innerText = selectedText;
            selectInput.querySelector('.BI030-select > div.placeholder').setAttribute('value', selectedValue);
          });
        }
      });
    },

    hideOverlayOnNavClose() {
      const mainOverlay = document.querySelector('main-overlay');
      const navOverlay = document.querySelector('.BI030-nav_overlay');
      const navClose = document.querySelector('off-canvas-menu .icon-close-pink');
      navClose.addEventListener('click', () => {
        if (navOverlay.classList.contains('BI030-visible')) {
          navOverlay.classList.remove('BI030-visible');
        }
        const selectOptions = document.querySelectorAll('.BI030-options');
        [].forEach.call(selectOptions, (selectOption) => {
          selectOption.classList.add('hidden');
          navOverlay.classList.remove('BI030-visible');
        });
      });

      mainOverlay.addEventListener('click', () => {
        if (navOverlay.classList.contains('BI030-visible')) {
          navOverlay.classList.remove('BI030-visible');
        }
        const selectOptions = document.querySelectorAll('.BI030-options');
        [].forEach.call(selectOptions, (selectOption) => {
          selectOption.classList.add('hidden');
          navOverlay.classList.remove('BI030-visible');
        });
      });
    },
  },
};

export default Experiment;
