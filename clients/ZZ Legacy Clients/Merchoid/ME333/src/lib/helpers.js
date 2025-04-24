import Swiper, { Navigation } from "swiper";
import shared from "../../../../../core-files/shared";

const { ID,VARIATION } = shared;

export const initCarousel = (carousel) => {
    Swiper.use([Navigation]);

   // image carousel
    const swiper = new Swiper(carousel, {
        direction: 'horizontal',
        slidesPerView: 1.2,
        spaceBetween: 10,
        loop: false,
        observer: true,  
        arrows: false,
        observeParents: true,
        navigation: {
        nextEl: `.${ID}-swiperNext.swiper-button-next`,
        prevEl: `.${ID}-swiperPrev.swiper-button-prev`,
        clickable: true
        },
        breakpoints: {
            315: {
            slidesPerView: 1.2,
            },
            700: {
            slidesPerView: 3,
            },
            1024: {
            slidesPerView: 1.5,
            spaceBetween: 20,
            centeredSlides: false,
            arrows: true
            },
            1280: {
                slidesPerView: 2.3,
                spaceBetween: 30,
                centeredSlides: false,
                arrows: true
            }
        }
    });

    swiper.init();
    swiper.update();

    let init = false;
    function swiperMode() {
        let mobile = window.matchMedia('(min-width: 0px) and (max-width: 767px)');
        let tablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
        let desktop = window.matchMedia('(min-width: 1024px)');
    
        // Enable (for mobile)
        if(VARIATION === '3') {
            if(mobile.matches) {
                if(document.querySelector(`.${ID}-boxes .swiper-slide.swiper-slide-active`)) {
                    swiper.destroy();
                }
                init = false;
            }
        
            // Disable (for tablet)
            else if(tablet.matches) {
                if(document.querySelector(`.${ID}-boxes .swiper-slide.swiper-slide-active`)) {
                    swiper.destroy();
                }
                init = false;
            }
        
            // Disable (for desktop)
            else if(desktop.matches) {
                if(!init) {
                    const newSwiper = new Swiper(carousel, {
                        direction: 'horizontal',
                        slidesPerView: 1.2,
                        spaceBetween: 10,
                        loop: false,
                        observer: true,  
                        arrows: false,
                        observeParents: true,
                        navigation: {
                        nextEl: `.${ID}-swiperNext.swiper-button-next`,
                        prevEl: `.${ID}-swiperPrev.swiper-button-prev`,
                        clickable: true
                        },
                        breakpoints: {
                            315: {
                            slidesPerView: 1.2,
                            },
                            700: {
                            slidesPerView: 3,
                            },
                            1024: {
                            slidesPerView: 1.5,
                            spaceBetween: 20,
                            centeredSlides: false,
                            arrows: true
                            },
                            1280: {
                                slidesPerView: 2.3,
                                spaceBetween: 30,
                                centeredSlides: false,
                                arrows: true
                            }
                        }
                    });

                    newSwiper.init();
                    newSwiper.update();
                }
                init = false;
            }
        }
    }

    window.addEventListener('load', function() {
        swiperMode();
    });
    window.addEventListener('resize', function() {
        swiperMode();
    });
}