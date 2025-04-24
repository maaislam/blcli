
// step 1 - country
// step 2 - country current
// step 3 - Dialling code
// step 4 - Accept
// step 5 - Reject

import shared from "../../../../../core-files/shared"


export default () => {

    const { ID } = shared;
    

    // if box never shown
   

        const allQuestions = document.querySelectorAll(`.${ID}-question`);

        for (let index = 0; index < allQuestions.length; index++) {
            const element = allQuestions[index];
            const currentStep = element.getAttribute('step');
            if(element.querySelector(`.${ID}-button`)) {
                element.querySelector(`.${ID}-button`).addEventListener('click', () => {                    
                    

                    if(currentStep === '1') {

                        if(element.querySelector(`.${ID}-checkbox`) && !element.querySelector(`.${ID}-checkbox`).checked) {
                            element.querySelector(`.${ID}-error`).style.display = 'block';
                            element.querySelector(`.${ID}-checkbox`).classList.add(`${ID}-required`);
                        } else {
                            element.querySelector(`.${ID}-error`).style.display = 'none';
                            element.querySelector(`.${ID}-checkbox`).classList.remove(`${ID}-required`);

                            // rejected if America
                            if(element.querySelector('select').value === 'United States of America') {
                                document.querySelector(`.${ID}-reject`).classList.add(`${ID}-active`);
                                element.classList.remove(`${ID}-active`);
                            } else {
                                document.querySelector(`.${ID}-question[step="2"]`).classList.add(`${ID}-active`);
                                element.classList.remove(`${ID}-active`);
                            }
                        }
                        
                    }
                    if(currentStep === '2') {
                        if(element.querySelector(`.${ID}-checkbox`) && !element.querySelector(`.${ID}-checkbox`).checked) {
                            element.querySelector(`.${ID}-error`).style.display = 'block';
                            element.querySelector(`.${ID}-checkbox`).classList.add(`${ID}-required`);
                        } else {
                            element.querySelector(`.${ID}-error`).style.display = 'none';
                            element.querySelector(`.${ID}-checkbox`).classList.remove(`${ID}-required`);

                            if(element.querySelector('select').value === 'United States of America') {
                                document.querySelector(`.${ID}-reject`).classList.add(`${ID}-active`);
                                element.classList.remove(`${ID}-active`);
                            } else {
                                document.querySelector(`.${ID}-question[step="3"]`).classList.add(`${ID}-active`);
                                element.classList.remove(`${ID}-active`);
                            } 
                        }
                    }
                    if(currentStep === '3') {
                        if(element.querySelector('select').value === '1' || element.querySelector('select').value === '+1') {
                            document.querySelector(`.${ID}-reject`).classList.add(`${ID}-active`);
                            element.classList.remove(`${ID}-active`);
                        } else {
                            document.querySelector(`.${ID}-question[step="4"]`).classList.add(`${ID}-active`);
                            element.classList.remove(`${ID}-active`);
                        } 
                        
                    }
                    // if not US
                    if(currentStep === '4') {
                        sessionStorage.setItem(`${ID}-location`, 'not US');
                        // hide the box
                        const overlay = document.querySelector(`.${ID}-overlay`);
                        document.querySelector(`.${ID}-screeningBox`).classList.add(`${ID}-modalHide`);
                        overlay.classList.add(`${ID}-overlayHide`);
                    }

                     // if US
                    if(currentStep === '5') {
                        sessionStorage.setItem(`${ID}-location`, 'is US');
                        window.location.href = 'https://www.hotelchocolat.com/';
                    }

                });
            }
    }
}