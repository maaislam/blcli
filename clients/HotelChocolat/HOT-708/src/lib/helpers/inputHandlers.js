import { fireEvent } from "../../../../../../core-files/services";

const eventConfigs = {
    email: false,
    address: false,
    phoneNo: false,
}

const inputHandlers = (id, VARIATION) => {
    const allInputs = document.querySelectorAll('.field-wrapper .input-text');

    //set border color on blur
    allInputs.forEach((input) => {
        input.classList.add(`${id}__inputField`);
        input.addEventListener('blur', () => {
            if (VARIATION !== 'control') { // border color change for only variation-1
                if (input.value.length > 0) {
                    input.style.border = '2px solid #000';
                } else {
                    input.style.border = '1px solid #00000033';
                }
            }

            //firing event
            const inputLength = input.value.length;
            const inputType = input.type;
            const inputLengthCheck = inputLength > 0;

            //if email field, fire event
            if (inputType === 'email' && inputLengthCheck && !eventConfigs.email) {
                fireEvent('User submits email address');
                eventConfigs.email = true;
            } else if (input.id === 'dwfrm_addressy_addressFind' && inputLengthCheck && !eventConfigs.address) { //if address field, fire event
                fireEvent('User submits address');
                eventConfigs.address = true;
            } else if (input.id === 'dwfrm_multishipping_editAddress_addressFields_phone' && inputLengthCheck && !eventConfigs.phoneNo) { //if phone field, fire event
                fireEvent('User submits phone number');
                eventConfigs.phoneNo = true;
            }
        });
    });
};
export default inputHandlers;
