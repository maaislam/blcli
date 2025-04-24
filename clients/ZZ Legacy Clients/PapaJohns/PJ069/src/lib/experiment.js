/**
 * PJ069 - Pizza overlay size & crust - phase 1
 * @author User Conversion
 */
import { setup, addExperimentElements } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  // Experiment code
  const allPizzas = document.querySelectorAll('div.menuList');
  [].forEach.call(allPizzas, (pizza) => {
    const selectBtn = pizza.querySelector('a.greenButton');

    selectBtn.addEventListener('click', () => {
      pollerLite([
        () => pizza.querySelector('select.variationDropDown.ddlSize'),
      ], () => {
        if (!pizza.classList.contains('PJ069-elements')) {
          pollerLite(['select.variationDropDown.ddlSize option'], () => {
            addExperimentElements(pizza);
          });
          
        } else {
          // if new elements have been added to this pizza
          // check selected options and ...
          pollerLite(['select.variationDropDown.ddlSize option'], () => {
            if (!pizza.querySelector('.PJ069-pickSize__wrapper')) {
              addExperimentElements(pizza);
            }
          });
        }
      });
    });
    
  });
  // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    try {
      // console.log(sender);
      if (!sender['_postBackSettings'].asyncTarget || sender['_postBackSettings'].asyncTarget === "" || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar4" || sender['_postBackSettings'].asyncTarget.indexOf("$_objMenuProduct$lbAddToBasket") > -1) {
        activate();
      } else if (sender['panelsToUpdate'] && sender['panelsToUpdate'][0] && sender['panelsToUpdate'][0] === "ctl00$cphBody$upProductLists") {
        activate();
      }
    } catch (e) {} 
  });
};

export default activate;
