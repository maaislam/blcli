import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getMobileSlider } from './get-mobile-slider.function';
import { loadCss } from './load-css.function';

const { ID } = shared;

export const runMobileExperiment = () => {
  const mobileElement = document.querySelector(
    '#MainContentWrapper > main > div.ProductDetail.device-type.ng-scope.mobile > ng-include > div > h1'
  );

  // Load slicker for mobile
  loadCss('//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css');
  $.getScript(
    '//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js',
    function () {
      if (document.querySelector(`.${ID}-slider`)) return;

      mobileElement.insertAdjacentHTML('beforebegin', getMobileSlider());

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
};
