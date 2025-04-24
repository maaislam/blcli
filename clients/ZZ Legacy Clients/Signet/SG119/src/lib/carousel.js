/**
 * loop through current slider to get the images and create new one
 */

import shared from "./shared";

export default () => {

    const { ID } = shared; 

    const getImages = () => {
        const images = document.querySelectorAll('.product-gallery__image-container img');

        const allImages = [];
        for (let index = 0; index < images.length; index += 1) {
            const elementImage = images[index];
            const elImage = elementImage.getAttribute('src');

           const imgMarkup = `<img src="https://service.maxymiser.net/cm/images-us/1/1/2/A6F4A2ADFFE4898A8554CE4A764A5553CA1082081A8218F898B60F710FCB0447/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/transparent.png" class="swiper-zoom-target" style="background-image: url('${elImage}')"></>`
        
           allImages.push(imgMarkup);
        }

        return allImages;
    }

    const createCarousel = (el, device) => {

        const imgs = getImages();

        let sliderMarkup;
        imgs.forEach(element => {

            if(device === 'mobile' || device === 'both') {
                sliderMarkup =  
                `<div class="${ID}__slide swiper-slide"
                    <div class="swiper-zoom-container">
                        ${element}
                    </div>
                </div>`;
            }

            if(device === 'desktop') {
                sliderMarkup =  
                `<div class="${ID}__slide swiper-slide"
                    ${element}
                </div>`;
            }
            
            el.insertAdjacentHTML('beforeend', sliderMarkup);
            
        });
        


    }

   
    
    const carouselContainer = document.querySelector(`.${ID}-mainCarousel .swiper-wrapper`);
    const ecomCarousel = document.querySelector(`.${ID}-topCarousel .swiper-wrapper`);

    // bottom carousel
    if(window.innerWidth <= 767) {
        createCarousel(carouselContainer, 'mobile');
    } else {
        createCarousel(carouselContainer, 'desktop');
    }

    // top carousel
    createCarousel(ecomCarousel, 'both');

   

    // add desktop animations
    if(window.innerWidth > 767) {
        const imageSlide = document.querySelectorAll(`.${ID}-mainCarousel .${ID}__slide`);
        imageSlide[0].setAttribute('data-aos', 'fade-right');
        imageSlide[1].setAttribute('data-aos', 'fade-right');
        imageSlide[2].setAttribute('data-aos', 'fade-left');
        imageSlide[3].setAttribute('data-aos', 'fade-left');
    }



    let swiper = window.Swiper;
    let init = false;
    function swiperMode() {
        let mobile = window.matchMedia('(min-width: 0px) and (max-width: 767px)');
        let tablet = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
        let desktop = window.matchMedia('(min-width: 1025px)');
    
        // Enable (for mobile)
        if(mobile.matches) {
            if (!init) {
                init = true;
                swiper = new Swiper (`.${ID}-mainCarousel .swiper-container`, {
                    direction: 'horizontal',
                    loop: true,
                    zoom: false,
                    effect: 'fade',
                    observer: true,  
                    observeParents: true,
                    paginationClickable: true,
                    // pagination: {
                    //   el: `${ID}-mainCarousel .swiper-pagination`,
                    //   clickable: true
                    // },
                    navigation: {
                       nextEl: `.${ID}-mainCarousel .${ID}-swiperArrow.swiper-button-next`,
                       prevEl: `.${ID}-mainCarousel .${ID}-swiperArrow.swiper-button-prev`,
                       clickable: true
                    },
                });
            }
    
        }
    
        // Disable (for tablet)
        else if(tablet.matches) {
            if(document.querySelector(`.${ID}-mainCarousel .swiper-slide.swiper-slide-active`)) {
                swiper.destroy();
            }
            init = false;
        }
    
        // Disable (for desktop)
        else if(desktop.matches) {
            if(document.querySelector(`.${ID}-mainCarousel .swiper-slide.swiper-slide-active`)) {
                swiper.destroy();
            }
            init = false;
        }
    }

    window.addEventListener('load', function() {
        swiperMode();
    });
    window.addEventListener('resize', function() {
        swiperMode();
    });


    // Swiper for ecom carousel
    new Swiper (`.${ID}-topCarousel .swiper-container`, {
        direction: 'horizontal',
        loop: true,
        zoom: false,
        effect: 'fade',
        observer: true,  
        observeParents: true,
        paginationClickable: true,
        pagination: {
          el: `.${ID}-topCarousel .swiper-pagination`,
          clickable: true
        },
        navigation: {
           nextEl: `.${ID}-topCarousel .${ID}-swiperArrow.swiper-button-next`,
           prevEl: `.${ID}-topCarousel .${ID}-swiperArrow.swiper-button-prev`,
           clickable: true
        },
    });
}