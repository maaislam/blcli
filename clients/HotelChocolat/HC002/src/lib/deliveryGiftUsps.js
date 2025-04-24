import shared from "./shared";
import { isNextDayPossible } from "./delivery";

const { ID } = shared;

export default class DeliveryGiftMessaging {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {  
      const element = document.createElement('div');
      element.classList.add(`${ID}-deliveryDetails`);
      element.innerHTML = `
        <h3>Delivery and Gifting details</h3>
        <span class="${ID}-smallPrint">(current situation whilst our logistics are impacted by COVID-19. Last update July 2020)</span>
        <ul class="${ID}-bullets">
            <li>Choose your exact delivery date 
            ${isNextDayPossible() === true ? ` <div class="${ID}-countdownDay">from <span>tomorrow</span></div>` : ''}
            </li>
            <li>Safe, secure, tracked with a 100% happiness promise</li>
            <li>Add a FREE personalised card at checkout</li>
        </ul>
      `;
      this.component = element;

      // hide from tomorrow if after 6pm on mon/tue/wed/thurs/
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
        document.querySelector('.tab-target-mobile .product-tabs').appendChild(component);
    }
  }