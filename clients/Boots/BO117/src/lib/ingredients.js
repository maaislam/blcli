import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { skinData } from "./data";

const { ID, VARIATION } = shared;

export default class SkincareInfo {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-skincareInfo`);
      element.innerHTML = `
      <div class="${ID}-ingredients">
        <h4>Active Ingredients</h4>
        <div class="${ID}-ingredientsList"></div>
      </div>
      <div class="${ID}-benefits"></div>`;

      this.component = element;

      

      const url = window.location.pathname;
      const ingredients = skinData[url].activeIngredients;
      const benefits = skinData[url].benefits;

      // Add ingredients
      for (let index = 0; index < ingredients.length; index += 1) {
          const ingredient = ingredients[index];
          const el = document.createElement('div');
          el.classList.add('ingredient');
          el.innerHTML = `<span></span><p>${ingredient}</p>`;

          element.querySelector(`.${ID}-ingredientsList`).appendChild(el);
      }

      
      if(VARIATION === '1') {
        Object.keys(benefits).forEach((i) => {
            const data = benefits[i];
            const benefit = document.createElement('div');
            benefit.classList.add('benefit');
            benefit.classList.add(data.classEl)
            benefit.innerHTML = `<span></span><p>${[i][0]}</p>`;
        
            element.querySelector(`.${ID}-benefits`).appendChild(benefit);
        });
    }

    }
  
    bindEvents() {
      const { component } = this;

      const allIngredients = component.querySelectorAll(`.${ID}-ingredientsList .ingredient`);
      
      for (let index = 0; index < allIngredients.length; index += 1) {
        const ing = allIngredients[index];
        ing.addEventListener('click', (e) => {
          const name = e.currentTarget.textContent;
          fireEvent('Clicked ingredient ' + name);
        });
      }

      if(VARIATION === '1') {
        const allBenefits = component.querySelectorAll(`.${ID}-benefits .benefit`);
        for (let i = 0; i < allBenefits.length; i += 1) {
          const ben = allBenefits[i];
          ben.addEventListener('click', (e) => {
            const benName = e.currentTarget.textContent;
            fireEvent('Clicked benefit ' + benName);
          });
        }
      }
    }
  
    render() {
      const { component } = this;

      document.querySelector('#estore_pdp_trcol').insertAdjacentElement('beforeend', component);
      
    }
  }
