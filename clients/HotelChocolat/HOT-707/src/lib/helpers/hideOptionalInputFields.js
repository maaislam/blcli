const hideOptionalInputFields = (id) => {
    //hide password hint text
    const passwordHintElem = document.querySelector('#RegistrationForm > fieldset > p');
    passwordHintElem.classList.add(`${id}__hide`);

    //hide confirm password field
    const confirmPasswordField = document.querySelector('#dwfrm_profile_login_passwordconfirm[type="password"]');
    const confirmPasswordRow = confirmPasswordField.closest('.form-row');
    confirmPasswordRow.classList.add(`${id}__hide`);

    //hide country dropdown field
    const countryField = document.querySelector('#dwfrm_profile_address_country');
    const countryRow = countryField.closest('.form-row');
    countryRow.classList.add(`${id}__hide`);

    //hide optional mobile number
    const mobileNumber = document.querySelector('#dwfrm_profile_customer_mobilephone');
    const mobileNumberRow = mobileNumber.closest('.form-row');
    mobileNumberRow.classList.add(`${id}__hide`);

    //hide optional country input field
    // const countryInput = document.querySelector('#dwfrm_profile_address_county');
    // const countryInputRow = countryInput.closest('.form-row');
    // countryInputRow.classList.add(`${id}__hide`);

    //hide optional address2 input field
    // const address2Input = document.querySelector('#dwfrm_profile_address_address2');
    // const address2InputRow = address2Input.closest('.form-row');
    // address2InputRow.classList.add(`${id}__hide`);

    //hide optional company name input field
    // const companyNameInput = document.querySelector('#dwfrm_profile_customer_companyName');
    // const companyNameInputRow = companyNameInput.closest('.form-row');
    // companyNameInputRow.classList.add(`${id}__hide`);
};
export default hideOptionalInputFields;