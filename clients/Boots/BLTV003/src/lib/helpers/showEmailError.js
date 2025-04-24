const showEmailError = (id, input, message) => {
    const formWrapper = input.closest(`.${id}__formWrapper`);
    const emailErrorMessage = formWrapper.querySelector(`.${id}__errorMessage`);
    const emailError = formWrapper.querySelector(`.${id}__error`);
    
    input.classList.add(`${id}__inputError`);
    emailError.classList.remove(`${id}__hide`);

    emailErrorMessage.textContent = message;
};
export default showEmailError;