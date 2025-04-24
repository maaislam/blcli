/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import {
  setup,
  fireEvent
} from '../../../../../core-files/services';
import {
  pollerLite
} from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import {
  cardType,
  cardTypeContent
} from './cardType';

export default () => {
  const {
    ID,
    VARIATION
  } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION !== 'control') {

    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...

    // first screen
    if (window.location.href.indexOf('AdvantageCardApply') > -1) {
      cardTypeContent();
      cardType();
    }


    // create markup and move fields to each section
    const formSection = () => {
      const formSteps =
        `<div class="${ID}-stepBar">
      <div class="${ID}-step ${ID}-welcome ${ID}-active" data-target="1">Welcome</div>
      <div class="${ID}-step ${ID}-details" data-target="2">Your Details</div>
      <div class="${ID}-step ${ID}-customise" data-target="3">Customise</div>
    </div>`;

      const formContent = `
    <div class="${ID}-section ${ID}-welcome ${ID}_step--active" data-step="default" data-step-count="1">
      <h3>Welcome</h3>
      <div class="${ID}-sectionContainer">
        <div class="${ID}-fields"></div>
        <div class="${ID}-continue">Continue</div>
      </div>
    </div>
    
    <div class="${ID}-section ${ID}-details" data-step="details" data-step-count="2">
      <h3>Your Details</h3>
      <div class="${ID}-sectionContainer">
        <div class="${ID}-fields"></div>
        <div class="${ID}-continue">Continue</div>
      </div>
    </div>
    <div class="${ID}-section ${ID}-customise" data-step="customise" data-step-count="3">
      <h3>Customise</h3>
        <div class="${ID}-sectionContainer">
          <div class="${ID}-fields"></div>
        </div>
    </div>`;

      document.querySelector('#ACFRegistrationForm .form').insertAdjacentHTML('beforebegin', formContent);

      if (VARIATION === '1') {
        document.querySelector('.title').insertAdjacentHTML('beforebegin', formSteps);
      }


      // move relevant fields in to each one
      const details = document.querySelector('.personalDetailsSection');

      const welcomeSection = document.querySelector(`.${ID}-section.${ID}-welcome .${ID}-fields`);
      const detailSection = document.querySelector(`.${ID}-section.${ID}-details .${ID}-fields`);
      const customiseSection = document.querySelector(`.${ID}-section.${ID}-customise .${ID}-fields`);


      const DOB = document.querySelector('.registrationDateOfBirthLabel').parentNode;
      const additionalOptions = document.querySelector('#sign_in_registration_60_club').parentNode;
      const emailPreferences = document.querySelector('#eStore_SignUp_Preferences:not(.healthClubPref_redesign)');
      const offerPrefrence = document.querySelector('.healthClubPref_redesign');
      const gender = document.querySelector('#WC_UserRegistrationUpdateForm_div_35');
      const addCardStore = document.querySelector('.tempAddCardContainer_redesign');



      const addressSearch = document.querySelector('#personalDetails:not(.personalDetailsSection)');

      const emailPassword = details.querySelector('#WC_UserRegistrationUpdateForm_div_19').parentNode;
      const restOfForm = document.querySelector('.form');



      // add fields to welcome section
      welcomeSection.insertAdjacentElement('afterbegin', emailPassword);
      welcomeSection.appendChild(DOB);
      welcomeSection.appendChild(offerPrefrence);


      // add fields to details section
      detailSection.insertAdjacentElement('afterbegin', details);
      details.appendChild(addressSearch);


      // add fields to customise section
      customiseSection.insertAdjacentElement('afterbegin', gender);
      customiseSection.appendChild(additionalOptions);
      customiseSection.appendChild(addCardStore);



      if (emailPreferences) {
        customiseSection.appendChild(emailPreferences);
      }
      customiseSection.appendChild(restOfForm);


      // add advantage card content
      const adContent = `<p class="${ID}-adInfo ${ID}-hidden">If your card number doesn't start with 6330352, or doesn't have a security code, you can either <a href="https://www.boots.com/webapp/wcs/stores/servlet/BootsLogonForm">register on boots.com or log in to your account</a> where you can link your card to your account</p>`;
      document.querySelector('.tempAddCardContainer_redesign').insertAdjacentHTML('beforeend', adContent);

      // change text of adcard
      document.querySelector('.tempAddCardContainer_redesign h5').textContent = 'Have you already got an Advantage Card from store that you’d like to link?';

      // toggle ad card content
      

      const adContentRadio = document.querySelector(`.${ID}-adInfo`);

      document.getElementById('tempAdCardYes').parentNode.onchange = function(e) {
        /* Maybe you should also check: e.target.type==='radio' */
        if(e.target.tagName.toLowerCase() === 'input') {
            var value = e.target.value;
            if(value === 'N') {
              adContentRadio.classList.add(`${ID}-hidden`);
            } else if( value === 'Y') {
              adContentRadio.classList.remove(`${ID}-hidden`);
            }
            /* do something */
        }
      };


      /*const adCardRadios = document.querySelectorAll('.tempAddCardContainer_redesign .radio_primary_label');
      for (let index = 0; index < adCardRadios.length; index += 1) {
        const element = adCardRadios[index];

        element.addEventListener('click', () => {

          const selectedOption = document.querySelector(`input[name="tempAdCardChoice"]:checked`).id;
          const adContent = document.querySelector(`.${ID}-adInfo`);

          // show content
          if (document.querySelector(`input[name="tempAdCardChoice"]:checked`).value === 'N') {
            adContent.classList.remove(`${ID}-hidden`);
          } else {
            adContent.classList.add(`${ID}-hidden`);
          }
        });
      }*/

      // change submit button text
      const formSubmitBtn = document.querySelector(`.button_footer_line .button.primary.btn_margin .button_text`);
      formSubmitBtn.textContent = 'Sign up';


      // change title
      const pageTitle = document.querySelector('#addCardSignupPageHeading');
      if (VARIATION === '2') {
        pageTitle.textContent = 'Boots Advantage Card';
      }

      if (VARIATION === '3') {
        pageTitle.textContent = 'Welcome to Boots Advantage Card';
      }
    }

    const formSubmitCheck = () => {
      const formSubmit = document.querySelector(`.button_footer_line .button.primary.btn_margin`);
      formSubmit.addEventListener('click', () => {
        if (svocValidateAcfFormNew(ACFRegistrationForm, 5) === false) {
          if (VARIATION === '2') {
            document.documentElement.classList.add(`${ID}-allOpen`);
          }
          fireEvent('Tried to submit with errors');
        } else {
          fireEvent('Submit Adcard Form');
        }
      });
    }


    // functionality to move to each section
    const stepLogic = () => {

      const getCurrentStep = () => document.querySelector(`.${ID}_step--active`);


      const getNextStep = () => {
        const currentStep = getCurrentStep();
        const currentStepNumber = Number(currentStep.getAttribute('data-step-count'));
        const nextStepNumber = currentStepNumber + 1;
        return nextStepNumber;
      };

      // loop through and check for errors
      const errorInSection = () => {
        const currentStep = getCurrentStep();
        const allErrors = currentStep.querySelectorAll('.error_redesignContainer');
        for (let index = 0; index < allErrors.length; index += 1) {
          const element = allErrors[index];
          if (element.style.display === 'block') {
            return true;
          }
        }
      }


      const editSection = () => {

        const section = document.querySelectorAll(`.${ID}-section`);
        for (let index = 0; index < section.length; index += 1) {
          const element = section[index];

          element.querySelector('h3').addEventListener('click', (e) => {
            if (e.currentTarget.parentNode.classList.contains(`${ID}_step--complete`)) {

              if (e.currentTarget.parentNode.classList.contains(`${ID}-sectionOpen`)) {
                e.currentTarget.parentNode.classList.remove(`${ID}-sectionOpen`);
              } else {
                e.currentTarget.parentNode.classList.add(`${ID}-sectionOpen`);
              }

            }

          });

        }

      }



      if (VARIATION === '2') {
        editSection();
      }


      const allContinueButtons = document.querySelectorAll(`.${ID}-section .${ID}-continue`);

      for (let index = 0; index < allContinueButtons.length; index += 1) {
        const element = allContinueButtons[index];


        element.addEventListener('click', () => {

          window.scrollTo(0, 0);
          const activeStep = getCurrentStep().getAttribute('data-step');

          // different validation depending on fields
          if (activeStep === 'default') {
            svocValidateACFfields('reglogonPassword', 'reglogonPassword');
            svocValidateAdCardDOBOnSelection(document.querySelector('#registrationDateOfBirthDay'), 'registrationDateOfBirthDay', 'registrationDateOfBirthMonth', 'registrationDateOfBirthYear');
            svocValidateAdCardDOBOnSelection(document.querySelector('#registrationDateOfBirthMonth'), 'registrationDateOfBirthDay', 'registrationDateOfBirthMonth', 'registrationDateOfBirthYear');
            svocValidateAdCardDOBOnSelection(document.querySelector('#registrationDateOfBirthYear'), 'registrationDateOfBirthDay', 'registrationDateOfBirthMonth', 'registrationDateOfBirthYear');
          }

          if (activeStep === 'details') {
            svocCombovalidation(ACFRegistrationForm, 'personTitle', 'title');
            svocValidateACFfields('firstName', 'WC__NameEntryForm_FormInput_firstName_1');
            svocValidateACFfields('lastName', 'WC__NameEntryForm_FormInput_lastName_1');
            svocValidateACFfields('address2', 'address2');
            isValueDifferent('', 'address2');
            svocValidateACFfields('city', 'city');
            isValueDifferent('', 'city');
            svocValidateACFfields('zipCode', 'zipCode');
            isValueDifferent('', 'zipCode');
            svocCombovalidation(ACFRegistrationForm, 'country', 'country');
          }


          if (errorInSection()) {
            // do nothing
          } else {

            if (VARIATION === '1') {
              // make step labels active
              document.querySelector(`.${ID}-step.${ID}-active`).classList.add(`${ID}-complete`);
              document.querySelector(`.${ID}-step.${ID}-active`).classList.remove(`${ID}-active`);

              document.querySelector(`[data-target="${getNextStep()}"]`).classList.add(`${ID}-active`);
            }

            const nextStep = document.querySelector(`[data-step-count="${getNextStep()}"]`);
            nextStep.classList.add(`${ID}_step--active`);

            getCurrentStep().classList.add(`${ID}_step--complete`);
            getCurrentStep().classList.remove(`${ID}_step--active`);

            fireEvent('Moved to next step');

          }


        });
      }
    }


    const genderLightbox = () => {
      const genderInfo = `<div class="${ID}-info"></div>`;
      document.querySelector('#WC_UserRegistrationUpdateForm_div_35 .drop_down').parentNode.insertAdjacentHTML('beforeend', genderInfo);

      const lightBox = document.createElement('div');
      lightBox.classList.add(`${ID}-lightbox`);
      lightBox.innerHTML = `
    <div class="${ID}-overlay"></div>
    <div class="${ID}-content">
      <div class="${ID}-close"></div>
      <p>If you’d like offers only on men's or women’s category products, make a selection. If no selection is made, we’ll base your offers on your shopping choices across all categories</p>
    </div>`;

      document.body.appendChild(lightBox);

      // trigger box
      const showBox = () => {
        lightBox.classList.add(`${ID}-visible`);
        document.documentElement.classList.add(`${ID}-noScroll`);
      }

      const hideBox = () => {
        lightBox.classList.remove(`${ID}-visible`);
        document.documentElement.classList.remove(`${ID}-noScroll`);
      }


      document.querySelector(`.${ID}-info`).addEventListener('click', () => {
        showBox();
      });

      document.querySelector(`.${ID}-close`).addEventListener('click', () => {
        hideBox();
      });
      document.querySelector(`.${ID}-overlay`).addEventListener('click', () => {
        hideBox();
      });
    }




    // wait for welcome form 
    const formCheck = () => {
      return new Promise((resolve, reject) => {
        pollerLite([
          '#eStore_registration_form', 
          '#personalDetails', 
          '#ACFRegistrationForm', 
          '#WC_UserRegistrationUpdateForm_div_35',
          '.registrationDateOfBirthLabel',
          '#sign_in_registration_60_club',
          '.tempAddCardContainer_redesign',
        ], () => {
          resolve();
        })
      });
    }

    if (window.location.href.indexOf('ApplyAdvantageCardCheck') > -1) {
      formCheck().then(() => {
        fireEvent('Viewed New form');

        formSection();
        if (VARIATION !== '3') {
          stepLogic();
        }
        genderLightbox();
        formSubmitCheck();

      });
    }
  }

};
