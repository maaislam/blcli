import { events, scrollTo } from '../../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../../lib/uc-lib';
import ingredientButtonsEventListener from '../bindEvents/ingredientButtonsEventListener';
import createIngredientId from './createIngredientId';

export default () => {
  /* add the toppings */
  const addToppings = () => {
    const topping = {
      bacon: {
        id: 'baconTopping',
        category: 'meat',
        img: 'https://www.papajohns.co.uk/images/ingredients/bacon.jpg',
        name: 'Bacon',
      },
      chargrilledChicken: {
        id: 'chargrilledChickenTopping',
        category: 'meat',
        img: 'https://www.papajohns.co.uk/images/ingredients/chargrilled-chicken.jpg',
        name: 'Chargrilled Chicken',
      },
      ham: {
        id: 'hamTopping',
        category: 'meat',
        img: 'https://www.papajohns.co.uk/images/ingredients/ham.jpg',
        name: 'Ham',
      },
      italianStyleSausage: {
        id: 'italianStyleSausageTopping',
        category: 'meat',
        img: 'https://www.papajohns.co.uk/images/ingredients/italian-style-sausage.jpg',
        name: 'Italian Style Sausage',
      },
      pepperoni: {
        id: 'pepperoniTopping',
        category: 'meat',
        img: 'https://www.papajohns.co.uk/images/ingredients/pepperoni.jpg',
        name: 'Pepperoni',
      },
      porkSausage: {
        id: 'porkSausageTopping',
        category: 'meat',
        img: 'https://www.papajohns.co.uk/images/ingredients/pork-sausage.jpg',
        name: 'Pork Sausage',
      },
      spicyBeef: {
        id: 'spicyBeefTopping',
        category: 'meat',
        img: 'https://www.papajohns.co.uk/images/ingredients/spicy-beef.jpg',
        name: 'Spicy Beef',
      },
      anchovies: {
        id: 'anchoviesTopping',
        category: 'fish',
        img: 'https://www.papajohns.co.uk/images/ingredients/anchovies.jpg',
        name: 'Anchovies',
      },
      tuna: {
        id: 'tunaTopping',
        category: 'fish',
        img: 'https://www.papajohns.co.uk/images/ingredients/tuna.jpg',
        name: 'Tuna',
      },
      babyPortobelloMushrooms: {
        id: 'babyPortobelloMushroomsTopping',
        category: 'vegetables',
        img: 'https://www.papajohns.co.uk/images/ingredients/mushrooms.jpg',
        name: 'Baby Portobello Mushrooms',
      },
      blackOlives: {
        id: 'blackOlivesTopping',
        category: 'vegetables',
        img: 'https://www.papajohns.co.uk/images/ingredients/black-olives.jpg',
        name: 'Black Olives',
      },
      freshPineapple: {
        id: 'freshPineappleTopping',
        category: 'vegetables',
        img: 'https://www.papajohns.co.uk/images/ingredients/fresh-pineapple.jpg',
        name: 'Fresh Pineapple',
      },
      freshTomatoes: {
        id: 'freshTomatoesTopping',
        category: 'vegetables',
        img: 'https://www.papajohns.co.uk/images/ingredients/fresh-tomatoes.jpg',
        name: 'Fresh Tomatoes',
      },
      greenChilliPeppers: {
        id: 'greenChilliPeppersTopping',
        category: 'vegetables',
        img: 'https://www.papajohns.co.uk/images/ingredients/green-chilli-peppers.jpg',
        name: 'Green Chilli Peppers',
      },
      greenPeppers: {
        id: 'greenPeppersTopping',
        category: 'vegetables',
        img: 'https://www.papajohns.co.uk/images/ingredients/green-peppers.jpg',
        name: 'Green Peppers',
      },
      jalapenoPeppers: {
        id: 'jalapenoPeppersTopping',
        category: 'vegetables',
        img: 'https://www.papajohns.co.uk/images/ingredients/jalapeno-peppers.jpg',
        name: 'Jalapeno Peppers',
      },
      onions: {
        id: 'onionsTopping',
        category: 'vegetables',
        img: 'https://www.papajohns.co.uk/images/ingredients/onions.jpg',
        name: 'Onions',
      },
      redOnion: {
        id: 'redOnionTopping',
        category: 'vegetables',
        img: 'https://www.papajohns.co.uk/images/ingredients/red-onion.jpg',
        name: 'Red Onion',
      },
      redPeppers: {
        id: 'redPeppersTopping',
        category: 'vegetables',
        img: 'https://www.papajohns.co.uk/images/ingredients/red-peppers.jpg',
        name: 'Red Peppers',
      },
      slicedPepperoncini: {
        id: 'slicedPepperonciniTopping',
        category: 'vegetables',
        img: 'https://www.papajohns.co.uk/images/ingredients/sliced-pepperoncini.jpg',
        name: 'Sliced Pepperoncini',
      },
      sweetcorn: {
        id: 'sweetcornTopping',
        category: 'vegetables',
        img: 'https://www.papajohns.co.uk/images/ingredients/sweetcorn.jpg',
        name: 'Sweetcorn',
      },
      barbecueSauce: {
        id: 'barbecueSauceTopping',
        category: 'other',
        img: 'https://www.papajohns.co.uk/images/ingredients/barbeque-sauce.jpg',
        name: 'Barbecue Sauce',
      },
      chilliPowder: {
        id: 'chilliPowderTopping',
        category: 'other',
        img: 'https://www.papajohns.co.uk/images/ingredients/chilli-powder.jpg',
        name: 'Chilli Powder',
      },
      fetaCheese: {
        id: 'fetaCheeseTopping',
        category: 'other',
        img: 'https://www.papajohns.co.uk/images/ingredients/feta-cheese.jpg',
        name: 'Feta Cheese',
      },
      realItalianCheeses: {
        id: 'realItalianCheesesTopping',
        category: 'other',
        img: 'https://www.papajohns.co.uk/images/ingredients/Italian-5-Cheese-blend-thumbnail.jpg',
        name: 'Real Italian Cheeses',
      },
    };

    Object.keys(topping).forEach((i) => {
      const data = topping[i];
      const toppingId = createIngredientId(data.name);
      const toppingContainer = `<div class="topping__wrapper" id="PJ046-${toppingId}" name="${data.name}">
        <div class="topping__image" style="background-image:url('${data.img}')"></div>
        <div class="topping__name"><div>${data.name}</div></div>
        <div class='topping__ctaBtns' id='topping-${data.id}'>
          <div class="PJ046-ingredient__button singleBtn">Single</div>
          <div class="PJ046-ingredient__button doubleBtn">Double</div>
          <div class="PJ046-ingredient__button removeBtn">Remove</div>
        </div>
      </div>`;

      document.querySelector(`#${data.category}`).insertAdjacentHTML('beforeend', toppingContainer);
    });
  };

  addToppings();

  /* Add IDs to hidden toppings */
  const addIdsToHiddenToppings = () => {
    const allHiddenToppings = document.querySelectorAll('.pizzaIngredients .ingredient');
    [].forEach.call(allHiddenToppings, (hiddenTopping) => {
      if (!hiddenTopping.classList.contains('cheeseRow') || !hiddenTopping.classList.contains('noCheeseRow')) {
        let toppingName = hiddenTopping.querySelector('.details h2').innerText.trim();
        if (toppingName) {
          if (toppingName.indexOf('Extra Cheese') > -1) {
            toppingName = 'Extra Cheese';
          }
          const toppingId = createIngredientId(toppingName);
          if (hiddenTopping.id === '') {
            hiddenTopping.id = toppingId;
          }
        }
      }
      /**
       * HERE GOES CHEESE OPTIONS
       */
    });
  };

  addIdsToHiddenToppings();
  observer.connect([document.querySelector('#ctl00_cphBody__objCustomise_upCustomise'), document.querySelector('select#ctl00_cphBody__objCustomise_ddlVariations')], () => {
    addIdsToHiddenToppings();
  }, {
    throttle: 200,
    config: {
      attributes: false,
      childList: true,
    },
  });

  /* On click of topping option */
  const showToppingOptions = () => {
    const toppingCategories = document.querySelectorAll('.PJ046-toppings_categories .PJ046-topping_category');

    if (toppingCategories) {
      const topCategoryHeading = document.querySelector('.PJ046-topping_category h3');

      [].forEach.call(toppingCategories, (category) => {
        const heading = category.querySelector('h3');
        heading.addEventListener('click', (e) => {
          events.send('PJ046', 'clicked-option-heading');

          const categoryContainer = category.querySelector('.PJ046-toppings');
          const categoryHeading = category.querySelector('h3');
          const categoryHeadingOnPage = categoryHeading.getBoundingClientRect().y + window.scrollY;
          const categoryIcon = category.querySelector('.PJ046-titleIcon');

          if (!categoryContainer.classList.contains('active')) {
            categoryContainer.classList.add('active');
            categoryIcon.classList.remove('inactive');
            categoryIcon.classList.add('active');
          } else {
            categoryContainer.classList.remove('active');
            categoryIcon.classList.remove('active');
            categoryIcon.classList.add('inactive');
          }
        });
      });
    }
  };

  showToppingOptions();

  ingredientButtonsEventListener();
};
