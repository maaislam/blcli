import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { socialData } from "./data"

const { ID } = shared;

// Add the new slides
export const carouselContent = (data) => {

    const carouselContainer = document.querySelector(`.${ID}-carouselModal .${ID}-modalInner .swiper-wrapper`);

    // clear carousel
    carouselContainer.innerHTML = '';

    let imageData;
    const url = window.location.href;

    if(url === 'https://www.boots.com/' || url.indexOf('https://www.boots.com/?') > -1) {
        imageData = socialData['home'][data].carousel;
    } else if(url.indexOf('/beauty') > -1) {
        imageData = socialData['beauty'][data].carousel;
    } else if(url.indexOf('/health-pharmacy') > -1) {
        imageData = socialData['health'][data].carousel;
    }

    // Add the new slides
   for (let index = 0; index < imageData.length; index++) {
       const element = imageData[index];

       const slide = 
       `<div class="${ID}-slide swiper-slide" style="background-image:url(${element.image}); background-size:${element.imageType};">
           <div class="${ID}-infoBar">
               <div class="${ID}-slideTitle">
                   <h4>${element.title}</h4>
                   ${element.text ? `<p>${element.text}</p>` : ''}
               </div>
               <a class="${ID}-slideLink" href="${element.link}">${element.linkText}</a>
           </div>
       </div>`;

       carouselContainer.insertAdjacentHTML('beforeend', slide);
   }
}

export const setCarouselTitle = (name, icon) => {
    const carouselTitle = document.querySelector(`.${ID}-socialTitle`);
    carouselTitle.innerHTML = `<span style="${icon}"></span><p>${name}</p>`;
}


// Carousel lightbox functions


const createCarousel = () => {

    Swiper.use([Navigation, Pagination, Autoplay, EffectFade]); 


    
    var swiper = new Swiper(`.${ID}-modalInner.${ID}-swiper`, {
        direction: 'horizontal',
        loop: true,
        speed: 1,
        initialSlide : 0,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        slidersPerView: 1,
        observer: true,  
        observeParents: true,
        paginationClickable: true,
        pagination: {
            el: `.${ID}-progessPagination`,
           clickable: true
        },
        navigation: {
           nextEl: `.${ID}-modalInner .${ID}-swiperNext.swiper-button-next`,
           prevEl: `.${ID}-modalInner .${ID}-swiperPrev.swiper-button-prev`,
           clickable: true
        },
    });

      

      if(document.querySelector(`.${ID}-slide`)) {
        swiper.init();

        if(window.innerWidth > 1024) {
            
            document.addEventListener('mouseenter', event => {
                const el = event.target;
                if (el && el.matches && el.matches('.swiper-wrapper')) {
                     el.parentNode.swiper.autoplay.stop();
                     el.parentNode.classList.add('swiper-paused');
                    }
            }, true);
            
            document.addEventListener('mouseleave', event => {
                const el = event.target;
                if (el && el.matches && el.matches('.swiper-wrapper')) {
                    el.parentNode.swiper.autoplay.start();
                    el.parentNode.classList.remove('swiper-paused');
                }
            }, true);

            setTimeout(()=> {
                document.querySelector(`.${ID}-modalInner.${ID}-swiper`).swiper.autoplay.start();
                document.querySelector(`.${ID}-modalInner.${ID}-swiper`).classList.remove('swiper-paused');
            }, 1000)
            
        }  

        // cta carousel events
        const carouselCTAs = document.querySelectorAll(`.${ID}-slideLink`);
        for (let index = 0; index < carouselCTAs.length; index++) {
            const element = carouselCTAs[index];
            element.addEventListener('click', () => {
                fireEvent('Clicked CTA in carousel');
            });
        }

        document.querySelector(`.${ID}-close`).addEventListener('click', () => {
            swiper.destroy(true, true);
        });
        
        document.querySelector(`.${ID}-overlay`).addEventListener('click', () => {
            swiper.destroy(true, true);
        });
        
     }
    
}

export const openCarousel = () => {
    const carouselLightbox = document.querySelector(`.${ID}-carouselModal`);
    const overLay = document.querySelector(`.${ID}-overlay`);

    carouselLightbox.classList.add(`${ID}-modalShow`);
    document.documentElement.classList.add(`${ID}-noScroll`);
    overLay.classList.add(`${ID}-overlayShow`);
    
    createCarousel();
}

export const closeCarousel = () => {
    const carouselLightbox = document.querySelector(`.${ID}-carouselModal`);
    const overLay = document.querySelector(`.${ID}-overlay`);
    
    carouselLightbox.classList.remove(`${ID}-modalShow`);
    document.documentElement.classList.remove(`${ID}-noScroll`);
    overLay.classList.remove(`${ID}-overlayShow`);

    
}

