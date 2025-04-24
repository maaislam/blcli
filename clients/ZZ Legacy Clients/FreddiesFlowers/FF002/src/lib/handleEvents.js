import shared from './shared';
import { setup, fireEvent } from './services';
const { ID, VARIATION } = shared;
import { elementIsInView } from '../../../../../lib/utils';

const handleDropdown = () => {
    const dropdown = document.querySelector(`.${ID}-dropdown`);
    const dropdownOptions = document.querySelector(`.${ID}-dropdown__options`);
    const dropdownOption = document.querySelectorAll(`.${ID}-dropdown__option`);
    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('is-open');
        // Tracking
        if (dropdown.classList.contains('is-open')) {
            fireEvent('Profile/Account Click');
        }
        if (dropdown.classList.contains('is-open') && !elementIsInView(dropdownOptions)) {
            window.scrollTo({
                top: dropdownOptions.getBoundingClientRect().top + document.body.scrollTop - (window.innerHeight / 2),
            });
        }
    });
    
    document.body.addEventListener('click', () => {
        dropdown.classList.remove('is-open');
    });

    // Tracking
    dropdownOption.forEach(option => {
        option.addEventListener('click', (e) => {
            fireEvent(`Profile/Account option clicked - ${option.dataset.eventLabel}`);
        });
    });
};

export default () => {
    handleDropdown();
};