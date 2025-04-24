import settings from '../../../lib/settings';
import { __ } from '../../helpers';

const { ID } = settings;

export default class Form {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_form`);

    element.innerHTML = `
    <div class="${ID}-title">
      <h3 class="${ID}-formTitle">${__('We would love to help you find your perfect treadmill')}</h3>
      <span>${__('Fill in the form to get your')}</span>
      <h2>${__('FREE BROCHURE')}</h2>
    </div>
    <div class="${ID}-form_container">
      <div class="${ID}-form"></div>
      <div class="${ID}-checkbox">
        <span></span>
        <p>${__('I consent to the use of personal data for marketing and publicity purposes.')}.</p>
      </div>
      <div class="${ID}-form_button">${__('Get it now!')}</div>
      <p class="${ID}-terms">
      ${__('Having read and understood the')}
        <a href="http://www.technogym.com/gb/privacy-policy/" data-children-count="0"> ${__('Privacy Policy')}</a> 
        ${__('and having accepted the')}
        <a href="http://www.technogym.com/${__('gb')}/" data-children-count="0">
         ${__('Technogym Terms and Conditions')}</a>.
      </p>
      <p>${__('I am aware that I may object to the sending of newsletters at any time.')}</p>
      </div>
      <span class="${ID}-trigger_form"></span>`;

    this.component = element;
  }

  bindEvents() {
    const { component } = this;

    // submit the form
    const formSubmit = document.querySelector('#submit-button');
    component.querySelector(`.${ID}-form_button`).addEventListener('click', () => {
      formSubmit.click();
    });

    // click the actual checkbox
    const formCheckbox = document.querySelector('.form__terms #agree');
    component.querySelector(`.${ID}-checkbox`).addEventListener('click', () => {
      formCheckbox.click();

      if (formCheckbox.checked) {
        component.querySelector(`.${ID}-checkbox`).classList.add(`${ID}-checked`);
      } else {
        component.querySelector(`.${ID}-checkbox`).classList.remove(`${ID}-checked`);
      }
    });
  }

  render() {
    const { component } = this;
    document.querySelector(`.${ID}_topHeader`).insertAdjacentElement('afterend', component);

    const currentForm = document.querySelector('#requestform');
    component.querySelector(`.${ID}-form`).appendChild(currentForm);

    currentForm.querySelector('#submit-button').textContent = 'Get it now!';


    // fix the form on scroll
    /*window.onscroll = () => {
      // const el = document.querySelector(`.${ID}_form`);
      const el = document.querySelector('.tg10-productInfo');
      
      const pageScrolled = window.pageYOffset || document.documentElement.scrollTop; // how much page is scrolled
      const topOfForm = (el.getBoundingClientRect().top + 100); // top of main div
      if (pageScrolled > topOfForm) {
        document.querySelector(`.${ID}_form`).classList.add(`${ID}_form-fixed`);
      } else {
        document.querySelector(`.${ID}_form`).classList.remove(`${ID}_form-fixed`);
      }
    };*/
    const form = document.querySelector(`.${ID}_form`);
    const belowFold = document.querySelector('.page-container .main-content');
    
    let reset = null;
    window.onscroll = () => {
      let additionalOffset = 200;
      if(window.TG082ScrollOffset) {
        additionalOffset = window.TG082ScrollOffset;
      }
      const navOffset = (belowFold.getBoundingClientRect().y + window.scrollY) + additionalOffset + (reset || 0);
      const scrollTop = (document.documentElement && document.documentElement.scrollTop)
      || document.body.scrollTop;
      if (scrollTop >= navOffset) {
        if(reset === null) {
          reset = form.getBoundingClientRect().height
          belowFold.style.paddingTop =  reset + 'px';
        }

        form.classList.add(`${ID}_form-fixed`);
      } else {
        if(reset !== null) {
          belowFold.style.paddingTop = '0';
          reset = null;
        }

        form.classList.remove(`${ID}_form-fixed`);
      }
    };


    // if the form is fixed, open it on click
    const formTrigger = document.querySelector(`.${ID}-trigger_form`);
    const formContent = document.querySelector(`.${ID}-form_container`);

    formTrigger.addEventListener('click', () => {
      if (formContent.classList.contains(`${ID}_form_showing`)) {
        formContent.classList.remove(`${ID}_form_showing`);
        document.body.classList.remove(`${ID}_no_scroll`);
        formTrigger.style = 'transform: rotate(0deg)';
      } else {
        formContent.classList.add(`${ID}_form_showing`);
        document.body.classList.add(`${ID}_no_scroll`);
        formTrigger.style = 'transform: rotate(180deg)';
      }
    });
  }
}
