import shared from '../../../../../core-files/shared';
import { setStorage, getStorage } from './local-storage.function';
import { fireEvent } from '../../../../../core-files/services';

const { ID, VARIATION } = shared;

/**
 * Button on the PLP
 */
const fragranceViewButtonContainer = `<div class="${ID}-fragrance-view-wrapper">
<div class="${ID}-fragrance-view-container">
<h3><span class="font-bold">FRAGRANCE</span> FINDER</h3>
<div class="${ID}-fragrance-view-container__btn">
	<p class="${ID}-fragrance-view-container__btn-text">Click here to discover your new signature scent or find gifting inspiration</p>
	<button class="${ID}-fragrance-view-container__btn-clickable">START THE QUIZ</button>
	<span class="${ID}-fragrance-view-container__underscore"></span>
</div>
</div>
</div>`;

const openCloseFinder = () => {
  const storage = getStorage();
  setStorage({ ...storage, isFinderOpen: !storage.isFinderOpen });

  if (!storage.isFinderOpen) {
    fireEvent(
      `Fragrance Finder - user opened finder on step: ${storage.activeStep}.`
    );
  }
};

const onPreviousButton = () => {
  const storage = getStorage();
  console.log("Prev button being clicked");

  const currentModalElement = document.querySelector(
    `.${ID}-modal-step-${storage.activeStep}`
  );

  if (currentModalElement.classList.contains(`${ID}-modal__open`)) {
    currentModalElement.classList.remove(`${ID}-modal__open`);
  }

  setStorage({
    ...storage,
    isFinderOpen: true,
    activeStep: storage.activeStep - 1,
    steps: {
      ...storage.steps,
      [storage.activeStep - 1]: null,
    },
  });

  fireEvent(
    `Fragrance Finder - step: ${storage.activeStep} - user cliked previous button.`
  );
};

export const onButtonLoad = () => {
  // Inject the button - if there are elements -> 3rd place, if 1 element -> 2nd, if no elements -> 1st
  if(VARIATION == 1) {

  
    if (
      document.querySelectorAll('ul#navlist.s-productscontainer2 li').length > 1
    ) {
      document
        .querySelectorAll('ul#navlist.s-productscontainer2 li')[1]
        .insertAdjacentHTML('afterend', fragranceViewButtonContainer);
    }

    if (
      document.querySelectorAll('ul#navlist.s-productscontainer2 li').length === 1
    ) {
      document
        .querySelector('ul#navlist.s-productscontainer2 li')
        .insertAdjacentHTML('afterend', fragranceViewButtonContainer);

      if (
        document.querySelector('ul#navlist.s-productscontainer2 li').innerHTML ===
        'No Products Found'
      ) {
        document.querySelector('ul#navlist.s-productscontainer2 li').remove();
      }
    }

    // Add listener on the button to interact with storage and open the modal
    document
      .querySelector(`.${ID}-fragrance-view-wrapper`)
      .addEventListener('click', openCloseFinder);

  }

  // Add listener to the modal close button
  const modalCloseButtons = document.querySelectorAll(`.modal__btn-close`);

  for (const closeButton of modalCloseButtons) {
    closeButton.addEventListener('click', openCloseFinder);
  }

  // Add listener to the modal previous button
  const modalPreviousButtons =
    document.querySelectorAll(`.modal__btn-previous`);

  for (const previousButton of modalPreviousButtons) {
    previousButton.addEventListener('click', (e) => {
      e.preventDefault();
      onPreviousButton();
    });
  }
};
