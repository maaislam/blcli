import { fullStory, events } from '../../../../lib/utils';

/**
 * {{PJ019}} - {{Create Your Own - Journey Improvement}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ019',
    VARIATION: '{{VARIATION}}',
    pizzaSelected: false,
  },

  init() {
    if (window.location.href.indexOf('/customise.aspx') > -1) {
      // Setup
      const { settings, services, components } = Experiment;
      services.tracking();
      document.body.classList.add(settings.ID);

      console.log('PJ019 Running!');
      const newBannerContent = `<div class="PJ019-bannerImage"></div><div class="PJ019-pageTitle"><h1>Create Your Own</h1></div>`;
      document.querySelector('.customisePizza').insertAdjacentHTML('afterbegin', newBannerContent);

      // Moves customise box to the bottom of the page
      const customiseBoxEl = document.querySelector('.customisePizza .customiseBox');

      document.querySelector('.pizzaIngredients').insertAdjacentElement('afterend', customiseBoxEl);

      // Changes Ingredients Titles
      document.querySelectorAll('.pizzaIngredients h1')[0].innerHTML = '<h1>CHEESE</h1>';
      document.querySelectorAll('.pizzaIngredients h1')[1].innerHTML = '<h1>TOPPINGS<span>Single: £1.40 / Double: £2.80</span></h1>';

      // Creates New Base & Size Category
      let categoryTitle = 'BASE AND SIZE';
      const base = {
        original : {
          id: 'originalCrust',
          img: 'https://trello-attachments.s3.amazonaws.com/5a1be6f78c43043ab0337f76/5ab2509fbf3402ff451c819d/8180fb154f4b2f34b9fd1d1fb8e8b673/original-crust.jpg',
          name: 'Original',
          pizzaBase: 'Original',
          sizes: ['S', 'M', 'L', 'XXL'],
        },
        authentic : {
          id: 'authenticThin',
          img: 'https://trello-attachments.s3.amazonaws.com/5a1be6f78c43043ab0337f76/5ab2509fbf3402ff451c819d/a21f017ac3c0830107d090dcece4e4cc/thin-crust.jpg',
          name: 'Authentic Thin',
          pizzaBase: 'Thin Crust',
          sizes: ['M', 'L', 'XXL'],
        },
        stuffed : {
          id: 'stuffedCrust',
          img: 'https://trello-attachments.s3.amazonaws.com/5a1be6f78c43043ab0337f76/5ab2509fbf3402ff451c819d/e2c2fea13463afbbd52949b954bff9a7/stuffed-crust.jpg',
          name: 'Stuffed',
          pizzaBase: 'Stuffed',
          sizes: ['M', 'L', 'XXL'],
        },
        deep : {
          id: 'deepCrust',
          img: 'https://trello-attachments.s3.amazonaws.com/5a1be6f78c43043ab0337f76/5ab2509fbf3402ff451c819d/5c6612fbcd30c217dbb5c4b526b6e5ae/deep-pan.jpg',
          name: 'Deep',
          pizzaBase: 'Deep Crust',
          sizes: ['M'],
        },
      }
      components.addCategory(categoryTitle, base);

      /**
       * @desc Creates Top Total Container
       */
      let totalAmount = document.querySelector('.customiseBox h1.price').textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
      const topTotalContainer = `<div class='PJ019-topTotalContainer'>
      <div class='PJ019-left'>
        <h1>Total:</h1>
      </div>
      <div class='PJ019-right'>
        <span class='PJ019-qty'>Qty: <span class='PJ019-input__remove'>-</span><input type='text' value='1' id='PJ019-topInputQty' class='quantity'><span class='PJ019-input__add'>+</span>
        <span class='PJ019-totalAmount'>${totalAmount}</span></span>
      <div class='PJ019-topAddBtn greenButton'>
        <span class='leftB'></span>
        <span class='centerB'>Add to Basket</span>
        <span class='rightB'></span>
      </div>
      </div>
      </div>`;
      document.querySelector('.pizzaIngredients').insertAdjacentHTML('afterbegin', topTotalContainer);

      /**
       * @desc Creates Bottom Total Container
       */
      const totalContainer = `<div class='PJ019-totalContainer'>
      <div class='PJ019-left'>
        <h1>Create Your Own Pizza</h1>
        <div class='PJ019-pizzaDetails'>
          <ul class='PJ019-details'>
            <li class='PJ019-detail__item' id='PJ019-base'>Base:  <span>Original<span class='PJ019-delete'>Delete</span></span></li>
            <li class='PJ019-detail__item' id='PJ019-size'>Size:  <span>Large<span class='PJ019-delete'>Delete</span></span></li>
            <li class='PJ019-detail__item' id='PJ019-toppings'>Toppings:  <ul id='PJ019-toppingsList'></ul></li>
          </ul>
          </div>
      </div>
      <div class='PJ019-right'>
        <span class='PJ019-qty'>Qty: <span class='PJ019-input__remove'>-</span><input type='text' value='1' id='PJ019-inputQty' class='quantity'><span class='PJ019-input__add'>+</span>
        <span class='PJ019-totalAmount'>£14.99</span></span>
      <div class='PJ019-topAddBtn greenButton'>
        <span class='leftB'></span>
        <span class='centerB'>Add to Basket</span>
        <span class='rightB'></span>
      </div>
      </div>
      </div>`;
      document.querySelector('.customiseBox').insertAdjacentHTML('afterbegin', totalContainer);

      // No Cheese option
      const noCheeseRow = `<div class='PJ019-noCheeseRow ingredient irow2 cheeseRow'>
      <div class='pic'>
          <img id='PJ019-noCheeseImage' src='https://trello-attachments.s3.amazonaws.com/5a1be6f78c43043ab0337f76/5ab2509fbf3402ff451c819d/b2a78b3c1c6ede8fe9ea8c0bba936008/PJ019_No_Cheese.png' alt='NoCheese'>
      </div>
      <div class="details">
        <h2>No Cheese</h2>
        <p>Our pizzas come with cheese as standard. If you'd like to remove this cheese, please select the option below.</p>
      </div>
      </div>`;
      document.querySelector('.ingredient.irow1.cheeseRow').insertAdjacentHTML('afterend', noCheeseRow);

      // Single / Double buttons
      const allIngredients = document.querySelectorAll('.pizzaIngredients .ingredient');

      [].forEach.call(allIngredients, (ingredient) => {
        const buttons = ingredient.querySelectorAll('.amount > a');
        [].forEach.call(buttons, (btn) => {
          if (btn.textContent === 'Single') {
            btn.insertAdjacentHTML('afterend', `<div class='PJ019-addBtn'><div class='PJ019-singleBtn portion-btn'>&times;1</div></div>`);
          } else if (btn.textContent === 'Double') {
            btn.insertAdjacentHTML('afterend', `<div class='PJ019-addBtn'><div class='PJ019-doubleBtn portion-btn'>&times;2</div></div>`);
          }
        });
      });

      /**
       * @desc Select pizza base and size from New Category
       */
      // const pizzaCategoryItems = document.querySelector('.PJ019-pizzaBaseSize');

      const pizzaOptions = document.querySelectorAll('.PJ019-pizzaSize');
      [].forEach.call(pizzaOptions, (option) => {
        option.addEventListener('click', (e) => {
          // [].forEach.call(pizzaCategoryItems, (item) => {

          // });
          option.classList.add('selectedPizza');
          const pizzaSelection = e.currentTarget.getAttribute('value');
          const pizzaName = e.currentTarget.getAttribute('name');
          const pizzaSize = e.currentTarget.getAttribute('size');

          // Checks Option List in Customise Box
          /**
           * NOTE: Select option changes, but does not get the updated price (?)
           */
          const customiseBoxSelect = document.querySelector('select#ctl00_cphBody__objCustomise_ddlVariations');
          const customiseBoxOptions = customiseBoxSelect.querySelectorAll('option');
          [].forEach.call(customiseBoxOptions, (listOption) => {
            if (listOption.innerText === pizzaSelection) {
              const index = listOption.index;
              customiseBoxSelect.selectedIndex = index;
              // Changes Base in Pizza Details
              document.querySelector('#PJ019-base > span').innerHTML = `${pizzaName} <span class='PJ019-delete'>Delete</span>`;
              // Changes Size in Pizza Details
              document.querySelector('#PJ019-size > span').innerHTML = `${pizzaSize} <span class='PJ019-delete'>Delete</span>`;
            }
          });
        });
      });

      /**
       * @desc Select Toppings
       */
      const ingredients = document.querySelectorAll('.ingredient');
      let toppingName;
      let toppingsInnerHtml;
      let toppingClassName;
      [].forEach.call(ingredients, (item) => {
        if (item.querySelector('.PJ019-addBtn')) {
          // Single Portion
          item.querySelector('.PJ019-singleBtn').addEventListener('click', (e) => {
            e.currentTarget.parentElement.classList.add('selected');
            /**
             * NOTE: Commented out the click event because it refreshes the content of the page
             */
            // item.querySelectorAll('p.amount a')[0].click();
            toppingName = item.querySelector('.details > h2').textContent.trim();
            if (toppingName.indexOf('Extra Cheese') > -1) {
              toppingName = 'Extra Cheese';
            }
            toppingClassName = services.camelize(toppingName);
            toppingsInnerHtml = document.querySelector('#PJ019-toppings > ul').innerHTML;
            /**
             * NOTE: Look for topping class in the Toppings List, if it does not exits or only one list element with this class exists, then add one
             */
            toppingsInnerHtml += `<li class='${toppingClassName}'>${toppingName} <span class='PJ019-delete'>Delete</span></li>`;
            document.querySelector('#PJ019-toppings > ul').innerHTML = toppingsInnerHtml;
          });
          // Double Portion
          item.querySelector('.PJ019-doubleBtn').addEventListener('click', (e) => {
            e.currentTarget.parentElement.classList.add('selected');
            /**
             * NOTE: Commented out the click event because it refreshes the content of the page
             */
            // item.querySelectorAll('p.amount a')[1].click();
            toppingName = item.querySelector('.details > h2').textContent.trim();
            toppingClassName = services.camelize(toppingName);
            if (toppingName.indexOf('Extra Cheese') > -1) {
              toppingName = 'Extra Cheese';
            }
            toppingsInnerHtml = document.querySelector('#PJ019-toppings > ul').innerHTML;
            /**
             * NOTE: Look for topping class in the Toppings List, if it does not exist, then add two
             */
            toppingsInnerHtml += `<li class='${toppingClassName}'>${toppingName} <span class='PJ019-delete'>Delete</span></li>`;
            toppingsInnerHtml += `<li class='${toppingClassName}'>${toppingName} <span class='PJ019-delete'>Delete</span></li>`;
            document.querySelector('#PJ019-toppings > ul').innerHTML = toppingsInnerHtml;
          });
        }
      });

    }
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
     * @desc Transforms element IDs to camelCase
     */
    /*eslint-disable */
    camelize: function camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      }).replace(/\s+/g, '');
    /* eslint-enable */
    },
  },

  components: {
    /**
     * @desc Creates Ingredient Category
     */
    addCategory(categoryTitle, category) {
      const { components } = Experiment;
      const ingredientContainers = this.addIngredients(category);
      const ingredientCategory = `<h1>${categoryTitle}<span>(All of our bases come with cheese and tomato as standard)</span></h1>${ingredientContainers}<div class='clearFix'></div>`;
      document.querySelector('.pizzaIngredients > div').insertAdjacentHTML('afterbegin', ingredientCategory);
    },
    /**
     * @desc Creates Ingredient Item
     */
    addIngredients(category) {
      const { components } = Experiment;
      let content = '';
      for (let key in category) {
        let pizzaSizes = '';
        if (category.hasOwnProperty(key)) {
          let obj = category[key];
          let baseSize;
          [].forEach.call(obj.sizes, (size) => {
            switch(size) {
              case 'S':
                baseSize = 'Small';
                break;
              case 'M':
                baseSize = 'Medium';
                break;
              case 'L':
                baseSize = 'Large';
                break;
              case 'XXL':
                baseSize = 'XXL';
                break;
            }
            pizzaSizes += `<li class='PJ019-pizzaSize' id=${obj.id}-${size} name='${obj.pizzaBase}' size='${baseSize}' value='${obj.pizzaBase}, ${baseSize}'>${size}</li>`;
          });
          content += `<div class='PJ019-ingredient PJ019-pizzaBaseSize ingredient irow'>
            <div class='PJ019-pic pic'>
              <img id='PJ019-${obj.id}' src='${obj.img}' alt='${obj.name}'>
            </div>
            <div class='PJ019-ingredientName'>${obj.name}</div>
            <div class='PJ019-sizeSelection'><ul class='PJ019-selection'>${pizzaSizes}</ul></div>
          </div>`;
        }
      }
      return content;
    },
  },
};

export default Experiment;
