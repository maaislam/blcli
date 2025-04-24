/**
 * Calculator markup
 */

import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { addFilters, addProducts, clearAllValues, clickFilters, openLightbox, preventNonNumericalInput, removeFilters, submitButton, triggerQuickView } from "./helpers";

const { ID } = shared;


export default class Calculator {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

      function validate(evt) {
        var theEvent = evt || window.event;
      
        // Handle paste
        if (theEvent.type === 'paste') {
            key = event.clipboardData.getData('text/plain');
        } else {
        // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
          theEvent.returnValue = false;
          if(theEvent.preventDefault) theEvent.preventDefault();
        }
      }

      const element = document.createElement('div');
      element.classList.add(`${ID}-calculatorWrapper`);
      element.innerHTML = `
      <div class="${ID}-container">
          <h3><span>Help us to understand your corporate gifting needs</span></h3>
          <p>Don’t have the time to find the perfect Hotel Chocolat gift? Let us take the hard work out of the decision making for you. Simply fill in our Corporate Gift Finder with your total budget or budget per person and we’ll show you the perfect gifts that matches your needs, so you can bring a smile to their faces while keeping on top of your workload.</p>
          <div class="${ID}-calculatorContainer">
            <div class="${ID}-calculator">
                <div class="${ID}-calculatorStep">
                    <p>Is your budget per person or are you looking for a total budget?</p>
                    <div class="${ID}-tabs">
                          <div class="${ID}-tab ${ID}-perPerson" data-target="budgetPP">Budget per person?</div>
                          <span>OR</span>
                          <div class="${ID}-tab ${ID}-totalBudget" data-target="totalbudget">Total budget?</div>
                    </div>
                    <div class="${ID}-values ${ID}-totalbudget">
                        <div class="${ID}-maxBudget ${ID}-field" type="totalbudget">
                            <label for="totalbudget">Total overall budget:</label>
                            <div class="${ID}-inputWrap">
                                <input type="number" value="" pattern="[0-9]*" min="0" name="totalbudget" oninput="this.value=this.value.replace(/[^0-9]/g,'');" placeholder="Enter amount"/>
                            </div>
                        </div>
                        <div class="${ID}-perPerson ${ID}-field" type="budgetPP">
                            <label for="budgetPP">Max budget per person:</label>
                            <div class="${ID}-inputWrap">
                                <input type="number" value="" pattern="[0-9]*"  oninput="this.value=this.value.replace(/[^0-9]/g,'');" min="0" name="budgetPP" placeholder="Enter amount"/>
                            </div>
                        </div>
                        <div class="${ID}-people ${ID}-field" type="budgetPP, totalbudget">
                            <label for="people">No. of people:</label>
                            <div class="${ID}-inputWrap">
                              <input type="number" value="" pattern="[0-9]*"  oninput="this.value=this.value.replace(/[^0-9]/g,'');" name="people" min="0" placeholder="Enter amount"/>
                            </div>
                        </div>
                        <div class="${ID}-button ${ID}-disabled">Submit</div>
                      </div>
                     
                    </div>
              </div>
               
              <div class="${ID}-summary">
                  <h3>Summary of spend:</h3>
                  <p class="unavailable">Please enter your budget per person or total budget to see your summary of spend and our suggestions to meet your needs.</p>

                  <div class="${ID}-amounts">
                      <div class="${ID}-row ${ID}-budgetPerson" type="totalbudget, budgetPP">
                          <p>Budget per person</p><span></span>
                      </div>
                      <div class="${ID}-row ${ID}-noPpl" type="totalbudget, budgetPP">
                          <p>No of people</p><span></span>
                      </div>
                      <div class="${ID}-row ${ID}-maxSpend" type="totalbudget, budgetPP">
                          <p>Max total spend</p><span></span>
                      </div>
                  </div>
                  <div class="${ID}-qualified">Qualifies for <span></span> off</div>
                  <div class="${ID}-spendMore">
                    <p>Spend <span class="difference"></span> more + recieve <span class="nextPercent"><span/></p>
                    <p>Your whole order</p>
                  </div>
                  <span class="vat">*totals include VAT</span>
              </div>   
          </div>
          <p class="${ID}-delivery">Delivery charges will be applied at checkout - UK Standard and upgraded delivery options are available</p>
      </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      /* ------ Switch between each tab  ----- */

      // make el active based on type
      const activeType = (els, event) => {
        for (let index = 0; index < els.length; index += 1) {
            const element = els[index];
            const elTarget = element.getAttribute('type');
  
            element.classList.remove(`${ID}-active`);
  
            if(elTarget) {
              if(elTarget.indexOf(event.target.getAttribute('data-target')) > -1) {
                  element.classList.add(`${ID}-active`);
              } 
            }
          }
      }

      // make both fields and amounts active
      const makeActive = (event) => {

        submitButton(false, true);
        
        
        const summary = component.querySelector(`.${ID}-summary`);
        if(!summary.classList.contains(`${ID}-active`)) {
          summary.classList.add(`${ID}-active`);
          summary.querySelector(`.unavailable`).classList.add(`${ID}-hidden`);
        }

        // fade inactive tab
        const currentTabList = event.target.classList[1];
        const tabToFade = document.querySelector(`.${ID}-tab:not(.${currentTabList})`);

        tabToFade.classList.add(`${ID}-tabFade`);
        tabToFade.classList.remove(`${ID}-activeTab`);

        event.target.classList.remove(`${ID}-tabFade`);
        event.target.classList.add(`${ID}-activeTab`);

        // make all fields and amountsactive
        const allFields = component.querySelectorAll(`.${ID}-field`);
        const amounts = component.querySelectorAll(`.${ID}-amounts .${ID}-row`);

        activeType(allFields, event);
        activeType(amounts, event);

        clearAllValues();
      }

      const allTabs = component.querySelectorAll(`.${ID}-tabs .${ID}-tab`);
      allTabs.forEach((tab) => {
        tab.addEventListener('click', makeActive);
      });


      /* ------ Submit button click  ----- */
      const submitBtn = component.querySelector(`.${ID}-button`);
      const amountOfPpl = component.querySelector(`.${ID}-people input`);
      const addressBox = document.querySelector(`.${ID}-address`);
      const budgetPP = component.querySelector(`.${ID}-amounts .${ID}-budgetPerson span`);


      submitBtn.addEventListener('click', () => {

        fireEvent('Clicked calculator submit');

        const bdgetAmount = parseFloat(budgetPP.textContent.trim().replace('£', ''));

        if(amountOfPpl.value > 20) {

          document.querySelector(`.${ID}-address h3`).textContent = "We can see you're ordering a high number of gifts. Let us help you on this one.";

          // show address lightbox
          openLightbox(addressBox);
          triggerQuickView();
        
        } else {
          // show contact box
          openLightbox(addressBox);

          document.querySelector(`.${ID}-address h3`).textContent = 'Place Your Order Online';
          document.querySelector(`.${ID}-addressStep`).classList.add(`hidden`);
          document.querySelector(`.${ID}-contactStep`).classList.add(`visible`);
        }

      });
    }
  
    render() {
      const { component } = this;
      document.querySelector(`.${ID}-productsWrapper`).insertAdjacentElement('beforebegin', component);
    }
}
