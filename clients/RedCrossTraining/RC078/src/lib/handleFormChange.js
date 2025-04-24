import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const handleFormChange = () => {
    const form = document.querySelector('.js-hubspot-callback-form');
    const whereTraining = form.querySelectorAll('[name="where_training"]');
    whereTraining.forEach(radio => {
        radio.addEventListener('click', () => {
            fireEvent(`Where do you require training - [${radio.value}] selected`);
        });
    });
};

export default handleFormChange;