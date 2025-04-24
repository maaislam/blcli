import settings from '../../lib/settings';
import { events } from '../../../../../../lib/utils';

const { ID } = settings;

export default class ReturnsBox {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_returnsBox`);

    element.innerHTML = `
    <span class="${ID}-tick"></span><p><span>Returns policy:</span> you can return this item to us by post or in store for <span>FREE</span> within 30 days for a full refund or exchange.</p>
      <a href="https://www.hsamuel.co.uk/returns/" target="_blank">Click here to see our full Returns policy.</a>
    `;


    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const financeButton = document.querySelector('#js-ifcBuyButton');
    const sizeSelect = document.querySelector('.buying-options__sections #js-options-select');

    // move finance message before button
    if (financeButton) {
      document.querySelector('.buying-buttons-ifc__message').insertAdjacentElement('beforebegin', financeButton);
    }

    // if there is no size select
    if (!sizeSelect) {
      const buyCTA = document.querySelector('.buying-buttons .buying-buttons__buy.js-buyingButton');
      buyCTA.insertAdjacentElement('afterend', component);
    } else {
      component.querySelector('p').innerHTML = '<span>Don\'t worry about sizing.</span> You can return this item to us by post or in store for <span>FREE</span> within 30 days for a full refund or exchange.';
      sizeSelect.addEventListener('change', () => {
        events.send(`${ID} v${settings.VARIATION}`, 'click', 'User selected a size', { sendOnce: true });

        // insert after size
        if (!document.querySelector(`.${ID}_returnsBox`)) {
          const sizeSelectMain = sizeSelect.parentNode;
          sizeSelectMain.insertAdjacentElement('afterend', component);
        }
      });
    }
  }
}
