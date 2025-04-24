const changeFieldLayout = (id) => {
    //all input fields
    const emailInput = document.querySelector('#dwfrm_multishipping_editAddress_userInfo_customer_email');
    // const passwordInput = document.querySelector('#dwfrm_profile_login_password');
    const firstNameInput = document.querySelector('#dwfrm_multishipping_editAddress_addressFields_firstName');
    const lastNameInput = document.querySelector('#dwfrm_multishipping_editAddress_addressFields_lastName');
    const addressInput = document.querySelector('#dwfrm_addressy_addressFind');
    const deliveryContactInput = document.querySelector('#dwfrm_multishipping_editAddress_addressFields_phone');
    const addressLine1Input = document.querySelector('#dwfrm_multishipping_editAddress_addressFields_address1');
    const cityInput = document.querySelector('#dwfrm_multishipping_editAddress_addressFields_city');
    const postcodeInput = document.querySelector('#dwfrm_multishipping_editAddress_addressFields_postal');


    //all field parent rows
    const emailRow = emailInput.closest('.form-row');
    // const passwordRow = passwordInput.closest('.form-row');
    const firstNameRow = firstNameInput.closest('.form-row');
    const lastNameRow = lastNameInput.closest('.form-row');
    const addressRow = addressInput.closest('.form-row');
    const deliveryContactRow = deliveryContactInput.closest('.form-row');
    const addressLine1Row = addressLine1Input.closest('.form-row');
    const cityRow = cityInput.closest('.form-row');
    const postcodeRow = postcodeInput.closest('.form-row');


    //all field labels
    const emailLabel = emailRow.querySelector('label');
    // const passwordLabel = passwordRow.querySelector('label');
    const firstNameLabel = firstNameRow.querySelector('label');
    const lastNameLabel = lastNameRow.querySelector('label');
    const addressLabel = addressRow.querySelector('label');
    const deliveryContactLabel = deliveryContactRow.querySelector('label');
    const addressLine1Label = addressLine1Row.querySelector('label');
    const cityLabel = cityRow.querySelector('label');
    const postcodeLabel = postcodeRow.querySelector('label');

    //firstname, lastname in a single row
    //   const firstName = document.querySelector('#dwfrm_multishipping_editAddress_addressFields_firstName');
    //   const lastName = document.querySelector('#dwfrm_multishipping_editAddress_addressFields_lastName');

    //   const firstNameRow = firstName.closest('.form-row');
    //   const lastNameRow = lastName.closest('.form-row');

    //email field
    emailInput.placeholder = 'example@example.com';
    emailLabel.textContent = 'Email';

    //password field
    // passwordRow.classList.add(`${id}__passwordRow`);
    // passwordInput.placeholder = '******';
    // passwordLabel.textContent = 'Password';
    // passwordInput.insertAdjacentHTML('afterend', `<span class='${id}__passwordIcon'>${revealPasswordIcon}</span>`);

    //first name field
    firstNameInput.placeholder = 'Jane';
    firstNameLabel.textContent = 'First name';

    //last name field
    lastNameInput.placeholder = 'Smith';
    lastNameLabel.textContent = 'Last name';

    //first name, last name in a single row
    const newNameRow = document.createElement('div'); //name row
    const newFirstNameElem = document.createElement('div'); //first name div
    const newLastNameElem = document.createElement('div'); //last name div

    newNameRow.classList.add(`${id}__newNameRow`);
    newFirstNameElem.classList.add(`${id}__firstName`);
    newLastNameElem.classList.add(`${id}__lastName`);

    newNameRow.appendChild(newFirstNameElem);
    newNameRow.appendChild(newLastNameElem);

    newFirstNameElem.appendChild(firstNameRow);
    newLastNameElem.appendChild(lastNameRow);

    emailRow.insertAdjacentElement('afterend', newNameRow);

    // const newNameRow = `<div class='${id}__newNameRow'>
    //     <div class='${id}__firstName'>
    //     ${firstNameRow.outerHTML}
    //     </div>
    //     <div class='${id}__lastName'>
    //     ${lastNameRow.outerHTML}
    //     </div>
    // </div>`;

    // lastNameRow.insertAdjacentHTML('afterend', newNameRow);
    // firstNameRow.remove();
    // lastNameRow.remove();

    //address field
    addressInput.placeholder = 'Enter postcode, street or address';
    addressLabel.textContent = 'Billing address';
    addressRow.classList.add(`${id}__addressRow`);

    //address line 1 field
    addressLine1Input.placeholder = 'Address line 1';
    addressLine1Label.textContent = 'Address line 1';

    //city field
    cityInput.placeholder = 'Town/City';
    cityLabel.textContent = 'Town / City';

    //postcode field
    postcodeInput.placeholder = 'Postcode';
    postcodeLabel.textContent = 'Postcode';

    //delivery contact field
    deliveryContactInput.placeholder = '079000 00000';
    deliveryContactLabel.textContent = 'Delivery contact number';

    //add phone terms text below phone input
    const phoneTextHtml = `<div class='${id}__phoneTerms'>We use your number if we need to call you about your order.</div>`;
    deliveryContactRow.insertAdjacentHTML('afterend', phoneTextHtml);

    //enter-manually text changes
    const enterManuallyElem = document.querySelector('.enter-manually');
    enterManuallyElem.textContent = 'Or enter manually';
    enterManuallyElem.classList.add(`${id}__enterManually`);

    //set delivery address text as default
    const deliveryAddressText = `<div class='${id}__deliveryAddressText'>We only deliver to UK addresses</div>`;
    // enterManuallyElem.insertAdjacentHTML('afterend', deliveryAddressText);
    // const ctrlInputAddress = document.querySelector(`.${id}__addressRow .${id}__inputField`);
    addressInput.insertAdjacentHTML('afterend', deliveryAddressText);

    //cta button text changes
    const ctaButtonElem = document.querySelector('[name="dwfrm_multishipping_editAddress_save"]');
    ctaButtonElem.textContent = 'Continue to delivery';

};
export default changeFieldLayout;