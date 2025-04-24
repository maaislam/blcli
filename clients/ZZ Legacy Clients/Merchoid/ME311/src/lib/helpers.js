import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';
import data from './data';
import quiz from './quiz_data';
import results from './quiz_results';

const { ID, VARIATION } = shared;


export const generateQuizStepContent = (step) => {
  let stepQuestion = data[`${step}`].q;
  let stepOptions = data[`${step}`].a;
  let options = '';
  for (let key in stepOptions) {
    if (stepOptions.hasOwnProperty(key)) {
        options += `<li class="option" data-id="${key}">${stepOptions[key]}</li>`;
    }
  }

  const content = `<h3>${stepQuestion}</h3>
  <ul>${options}</ul>`;

  return content;
}

export const getQuizResults = () => {
  let jumperUrl = results[`${quiz.answers}`];

  window.location.href = jumperUrl;
}

export const getSteps = (step) => {
  const allSteps = document.querySelectorAll(`ul.${ID}-steps li`);

  for (let i = 0; i < step; i += 1) {
    let step = allSteps[i];
    step.classList.add('active');
  }
}

export const proceedToNextStep = (quizContainer, step, nextStep) => {
  if (step < 5) {
    quizContainer.classList.remove(`step-${step}`);
    quizContainer.classList.add(`step-${nextStep}`);
    quizContainer.setAttribute('data-step', `${nextStep}`);

    quizContainer.innerHTML = `<div class="${ID}-close-icon"></div>
    <div class="${ID}-steps__wrapper">
      <div>${step}/4</div>
      <ul class="${ID}-steps">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="${ID}-content bounce-in-right">
      ${generateQuizStepContent(nextStep)}
    </div>`;

    getSteps(step);
    closeLightbox(document.querySelector(`.${ID}-close-icon`));
    optionSelect(quizContainer);
  } else if (step == 5) {
    // --- Show loader and redirect
    document.querySelector(`.${ID}-quiz-lightbox__container`).outerHTML = `<div class="${ID}-loader"></div>`;

    getQuizResults();

    localStorage.setItem(`${ID}-quiz-has-run`, true);
  }
}

export const optionSelect = (container) => {
  const allOptions = container.querySelectorAll(`.${ID}-content ul li`);
  let stepID = container.getAttribute('data-step');
  stepID = parseInt(stepID);
  let nextStep = stepID + 1;

  [].forEach.call(allOptions, (option) => {
    option.addEventListener('click', (e) => {
      let optionSelected = option.getAttribute('data-id');
      quiz.answers += `${optionSelected}`;

      proceedToNextStep(container, stepID, nextStep);
    });
  });
}

export const closeLightbox = (el) => {
  const quizEl = document.querySelector(`.${ID}-quiz-lightbox__wrapper`);
  el.addEventListener('click', (e) => {
    quizEl.classList.add('fade-out');

    setTimeout(() => {
      document.querySelector('body').classList.remove(`${ID}-noScroll`);
      quizEl.parentElement.removeChild(quizEl);

      localStorage.setItem(`${ID}-quiz-has-run`, true);
    }, 600);
  });
}