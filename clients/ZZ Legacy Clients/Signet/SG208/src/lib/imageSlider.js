/**
 * Re-create product slider
 */

import shared from "../../../../../core-files/shared";

export default () => {
  const { ID } = shared;

  const currentSliderImages = document.querySelectorAll(".product-gallery__image-container img");
  const carouselContainer = document.querySelector(`.${ID}-mainProductSlider .swiper-wrapper`);

  for (let index = 0; index < currentSliderImages.length; index += 1) {
    const elementImage = currentSliderImages[index];

    if (elementImage) {
      const sliderImage = document.createElement("div");
      sliderImage.classList.add(`${ID}__slide`);
      sliderImage.classList.add("swiper-slide");
      sliderImage.innerHTML = `<div class="image" style="background-image: url(${elementImage.getAttribute("src")})"></div>`;

      carouselContainer.appendChild(sliderImage);
    }
  }

  // make into a carousel
  if (document.querySelectorAll(".product-gallery__image-container img").length > 1) {
    const mySwiper = new Swiper(`.${ID}-mainProductSlider .swiper-container`, {
      direction: "horizontal",
      loop: true,
      observer: true,
      observeParents: true,
      pagination: {
        el: `.${ID}-mainProductSlider .${ID}-swiperPagination`,
        clickable: true,
      },
      navigation: {
        nextEl: `.${ID}-mainProductSlider .${ID}-swiperNext`,
        prevEl: `.${ID}-mainProductSlider .${ID}-swiperPrev`,
        clickable: true,
      },
    });

    if (mySwiper) {
      mySwiper.update();
      mySwiper.navigation.update();
    }
  } else {
    document.querySelector(`.${ID}-mainProductSlider .${ID}-swiperNext`).style.display = 'none';
  }
};
