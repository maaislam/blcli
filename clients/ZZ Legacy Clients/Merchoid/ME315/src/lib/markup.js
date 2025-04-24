import shared from "../../../../../core-files/shared";
import scrollToElement from "./helpers";

const { ID } = shared;


export default class GenderButtons {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-genderButtons`);
      element.innerHTML = `
       <div class="${ID}-container">
        <h3>Christmas Jumpers</h3>
        <div class="${ID}-buttons">
            <div class="${ID}-button" target="men-banner-event">For Him</div>
            <div class="${ID}-button" target="women-banner-event">For Her</div>
        </div>
        <div class="${ID}-content">
            <h4>Top selling <span></span></h4>
            <div class="${ID}-products"></div>
        </div>
       </div>
      `;
      this.component = element;

      const forHimProducts = document.querySelector('.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="men-banner"]');
      const forHerProducts = document.querySelector('.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="women-banner"]');

      element.querySelector(`.${ID}-content .${ID}-products`).appendChild(forHimProducts);
      element.querySelector(`.${ID}-content .${ID}-products`).appendChild(forHerProducts);
    }
  
    bindEvents() {
      const { component } = this;

      const oldForHimBanner = document.querySelector('#men-banner');
      const oldForHerBanner = document.querySelector('#women-banner');

      
    const showActive = (gender) => {

        // make button active
        component.querySelector(`.${ID}-button[target="${gender}-banner-event"]`).classList.add('active');
        component.querySelector(`.${ID}-button:not([target="${gender}-banner-event"])`).classList.remove('active');

        // show products
        component.querySelector(`.${ID}-content`).classList.add(`visible`);

        if (gender === 'men') {
            component.querySelector(`h4 span`).textContent = 'For him';
            
        } else {
            component.querySelector(`h4 span`).textContent = 'For her';
        }

        component.querySelector(`.products.gender-banner-products[data-banner-gender="${gender}-banner"]`).classList.remove('hidden');
        component.querySelector(`.products.gender-banner-products:not([data-banner-gender="${gender}-banner"])`).classList.add('hidden');

        scrollToElement(component.querySelector(`.${ID}-content`));
    }

    const hideAll = () => {
        component.querySelector(`.${ID}-content`).classList.remove(`visible`);
        component.querySelector(`.${ID}-button.active`).classList.remove('active');
        component.querySelector(`.products.gender-banner-products[data-banner-gender="men-banner"]`).classList.add('hidden');
        component.querySelector(`.products.gender-banner-products[data-banner-gender="women-banner"]`).classList.add('hidden');
    }


      component.querySelector(`.${ID}-button[target="men-banner-event"]`).addEventListener('click', (e) => {
          if (e.currentTarget.classList.contains('active')) {
              hideAll();
          } else {
                oldForHimBanner.click();
              showActive('men');
              
          }
      });

      component.querySelector(`.${ID}-button[target="women-banner-event"]`).addEventListener('click', (e) => {
          if (e.currentTarget.classList.contains('active')) {
              hideAll();
          } else {
            oldForHerBanner.click();
              showActive('women');
              
          }
      });
      
    }
  
    render() {
      const { component } = this;

      document.querySelector('.guide-gender-wrapper .banners-wrapper').insertAdjacentElement('afterend', component);
      
    }
  }