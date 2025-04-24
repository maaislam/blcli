import shared from "../../../../../../core-files/shared";
import { rightIcons } from "../helpers";

/**
 * Redesign of header for V1 & 2
 */
const { ID } = shared

 export default class HeaderSimple {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}-header`);
    element.innerHTML = `
      <div class="${ID}-headerContent">
        <div class="${ID}-headerContainer">
          <div class="${ID}-left">
            <div class="${ID}-navToggle"></div>
            <div class="${ID}-reviews"></div>
          </div>
          <div class="${ID}-middle">
            <div class="${ID}-logo"><a href="/"></a></div>
            <div class="${ID}-logoText">Buy Awesome, Official Geek Merchandise</div>
          </div>
          ${rightIcons()}
        </div>
      </div>
    `;
    this.component = element;

    const navToggle = document.querySelector('.action.nav-toggle');
    element.querySelector(`.${ID}-navToggle`).appendChild(navToggle);

    if(window.location.href.indexOf('/checkout/cart/') === -1) {
      if(window.innerWidth >= 1200) {
        const reviews = document.querySelector('#reviews');
        element.querySelector(`.${ID}-reviews`).appendChild(reviews);
      }
    }
  }

  bindEvents() {
    const { component } = this;

  }

  render() {
    const { component } = this;
    document.querySelector('.page-header').insertAdjacentElement('afterend', component);

  }
}
