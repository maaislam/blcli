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

const { ID, VARIATION } = shared;



const startExperiment = () => {
  pollerLite(['#conv-calc'], () => {
    console.log('Product details page loaded');

    const surveyDesign=`
          <div class="${ID}-main-div">
            <div class="${ID}-sticky-button">
              Experience Survey
              <div class="${ID}-close">
                X
              </div>
            </div>
            <div class="${ID}-survey ${ID}-survey-div-close">
                <p class="${ID}-suvrvey-heading">Help us improve your experience</p>
                <p class="${ID}-suvrvey-para">Let us know how we can improve your experience by taking our survey.<br>It’ll take no more than 10 mins and you could win one of two £25 Amazon Vouchers for your time.</p>
                <a target="_blank"href="https://research.typeform.com/to/nEpon0oE">
                <button class="${ID}-suvrvey-button">Take survey</button></a>
                <p class="${ID}-entire-survey-close"><u>Close</u></p>
            </div>
          </div>`
    const targetContainer = document.querySelector(".kr-body-container");
    targetContainer.insertAdjacentHTML('beforeend', surveyDesign );
    pollerLite([`.${ID}-main-div`], () => {
      document.querySelector(`.${ID}-sticky-button`).addEventListener('click',()=>{
      document.querySelector(`.${ID}-survey`).classList.toggle(`${ID}-survey-div-close`);
   });
      document.querySelector(`.${ID}-entire-survey-close`).addEventListener('click',()=>{
      document.querySelector(`.${ID}-survey`).classList.toggle(`${ID}-survey-div-close`);
    })
    })
   
});
}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  startExperiment();
  
};
