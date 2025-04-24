/**
 * Finder logic
 */
import shared from './shared';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

export default () => {

    let step1Answers = [];
    let step2Answers = [];
    let step3Answers = [];

    // on click options, add active
    const answerBoxes = document.querySelectorAll(`.${ID}-question:not(.${ID}-question3) .${ID}-answer`);

    [].forEach.call(answerBoxes, (answerBox) => {
        answerBox.addEventListener('click', () => {

            // don't select more than 3
            if(document.querySelectorAll(`.${ID}-question--active .${ID}-answer--selected`).length === 3) {
                if(answerBox.classList.contains(`${ID}-answer--selected`)) {
                    answerBox.classList.remove(`${ID}-answer--selected`);
                }
            } else {
                if(answerBox.classList.contains(`${ID}-answer--selected`)) {
                    answerBox.classList.remove(`${ID}-answer--selected`);
                } else {
                    answerBox.classList.add(`${ID}-answer--selected`);
                }
            }
        });
    });

    // on price clicks
    const answerPriceBoxes = document.querySelectorAll(`.${ID}-question3 .${ID}-answer`);

    [].forEach.call(answerPriceBoxes, (priceBox) => {
        priceBox.addEventListener('click', (e) => {

            if(e.currentTarget.classList.contains(`${ID}-answer--selected`)) {
                e.currentTarget.classList.remove(`${ID}-answer--selected`);
    
                // add active, remove any other actives
              } else if(!e.currentTarget.classList.contains(`${ID}-answer--selected`)) {
    
                for (let index = 0; index < answerPriceBoxes.length; index += 1) {
                  const element = answerPriceBoxes[index];
                  element.classList.remove(`${ID}-answer--selected`);
              }
    
                e.currentTarget.classList.add(`${ID}-answer--selected`);
              }
        });
    });


    const completeStep = (step) => {
        // Store the answers
        const questionContainer = document.querySelector(`.${ID}-options.${ID}-question` + step);
        const chosenAnswers = questionContainer.querySelectorAll(`.${ID}-answer--selected`);
        [].forEach.call(chosenAnswers, (question) => {
            var answer = question.getAttribute('data-result');
            if(step == 1) {
                step1Answers.push(answer);
            }
            if(step == 2) {
                step2Answers.push(answer);
            }
            if(step == 3) {
                step3Answers.push(answer);
            }
        });

        // If step 3 build final URL
        if(step == 3) {
            redirectToResultPage();
        } else {
            moveToStep(parseInt(step), parseInt(step) + 1);
        }
    }

    const redirectToResultPage = () => {
        var url = '/webstore/l/engagement-rings';
        url += '/material|' + (step1Answers.join('|'));
        url += '/stone+shape|' + (step2Answers.join('|'));
        url += step3Answers.join('|');

        
        window.location = url;
        
        events.send(`${ID} variation:${VARIATION}`, 'click', 'refine button in ring finder');
        events.send(`${ID} variation:${VARIATION}`, 'searched for', `material:${step1Answers.join('|')}, stone shape:${step2Answers.join('|')}, price:${step3Answers.join('|')}`);
        
    }

    const moveToStep = (currentStep, targetStep) => {
        // HIde current div, show next question in step
        const toHide = document.querySelector(`.${ID}-options.${ID}-question` + currentStep);
        toHide.classList.remove(`${ID}-question--active`);

        // remove active from previous step bar
        const stepBarToHide = document.querySelector(`.${ID}-step.${ID}-question` + currentStep);
        stepBarToHide.classList.remove(`${ID}-step--active`);
        stepBarToHide.classList.add(`${ID}-step--complete`);


        const toShow = document.querySelector(`.${ID}-options.${ID}-question` + targetStep);
        toShow.classList.add(`${ID}-question--active`);

        // add active from to next step in bar
        const stepBarToShow = document.querySelector(`.${ID}-step.${ID}-question` + targetStep);
        stepBarToShow.classList.add(`${ID}-step--active`);

        // remove complete if back
        if(stepBarToShow.classList.contains(`${ID}-step--complete`)) {
            stepBarToShow.classList.remove(`${ID}-step--complete`);
            stepBarToShow.nextElementSibling.classList.remove(`${ID}-step--complete`);
        }
    }

    [].forEach.call(document.querySelectorAll(`.${ID}-next`), (nextButton) => {
        nextButton.onclick = (e) => {
            const step = e.currentTarget.getAttribute('data-step');
            if(document.querySelector(`.${ID}-options.${ID}-question${step} .${ID}-answer--selected`)) {
                completeStep(step);
                document.querySelector(`.${ID}-options.${ID}-question${step} .${ID}-error`).style.display = 'none';
            } else {
                document.querySelector(`.${ID}-options.${ID}-question${step} .${ID}-error`).style.display = 'block';
            }
           
        }
    });

    [].forEach.call(document.querySelectorAll(`.${ID}-back`), (backButton) => {
        backButton.onclick = (e) => {
            const step = e.currentTarget.getAttribute('data-step');
            moveToStep(parseInt(step), parseInt(step) - 1);
        }
    });

    document.querySelector(`.${ID}-closeFinder`).addEventListener('click', () => {
        step1Answers = [];
        step2Answers = [];
    });
}

