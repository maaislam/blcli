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
        </div>
        <div class="${ID}-right">
            <div class="${ID}-reviewSection"></div>
            <div class="${ID}-accordionSteps">
                <div class="${ID}-accordionStep ${ID}-colours"> 
                    <div class="${ID}-chosenOption">
                      <div class="${ID}-optionTitle">
                        <div class="${ID}-image"></div>
                        <p></p>
                    </div>
                    </div>
                    <div class="${ID}-stepTitle">1. Choose your Velvetiser Colour</div>
                    <span class="${ID}-smallText">(Your Velvetiser includes 2 FREE Limited Edition Pod Cups)</span>
                    <div class="${ID}-stepContent"></div>
                </div>
                <div class="${ID}-accordionStep ${ID}-kits">
                    <div class="${ID}-chosenOption">
                      <div class="${ID}-optionTitle">
                        <div class="${ID}-image"></div>
                        <p></p>
                      </div>
                    </div>
                    <div class="${ID}-stepTitle">2. Choose your starter kit*</div>
                    <span class="${ID}-smallText">Discount price only if bought with machine</span>
                    <div class="${ID}-stepContent"></div>
                    <div class="${ID}-skip ${ID}-product">Skip this step</div>
                </div>
                <div class="${ID}-accordionStep ${ID}-flakesSlider">
                    <div class="${ID}-chosenOption">
                        <div class="${ID}-optionTitle">
                          <div class="${ID}-image" style="background-image:url(https://editor-assets.abtasty.com/48343/615589a0a4ef61632995744.png)"></div>
                          <p><b>Add ons:</b></p>
                        </div>
                        <div class="${ID}-addOns">
                          <div class="${ID}-allSelected"></div>
                          <span class="${ID}-more">View all extras</span>
                        </div>
                    </div>
                    <div class="${ID}-stepTitle">3. Add a little more?</div>
                    <span class="${ID}-smallText">Select as many as you like, remember these are <i>exclusive to your bundle!</i></span>
                    <div class="${ID}-amountAdded">You've added <span><span class="${ID}-extraAmount">0</span> extras</span></div>
                    <div class="${ID}-stepContent">
                        <div class="${ID}-carousel"></div>
                    </div>
                    <div class="${ID}-skip ${ID}-product">Skip this step</div>
                    <div class="${ID}-confirm">Confirm Extra Choices</div>
                </div>
            </div> 
        </div>
        <div class="${ID}-addToBagMobile">
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
      
    }
  }
