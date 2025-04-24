const ddslider = (() => {

  /**
   * Autoplay cycle delay
   */
  const autoplayDelay = 4000;

  /**
   * Duration of transition between slides
   */
  const animDuration = 300;

  /**
   * Num frames that elapse during animDuration time
   */
  const animFrames = 60 * animDuration / 1000;

  /**
   * Reference to current active slides animation, null when finished
   */
  let mainSlidesAnimationId = null;

  /**
   * Reference autoplay interval
   */
  let autoplayInterval = null;

  /**
   * Cur slide ref
   */
  let curSlide = 0;

  /**
   * Reference to active slide non-zero based on order defined.. {1,2,3,4,...}
   */
  let activeSlide = 1;

  /**
   * @desc Set up backgroiund slides
   */
  const initBackgrounds = (bgSlides) => {
    const slides = bgSlides.children;
    [].forEach.call(slides, (slide, idx) => {
      slide.dataset['tg23idx'] = idx + 1;
      // Reverse order of slides (first = last for natural z-index)
      bgSlides.insertAdjacentElement('afterbegin', slide);
    });
  };

  /**
   * @desc Init slides duplicate for infinite slide and init
   */
  const initSlides = (mainSlides) => {
    const slides = mainSlides.children;  
    const slideClone = slides[slides.length - 1].cloneNode(true);

    mainSlides.insertAdjacentElement('afterbegin', slideClone);

    slideClone.style['margin-left'] = '-100%';
  };

  /**
   * @desc Helper animate background to next slide
   * @param {Node} bgSlides Main bg sliders wrapper
   */
  const animateBackground = (bgSlides, slideToShow) => {
    const slides = bgSlides.children;
    const numSlides = slides.length;

    let whichSlideNext = slideToShow;
    if(whichSlideNext == 0) {
      whichSlideNext = numSlides;
    } else if(whichSlideNext > numSlides) {
      whichSlideNext = 1;
    }
    
    const lastSlide = slides[numSlides - 1];
    const lastSlideIndex = parseInt(lastSlide.dataset['tg23idx'], 10);
    if(lastSlideIndex == whichSlideNext) {
      return;
    }

    const nextSlide = bgSlides.querySelector('[data-tg23idx="' + whichSlideNext + '"]');
    lastSlide.insertAdjacentElement('beforebegin', nextSlide);

    lastSlide.classList.add('tg23-slider__slide--goingout');
    nextSlide.classList.add('tg23-slider__slide--comingin');

    /**
     * @desc Helper when anim end set slider state
     */
    const animEnd = (e) => {
      const slides = bgSlides.children;
      const lastSlide = slides[slides.length - 1];
      const nextSlide = slides[slides.length - 2];

      if(lastSlide.classList.contains('tg23-slider__slide--goingout')) {
        lastSlide.classList.remove('tg23-slider__slide--goingout');
        nextSlide.classList.remove('tg23-slider__slide--comingin');

        bgSlides.insertAdjacentElement('afterbegin', lastSlide);
      }
    };

    [].forEach.call(slides, (slide) => {
      if(!slide.classList.contains('tg23-slider__slide--attached')) {
        slide.classList.add('tg23-slider__slide--attached');

        slide.addEventListener('webkitAnimationEnd', animEnd);
        slide.addEventListener('animationEnd', animEnd);
      }
    });
  };

  /**
   * @desc Transition the slides
   * @param {Node} mainSlides Main slides container
   * @param {int} to Zero-based index slide number refers to before-clone order
   */
  const animateSlide = (mainSlides, to, direction) => {
    if(mainSlidesAnimationId) {
      // One transition at a time...
      return;
    }

    const kids = mainSlides.children;
    const realNumSlides = kids.length - 1;

    if(to == realNumSlides) {
      // At end, reset go to zero
      to = 0;
    }

    if(to < -1) {
      to = Math.max(0, kids.length - 3);
    }

    const firstSlide = kids[0];
    const maxMargin = 100 * (kids.length - 1);
    const toMargin = 100 * (to + 1);
    let curMargin = Math.abs(parseInt(firstSlide.style['margin-left'], 10));

    // Fix instant reposition where we are at end of slider
    if(curMargin == 0 && direction == -1) {
      curMargin = maxMargin;

      firstSlide.style['margin-left'] = -curMargin + '%';
    } else if(curMargin == maxMargin && direction == 1) {
      curMargin = 0;

      firstSlide.style['margin-left'] = curMargin + '%';
    }

    if(curMargin == toMargin) {
      return;
    }

    const marginPerStep = (toMargin - curMargin) / animFrames;

    /**
     * Iteration step incremental margin
     *
     * To = 0 => -100
     * To = 1 => -200
     * To = 2 => -300
     * ...
     */
    const step = () => {
      let newMargin = -curMargin - marginPerStep;
      if( (marginPerStep > 0 && newMargin < -toMargin) || (marginPerStep < 0 && newMargin > -toMargin) ) {
        newMargin = -toMargin;
      }

      firstSlide.style['margin-left'] = newMargin + '%';
      curMargin = Math.abs(newMargin);

      if(newMargin == -toMargin) {
        // Current step is now equal to 'to'
        mainSlidesAnimationId = null;

        curSlide = to; // Helper just to reference 'to', direction-dependent

        activeSlide = newMargin == 0 ? realNumSlides : (Math.abs(newMargin) / 100);
        
        return;
      } else {
        mainSlidesAnimationId = requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  /**
   * Stop anim - clears autoplay interval
   */
  const stop = () => {
    clearInterval(autoplayInterval);
  };

  /**
   * @desc Associate elements with slider functionality and init
   */
  const init = (bgSlides, mainSlides, prevElm, nextElm, autoplay = true) => {
    initBackgrounds(bgSlides);
    initSlides(mainSlides);

    if(autoplay) {
      autoplayInterval = setInterval(() => {
        animateSlide(mainSlides, curSlide + 1, 1);
        animateBackground(bgSlides, activeSlide + 1);
      }, autoplayDelay);
    }

    if(prevElm && nextElm) {
      prevElm.addEventListener('click', () => {
          stop();

          animateSlide(mainSlides, curSlide - 1, -1);
          animateBackground(bgSlides, activeSlide - 1);
      });

      nextElm.addEventListener('click', () => {
          stop();

          animateSlide(mainSlides, curSlide + 1, 1);
          animateBackground(bgSlides, activeSlide + 1);
      });
    }
  };

  return {
    init: init,
    initBackgrounds: initBackgrounds,
    animateBackground: animateBackground,
  };
})();

export default ddslider;
