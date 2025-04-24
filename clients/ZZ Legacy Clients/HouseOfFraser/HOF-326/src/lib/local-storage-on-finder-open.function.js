import shared from '../../../../../core-files/shared';
import { getStorage } from './local-storage.function';

const { ID, VARIATION } = shared;

/**
 * Hide all steps above
 * @param {number[]} stepsArray
 */
const hideAllAbove = (stepsArray) => {
  for (const step of stepsArray) {
    const currentModalElement = document.querySelector(
      `.${ID}-modal-step-${step}`
    );

    if (currentModalElement.classList.contains(`${ID}-modal__open`)) {
      currentModalElement.classList.remove(`${ID}-modal__open`);
    }
  }
};

export const localStorageOnFinderOpen = () => {
  const storage = getStorage();

  // Scroll to top (mostly for desktop)
  window?.screen?.width >= 1024 && window.scrollTo(0, 0);

  // Add margin to the footer
  if (
    !document
      .querySelector('.FooterWrap')
      .classList.contains('footer-margin-top')
  )
    document.querySelector('.FooterWrap').classList.add('footer-margin-top');

  // Open current and all previous steps (smooth animations)
  const stepsToHideOn0 = [1, 2, 3, 4, 5];
  const stepsToHideOn1 = [2, 3, 4, 5];
  const stepsToHideOn2 = [3, 4, 5];
  const stepsToHideOn3 = [4, 5];
  const stepsToHideOn4 = [5];

  let localStep = storage.activeStep;

  while (localStep !== -1) {
    const currentModalElement = document.querySelector(
      `.${ID}-modal-step-${localStep}`
    );

    if (!currentModalElement.classList.contains(`${ID}-modal__open`)) {
      currentModalElement.classList.add(`${ID}-modal__open`);
    }

    localStep = localStep - 1;
  }

  // Just to make sure that everything above activeStep is hidden
  switch (storage.activeStep) {
    case 0:
      hideAllAbove(stepsToHideOn0);
    case 1:
      hideAllAbove(stepsToHideOn1);
    case 2:
      hideAllAbove(stepsToHideOn2);
    case 3:
      hideAllAbove(stepsToHideOn3);
    case 4:
      hideAllAbove(stepsToHideOn4);
  }

  // // Remove all elements above footer (for the desktop design)
  // for (const element of document.querySelector('.mp-scroller-inner').children) {
  //   if (!element?.classList?.contains?.('FooterWrap')) {
  //     element.classList.add(`hidden-desktop-only`);
  //   }
  // }
};
