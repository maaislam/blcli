import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * TP101 - Returning user homepage - mobile
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TP101',
    VARIATION: '1',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    document.body.classList.add(settings.ID);
    services.tracking();
    const elements = services.cacheDOM();

    // Create new block container
    const container = document.createElement('div');
    container.classList.add('TP101_returningUserBlock');
    elements.usps.parentElement.insertBefore(container, elements.usps.nextSibling);

    // Heading
    const heading = document.createElement('h3');
    heading.innerHTML = 'Hi, ready to jump back in?';

    // Update text to include name if available
    pollerLite([
      () => {
        const name = document.querySelector('.hello-m');
        return !!(name && name.innerHTML);
      },
    ], () => {
      const username = document.querySelector('.hello-m').innerHTML.trim().replace(/Hello, /gi, '');
      const firstName = username.split(' ')[0];
      heading.innerHTML = `Hi ${firstName}, ready to jump back in?`;
      events.send('TP101', 'View', 'First name shown', { sendOnce: true });
    });

    container.appendChild(heading);

    // Create RecentOrders component
    const RecentOrders = components.RecentOrders.init();
    container.appendChild(RecentOrders);

    // Create CategoryPreference component
    const CategoryPreference = components.CategoryPreference.init();
    container.appendChild(CategoryPreference);

    // Move recently viewed carousel to top of page
    pollerLite(['#monetate_endcap_5d35513b'], () => {
      const recentlyViewed = document.querySelector('#monetate_endcap_5d35513b');
      container.insertBefore(recentlyViewed, CategoryPreference);
      recentlyViewed.addEventListener('click', () => {
        events.send('TP101', 'Click', 'Clicked in recently viewed', { sendOnce: true });
      });
      events.send('TP101', 'View', 'Recently Viewed carousel shown', { sendOnce: true });
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },

    cacheDOM() {
      const { elements } = Experiment.cache;
      elements.usps = document.querySelector('.highlighted-messages');
      return elements;
    },
  },

  components: {
    RecentOrders: {
      services: {
        ifRecentOrdersExist(callback) {
          const request = new XMLHttpRequest();
          request.open('GET', '/accountDashboard/orderHistory', true);
          request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
              const resp = request.responseText;
              const temp = document.createElement('html');
              temp.innerHTML = resp;
              if (temp.querySelector('#order_history_table .orders-list')) {
                // Previous orders exist
                callback();
              }
            }
          };
          request.send();
        },
      },

      create() {
        // Container
        const component = document.createElement('div');
        component.classList.add('TP101_RecentOrders');
        component.style.display = 'none';

        /*
        * Check for existence of previous orders
        * If they exist, show link to recent orders
        */
        this.services.ifRecentOrdersExist(() => {
          const subheading = document.createElement('p');
          subheading.innerHTML = 'Buying more of the same?';

          const button = document.createElement('div');
          button.classList.add('TP101_RecentOrders__buttonWrap');
          button.innerHTML = '<a class="TP101_RecentOrders__button" href="/accountDashboard/orderHistory">View Recent Orders</a>';

          button.addEventListener('click', () => {
            events.send('TP101', 'Click', 'Clicked View Recent Orders', { sendOnce: true });
          });

          component.appendChild(subheading);
          component.appendChild(button);
          component.style.display = 'block';

          events.send('TP101', 'View', 'Recent orders button shown', { sendOnce: true });
        });

        return component;
      },

      init() {
        const component = this.create();
        return component;
      },
    },

    CategoryPreference: {
      data: {
        categories: [
          {
            name: 'Building Materials',
            url: '/Product/Building-Materials/c/1500029',
          }, {
            name: 'Gardens & Landscaping',
            url: '/Product/Gardens+Landscaping/c/1500098',
          }, {
            name: 'Timber',
            url: '/Product/Timber/c/1500000',
          }, {
            name: 'Doors, Windows & Joinery',
            url: '/Product/Doors%2C-Windows+Joinery/c/1500152',
          }, {
            name: 'Kitchens',
            url: '/Product/Kitchens/c/1509005',
          }, {
            name: 'Bathrooms',
            url: '/Product/Bathrooms/c/1500376',
          }, {
            name: 'Plumbing & Heating',
            url: '/Product/Plumbing+Heating/c/1500282',
          }, {
            name: 'Tools & Workwear',
            url: '/Product/Tools+Workwear/c/1500450',
          }, {
            name: 'Decorating & Interiors',
            url: '/Product/Decorating+Interiors/c/1500538',
          }, {
            name: 'Fixings & Adhesives',
            url: '/Product/Fixings+Adhesives/c/1500237',
          }, {
            name: 'Electrical & Lighting',
            url: '/Product/Electrical+Lighting/c/1500571',
          }, {
            name: 'Tool Hire',
            url: 'https://www.travisperkins.co.uk/Product/Tool-Hire/c/1571000',
          }, {
            name: 'Trade Offers',
            url: '/tradeoffers',
          }, {
            name: 'Clearance',
            url: '/clearance',
          },
        ],
      },

      create() {
        const { data } = this;

        // Container
        const component = document.createElement('div');
        component.classList.add('TP101_CategoryPreference');

        // Psuedo-select element
        const select = document.createElement('div');
        select.classList.add('TP101_CategoryPreference__select');
        select.innerHTML = '<p>Quick Question<br>Which categories do you buy from?</p>';

        // Active categories block
        const activeCategories = document.createElement('div');
        activeCategories.classList.add('TP101_CategoryPreference__activeCategories');

        // Options wrap
        const options = document.createElement('ul');
        options.classList.add('TP101_CategoryPreference__options');

        // Create dynamic options from data
        data.categories.forEach((categoryData) => {
          const option = document.createElement('li');
          option.classList.add('TP101_CategoryPreference__option');
          option.setAttribute('data-url', categoryData.url);
          option.setAttribute('data-name', categoryData.name);
          option.innerHTML = `<span class="TP101_CategoryPreference__option__check"></span><p>${categoryData.name}</p>`;
          options.appendChild(option);
        });

        // Submit button
        const submit = document.createElement('div');
        submit.classList.add('TP101_CategoryPreference__submit');
        submit.innerText = 'Submit';

        component.appendChild(select);
        component.appendChild(options);
        component.appendChild(submit);
        component.appendChild(activeCategories);

        return component;
      },

      /**
       * @param {HTMLElement} component Instance of the component
       */
      bindEvents(component) {
        const select = component.querySelector('.TP101_CategoryPreference__select');
        const options = component.querySelector('.TP101_CategoryPreference__options');
        const submit = component.querySelector('.TP101_CategoryPreference__submit');
        const activeCategories = component.querySelector('.TP101_CategoryPreference__activeCategories');
        const self = this;

        // Open/close options dropdown
        select.addEventListener('click', () => {
          component.classList.toggle('TP101_CategoryPreference--open');
          events.send('TP101', 'Click', 'Opened category dropdown', { sendOnce: true });
        });

        // Select/unselect option
        options.addEventListener('click', (e) => {
          let node = e.target;
          let option = null;

          while (node !== this) {
            if (node && node.classList && node.classList.contains('TP101_CategoryPreference__option')) {
              option = node;
              break;
            }
            if (node.parentNode) {
              node = node.parentNode;
            } else {
              break;
            }
          }

          // Clicked an option
          if (option) {
            option.classList.toggle('TP101_CategoryPreference__option--active');
            events.send('TP101', 'Click', 'Clicked category checkbox', { sendOnce: true });
          }

          return true;
        });

        // Update category list and update JSON in localStorage
        submit.addEventListener('click', () => {
          // Find all active selections and push to array
          const active = [];
          [].forEach.call(options.children, (option) => {
            if (option.classList && option.classList.contains('TP101_CategoryPreference__option--active')) {
              const name = option.getAttribute('data-name');
              active.push(name);
            }
          });

          // Update JSON
          const stringifiedData = JSON.stringify(active);
          window.localStorage.setItem('TP101', stringifiedData);

          // Update category list
          self.updateCategoryList(active, component);

          // Close menu
          component.classList.remove('TP101_CategoryPreference--open');
        });

        // Send event when active category link is clicked
        activeCategories.addEventListener('click', (e) => {
          let node = e.target;
          let link = null;

          while (node !== this) {
            if (node && node.nodeName && node.nodeName === 'A') {
              link = node;
              break;
            }
            if (node.parentNode) {
              node = node.parentNode;
            } else {
              break;
            }
          }

          // Clicked a link
          if (link) {
            events.send('TP101', 'Click', 'Clicked category link', { sendOnce: true });
          }

          return true;
        });

        return component;
      },

      /**
       * @description Updates the links shown in the preferred list
       * @param {Array} activeCategories Array of the link names to show
       * @param {HTMLElement} component Instance of the component
       */
      updateCategoryList(activeCategories, component) {
        const { data } = this;
        const activeCategoriesEl = component.querySelector('.TP101_CategoryPreference__activeCategories');
        const options = component.querySelector('.TP101_CategoryPreference__options');
        const selectTextNode = component.querySelector('.TP101_CategoryPreference__select p');

        // Change text if options are selected
        if (activeCategories.length) {
          selectTextNode.innerHTML = 'My Categories';
          // selectTextNode.style.textAlign = 'center';
          selectTextNode.style.fontSize = '18px';
        } else {
          selectTextNode.innerHTML = 'Quick Question<br>Which categories do you buy from?';
          // selectTextNode.style.textAlign = 'left';
          selectTextNode.style.fontSize = '15px';
        }

        // Update html of active category list
        let newHTML = '';
        activeCategories.forEach((categoryName) => {
          // Add active class to dropdown options if they don't have it
          const thisOption = options.querySelector(`[data-name="${categoryName}"]`);
          if (thisOption && thisOption.classList && !thisOption.classList.contains('TP101_CategoryPreference__option--active')) {
            thisOption.classList.add('TP101_CategoryPreference__option--active');
          }

          // Find this category in data to get URL and create this link
          data.categories.forEach((categoryData) => {
            if (categoryName === categoryData.name) {
              newHTML += `<div class="TP101_CategoryPreference__link"><a href="${categoryData.url}">${categoryData.name}</a></div>`;
            }
          });
        });
        activeCategoriesEl.innerHTML = newHTML;

        return component;
      },

      init() {
        const component = this.create();
        this.bindEvents(component);

        // If data exists in localStorage, update category list
        const cachedData = window.localStorage.getItem('TP101');
        if (cachedData) {
          this.updateCategoryList(JSON.parse(cachedData), component);
        }

        return component;
      },
    },
  },

  cache: {
    elements: {},
    globals: {
      isLoggedIn: () => document.querySelector('.nav-user-header').length > 0,
    },
  },
};

export default Experiment;
