const passwordValidation = (ID, value) => {
    const hasNumber = /\d/.test(value); // checks if there is at least one digit
    const isValidLength = value.length >= 8; // checks if the length is at least 8

    if (isValidLength) {
        const tickIconDisabled = document.querySelector('#characterMatchingText .tickIconDisabled');
        const tickIconEnabled = document.querySelector('#characterMatchingText .tickIconEnabled');
        const textElem = document.querySelector(`#characterMatchingText .${ID}__text`);

        tickIconEnabled.classList.remove(`${ID}__hide`);
        tickIconDisabled.classList.add(`${ID}__hide`);

        textElem.classList.remove(`${ID}__textDisable`);
    } else if (!isValidLength) {
        const tickIconDisabled = document.querySelector('#characterMatchingText .tickIconDisabled');
        const tickIconEnabled = document.querySelector('#characterMatchingText .tickIconEnabled');
        const textElem = document.querySelector(`#characterMatchingText .${ID}__text`);

        tickIconDisabled.classList.remove(`${ID}__hide`);
        tickIconEnabled.classList.add(`${ID}__hide`);

        textElem.classList.add(`${ID}__textDisable`);
    }


    if (hasNumber) {
        const tickIconDisabled = document.querySelector('#numberMatchingText .tickIconDisabled');
        const tickIconEnabled = document.querySelector('#numberMatchingText .tickIconEnabled');
        const textElem = document.querySelector(`#numberMatchingText .${ID}__text`);

        tickIconDisabled.classList.add(`${ID}__hide`);
        tickIconEnabled.classList.remove(`${ID}__hide`);

        textElem.classList.remove(`${ID}__textDisable`);
    } else if (!hasNumber) {
        const tickIconDisabled = document.querySelector('#numberMatchingText .tickIconDisabled');
        const tickIconEnabled = document.querySelector('#numberMatchingText .tickIconEnabled');
        const textElem = document.querySelector(`#numberMatchingText .${ID}__text`);

        tickIconDisabled.classList.remove(`${ID}__hide`);
        tickIconEnabled.classList.add(`${ID}__hide`);

        textElem.classList.add(`${ID}__textDisable`);
    }

    //set value to confirm password field
    const confirmPasswordField = document.querySelector('#dwfrm_profile_login_passwordconfirm[type="password"]');
    confirmPasswordField.value = value;
    //dispatch change event
    confirmPasswordField.dispatchEvent(new Event('input'));
};
export default passwordValidation;
