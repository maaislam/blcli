/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {

  pollerLite(['.step__sections .thank-you__additional-content'], () => {
    let newSurveryHTML = `
    <div class="${ID}-survey-container">
      <div class="${ID}-image-container">
        <img src="https://blcro.fra1.digitaloceanspaces.com/NE679/HC679-multi-product-cropped.png" alt="Neom Organics Survey" class="${ID}-hero-image"/>
      </div>
      <div class="${ID}-text-container">
        <p class="${ID}-copy-text">
          We really value your opinion and would love to hear any feedback you may have about your experience with us at NEOM. We’re inviting you to take part in a quick survey.
        </p>
        <p class="${ID}-copy-text">
          As a thank you for your time, you’ll be entered in a prize draw to win the Ultimate Perfect Night’s Sleep Edit WORTH $299. Plus 5 runners up will win a Perfect Night’s Sleep Magnesium Body Butter 200ml worth $41.
        </p>
      </div>
      <div class="${ID}-button-container">
        <a href="https://research.typeform.com/to/fzjIr8zK" class="${ID}-button">Start survey</a>
      </div>
    </div>
  `

  const targetContainer = document.querySelector('.step__sections .thank-you__additional-content');

  targetContainer.insertAdjacentHTML('beforebegin', newSurveryHTML);

  const startSurveryDOM = document.querySelector(`.${ID}-button`);

  startSurveryDOM.addEventListener('click', () => {
    fireEvent(`Click - Start Survey`);
    });
  })
};


export default () => {

  setup();

  logMessage(ID + " Variation: " + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();
};
