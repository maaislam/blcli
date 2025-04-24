import shared from '../../../../../core-files/shared';
import { onOptionClick } from './modal-common.function';

const { ID, VARIATION } = shared;

/**
 * Modal - step 3
 */
const modalContainerStep3 = `<div class="${ID}-modal ${ID}-modal-step-3 hidden-at-the-beginning">
  <div class="modal__btn-container-mobile">
  <button class="modal__btn-previous"><span class="modal__btn-previous-btn"><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg></span> PREVIOUS QUESTION<span class="modal__btn-underscore"></span></button>
    <button class="modal__btn-close"><span class="modal__btn-close-x-btn">&#x2715</span> BACK TO BROWSING<span class="modal__btn-underscore"></span></button>
  </div>
	<div class="modal__loading-bar-mobile">
		<div class="modal__loading-bar-mobile--active" style="width:75%;">
			<p class="modal__loading-bar-mobile--text">75%</p>
		</div>
	</div>
	<div class="modal__header">
		<p class="modal__header--text-small">FRAGRANCE FINDER</p>
		<h3 class="modal__header--text-big">What type of scent<br/> do <span class="${ID}-modal-you-they-text">you</span> like wearing?</h3>
		<div class="modal__btn-container-desktop">
			<button class="modal__btn-previous"><span class="modal__btn-previous-btn"><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg></span> PREVIOUS QUESTION<span class="modal__btn-underscore"></span></button>
			<button class="modal__btn-close"><span class="modal__btn-close-x-btn">&#x2715</span> BACK TO BROWSING<span class="modal__btn-underscore"></span></button>
		</div>
	</div>
	<div class="modal__body-form">
		<div class="modal__body-form--option modal__body-form--option-4-elements ${ID}-modal-step-3-option-1" style="height:110px;">
			<div class="modal__body-form--dark-opacity"></div>
			<div class="modal__body-form--text-wrapper">
				<p class="modal__body-form--text">FRUITY/FLORAL</p>
				<div class="modal__body-form--underscore"></div>
			</div>
		</div>
		<div class="modal__body-form--option modal__body-form--option-4-elements ${ID}-modal-step-3-option-2" style="height:110px;">
			<div class="modal__body-form--dark-opacity"></div>
			<div class="modal__body-form--text-wrapper">
				<p class="modal__body-form--text">FRESH/ZESTY</p>
				<div class="modal__body-form--underscore"></div>
			</div>
		</div>
		<div class="modal__body-form--option modal__body-form--option-4-elements ${ID}-modal-step-3-option-3" style="height:110px;">
			<div class="modal__body-form--dark-opacity"></div>
			<div class="modal__body-form--text-wrapper">
				<p class="modal__body-form--text">SPICY/ORIENTAL</p>
				<div class="modal__body-form--underscore"></div>
			</div>
		</div>
		<div class="modal__body-form--option modal__body-form--option-4-elements ${ID}-modal-step-3-option-4" style="height:110px;">
			<div class="modal__body-form--dark-opacity"></div>
			<div class="modal__body-form--text-wrapper">
				<p class="modal__body-form--text">WOODY/MUSKY</p>
				<div class="modal__body-form--underscore"></div>
			</div>
		</div>
	</div>
	<div class="modal__loading-bar-desktop">
		<div class="modal__loading-bar-desktop--active" style="width:75%;">
			<p class="modal__loading-bar-desktop--text">75%</p>
		</div>
	</div>
</div>`;

export const onModalStep3 = () => {
  // Inject the modal window step 3
  document
  	.querySelector(VARIATION == 1 ? `body` : `.ContentWrapper`)
    .insertAdjacentHTML('afterbegin', modalContainerStep3);

  // Add event listener to change active step (option 1)
  document
    .querySelector(`.${ID}-modal-step-3 .${ID}-modal-step-3-option-1`)
    .addEventListener('click', onOptionClick(3, 'FRUITY/FLORAL'));

  // Add event listener to change active step (option 2)
  document
    .querySelector(`.${ID}-modal-step-3 .${ID}-modal-step-3-option-2`)
    .addEventListener('click', onOptionClick(3, 'FRESH/ZESTY'));

  // Add event listener to change active step (option 3)
  document
    .querySelector(`.${ID}-modal-step-3 .${ID}-modal-step-3-option-3`)
    .addEventListener('click', onOptionClick(3, 'SPICY/ORIENTAL'));

  // Add event listener to change active step (option 4)
  document
    .querySelector(`.${ID}-modal-step-3 .${ID}-modal-step-3-option-4`)
    .addEventListener('click', onOptionClick(3, 'WOODY/MUSKY'));
};
