
/**
 * Address question lightbox
 */

import shared from "../../../../../../core-files/shared";
import { addFilters, addProducts, clickFilters, closeLightbox, openLightbox, triggerQuickView } from "./helpers";

const { ID } = shared;

export default class AddressLightbox {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() { 
      
      const element = document.createElement('div');
      element.classList.add(`${ID}-modal`);
      element.classList.add(`${ID}-address`);
      element.innerHTML = `
        <div class="${ID}-close"></div>
        <h3>We can see you're ordering a high number of gifts. Let us help you on this one.</h3>
        <div class="${ID}-modalInner">
            <div class="${ID}-addressStep">
                <div class="${ID}-options">
                    <div class="${ID}-option" data-attr="oneAddress">Is this order to <span>one address only?</span></div>
                    <span>OR</span>
                    <div class="${ID}-option" data-attr="multipleAddress">Is this order to <span>multiple addresses?</span></div>
                </div>
            </div>
            <div class="${ID}-contactStep">
              <div class="${ID}-container">
                <p>Great news! You can place an order online.<br>Choose your products below, add them to your bag and continue to checkout.</p>
                <div class="${ID}-viewbtn ${ID}-btnShow">View products</div>
              </div>
              <div class="${ID}-contact">
                <div class="${ID}-inner">
                  <span></span>
                  <h4>Need Help? Call our gifting team: <br><a href="tel:03444932323">03444 93 23 23</a></h4>
                </div>
              </div>
            </div>
        </div>`;

        this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      const formLightbx = document.querySelector(`.${ID}-form`)

      const overlay = document.querySelector(`.${ID}-overlay`);
      overlay.addEventListener('click', () => {
        component.querySelector(`.${ID}-addressStep`).classList.remove(`hidden`);
        component.querySelector(`.${ID}-contactStep`).classList.remove(`visible`);

        closeLightbox(component);
      });

      const closeBox = component.querySelector(`.${ID}-close`);
      closeBox.addEventListener('click', () => {
        component.querySelector(`.${ID}-addressStep`).classList.remove(`hidden`);
        component.querySelector(`.${ID}-contactStep`).classList.remove(`visible`);

        closeLightbox(component);
      });

      /* ------ Address boxes  ----- */

      const options = component.querySelectorAll(`.${ID}-option`);
      for (let index = 0; index < options.length; index += 1) {
        const element = options[index];

        element.addEventListener('click', (e) => {

          const noOfPeople = document.querySelector(`.${ID}-amounts .${ID}-noPpl span`);
          const ppl = parseFloat(noOfPeople.textContent.trim());

          if (e.currentTarget.getAttribute('data-attr') === 'oneAddress') {
            
            // show contact if over 1000
            if(ppl > 1000) {
              closeLightbox(component);
              const budgetPP = document.querySelector(`.${ID}-amounts .${ID}-budgetPerson span`);
              const bdgetAmount = parseFloat(budgetPP.textContent.trim().replace('£', ''));

              
              openLightbox(formLightbx, 'mainForm');

              const amountOfPeople = document.querySelector(`.${ID}-amounts .${ID}-noPpl span`); 
              document.querySelector('.field-wrapper #budget').value = '£' + bdgetAmount;
              document.querySelector('.field-wrapper #giftType').value = amountOfPeople.textContent + 'number of people';
              formLightbx.querySelector('h3').textContent = "We can see you're ordering a high number of gifts. Let us help you on this one.";

            } else {
              component.querySelector(`.${ID}-addressStep`).classList.add(`hidden`);
              component.querySelector(`.${ID}-contactStep`).classList.add(`visible`);
            }

          } else {
            closeLightbox(component);
            
            openLightbox(formLightbx, 'mainForm');

             // update budget in form
             const budgetPP = document.querySelector(`.${ID}-amounts .${ID}-budgetPerson span`);
             const bdgetAmount = parseFloat(budgetPP.textContent.trim().replace('£', ''));
 
             const amountOfPeople = document.querySelector(`.${ID}-amounts .${ID}-noPpl span`); 
             document.querySelector('.field-wrapper #budget').value = '£' + bdgetAmount;
             document.querySelector('.field-wrapper #giftType').value = amountOfPeople.textContent + 'number of people';
              formLightbx.querySelector('h3').textContent = "We can see you're ordering a high number of gifts. Let us help you on this one.";
          }

        });
      }

      component.querySelector(`.${ID}-viewbtn`).addEventListener('click', () => {
        const budgetPP = document.querySelector(`.${ID}-amounts .${ID}-budgetPerson span`);
        const bdgetAmount = parseFloat(budgetPP.textContent.trim().replace('£', ''));

        component.querySelector(`.${ID}-addressStep`).classList.remove(`hidden`);
        component.querySelector(`.${ID}-contactStep`).classList.remove(`visible`);

        closeLightbox(component);
        // load products
        addProducts(bdgetAmount);
        triggerQuickView();
      });
    }
  
    render() {
      const { component } = this;
      document.body.append(component);
    }
}