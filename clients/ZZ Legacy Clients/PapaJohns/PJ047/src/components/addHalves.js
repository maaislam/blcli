import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

/* Hardcode pizzas so both halves can be clicked */
export default () => {
  const pizzas = {
    'BBQ Chicken Classic': {
      image: 'https://www.papajohns.co.uk/images/pizzas/BBQChickenClassic.jpg',
      description: 'Chargrilled chicken, bacon, onions and drizzled BBQ sauce',
    },
    Hawaiian: {
      image: 'https://www.papajohns.co.uk/images/pizzas/premium_hawaiian.jpg',
      description: 'Ham with fresh, juicy pineapple chunks',
    },
    'American Hot': {
      image: 'https://www.papajohns.co.uk/images/pizzas/american_hot_menu.jpg',
      description: 'Pepperoni and Jalapeno peppers',
    },
    'Sausage & Pepperoni - The Papa\'s Favourite': {
      image: 'https://www.papajohns.co.uk/images/pizzas/the-papas-favourite.jpg',
      description: 'Tomato sauce, Real Italian cheeses, pepperoni, sausage, Italian style seasoning',
    },
    'Chicken Club': {
      image: 'https://www.papajohns.co.uk/images/pizzas/chicken-club.jpg',
      description: 'Chargrilled chicken, bacon, fresh tomatoes, onions',
    },
    'Papa\'s Double Pepperoni': {
      image: 'https://www.papajohns.co.uk/images/pizzas/double-pepperoni.jpg',
      description: 'Double pepperoni, extra cheese',
    },
    'The Works™': {
      image: 'https://www.papajohns.co.uk/images/pizzas/the-works.jpg',
      description: 'Pepperoni, sausage, ham, baby portobello mushrooms, green peppers, onions, black olives',
    },
    'All the Meats™': {
      image: 'https://www.papajohns.co.uk/images/pizzas/all-the-meats.jpg',
      description: 'Piquant pepperoni, succulent sausage, crispy bacon, spicy beef, ham',
    },
    'The Mexican': {
      image: 'https://www.papajohns.co.uk/images/pizzas/the-mexican.jpg',
      description: 'Jalapeno peppers, red peppers, spicy beef, onions and chilli powder',
    },
    'The Greek': {
      image: 'https://www.papajohns.co.uk/images/pizzas/the-greek.jpg',
      description: 'Feta cheese, red onion, tomatoes, black olives, pepperoncini, mozzarella, oregano',
    },
    'Garden Party': {
      image: 'https://www.papajohns.co.uk/images/pizzas/garden-party.jpg',
      description: 'Red onions, green peppers, tomatoes, sweetcorn and baby portobello mushrooms',
    },
    'Hot Pepper Passion': {
      image: 'https://www.papajohns.co.uk/images/pizzas/hot-pepper-passion.jpg',
      description: 'Red peppers, green peppers, green chilli peppers, jalapeno peppers and onions',
    },
    'Cheese & Tomato': {
      image: 'https://www.papajohns.co.uk/images/pizzas/cheese-and-tomato.jpg',
      description: 'Cheese and tomato',
    },
  };

  // create the pizzas
  Object.keys(pizzas).forEach((i) => {
    const pizzaData = pizzas[i];
    const newPizza = document.createElement('div');
    newPizza.classList.add('PJ047-pizza');
    newPizza.innerHTML = `
    <div class="PJ047-pizza_image">
      <img src="${pizzaData.image}"/>
    </div>
    <div class="PJ047-pizzaDetails">
      <h3>${[i]}</h3>
      <p>${pizzaData.description}</p>
    </div>`;

    document.querySelector('.PJ047-pizza_section').appendChild(newPizza);
  });

  /**
   * @desc Function to determine which halfs have been chosen
   * 0 - Both chosen, don't select any
   * 1 - first half chosen
   * 2 - second half chosen
   */

  /* eslint-disable */
  const determineWhichHalf = () => {
    const firstHalfChosen = document.querySelector('.PJ047-pizza.PJ047-first_half_active');
    const secondHalfChosen = document.querySelector('.PJ047-pizza.PJ047-second_half_active');
    if (!firstHalfChosen && !secondHalfChosen) {
      return 1;
    }
    if (firstHalfChosen && secondHalfChosen) {
      return 0;
    }
    if (firstHalfChosen) {
      return 2;
    }
    if (secondHalfChosen) {
      return 1;
    }
  };
  /* eslint-enable */

  // loop over the new pizzas, when the new pizza div is clicked, clicked the matching hidden one
  pollerLite(['.halfPizza'], () => {
    const firstHalfPizzaSummary = document.querySelectorAll('.PJ047-half1');
    const secondHalfPizzaSummary = document.querySelectorAll('.PJ047-half2');

    const newPizzas = document.querySelectorAll('.PJ047-pizza');
    for (let i = 0; i < newPizzas.length; i += 1) {
      const element = newPizzas[i];
      element.addEventListener('click', (e) => {
      // on click of the element, remove what half it is, if half is selected
        if (element.classList.contains('PJ047-half_active')) {
          element.classList.remove('PJ047-half_active');
          events.send('PJ047', 'clicked', 'X to remove on any half', { sendOnce: true });

          if (element.classList.contains('PJ047-first_half_active')) {
            element.classList.remove('PJ047-first_half_active');
          }

          if (element.classList.contains('PJ047-second_half_active')) {
            element.classList.remove('PJ047-second_half_active');
          }
        } else {
          const which = determineWhichHalf();
          // if both have not been chosen loop through matching pizzas
          if (which === 1 || which === 2) {
            const currentPizzas = document.querySelectorAll(`#ctl00_cphBody__objHalfAndHalf_divHalf${which} .halfPizza`);
            const pizzaClicked = e.currentTarget.querySelector('h3').textContent;

            // match new pizza divs to the hidden ones
            [].forEach.call(currentPizzas, (item) => {
              const hiddenPizzaName = item.querySelector('.halfPizzaTitle').textContent.trim();
              if (hiddenPizzaName === pizzaClicked) {
                item.click();
                element.classList.add('PJ047-half_active');

                // set active whichever pizza is chosen
                if (which === 1) {
                  element.classList.add('PJ047-first_half_active');
                  const firstHalfName = element.querySelector('h3').textContent;

                  // insert the first half chosen in the summary box
                  for (let x = 0; x < firstHalfPizzaSummary.length; x += 1) {
                    const firstPizza = firstHalfPizzaSummary[x];
                    firstPizza.textContent = firstHalfName;
                  }
                  events.send('PJ047', 'clicked', `First half option: ${firstHalfName}`, { sendOnce: true });
                }
                if (which === 2) {
                  element.classList.add('PJ047-second_half_active');
                  const secondHalfName = element.querySelector('h3').textContent;
                  // insert the second half chosen in the summary box
                  for (let j = 0; j < secondHalfPizzaSummary.length; j += 1) {
                    const secondPizza = secondHalfPizzaSummary[j];
                    secondPizza.textContent = secondHalfName;
                  }
                  events.send('PJ047', 'clicked', `Second half option: ${secondHalfName}`, { sendOnce: true });
                }
              }
            });
          }
        }
      });
    }
  });
};
