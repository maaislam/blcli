import { observer, throttle } from '../../../../lib/uc-lib';
import { fullStory, events } from '../../../../lib/utils';

/**
 * PJ023 - Affirmation of store and delivery method
 */
const Experiment = {
  /**
   * @desc Variation data. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  data: {
    ID: 'PJ023',
    VARIATION: '1',
    deliveryType: undefined,
    storeName: undefined,
  },

  init() {
    // Setup
    const { data, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(data.ID);
    events.send(data.ID, 'View', `${data.ID} - Variation ${data.VARIATION} ran`);

    // Store data
    // eslint-disable-next-line prefer-destructuring
    data.deliveryType = document.querySelector('#ctl00__objHeader_pnlStoreMenuHasStore .bodyText > span').innerText.trim().replace(/\s+/g, ' ').match(/Delivery|Collection/)[0];
    data.storeName = document.querySelector('.storeName [itemprop="name"]').innerText;

    // Create Store Details
    if (data.VARIATION === '2' || data.VARIATION === '3') {
      components.StoreDetails.init();

      // Rebuild Store Details on mutation of the header
      const headerElements = Array.from(document.querySelectorAll('#ctl00__objHeader_upHeaderSummary, #ctl00__objHeader_upOmnibar'));
      observer.connect(headerElements, () => {
        if (!document.querySelector('.PJ023_StoreDetails')) {
          components.StoreDetails.init();
        }
      }, {
        config: { subtree: true, attributes: false, childList: true },
      });

      // Show store location and type on scroll
      const waypoint = 60;
      const headerWrap = document.querySelector('#ctl00__objHeader_upOmnibar');
      const throttledFunc = throttle(() => {
        const header = headerWrap.querySelector('.omnibarMenu');
        const scrollTop = document.body.scrollTop || window.pageYOffset;
        if (scrollTop >= waypoint && !header.classList.contains('PJ023--active')) {
          header.classList.add('PJ023--active');
          events.send(data.ID, 'View', `${data.ID} - Store details shown`, { sendOnce: true });
        } else if (scrollTop < waypoint && header.classList.contains('PJ023--active')) {
          header.classList.remove('PJ023--active');
        }
      }, 30);
      window.addEventListener('scroll', throttledFunc);
    }

    if (data.VARIATION === '1' || data.VARIATION === '3') {
      components.StoreConfirmation.init();

      // Add store confirmation on add to cart
      const basketElements = Array.from(document.querySelectorAll('#ctl00__objHeader_upBasketNotification, .basketNotification'));
      observer.connect(basketElements, () => {
        if (!document.querySelector('.PJ023_StoreConfirmation')) {
          components.StoreConfirmation.init();
        }
      }, {
        config: { subtree: false, attributes: false, childList: true },
      });
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { data } = Experiment;
      fullStory(data.ID, `Variation ${data.VARIATION}`);
      events.send(data.ID, 'View', `${data.ID} activated - Variation ${data.VARIATION}`);
    },
  },

  components: {
    StoreDetails: {
      create() {
        const { data } = Experiment;
        const component = document.createElement('li');
        component.classList.add('PJ023_StoreDetails');
        component.innerHTML = `
          <div class="PJ023_StoreDetailsInner">
            <div class="PJ023_StoreDetails__name">${data.deliveryType} from <br>${data.storeName}</div>
            <a class="PJ023_StoreDetails__link">change</a>
          </div>
        `;

        return component;
      },

      bindEvents(component) {
        const { data } = Experiment;
        component.querySelector('.PJ023_StoreDetails__link').addEventListener('click', (e) => {
          e.preventDefault();
          // eslint-disable-next-line no-underscore-dangle
          window.__doPostBack('ctl00$_objHeader$lbSelectStoreMenuItem', '');
          events.send(data.ID, 'Click', `${data.ID} - Change store clicked`);
        });

        return component;
      },

      render(component) {
        const nav = document.querySelector('.omnibarMenu > ul');
        nav.insertBefore(component, nav.firstChild);

        const scrollTop = document.body.scrollTop || window.pageYOffset;
        if (scrollTop > 60) {
          document.querySelector('.omnibarMenu').classList.add('PJ023--active');
          events.send(Experiment.settings.ID, 'View', `${Experiment.settings.ID} - Store details shown`, { sendOnce: true });
        }

        return component;
      },

      init() {
        const component = this.create();
        this.bindEvents(component);
        this.render(component);

        return component;
      },
    },

    StoreConfirmation: {
      create() {
        const { data } = Experiment;
        const component = document.createElement('div');
        component.classList.add('PJ023_StoreConfirmation');
        component.innerHTML = `<span>${data.deliveryType} from ${data.storeName}</span>`;

        return component;
      },

      render(component) {
        const { data } = Experiment;
        const basketNotification = document.querySelector('.basketNotification');
        basketNotification.appendChild(component);

        if (basketNotification.clientHeight) {
          // Notification is visible, send event
          events.send(data.ID, 'View', `${data.ID} - Store confirmation shown`);
        }

        return component;
      },

      init() {
        const component = this.create();
        this.render(component);

        return component;
      },
    },
  },
};

export default Experiment;
