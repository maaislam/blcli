import shared from "../shared";

export default () => {
    // add required to all the fields
    const { ID } = shared;

    const formButton = document.querySelector('.identity-input-submit.download-button');
    formButton.textContent = 'Get in touch';

    const allFields = document.querySelectorAll('.form-control-holder:nth-child(-n+3)');
    for (let index = 0; index < allFields.length; index += 1) {
        const element = allFields[index];
        element.querySelector('label').insertAdjacentHTML('afterend', `<span class="${ID}-required">*</span>`);
    }
}