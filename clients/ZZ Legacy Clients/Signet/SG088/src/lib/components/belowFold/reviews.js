/**
 * Reviews
 */
import shared from "../../shared";

const { ID } = shared;

export default class ProductReviews {
    constructor() {
      this.create();
      this.render();
    }
  
    create() {

        const reviewStars = document.querySelector('.product-reviews .product-reviews__rating');
        const reviewCount = window.digitalData.product[0].productInfo.ratingCount;

        const element = document.createElement('div');
        element.classList.add(`${ID}__section`);
        element.classList.add(`${ID}__reviews`);
        element.innerHTML = 
        `<div class="${ID}__sectionContainer">
            <h3 class="${ID}__heading">Reviews</h3>
            <div class="${ID}__reviewStars">
                ${reviewStars.innerHTML}
                <div class="${ID}__reviewCount">based on ${reviewCount} reviews</div>
            </div>
           
            <div class="${ID}__reviewBlocks"></div>
        </div> `;

        const reviews = document.querySelector('#skip_link-reviews');
        element.querySelector(`.${ID}__reviewBlocks`).appendChild(reviews);


        this.component = element;
    }
  
    render() {
      const { component } = this;
      document.querySelector(`.${ID}__pageContent`).appendChild(component);

      // review changes
        const reviewCount = window.digitalData.product[0].productInfo.ratingCount;
        const currentReviews = document.querySelector('.product-reviews');
        const singleReview = currentReviews.querySelectorAll('.product-reviews__reviews__container');


        for (let index = 0; index < singleReview.length; index += 1) {
            const element = singleReview[index];

            // hide all except first two
            const author = element.querySelector('.product-reviews__reviews__meta');
            element.querySelector('.product-reviews__reviews__review').appendChild(author);

            const overallStar = element.querySelector('.product-reviews__star-ratings .product-reviews__star-rating-container');
            overallStar.innerHTML = overallStar.innerHTML.replace('Overall', '');
        }


        // if more than two, add button to show more reviews
        const addReviewButton = () => {
            const reviewButton = document.createElement('div');
            reviewButton.classList.add(`${ID}__button`)
            reviewButton.classList.add(`${ID}__light`);

            reviewButton.innerHTML = 'Show all reviews';
            
            document.querySelector(`.${ID}__reviewBlocks`).appendChild(reviewButton);


            reviewButton.addEventListener('click', () => {  
                currentReviews.classList.remove(`${ID}-moreThanTwo`);
                reviewButton.style.display = 'none';
            });
        }
        if(window.innerWidth > 767) {
            if(reviewCount > 4) {
                currentReviews.classList.add(`${ID}-moreThanTwo`);
                addReviewButton();
            }

        } else {
            if(reviewCount > 2) {
                currentReviews.classList.add(`${ID}-moreThanTwo`);
                addReviewButton();
            }
        }

        function scrollToElement(element) {
            window.scroll({
              behavior: 'smooth',
              left: 0,
              top: element.getBoundingClientRect().top + window.scrollY - 200,
            });
          }

        // top review changes
        const topReview = document.querySelector('#js-link-reviews');
        topReview.removeAttribute('href');

        topReview.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement(document.querySelector(`.${ID}__section.${ID}__reviews`));
        });
    }
  }
  
