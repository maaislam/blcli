import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import {
  getMobileSlider,
  getSliderContent,
} from './get-mobile-slider.function';
import { loadCss } from './load-css.function';

const { ID } = shared;

const desktopContent = `
	<div class="${ID}-desktop-container">
		${getSliderContent()}
	</div>
`;

export const runDesktopExperiment = () => {
  const desktopElement = document.querySelector('#HeaderPlaceholder');

  desktopElement.insertAdjacentHTML('afterend', desktopContent);

  document
    .querySelector(
      `.${ID}-desktop-container .${ID}-slider--single-element--url`
    )
    .addEventListener('click', () => {
      fireEvent('Clicks Trustpilot message in USP bar');
      window.open('https://de.trustpilot.com/review/avon.de');
    });

  if (window.innerWidth <= 880 && !document.querySelector(`.${ID}-slider`)) {
    // Load slicker for mobile
    loadCss('//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css');
    $.getScript(
      '//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js',
      function () {
        if (document.querySelector(`.${ID}-slider`)) return;

        desktopElement.insertAdjacentHTML('afterend', getMobileSlider());

        document
          .querySelector(`.${ID}-slider .${ID}-slider--single-element`)
          .classList.add('active');

        document
          .querySelector(`.${ID}-slider .${ID}-slider--single-element--url`)
          .addEventListener('click', () => {
            fireEvent('Clicks Trustpilot message in USP bar');
            window.open('https://de.trustpilot.com/review/avon.de');
          });

        $(`.${ID}-slider`).slick({
          infinite: true,
          autoplay: true,
          autoplaySpeed: 5000,
          arrows: false,
        });
      }
    );
  }
};
