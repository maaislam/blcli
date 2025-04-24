/**
 * @desc Store the answers of what is clicked and add to sidebar
 */

import settings from '../settings';
import { setState, getState } from './state';
// import goBackToQuestion from './goBackToQuestion';
import { rebuildSidebar } from './sideBarHelpers';
import { showLoader } from './formSubmit';
// import { getState, setState, loadStateFromLocalStorage, clearState } from './state';

export default () => {
  /**
   * @desc Go to the next question when option is clicked
   */
  const makeQuestionsActive = () => {
    const productQuestions = document.querySelectorAll(`.${settings.ID}-question .${settings.ID}-circle_option`);
    for (let index = 0; index < productQuestions.length; index += 1) {
      const element = productQuestions[index];
      element.addEventListener('click', () => {
        const elementName = element.querySelector('span').textContent;
        const questionID = element.parentNode.parentNode.parentNode;

        setState(questionID.id, elementName);

        // if home is chosen and on question 3
        const question1Answer = getState(`${settings.ID}-q1`);
        if (question1Answer === 'HOME' || question1Answer === 'CASA') {
          document.querySelector('.TG072-question_three .TG072-circle_option:last-child').style.display = 'none';
        } else {
          // document.querySelector('.TG072-question_three .TG072-circle_option:last-child').style.display = 'inline-block';
        }
        if ((question1Answer === 'HOME'|| question1Answer === 'CASA') && (questionID.dataset.lasthomequestion === 'true')) {
          showLoader();
          // if business is chosen and on question 4
        } else if (question1Answer === 'Business' && questionID.dataset.lasthomequestion === 'true') {
          showLoader();
        } else {
          questionID.classList.remove(`${settings.ID}-question_active`);
          questionID.nextElementSibling.classList.add(`${settings.ID}-question_active`);
        }
        /* else if (question1Answer === 'Business' && questionID.dataset.lastbusinessquestion === 'true') {
          showLoader();
        } */
         

        rebuildSidebar();
      });
    }
  };

  makeQuestionsActive();
};
