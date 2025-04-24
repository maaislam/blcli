import { events } from "../../../../../lib/utils";
import { scrollToElement } from "./helpers";

import shared from "./shared";

 /**
   * Add reviews 
   */
export default () => {
    
    const { ID, VARIATION } = shared;
   
    const moveReviews = () => {
        const reviews = document.querySelector('#product-content .product-review-links.product-review-links-top');
        const reviewRating = reviews.querySelector('.bv-rating span');
        if(reviews && reviewRating) {
            document.querySelector(`.${ID}-topReviews`).insertAdjacentElement('beforebegin', reviews);
           
            reviews.insertAdjacentHTML('beforeend',`<div class="${ID}-reviewRating">${reviewRating.innerText}</div><div class="${ID}-readReviews">Read Reviews</div>`);
        
            const allReviews = document.querySelector('#tabReviews');
            if(allReviews) {
                document.querySelector(`.${ID}-journeyContent`).appendChild(allReviews);
            }
            
        }
    }
    const addReviews = () => {
        const reviews = {
            'Velvetiser': {
                reviewText: "Can't wait to try all the flavours! So far we have really enjoyed it, even making the hot chocolate feels a bit more exciting. This gadget brings a childish charm to making a hot chocolate at home.",
            },
            'Hot chocolate on another level': {
                reviewText: "Brought this after a long time deciding, had a taster in a shop no contest this is a great gadget that does a fantastic job of producing a smooth cup of chocolate. Yes its not an every day drink but a treat such a simple luxury glad we treated ourselves",
            },
            'Amazing hot chocolate': {
                reviewText: "I bought this as a treat for myself but it would make a great present. The hot chocolate is delicious and rich, not at all like the powdered chocolate you make with hot water. I’d expect nothing less from Hotel Chocolat!"
            }
        }

        const reviewBlock = document.createElement('div');
        reviewBlock.classList.add(`${ID}-topReviews`);
        reviewBlock.innerHTML = `<div class="${ID}-container"><div class="${ID}-icon"></div><div class="${ID}-reviews"></div><div class="${ID}-icon"></div></div>`;
        
        document.querySelector(`.${ID}-title`).insertAdjacentElement('afterend', reviewBlock);
    
       


        Object.keys(reviews).forEach((i) => {
            const data = reviews[i];
            const review = document.createElement('div');
            review.classList.add(`${ID}-review`);
            review.innerHTML = `<span>${[i][0]}</span><p><b>"</b>${data.reviewText}<b>"</b></p>`;

            document.querySelector(`.${ID}-topReviews .${ID}-reviews`).appendChild(review);
        });

        // slick reviews
        window.jQuery(`.${ID}-topReviews .${ID}-reviews`).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 8000,
            adaptiveHeight: true,
        });

    }
    const readReviewsEvent = () => {

        const reviewLink = document.querySelector(`.${ID}-readReviews`);
        if(reviewLink) {
            const review = document.querySelector('#tabReviews');
            review.style.display = 'none';
            
            reviewLink.addEventListener('click', () => {
                events.send(`${ID} variation:${VARIATION}`, 'click', 'read reviews'); 
                review.style.display = 'block';
                scrollToElement(review);
            });
        }
    }

    addReviews();
    moveReviews();
    readReviewsEvent();
}