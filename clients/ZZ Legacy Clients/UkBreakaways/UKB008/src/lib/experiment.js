/**
 * UKB008 - Customer Reviews In Checkout
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import reviewContent from './review_content';
import reRunSlick from './reRunSlick';

const activate = () => {
  setup();

  // Experiment code
  const device = document.documentElement.clientWidth > 500 ? 'desktop' : 'mobile';
  console.log(document.documentElement.clientWidth);
  console.log(device);
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
    if (element !== '' && (device === 'desktop' || (device === 'mobile' && element.device !== 'desktop'))) {
      const numberOfStars = element.stars;
      let stars = '';
      for (let i = 0; i < numberOfStars; i += 1) { 
        stars += `<i class="fa fa-star"></i>`;
      }
      reviewsList += `<div class="UKB008-review text-center" style="width: 100%;">
        <p class="UKB008-review__stars">
            ${stars}
        </p>
        <div class="UKB008-review__text">
          ${element.review}
        </div>
        <p class="text-center UKB008-review__author">
            ${element.author}
        </p>
      </div>`;
    }
  }
  
  let reviewsContainer;
  switch (device) {
    case 'mobile':
      reviewsContainer = `<div class='UKB008-reviewsContainer__wrapper'>
        <div class='UKB008-reviews__container'>
          <div class='UKB008-reviews__wrapper'>
            <div class='UKB008-reviews'>
              ${reviewsList}
            </div>
          </div>
        </div>
      </div>`;
      break;
    case 'desktop':
      reviewsContainer = `<div class='UKB008-reviewsContainer__wrapper'>
        <div class='UKB008-reviews__container'>
          <div class='UKB008-reviews__wrapper'>
            <div class='UKB008-reviews'>
              ${reviewsList}
            </div>
          </div>
        </div>
      </div>`;
      break;
  }
  /* eslint-enable */
  const mainContent = document.querySelector('.main-content');
  mainContent.insertAdjacentHTML('beforebegin', reviewsContainer);
  
  reRunSlick();

  // Add separating dots to Header
  if (device === "desktop") {
    document.querySelector('.main-content .container .inner-content h1').insertAdjacentHTML('afterend', `<hr></hr>`);
  }
};

export default activate;
