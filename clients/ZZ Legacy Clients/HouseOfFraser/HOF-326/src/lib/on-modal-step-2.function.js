import shared from '../../../../../core-files/shared';
import { onOptionClick } from './modal-common.function';

const { ID, VARIATION } = shared;

/**
 * Modal - step 2
 */
const modalContainerStep2 = `<div class="${ID}-modal ${ID}-modal-step-2 hidden-at-the-beginning">
  <div class="modal__btn-container-mobile">
    <button class="modal__btn-previous"><span class="modal__btn-previous-btn"><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg></span> PREVIOUS QUESTION<span class="modal__btn-underscore"></span></button>
    <button class="modal__btn-close"><span class="modal__btn-close-x-btn">&#x2715</span> BACK TO BROWSING<span class="modal__btn-underscore"></span></button>
  </div>
	<div class="modal__loading-bar-mobile">
		<div class="modal__loading-bar-mobile--active" style="width:50%;">
			<p class="modal__loading-bar-mobile--text">50%</p>
		</div>
	</div>
	<div class="modal__header">
		<p class="modal__header--text-small">FRAGRANCE FINDER</p>
		<h3 class="modal__header--text-big">What fragrances<br/> do <span class="${ID}-modal-you-they-text">you</span> like wearing?</h3>
		<div class="modal__btn-container-desktop">
			<button class="modal__btn-previous"><span class="modal__btn-previous-btn"><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg></span> PREVIOUS QUESTION<span class="modal__btn-underscore"></span></button>
			<button class="modal__btn-close"><span class="modal__btn-close-x-btn">&#x2715</span> BACK TO BROWSING<span class="modal__btn-underscore"></span></button>
		</div>
	</div>
	<div class="modal__body-form">
		<div class="modal__body-form--option modal__body-form--option-3-elements ${ID}-modal-step-2-option-1" style="height:150px;">
			<div class="modal__body-form--dark-opacity"></div>
			<div class="modal__body-form--text-wrapper">
				<p class="modal__body-form--text">MASCULINE</p>
				<div class="modal__body-form--underscore"></div>
			</div>
		</div>
		<div class="modal__body-form--option modal__body-form--option-3-elements ${ID}-modal-step-2-option-2" style="height:150px;">
			<div class="modal__body-form--dark-opacity"></div>
			<div class="modal__body-form--text-wrapper">
				<p class="modal__body-form--text">UNISEX</p>
				<div class="modal__body-form--underscore"></div>
			</div>
		</div>
		<div class="modal__body-form--option modal__body-form--option-3-elements ${ID}-modal-step-2-option-3" style="height:150px;">
			<div class="modal__body-form--dark-opacity"></div>
			<div class="modal__body-form--text-wrapper">
				<p class="modal__body-form--text">FEMININE</p>
				<div class="modal__body-form--underscore"></div>
			</div>
		</div>
	</div>
	<div class="modal__loading-bar-desktop">
		<div class="modal__loading-bar-desktop--active" style="width:50%;">
			<p class="modal__loading-bar-desktop--text">50%</p>
		</div>
	</div>
</div>`;

export const onModalStep2 = () => {
  // Inject the modal window step 2
  document
  	.querySelector(VARIATION == 1 ? `body` : `.ContentWrapper`)
    .insertAdjacentHTML('afterbegin', modalContainerStep2);

  // Add event listener to change active step (option 1)
  document
    .querySelector(`.${ID}-modal-step-2 .${ID}-modal-step-2-option-1`)
    .addEventListener('click', onOptionClick(2, 'MASCULINE'));

  // Add event listener to change active step (option 2)
  document
    .querySelector(`.${ID}-modal-step-2 .${ID}-modal-step-2-option-2`)
    .addEventListener('click', onOptionClick(2, 'UNISEX'));

  // Add event listener to change active step (option 3)
  document
    .querySelector(`.${ID}-modal-step-2 .${ID}-modal-step-2-option-3`)
    .addEventListener('click', onOptionClick(2, 'FEMININE'));
};
