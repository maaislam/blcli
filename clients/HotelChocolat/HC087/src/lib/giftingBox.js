import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { giftProducts } from "./products";


const { ID, VARIATION } = shared;


export default class GiftingBox {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

      const data = giftProducts;
      const title = data.title;
      
      const element = document.createElement('div');
      element.classList.add(`${ID}-giftingBox`);
      element.innerHTML = `
       <div class="${ID}-container">
        <h3><span>${title}</span></h3>
        <div class="${ID}-carousel">
          <div class="${ID}-products"></div>
        </div>
       </div>`;

      Object.keys(data.products).forEach((i) => {
        const product = data.products[i];
        const item = document.createElement('div');
        item.classList.add(`${ID}-product`);
        item.setAttribute('prod-name', `${[i][0]}`);
        item.innerHTML = `
        <a href="${product.link}"></a>
       
        <div class="${ID}-productimage" style="background-image:url(${product.image})"> ${product.badge ? `<div class="${ID}-badge"><span>perfect gift</span></div>`: ''}</div>
        <div class="${ID}-info">
            <p>${[i][0]}</p>
            <span class="${ID}-price">${product.price}</span>
        </div>`;

        element.querySelector(`.${ID}-carousel .${ID}-products`).appendChild(item);
      });


      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      const products = component.querySelectorAll(`.${ID}-carousel .${ID}-product`);
      for (let index = 0; index < products.length; index++) {
          const element = products[index];
          element.querySelector('a').addEventListener('click', () => {
            const name = element.querySelector('p').textContent.trim();
            fireEvent('Clicked best selling gift ' + name);
          })
      }
     
    
    }
  
    render() {
      const { component } = this;
      document.querySelector('#page_heading').insertAdjacentElement('afterend', component);
    }
  }