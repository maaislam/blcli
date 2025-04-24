import shared from '../../../../../core-files/shared';
import { onOptionClick } from './modal-common.function';

const { ID, VARIATION } = shared;

/**
 * Modal - step 4
 */
const modalContainerStep4 = `<div class="${ID}-modal ${ID}-modal-step-4 hidden-at-the-beginning">
  <div class="modal__btn-container-mobile">
  <button class="modal__btn-previous"><span class="modal__btn-previous-btn"><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg></span> PREVIOUS QUESTION<span class="modal__btn-underscore"></span></button>
    <button class="modal__btn-close"><span class="modal__btn-close-x-btn">&#x2715</span> BACK TO BROWSING<span class="modal__btn-underscore"></span></button>
  </div>
	<div class="modal__loading-bar-mobile">
		<div class="modal__loading-bar-mobile--active" style="width:99%;">
			<p class="modal__loading-bar-mobile--text">99%</p>
		</div>
	</div>
	<div class="modal__header">
		<p class="modal__header--text-small">FRAGRANCE FINDER</p>
		<h3 class="modal__header--text-big">How much would<br/> you like to spend?</h3>
		<div class="modal__btn-container-desktop">
		 	<button class="modal__btn-previous"><span class="modal__btn-previous-btn"><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg></span> PREVIOUS QUESTION<span class="modal__btn-underscore"></span></button>
			<button class="modal__btn-close"><span class="modal__btn-close-x-btn">&#x2715</span> BACK TO BROWSING<span class="modal__btn-underscore"></span></button>
		</div>
	</div>
	<div class="modal__body-form">
		<div class="modal__body-form--option modal__body-form--option-4-elements ${ID}-modal-step-4-option-1" style="height:110px;">
			<div class="modal__body-form--dark-opacity"></div>
			<div class="modal__body-form--text-wrapper">
				<p class="modal__body-form--text">UP TO £40</p>
				<div class="modal__body-form--underscore"></div>
			</div>
		</div>
		<div class="modal__body-form--option modal__body-form--option-4-elements ${ID}-modal-step-4-option-2" style="height:110px;">
			<div class="modal__body-form--dark-opacity"></div>
			<div class="modal__body-form--text-wrapper">
				<p class="modal__body-form--text">£40-£80</p>
				<div class="modal__body-form--underscore"></div>
			</div>
		</div>
		<div class="modal__body-form--option modal__body-form--option-4-elements ${ID}-modal-step-4-option-3" style="height:110px;">
			<div class="modal__body-form--dark-opacity"></div>
			<div class="modal__body-form--text-wrapper">
				<p class="modal__body-form--text">£80-£120</p>
				<div class="modal__body-form--underscore"></div>
			</div>
		</div>
		<div class="modal__body-form--option modal__body-form--option-4-elements ${ID}-modal-step-4-option-4" style="height:110px;">
			<div class="modal__body-form--dark-opacity"></div>
			<div class="modal__body-form--text-wrapper">
				<p class="modal__body-form--text">OVER £120</p>
				<div class="modal__body-form--underscore"></div>
			</div>
		</div>
	</div>
	<div class="modal__loading-bar-desktop">
		<div class="modal__loading-bar-desktop--active" style="width:99%;">
			<p class="modal__loading-bar-desktop--text">99%</p>
		</div>
	</div>
</div>`;

export const onModalStep4 = () => {
  // Inject the modal window step 4
  document
  .querySelector(VARIATION == 1 ? `body` : `.ContentWrapper`)
    .insertAdjacentHTML('afterbegin', modalContainerStep4);

  // Add event listener to change active step (option 1)
  document
    .querySelector(`.${ID}-modal-step-4 .${ID}-modal-step-4-option-1`)
    .addEventListener('click', onOptionClick(4, 'UP TO £40'));

  // Add event listener to change active step (option 2)
  document
    .querySelector(`.${ID}-modal-step-4 .${ID}-modal-step-4-option-2`)
    .addEventListener('click', onOptionClick(4, '£40-£80'));

  // Add event listener to change active step (option 3)
  document
    .querySelector(`.${ID}-modal-step-4 .${ID}-modal-step-4-option-3`)
    .addEventListener('click', onOptionClick(4, '£80-£120'));

  // Add event listener to change active step (option 4)
  document
    .querySelector(`.${ID}-modal-step-4 .${ID}-modal-step-4-option-4`)
    .addEventListener('click', onOptionClick(4, 'OVER £120'));
};
