import settings from '../settings';

const { ID } = settings;

export default class BasketSteps {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_basket-steps`);
    element.innerHTML = `
    <div class="${ID}-steps_inner">
      <div class="${ID}-step ${ID}-active">
        <span></span>
        <p>Cart</p>
      </div>
      <div class="${ID}-step">
        <span></span>
        <p>Checkout</p>
      </div>
      <div class="${ID}-step">
        <span></span>
        <p>Complete</p>
      </div>
    </div>
    <div class="${ID}-steps_scarcity">You're only 2 steps away from purchasing this merch!</div>`;
    this.component = element;
  }

  render() {
    const { component } = this;
    const existingSteps = document.querySelector('.cart-preamble');
    existingSteps.insertAdjacentElement('beforebegin', component);
  }
}
