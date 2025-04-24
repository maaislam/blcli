import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import data from "./productData";

const { ID, VARIATION } = shared;


export default class VelvetiserUpsell {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

      const title = data.title;
      
      const element = document.createElement('div');
      element.classList.add(`${ID}-addonsBox`);
      element.innerHTML = `
       <div class="${ID}-container">
        <h3>${title}</h3>
        <div class="${ID}-carousel">
          <div class="${ID}-products"></div>
          <div class="${ID}-add">Add to bag</div>
        </div>
       </div>`;

      // add products
      const upsellProducts = data.products;

      Object.keys(upsellProducts).forEach((i) => {
        const product = upsellProducts[i];
        const item = document.createElement('div');
        item.classList.add(`${ID}-product`);
        item.setAttribute('prod-id', product.id);
        item.setAttribute('prod-name', `${[i][0]}`);
        item.innerHTML = `
        <div class="${ID}-productimage" style="background-image:url(${product.image})"></div>
        <p>${[i][0]}${product.wasPrice ? `<div class="${ID}-priceBlock"><span class="${ID}-wasPrice">${product.wasPrice}</span> <span class="${ID}-price">${product.price}</span></div>` : `<span class="${ID}-price">${product.price}</span>`}`;

        element.querySelector(`.${ID}-carousel .${ID}-products`).appendChild(item);
      });


      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;


      const products = component.querySelectorAll(`.${ID}-carousel .${ID}-product`);
      const addButton = component.querySelector(`.${ID}-add`);

      /** -----------
      * Click product logic
      * ------------  */ 

      const chooseKit = () => {
       
        const makeActive = (e) => {
            e.preventDefault();
  
            //window.jQuery(`.${ID}-flakesSlider .${ID}-carousel`).slick('refresh');

            // remove if deselected
            if(e.currentTarget.classList.contains(`${ID}-selected`)) {
              e.currentTarget.classList.remove(`${ID}-selected`);
              addButton.classList.remove(`${ID}-show`);
  
              // add active, remove any other actives
            } else if(!e.currentTarget.classList.contains(`${ID}-selected`)) {
  
              for (let index = 0; index < products.length; index += 1) {
                const element = products[index];
                element.classList.remove(`${ID}-selected`);

              }  
              e.currentTarget.classList.add(`${ID}-selected`);
              addButton.classList.add(`${ID}-show`);
            }
        }
        
        for (let x = 0; x < products.length; x += 1) {
          const el = products[x];
          el.addEventListener('click', makeActive);
        }
      }

      const chooseFlakes = () => {
          for (let index = 0; index < products.length; index += 1) {
          const element = products[index];
          element.addEventListener('click', () => {
           
              if(element.classList.contains(`${ID}-selected`)) {
                  element.classList.remove(`${ID}-selected`);
              } else {
                  element.classList.add(`${ID}-selected`);
              }

              // add button
              if(element.classList.contains(`${ID}-selected`) && !document.querySelector(`.${ID}-product.${ID}-selected`)) {
                addButton.classList.remove(`${ID}-show`);
              } else if(document.querySelector(`.${ID}-product.${ID}-selected`)){
                addButton.classList.add(`${ID}-show`);
              } else {
                addButton.classList.remove(`${ID}-show`);
              }
          });
        }
      }

      if(VARIATION === '1') {
        chooseKit();
      } else if (VARIATION === '2') {
        chooseFlakes();
      }


      /** -----------
      * Add to basket logic
      * ------------  */ 

      const ajaxAdd = () => {

        // get all added
        const allSelected = document.querySelectorAll(`.${ID}-product.${ID}-selected`);
        
        if(allSelected) {

          for (let index = 0; index < allSelected.length; index += 1) {
            const element = allSelected[index];
            const productSku = element.getAttribute('prod-id');

            let type;
            if(VARIATION === '1') {
              type = 'Kit';
            } else if(VARIATION === '2') {
              type = 'Accessories';
            }
            
            if(productSku) {

              window.jQuery.ajax({
                url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
                type: 'post',
                data: `Quantity=1&cartAction=add&pid=${productSku}`,
                success:function(){
                 
                  fireEvent(`Velvetiser ${type} added to bag`);
                  window.location.reload();
                }
              });
            } 
          }
        }
      }

      addButton.addEventListener('click', () => {
        addButton.textContent = 'Adding...';
        ajaxAdd();
      });
      

    }
  
    render() {
      const { component } = this;
      document.querySelector('#cart-items-form').insertAdjacentElement('afterend', component);
    }
  }