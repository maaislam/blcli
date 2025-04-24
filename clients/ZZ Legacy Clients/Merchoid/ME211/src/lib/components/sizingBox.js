import settings from '../settings';

const { ID } = settings;

export default class SizeBox {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}-sizing_box`);
    element.innerHTML = `
    <div class="${ID}-size_inner">
        <div class="${ID}-price"></div>
        <div class="${ID}-formWrapper"></div>
        <div class="${ID}-usps"></div>
    </div>`
    this.component = element;
    
    // add all elements to box
    const price = document.querySelector('.product-info-price');
    element.querySelector(`.${ID}-price`).appendChild(price);

    const form = document.querySelector('.product-add-form');
    element.querySelector(`.${ID}-formWrapper`).appendChild(form);

    const usps = document.querySelector('.product-usps-wrapper');
    element.querySelector(`.${ID}-usps`).appendChild(usps);
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const productInfo = document.querySelector('.product-info-main');
    productInfo.insertAdjacentElement('afterbegin', component); 
  }
}

