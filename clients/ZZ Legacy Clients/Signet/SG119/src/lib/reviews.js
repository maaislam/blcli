/**
 * Reviews
 */
import shared from "./shared";

const {
    ID
} = shared;

export default class ProductReviews {
    constructor() {
        this.create();
        this.render();
    }

    create() {

        const reviewStars = document.querySelector('.product-reviews .product-reviews__rating');
        const writeReview = document.querySelector('.product-reviews__overview__new .product-reviews__write-review-anchor').getAttribute('href');

        const element = document.createElement('div');
        element.classList.add(`${ID}-section`);
        element.classList.add(`${ID}-reviews`);
        element.innerHTML =
            `<div class="${ID}-container">
            <h3 class="${ID}-heading">Reviews</h3>
            <div class="${ID}-reviewStars">
                ${reviewStars.innerHTML}
                <a href="${writeReview}">Write a review</a>
            </div>
           
            <div class="${ID}-reviewBlocks" ${window.innerWidth > 767 ? `data-aos="fade-up"`: ''}></div>
        </div>`;


        const reviews = document.querySelector('#skip_link-reviews').nextElementSibling;

        if (reviews) {
            element.querySelector(`.${ID}-reviewBlocks`).appendChild(reviews);
        }

        this.component = element;
    }

    render() {
        const { component } = this;
        document.querySelector(`.${ID}-articles`).insertAdjacentElement('beforebegin', component);

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
            reviewButton.classList.add(`${ID}-button`)
            reviewButton.classList.add(`${ID}-black`);

            reviewButton.innerHTML = 'Show all reviews';

            document.querySelector(`.${ID}-reviewBlocks`).appendChild(reviewButton);


            reviewButton.addEventListener('click', () => {
                currentReviews.classList.remove(`${ID}-hideReviews`);
                reviewButton.style.display = 'none';
            });
        }

        if(window.innerWidth > 767) {
            if(reviewCount > 4) {
                currentReviews.classList.add(`${ID}-hideReviews`);
                addReviewButton();
            }

        } else {
            if(reviewCount > 2) {
                currentReviews.classList.add(`${ID}-hideReviews`);
                addReviewButton();
            }
        }

        // top review changes
        if (document.getElementById('js-link-reviews')) {
            const topReview = document.querySelector('#js-link-reviews');
            topReview.removeAttribute('href');

            /*topReview.addEventListener('click', () => {
                scrollToElement(document.querySelector(`.${ID}__section.${ID}__reviews`));
                document.querySelector(`.${ID}__reviewBlocks .${ID}__button`).click();
                //reviewButton.click();
            });*/
        }
    }
}
