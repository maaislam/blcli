/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;


const startExperiment = () => {

  if(localStorage.getItem('er-calculator')) {

    pollerLite(['.kr-body-container .retrieve-quote #DOB'], () => {
      const { value, dob } = JSON.parse(localStorage.getItem('er-calculator'))
      // console.log('in localstorage if')
      document.querySelector('.kr-body-container .retrieve-quote #HousePrice').value = value
      document.querySelector('.kr-body-container .retrieve-quote #DOB').value = dob

      const erCalculatorForm = document.querySelector('#er-calculator form')
      erCalculatorForm.addEventListener('submit', function() {
        fireEvent('Submit - User submits the retrieve form')
      });
    });
  }

  pollerLite(['.kr-body-container #er-calculator .btn--success'], () => {
    // console.log('startExperiment');

    function trackValueAndDOB() {
      const value = document.querySelector('.kr-body-container #er-calculator #HousePrice').value
      const dob = document.querySelector('.kr-body-container #er-calculator #DOB').value

      if (value && dob) {
        localStorage.setItem('er-calculator', JSON.stringify({ value, dob }))
      }
    }

    const erCalculatorForm = document.querySelector('#er-calculator form')

    erCalculatorForm.addEventListener('submit', function() {
      trackValueAndDOB()
      fireEvent('Submit - User submits the calculate form')
    });

  });

};

export default () => {

  newEvents.initiate = true;
  newEvents.methods = ["datalayer"];
  newEvents.property = "G-LNFZ1KRLB8";

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
