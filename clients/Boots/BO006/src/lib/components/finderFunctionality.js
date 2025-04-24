import shared from "../shared"
import { journeyData, getStepData } from "./finderData";
import priceSlider from '../priceSlider';

export default () => {
    const { ID } = shared;

    /**
     * Global :'( state reference for keeping track
     */
    const state = {
      answers: [],
      curStep: 0,
    };

    /**
     * Helper - load incoming step template
     */
    const loadStep = () => {
      return new Promise((res, rej) => {
        const stepData = getStepData(state);
        let stepToLoad = stepData[state.curStep];

        while(stepToLoad.skip) {
          // Ability to skip
          state.curStep = state.curStep + 1;

          state.answers.push(stepToLoad.skipValue);

          stepToLoad = stepData[state.curStep];
        }

        let template = `<div class="${ID}-question ${ID}-question--${stepToLoad.id} ${ID}-question--in">`;
        template += `<h2 class="${ID}-question__title">${stepToLoad.getTitle()}</h2>`;
          template += `<div class="${ID}-question__answers">`;

          if(stepToLoad.type == 'single') {
            // -------------------------------
            // Single answer question type
            // -------------------------------
            const options = stepToLoad.getOptions();
            for(let i = 0, ii = options.length; i < ii; i += 1) {
              const opt = options[i];
              template += `<span data-isanswer="1" class="${ID}-question__answer" data-id="${opt.id}" data-value="${opt.value}">`;

              if(opt.image) {
                template += `<div class="${ID}-question__answer-image" style="background-image:url(${opt.image})"></div>`;
              }

              template += `<strong>${opt.friendlyText}</strong>`;
              template += `</span>`;
            }
          } else if(stepToLoad.type == 'range') {
            // -------------------------------
            // Show price slider
            // -------------------------------
            const options = stepToLoad.getOptions();

            template += `<input type="hidden" data-multianswer name="${ID}-min" value="${options[0].value}">`;
            template += `<input type="hidden" data-multianswer name="${ID}-max" value="${options[1].value}">`;

            template += `<div class="${ID}-price-slider"></div>`;

          } else if(stepToLoad.type == 'completer') {
            // -------------------------------
            // Redirect to final page based on journey
            // -------------------------------
            template += '';

            starsWrap.classList.remove(`${ID}--active`);
            starsWrap.classList.add(`${ID}--active`);
            starsWrap.classList.add(`${ID}--infinite`);

            let resultUrl = journeyData[state.answers[0]][state.answers[1]].url + `#${ID}-intermediate=`;

            if(state.answers[2] && state.answers[2].match('|||')) {
              // -----------------------
              // Taking into account pricing or other order filters
              // -----------------------
              const prices = state.answers[2].split('|||');

              if(prices[1]) {
                const price1 = prices[0] || 0;
                const price2 = prices[1] == 200 ? 9999 : prices[1];

                resultUrl += encodeURIComponent(`facet:&productBeginIndex:0&orderBy:&pageView:grid&minPrice:${price1}&maxPrice:${price2}&pageSize:&${ID}-giftfinder`);
              }
            }

            setTimeout(() => window.location.href = resultUrl, 1000);
          }

          // -------------------------------
          // Show a next button if given
          // -------------------------------
          if(stepToLoad.nextButton || stepToLoad.hasBackButton) {
            template += `
              <div class="${ID}-actions">
                ${
                  stepToLoad.nextButton ? 
                    (`<a class="button primary ${ID}-actions__next ${
                      stepToLoad.type == 'completer' ? `${ID}-actions__completer` : ''
                    }">${stepToLoad.nextButton}</a>`) : ''
                }
                ${
                  stepToLoad.hasBackButton ? 
                    (`<a class="${ID}-actions__back">‹ Back</a>`) : ''
                }
              </div>
            `;
          }

          template += '</div>';
        template += '</div>';

        res(template);
      });
    };

    /**
     * Helper go to next step based on state settings
     */
    const goToNextStepBasedOnState = () => {
      loadStep()
        .then(renderStep)
        .then(() => {
          // All done so move curStep along...
          state.curStep = state.curStep + 1;
        });
    };

    /**
     * Helper - render a step from a template, removing previous questions
     */
    const renderStep = (template) => {
      return new Promise((res, rej) => {
        const container = document.querySelector(`.${ID}_finderQuestions`);
        if(container) {
          const currentQuestion = container.querySelector(`.${ID}-question`);
          if(currentQuestion) {
            currentQuestion.classList.add(`${ID}-question--out`);

            setTimeout(() => {
              currentQuestion.parentNode.removeChild(currentQuestion);
            }, 400);
          }

          container.insertAdjacentHTML('beforeend', template);

          // If price slider needs init'ing
          const slider = container.querySelector(`.${ID}-price-slider`);
          if(slider && !slider.noUiSlider) {
            const min = container.querySelector(`[name="${ID}-min"]`); 
            const max = container.querySelector(`[name="${ID}-max"]`); 

            if(min && max) {
              priceSlider().init(slider, min.value, max.value, min, max);
            }
          }
        }

        res();
      });
    };

    // Init 
    const startFinder = document.querySelector(`.${ID}_finderStart`);
    const starsWrap = document.querySelector(`.${ID}-stars-wrap`);
    if(startFinder) {
      startFinder.addEventListener('click', () => {
        if(starsWrap) {
          starsWrap.classList.add(`${ID}--active`);
        }

        // ----------------------------
        // Event listeners
        // For interactions within the finder
        // ----------------------------
        const finderWrap = document.querySelector(`.${ID}_giftFinder-wrapper`);
        if(finderWrap) {
          finderWrap.addEventListener('click', (e) => {
            const $question = $(e.target).closest(`.${ID}-question`);
            const $answer = $(e.target).closest(`[data-isanswer="1"]`);

            // ----------------------------
            // Handle questions for where it has a step button
            // ----------------------------
            if(e.target.classList.contains(`${ID}-actions__next`)) {
              const nextButton = e.target;
              
              const answers = document.querySelectorAll('[data-multianswer]');
              const answersArray = [].slice.call(answers).map((a) => a.value);

              const answerString = answersArray.join('|||'); // so we can split on triple pipe when analysing

              state.answers.push(answerString);

              goToNextStepBasedOnState();
            }

            // ----------------------------
            // Handle back button pressed
            // ----------------------------
            if(e.target.classList.contains(`${ID}-actions__back`)) {
              // Remove the last answer given 
              // and move 'current step back 1'
              state.answers.pop();
              state.curStep = state.curStep - 2;

              goToNextStepBasedOnState();
            }

            // ----------------------------
            // Handle questions for single question types
            // ----------------------------
            if($question.length && $answer.length) {
              $answer.addClass(`${ID}--active`);

              const id = $answer[0].dataset.id;
              const val = $answer[0].dataset.value;

              state.answers.push(val);

              goToNextStepBasedOnState();
            }
            
          });
        }

        // ----------------------------
        // Load the first step and render it
        // ----------------------------
        setTimeout(() => {
          loadStep()
            .then(renderStep)
            .then(() => {
              // All done so move curStep along...
              state.curStep = state.curStep + 1;

              // Load the price slider so that it's ready for later
              priceSlider().loadScript();
            });
        }, 200);
      });
    }
}
