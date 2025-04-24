/* eslint-disable no-underscore-dangle */
import settings from './../settings';
import { events } from '../../../../../lib/utils';

/** Class that builds a financing info component on PLP items */
export default class FinanceBoxPLP {
  /**
   * @param {HTMLElement} product Product to attach component to in listing
   */
  constructor(product) {
    this._price = Number(product.querySelector('.product-tile__price-value').innerHTML.trim());
    const qualifies = this._price >= 300;
    if (qualifies) {
      this._product = product;
      this._link = product.querySelector('.productLink').href;
      this._maxiumumTerm = (() => {
        let term;
        if (this._price >= 999) {
          term = 36;
        } else if (this._price >= 750) {
          term = 24;
        } else {
          term = 12;
        }

        return term;
      })();
      this._create();
      this._bindEvents();
      this._render();
    } else {
      return false;
    }
  }

  /** Create component element */
  _create() {
    const component = document.createElement('a');
    component.href = this._link;
    component.classList.add(`${settings.ID}_FinanceBoxPLP`);
    const pricePerMonth = (((90 / 100) * this._price) / this._maxiumumTerm).toFixed(2);
    component.innerHTML = `<p>From <em>£${pricePerMonth}</em> per month</p>`;

    this._component = component;
  }

  _bindEvents() {
    this._component.addEventListener('click', () => {
      events.send(settings.ID, 'Clicked', 'The \'Added\' Finance Message');
    });
  }

  /** Render component elements */
  _render() {
    const bottom = this._product.querySelector('.product-tile__docked-to-bottom');
    bottom.parentElement.insertBefore(this._component, bottom);
  }
}
