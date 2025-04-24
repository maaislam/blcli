/**
 * @desc If the user has no previous uploads
 */

import settings from '../../settings';
import { pollerLite } from '../../../../../../../lib/uc-lib';
import previousFiles from './previousFiles';

const { ID } = settings;


export default class NoPreviousUploads {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_uploads`);

    // check if no previous uploads
    // const previousUploads = document.querySelector('[for="personalisation_1"]');

    /*if (previousUploads) {
      element.innerHTML = `
        <p>To re-use a previous customisation please specify in the notes below or select one of your existing logos</p>
        <div class="${ID}-existing_logos"></div>`;
    } else {
      element.innerHTML = `
        <p>To re-use a previous customisation please specify in the notes below or <div class="${ID}_uploadNew">Upload a new logo</div></p>
        `;
    }*/
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    document.querySelector(`.${ID}-existing-logo-upload .${ID}_custom-option_content`).appendChild(component);

    // if there are previous uploads
    const previousUploads = document.querySelectorAll('#existing_personalisation label[for^="personalisation_"]:not([for="personalisation_new"])');
    if (previousUploads) {
      pollerLite([`.${ID}-existing_logos`], () => {
        for (let index = 0; index < previousUploads.length; index += 1) {
          const previous = previousUploads[index];
          document.querySelector(`.${ID}-existing_logos`).appendChild(previous);
        }
        // add the active classes
        previousFiles();
      });
    }
  }
}
