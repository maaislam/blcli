import shared from '../lib/shared';
const { ID } = shared;

export default class SingleScarcity {
  constructor() {
    this.create();
    this.render();
  }

  create() {

    const singleMessage = 'This Product is Selling Fast!';

    const element = document.createElement('div');
    element.classList.add(`${ID}_scarcityBar`);

    element.innerHTML = `<p>${singleMessage}</p>`;
    this.component = element;
    
  }
  
  render() {
    const { component } = this;
    const productGallery = document.querySelector('.gallery-placeholder');
    productGallery.insertAdjacentElement('beforebegin', component);
  }
}
