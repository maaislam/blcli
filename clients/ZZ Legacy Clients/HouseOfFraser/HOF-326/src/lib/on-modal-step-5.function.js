import shared from '../../../../../core-files/shared';
import { onRetakeQuizClick } from './modal-common.function';

const { ID, VARIATION } = shared;

/**
 * Modal - step 5
 */
const modalContainerStep5 = `<div class="${ID}-modal ${ID}-modal-step-5 hidden-at-the-beginning">
  <div class="modal__btn-container-mobile">
    <button class="modal__btn-retake-quiz">RETAKE QUIZ<span class="modal__btn-underscore"></span></button>
    <button class="modal__btn-close"><span class="modal__btn-close-x-btn">&#x2715</span> BACK TO BROWSING<span class="modal__btn-underscore"></span></button>
  </div>
	<div class="modal__header">
		<p class="modal__header--text-small">FRAGRANCE FINDER</p>
		<h3 class="modal__header--text-big">Your Top Matches</h3>
		<div class="modal__btn-container-desktop">
      <button class="modal__btn-retake-quiz">RETAKE QUIZ<span class="modal__btn-underscore"></span></button>
			<button class="modal__btn-close"><span class="modal__btn-close-x-btn">&#x2715</span> BACK TO BROWSING<span class="modal__btn-underscore"></span></button>
		</div>
	</div>



  <div class="modal-swiper__wrapper">
      <div class="swiper-button-next"><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg></div>
      <div class="swiper-button-prev"><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg></div>
  </div>


  <div class="modal__find-your-store">
    <div class="modal__find-your-store--img"></div>
    <div class="modal__find-your-store--container">
      <h3>Visit one of our stores to try your top matches</h3>
      <p>Prefer to try in store?</p>
      <div class="modal__find-your-store--btn-container">
        <button class="modal__find-your-store--btn">FIND YOUR STORE</button>
      </div>
    </div>
	</div>
  <div class="modal__calculating-results">
    <p>FRAGRANCE FINDER</p>
    <h3>Calculating Results…</h3>
  </div>
</div>`;

export const onModalStep5 = () => {
  // Inject the modal window step 5
  document
  .querySelector(VARIATION == 1 ? `body` : `.ContentWrapper`)
    .insertAdjacentHTML('afterbegin', modalContainerStep5);

  // Add event listener to retake quiz button - mobile
  document
    .querySelector(
      `.${ID}-modal-step-5 .modal__btn-container-mobile .modal__btn-retake-quiz`
    )
    .addEventListener('click', onRetakeQuizClick);

  // Add event listener to retake quiz button - desktop
  document
    .querySelector(
      `.${ID}-modal-step-5 .modal__btn-container-desktop .modal__btn-retake-quiz`
    )
    .addEventListener('click', onRetakeQuizClick);

  // Add event listener to find store
  document
    .querySelector(`.${ID}-modal-step-5 .modal__find-your-store--btn-container`)
    .addEventListener('click', () => {
      window.location = 'https://www.houseoffraser.co.uk/stores';
    });
};
