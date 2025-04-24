/**
 * ME311 - Christmas Jumper Quiz
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { generateQuizStepContent, optionSelect, closeLightbox } from './helpers';
import data from './data';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  let device = '';
  if (window.innerWidth > 767) {
    device = 'desktop';
  } else {
    device = 'mobile';
  }

  const quizLightbox = `<div class="${ID}-quiz-lightbox__wrapper">
    <div class="${ID}-quiz-lightbox__overlay"></div>
    <div class="${ID}-quiz-lightbox__container step-1" data-step="1">
      <div class="${ID}-close-icon"></div>
      <div class="${ID}-jumper-bg"></div>
      <div class="${ID}-content">
        <h3>FIND YOUR CHRISTMAS JUMPER</h3>
        <p>From Harry Potter to Star Wars, our quiz will help you find your perfect officially licensed christmas jumper.</p>
        <button class="action primary">Get Started</button>
      </div>
    </div>
  </div>`;

  document.querySelector('body').insertAdjacentHTML('afterbegin', quizLightbox);
  document.querySelector('body').classList.add(`${ID}-noScroll`);

  closeLightbox(document.querySelector(`.${ID}-close-icon`));
  // --- Overlay click
  const overlayBg = document.querySelector(`.${ID}-quiz-lightbox__overlay`);
  closeLightbox(overlayBg);

  // --- Proceed to STEP 2
  const getStartedCTA = document.querySelector(`.${ID}-quiz-lightbox__container.step-1 button`);
  const quizContainer = document.querySelector(`.${ID}-quiz-lightbox__container`);
  getStartedCTA.addEventListener('click', (e) => {
    quizContainer.classList.remove('step-1');
    quizContainer.classList.add('step-2');
    quizContainer.setAttribute('data-step', '2');

    document.querySelector(`.${ID}-quiz-lightbox__container`).classList.add('scale-in-center');

    quizContainer.innerHTML = `<div class="${ID}-close-icon"></div>
    <div class="${ID}-steps__wrapper">
      <div>1/4</div>
      <ul class="${ID}-steps">
        <li class="active"></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="${ID}-content">
      ${generateQuizStepContent(2)}
    </div>`;
    
    optionSelect(quizContainer);
  });
};
