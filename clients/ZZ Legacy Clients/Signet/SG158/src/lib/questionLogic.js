import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { getSiteFromHostname } from "./experiment";
import { genderSteps, HSpaths, paths, productStepsFemale, productStepsMale, productStepsUnisex } from "./stepData";


const { ID } = shared;


/**
 * Finder logic - don't change this
 */

const showAnswers = (stepNo, answerList, title) => {
    document.querySelector(`.${ID}-answer.${ID}-q${stepNo}`).innerHTML = `<span>${title}</span><div class="${ID}-chosenAnswers"></div>`;
    document.querySelector(`.${ID}-answer.${ID}-q${stepNo}`).classList.add(`${ID}-active`);

    const answers = answerList;
    for (let index = 0; index < answers.length; index += 1) {
        const element = answers[index];
        const answerEl = document.createElement('p');
        answerEl.innerHTML = `${element}`;

        document.querySelector(`.${ID}-answer.${ID}-q${stepNo} .${ID}-chosenAnswers`).appendChild(answerEl);
    }
}

const removeAnswersOnBack = (stepNo) => {
    document.querySelector(`.${ID}-chosenOptions .${ID}-answer.${ID}-q${stepNo}`).innerHTML = '';
    document.querySelector(`.${ID}-answer.${ID}-q${stepNo}`).classList.remove(`${ID}-active`);
}

const updateQuestionTitle = (data) => {
    const stepTitle = document.querySelector(`.${ID}-titleBlock`);
    stepTitle.querySelector(`.${ID}-optionsTitle`).textContent = data.title;
    stepTitle.querySelector(`p`).textContent = data.smallText;
}


const activeOptions = () => {

    /* If multiple choice question */
    if(document.querySelector(`.${ID}-innerOptions`).classList.contains(`${ID}-multipleChoice`)) {
        const answerOption = document.querySelectorAll(`.${ID}-innerOptions .${ID}-answer`);

        [].forEach.call(answerOption, (answerEl) => {
            answerEl.addEventListener('click', () => {
            
                // don't select more than 3
                if(document.querySelectorAll(`.${ID}-question--active .${ID}-answer--selected`).length === 3) {
                    if(answerEl.classList.contains(`${ID}-answer--selected`)) {
                        answerEl.classList.remove(`${ID}-answer--selected`);
                    }
                } else {
                    if(answerEl.classList.contains(`${ID}-answer--selected`)) {
                        answerEl.classList.remove(`${ID}-answer--selected`);
                    } else {
                        answerEl.classList.add(`${ID}-answer--selected`);

                    }
                }
                
            });
        });
    } else {
        const answerOption = document.querySelectorAll(`.${ID}-innerOptions .${ID}-answer`);
        const nextButton = document.querySelector(`.${ID}-finderBox .${ID}-next`);

        [].forEach.call(answerOption, (answerEl) => {
            answerEl.addEventListener('click', (e) => {

               
                if(e.currentTarget.classList.contains(`${ID}-answer--selected`)) {
                    e.currentTarget.classList.remove(`${ID}-answer--selected`);
        
                // add active, remove any other actives
                } else if(!e.currentTarget.classList.contains(`${ID}-answer--selected`)) {
        
                    for (let index = 0; index < answerOption.length; index += 1) {
                    const element = answerOption[index];
                    element.classList.remove(`${ID}-answer--selected`);
                }
                e.currentTarget.classList.add(`${ID}-answer--selected`);
                nextButton.click();
                  // --- Remove ERROR MESSAGE if option has been selected
                  if (document.querySelector(`.${ID}-error.${ID}-errorShow`)) {
                    document.querySelector(`.${ID}-error.${ID}-errorShow`).classList.remove(`${ID}-errorShow`);
                  }
                }
            });
        });
    }
}


let q1AnswerURL = [];
let q2AnswerURL = [];
let q3AnswerURL  = [];
let q4AnswerURL  = [];
let q1Answer = [];
let q2Answer = [];
let q3Answer  = [];
let q4Answer  = [];


const buildUrl = () => {
  let q3Prefix = '';

  const pricePrefix = 'current_price=';
  // determine prefix for q3 - 
  if(q2AnswerURL[0].indexOf('designer-watches') > -1 || q2AnswerURL[0].indexOf('luxury-watches') > -1 || q2AnswerURL[0].indexOf('watches') > -1) {
   // change structure
    return '/webstore/l/' + 
        ((q3AnswerURL.join('')) || '') // watch type
        + '?' +
        (q1AnswerURL[0] || '') // recipient
        + '&' + 
        (pricePrefix + (q4AnswerURL[0] || '')) + '&finder=1' // price
    ;
  } else {

    return '/webstore/l/' + 
        (q2AnswerURL[0] || '') // product
        + '?' +
        (q1AnswerURL[0] || '') // recipient
        + '&' + 
        ((q3AnswerURL.join('')) || '') // metal or type
        + '&' + 
        (pricePrefix + (q4AnswerURL[0] || '')) + '&finder=1' // price
    ;
  }
};


// url is loaded in target step 5

const loadQuestion = (targetStep) => {

    let path;

    if(getSiteFromHostname() === 'ernestjones') {
        path = paths;
    } else if(getSiteFromHostname() === 'hsamuel') {
        path = HSpaths;
    } 

    const currentQuestion = document.querySelector(`.${ID}-finderOptions .${ID}-question`);
    const questionContainer = document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`);
    const nextButton = document.querySelector(`.${ID}-finderBox .${ID}-next`);
    const backButton = document.querySelector(`.${ID}-finderBox .${ID}-back`);

    currentQuestion.classList.add(`${ID}-animate`);
    setTimeout(() => {
        currentQuestion.classList.remove(`${ID}-animate`);
    }, 500);
   

    nextButton.style.display = 'none';
    nextButton.parentNode.classList.remove(`${ID}-nextShow`);

    if(targetStep == 1) {
        document.querySelector(`.${ID}-options.${ID}-question`).setAttribute('step-no', '1');
        questionContainer.innerHTML = '';
        questionContainer.classList.remove(`${ID}-multipleChoice`);
        questionContainer.classList.remove(`${ID}-centered`);

        q1Answer = [];
        q2Answer = [];
        q3Answer = [];
        q4Answer = [];
        q1AnswerURL = [];
        q2AnswerURL = [];
        q3AnswerURL = [];
        q4AnswerURL = [];

        // rebuild the gender step
        updateQuestionTitle(genderSteps);

        nextButton.textContent = 'Next';


        // build the gender options
        Object.keys(genderSteps.options).forEach((i) => {
            const genderData = genderSteps.options[i];
            const genderOption = document.createElement('div');
            genderOption.classList.add(`${ID}-answer`);
            genderOption.setAttribute('data-result', [i][0]);
            genderOption.setAttribute('data-resultUrl', genderData.url);
            if(getSiteFromHostname() === 'hsamuel') {
                genderOption.innerHTML = `<div class="${ID}-answerImage" style="background-image:url(${genderData.hsimage})"></div><span>${[i][0]}</span>`;
            } else {
                genderOption.innerHTML = `<div class="${ID}-answerImage" style="background-image:url(${genderData.image})"></div><span>${[i][0]}</span>`;
            }
            document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`).appendChild(genderOption);
        });

        nextButton.setAttribute('data-step', 1);

        // hide back button
        backButton.classList.add(`${ID}-backHide`);

        removeAnswersOnBack(1)
        removeAnswersOnBack(2)
        removeAnswersOnBack(3)
        removeAnswersOnBack(4)

    }

    if(targetStep == 2) {
        document.querySelector(`.${ID}-options.${ID}-question`).setAttribute('step-no', '2');
        q2Answer = [];
        q3Answer = [];
        q4Answer = [];
        q2AnswerURL = [];
        q3AnswerURL = [];
        q4AnswerURL = [];

        // clear the inner content
        questionContainer.innerHTML = '';
        questionContainer.classList.remove(`${ID}-multipleChoice`);
        questionContainer.classList.remove(`${ID}-centered`);

        let optionsToShow;

        // render the options based on the gender clicked
        if(q1Answer[0] === 'for him') {
            optionsToShow = productStepsMale;
        } else if(q1Answer[0] === 'for her') {
            optionsToShow = productStepsFemale;
        } else if(q1Answer[0] === 'unisex') {
            optionsToShow = productStepsUnisex;
        }

        updateQuestionTitle(optionsToShow);
        nextButton.textContent = 'Next';

        // show back button
        backButton.classList.remove(`${ID}-backHide`);

        // add the options for the product type
        Object.keys(optionsToShow.options).forEach((i) => {
            const productData = optionsToShow.options[i];
            const productOption = document.createElement('div');
            productOption.classList.add(`${ID}-answer`);
            productOption.setAttribute('data-result', [i][0]);
            productOption.setAttribute('data-resultUrl', productData.url);
            if(getSiteFromHostname() === 'hsamuel') {
                productOption.innerHTML = `<div class="${ID}-answerImage" style="background-image:url(${productData.hsimage})"></div><span>${[i][0]}</span>`;
            } else {
                productOption.innerHTML = `<div class="${ID}-answerImage" style="background-image:url(${productData.image})"></div><span>${[i][0]}</span>`;
            }
            document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`).appendChild(productOption);
        });

        // add the next/back step target to the buttons
        nextButton.setAttribute('data-step', 2);
        backButton.setAttribute('data-step', 1);

        removeAnswersOnBack(2)
        removeAnswersOnBack(3)
        removeAnswersOnBack(4)
        
    }

    if(targetStep == 3) {
        
        document.querySelector(`.${ID}-options.${ID}-question`).setAttribute('step-no', '3');
        q3Answer = [];
        q4Answer = [];
        q3AnswerURL = [];
        q4AnswerURL = [];
        // if there isn't a step 3 go to step 4
        let choices;
        const step3Choices = path[q1Answer[0] + '/' + q2Answer[0]].step3;

        if(!step3Choices) {
            nextButton.setAttribute('data-step', 4);
            backButton.setAttribute('data-step', 2);
            loadQuestion(4);
            return;
        } else {
            choices = path[q1Answer + '/' + q2Answer].step3;
            nextButton.setAttribute('data-step', 3);
            backButton.setAttribute('data-step', 2);
            
        }

        questionContainer.innerHTML = '';

        updateQuestionTitle(choices);
        nextButton.textContent = 'Next';

         // allow multiple choices
         //questionContainer.classList.add(`${ID}-multipleChoice`);

         if(Object.keys(choices.options).length >= 2) {
             questionContainer.classList.add(`${ID}-centered`);
         } else {
             questionContainer.classList.remove(`${ID}-centered`);
         }
         
        
        Object.keys(choices.options).forEach((j) => {

            const specificationData = choices.options[j];
            const specificationOption = document.createElement('div');
            specificationOption.classList.add(`${ID}-answer`);
            specificationOption.setAttribute('data-result', [j][0]);
            specificationOption.setAttribute('data-resultUrl', specificationData.url);
            
                if(getSiteFromHostname() === 'hsamuel') {
                    specificationOption.innerHTML = `<div class="${ID}-answerImage" ${specificationData.image ? `style="background-image:url(${specificationData.hsimage})` : ''}"></div><span>${[j][0]}</span>`;
                } else {
                    specificationOption.innerHTML = `<div class="${ID}-answerImage" ${specificationData.image ? `style="background-image:url(${specificationData.image})` : ''}"></div><span>${[j][0]}</span>`;
                }
            
            document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`).appendChild(specificationOption);
        });

        removeAnswersOnBack(3)
        removeAnswersOnBack(4)
    }

    /*  Product Specs */
    if(targetStep == 4) {
        q4Answer = [];
        q4AnswerURL = [];
   
        questionContainer.innerHTML = '';
        questionContainer.classList.remove(`${ID}-multipleChoice`);
        questionContainer.classList.remove(`${ID}-centered`);

        document.querySelector(`.${ID}-options.${ID}-question`).setAttribute('step-no', '4');

    
        const step4Choices = path[q1Answer[0] + '/' + q2Answer[0]].step4;

        updateQuestionTitle(step4Choices);

        Object.keys(step4Choices.options).forEach((x) => {
            const priceData = step4Choices.options[x];
            const priceOption = document.createElement('div');
            priceOption.classList.add(`${ID}-answer`);
            priceOption.setAttribute('data-result', [x][0]);
            priceOption.setAttribute('data-resultUrl', priceData.url);
            priceOption.innerHTML = `<span>${[x][0]}</span>`;
            document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`).appendChild(priceOption);
        });


        // if choices go back to products, else go to specs
        const step3Choices = path[q1Answer[0] + '/' + q2Answer[0]].step3;
        if(!step3Choices) {
            nextButton.setAttribute('data-step', 4);
            backButton.setAttribute('data-step', 2);
        } else {
            nextButton.setAttribute('data-step', 4);
            backButton.setAttribute('data-step', 3);
        }
        nextButton.textContent = 'Find gifts';
        removeAnswersOnBack(4);
    }

    if(targetStep == 5) {
        const loader = document.querySelector(`.${ID}-loader`);
        loader.classList.add(`${ID}-loaderShow`);

        // build the URL and go to the result page
        setTimeout(() => {
            const targetURL = buildUrl();
            window.location.href = targetURL;
            fireEvent('Completed gift finder');
        }, 1000);
    }
};

const didClickBack = () => {
    const backButton = document.querySelector(`.${ID}-finderBox .${ID}-back`);
    const currentStep = backButton.getAttribute('data-step');
    const backStep = parseInt(currentStep, 10);

    document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`).scrollTop = 0;

    loadQuestion(backStep);
    // remove error message when going 'BACK'
    const errorMessage = document.querySelector(`.${ID}-error`);
    errorMessage.classList.remove(`${ID}-errorShow`);
};

const editQuestion = (stepToGoTo) => {

    loadQuestion(stepToGoTo);

    const errorMessage = document.querySelector(`.${ID}-error`);
    errorMessage.classList.remove(`${ID}-errorShow`);
}

/* Loop through all answers, determines what to do once answers selected based on step */
const didClickNext = () => {
    const questionContainer = document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`);
    const currentQuestion = document.querySelector(`.${ID}-question`);
    const errorMessage = document.querySelector(`.${ID}-error`);
    const nextButton = document.querySelector(`.${ID}-finderBox .${ID}-next`);
    const currentStep = nextButton.getAttribute('data-step');
    const questionTitle = document.querySelector(`.${ID}-optionsTitle`).textContent;

    questionContainer.scrollTop = 0;
    const chosenAnswers = questionContainer.querySelectorAll(`.${ID}-answer--selected`);



   
    if(chosenAnswers.length === 0) {
        errorMessage.classList.add(`${ID}-errorShow`);
        // rerun active options
        activeOptions();

    } else {
        errorMessage.classList.remove(`${ID}-errorShow`);

        [].forEach.call(chosenAnswers, (question) => {
        const answer = question.getAttribute('data-result');
        const answerUrl = question.getAttribute('data-resultUrl');
            /*  Gender step */
            if(currentStep == 1) {
                q1AnswerURL.push(answerUrl);
                q1Answer.push(answer);

                showAnswers(currentStep, q1Answer, 'Recipient:');
            } 
            if(currentStep == 2) {
                q2AnswerURL.push(answerUrl);
                q2Answer.push(answer);

                showAnswers(currentStep, q2Answer, 'Type of gift:');

            }
            if(currentStep == 3) {
                q3AnswerURL.push(answerUrl);
                q3Answer.push(answer);

                if(questionTitle.indexOf('strap') > -1) {
                    showAnswers(currentStep, q3Answer, 'Strap Style:');
                } else {
                    showAnswers(currentStep, q3Answer, 'Metal:');
                }
              
            }
            if(currentStep == 4) {
                q4AnswerURL.push(answerUrl);
                q4Answer.push(answer);

                showAnswers(currentStep, q4Answer, 'Price range:');

            }
            if(currentStep == 3) {
                nextButton.textContent = 'Find gifts';
            } else {
                nextButton.textContent = 'Next';
            }
        });

        const nextStep = parseInt(currentStep, 10) + 1;
        loadQuestion(nextStep);
    }

}

// to be triggered on close of the finder
const resetFinder = () => {
    q1Answer = [];
    q2Answer = [];
    q3Answer = [];
    q4Answer = [];
    q1AnswerURL = [];
    q2AnswerURL = [];
    q3AnswerURL = [];
    q4AnswerURL = [];
    
    const questionContainer = document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`);
    questionContainer.innerHTML = '';
    
    const errorMsg = document.querySelector(`.${ID}-error`);
    // hide back button for first question
    const backButton = document.querySelector(`.${ID}-finderBox .${ID}-back`);
    backButton.classList.add(`${ID}-backHide`);

    errorMsg.classList.remove(`${ID}-errorShow`);
}

const finderFunctionality = () => {
    const overlay = document.querySelector(`.${ID}-finderOverlay`);
    /**
     * Trigger gift finder
     */
    const triggerFinderButton = document.querySelector(`.${ID}-finderBanner .${ID}-button`);
    triggerFinderButton.addEventListener('click', () => {
        document.documentElement.classList.add(`${ID}-noScroll`);

        fireEvent('Clicked gift finder');

        document.querySelector(`.${ID}-finderBox`).classList.add(`${ID}-active`);
        document.querySelector(`.${ID}-finderBanner`).classList.add(`${ID}-hide`);
        overlay.classList.add(`${ID}-active`);

        loadQuestion(1);
        activeOptions();
    });

    /**
     * Next button click
     */
    const nextButton = document.querySelector(`.${ID}-finderBox .${ID}-next`);
    nextButton.addEventListener('click', () => {
        didClickNext();
        activeOptions();
    });

    /**
     * Back button click
     */
    const backButton = document.querySelector(`.${ID}-finderBox .${ID}-back`);
    backButton.addEventListener('click', () => {
        didClickBack();
        activeOptions();
    });

    const closeFinder = document.querySelector(`.${ID}-closeFinder`);
    closeFinder.addEventListener('click', () => {
        document.querySelector(`.${ID}-finderBox`).classList.remove(`${ID}-active`);
            document.querySelector(`.${ID}-finderBanner`).classList.remove(`${ID}-hide`);
            overlay.classList.remove(`${ID}-active`);
            resetFinder();
            document.documentElement.classList.remove(`${ID}-noScroll`);
    });

    // click answered already chosen
    const selectedAnswers = document.querySelectorAll(`.${ID}-chosenOptions .${ID}-answer`);
    for (let index = 0; index < selectedAnswers.length; index += 1) {
        const element = selectedAnswers[index];
        element.addEventListener('click', (e) => {
            const stepNo = e.currentTarget.getAttribute('step-no');
            const parsedStep = parseInt(stepNo, 10);
            editQuestion(parsedStep);
            activeOptions();

            fireEvent('Edited Gift Finder Answer');
        });
    }


    if(overlay) {
        overlay.addEventListener('click', () => {
            document.querySelector(`.${ID}-finderBox`).classList.remove(`${ID}-active`);
            document.querySelector(`.${ID}-finderBanner`).classList.remove(`${ID}-hide`);
            overlay.classList.remove(`${ID}-active`);
            resetFinder();
            document.documentElement.classList.remove(`${ID}-noScroll`);
        });
    }

}

export default finderFunctionality;