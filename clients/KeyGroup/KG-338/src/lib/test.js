/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;
let formHolder;

const startExperiment = () => {

  pollerLite(['#HousePrice'], () => {

    document.documentElement.classList.add(`${ID}-expbegins`);
    let currTopHTML = document.querySelector('.hero-banner__section').innerHTML;
    document.querySelector('.sidebar').innerHTML = currTopHTML;
    document.querySelector('.sidebar').closest('div').classList.remove('col-lg-5');
    document.querySelector('.sidebar').closest('div').classList.add('col-lg-7');
    document.querySelector('.sidebar').closest('div').classList.remove('offset-lg-1');
    document.querySelector('.sidebar').closest('div').classList.add(`${ID}-sidebarcol`);

    formHolder = document.getElementById('HousePrice').closest('form');
    formHolder.closest('.row').classList.add(`${ID}-outer-row`);

    formHolder.classList.remove('col-md-6');
    formHolder.classList.add('col-md-5');
    formHolder.classList.add(`${ID}-equitycalc`);
    formHolder.classList.add(`${ID}-stage1`);
    formHolder.setAttribute('data-stage', '1');

    // setting Exp class names for the different form areas.

    // House Price
    document.getElementById('HousePrice').closest('.form__field-wrapper').setAttribute('data-type', 'pricefield');
    //document.getElementById('HousePrice').setAttribute('placeholder', '£0.00');
    //document.querySelector('label[for="HousePrice"]').innerText = 'Enter property value';
    document.querySelector('label[for="HousePrice"]').classList.add(`${ID}-hidden`);
    
    // Postcode
    document.querySelector('.form__group--postcode').setAttribute('data-type', 'postcodefield');
    document.querySelector('.form__group--postcode').previousElementSibling.setAttribute('data-type', 'postcodefield');
    document.querySelector('.form__group--postcode').nextElementSibling.setAttribute('data-type', 'postcodefield');
    //document.querySelector('.form__group--postcode').querySelector('input').setAttribute('placeholder', 'XXX XXX');
    document.querySelector('label[for="Postcode"]').classList.add(`${ID}-hidden`);

    // secondary wrappers

    document.querySelector('label[for="Title"]').classList.add(`${ID}-hidden`);
    document.querySelector('label[for="Telephone"]').classList.add(`${ID}-hidden`);
    document.querySelector('label[for="Email"]').classList.add(`${ID}-hidden`);
    document.querySelector('label[for="DOB"]').classList.add(`${ID}-hidden`);

    let allSecondaryFieldsetWrappers = formHolder.querySelectorAll('fieldset:nth-child(2) > .form__field-wrapper');
    allSecondaryFieldsetWrappers.forEach((wrapper, index) => {

      if(index == 0) {
        wrapper.setAttribute('data-type', 'titlefield');
      } else if(index == 1 || index == 2) {
        wrapper.setAttribute('data-type', 'namefield');
      } else if(index == 3) {
        wrapper.setAttribute('data-type', 'phonefield');
      } else if(index == 4) {
        wrapper.setAttribute('data-type', 'emailfield');
      } else if(index == 5) {
        wrapper.setAttribute('data-type', 'dobfield');
      }
    });

    document.querySelector('.btn.btn--success[type="submit"]').classList.add(`${ID}-submitfield`);

    formHolder.insertAdjacentHTML('afterbegin', `
    
      <div class="${ID}-equitycalc--header">
        
          <div class="${ID}-equitycalc--title">

            <span class="${ID}-equitycalc--stagenum">1/7</span>

            <h2>What's your property value?</h2>

          </div>

          <div class="${ID}-equitycalc--form">

            <div class="${ID}-equitycalc--progressbar"></div>

          </div>

      </div>
    
    `);

    formHolder.insertAdjacentHTML('beforeend', `
    
      <div class="${ID}-equitycalc--footer">

        <button class="${ID}-equitycalc--button">Next</button>

        <button class="${ID}-equitycalc--button--secondary">Back</button>

      </div>
    
    `);


    fireEvent('Interaction - re-skinned equity calculator has been displayed', true);


    document.body.addEventListener('click', (e) => {

      if(e.target.classList.contains(`${ID}-equitycalc--button`)) {

        e.preventDefault();
        moveForwardsStage();

      }

      if(e.target.getAttribute('data-type') == "postcodefield" || (e.target.classList.contains('form__toggle') && e.target.innerText.toLowerCase() == "search by postcode")) {
        let postcode = document.getElementById('Postcode').value;
        if(!document.querySelector(`.${ID}-postcode-entered`)) {
          document.querySelector('.form__group--postcode').querySelector('.form__toggle').insertAdjacentHTML('beforebegin', `<div class="${ID}-postcode-entered">${postcode}</div>`);  
        }
        document.querySelector('label[for="Address"]').innerText = 'Select address';
      }

      if (e.target.classList.contains(`${ID}-submitfield`) && document.getElementById('Telephone').value == "") {        
        
        if (!formHolder.classList.contains(`${ID}-secondpass`)) {
          formHolder.classList.remove(`${ID}-stage7`);
          formHolder.classList.add(`${ID}-stage5`);
          formHolder.setAttribute('data-stage', 5);
          formHolder.querySelector(`.${ID}-equitycalc--stagenum`).innerText = '5/7';
          formHolder.querySelector(`.${ID}-equitycalc--title h2`).innerText = 'Your phone number';
          formHolder.classList.add(`${ID}-secondpass`);
        }
        

      }

    });


  })
  


}

const moveForwardsStage = () => {

  let currStage = formHolder.getAttribute('data-stage');

  if(currStage == 1) {

    if (document.getElementById('HousePrice').value != "" && document.querySelector('.form__field-wrapper[data-type="pricefield"]').classList.contains('form__field-wrapper--success')) {
      formHolder.classList.remove(`${ID}-stage1`);
      formHolder.classList.add(`${ID}-stage2`);
      formHolder.setAttribute('data-stage', 2);
      formHolder.querySelector(`.${ID}-equitycalc--stagenum`).innerText = '2/7';
      formHolder.querySelector(`.${ID}-equitycalc--title h2`).innerText = 'Postcode';

      fireEvent('Interaction - user has passed stage one by entering their house value', true);

    }
    

  } else if(currStage == 2) {

    if (document.getElementById('Postcode').value != "" && document.querySelector('.form__group--postcode').querySelector('.form__field-wrapper').classList.contains('form__field-wrapper--success') && document.querySelector('.form__field-wrapper--address').classList.contains('form__field-wrapper--success')) {
      formHolder.classList.remove(`${ID}-stage2`);
      formHolder.classList.add(`${ID}-stage3`);
      formHolder.setAttribute('data-stage', 3);
      formHolder.querySelector(`.${ID}-equitycalc--stagenum`).innerText = '3/7';
      formHolder.querySelector(`.${ID}-equitycalc--title h2`).innerText = 'Your title';

      fireEvent('Interaction - user has passed stage two by entering their address', true);

    } 

  } else if (currStage == 3) {
    formHolder.classList.remove(`${ID}-stage3`);
    formHolder.classList.add(`${ID}-stage4`);
    formHolder.setAttribute('data-stage', 4);
    formHolder.querySelector(`.${ID}-equitycalc--stagenum`).innerText = '4/7';
    formHolder.querySelector(`.${ID}-equitycalc--title h2`).innerText = 'Your name';

    fireEvent('Interaction - user has passed stage three - title', true);

  } else if (currStage == 4) {
    formHolder.classList.remove(`${ID}-stage4`);
    formHolder.classList.add(`${ID}-stage5`);
    formHolder.setAttribute('data-stage', 5);
    formHolder.querySelector(`.${ID}-equitycalc--stagenum`).innerText = '5/7';
    formHolder.querySelector(`.${ID}-equitycalc--title h2`).innerText = 'Your phone number';

    fireEvent('Interaction - user has passed stage four - name', true);

  } else if (currStage == 5) {

    if (!document.querySelector('.form__field-wrapper[data-type="phonefield"]').classList.contains('form__field-wrapper--error') || document.querySelector('.form__field-wrapper[data-type="phonefield"]').classList.contains('form__field-wrapper--warning')) {



      formHolder.classList.remove(`${ID}-stage5`);
      formHolder.classList.add(`${ID}-stage6`);
      formHolder.setAttribute('data-stage', 6);
      formHolder.querySelector(`.${ID}-equitycalc--stagenum`).innerText = '6/7';
      formHolder.querySelector(`.${ID}-equitycalc--title h2`).innerText = 'Your email address';

      fireEvent('Interaction - user has passed stage five - phone number', true);

      
    }

  } else if (currStage == 6) {

    
    if (!document.querySelector('.form__field-wrapper[data-type="emailfield"]').classList.contains('form__field-wrapper--error')) {

      formHolder.classList.remove(`${ID}-stage6`);
      formHolder.classList.add(`${ID}-stage7`);
      formHolder.setAttribute('data-stage', 7);
      formHolder.querySelector(`.${ID}-equitycalc--stagenum`).innerText = '7/7';
      formHolder.querySelector(`.${ID}-equitycalc--title h2`).innerText = 'Date of birth';

      fireEvent('Interaction - user has passed stage six - email', true);

    } 

  } 

}

const addTracking = () => {

  document.body.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn--success') && e.target.type == "submit") {
      fireEvent('Click - user has clicked the button to submit the equity calculator', true);
    }

  });

}

export default () => {

  newEvents.initiate = true;
  newEvents.methods = ["ga4"];
  newEvents.property = "G-LNFZ1KRLB8";

  setup();

  fireEvent('Conditions Met');

  // Needed for attribution to Adobe Dynamics - do not remove
  document.documentElement.classList.add(`experimentation-${VARIATION == "control" ? `control` : `variant-${VARIATION}`}`);

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  addTracking();

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
