import shared from '../shared';

const { ID } = shared;

export default class ProductOffer {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_offer_box`);
    element.innerHTML = `
     <h2>Exclusive offer</h2>
     <div class="${ID}-image"></div>
     <div class="${ID}-offertext">
        <div class="${ID}-productName">Two Tone Cubic Zirconia Filigree Heart Locket</div>
        <div class="${ID}-priceText">
            <span><strong>Only £39.99</strong>(Was £79.99)</span>
            <p>when purchased with any product</p>
        </div>
    </div>
    <div class="${ID}-bottomText">
        ${shared.VARIATION === '1' ? 
        `<span>Offer available in the basket</span>` : 
        `<div class="${ID}-addCheckbox">
        <input id="${ID}-offerCheck" type="checkbox" name="check" value="${ID}-offerCheck">  
        <label for="${ID}-offerCheck">Add offer to basket</label>  
         </div>`}
    </div>
    `;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const offer = document.querySelector('.product-price');
    offer.insertAdjacentElement('afterend', component);
    
  }
}

