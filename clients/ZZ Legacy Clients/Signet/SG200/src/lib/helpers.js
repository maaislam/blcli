import shared from "../../../../../core-files/shared";

const { ID } = shared;

export const pageType = () => {
    const url = window.location.href;

    let type;

    if(url.indexOf('watches') > -1) {
        type = 'watches';
    }
    if(url.indexOf('engagement') > -1) {
        type = 'engagement';
    }
    if(url.indexOf('jewellery') > -1) {
        type = 'jewellery';
    }
    if(url.indexOf('diamonds') > -1) {
        type = 'diamonds';
    }

    return type;   
}

export const createCarousel = (el) => {


    let swiper;
 
 
     const initSlider = () => { 
         
 
          swiper = new Swiper(`${el} .${ID}-carousel`, {
           direction: "horizontal",
           loop: true,
           observer: true,
           observeParents: true,
           observeSlideChildren: true,
           slidesPerView: 1.5,
           spaceBetween: 10,
         
           breakpoints: {
             480: {
               slidesPerView: 1.5,
             },
             640: {
               slidesPerView: 2,
             },
             700: {
              slidesPerView: 2,
            },
             900: {
               slidesPerView: 2,
             },
             1280: {
               slidesPerView: 2,
               spaceBetween: 20,
             },
           },
           navigation: {
             loop: true,
             nextEl: `${el} .swiper-button-next`,
             prevEl: `${el} .swiper-button-prev`,
             clickable: true,
           },
           paginationClickable: true,
         });
 
         if (typeof swiper != 'undefined') {  
             swiper.init(); 
         }
     }
 
     let init = false;
     const contentSwiperMode = () => {
       
        let mobile = window.matchMedia('(min-width: 0px) and (max-width: 1023px)');
         let tablet = window.matchMedia('(min-width: 1024px) and (max-width: 1279px)');
         let desktop = window.matchMedia('(min-width: 1280px)');
      
             // Enable (for mobile)
             if(mobile.matches) {
 
                 const allSliders = document.querySelectorAll(`.${ID}-carousel`);
                 if(allSliders) {
                     for (let index = 0; index < allSliders.length; index++) {
                         const element = allSliders[index];
                         if(element.querySelector('.swiper-slide.swiper-slide-active')) {
                             element.swiper.destroy(true,true)
                         }
                     }
                 }
 
                 if(document.querySelector(`.${ID}-content .${ID}-carousel .swiper-slide.swiper-slide-active`)) {
                     document.querySelector(`.${ID}-content .${ID}-carousel`).swiper.destroy(true, false);
                 }
                 init = false;
             }
 
             // Disable (for tablet)
             else if(tablet.matches) {
                 if (!init) {
                     init = true;
                     initSlider();
                 }
             }
 
             // Disable (for desktop)
             else if(desktop.matches) {
             
                 if (!init) {
                     init = true;
                     initSlider();
                 }
             }
     }
 
    
     contentSwiperMode();

       window.addEventListener('resize', function() {
         contentSwiperMode();
       });
   
 }