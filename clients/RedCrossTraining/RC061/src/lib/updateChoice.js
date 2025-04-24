import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

import generateToolTip from './generateToolTip';

const updateChoice = (choice, radio) => {

    // Add class to radio
    radio.classList.add(`${ID}-radio`);
        
    // Add additional text into radio
    radio.insertAdjacentHTML('beforeend', choice.additionalText);

    // Insert tooltip if has one
    if (choice.hasToolTip) {
        const tooltip = generateToolTip(choice);
        radio.insertAdjacentHTML('beforeend', tooltip);
    }
};


export default updateChoice;