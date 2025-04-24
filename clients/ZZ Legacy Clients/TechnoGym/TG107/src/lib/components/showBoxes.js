/**
 * Functionality to show and hide boxes
 */

import shared from "../shared";
import { addAccessories, showRightAccessories } from "./accessories";
import { pollerLite } from "../../../../../../lib/utils";
import journey from "../helpers";
import { activeProgressStage } from "./lightboxMarkup";
import scrollToElement from "./scrollToTop";

 export default () => {

     const { ID, VARIATION } = shared;
     const boxButtons = document.querySelectorAll(`.${ID}-optionBox_wrapper .${ID}_button`);
     const allOptions = document.querySelectorAll(`.${ID}-optionBox_wrapper`);
     const firstSection = document.querySelector(`.${ID}_sectionContent`);

    // on first box click
    if(VARIATION === '1') {
        firstSection.querySelector(`.${ID}_button.${ID}_cta`).addEventListener('click', () => {
            firstSection.classList.add(`${ID}_info_hide`);
            document.querySelector(`.${ID}-optionBox_wrapper`).classList.add(`${ID}_options-active`);
            scrollToElement(document.querySelector(`.${ID}__boxContainer`));
        });    
    }
    if(VARIATION === '2') {
        firstSection.querySelector(`.${ID}_button.${ID}_cta`).addEventListener('click', () => {
           document.querySelector(`.${ID}_selectionBoxes #${ID}-payment`).classList.add(`${ID}_options-active`);
         });
    }    


     for (let index = 0; index < boxButtons.length; index += 1) {
        const element = boxButtons[index];
    
        const buttonTarget = element.getAttribute('option-target');
        const matchingBox = document.querySelector(`#${ID}-${buttonTarget}`);
         element.addEventListener('click', () => {

            // check one is active before goint to the next one
            if(element.parentNode.querySelector(`.${ID}-box_active`)) {
                // hide any that are active
                for (let i = 0; i < allOptions.length; i += 1) {
                    const optionBox = allOptions[i];
                    if(optionBox.classList.contains(`${ID}_options-active`)){
                        optionBox.classList.remove(`${ID}_options-active`);
                    }
                }
                // show the one clicked
                matchingBox.classList.add(`${ID}_options-active`);

                if(VARIATION === '1') {
                    scrollToElement(document.querySelector(`.${ID}__boxContainer`));
                }

                // add the one clicked to the journey array
                const activeOption = element.parentNode.querySelector(`.${ID}-box_active`).getAttribute('option-name');
                journey.push(activeOption);

                // show whats been selected
                if(buttonTarget === 'classes') {
                    document.querySelector(`.${ID}_selectedWrapper`).classList.add(`${ID}-show`);
                }

                // progress bar
                if(VARIATION === '2') {
                    activeProgressStage();
                    
                    document.querySelector(`.${ID}_selectionBoxes`).scrollTop = 0;
                    
                     // if pay monthly is selected, hide the last one in the progress bar
                     if(activeOption === 'Pay monthly') {
                        document.querySelector(`.${ID}_progressBar`).classList.add(`${ID}-accessories_hide`);
                     } else {
                        document.querySelector(`.${ID}_progressBar`).classList.remove(`${ID}-accessories_hide`);
                     }
                }

            } else {
                element.parentNode.querySelector(`.${ID}-error_message`).classList.add(`${ID}_errorshow`);
            }
         });
     }

      // move the accessories based on which is shown
     const moveAccessories = () => {
        if(!document.querySelector(`.${ID}-accessoriesItems .wrapper-products`)) {
            const accessories = document.querySelector('#group_3 .wrapper-products').parentNode;
            const accessoriesBox = document.querySelector(`#${ID}-accessories .${ID}-accessoriesItems`);

            if(accessories) {
                accessoriesBox.appendChild(accessories);
            }
        }
     }

     // on click of classes cta, add straight to cart
     const classesCTA = document.querySelector(`#${ID}-classes .${ID}_CTA`);
     classesCTA.addEventListener('click', () => {
        document.querySelector('#group_2 .buy_product.submit.button.btn-default').click();
     });

     // on the classes button, append the relevent accessories
     const accessoriesButton = document.querySelector(`.${ID}_button[option-target="accessories"]`);
     accessoriesButton.addEventListener('click', () => {
        moveAccessories();
        showRightAccessories();

        // run the accessories add to cart click function
        pollerLite([`#${ID}-accessories .${ID}_CTA`], () => {
            addAccessories();
        });
     });
 }