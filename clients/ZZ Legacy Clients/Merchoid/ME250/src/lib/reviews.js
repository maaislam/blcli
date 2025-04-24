import shared from "./shared";

export default () => {

    const { ID } = shared;

    const brand = document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/);

    const productReviewsv1 = { 
        'T-Shirts and Tops': {
            review1: {
                num: '1',
                headline: `Great ${brand} product`,
                reviewText: `Great ${brand} product, as described. Great (early) delivery.`,
                author: 'Nicky C',
            },
            review2: {
                headline: 'Good quality',
                num: '2',
                reviewText: 'Good quality. I picked a size up so it would fit over my motorcycle armour and it does not disappoint.',
                author: 'Mitchell E',
            },
            review3: {
                num: '3',
                headline: 'Exceptional quality',
                reviewText: "Exceptional quality, have bought several items from here and I'm over the moon with them.",
                author: 'Shannon S',
            }
        },
        'Hoodies, Sweatshirts & Jumpers': {
            review1: {
                num: '1',
                headline: 'Super quality',
                reviewText: 'Super quality item, delivered so quickly. Very good quality.',
                author: 'Mike L',
            },
            review2: {
                num: '2',
                headline: 'Excellent quality,',
                reviewText: `Really pleased with this ${brand} product, excellent quality, accurate sizing & description & arrived in good time.`,
                author: 'Michelle M',
            },
            review3: {
                num: '3',
                headline: 'Will definitely use again',
                reviewText: 'Excellent quality, items exactly as described, very fast delivery. Will definitely use again.',
                author: 'Ellis R',
            }
        },
        'Home and Office': {
            review1: {
                num: '1',
                headline: 'Great item',
                reviewText: 'Great item, high quality and delivered quickly.',
                author: 'Pete D',
            },
            review2: {
                num: '2',
                headline: 'Excellent',
                reviewText:`Merchoid were excellent - the quality of the ${brand} product is better than what you'd find in the shops`,
                author: 'Phil W',
            },
            review3: {
                num: '3',
                headline: 'Great product',
                reviewText: 'Really quick delivery. Great product. Looked exactly like the pictures.',
                author: 'Ella C',
            }
        },
        'Other': {
            review1: {
                num: '1',
                headline: 'Great product',
                reviewText: 'Great product, easy to order & fast delivery.',
                author: 'Ethan B',
            },
            review2: {
                num: '2',
                headline: 'Terrific item',
                reviewText: 'Terrific item. Really good quality.',
                author: 'Mel S',
            },
            review3: {
                num: '3',
                headline: 'Great product',
                reviewText: 'Great product. Not seen it anywhere else. Good value, quick, secure delivery.',
                author: 'Aaron L',
            }
        }
    };
    const productReviewsv2 = { 
        'T-Shirts and Tops': {
            review1: {
                num: '1',
                headline: `Awesome product`,
                reviewText: `Awesome product, delivered very quickly. Made my nephew’s birthday.`,
                author: 'Nicky C',
            },
            review2: {
                headline: 'Brilliance',
                num: '2',
                reviewText: 'Brilliance, pure brilliance any geek has gotta love this',
                author: 'Mitchell E',
            },
            review3: {
                num: '3',
                headline: 'Great gift.',
                reviewText: "Great gift. Quick service. Decent value",
                author: 'Shannon S',
            }
        },
        'Hoodies, Sweatshirts & Jumpers': {
            review1: {
                num: '1',
                headline: 'Perfect fit',
                reviewText: 'Quality of item was great for a gift. Perfect fit, nice and cheap compared to other sites.',
                author: 'Mike L',
            },
            review2: {
                num: '2',
                headline: 'Brilliant',
                reviewText: `I got slightly bigger than I needed, but that just gives me an excuse to loan it out as a gift to other friends and get myself another.`,
                author: 'Michelle M',
            },
            review3: {
                num: '3',
                headline: 'Top quality product',
                reviewText: 'Bought as a gift. Top quality product, looks exactly like the ad and arrived within 3 days. They love it.',
                author: 'Ellis R',
            }
        },
        'Home and Office': {
            review1: {
                num: '1',
                headline: 'Great quality',
                reviewText: 'Ordered as a gift and they absolutely love it, great quality, great service and would order again without a doubt.',
                author: 'Pete D',
            },
            review2: {
                num: '2',
                headline: 'Terrific service',
                reviewText:`Terrific service, wonderful fun gift, very happy.`,
                author: 'Phil W',
            },
            review3: {
                num: '3',
                headline: 'Exactly what I needed',
                reviewText:`As a gift, this was great and exactly what I needed.`,
                author: 'Ella C',
            }
        },
        'Other': {
            review1: {
                num: '1',
                headline: 'Perfect gift',
                reviewText: 'Could I be any happier?! Quite frankly no! It is a unique and perfect gift. I cannot wait to give this as a present.',
                author: 'Ethan B',
            },
            review2: {
                num: '2',
                headline: 'Terrific service',
                reviewText:`Terrific service, wonderful fun gift, very happy.`,
                author: 'Mel S',
            },
            review3: {
                num: '3',
                headline: 'Brilliance',
                reviewText: 'Brilliance, pure brilliance any geek has gotta love this..',
                author: 'Aaron L',
            }
        }
    };


    // Category based on breadcrumb
    const category = window.dataLayer[0].ecommerce.detail.products[0].category;
    
    
    let reviews;
    if(shared.VARIATION === '1') {
        reviews = productReviewsv1;
    } else {
        reviews = productReviewsv2;
    }

    if(category) {

        let catName;
        if(window.dataLayer[0].ecommerce.detail.products[0].category.match(/[^/]*/)[0]) {
            catName = window.dataLayer[0].ecommerce.detail.products[0].category.match(/[^/]*/)[0];
        } else {
            catName = window.dataLayer[0].ecommerce.detail.products[0].category;
        }
        let reviewObj;

        // if category matches, if not use other
        if(reviews[catName]) {
            console.log(catName);
            reviewObj = reviews[catName];
        } else {
            reviewObj = reviews['Other'];
        }

        // review to show based on session storage
        let reviewToShow;

        // add to session the review that was shown
        const saveReview = () => {
            const URL = window.location.pathname;
            const reviewShown = reviewToShow;

            sessionStorage.setItem(`${ID}-${URL}`, JSON.stringify(reviewShown));

            sessionStorage.setItem(`${ID}-${catName}`, reviewShown.num);
        }
        
        const checkStorageAddReview = () => {
            const URL = window.location.pathname;

            // if url is stored in session, get the review that was previously shown
            if(sessionStorage.getItem(`${ID}-${URL}`)) {
                let reviewLastShown = sessionStorage.getItem(`${ID}-${URL}`);
                if(reviewLastShown) {
                    reviewToShow = JSON.parse(reviewLastShown);
                }
            } else {

                // first one
                if(!sessionStorage.getItem(`${ID}-${catName}`)) {
                    reviewToShow = reviewObj.review1;
                    saveReview();
                }
                else if(sessionStorage.getItem(`${ID}-${catName}`) === '1') {
                    reviewToShow = reviewObj.review2;
                    saveReview();
                } 
                else if(sessionStorage.getItem(`${ID}-${catName}`) === '2') {
                    reviewToShow = reviewObj.review3;
                    saveReview();
                }
                else if(sessionStorage.getItem(`${ID}-${catName}`) === '3') {
                    // do nothing
                }

            }

            if(reviewToShow) {

                // create and add the review
                const reviewBlock = document.createElement('div');
                reviewBlock.classList.add(`${ID}-review-block`);
                reviewBlock.innerHTML = `
                <div class="${ID}-reviewHeading">
                    <div class="${ID}-reviewStars"></div>
                    <h3>${reviewToShow.headline}</h3>

                </div>
                <div class="${ID}-reviewText">
                    <p>"${reviewToShow.reviewText}"</p>
                    <span>- ${reviewToShow.author}</span>
                </div>`;

                document.querySelector('.product-usps-wrapper').insertAdjacentElement('afterend', reviewBlock);
            }
        }

        checkStorageAddReview();
    }
}
