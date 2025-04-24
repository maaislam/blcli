import shared from '../shared';
import { __ } from '../helpers';
import { pollerLite } from '../../../../../../lib/utils';
import { showLoader, hideLoader } from './loader';

const { ID } = shared;

export default class BottomContent {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_bottomContent`);
    element.innerHTML = `
        <div class="${ID}-form_title">
            <h2>${__('Get your free brochure')}</h2>
            <p>${__('Fill in the form to recieve your free MYRUN brochure')}</p>
        </div>
        <div class="${ID}-form_wrapper">
            
        </div>
        <div class="${ID}-formBackground"></div>
    `;

    pollerLite(['#requestform'], () => {
        element.querySelector(`.${ID}-form_wrapper`).appendChild(document.querySelector('#requestform'));
    });

    this.component = element;

  }

  bindEvents() {
    const { component } = this;

    // if form submit, show loader
    const form = component.querySelector('#requestform');
    form.addEventListener('submit', () => {
      showLoader();

      // hide loader, reset form
      setTimeout(() => {
        hideLoader();

        form.style.display = 'block';
        const formInputs = form.querySelectorAll('.form__fields .form-group input:not(.btn');
        for (let index = 0; index < formInputs.length; index += 1) {
          const element = formInputs[index];
          element.value = '';
        }

        window.scrollTo(0,0);

      }, 3000);
    });
  }

  render() {
    const { component } = this;
    const topContent = document.querySelector(`.${ID}_topContent`);
    topContent.insertAdjacentElement('afterend', component);

    // move form elements
    const privacyText = document.querySelector('.firstprivacytext');
    const bottomPrivacyText = document.querySelector('.secondprivacytext');
    const formButton = document.querySelector('.form__submit');
    formButton.insertAdjacentElement('afterend', privacyText);
    privacyText.insertAdjacentElement('afterend', bottomPrivacyText);

    formButton.querySelector('.btn').value = `${__('Download Brochure')}`;

    // add mandatory to all form fields
    const allFields = component.querySelectorAll('.form-group label');
    for (let index = 0; index < allFields.length; index += 1) {
      const element = allFields[index];
      element.insertAdjacentHTML('afterend', '<span>*</span>');
    }
  }
}
