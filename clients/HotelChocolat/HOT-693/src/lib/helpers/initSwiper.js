import { fireEvent } from '../../../../../../core-files/services';

const initSwiper = (container) => {
  const swiperConfig = {
    effect: 'coverflow',
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    observer: true,
    coverflowEffect: {
      rotate: 0,
      scale: 0.8,
      stretch: 80,
      depth: 180,
      modifier: 0.7,
      slideShadows: false,
    },

    //Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  const swiper = new window.Swiper(`${container}`, swiperConfig);

  window.swiper = swiper;
  const updateSlideClasses = () => {
    const slides = swiper.slides;
    const activeIndex = swiper.activeIndex;
    const totalSlides = slides.length;

    // Remove custom classes from all slides
    slides.forEach((slide) => {
      slide.className = slide.className.replace(/slide-before-active--\d+/g, '');
      slide.className = slide.className.replace(/slide-after-active--\d+/g, '');
    });

    // Add custom classes to all slides before the active slide
    for (let i = 1; i <= activeIndex; i++) {
      const index = activeIndex - i;
      if (index >= 0) {
        slides[index].classList.add(`slide-before-active--${i}`);
      }
    }

    // Handle loop case (slides before active in the loop)
    if (swiper.params.loop) {
      for (let i = 1; i < totalSlides - activeIndex; i++) {
        const index = totalSlides - i;
        if (index >= activeIndex) {
          slides[index].classList.add(`slide-before-active--${i}`);
        }
      }
    }

    // Add custom classes to all slides after the active slide
    for (let i = 1; i < totalSlides - activeIndex; i++) {
      const index = (activeIndex + i) % totalSlides;
      slides[index].classList.add(`slide-after-active--${i}`);
    }
  };

  // Initial update
  updateSlideClasses();

  swiper.on('slideChange', function () {
    fireEvent('User interacts with the new chocolate " menu " element');
    //fireEvent('User scrolls through the brand filters.');
    updateSlideClasses();
  });
};

export default initSwiper;
