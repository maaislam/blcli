import { events } from '../../../../../../lib/utils';
import { observer, throttle } from '../../../../../../lib/uc-lib';

export default () => {
  const PJ023 = {
    /**
     * @desc Variation data. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    data: {
      ID: 'PJ054',
      VARIATION: '1',
      deliveryType: undefined,
      storeName: undefined,
    },

    init() {
      // Setup
      const { data, components } = PJ023;

      // Store data
      // eslint-disable-next-line prefer-destructuring
      data.deliveryType = document.querySelector('#ctl00__objHeader_pnlStoreMenuHasStore .placeText').innerText.trim().replace(/\s+/g, ' ').match(/Delivery|Collection/)[0];

      data.storeName = document.querySelector('.storeName [itemprop="name"]').innerText;
  
      // Create Store Details
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
      const headerWrap = document.querySelector('#ctl00__objHeader_upHeaderSummary');
      const throttledFunc = throttle(() => {
        const header = headerWrap.querySelector('.topOptions');
        const scrollTop = document.body.scrollTop || window.pageYOffset;
        const logo = document.querySelector('.logoCont');
        if (scrollTop >= waypoint && !header.classList.contains('PJ023--active')) {
          logo.style.display = 'none';
          header.classList.add('PJ023--active');
          events.send(data.ID, 'View', `${data.ID} - Store details shown`, { sendOnce: true });
        } else if (scrollTop < waypoint && header.classList.contains('PJ023--active')) {
          header.classList.remove('PJ023--active');
          logo.style.display = 'block';
        }
      }, 30);
      window.addEventListener('scroll', throttledFunc);
    },

    components: {
      StoreDetails: {
        create() {
          const { data } = PJ023;
          const component = document.createElement('li');
          component.classList.add('PJ023_StoreDetails');
          component.innerHTML = `
          <a class="PJ023_StoreDetails__link">
            <div class="PJ023_StoreDetailsInner">
              <div class="PJ023_StoreDetails__name">${data.deliveryType} from <br><strong>${data.storeName}</strong><span class="PJ023_StoreDetails__link_text">change</span></div>
            </div>
          </a>
          `;

          return component;
        },

        bindEvents(component) {
          const { data } = PJ023;
          component.querySelector('.PJ023_StoreDetails__link').addEventListener('click', (e) => {
            e.preventDefault();
            // eslint-disable-next-line no-underscore-dangle
            window.__doPostBack('ctl00$_objHeader$lbSelectStoreMenuItem', '');
            events.send(data.ID, 'Click', `${data.ID} - Change store clicked`);
          });

          return component;
        },

        render(component) {
          const nav = document.querySelector('.topInner.logoPadding tr');
          nav.insertBefore(component, nav.firstChild);

          const logo = document.querySelector('.logoCont');
          const scrollTop = document.body.scrollTop || window.pageYOffset;
          if (scrollTop > 60) {
            logo.style.display = 'none';
            document.querySelector('.topOptions').classList.add('PJ023--active');
            events.send('PJ054', 'View', 'PJ054- Store details shown', { sendOnce: true });
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
          const { data } = PJ023;
          const component = document.createElement('div');
          component.classList.add('PJ023_StoreConfirmation');
          component.innerHTML = `<span>${data.deliveryType} from <strong>${data.storeName}</strong></span>`;

          return component;
        },

        render(component) {
          const { data } = PJ023;
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
  PJ023.init();
};
