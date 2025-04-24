import shared from '../../../../../../core-files/shared';
import { setup, bootsEvents, fireBootsEvent } from '../../../../../../core-files/services';
import eventTypes from '../eventTypes';
import actionTypes from '../actionTypes';
import elementTypes from '../elementTypes';

const { ID } = shared;

const initSwiper = (container) => {
  const slider = new window.Swiper(`${container}`, {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 20,
    observer: true,
    navigation: {
      nextEl: `.${ID}-product-recs-container .${ID}-product-recs-swiper-button-next`,
      prevEl: `.${ID}-product-recs-container .${ID}-product-recs-swiper-button-prev`,
    },
    scrollbar: {
      el: `.${ID}-product-recs-swiper-scrollbar`,
      draggable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 2.4,
        slidesPerGroup: 1,
        spaceBetween: 10,
      },
      500: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
      },
    },
  });
  window.slider = slider;

  window.slider.on('slideChange', (event) => {
    const { activeIndex } = event;
    //fire tracking for product positions in the carousel
    const personalisedProducts = document.querySelectorAll(`.${ID}-personalised--product`);
    personalisedProducts.forEach((product, index) => {
      const productName = product.querySelector('h4').innerText;
      const positionInCarousel = index + 1;
      if (activeIndex !== index) return;
      fireBootsEvent('User views product in carousel', true, eventTypes.experience_action, {
        action: actionTypes.view_product,
        action_detail: `Product ${productName} in pos ${positionInCarousel}, ${positionInCarousel + 1} & ${
          positionInCarousel + 2
        } in carousel`,
      });
    });
  });

  window.slider.on('click', (swiper, event) => {
    const { target } = event;
    if (
      target.closest(`#oct-basket .${ID}-personalised--product--link`) &&
      !target.closest(`.${ID}-personalised--product--add`)
    ) {
      const productName = event.target.closest(`.${ID}-personalised--product`).querySelector('h4').innerText;
      fireBootsEvent('', true, eventTypes.experience_action, {
        action: actionTypes.view_product,
        action_detail: `User has clicked on the View Product for ${productName}`,
      });
    } else if (
      target.classList.contains(`${ID}-personalised--product--rating`) ||
      target.closest(`.${ID}-personalised--product--rating`)
    ) {
      const productName = target.closest(`.${ID}-personalised--product`).querySelector('h4').innerText;
      fireBootsEvent('', true, eventTypes.experience_action, {
        action: actionTypes.click_pdp_product_rating,
        action_detail: `User has clicked on the product rating for ${productName}`,
      });
    }
  });
};

export default initSwiper;
