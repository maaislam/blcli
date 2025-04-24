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

const { ID, VARIATION } = shared;
let formHolder;

const startExperiment = () => {

  pollerLite(['#HousePrice'], () => {

    document.documentElement.classList.add(`${ID}-expbegins`);
    let currTopHTML = document.querySelector('.hero-banner__section').innerHTML;
    if(window.location.href.indexOf('/equity-release/calculator') > -1) {
      currTopHTML = currTopHTML.replace('equity release', 'this lifetime commitment');
      currTopHTML = currTopHTML.replace('risks', 'drawbacks');
    }
    
    if (window.location.href.indexOf(`/campaigns/calculator`) > -1) {
      let allBannerContainers = document.querySelectorAll('.banner--Secondary');
      allBannerContainers[0].classList.add(`${ID}-hidden`);
      allBannerContainers[1].classList.add(`${ID}-fixed`);
    }

    if (window.location.href.indexOf(`/campaigns/key-retirement-equity-release-calculator-ppc`) > -1) {
      currTopHTML = `
      

                        <h1 class="hero-banner__title">Welcome to the UK's most trusted equity release adviser</h1>
                                    <div class="hero-banner__content"><ul class="list list--tick">
	<li>5*&nbsp;rated&nbsp;with&nbsp;16,000+ Trustpilot reviews</li>
	<li>Winners of 80+ industry awards</li>
	<li>UK's longest serving&nbsp;equity release adviser</li>
</ul>
</div>
                                                    <div class="hero-banner__button-container">
                        <a href="#erc" target="_blank" class="button button__primary hero-banner__button">Calculate now</a>
                    </div>

            
      `;
    }

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
    document.getElementById('HousePrice').setAttribute('placeholder', '£0');
    document.querySelector('label[for="HousePrice"]').innerText = 'Enter property value';
    
    // Postcode
    document.querySelector('.form__group--postcode').setAttribute('data-type', 'postcodefield');
    document.querySelector('.form__group--postcode').previousElementSibling.setAttribute('data-type', 'postcodefield');
    document.querySelector('.form__group--postcode').nextElementSibling.setAttribute('data-type', 'postcodefield');
    document.querySelector('.form__group--postcode').querySelector('input').setAttribute('placeholder', 'XXX XXX');
    document.querySelector('label[for="Postcode"]').innerText = 'Add your postcode';

    // secondary wrappers

    document.querySelector('label[for="Title"]').classList.add(`${ID}-hidden`);
    document.querySelector('label[for="Telephone"]').classList.add(`${ID}-hidden`);
    document.querySelector('label[for="Email"]').classList.add(`${ID}-hidden`);
    document.querySelector('label[for="DOB"]').classList.add(`${ID}-hidden`);

    let allSecondaryFieldsetWrappers = formHolder.querySelectorAll('fieldset:nth-child(2) > .form__field-wrapper');
    allSecondaryFieldsetWrappers.forEach((wrapper, index) => {

      if(index == 0) {
        wrapper.setAttribute('data-type', 'titlefield');
      } else if(index == 1) {
        wrapper.setAttribute('data-type', 'firstnamefield');
      } else if (index == 2) {
        wrapper.setAttribute('data-type', 'surnamefield');
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

            <span class="${ID}-equitycalc--stagenum">1/6</span>

            <h2>Let's work out your tax-free release amount. Please, tell us your name.</h2>

          </div>

          <div class="${ID}-equitycalc--form">

            <div class="${ID}-equitycalc--progressbar"></div>

          </div>

      </div>
    
    `);

    formHolder.insertAdjacentHTML('beforeend', `
    
      <div class="${ID}-equitycalc--footer">

        <div class="${ID}-equitycalc--footermessage">
          <span class="${ID}-man-image"></span>
          <span class="${ID}-equitycalc--footermessagetext">We're Key, the specialists in later life finance helping thousands of people unlock equity from their home. </span>
        </div>

        <button class="${ID}-equitycalc--button ${ID}-disabled">Next</button>

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

      if (e.target.classList.contains(`${ID}-submitfield`) && (document.getElementById('Telephone').value == "" || document.getElementById('Telephone').value == "07900000000")) {

        if(e.target.innerText.toLowerCase() == "calculate") {
          setTimeout(() => {
            document.querySelector(`.${ID}-submitfield`).click();
          }, 100);
        }

        

      }

    });

    let equityCalc = document.querySelector(`.${ID}-equitycalc`);

    let allTitleRadioOptions = document.querySelectorAll('.form__field--radio[name="Title"]');

    setInterval(() => {
      
      let currStage = equityCalc.getAttribute('data-stage');

      let titleChecked = false;
      
      
      allTitleRadioOptions.forEach((option) => {
        if (option.checked) {
          titleChecked = true;
        }
      });

      if (titleChecked && currStage == 1 && document.getElementById('FirstName').value !== "" && document.getElementById('LastName').value !== "" && document.querySelector('.form__field-wrapper[data-type="firstnamefield"]').classList.contains('form__field-wrapper--success') && document.querySelector('.form__field-wrapper[data-type="surnamefield"]').classList.contains('form__field-wrapper--success') && document.querySelector(`.${ID}-equitycalc--button`).classList.contains(`${ID}-disabled`)) {
        document.querySelector(`.${ID}-equitycalc--button`).classList.remove(`${ID}-disabled`);
      } 

      if (currStage == 2 && document.getElementById('HousePrice').value != "" && document.querySelector('.form__field-wrapper[data-type="pricefield"]').classList.contains('form__field-wrapper--success')) {
        document.querySelector(`.${ID}-equitycalc--button`).classList.remove(`${ID}-disabled`);
      } 

      if (currStage == 3 && document.getElementById('Postcode').value != "" && document.querySelector('.form__group--postcode').querySelector('.form__field-wrapper').classList.contains('form__field-wrapper--success') && document.querySelector('.form__field-wrapper--address').classList.contains('form__field-wrapper--success')) {
        document.querySelector(`.${ID}-equitycalc--button`).classList.remove(`${ID}-disabled`);
      }

      if (currStage == 4 && document.getElementById('DOB').value != "" && document.querySelector('.form__field--date').closest('.form__field-wrapper').classList.contains('form__field-wrapper--success')) {
        document.querySelector(`.${ID}-equitycalc--button`).classList.remove(`${ID}-disabled`);
      }

    }, 10);


  })
  


}

const moveForwardsStage = () => {

  let currStage = formHolder.getAttribute('data-stage');

  if(currStage == 1) {

    let titleChecked = false;
    let allTitleRadioOptions = document.querySelectorAll('.form__field--radio[name="Title"]');
    allTitleRadioOptions.forEach((option) => {
      if(option.checked) {
        titleChecked = true;
      }
    });

    if (titleChecked && document.getElementById('FirstName').value != "" && document.getElementById('LastName').value != "" && document.querySelector('.form__field-wrapper[data-type="firstnamefield"]').classList.contains('form__field-wrapper--success') && document.querySelector('.form__field-wrapper[data-type="surnamefield"]').classList.contains('form__field-wrapper--success')) {

      formHolder.classList.remove(`${ID}-stage1`);
      formHolder.classList.add(`${ID}-stage2`);
      formHolder.setAttribute('data-stage', 2);
      formHolder.querySelector(`.${ID}-equitycalc--stagenum`).innerText = '2/6';
      formHolder.querySelector(`.${ID}-equitycalc--title h2`).innerText = 'Tell us about your home\'s estimated value.';
      formHolder.querySelector(`.${ID}-equitycalc--footermessagetext`).innerText = "If you're unsure, you can use the upper range of your estimate. Online tools such as Rightmove and Zoopla can help with estimations.";
      formHolder.querySelector(`.${ID}-equitycalc--button`).classList.add(`${ID}-disabled`);

      fireEvent('Interaction - user has passed stage one - title/name', true);
    
    }

  } else if(currStage == 2) {

    if (document.getElementById('HousePrice').value != "" && document.querySelector('.form__field-wrapper[data-type="pricefield"]').classList.contains('form__field-wrapper--success')) {
      formHolder.classList.remove(`${ID}-stage2`);
      formHolder.classList.add(`${ID}-stage3`);
      formHolder.setAttribute('data-stage', 3);
      formHolder.querySelector(`.${ID}-equitycalc--stagenum`).innerText = '3/6';
      formHolder.querySelector(`.${ID}-equitycalc--title h2`).innerText = 'Where is your home located?';
      formHolder.querySelector(`.${ID}-equitycalc--footermessagetext`).innerText = "Some addresses cannot release equity, such as commercial properties.";
      formHolder.querySelector(`.${ID}-equitycalc--button`).classList.add(`${ID}-disabled`);

      fireEvent('Interaction - user has passed stage two by entering their house value', true);

    }

     
  } else if (currStage == 3) {

    if (document.getElementById('Postcode').value != "" && document.querySelector('.form__group--postcode').querySelector('.form__field-wrapper').classList.contains('form__field-wrapper--success') && document.querySelector('.form__field-wrapper--address').classList.contains('form__field-wrapper--success')) {
      formHolder.classList.remove(`${ID}-stage3`);
      formHolder.classList.add(`${ID}-stage4`);
      formHolder.setAttribute('data-stage', 4);
      formHolder.querySelector(`.${ID}-equitycalc--stagenum`).innerText = '4/6';
      formHolder.querySelector(`.${ID}-equitycalc--title h2`).innerText = 'We\'ll need to confirm your age.';
      formHolder.querySelector(`.${ID}-equitycalc--footermessagetext`).innerText = "Releasing equity is suitable for over 55s. If you're under 55, you'll have to wait a bit longer.";
      formHolder.querySelector(`.${ID}-equitycalc--button`).classList.add(`${ID}-disabled`);

      fireEvent('Interaction - user has passed stage three by entering their address', true);

    } 

  } else if (currStage == 4) {

    if (document.getElementById('DOB').value != "" && document.querySelector('.form__field--date').closest('.form__field-wrapper').classList.contains('form__field-wrapper--success')) {

      formHolder.classList.remove(`${ID}-stage4`);
      formHolder.classList.add(`${ID}-stage5`);
      formHolder.setAttribute('data-stage', 5);
      formHolder.querySelector(`.${ID}-equitycalc--stagenum`).innerText = '5/6 ';
      formHolder.querySelector(`.${ID}-equitycalc--title h2`).innerText = 'What\'s your phone number? We\'ll use this to recognise you if you call us or to chat through your results.';
      formHolder.querySelector(`.${ID}-equitycalc--footermessage`).classList.add(`${ID}-hidden`);
      fireEvent('Interaction - user has passed stage four - DOB', true);

    }

  } else if (currStage == 5) {

    if(!document.querySelector('.form__field-wrapper[data-type="phonefield"]').classList.contains('form__field-wrapper--error')) {

      if (document.getElementById('Telephone').value == "" && !document.querySelector('.form__field-wrapper[data-type="phonefield"]').classList.contains('form__field-wrapper--error') && !document.querySelector('.form__field-wrapper[data-type="phonefield"]').classList.contains(`${ID}-secondpass`)) {
        document.querySelector('.form__field-wrapper[data-type="phonefield"]').classList.add(`${ID}-secondpass`);
        document.querySelector('.form__field-wrapper[data-type="phonefield"]').classList.add(`form__field-wrapper--warning`);
        document.querySelector('.form__field-wrapper[data-type="phonefield"]').insertAdjacentHTML('afterbegin', `<div class="form__message form__message--warning ${ID}-warning"><div>Enter your phone number for a free call back to discuss your results</div></div>`);
      } else {

        document.querySelector('.form__field-wrapper[data-type="phonefield"]').classList.remove(`${ID}-secondpass`);
        document.querySelector('.form__field-wrapper[data-type="phonefield"]').classList.remove(`form__field-wrapper--warning`);
        document.querySelector(`.${ID}-warning`)?.remove();
        document.getElementById('Telephone').value = '07900000000';

        formHolder.classList.remove(`${ID}-stage5`);
        formHolder.classList.add(`${ID}-stage6`);
        formHolder.setAttribute('data-stage', 6);
        formHolder.querySelector(`.${ID}-equitycalc--stagenum`).innerText = '6/6';
        formHolder.querySelector(`.${ID}-equitycalc--title h2`).innerHTML = 'What\'s your email? <br /> We\'ll send your results here.';
        formHolder.querySelector(`.${ID}-equitycalc--footer`).classList.add(`${ID}-hidden`);

        fireEvent('Interaction - user has passed stage five - phone number', true);

      }
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
