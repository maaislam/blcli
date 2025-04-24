/**
 * On click of boxes, click the matching ones
 */

import shared from "../shared"

 export default () => {
    const { ID } = shared;
    
     const options = document.querySelectorAll(`.${ID}_selectionBoxes .${ID}_box`);
     
     const fullPayClasses = document.querySelector(`#${ID}-classes .${ID}-fullPay`);
     const monthlyClasses = document.querySelector(`#${ID}-classes .${ID}-monthlyPay`);
     
     for (let index = 0; index < options.length; index += 1) {
         const element = options[index];

         const elTarget = element.getAttribute('box-target');
         const matchingEl = document.querySelector(`.groups .action-radio.action[box-data="${elTarget}"]`);
         if(matchingEl) {
            element.addEventListener('click', () => {
            
                const alreadyActiveEl = element.parentNode.querySelector(`.${ID}_box.${ID}-box_active`);
                if(alreadyActiveEl) {
                    alreadyActiveEl.classList.remove(`${ID}-box_active`);
                }

                // if box clicked is monthly or full, show the relevant boxes
                if(elTarget === 'fullpay') {
                    fullPayClasses.classList.add(`${ID}-class_active`);
                    monthlyClasses.classList.remove(`${ID}-class_active`);
                } else if (elTarget === 'monthly') {
                    monthlyClasses.classList.add(`${ID}-class_active`);
                    fullPayClasses.classList.remove(`${ID}-class_active`);
                }

                element.classList.add(`${ID}-box_active`);
                matchingEl.click();

                jQuery('html,body').stop();
                jQuery('html,body').stop(true,false);
            });
         }
        
     }
 }