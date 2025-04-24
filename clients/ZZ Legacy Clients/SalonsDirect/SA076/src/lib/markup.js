import { pollerLite } from "../../../../../lib/utils";
import shared from "./shared";

const { ID } = shared;


export default class PageMarkup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-content`);
      element.innerHTML = `
        <div class=${ID}-top>
            <div class="${ID}-mainImage"></div>
            <div class="${ID}-info">
            ${window.innerWidth > 767 ? `<div class="${ID}-actions"></div>` : ``}
            </div>
        </div>
        ${window.innerWidth <= 767 ? `<div class="${ID}-actions"></div>` : ``}
        <div class="${ID}-similar">
            <h4>See Similar</h4>
            <div class="${ID}-buttons">
                <a class="${ID}-button" href="https://www.salonsdirect.com/new-in">Shop all New In</a>
                <a class="${ID}-button" href="https://www.salonsdirect.com">Shop all Products</a>
            </div>
        <div>
        <div class="${ID}-recommended">
            <h4>You May Also Like</h4>
            <div class="${ID}-carousel"></div>
        </div>
      `;
      this.component = element;

      const offer = document.querySelector('.product-info-offers');
      if(offer && offer.querySelector('.product.attribute.offer-heading-one')) {
        element.querySelector(`.${ID}-similar`).insertAdjacentElement('afterbegin',offer);
      }

      // move main image
      element.querySelector(`.${ID}-mainImage`).appendChild(document.querySelector('.product.media'));

      // move product info
      element.querySelector(`.${ID}-info`).insertAdjacentElement('afterbegin', document.querySelector('.product-info-price'));
      element.querySelector(`.${ID}-info`).insertAdjacentElement('afterbegin', document.querySelector('.product.attribute.sku'));
      element.querySelector(`.${ID}-info`).insertAdjacentElement('afterbegin', document.querySelector('.page-title-wrapper.product'));

      // move price
      element.querySelector(`.${ID}-actions`).appendChild(document.querySelector('.product-info-main'));

      
      // move overview on tablet
      if(window.innerWidth > 767) {
        pollerLite(['.product-info-main .product.attribute.overview'], () => {
          const productOverview = document.querySelector('.product-info-main .product.attribute.overview');
          element.appendChild(productOverview);
        });
     
      }
      
      
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector('.column.main').insertAdjacentElement('beforebegin', component);
    }
  }