import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

import generateToolTip from './generateToolTip';

const updateChoice = (choice, radio) => {

    // Add class to radio
    radio.classList.add(`${ID}-radio`);
        
    // Add additional text into radio
    if (choice.additionalText) {
        radio.insertAdjacentHTML('beforeend', choice.additionalText);
    }

    // Insert tooltip if has one
    if (choice.hasToolTip) {
        const tooltip = generateToolTip(choice);
        radio.insertAdjacentHTML('beforeend', tooltip);
    }

    // Change text if has alternateText property
    if (choice.alternateText) {
        // Change Options text
        let splitResults = radio.innerHTML.split('>');
        splitResults[1] = choice.alternateText;
        radio.innerHTML = `${splitResults[0]}> ${splitResults[1]}`;
    }
};


export default updateChoice;