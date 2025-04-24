import { fullStory, events } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';
import muscleGroups from './lib/config';

/**
 * {{TG029}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TG029',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const muscleData = muscleGroups;
    const addMuscleData = () => {
      events.send('TG029', 'Active', 'Muscle groups and info have been appended to products', { sendOnce: true });
      const products = document.querySelectorAll('.category-products .item-product .item-product-content > a.product-image');
      [].forEach.call((products), (product) => {
        const link = product.getAttribute('href');
        const ref = product.parentElement.querySelector('.product-info');
        let name = ref.querySelector('h2.product-name > a');
        let splitName = null;
        let finalName = null;
        if (name) {
          name = name.textContent;
          splitName = name.split(/-|–/);
          if (splitName.length === 2) {
            finalName = splitName[1].trim();
          } else {
            finalName = name.trim();
          }
        }
        const data = muscleData[link];
        if (typeof data !== 'undefined') {
          /**
           * If product has muscle data add class
           * to change the products layout
           */
          const html = `
            <div class="tg29-info">
              <div class="tg29-product-info">
                <p class="tg29-line">${data.line}</p>
                <p class="tg29-name">${finalName}</p>
                <p class="tg29-price"></p>
                <div class="tg29-muscle-key">
                  <p>Primary Muscles <span class="tg29-pm"></span>
                  <p>Secondary Muscles <span class="tg29-sm"></span>
                </div>
              </div>
              <div class="tg29-muscle-image">
                <img src="${data.image}" alt="${data.muscles}">
              </div>
              <div class="tg29-muscle-groups">
                <p>${data.muscles}</p>
              </div>
            </div>
          `;
          const alreadyHasData = product.parentElement.classList.contains('tg29-has-data');
          if (!alreadyHasData) {
            ref.insertAdjacentHTML('afterbegin', html);
          }
          ref.parentElement.classList.add('tg29-has-data');
        }
      });
    };
    addMuscleData();
    /**
     * Observer the 'Load more' button and
     * append more muscle group information to
     * loaded in posts.
     */
    const connectObserver = () => {
      const mainDiv = document.querySelector('#main div[role=main]');
      const productListContainer = document.querySelector('.category-view .category-products');
      observer.connect([productListContainer, mainDiv], () => {
        observer.disconnect([productListContainer, mainDiv]);
        connectObserver();
        setTimeout(() => {
          addMuscleData();
          services.removeDupeNames();
        }, 1000);
      }, {
        throttle: 1000,
        config: {
          attributes: false,
          childList: true,
          subTree: false,
        },
      });
    };
    connectObserver();
    /**
     * Amend 3rd September 2018
     * remove 'Element+' from products with 'Element+' in the name.
     */
    Experiment.services.removeDupeNames();
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
    removeDupeNames() {
      const elements = document.querySelectorAll('.tg29-info .tg29-product-info p.tg29-name');

      if (elements.length > 0) {
        for (let i = 0; elements.length > i; i += 1) {
          const text = elements[i].textContent;
          const flatText = text.trim().toLocaleLowerCase();
          // Check if the names include 'Element+'
          if (flatText.match('element+')) {
            const newText = text.replace('ELEMENT+ ', '');
            elements[i].textContent = newText;
          }
        }
      }
    },
  },

  components: {},
};

export default Experiment;
