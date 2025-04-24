import shared from '../lib/shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const getForm = () => {
    return `
    <div class="${ID}-form">
        <h4 class="${ID}-form__heading ${ID}-form-heading">Complete this form to receive a quote or callback:</h4>
        <div class="js-hubspot-callback-form"></div>
    </div>
    `;
};

export default getForm;