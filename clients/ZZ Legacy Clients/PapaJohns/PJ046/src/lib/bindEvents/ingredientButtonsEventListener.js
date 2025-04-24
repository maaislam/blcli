import { events, scrollTo } from '../../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../../lib/uc-lib';
import ingredientChecker from '../components/ingredientChecker';

let observerConnected = false;

export default () => {
  // Find matching ingredient in background
  const matchIngredient = (name, buttonSelected) => {
    let classToLookFor = '';
    switch(buttonSelected) {
      case 'Single':
        classToLookFor = 'single';
        break;
      case 'Double':
        classToLookFor = 'double';
        break;
      case 'Remove':
        break;
    }
    const allHiddenIngredients = document.querySelectorAll('.pizzaIngredients .ingredient');

    [].forEach.call(allHiddenIngredients, (hiddenIngredient) => {
      const hiddenIngredientName = hiddenIngredient.querySelector('.details h2');
      if (hiddenIngredientName && hiddenIngredientName.innerText.trim() === name) {
        if (classToLookFor !== '') {
          const buttonToClick = hiddenIngredient.querySelector(`.${classToLookFor}`);
          // Single/Double button clicked 
          if (buttonToClick && buttonToClick.id) {
            window.__doPostBack(buttonToClick.id.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
            // Waits until something has changed in the Order Summary or Ingredients List
            const upCustomise = document.querySelector('#ctl00_cphBody__objCustomise_upCustomise');
            const upCustomiseIngredients = document.querySelector('.customiseBox #ctl00_cphBody__objCustomise_upCustomise .ingredients');

            if(!observerConnected) {
              observer.connect([upCustomise, upCustomiseIngredients], () => {
                ingredientChecker();
              }, {
                throttle: 200,
                config: {
                  attributes: false,
                  childList: true,
                },
              });

              observerConnected = true;
            }
          }
        // Remove button clicked
        } else {
          // Checks if there is a selected portion and removes it
          const preSelectedBtnToRemove = hiddenIngredient.querySelector('a.selected');
          if (preSelectedBtnToRemove && preSelectedBtnToRemove.id) {
            window.__doPostBack(preSelectedBtnToRemove.id.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
          }
        }
        

      }
    });
  };

  const allIngredients = document.querySelectorAll('.topping__wrapper');

  [].forEach.call(allIngredients, (ingredient) => {
    const buttons = ingredient.querySelectorAll('.PJ046-ingredient__button');

    [].forEach.call(buttons, (button) => {
      button.addEventListener('click', () => {
        events.send('PJ046', 'clicked-ingredient-option');

        const buttonText = button.innerText;
        const name = ingredient.querySelector('.topping__name div').innerText;
        matchIngredient(name, buttonText);
      });
    });
  });
};
