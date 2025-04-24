import { events, scrollTo } from '../../../../../../lib/utils';
import { pollerLite } from '../../../../../../lib/uc-lib';
import createIngredientId from './createIngredientId';

export default () => {
  const allIngredients = document.querySelectorAll('.pizzaIngredients .ingredient');

  [].forEach.call(allIngredients, (ingredient) => {
    let portionSelected = '';
    let name = ingredient.querySelector('h2').innerText;
    if (name.indexOf('Extra Cheese') > -1) {
      name = 'Extra Cheese';
    }
    
    let singlePortion = ingredient.querySelector('.amount .single');
    if (singlePortion && singlePortion.classList.contains('selected')) {
      portionSelected = 'single';
    }
    let doublePortion = ingredient.querySelector('.amount .double');
    if (doublePortion && doublePortion.classList.contains('selected')) {
      portionSelected = 'double';
    }

    const ingredientId = createIngredientId(name);

    if (ingredientId !== 'extraCheese' && ingredientId !== 'noCheese') {

      const experimentTopping = document.querySelector(`.topping__wrapper#PJ046-${ingredientId}`);
      if(experimentTopping) {
        const singleBtn = experimentTopping.querySelector(`.singleBtn`);
        const doubleBtn = experimentTopping.querySelector(`.doubleBtn`);

        if(singleBtn) {
          singleBtn.classList.remove('active');
        }
        if(doubleBtn) {
          doubleBtn.classList.remove('active');
        }

        if (portionSelected !== '') {
          const buttonSelected = experimentTopping.querySelector(`.${portionSelected}Btn`);
          buttonSelected.classList.add('active');

          if (buttonSelected) {
            buttonSelected.classList.add('active');
          }
        }
      }
    }
  });
};
