/**
 * @desc Product finder question markup
 */

import Productfinder from './productFinderMarkup';
import settings from '../settings';
import storeAnswers from './storeAnswers';
import { buildSidebarMarkup } from './sideBarHelpers';
import { __ } from '../helpers';

export default () => {
  /* Create the product finder */
  const productFinder = new Productfinder(settings.ID, {
    content: `
    <div class="${settings.ID}-intro ${settings.ID}-intro_show">
      <div class="${settings.ID}-left_half">
      </div>
      <div class="${settings.ID}-right_half">
        <div class="${settings.ID}-title_text">
          <h3>${__('Which equipment suits your needs best?')}</h3>
          <div class="${settings.ID}_button ${settings.ID}-finder_button"><span class="${settings.ID}-startText">${__('FIND OUT NOW')}</span></div>
        </div>
      </div>
    </div>
    <div class="${settings.ID}-question ${settings.ID}-question_one" id="${settings.ID}-q1"></div>
    <div class="${settings.ID}-question ${settings.ID}-question_two" id="${settings.ID}-q2"></div>
    <div class="${settings.ID}-question ${settings.ID}-question_three" data-lasthomequestion="true" id="${settings.ID}-q3"></div>
    <div class="${settings.ID}-question ${settings.ID}-question_four" data-lastbusinessquestion="true" id="${settings.ID}-q4"></div>`,
  });

  const nextButton = document.querySelector(`.${settings.ID}_button.${settings.ID}-finder_button`);
  const intro = document.querySelector(`.${settings.ID}-intro`);
  const questionOne = document.querySelector(`.${settings.ID}-question_one`);
  nextButton.addEventListener('click', () => {
    intro.classList.remove(`${settings.ID}-intro_show`);
    questionOne.classList.add(`${settings.ID}-question_active`);
    // start to store the answers
    storeAnswers();
    buildSidebarMarkup();
  });
};
