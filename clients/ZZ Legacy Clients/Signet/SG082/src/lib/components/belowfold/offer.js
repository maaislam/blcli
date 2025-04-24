/**
 * Reviews
 */
import shared from "../../shared";
import { events } from "../../../../../../../lib/utils";

const { ID, VARIATION } = shared;

export default class OfferBox {
    constructor() {
      this.create();
      this.render();
    }
  
    create() {

        const newsletterOffer = document.querySelector('.email-sign-up');

        // inner changes
        newsletterOffer.querySelector('.email-sign-up__title').textContent = 'Get 10% off your ring';
        newsletterOffer.querySelector('.email-sign-up__title').insertAdjacentElement("afterend", newsletterOffer.querySelector('.email-sign-up__text'));
        newsletterOffer.querySelector('.email-sign-up__policy-label span').innerHTML = 'I accept the <a href="https://www.ernestjones.co.uk/webstore/static/customerservice/customer_privacy_policy.do">privacy policy</a>';

        const element = document.createElement('div');
        element.classList.add(`${ID}__offerBlock`);
        element.innerHTML = 
       `<div class="${ID}__blockInner">
            <div class="${ID}-blockBack">
                <div class="${ID}__block">
                </div>
            </div>
        </div>`
        
        element.querySelector(`.${ID}__block`).appendChild(newsletterOffer);

        this.component = element;
    }
  
    render() {
      const { component } = this;
      document.querySelector(`.${ID}__offer .${ID}__sectionContainer`).appendChild(component);

      const signUpButton = document.querySelector('.email-sign-up #js-email-sign-up__submit');

      signUpButton.addEventListener('click', () => {
        if(document.querySelector('.email-sign-up__email-input').value !== '') {
          events.send(`${ID} variation: ${VARIATION}`, 'click', '10% sign up');
        }
      });
      
    }
  }
  
