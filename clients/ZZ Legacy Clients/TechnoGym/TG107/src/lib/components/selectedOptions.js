/**
 * Add what has been selected to the box and amend when back is clicked
 */

import journey from "../helpers"
import shared from "../shared"
import { activeProgressStage } from "./lightboxMarkup";
import scrollToElement from "./scrollToTop";

    
const { ID } = shared;


// grab the journery array and create the selected options box

const journeyBoxes = () => {
    const selectedWrapper = document.querySelector(`.${ID}_selectedWrapper`);
    selectedWrapper.querySelector(`.${ID}-selectedOptions`).innerHTML = '';

    for (let x = 0; x < journey.length; x += 1) {
        const journeyItem = journey[x];
        
        const selectedItem = document.createElement('span');
        selectedItem.classList.add(`${ID}-selected`);
        selectedItem.innerHTML = journeyItem;

        selectedWrapper.querySelector(`.${ID}-selectedOptions`).appendChild(selectedItem);
    }
}

// on all next button clicks, get the journey and add to the box
export const buildTheSelectedOptions = () => {
    const nextButtons = document.querySelectorAll(`.${ID}-next`);
    
    for (let index = 0; index < nextButtons.length; index += 1) {
        const element = nextButtons[index];
        element.addEventListener('click', () => {
            if(element.parentNode.querySelector(`.${ID}-box_active`)) {
                journeyBoxes();
            }
        });
    }
}



// on the back button clicks
export const goBack = () => {

    // show the previous box
    const allBackLinks = document.querySelectorAll(`.${ID}-backLink`);
    const allOptions = document.querySelectorAll(`.${ID}-optionBox_wrapper`);

    for (let index = 0; index < allBackLinks.length; index += 1) {
        const element = allBackLinks[index];

        const backTarget = element.getAttribute('option-target');
        const matchingBox = document.querySelector(`#${ID}-${backTarget}`);

        element.addEventListener('click', () => {
            
            // hide the selected choices
            if(backTarget === 'payment') {
                document.querySelector(`.${ID}_selectedWrapper`).classList.remove(`${ID}-show`);
            }

            // check one is active before goint to the next one
            for (let i = 0; i < allOptions.length; i += 1) {
                const optionBox = allOptions[i];
                if(optionBox.classList.contains(`${ID}_options-active`)){
                    optionBox.classList.remove(`${ID}_options-active`);
                }
            }
            
            // show the one clicked
            matchingBox.classList.add(`${ID}_options-active`);

            // remove last one in journey
            //journey.pop();
            journey.pop();
            
            journeyBoxes();

            activeProgressStage();
            if(shared.VARIATION === '2') {
                document.querySelector(`.${ID}_selectionBoxes`).scrollTop = 0;
            } else {
                scrollToElement(document.querySelector(`.${ID}__boxContainer`));
            }
            
        });
    }
}


