import { fullStory, events } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';


const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP113',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const addToBagButton = document.querySelector('#addToCartForm .addToCartButton');
    const loader = document.querySelector('#miniCartSlider');
    addToBagButton.addEventListener('click', () => {
      observer.connect(loader, () => {
        components.addMattressMessage();
        components.checkIfMattress();
      }, {
        config: { attributes: true, childList: true, subtree: false },
        throttle: 1000,
      });
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
    },
  },

  components: {
    /**
     * @desc loop through basket and check if any are mattresses
     */
    checkIfMattress: function checkIfMattress() {
      const basketElements = document.querySelectorAll('#basket .basket_productView');
      document.querySelector('#basket').classList.remove('MP113_hasMattress');
      let hasMattress = false;
      for (let i = 0; i < basketElements.length; i += 1) {
        const element = basketElements[i];
        const productName = element.querySelector('.basket_productTitle').textContent;
        if (productName.indexOf('Mattress') > -1) {
          document.querySelector('#basket').classList.add('MP113_hasMattress');
          hasMattress = true;
          if (element.querySelector('.MP113-mattress_message')) {
            element.querySelector('.MP113-mattress_message').remove();
          }
        }
      }

      if(hasMattress) {
        const msg = document.querySelector('#basket').querySelector('.MP113-mattress_message');
        if(msg) {
          msg.remove();
        }
      }
    },
    addMattressMessage: function addMattressMessage() {
      const { settings } = Experiment;
      const basket = document.querySelector('#basket');
      const basketElements = document.querySelectorAll('#basket .basket_productView');
      for (let i = 0; i < basketElements.length; i += 1) {
        const element = basketElements[i];
        if (!basket.classList.contains('MP113_hasMattress')) {
          const productName = element.querySelector('.basket_productTitle').textContent;
          // create the mattress block
          const mattressMessageBlock = document.createElement('div');
          mattressMessageBlock.classList.add('MP113-mattress_message');
          mattressMessageBlock.innerHTML = `<h3>Looking for the perfect mattress?</h3>
          <div class="MP113-allMattress">
            <p></p>
            <a href="https://www.mamasandpapas.com/en-gb/c/mattress-covers">View all mattresses</a>
          </div>`;

          if (settings.VARIATION === '1') {
            mattressMessageBlock.querySelector('p').textContent = 'We create our mattresses with the help of Silentnight, the UK’s most trusted mattress manufacturer.';
          } else if (settings.VARIATION === '2') {
            mattressMessageBlock.querySelector('p').textContent = 'Over 80% of people who buy a cot from Mamas & Papas choose one of our hand select mattresses to accompany their cot.';
          }
          if (element.querySelector('.MP113-mattress_message')) {
            element.querySelector('.MP113-mattress_message').remove();
          }
          if (!element.querySelector('.MP113-mattress_message')) {
            if (productName.match(/Cot|Cotbed|Crib/) && !productName.match(/Cotton/)) {
              if (!document.querySelector('.MP113-mattress_message')) {
                element.appendChild(mattressMessageBlock);
                // events.send(`${settings.ID} v${settings.VARIATION}`, 'User saw', 'View all mattresses in basket', { sendOnce: true });

                element.querySelector('.MP113-mattress_message').addEventListener('click', () => {
                  // events.send(`${settings.ID} v${settings.VARIATION}`, 'clicked', 'View all mattresses in basket', { sendOnce: true });
                });
              }
            }
          }
        }
      }
    },
  },
};

export default Experiment;
