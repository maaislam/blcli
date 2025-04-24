import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

import addHubspot from './addHubspot';

export default (formReadyCallback) => {
    const form = document.querySelector(`.${ID}-form`);
    const formSettings = {
        region: 'na1',
        portalId: '6280206',
        formId: '714ba871-060b-4987-b4b8-df150281f500',
        target: '.js-hubspot-callback-form',
        onFormSubmit() {
            fireEvent('Form submitted');
            form.classList.add('has-submitted');
        },
        onFormReady() {
            formReadyCallback();
        }
    };
    addHubspot(() => {
        hbspt.forms.create(formSettings);
    });
}