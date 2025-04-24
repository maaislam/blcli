import shared from '../../../../../core-files/shared';
import { getStorage } from './local-storage.function';
import { fireEvent } from '../../../../../core-files/services';

const { ID, VARIATION } = shared;

export const localStorageOnFinderClose = () => {
  const storage = getStorage();

  const calculatingResultsElement = document.querySelector(
    '.modal__calculating-results'
  );

  // Remove margin from the footer
  if (
    document
      .querySelector('.FooterWrap')
      .classList.contains('footer-margin-top')
  )
    document.querySelector('.FooterWrap').classList.remove('footer-margin-top');

  for (const openModal of document.querySelectorAll(`.${ID}-modal__open`)) {
    openModal.classList.remove(`${ID}-modal__open`);
  }

  // Show all elements above footer (for the desktop design)
  for (const element of document.querySelector('.mp-scroller-inner').children) {
    if (!element?.classList?.contains?.('FooterWrap')) {
      element.classList.remove(`hidden-desktop-only`);
    }
  }

  // Make sure that the calculation results page is hidden
  if (
    calculatingResultsElement.classList.contains(
      'modal__calculating-results--hidden'
    )
  ) {
    calculatingResultsElement.classList.remove(
      'modal__calculating-results--hidden'
    );
  }

  fireEvent(
    `Fragrance Finder - user closed finder on step: ${storage.activeStep}.`
  );
};
