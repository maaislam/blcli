/**
 * Helper check country selected is UK
 */
export const checkCountryIsUk = () => {
  let isUk = false;

  const countrySelect = document.querySelector('.registrationForm__countrySelect___1ALbG');
  if(countrySelect) {
    if(countrySelect.value == 215) {
      isUk = true;
    }
  }

  return isUk;
};

