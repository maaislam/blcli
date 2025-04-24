import { pollerLite } from "../../../../../../lib/utils";
import matchPasswordLists from "../components/matchPasswordLists";
import passwordValidation from "./passwordValidation";
import showPasswordErrorMessage from "./showPasswordErrorMessage";

const inputHandlers = (id) => {
    const allInputs = document.querySelectorAll('.field-wrapper .input-text');

    //set border color on blur
    allInputs.forEach((input) => {
        input.classList.add(`${id}__inputField`);
        input.addEventListener('blur', () => {
            if (input.value.length > 0) {
                input.style.border = '2px solid #000';
            } else {
                input.style.border = '1px solid #00000033';
            }

            //set password field errors
            if (input.id === 'dwfrm_profile_login_password') {
                const newErrorMsg = document.querySelector(`.${id}__newErrorMsg`);
                if (newErrorMsg) newErrorMsg.remove();
                showPasswordErrorMessage(id, input);
            }
        });
    });



    //password field validation
    const passwordInputField = document.querySelector('#dwfrm_profile_login_password');
    passwordInputField.insertAdjacentHTML('afterend', matchPasswordLists(id));

    pollerLite([`.${id}__passwordRow`], () => {
        const passwordErrorElement = document.querySelector('#dwfrm_profile_login_password-error') || document.querySelector(`.${id}__passwordRow .error-message`);
        if (passwordErrorElement) passwordErrorElement.textContent = 'Passwords must consist of a minimum of eight and a maximum of 25 characters of which one character must be numeric.';

        if (passwordErrorElement && document.querySelector(`.${id}__passwordRow .error-message`)) {
            passwordErrorElement.classList.add(`${id}__passwordError`);
            passwordInputField.insertAdjacentElement('afterend', document.querySelector(`.${id}__passwordRow .error-message`));
        }
    });

    passwordInputField.addEventListener('input', (e) => {
        const { value } = e.target;

        passwordValidation(id, value);
        //set password field errors
        // const newErrorMsg = document.querySelector(`.${id}__newErrorMsg`);
        // if (newErrorMsg) newErrorMsg.remove();
        // showPasswordErrorMessage(id, passwordInputField);
    });
};
export default inputHandlers;
