import {
  setStorage,
  getStorage,
  defaultStorage,
} from './local-storage.function';
import { fireEvent } from '../../../../../core-files/services';

/**
 * Map step to label used in the events
 * @param {number} step
 * @param {'FOR MYSELF' | 'FOR SOMEONE ELSE'} target
 * @returns {string}
 */
export const mapStepToEventLabel = (step, target) => {
  switch (step) {
    case 0:
      return 'Discover Your Perfect Scent';
    case 1:
      return 'Are you shopping for yourself or someone else?';
    case 2:
      return `What fragrances do ${
        target === 'FOR MYSELF' ? 'you' : 'they'
      } like wearing?`;
    case 3:
      return `What type of scent do ${
        target === 'FOR MYSELF' ? 'you' : 'they'
      } like wearing?`;
    case 4:
      return 'How much would you like to spend?';
    case 5:
      return 'Your Top Matches';
    default:
      return 'Unknown step.';
  }
};

/**
 * On modal option click. Change the step info string and activeStep++.
 * @param {1 | 2 | 3 | 4 | 5} currentStep
 * @param {string} option
 * @returns {void}
 */
export const onOptionClick = (currentStep, option) => () => {
  const storage = getStorage();

  setStorage({
    ...storage,
    steps: {
      ...storage.steps,
      [currentStep]: option,
    },
    activeStep: currentStep === 5 ? currentStep : currentStep + 1,
    isFinderOpen: true,
  });

  fireEvent(
    `Fragrance Finder - step: ${currentStep} (${mapStepToEventLabel(
      currentStep,
      storage.steps[1]
    )}) - user selected: ${option}.`
  );
};

/**
 * On modal retake quiz click - reset the local storage
 * @returns {void}
 */
export const onRetakeQuizClick = () => {
  setStorage({ ...defaultStorage, isFinderOpen: true });
  console.log("I'm getting clicked, why........");
  if(VARIATION == 2) {
    window.location.reload();
  }

  fireEvent(
    `Fragrance Finder - step: 5 (${mapStepToEventLabel(
      5
    )}) - user clicked: RETAKE QUIZ.`
  );
};
