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
  pollerLite(['.roomRates #formBookRoom .rateGroups .textarea'], () => {
    console.log('TRAV-265')
    let saverRates = document.querySelectorAll('.saver-rate');
    // let saverTextSpans = document.querySelectorAll('.saver-text span:first-child')
    let saverTitle = '';
    // let saverText = '';
    let radioCounter = 0;
  
    saverRates.forEach((saverRate) => {

      let saverOrFlexi = saverRate.innerHTML;
      let rateGroup  = saverRate.closest('#rebase .rateGroups').getAttribute('id');

      if(saverOrFlexi == 'Saver rate'){
        saverTitle = `
        <input type="radio" id="${ID}-saver-${radioCounter}" name="${ID}-saver-group-${rateGroup}">
        <label class="saver-rate ${ID}-saver-rate" for="${ID}-saver-${radioCounter}">Saver rate</label>
        `
      } else {
        saverTitle = `
        <input type="radio" id="${ID}-flexi-${radioCounter}" name="${ID}-saver-group-${rateGroup}">
        <label class="saver-rate ${ID}-saver-rate" for="${ID}-flexi-${radioCounter}">Flexible rate</label>
        `
      }
      

  
      saverRate.insertAdjacentHTML('beforebegin', saverTitle);
      saverRate.remove();
      radioCounter++;
    })

    // saverTextSpans.forEach((saverTextSpan) => {
    //   let saverOrFlexi = saverTextSpan.closest('.textarea').querySelector('.saver-rate').innerHTML;

    //   if(saverOrFlexi == 'Saver rate'){
    //     saverText = `<ul class="${ID}-saver-bullet">
    //     <li class="${ID}-saver-text">Non refundable.</li>
    //     <li class="${ID}-saver-text">Arrival date can be amended subject to availability and change fee.</li>
    //     </ul>
    //     `
    //   } else {
    //     saverText = `
    //     <ul class="${ID}-saver-bullet">
    //     <li class="${ID}-saver-text">Fully Refundable excluding WiFi.</li>
    //     <li class="${ID}-saver-text">Free to amend or cancel up until noon on arrival date.</li>
    //     </ul>
    //     `
    //   }

    //   let toolTip = saverTextSpan.closest('.saver-text').querySelector('.tooltipRebase');

    //   saverTextSpan.insertAdjacentHTML('beforebegin', saverText);

    //   toolTip.remove();
    //   saverTextSpan.remove();

    // })

    //configure per booking
    let rateGroups = document.querySelectorAll('.rateGroups');
    rateGroups.forEach((rateGroup) => {
  
    let radioButtons = rateGroup.querySelectorAll(`.card-pad .row`);

    radioButtons.forEach((radioButton) => {
      radioButton.addEventListener('click', () => {
        //check for last selected option, if not in current button container, remove selected class
        const lastSelected = rateGroup.querySelector(`.${ID}-container-selected`);
        if(lastSelected){
          if(lastSelected.closest('.card-pad') != radioButton.closest('.card-pad')){
            lastSelected.classList.remove(`${ID}-container-selected`);
          }
        }

        // if card pad already contains selected option, remove selected option from pad and add to closest clicked container
        if(radioButton.closest('.card-pad').querySelector(`.${ID}-container-selected`)){
          radioButton.closest('.card-pad').querySelector(`.${ID}-container-selected`).classList.remove(`${ID}-container-selected`);
          radioButton.closest('.card-pad .row').classList.add(`${ID}-container-selected`);
        } else {
          radioButton.closest('.card-pad .row').classList.add(`${ID}-container-selected`);
        }
        radioButton.closest('.row').querySelector('.rate-btn').click();
      })
    })
  })


    //use original button to 'click' radio
    let rateButtons = document.querySelectorAll('.card-pad .row .rate-btn');
    rateButtons.forEach((rateButton) => {
    rateButton.addEventListener('click', () => {
      rateButton.closest('.card-pad .row').querySelector(`.${ID}-saver-rate`).click();
    })
  })
  
    //start with options selected
    const firstOptionPerBookings = document.querySelectorAll('.rateGroups .card-top:nth-child(2) .row .row:first-child label');
    firstOptionPerBookings.forEach((firstOption) => {firstOption.click()});

  })



}

const addTracking = () => {
  document.body.addEventListener('click', () => {
    // room selection tracking
    let cardSections = document.querySelectorAll('.card-pad .row')
    cardSections.forEach((button) => {
      button.addEventListener('click', () => {
        fireEvent(`Click - card section clicked`, true);
      })
    })
  });
};

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
  addTracking();

};
