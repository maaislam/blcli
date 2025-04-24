const showPasswordErrorMessage = (id, input) => {
    const newErrorMsg = 'Passwords must consist of a minimum of eight and a maximum of 25 characters of which one character must be numeric.';
    const ctrlErrorElem = document.querySelector('#dwfrm_profile_login_password-error');

    const newErrorMsgHtml = `<div class='${id}__newErrorMsg'>${newErrorMsg}</div>`;

    if (ctrlErrorElem) {
        const hasCtrlErrorMsg = ctrlErrorElem.textContent.length > 0;
        if (hasCtrlErrorMsg) {
            input.insertAdjacentHTML('afterend', newErrorMsgHtml);
        }
    }
};
export default showPasswordErrorMessage;