import shared from "../../../../../../core-files/shared";
import { minus, plus } from "../helpers";

const { ID } = shared;

export default class VelvetiserSteps {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

      const element = document.createElement('div');
      element.classList.add(`${ID}-topContent`);
      element.innerHTML = `
        <div class="${ID}-left">
            <div class="${ID}-mainSlider"></div>
            <div class="${ID}-subBox">
              <div class="${ID}-image"></div>
              <div class="${ID}-info">
                <h3>VELVETISER + REFILLS SUBSCRIPTION</h3>
                <p>Buy the Velvetiser™ for <b>£49.95</b> with a 6 or 12-month Velvetiser Refill Subscription. </p>
                <p>Includes free Standard UK Delivery* – and you’ll earn chocolate rewards.</p>
                <a class="${ID}-subLink" href="https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Configurator-Show">Find out more</a>
              </div>
            </div>
        </div>
        <div class="${ID}-right">
            <div class="${ID}-reviewSection"></div>
            <div class="${ID}-accordionSteps">
                  <p>Build your Velvetiser Kit below</p>
                <div class="${ID}-accordionStep ${ID}-colours"> 
                    <div class="${ID}-stepTitle">1. Choose your Velvetiser Colour</div>
                    <span class="${ID}-smallText">(Your Velvetiser includes 2 FREE Limited Edition Pod Cups)</span>
                    <div class="${ID}-stepContent">
                     <div class="${ID}-carousel"></div>
                    </div>
                </div>
                <div class="${ID}-accordionStep ${ID}-kits">
                    <div class="${ID}-stepTitle">2. Choose your starter kit*</div>
                    <span class="${ID}-smallText">Discount price only when bought with the Velvetiser</span>
                    <div class="${ID}-stepContent">
                      <div class="${ID}-carousel"></div>
                    </div>
                </div>
                <div class="${ID}-accordionStep ${ID}-flakesSlider">
                <div class="${ID}-stepTitle">3. Add a little more?</div>
                <div class="${ID}-stepContent">
                    <div class="${ID}-carousel"></div>
                </div>
            </div>
            </div> 
        </div>
        <div class="${ID}-addToBagMobile">
          <div class="${ID}-container">
            <div class="${ID}-row">
              <div class="${ID}-price">Only <span>£99.95</span></div>
              <div class="${ID}-stock"><span></span>In Stock</div>
            </div>
            <div class="${ID}-row">
              <div class="${ID}-qty">
                <div class="${ID}-qtyButton ${ID}-minus">-</div>
                  <input type="number" class="${ID}-quantity-input" value="1" step="1" min="1" max="" name="quantity">
                <div class="${ID}-qtyButton ${ID}-plus">+</div>
              </div>
              <div class="${ID}-fixedCTA ${ID}-add">Add to bag</div>
            </div>
            </div>
        </div>
      `;
      this.component = element;

      // Move existing content
        const content = document.querySelector('#product-content');
        element.querySelector(`.${ID}-right`).appendChild(content);
      
    }
  
    bindEvents() {
      const { component } = this;

      /** Increase qty in fixed mobile bar */

      if(component.querySelector(`.${ID}-addToBagMobile`)) {
        const increaseValueBtn = component.querySelector(`.${ID}-qtyButton.${ID}-plus`); 
        const decreaseValueBtn = component.querySelector(`.${ID}-qtyButton.${ID}-minus`);

        increaseValueBtn.addEventListener('click', () => {
          plus();
          document.querySelector('.quantity .btn[data-type="plus"]').click();
        });
        decreaseValueBtn.addEventListener('click', () => {
          minus();
          document.querySelector('.quantity .btn[data-type="minus"]').click();
        });
      }

      // on add to bag click, click actual add to bag
      component.querySelector(`.${ID}-fixedCTA`).addEventListener('click', () => {
        document.querySelector(`.pdpForm .${ID}-add`).click();
      });
    }
  
    render() {
      const { component } = this;
      document.querySelector('.product-col-1').insertAdjacentElement('beforebegin', component);

      if(window.innerWidth <= 767) {
        document.querySelector('.wishlist-wrapper').insertAdjacentElement('beforebegin', document.querySelector(`.${ID}-subBox`));
      }
      
    }
  }
