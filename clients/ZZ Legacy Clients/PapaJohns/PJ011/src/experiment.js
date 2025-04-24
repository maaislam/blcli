import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ011',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const URL = window.location.pathname;

    // store the custom ingredients
    if (URL.indexOf('customise.aspx') > -1) {
      components.storeIngredients();
    }

    // add the basket ingredients
    if (window.localStorage.PJ011) {
      /* eslint-disable */
      const requestManager = Sys.WebForms.PageRequestManager.getInstance();
      requestManager.add_beginRequest((sender, error) => {
        const target = sender._postBackSettings.asyncTarget;
        /* eslint-enable */
        if (target === 'ctl00$_objHeader$lbBasketItem') {
          poller(['.fancybox-wrap.fancybox-mobile', '.pizzaName', '.redText'], () => {
            components.addIngredientsToBasket();
            events.send(settings.ID, 'Added CYO', 'CYO pizza added to basket', { sendOnce: true });
            // if remove basket is clicked
            const basketItems = document.querySelectorAll('#ctl00__objHeader_upHeaderBasketMobile .pizzaName');
            for (let index = 0; index < basketItems.length; index += 1) {
              const element = basketItems[index];
              const removeButton = element.parentNode.parentNode.querySelector('.redText');
              removeButton.addEventListener('click', () => {
                components.updateJSONonRemove(element.parentNode.dataset.pj011id);
              });
            }
          });
        }
      });
      // on update of the basket - run the function again
      let basketHiddenValue = document.getElementById('hdnBasketValue').value;
      setInterval(() => {
        const basketValue = document.getElementById('hdnBasketValue').value;
        if (basketValue !== basketHiddenValue) {
          basketHiddenValue = basketValue;
          poller(['.fancybox-wrap.fancybox-mobile', '.pizzaName', '.redText'], () => {
            components.addIngredientsToBasket();
          });
        }
      }, 200);
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc Store the json of pizza toppings
     */
    storeIngredients: function storeIngredients() {
      /* eslint-disable */
      const requestManager = Sys.WebForms.PageRequestManager.getInstance();

      requestManager.add_beginRequest((sender, error) => {
        const target = sender._postBackSettings.asyncTarget;
        if (target === 'ctl00$cphBody$_objCustomise$lbOrder') {
          /* eslint-enable */
          // get all ingredients added
          let ingredients = '';
          const ingredientsAdded = document.querySelectorAll('#ctl00_cphBody__objCustomise_upCustomise .ingredients .ingredient');
          [].forEach.call(ingredientsAdded, (element) => {
            const ingredientsText = element.textContent.trim().replace(/Delete/gim, '').replace(/[\s]+/gim, ' ');
            ingredients += `${ingredientsText}<br/>`;
          });

          const pizzaName = (() => {
            const pizzaType = document.querySelector('#ctl00_cphBody__objCustomise_upCustomise > h1').textContent.trim();
            const pizzaSize = document.querySelector('#ctl00_cphBody__objCustomise_ddlVariations').selectedOptions[0].innerText.replace(',', ' /');
            return `${pizzaType} (CYO) (${pizzaSize})`;
          })();

          const pizzaPrice = document.querySelector('.price').textContent.trim().replace(/\s/g, '');
          const noCheese = document.querySelector('#ctl00_cphBody__objCustomise_pnlCheeseRemove');
          let cheeseChoice;
          if (noCheese) {
            cheeseChoice = 'Yes';
          } else {
            cheeseChoice = 'No';
          }

          const pizzaData = (() => {
            const cached = window.localStorage.PJ011;
            return cached ? JSON.parse(cached) : { CYO_Pizzas: [] };
          })();

          pizzaData.CYO_Pizzas.push({
            name: pizzaName,
            price: pizzaPrice,
            toppings: ingredients,
            cheeseremoved: cheeseChoice,
          });

          const stringifiedPizzaData = JSON.stringify(pizzaData);
          window.localStorage.PJ011 = stringifiedPizzaData;
        }
      });
    },
    /**
     * @desc add the ingredients to the basket page
     */
    addIngredientsToBasket: function addIngredientsToBasket() {
      const pizzaIngredients = JSON.parse(window.localStorage.PJ011);
      const basketItems = document.querySelectorAll('#ctl00__objHeader_upHeaderBasketMobile .pizzaName');
      const data = pizzaIngredients.CYO_Pizzas;

      // loop through stored data
      for (let x = data.length - 1; x >= 0; x -= 1) {
        const storedPizza = data[x];
        const ingredients = storedPizza.toppings;
        const storedPrice = storedPizza.price;
        const pizzaNameStored = storedPizza.name;
        const cheeseRemoved = storedPizza.cheeseremoved;

        // loop through basket items
        for (let i = 0; i < basketItems.length; i += 1) {
          const element = basketItems[i];
          const basketPrice = element.parentNode.parentNode.querySelector('td:last-of-type').textContent.trim().replace(/Remove/gim, '').replace(/\s/g, '');
          const pizza = element.querySelector('.pizza-title-b').innerText.trim();
          const pizzaSize = element.querySelector('.pizza-title-b').nextElementSibling.innerText.trim();
          const basketPizzaName = `${pizza} ${pizzaSize}`;

          const basketItemRow = element.parentNode;
          if (basketItemRow.classList.contains('PJ011-ingredients_shown')) {
            continue; // eslint-disable-line no-continue
          }
          // if the price in the qty is updated
          let doubledPrice;
          if (storedPrice) {
            const qty = element.parentNode.parentNode.querySelector('.quantity .aspNetDisabled.txtField').value;
            const qtyAmount = parseFloat(qty);
            doubledPrice = parseFloat(storedPrice.replace('£', '') * qtyAmount);
          }
          const newDoublePrice = `£${doubledPrice}`;
          if ((storedPrice === basketPrice && basketPizzaName === pizzaNameStored)
          || (newDoublePrice === basketPrice && basketPizzaName === pizzaNameStored)) {
            basketItemRow.classList.add('PJ011-ingredients_shown');
            const ingredientsToAdd = document.createElement('div');
            ingredientsToAdd.classList.add('PJ011_ingredients');
            if (cheeseRemoved === 'Yes') {
              ingredientsToAdd.innerHTML = `<p><span>Added:</span> <div class="PJ011-toppings">${ingredients}</div><p>Cheese removed</p></p>`;
            } else {
              ingredientsToAdd.innerHTML = `<p><span>Added:</span> <div class="PJ011-toppings">${ingredients}</div></p>`;
            }
            basketItemRow.dataset.pj011id = x;
            basketItemRow.insertBefore(ingredientsToAdd, element.nextElementSibling);
            break;
          }
        }
      }
    },
    /**
     * @desc  Update JSON on pizza removal
     */
    updateJSONonRemove: function updateJSONonRemove(pj011id) {
      const storedJSON = JSON.parse(window.localStorage.getItem('PJ011'));
      storedJSON.CYO_Pizzas[pj011id] = {};
      const updatedItems = JSON.stringify(storedJSON);
      window.localStorage.PJ011 = updatedItems;
    },
  },
};

export default Experiment;
