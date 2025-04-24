/**
 * Helper validate genders
 */
export const validateGenders = () => {
  let anyChecked = false;

  const genderRadios = document.querySelectorAll('[name=gender]');
  [].forEach.call(genderRadios, (rad) => {
    if(rad.checked) {
      anyChecked = true;
    }
  });

  return anyChecked;
};

/**
 * Helper validate step 1
 */
export const validateStep1 = () => {
  const conditions = [
    () => {
      let result = false;

      const firstName = document.querySelector('[name=firstName]');
      if(firstName && firstName.value.trim().length > 0) {
        result = true;
      }

      return result;
    },
    () => {
      let result = false;

      const zipCode = document.querySelector('[name=zipCode]');
      if(zipCode) {
        if(zipCode.disabled) {
          result = true;
        } else if(zipCode.pattern) {
          try {
            const reginald = new RegExp(zipCode.pattern);

            result = reginald.test(zipCode.value);
          } catch(e) {}
        }
      }

      return result;
    },
    validateGenders,
  ];

  let valid = true;
  for(var i = 0; i < conditions.length; i++) {
    if(!conditions[i]()) {
      valid = false;
    }
  }

  return valid;
};

/**
 * Helper validate step 2
 */
export const validateStep2 = () => {
  const conditions = [
    () => {
      // Email
      let result = false;

      const email = document.querySelector('.registrationForm__emailInput___1sTIK');
      if(email && email.value.trim().match(/.+@.+\..+/)) {
        result = true;
      }

      return result;
    },
    () => {
      // Password
      let result = false;

      const password = document.querySelector('.registrationForm__passwordInput___16GJp');
      if(password && password.value.length >= 8) {
        result = true;
      }

      return result;
    },
    () => {
      // Referrer
      let result = false;

      const referrer = document.querySelector('.registrationForm__referrerSelect___1hxQS');
      if(referrer && referrer.value.trim()) {
        result = true;
      }

      return result;
    },
    () => {
      // Terms and policy checkbox checked
      let result = true;
      const checkboxes = document.querySelectorAll('.AgreeTerms__checkbox___d8c0m input[type=checkbox]');

      if(checkboxes.length === 0) {
        result = false;
      } else {
        if(!checkboxes[0].checked) {
          result = false;
        }
      }

      return result;
    }
  ];

  let valid = true;
  for(var i = 0; i < conditions.length; i++) {
    if(!conditions[i]()) {
      valid = false;
    }
  }

  return valid;
};
