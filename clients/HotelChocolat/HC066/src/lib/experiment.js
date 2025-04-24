/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { cookieOpt, fireEvent, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if(VARIATION === '1' || VARIATION === '2') {
    const reviews = {
      'Beautiful and creamy, real flavour of strawberries': {
        product: 'Strawberry Cheesecake Batons',
        link: 'https://www.hotelchocolat.com/uk/310548.html',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwe1afd1ea/images/310548.jpg?sw=500&sh=500&sm=fit',
        text: 'These are just so morish I have to try not eat the whole lot in one go.',
        user: 'nickysss8'
      },
      'Stunning!': {
        product: 'Mint Batons',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwffa1f4e5/images/310547.jpg?sw=500&sh=500&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/310547.html',
        text: "I'm not usually over fond of mint chocolate but purchased these after tasting a dark mint chocolate in a selection box of Hotel Chocs. They were fabulous. I am now a convert to dark mint chocs (but only from Hotel Chocolat)",
        user: 'wal46'
      },
      'Delicious!': {
        product: 'Peanut Butter Batons',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwfe82348d/images/310545.jpg?sw=500&sh=500&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/310545.html',
        text: 'Absolutely delish! Smooth and creamy. Love the rich but subtle taste of the peanut butter. Now one of my favourites!',
        user: 'Lucy18'
      },
      'Bites of heaven': {
        product: 'Caramel Cheesecake Macarons',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwcb789249/images/112173.jpg?sw=500&sh=500&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/112173.html',
        text: 'These are simply divine - cheesecake filling between chocolate? inspired. Small but mighty highly recommended',
        user: 'hannahrose'
      },
      'Simply divine!': {
        product: 'Raspberry Macarons',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwe4c8d4b6/images/112079.jpg?sw=500&sh=500&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/112079.html',
        text: 'These were SO good. Delicious chocolate and a lovely soft raspberry whip. Melted in the mouth. Lovely real raspberry flavour, sweet, light and whippy',
        user: 'Victoria B'
      },
    }

    const reviewCarousel = () => {
      const heroReviews = document.createElement('div');
      heroReviews.classList.add(`${ID}-reviewCarousel`);
      heroReviews.innerHTML = `
      <div class="${ID}-container">
        <div class="${ID}-reviews"></div>
      </div>`;

      if(VARIATION === '1') {
        document.querySelector('.craigsmaincontainer .carousel-container').insertAdjacentElement('afterend', heroReviews);
      } else if(VARIATION === '2') {
        document.querySelector('#main .fullwidth-image').insertAdjacentElement('afterend', heroReviews);
        
      }


      // add reviews

      Object.keys(reviews).forEach((i) => {
        const data = reviews[i];
        const review = document.createElement('div');
        review.classList.add(`${ID}-review`);

        if(VARIATION === '1') {
          review.innerHTML = `
          <div class="${ID}-stars"></div>
          <h3>${[i][0]}</h3>
          <p>${data.text}</p>
          <span>- ${data.user}</span>`;
        }

        if(VARIATION === '2') {
          review.innerHTML = `
          <a href="${data.link}">
          <div class="${ID}-image" style="background-image:url(${data.image})"></div>
          <div class="${ID}-reviewInfo">
            <div class="${ID}-stars"></div>
            <h3>${[i][0]}</h3>
            <p>"${data.text}"</p>
            <span>${data.user}</span>
          </div>
          </a>`;
        }

        document.querySelector(`.${ID}-reviews`).appendChild(review);
      });
    }

    reviewCarousel();

    const slickCarousel = () => {
      if(VARIATION === '1') {
          window.jQuery(`.${ID}-reviews`).slick({
            infinite: true,
            arrows: true,
            slidesToShow: 1,
           // adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 5000,
            mobileFirst: true,
            responsive: [
              {
                breakpoint: 1023,
                settings: {
                  adaptiveHeight: false,
                }
              },
            ]
          });
      } else if(VARIATION === '2') {
        window.jQuery(`.${ID}-reviews`).slick({
          infinite: true,
          arrows: true,
          slidesToShow: 1,
         //adaptiveHeight: true,
          autoplay: true,
          autoplaySpeed: 5000,
          mobileFirst: true,
          responsive: [
            {
              breakpoint: 1279,
              settings: {
                slidesToShow: 3,
                autoplay: true,
                autoplaySpeed: 5000,
              }
            },
            {
              breakpoint: 1023,
              settings: {
                autoplay: true,
                autoplaySpeed: 5000,
                slidesToShow: 2
              }
            },
            {
              breakpoint: 767,
              settings: {
              slidesToShow: 1,
              autoplay: true,
              autoplaySpeed: 5000,
              adaptiveHeight: false,
              }
            },
          ]
        });
      }
    }

    const clickEvents = () => {
      const carouselReview = document.querySelectorAll(`.${ID}-reviewCarousel .${ID}-reviews .${ID}-review`);
      if(carouselReview) {
        for (let index = 0; index < carouselReview.length; index += 1) {
          const element = carouselReview[index];
          element.addEventListener('click', () => {
            fireEvent('Clicked Carousel Review');
          });
        }
      }
    }

    slickCarousel();
    clickEvents();
  }

};
