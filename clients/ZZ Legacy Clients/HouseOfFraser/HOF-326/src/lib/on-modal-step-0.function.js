import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';
import { setStorage, getStorage } from './local-storage.function';
import { mapStepToEventLabel } from './modal-common.function';

const { ID, VARIATION } = shared;

/**
 * Modal - step 0
 */
const modalContainerStep0 = `<div class="${ID}-modal ${ID}-modal-step-0 ${VARIATION == 1 ? `hidden-at-the-beginning` : `${ID}-modal__open`}">
	<div class="modal__btn-container-mobile">
		<button class="modal__btn-close modal__btn-close--centered"><span class="modal__btn-close-x-btn">&#x2715</span> BACK TO BROWSING<span class="modal__btn-underscore"></span></button>
	</div>
	<div class="modal__header">
		<p class="modal__header--text-small">FRAGRANCE FINDER</p>
		<h3 class="modal__header--text-big">Discover Your<br/> Perfect Scent</h3>
		<div class="modal__btn-container-desktop">
			<button class="modal__btn-close"><span class="modal__btn-close-x-btn">&#x2715</span> BACK TO BROWSING<span class="modal__btn-underscore"></span></button>
		</div>
	</div>
	<div class="modal__body-step-0">
		<div class="modal__body-step-0-content">
			<p class="modal__body-step-0-content--text">
			Welcome to the Fragrance Finder, the ultimate destination for all things scent. If your current collection is feeling a bit redundant or you're stumped for gifts for that special someone, you've come the right place. We know that finding the right fragrance can be overwhelming at the best of times, so we're here to help. Whether hunting for an eau de toilette, an eau de parfum or an aftershave we'll help you find just what you've been looking for within seconds.
			</p>
			<div class="modal__body-step-0-content--button-container">
				<button class="modal__body-step-0-content--button">FIND YOUR PERFECT SCENT</button>
			</div>
		</div>
	</div>
</div>`;

export const onModalStep0 = () => {
  // Inject the modal window step 0
  document
    .querySelector(VARIATION == 1 ? `body` : `.ContentWrapper`)
    .insertAdjacentHTML('afterbegin', modalContainerStep0);

  // Add event listener to change active step
  document
    .querySelector('.modal__body-step-0-content--button')
    .addEventListener('click', (e) => {
		e.preventDefault();
      setStorage({ ...getStorage(), activeStep: 1 });

	  if(VARIATION == 2) {
		document.querySelector(`.${ID}-modal-step-0`).classList.add(`${ID}-modal__open`);
		document.querySelector(`.${ID}-modal-step-1`).classList.add(`${ID}-modal__open`);
	  }

      fireEvent(
        `Fragrance Finder - step: 0 (${mapStepToEventLabel(
          0
        )}) - user cliked FIND YOUR PERFECT SCENT button.`
      );
    });
};
