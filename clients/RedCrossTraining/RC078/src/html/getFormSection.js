import shared from '../lib/shared';
import getForm from './getForm';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const getFormSection = () => {
    return `
    <div class="o-section u-text-center" id="group-bookings">
        <div class="o-wrapper">
            <hr class="o-hr">
            <h2 class="u-text-green">GROUP BOOKINGS</h2>
            ${getForm()}
        </div>
    </div>`;
};

export default getFormSection;