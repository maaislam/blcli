/**
 * ME310 - PDP Questions
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import faq from './faq_data';
import { validQuestion, submitForm, showSuccess } from './helpers';

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
  window.addEventListener('load', function () { 
  setTimeout(() => {
    const prodDetailsAccordion = document.querySelector('.page-wrapper .product-secondary-tabs-wrapper');
    let newFaqBlock;
    if (VARIATION == '1') {
      newFaqBlock = `<div class="${ID}-faq__wrapper">
        <div class="${ID}-header">
          <h3>Riddle me this</h3>
          <p>Find the answers to your questions...</p>
        </div>
        <div class="${ID}-question__submit">
          <input type="text" placeholder="Submit your question here...">
          <button type="submit" title="Submit Question" class="action primary inactive" id="${ID}-submit-question">
            <span>Submit Question</span>
            <span class="${ID}-loader hidden"></span>
          </button>
          <div>
            <p id="${ID}-success">Thanks for your question! Our team will review this question and provide an answer shortly.</p>
          </div>
        </div>
        <h3>Looking for these answers?</br>If not, ask another one!</h3>
        <ul class="${ID}-faq__container"></ul>
      </div>`;
    } 
    prodDetailsAccordion.insertAdjacentHTML('afterend', newFaqBlock);

    document.querySelector(`.${ID}-question__submit button`).addEventListener('click', (e) => {
      document.querySelector(`.${ID}-loader`).classList.remove('hidden');
      submitForm();
    });

    // --- Input Field Typing
    let typingTimer; 
    let doneTypingInterval = 500;  
    let qInput = document.querySelector(`.${ID}-question__submit input`);

    //on keyup, start the countdown
    qInput.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        if (qInput.value) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval);  
        }
    });

    //user is "finished typing," do something
    function doneTyping () {
        validQuestion();
    }
    // --- End of Input Field Typing functions
    
    // --- MERCHOID QUESTIONS
    let newContent = '';

    if (VARIATION == '1') {
      for (let i = 0; i < Object.keys(faq).length; i += 1) {
        let item = faq[i];
        newContent += `<li class="question"><h3>${item['q']}</h3><div class="${ID}-content">${item['a']}</div></li>`;
      }
      document.querySelector(`ul.${ID}-faq__container`).innerHTML = newContent;
    } 

    

    const allQuestions = document.querySelectorAll(`.${ID}-faq__container .question`);
    [].forEach.call(allQuestions, (q) => {
      q.addEventListener('click', (e) => {
        if (VARIATION == '1') {
          if (!q.classList.contains('show') && document.querySelector(`.${ID}-faq__container li.show`)) {
            document.querySelector(`.${ID}-faq__container li.show`).classList.remove('show');
          }
          q.classList.toggle('show');
        } 
        
      });
    });
  }, 1500);
  });
  
};
