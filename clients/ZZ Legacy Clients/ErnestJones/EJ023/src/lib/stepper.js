import cache from './cache';
import pubSub from './PublishSubscribe';
import settings from './settings';

/**
 * Helper update form identify current step
 */
const updateFormState = (step) => {
  // Remove existing classes identifying step
  cache.get('checkout-form').className = cache.get('checkout-form').className.replace(
    new RegExp(`${settings.ID}-step-\\d+`, 'ig'),
    ''
  );

  // Set class name on form step
  cache.get('checkout-form').classList.add(`${settings.ID}-step-${step}`);
}

/**
 * Helper validation against each step
 */
const validates = (nextStep) => {
  if(nextStep == 2) {
    // ----------------------------------------------------------------
    // STEP 2
    // ----------------------------------------------------------------
    let valid = true;

    // If 'I already have an account is chosen' then validate against because at this point
    // the user is expected to hit the sign in button
    const alreadyHaveAccount = document.querySelector('#loginRadio');
    if(alreadyHaveAccount && alreadyHaveAccount.checked === true) {
      valid = false;
    }

    // Validate email address
    const email = document.querySelector('#email');
    if(!email || !email.value || !/^.+@.+\..+$/i.test(email.value.trim())) {
      valid = false;
    }
    
    // If 'create an account for future use' is selected, validate choose password fields
    const createAccountFields = document.querySelector(`.${settings.ID}-create-account-fields`);
    if(createAccountFields && !createAccountFields.classList.contains(`${settings.ID}-create-account-fields--hide`)) {
      // Password validation required
      const pass1 = document.querySelector('#choosePassword');
      const pass2 = document.querySelector('#confirmpassword');

      if(!pass1 || !pass2) {
        valid = false;
      } else {
        const conditions = [
          /[A-Z]/.test(pass1.value),
          /[a-z]/.test(pass1.value),
          /\d/.test(pass1.value),
          pass1.value.trim().length >= 8,
          pass1.value == pass2.value,
        ];

        if(conditions.indexOf(false) > -1) {
          valid = false;
        }
      }
    }
    
    return valid;
  } else if(nextStep == 3) {
    // ----------------------------------------------------------------
    // STEP 3
    // ----------------------------------------------------------------
    let valid = true;
    
    // Validate 'your details'
    const firstName = document.querySelector('#fname');
    const lastName = document.querySelector('#lname');
    const phone = document.querySelector('#phone');

    if(!firstName || !lastName || !phone) {
      valid = false;
    } else {
      const conditions = [
        firstName.value.trim().length >= 2,
        lastName.value.trim().length >= 2,
        /^\d{8,12}$/.test(phone.value.trim().replace(/[\s\+-]/g, '')),
      ];
      
      if(conditions.indexOf(false) > -1) {
        valid = false;
      }
    }
    
    // Validate delivery address
    const del1 = document.querySelector('#deliveryAddressLine1');
    const town = document.querySelector('#deliveryTown');
    const postcode = document.querySelector('#deliveryPostcode');

    if(!del1 || !town || !postcode) {
      valid = false;
    } else {
      if(!del1.value.trim()) {
        valid = false;
      }

      if(!/^[\w\s]{2,}$/i.test(town.value.trim())) {
        valid = false;
      }

      if(!/^\w{1,2}\d{1,2}\w?\s\d\w{2}/i.test(postcode.value)) {
        valid = false;
      }
    }
    
    // If 'gift recipient' is checked, ensure first and last name are entered
    const toMe = document.querySelector('#toMe');
    if(toMe && toMe.checked === false) {
      // gift recipient is chosen, i.e. not 'to me'
      const customerFirst = document.querySelector('#customerfname');
      const customerLast = document.querySelector('#customerlname');

      if(customerFirst && customerLast) {
        if(!/^[A-Z\s]{2,}$/i.test(customerFirst.value)) {
          valid = false;
        }

        if(!/^[A-Z\s]{2,}$/i.test(customerLast.value)) {
          valid = false;
        }
      }
    }
    
    return valid;
  }
};

/**
 * Helper create button DOM element
 */
const createButton = (step, didGetClicked) => {
  const btn = document.createElement('button');
  btn.classList.add('fullWidthBtn');
  btn.classList.add(`${settings.ID}-step-btn`);
  btn.classList.add(`${settings.ID}-step-btn--disabled`);
  btn.classList.add(`${settings.ID}-step-btn-${step}`);
  btn.dataset['nextstep'] = step;

  btn.innerHTML = 'Continue';
  
  // Initialise an interval checker that shows / hides button depending on whether step is valid
  const stepValidationInterval = setInterval(() => {
    if(validates(step)) {
      btn.classList.remove(`${settings.ID}-step-btn--disabled`); 
    } else {
      btn.classList.add(`${settings.ID}-step-btn--disabled`); 
    }
  }, 500);

  // Handle button on click
  btn.addEventListener('click', (e) => {
    const btnRect = btn.getBoundingClientRect();
    window.scrollTo(0, window.scrollY + btnRect.top + btnRect.height);

    btn.nextElementSibling.classList.contains('cardIcons') && btn.nextElementSibling.remove();
    btn.remove();
    clearInterval(stepValidationInterval);

    pubSub.publish('did-click-step-button', step);

    if(typeof didGetClicked == 'function') {
      didGetClicked(step);
    }
  });


  return btn;
};

/**
 * Init
 */
export const initSteps = () => {
  // Hide elements (CSS by class) and show a 'continue' button
  // which brings into view the next steps
  updateFormState(1);

  // Continue Button 1
  const btn = createButton(2, () => {
    updateFormState(2);
  });

  cache.get('guest-selector-container').insertAdjacentElement('afterend', btn);

  // Continue Button 2
  const btn2 = createButton(3, () => {
    updateFormState(3);
  });
  cache.get('gift-recipient-container').insertAdjacentElement('afterend', btn2);

  // For V4 show card logos after the button
  // Clones the existing card logos display
  if(settings.VARIATION === '4') {
    const cardLogos = document.querySelector('.infoPanel .cardIcons');
    const cardLogosHtml = cardLogos.outerHTML;

    btn.insertAdjacentHTML('afterend', cardLogosHtml);
    btn2.insertAdjacentHTML('afterend', cardLogosHtml);

    const submitButton = document.querySelector('#placeOrder');
    if(submitButton) {
      submitButton.insertAdjacentHTML('afterend', cardLogosHtml);
    }

    cardLogos.parentNode.classList.add(`${settings.ID}-card-icons-wrap`);
  }
};
