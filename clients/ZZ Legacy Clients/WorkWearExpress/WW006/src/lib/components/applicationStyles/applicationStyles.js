/**
 * @desc Recreate the application style boxes
 */

import settings from '../../settings';
import { pollerLite } from '../../../../../../../lib/uc-lib';
import { events } from '../../../../../../../lib/utils';

const { ID } = settings;

export default class ApplicationStyle {
  constructor(options) {
    this.optionStyles = options.styles;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {

    const element = document.createElement('div');
    element.classList.add(`${ID}_application-styles_wrapper`);

    /* create the fixed pop up basket */
    element.innerHTML = `
      <div class="${ID}_application-styles">
        ${Array.prototype.map.call(this.optionStyles, (optionStyles, i) => `
          <div class="${ID}_application-style" matching-attr="${optionStyles.matchingAttr}">
           <div class="${ID}_application-style_image" style="background-image:url(${optionStyles.img})"></div>
           <div class="${ID}_application-style_name">${optionStyles.title}</div>
          </div>
        `).join('')}
      </div>
    `;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;

    // on click of the new styles, click the hidden radio buttons
    const newApplicationStyles = component.querySelectorAll(`.${ID}_application-style`);
    const customOptions = document.querySelector('#existing_personalisation');
    const existingOptionsContent = document.querySelector(`.${ID}-existing-logo-upload .${ID}_custom-option_content`);

    // build the content for previous uploads
    existingOptionsContent.innerHTML = `
      <div class="${ID}-noActivePrevious">
        <p>You have no previous <span></span> uploads. To re-use a previous customisation please specify in the notes below or</p> <div class="${ID}_uploadNew">Upload a new logo</div>
      </div>
      <div class="${ID}-ActivePrevious">
        <p>To re-use a previous customisation please specify in the notes below or select one of your existing logos</p><div class="${ID}-existing_logos"></div>
      </div>
    `;

    for (let index = 0; index < newApplicationStyles.length; index += 1) {
      const element = newApplicationStyles[index];
      const matchingEl = element.getAttribute('matching-attr');
      // hide the ones that don't exist
      if (!document.querySelector(`#${matchingEl}`)) {
        element.style.display = 'none';
      }

      element.addEventListener('click', (e) => {
        // click the matching hidden style
        const elementTarget = e.currentTarget.getAttribute('matching-attr');
        document.querySelector(`#${elementTarget}`).click();

        // remove any existing active classes and add active to element clicked
        [].forEach.call(document.querySelectorAll(`.${ID}_style_active`), (item) => {
          item.classList.remove(`${ID}_style_active`);
        });
        e.currentTarget.classList.add(`${ID}_style_active`);

        // hide the new options if logo isnt selected
        if (elementTarget === 'application_style_a' || elementTarget === 'application_style_c') {
          customOptions.classList.add(`${ID}_options_show`);
          document.querySelector('#text_entry').classList.remove('WW006-text_show');
          pollerLite([`.${ID}-existing-logo-upload`], () => {
            const activeOption = e.currentTarget.querySelector(`.${ID}_application-style_name`).textContent;
            document.querySelector(`.${ID}-existing-logo-upload h3`).textContent = `Use an existing ${activeOption}`;
          });
        } else {
          document.querySelector(`.${ID}-existing-logo-upload h3`).textContent = 'Use an existing logo';
          customOptions.classList.remove(`${ID}_options_show`);
          document.querySelector('#personalisation_new').click();

          document.querySelector('#text_entry').classList.add('WW006-text_show');
        }

        // event
        const activeApplicationStyle = element.querySelector(`.${ID}_application-style_name`).textContent;
        events.send('WW006', 'Click', `Clicks on ${activeApplicationStyle} logo`, { sendOnce: true });

        // loop through existing uploads if they exist and match the chosen application
        // - add class of active to them

        const previousUploads = document.querySelectorAll('#existing_personalisation label[for^="personalisation_"]:not([for="personalisation_new"])');
        if (previousUploads) {
          [].forEach.call(previousUploads, (el) => {
            const personalisationName = el.querySelector('span').textContent;
            if (personalisationName === activeApplicationStyle) {
              el.classList.add(`${ID}-previous_active`);
            } else {
              el.classList.remove(`${ID}-previous_active`);
            }
          });
        }

        // if no matching previous uploads show the "upload logo"
        const activePrevious = document.querySelector(`.${ID}-previous_active`);
        const noActivePreviousText = document.querySelector(`.${ID}-noActivePrevious`);
        const ActivePreviousText = document.querySelector(`.${ID}-ActivePrevious`);

       
        // show and hide the existing uploads based on option clicked
        if (!activePrevious) {
          noActivePreviousText.style.display = 'block';
          ActivePreviousText.style.display = 'none';

          document.querySelector(`.${ID}-existing-logo-upload`).classList.add(`${ID}-noMatchingUploads`);
          if (document.querySelector(`${ID}-noActivePrevious`)) {
            document.querySelector(`${ID}-noActivePrevious`).style.display = 'none';
          }
        } else {
          if (activePrevious.querySelector('span')) {
            activePrevious.querySelector('span').textContent = activeApplicationStyle;
          }
          noActivePreviousText.style.display = 'none';
          ActivePreviousText.style.display = 'block';

          document.querySelector(`.${ID}-existing-logo-upload`).classList.remove(`${ID}-noMatchingUploads`);
        }
      });
    }

    // if the upload new logo button exists
    pollerLite([`.${ID}_uploadNew`], () => {
      if (document.querySelector(`.${ID}_uploadNew`)) {
        document.querySelector(`.${ID}_uploadNew`).addEventListener('click', () => {
          document.querySelector(`.${ID}-logo-upload .${ID}_custom-option_box`).click();
        });
      }
    });
  }

  render() {
    const { component } = this;
    const currentApplicationStyles = document.querySelector('#application_style');
    document.querySelector('#existing_personalisation').insertAdjacentElement('beforebegin', currentApplicationStyles);

    currentApplicationStyles.appendChild(component);
  }
}
