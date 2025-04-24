import shared from '../../../../../core-files/shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
import { pollerLite } from '.../../../lib/uc-lib';
import getPriceFromDropdown from './getPriceFromDropdown';
import { fireEvent } from '../../../../../core-files/services';


const handleSide = (box) => {
    const title = box.querySelector('.titleWithIcon');
    const portionSelect = box.querySelector('.ddlVariation');
    const price = getPriceFromDropdown(portionSelect);

    const buttonAddToBagHref = box.querySelector('.buttons .greenButton').getAttribute('href');
    const hasDip = box.innerText.includes('Please select your free dip');
    const dipSelect = box.querySelector('.pnlFreeDips');

    let buttonClasses = '';

    // Add class
    box.classList.add(`${ID}-side`);

    // Dip logic
    if (hasDip) {
        box.classList.add(`${ID}-dip`);
        buttonClasses = 'is-disabled';
    }

    // Generate markup for button
    let buttonHTML = `
    <a href="${!hasDip ? buttonAddToBagHref : 'javascript:;'}" class="greenButton ${ID}-add ${buttonClasses}">
        <span>ADD</span>
    </a>
    `;

    if (VARIATION == '1') {
        title.insertAdjacentHTML('afterend', `<span class="${ID}-price">£${price}</span>`);
    }

    // Insert button
    const targetToWaitFor = hasDip ? '.dipsCustomise' : '.buttons';

    // Wait for elements
    pollerLite([
        () => {
            return box.querySelector(targetToWaitFor)
        }
    ], () => {
        const position = 'afterend';
        const target = hasDip ? box.querySelector('.dipsCustomise') : box.querySelector('.buttons');
        target.insertAdjacentHTML(position, buttonHTML);
    });
    

    // Get added button
    const addedButton = box.querySelector(`.${ID}-add`);

    if (hasDip) {
        dipSelect.addEventListener('change', (e) => {
            // Check if 'select dip' is selected
            if (e.target.value == '') {
                addedButton.classList.add('is-disabled');
                addedButton.href = 'javascript:;';
            } else {
                box.classList.remove('has-error');
                addedButton.classList.remove('is-disabled');
                addedButton.href = buttonAddToBagHref;
            }
        });
        // Stop button from being clicked when is disabled
        addedButton.addEventListener('click', (e) => {
            if (addedButton.href == 'javascript:;') {
                e.preventDefault();
                box.classList.add('has-error');
                fireEvent('Dip selection - error');
            } else {
                fireEvent('Click - Add button');
            }
        });
    }
};

export default handleSide;