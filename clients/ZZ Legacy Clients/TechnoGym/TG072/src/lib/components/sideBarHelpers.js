import settings from '../settings';
import { getState, clearState, deleteBackwardsStateEntry } from './state';
import { __ } from '../helpers';

// if mobile, if desktop
export const buildSidebarMarkup = () => {
  const allQuestion = document.querySelector(`.${settings.ID}_productFinder__content`);
  const sideBar = document.createElement('div');
  sideBar.classList.add(`${settings.ID}-sideBar`);
  // build siderbar markup
  if (window.innerWidth < 767) {
    // create the sidebar
    sideBar.innerHTML = `<span>You have selected:</span><div class="${settings.ID}-selections"></div>`;
    allQuestion.insertBefore(sideBar, allQuestion.firstChild);
  } else {
    sideBar.innerHTML = `
    <span>${__('PRODUCT FINDER')}</span>
    <div class="${settings.ID}-selections"></div>`;
    allQuestion.insertBefore(sideBar, allQuestion.firstChild);
  }
};

export const sideBarEvents = () => {
  // On back click
  const sideBarOptions = document.querySelectorAll(`.${settings.ID}-selected_option`);
  for (let index = 0; index < sideBarOptions.length; index += 1) {
    const element = sideBarOptions[index];
    element.addEventListener('click', () => {
      const selectedTarget = element.getAttribute('question-target');
      const questionToGoTo = document.querySelector(`#${selectedTarget}`);

      // hide the current active question
      questionToGoTo.classList.add(`${settings.ID}-question_active`);
      element.parentNode.parentNode.classList.remove(`${settings.ID}-question_active`);

      if (selectedTarget === `${settings.ID}-q1`) {
        clearState();
      } else {
        deleteBackwardsStateEntry(selectedTarget);
      }

      rebuildSidebar();
    });
  }
};

/**
 * @desc Add the previous selections to the sidebar
 */
export const rebuildSidebar = () => {
  // add sidebar markup here
  const selected = getState();
  const optionsWrappers = document.querySelector(`.${settings.ID}-sideBar .${settings.ID}-selections`);

  optionsWrappers.innerHTML = '';

  Object.keys(selected).forEach((i) => {
    const data = selected[i];
    const question = [i][0];
    const selectedOption = document.createElement('div');
    selectedOption.classList.add(`${settings.ID}-selected_option`);
    selectedOption.innerHTML = `<span class="${settings.ID}-selected-circle"></span><p>${data}</p>`;
    selectedOption.setAttribute('question-target', question);

    // add the selected options to the side bar on each option click
    optionsWrappers.appendChild(selectedOption);
  });
  sideBarEvents();
};

