/**
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import pubSub from './PublishSubscribe';
import { cacheDom } from './../../../../../lib/cache-dom';
import { validateGenders, validateStep1, validateStep2 } from './validation';
import { checkCountryIsUk } from './helpers';
import { events } from '../../../../../lib/utils';
import { addRequiredFieldsLabel, updateLabelTexts, markStepCtaInactive, markStepCtaActive, initPostcodeTooltip, initPasswordTooltip, initPasswordUnmask} from './actions';

/**
 * Validator checker
 *
 * Check validation state on interval and feedback to mark steps active / inactive
 */
const runValidationChecker = (cb) => {
  if(typeof cb != 'function') {
    throw "Validation checker calls back to function - missing argument.";
  }

  setInterval(() => {
    cb({
      validGenders: validateGenders(),
      step1: validateStep1(),
      step2: validateStep2(),
    });
  }, 1000);
};

/**
 * Helper hide form until gender interaction
 */
const hideFormUntilGenderInteraction = () => {
  const form = document.querySelector('#social-registration');

  if(form) {
    form.classList.add(`${settings.ID}-hide-til-gender-interaction`);

    pubSub.publish('did-hide-form-til-gender-interaction');
  }
};

/**
 * EH001 fires an event to say that the form has been
 * modified - handle calls to that event here
 */
const modifyFormOnEH001Event = () => {
  // Update label texts each time
  updateLabelTexts();

  // Password field tooltip can only be initialised once it exists 
  // (on this event fire it will at some point)
  const passwordField = document.querySelector('.registrationForm__passwordInput___16GJp');
  if(passwordField && !passwordField.classList.contains(`${settings.ID}-initialised`)) {
    initPasswordTooltip();

    initPasswordUnmask();
  }
};

/**
 * Entry point for experiment
 */
const activate = () => {
  setup();

  events.send(`${settings.ID}`, `V${settings.VARIATION}`, `V${settings.VARIATION} Activated`);

  // Build in the first instance
  addRequiredFieldsLabel();
  initPostcodeTooltip();
  updateLabelTexts();

  // Run validation checker
  runValidationChecker((validationResults) => {
    if(validationResults.validGenders) {
      const form = document.querySelector('#social-registration');

      if(form) {
        form.classList.remove(`${settings.ID}-hide-til-gender-interaction`);

        pubSub.publish('did-show-form-after-gender-interaction');
      }
    }

    const emailFieldExists = !!document.querySelector('.registrationForm__emailInput___1sTIK');

    if(emailFieldExists) {
      // We are on step 2
      if(validationResults.step2) {
        markStepCtaActive();
      } else {
        markStepCtaInactive();
      }
    } else {
      // We are on step 1
      if(validationResults.step1) {
        markStepCtaActive();
      } else {
        markStepCtaInactive();
      }
    }
  });

  // Listen for EH001 changes to form
  document.addEventListener('eh001didchangeform', modifyFormOnEH001Event);

  // On desktop. hide form until gender interaction
  if(window.innerWidth >= 767) {
    hideFormUntilGenderInteraction();
  }
};

export default activate;
