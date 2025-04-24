import { events } from "../../../../../lib/utils";
import shared from "./shared";

const { ID,VARIATION } = shared;

export default class QuestionBox {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-userTypeModal`);
      element.innerHTML = `
       <div class="${ID}-questionContainer">
        <div class="${ID}-title">
            <h4>Are you qualified in the hair or beauty trade?</h4>
            <span>(Or currently training to be)</span>
        </div>
        <div class="${ID}-buttonWrapper">
            <div class="${ID}-button" data-target="yes">Yes</div>
            <div class="${ID}-button" data-target="no">No</div>
        </div>
       </div>
       <div class="${ID}-signUpForm">
            <h4>Great! Sign up for an account today to shop on Salons Direct and be the first to know about exclusive offers and promotions.</h4>
       </div>
       <div class="${ID}-newsletterForm">
            <h4>Unfortunately you must be qualified within the hair/beauty industry to purchase products from Salons Direct.</h4>
            <p>If you’ve selected the wrong option, please select again.<br></br>Alternatively leave your email address to be informed about our new website for those not in the trade.</p>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      const scrollToElement = (element) => {
        window.scroll({
           behavior: 'smooth',
           left: 0,
           top: element.getBoundingClientRect().top + window.scrollY - 20,
       });
    }

      const yesButton = component.querySelector(`.${ID}-button[data-target="yes"]`);
      const noButton = component.querySelector(`.${ID}-button[data-target="no"]`);
      const signUpForm = component.querySelector(`.${ID}-signUpForm`);
      const newsletterForm = component.querySelector(`.${ID}-newsletterForm`);

      yesButton.addEventListener('click', (e) => {
        e.currentTarget.classList.add(`${ID}-selected`);
        noButton.classList.remove(`${ID}-selected`);
        signUpForm.classList.add(`${ID}-activeForm`);
        newsletterForm.classList.remove(`${ID}-activeForm`);

        events.send(`${ID} variation: ${VARIATION}`, 'click', 'Yes button');

        scrollToElement(signUpForm);
      });

      noButton.addEventListener('click', (e) => {
        e.currentTarget.classList.add(`${ID}-selected`);
        yesButton.classList.remove(`${ID}-selected`);
        newsletterForm.classList.add(`${ID}-activeForm`);
        signUpForm.classList.remove(`${ID}-activeForm`);
        events.send(`${ID} variation: ${VARIATION}`, 'click', 'No button');
      });
    }
  
    render() {
      const { component } = this;
      document.querySelector('#maincontent').insertAdjacentElement('afterbegin', component);
      
      // move sign up
      const signUpForm = document.querySelector('#maincontent .columns .column.main');
      component.querySelector(`.${ID}-signUpForm`).appendChild(signUpForm);

      const newsletter = document.querySelector('.form.subscribe.footer-newsletter__form');
      component.querySelector(`.${ID}-newsletterForm`).appendChild(newsletter);

      // change invoice text
      const invoiceLabel = document.querySelector('.fieldset.create.address .legend span');
      invoiceLabel.textContent = 'Billing Address';
    }
  }
