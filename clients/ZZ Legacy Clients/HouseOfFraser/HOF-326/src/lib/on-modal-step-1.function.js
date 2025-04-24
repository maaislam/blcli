import shared from '../../../../../core-files/shared';
import { onOptionClick } from './modal-common.function';

const { ID, VARIATION } = shared;

/**
 * Modal - step 1
 */
const modalContainerStep1 = `<div class="${ID}-modal ${ID}-modal-step-1 hidden-at-the-beginning">
	<div class="modal__btn-container-mobile">
		<button class="modal__btn-close modal__btn-close--centered"><span class="modal__btn-close-x-btn">&#x2715</span> BACK TO BROWSING<span class="modal__btn-underscore"></span></button>
	</div>
	<div class="modal__loading-bar-mobile">
		<div class="modal__loading-bar-mobile--active" style="width:25%;">
			<p class="modal__loading-bar-mobile--text">25%</p>
		</div>
	</div>
	<div class="modal__header">
		<p class="modal__header--text-small">FRAGRANCE FINDER</p>
		<h3 class="modal__header--text-big">Are you shopping for <br/> yourself or someone else?</h3>
		<div class="modal__btn-container-desktop">
			<button class="modal__btn-close"><span class="modal__btn-close-x-btn">&#x2715</span> BACK TO BROWSING<span class="modal__btn-underscore"></span></button>
		</div>
	</div>
	<div class="modal__body-form">
		<div class="modal__body-form--option modal__body-form--option-2-elements ${ID}-modal-step-1-option-1" style="height:222px;">
			<div class="modal__body-form--dark-opacity"></div>
			<div class="modal__body-form--text-wrapper">
				<p class="modal__body-form--text">FOR MYSELF</p>
				<div class="modal__body-form--underscore"></div>
			</div>
		</div>
		<div class="modal__body-form--option modal__body-form--option-2-elements ${ID}-modal-step-1-option-2" style="height:222px;">
			<div class="modal__body-form--dark-opacity"></div>
			<div class="modal__body-form--text-wrapper">
				<p class="modal__body-form--text">FOR SOMEONE ELSE</p>
				<div class="modal__body-form--underscore"></div>
			</div>
		</div>
	</div>
	<div class="modal__loading-bar-desktop">
		<div class="modal__loading-bar-desktop--active" style="width:25%;">
			<p class="modal__loading-bar-desktop--text">25%</p>
		</div>
	</div>
</div>`;

export const onModalStep1 = () => {
  // Inject the modal window step 1
  document
  	.querySelector(VARIATION == 1 ? `body` : `.ContentWrapper`)
    .insertAdjacentHTML('afterbegin', modalContainerStep1);

  // Add event listener to change active step (option 1)
  document
    .querySelector(`.${ID}-modal-step-1 .${ID}-modal-step-1-option-1`)
    .addEventListener('click', onOptionClick(1, 'FOR MYSELF'));

  // Add event listener to change active step (option 2)
  document
    .querySelector(`.${ID}-modal-step-1 .${ID}-modal-step-1-option-2`)
    .addEventListener('click', onOptionClick(1, 'FOR SOMONE ELSE'));
};
