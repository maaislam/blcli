/**
 * ME305 FAQ PDP - mobile only
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.merchoid.com/uk/wallace-and-gromit-a-grand-night-in-gromit-shaped-mug/
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import faq from './faq_data';

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
  const prodDetailsAccordion = document.querySelector('.page-wrapper .product-secondary-tabs-wrapper');
  let newFaqBlock;
  if (VARIATION == '1') {
    newFaqBlock = `<div class="${ID}-faq__wrapper">
      <h3>Looking for answer? Look no further...</h3>
      <ul class="${ID}-faq__container"></ul>
    </div>`;
  } else if (VARIATION == '2') {
    newFaqBlock = `<div class="${ID}-faq__wrapper v${VARIATION}">
      <h3>Looking for answer? Look no further...</h3>
      <div class="${ID}-faq__container">
        <div class="tabs"></div>
        <div class="tabContent"></div>
      </div>
    </div>`;
  }
  prodDetailsAccordion.insertAdjacentHTML('afterend', newFaqBlock);

  let newContent = '';

  if (VARIATION == '1') {
    for (let i = 0; i < Object.keys(faq).length; i += 1) {
      let item = faq[i];
      newContent += `<li class="question"><h3>${item['q']}</h3><div class="${ID}-content">${item['a']}</div></li>`;
    }
    document.querySelector(`ul.${ID}-faq__container`).innerHTML = newContent;
  } else if (VARIATION == '2') {
    let questions = '';
    let answers = '';
    let progressBar = '';
    for (let i = 0; i < Object.keys(faq).length; i += 1) {
      let item = faq[i];
      
      questions += `<div class="tab question" data-target="tab-${i}"><p>${item['q']}</p></div>`;
      answers += `<div class="tab-${i}">${item['a']}</div>`;
    }
    document.querySelector(`div.${ID}-faq__container .tabs`).insertAdjacentHTML('afterbegin', questions);
    document.querySelector(`div.${ID}-faq__container .tabContent`).insertAdjacentHTML('afterbegin', answers);

    document.querySelector(`div.${ID}-faq__container .tabs .tab[data-target="tab-0"]`).classList.add('active');
    document.querySelector(`div.${ID}-faq__container .tabContent .tab-0`).classList.add('active');

  }

  

  const allQuestions = document.querySelectorAll(`.${ID}-faq__container .question`);
  [].forEach.call(allQuestions, (q) => {
    q.addEventListener('touchend', (e) => {
      if (VARIATION == '1') {
        if (!q.classList.contains('show') && document.querySelector(`.${ID}-faq__container li.show`)) {
          document.querySelector(`.${ID}-faq__container li.show`).classList.remove('show');
        }
        q.classList.toggle('show');
      } else if (VARIATION == '2') {
        if (!q.classList.contains('active') && document.querySelector(`.${ID}-faq__container .question.active`)) {
          const tabId = q.getAttribute('data-target');
          document.querySelector(`.${ID}-faq__container .question.active`).classList.remove('active');
          q.classList.add('active');
          // q.scrollIntoView({behavior: "smooth", inline: "center"});

          document.querySelector(`div.${ID}-faq__container .tabContent div.active`).classList.remove('active');
          document.querySelector(`div.${ID}-faq__container .tabContent div.${tabId}`).classList.add('active');
        }
      }
      
    });
  });

};
