import { fullStory, events } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';

/**
 * {{GD014}} - {{Previously Viewed Items}}
 */
const doc = document;
const bodyVar = doc.body;

const RunStorage = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'GD014',
      VARIATION: '1',
    },
    /**
     * @desc Store relevant information in variables to be accessed throughout the code
     */
    cache: (() => {
      // Get the skus of products users have clicked on
      let storedItems = window.localStorage.getItem('GD014_products');
      
      // If they don't exist create a blank array 
      // to be used to store skus when a user clicks on a product
      if (!storedItems) {
        storedItems = [];
      } else {
        storedItems = JSON.parse(storedItems);
      }

      return {
        storedItems,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;
      // If the user is on mobile use different styling
      if (window.mobileSite === true) {
        bodyVar.classList.add(settings.ID + '_mobile');
      } else {
        bodyVar.classList.add(settings.ID);
      }
      
      // Fire relevant functions to start building the experiment
      services.tracking();
      services.checkDate();
      
      components.render();
      components.mutate();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        // Generic GA tracking and fullstory 
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /**
       * @desc Check if the users date is 30 days after they first clicked on a product
       */
      checkDate() {
        // Store relevant current date information
        let storedDate = window.localStorage.getItem('GD014_date');
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getYear();

        // If the user has a stored date, check if its been 30 days
        if (storedDate) {
          storedDate = JSON.parse(storedDate);
          const storedDay = storedDate[0];
          const storedMonth = storedDate[1];
          const storedYear = storedDate[2];

          // If the year is after the stored year, and the day is later than the stored date
          // Its been 30+ days. This works for december dates rolling into next year

          // If the month is greater than the stored month its been more than 30 days
          
          // If the month is the month after and the date is later its been more than 30 days
          if ((year > storedYear && day >= storedDay) || month > storedMonth || (month >= storedMonth && day >= storedDay)) {
            // Reset date and stored products
            this.saveDate(day, month, year);
          }
        } else {
          // If first time its ran store date
          this.saveDate(day, month, year);
        }
      },
      saveDate(day, month, year) {
        const storeDate = [];
        storeDate.push(day);
        // Adding 1 to the month acts as the 30 day period, this works in december by having the year check in place
        storeDate.push(month + 1);
        storeDate.push(year);

        // Store the date and reset the product array
        window.localStorage.removeItem('GD014_products');
        window.localStorage.setItem('GD014_date', JSON.stringify(storeDate));
        Exp.cache.storedItems = [];
      },
    },
    components: {
      render() {
        const productList = bodyVar.querySelectorAll('.product.product-actions-container:not(.GD014_checked-product)');

        [].forEach.call(productList, (item) => {
          const sku = item.getAttribute('data-sku');
          item.classList.add('GD014_checked-product');
          // If the product sku matches the array skus add a class to change the styling 
          // Otherwise bind an event listener to store the sku of that product if clicked

          if (Exp.cache.storedItems.indexOf(sku) > -1) {
            item.classList.add('GD014_seen');
            events.send(`${Exp.settings.ID}`, 'View', 'Recently viewed product at PLP', { sendOnce: true });
          } else {
            item.addEventListener('click', () => {
              Exp.cache.storedItems.push(sku);
              window.localStorage.setItem('GD014_products', JSON.stringify(Exp.cache.storedItems));
            });
          }
        });
      },
      mutate() {
        const plpCheck = doc.getElementById('search-results');
        // If the user is on a PLP, this will check for more products being AJAX loaded on the page

        if (plpCheck) {
          observer.connect(plpCheck, () => {
            Exp.components.render();
          }, {
            config: {attributes: false, childList: true, subtree: false},
            throttle: 1000 
          });
        }
      },
    },
  };

  Exp.init();
};

export default RunStorage;
