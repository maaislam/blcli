/**
 * ME335 - PDP Questions
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

    const usps = document.querySelector('.merchoid-product-reasons');
    const newFaqBlock = `
    <div class="${ID}-faq__wrapper">
      <div class="${ID}-faq-top">
        <div class="${ID}-header">
          <h2>Ask A Question</h2>
          <p>Ask us anything you want to know about this product and we'll update the page when we have the answer!</p>
        </div>
        <div class="${ID}-question__submit">
          <input type="text" placeholder="Ask your question here...">
          <button type="submit" title="Submit Question" class="action primary inactive" id="${ID}-submit-question">
            <span>Ask Question</span>
            <span class="${ID}-loader hidden"></span>
          </button>
        </div>
        <p id="${ID}-success">Thanks for your question! Our team will review this question and provide an answer shortly.</p>
      </div>
      <div class="${ID}-faqs">
        <h3>Frequently asked questions</h3>
        <ul class="${ID}-faq__container"></ul>
      </div>
    </div>`;
      usps.insertAdjacentHTML('beforebegin', newFaqBlock);

    document.querySelector(`.${ID}-question__submit button`).addEventListener('click', (e) => {
      document.querySelector(`.${ID}-loader`).classList.remove('hidden');
      submitForm();
    });

    // --- Input Field Typing
    let typingTimer; 
    let doneTypingInterval = 200;  
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
        newContent += `<li class="question"><h4>${item['q']}</h4><div class="${ID}-content">${item['a']}</div></li>`;
      }
      document.querySelector(`ul.${ID}-faq__container`).innerHTML = newContent;
    } 

    

    const allQuestions = document.querySelectorAll(`.${ID}-faq__container .question`);
    [].forEach.call(allQuestions, (q) => {
      q.addEventListener('click', () => {
        if (!q.classList.contains('show') && document.querySelector(`.${ID}-faq__container li.show`)) {
          document.querySelector(`.${ID}-faq__container li.show`).classList.remove('show');
        }
        q.classList.toggle('show');
      });
    });
  
  
};
