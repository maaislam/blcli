
/**
 * Business products markup
 */
import shared from "../../../../../../core-files/shared";
import { addProducts, triggerQuickView } from "./helpers";
 
 const { ID } = shared;
 
 export default class Products {
     constructor() {
       this.create();
       this.bindEvents();
       this.render();
     }
   
     create() {
       const element = document.createElement('div');
       element.classList.add(`${ID}-productsWrapper`);
       element.innerHTML = `
       <h3>Browse products available for corporate gifting</h3>
       <div class="${ID}-container">
          <div class="${ID}-filters">
            <span></span>
            <div class="${ID}-filterList">
              
            </div>
          </div> 
          <div class="${ID}-products">
          </div> 
          <div class="${ID}-loadMore">View All Products</div>
       </div>
       `;
       this.component = element;
     }
   
     bindEvents() {
       const { component } = this;

       // show/hide products
       component.querySelector('h3').addEventListener('click', () => {
         if(component.classList.contains(`${ID}-visible`)) {
          component.classList.remove(`${ID}-visible`);
         } else {
          component.classList.add(`${ID}-visible`);
         }
       });
       

       // load more
       component.querySelector(`.${ID}-loadMore`).addEventListener('click', () => {
         component.querySelector(`.${ID}-products`).classList.add(`${ID}-showAll`);
       });
     }
   
     render() {
      const { component } = this;

      if(window.location.href.indexOf('chocolate-corporate-gifts-submitted.html') > -1) {
        document.querySelector(`.${ID}-submittedContainer`).insertAdjacentElement('beforeend', component);

      } else {
        document.querySelector('.craigsmaincontainer-fw').parentNode.insertAdjacentElement('afterend', component);
      }

      // add bestsellers
      addProducts();
      triggerQuickView();
     }
 }
 