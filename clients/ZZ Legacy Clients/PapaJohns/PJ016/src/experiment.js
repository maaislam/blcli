import { observer } from '../../../../lib/uc-lib';
import { fullStory } from '../../../../lib/utils';

/**
 * {{PJ016}} - {{Desktop Sides Page}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ016',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    function runExperiment() {
      if (document.querySelector('.doubleUp')) {
        const allSides = document.querySelectorAll('.menuList');

        const sides = [];
        const sideCategories = document.querySelectorAll('.menuItems');
        [].forEach.call(sideCategories, (category) => {
          const name = category.querySelector('h2').innerText;
          const items = category.querySelectorAll('.menuList');
          sides.push({
            name,
            items,
          });
        });

        for (let i = 0; i < sides.length; i += 1) {
          const side = sides[i];
          const name = side.name;
          const items = side.items;
        
          switch (name) {
            case 'Classic Sides':
              components.loopItemList(name, items);
              break;
            case 'Oven-baked Chicken':
              components.loopItemList(name, items);
              break;
            case 'Vegan Sides':
              components.loopItemList(name, items);
              break;
            case 'Variety Combos':
              components.loopItemList(name, items);
              break;
            case 'Dips':
              components.loopItemList(name, items);
              break;
          }
        }
      }
    }

    runExperiment();

		// If the page changes but does not refresh
    let basketHiddenValue = document.getElementById('hdnBasketValue').value;
    const basketVal = setInterval(() => {
        const basketValue = document.getElementById('hdnBasketValue').value;
        if (basketValue != basketHiddenValue) {
            basketHiddenValue = basketValue;
            if (!document.querySelector('.PJ016-addButton__single')) {
              runExperiment();
            }
        }
    }, 200);
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
    calculateSavingAmount: function calculateSavingAmount(prices) {
      return ((prices[0] * 2) - prices[1]).toFixed(2);
    },
  },

  components: {
    loopItemList: function loopItemList(category, allSides) {
      const { components, services } = Experiment;

      // Loops through each side
      [].forEach.call(allSides, (side) => {
        const inputsContainer = side.querySelector('.inputs');
        let prices = [];
        /**
         * @desc Sides with Double Up option
         */
        if (side.querySelector('.doubleUp') && category !== 'Dips') {
          // Hide selection input
          const selectWrapper = side.querySelector('select');
          const inputWrapper = side.querySelector('.quantity');
          selectWrapper.style.display = 'none';
          inputWrapper.style.display = 'none';

          const options = inputsContainer.querySelectorAll('option');
          /**
           * @desc Loops through available options
           */
            [].forEach.call(options, (item) => {
              if (item.innerHTML.indexOf('£') > -1) {
                let portionOptionText = item.innerHTML;

                let addButton = 'Add to Cart';
                let buttonClass;
                const addToBasketHref = side.querySelector('.greenButton').href;
                if (portionOptionText.match(/Single/)) {
                  addButton = `<div class="PJ016-addButton__single"><a href="${addToBasketHref}">Add Single</a></div>`;
                  buttonClass = 'PJ016-portionDetails__single';
                } else if (portionOptionText.match(/Double/)) {
                  addButton = `<div class="PJ016-addButton__double"><a href="${addToBasketHref}">Add Double</a></div>`;
                  buttonClass = 'PJ016-portionDetails__double';
                }
                prices.push(parseFloat(portionOptionText.split('£')[1]));
                /**
                 * @desc Creates new Add Buttons with relevant text
                 */
                let optionContainer = `<div class='PJ016-addToCart'>
                <div class="PJ016-portionButtons">
                <div class="PJ016-portionOption"><p class='${buttonClass}'>${portionOptionText}</p></div>
                ${addButton}
                </div>
                </div>`;
                inputsContainer.insertAdjacentHTML('beforeend', optionContainer);
              }
            });
            /**
             * @desc Calculates Saving Amount and appends it below Double Portion description
             */
            const savingAmount = services.calculateSavingAmount(prices);
            const portionDetails = side.querySelector('.PJ016-portionDetails__double');
            portionDetails.insertAdjacentHTML('afterend', `<p class='PJ016-portionDetails__saving'>(SAVE £${savingAmount})</p>`);
            /**
             * @desc Changes selectedIndex on button click
             */
            const addSingleButton = side.querySelector('.PJ016-addButton__single');
            addSingleButton.addEventListener('click', () => {
              side.querySelector('select').selectedIndex = 1;
            });
            const addDoubleButton = side.querySelector('.PJ016-addButton__double');
            addDoubleButton.addEventListener('click', () => {
              side.querySelector('select').selectedIndex = 2;
            });
        /**
         * @desc Oven-baked Chicken Category
         */
        } else if (category === 'Oven-baked Chicken') {
            let chickenPopper = '';
            const chickenSideName = side.querySelector('h3.titleWithIcon span').innerText.trim().toLowerCase();
            if (chickenSideName.indexOf('popper') > -1) {
              chickenPopper = 'PJ016-chickenPoppers';
            }
            const option = inputsContainer.querySelector('option');
            const qtyInput = inputsContainer.querySelector('input');
            const selectWrapper = side.querySelector('select');
            selectWrapper.style.display = 'none';

            if (option.innerHTML.indexOf('£') > -1) {
              let portionOptionText = option.innerHTML;
              prices.push(parseFloat(portionOptionText.split('£')[1]));
            }
            const addToBasketHref = side.querySelector('.greenButton').href;
            const newAddButton = `<span class='PJ016-chickenSide__price'><p>£${prices[0]}</p></span><div class='PJ016-chickenSide__qty-input'></div><div class='PJ016-addToCart PJ016-addToCart__chickenSides ${chickenPopper}'><a href="${addToBasketHref}">Add to Cart</a></div>`;
            inputsContainer.insertAdjacentHTML('afterend', newAddButton);
            const chickenSideQtyInputWrapper = side.querySelector('.PJ016-chickenSide__qty-input');
            chickenSideQtyInputWrapper.insertAdjacentElement('afterbegin', qtyInput);
            qtyInput.insertAdjacentHTML('beforebegin', `<label for=${qtyInput.id}>Qty:</label>`);

        } else if (category === 'Dips') {
          /**
           * @desc Moves Double Up checkbox on Dips below selection input
           */
          const doubleUpCheckBox = side.querySelector('.stuffedCrust.cssCheckbox');
          const customiseDipsContainer = side.querySelector('.dipsCustomise');
          const addToBasketHref = side.querySelector('.greenButton').href;
          const newAddButton = `<div class='PJ016-addToCart'><a href="${addToBasketHref}">Add to Cart</a></div>`;
          if (doubleUpCheckBox) {
            customiseDipsContainer.insertAdjacentElement('beforeend', doubleUpCheckBox);
            doubleUpCheckBox.insertAdjacentHTML('afterend', newAddButton);
          } else {          
            inputsContainer.insertAdjacentHTML('afterend', newAddButton);
          } 
        } else {
          const addToBasketHref = side.querySelector('.greenButton').href;

          // Default - Creates new Add to Cart button
          const newAddButton = `<div class='PJ016-addToCart'><a href="${addToBasketHref}">Add to Cart</a></div>`;          
          inputsContainer.insertAdjacentHTML('afterend', newAddButton); 
        }
      });
    },
  },
};

export default Experiment;
