import settings from '../../lib/settings';
import { events } from '../../../../../../lib/utils';

const { ID } = settings;

export default class ReviewBlock {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
    this.addReviews();
    this.reviewSlider();
  }

  create() {
    const numberOfReviews = window.digitalData.product[0].productInfo.ratingCount;
    const element = document.createElement('div');
    element.classList.add(`${ID}_reviewBlockWrapper`);
    element.innerHTML = `<div class="${ID}-reviews"></div>
    <div class="${ID}-allReviews" data-target="product-details__bazaar-voice"><span>Read all reviews (${numberOfReviews})</span></div>`;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
    component.querySelector(`.${ID}-allReviews`).addEventListener('click', () => {
      document.querySelector('#js-ratingJumpTo').click();
      events.send(`${ID} v${settings.VARIATION}`, 'click', 'Read all reviews');
    });
  }

  render() {
    const { component } = this;
    if (settings.VARIATION === '1') {
      const productPrice = document.querySelector('.buying-info__pricing');
      productPrice.insertAdjacentElement('afterend', component);
    } else {
      const buyButton = document.querySelector('.buying-buttons');
      buyButton.insertAdjacentElement('afterend', component);
    }
  }

  addReviews() {
    const { component } = this;

    const productReviews = document.querySelectorAll('#bazaarContainer .BVRRDisplayContentBody .BVRRContentReview');

    for (let index = 0; index < productReviews.length; index += 1) {
      const element = productReviews[index];

      const reviewStars = element.querySelector('.BVRRRatingOverall .BVRRRatingNormalImage img').getAttribute('src');
      const reviewHeading = element.querySelector('.BVRRReviewTitleContainer').textContent;
      const reviewText = element.querySelector('.BVRRReviewTextContainer .BVRRReviewText').textContent;

      // create the new reviews
      const newReview = document.createElement('div');
      newReview.classList.add(`${ID}-slideReview`);
      newReview.innerHTML = `
      <div class="${ID}-starRating" style="background-image: url(${reviewStars})"></div>
      <h4>${reviewHeading}</h4>
      <p>${reviewText}</p>`;

      component.querySelector(`.${ID}-reviews`).appendChild(newReview);
    }
  }

  reviewSlider() {
    const { component } = this;

    const reviews = document.querySelectorAll(`.${ID}-slideReview`);
    if (reviews.length > 1) {
      jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
        jQuery(`.${ID}-reviews`).slick({
          infinite: true,
          slidesToShow: 1,
          adaptiveHeight: true,
          arrows: true,
          centerMode: true,
          centerPadding: '25px',
        });
      });

      jQuery(`.${ID}-reviews`).on('beforeChange', function () {
        events.send(`${ID} v${settings.VARIATION}`, 'slide change', 'User interacted with review slider');
      });
    }
  }
}
