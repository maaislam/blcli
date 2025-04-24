/**
 * NH046 - Customer Reviews and Reassurance in Checkout
 */
import { pollerLite } from '../../../../lib/uc-lib';
import { setup, device } from './services';
import { bindGaEvents } from './bindExperimentEvents';
// import { cacheDom } from './../../../../lib/cache-dom';
import reviewContent from './lib/review_content';

const activate = () => {
  setup();

  // const device = device();

  //  Shuffle reviews
  function shuffle(sourceArray) {
    for (let i = 0; i < sourceArray.length - 1; i += 1) {
        let j = i + Math.floor(Math.random() * (sourceArray.length - i));

        let temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
  }
  const reviews = shuffle(reviewContent);
  let reviewsList = '';
  /*eslint-disable */
  for (let i = 0; i < reviews.length; i += 1) {
    const element = reviews[i];
    if (element !== '') {
      reviewsList += `<div class="NH046-review text-center" style="width: 100%;">
      <p class="NH046-review__stars">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
      </p>
      <div class="NH046-review__text">
        ${element.review}
      </div>
      <p class="text-center NH046-review__author">
          ${element.author}
      </p>
  </div>`;
    }
  }
  
  let reviewsContainer;
  switch (device()) {
    case 'mobile':
      reviewsContainer = `<div class='NH046-reviewsContainer__wrapper'>
        <div class='NH046-reviews__container'>
          <div class='NH046-reviews__wrapper'>
            <div class='NH046-reviews'>
              ${reviewsList}
            </div>
          </div>
          <div class='NH046-coachCard__wrapper'>
            <div class='NH046-coachCard'></div>
          </div>
          <div class='NH046-cardPayments__wrapper'>
            <div class='NH046-cardPayments'></div>
          </div>
        </div>
      </div>`;
      break;
    case 'desktop':
      reviewsContainer = `<div class='NH046-reviewsContainer__wrapper'>
        <div class='NH046-reviews__container'>
          <div class='NH046-coachCard__wrapper'>
            <div class='NH046-coachCard'></div>
          </div>
          <div class='NH046-reviews__wrapper'>
            <div class='NH046-reviews'>
              ${reviewsList}
            </div>
          </div>
          <div class='NH046-cardPayments__wrapper'>
            <div class='NH046-cardPayments'></div>
          </div>
        </div>
      </div>`;
      break;
  }
  /* eslint-enable */
  const mainContainer = document.querySelector('.main-content div.container');
  mainContainer.insertAdjacentHTML('beforebegin', reviewsContainer);

  pollerLite([
    () => $.fn.slick,
  ], () => {
    $('.NH046-reviews').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true,
    });
    setTimeout(() => {
      $('.NH046-reviews').slick('refresh');
      bindGaEvents();
    }, 300);
  });
};

export default activate;
