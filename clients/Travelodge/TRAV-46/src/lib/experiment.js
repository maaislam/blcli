/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, observer } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

let tlPlus = 'GB0953,GB0914,GB0965,GB2021,GB2025,GB2026,GB2023,GB0892,GB0304,GB0893,GB0788,GB2051,GB0113,GB2075,GB2033';
let newDesign = 'GB0128,GB0134,GB0242,GB0246,GB0252,GB0255,GB0318,GB0339,GB0524,GB0560,GB0582,GB0585,GB0586,GB0617,GB0717,GB0720,GB0731,GB0747,GB0752,GB0757,GB0762,GB0763,GB0769,GB0774,GB0778,GB0793,GB0799,GB0819,GB0824,GB0825,GB0832,GB0845,GB0849,GB0852,GB0856,GB0860,GB0866,GB0868,GB0869,GB0870,GB0871,GB0872,GB0873,GB0911,GB0913,GB0916,GB0920,GB0949,GB0955,GB0959,GB1211,GB1244,GB2014,GB2029,GB2087,GB2102';

let tlPlusList = tlPlus.split(',');
let newDesignList = newDesign.split(',');

const checkCurrentList = () => {

  let allAvailableHotels = document.querySelectorAll('.search-page .qa-hotel.hotel-card');
  logMessage(allAvailableHotels);
  [].slice.call(allAvailableHotels).forEach((hotel) => {
    
    if (!hotel.classList.contains(`${ID}-updated`) && tlPlusList.includes(hotel.getAttribute('data-hotel-code'))) {
      hotel.classList.add(`${ID}-updated`);
      hotel.querySelector('.link').insertAdjacentHTML('afterbegin', `<div class="${ID}-tlplus"></div>`);
    }

    if (!hotel.classList.contains(`${ID}-updated`) && newDesignList.includes(hotel.getAttribute('data-hotel-code'))) {
      hotel.classList.add(`${ID}-updated`);
      hotel.querySelector('.link').insertAdjacentHTML('afterbegin', `<div class="${ID}-newdesign"></div>`);
    }

  });

}

const startExperiment = () => {
  
  checkCurrentList();

  observer.connect(document.querySelector('.search-page > .container:not(.search-form--container)'), () => {
    setTimeout(() => {
      checkCurrentList();
    }, 1000);
  }, {
    childList: true,
    subtree: true
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
