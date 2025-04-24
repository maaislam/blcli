/**
 * @desc New customisation options - only show on logo select
 */

import settings from '../../settings';
import fileUpload from './fileUpload';
import NoPreviousUploads from './noUploads';
import { pollerLite } from '../../../../../../../lib/uc-lib';

const { ID } = settings;

export default class CustomisationOptions {
  constructor(options) {
    this.optionStyles = options.customOptions;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_customisation_options`);

    /* create the fixed pop up basket */
    element.innerHTML = `
      <div class="${ID}_custom-options">
        ${Array.prototype.map.call(this.optionStyles, (optionStyles, i) => `
        <div class="${ID}_custom-option ${ID}-${optionStyles.name}">
          <div class="${ID}_custom-option_box">
            <div class="${ID}_custom-option_logo" style="background-image:url(${optionStyles.img})"></div>
            <div class="${ID}_custom-option_text"><h3>${optionStyles.title}</h3><p>${optionStyles.subtext}</p></div>
            <div class="${ID}_custom-option_triangle"></div>
            </div>
          <div class="${ID}_custom-option_content"></div>
        </div>
        `).join('')}
      </div>
    `;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;

    const logoPlacement = document.querySelector('#application_location');

    const optionBoxes = component.querySelectorAll(`.${ID}_custom-option_box`);
    for (let index = 0; index < optionBoxes.length; index += 1) {
      const element = optionBoxes[index];
      element.addEventListener('click', (e) => {
        logoPlacement.removeAttribute('style');
        logoPlacement.style.display = 'block';

        [].forEach.call(document.querySelectorAll(`.${ID}_option_active`), (item) => {
          item.classList.remove(`${ID}_option_active`);
        });
        e.currentTarget.parentNode.classList.add(`${ID}_option_active`);

        if (e.currentTarget.parentNode.classList.contains(`${ID}-logo-upload`)) {
          document.querySelector('#personalisation_new').click();
        }

        // if existing is clicked
        if (e.currentTarget.parentNode.classList.contains(`${ID}-existing-logo-upload`)) {
          document.querySelector('#personalisation_previous').click();
        }

        // if email is clicked
        if (e.currentTarget.parentNode.classList.contains(`${ID}-email-later`)) {
          // document.querySelector('#logo_contact').click();
          document.querySelector('#logo_contact').checked = true;
        } else {
          document.querySelector('#logo_contact').checked = false;
        }
      });
    }
  }

  render() {
    const { component } = this;
    const customisationWrapper = document.querySelector('#existing_personalisation');
    customisationWrapper.querySelector('h2').insertAdjacentElement('afterend', component);

    // move the logo upload area
    const logoUpload = document.querySelector('#logo_upload');
    logoUpload.removeAttribute('style');
    logoUpload.querySelector('span').outerHTML = `<div class="${ID}-file_icon"><span>Add file</span></div>`;
    component.querySelector(`.${ID}-logo-upload .${ID}_custom-option_content`).appendChild(logoUpload);

    // move the contact input to email later
    const email = logoUpload.querySelector('.logo_contact');
    component.querySelector(`.${ID}-email-later`).appendChild(email);

    fileUpload();

    // no previous uploads 
    // check here to see if there is no previous uploads
    const noUploads = new NoPreviousUploads();
  }
}
