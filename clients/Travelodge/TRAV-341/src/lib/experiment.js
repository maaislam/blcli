/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import fakeProceed from './components/fakeProceed';
import skipButton from './components/skipButton';

const { ID, VARIATION } = shared;

const secondStepContentShow = () => {
  const modalContentWrapper = document.querySelector('#extraModelContent');
  if (modalContentWrapper.closest('#extraModal').classList.contains(`${ID}__first-step`)) {
    modalContentWrapper.closest('#extraModal').classList.remove(`${ID}__first-step`);
  }

  modalContentWrapper.closest('#extraModal').classList.add(`${ID}__second-step`);
};

const init = () => {
  const modalContentWrapper = document.querySelector('#extraModelContent');
  modalContentWrapper.closest('#extraModal').classList.add(`${ID}__first-step`);
  const controlSkipButton = modalContentWrapper.querySelector('#extras-choice-skip');
  const controlProceedButton = modalContentWrapper.querySelector('#extras-choice-submit');
  const choiceBoxes = modalContentWrapper.querySelectorAll('.extras-choice-box');
  choiceBoxes.forEach((item) => {
    const boxImage = item.querySelector('img');
    const dinnerItem = item.querySelector('.extra-icon-dinner');
    if ((boxImage && boxImage.src) || dinnerItem) {
      item.classList.add(`${ID}__firstStepContent`);
    } else {
      item.classList.add(`${ID}__secondStepContent`);
    }
  });

  // remove skip button
  if (document.querySelector(`.${ID}__extras-choice-button-skip`)) {
    document.querySelector(`.${ID}__extras-choice-button-skip`).remove();
  }

  //remove extra proceed button
  if (document.querySelector(`.${ID}__extras-choice-summary-button`)) {
    document.querySelector(`.${ID}__extras-choice-summary-button`).remove();
  }

  if (modalContentWrapper.closest('#extraModal').classList.contains(`${ID}__first-step`)) {
    controlSkipButton.insertAdjacentHTML('beforebegin', skipButton(ID));
    controlProceedButton.insertAdjacentHTML('beforebegin', fakeProceed(ID));
  }
};

export default () => {
  setup();

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest('#addExtraSubmit') || target.closest('#addExtraMobile')) {
      pollerLite(['#extraModal.show'], () => {
        fireEvent('Conditions Met');
        if (VARIATION === '1') {
          init();
        }
      });
    } else if (target.closest(`.${ID}__extras-choice-summary-button`)) {
      const clickedItem = target.closest(`.${ID}__extras-choice-summary-button`);
      clickedItem.classList.add('loading');
      setTimeout(() => {
        secondStepContentShow();
      }, 1200);
    } else if (target.closest(`.${ID}__extras-choice-button-skip`)) {
      secondStepContentShow();
    } else if (target.closest('.extras-add-button') && target.closest(`.${ID}__first-step`)) {
      const clickedItem = target.closest('.extras-add-button');
      setTimeout(() => {
        pollerLite([() => clickedItem, () => clickedItem?.dataset?.state], () => {
          const mainWrapper = document.querySelector(`.${ID}__first-step`);
          const allButtons = mainWrapper.querySelectorAll(`.${ID}__firstStepContent button.extras-add-button`);
          const isShowRemoveButton = Array.from(allButtons).filter((item) => item.dataset.state === '1');
          const fakeSkipButton = document.querySelector(`.${ID}__extras-choice-button-skip`);

          if (isShowRemoveButton && isShowRemoveButton.length > 0) {
            fakeSkipButton.style.display = 'none';
          } else {
            fakeSkipButton.removeAttribute('style');
          }
        });
      }, 1000);
    } else if (target.closest('.extras-add-button') && target.closest(`.${ID}__second-step`)) {
      document.querySelector(`.${ID}__extras-choice-button-skip`)?.remove();
      document.querySelector(`.${ID}__extras-choice-summary-button`)?.remove();
      pollerLite(['#extras-choice-skip'], () => {
        const allButtons = document.querySelectorAll(`.${ID}__secondStepContent button`);
        const isAdded = Array.from(allButtons).filter((item) => item.textContent.toLocaleLowerCase() === 'remove');
        if (isAdded && isAdded.length) {
          document.querySelector('#extras-choice-skip').classList.add('hidden-skip-button');
        } else {
          document.querySelector('#extras-choice-skip').classList.remove('hidden-skip-button');
        }
      });
    }
  });

  if (VARIATION == 'control') {
    return;
  }
};
