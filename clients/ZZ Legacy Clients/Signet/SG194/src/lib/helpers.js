
import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID } = shared;

export const carouselContent = (data, section) => {
  
    // Add the new slides
    Object.keys(data).forEach((i) => {
        const el = data[i];

        const slide = document.createElement('div');
        slide.className = `${ID}-slide swiper-slide`;
        slide.innerHTML = `
        <a href="${el.link}"></a>
        <div class="${ID}-image" style="background-image:url(${el.image})"></div>
        <div class="${ID}-info">
         ${el.title ? `<h3>${el.title}</h3>` : ''} 
         ${el.text ? `<p>${el.text}</p>` : ''} 
         <a class="${ID}-cta" href="${el.link}">${el.linkText}</a>
        </div>`;

       section.appendChild(slide);
    });  
}


export const initCarousel = (carousel, paginationEl, nextArr, prevArr, centered, isStory, looped) => {

    var swiper = new Swiper(carousel, {
        direction: 'horizontal',
        loop: window.innerWidth >= 640 ? looped : true,
        slidesPerView: 1.3,
        centeredSlides: window.innerWidth >= 640 ? false : centered,
        spaceBetween: 8,
        observer: true,  
        centerMode: true,
        observeParents: true,
        pagination: {
            el: paginationEl,
            clickable: true
        },
        navigation: {
           nextEl: nextArr,
           prevEl: prevArr,
           clickable: true
        },

        breakpoints: {
            // when window width is >= 320px
            320: {
              slidesPerView: 1.3,
              spaceBetween: 8
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 1.5,
                spaceBetween: 10
            },
            // when window width is >= 640px
            640: {
                slidesPerView: isStory == true ? 1.05 : 2.5,
                spaceBetween: 10,
                centerMode: false,
            },
            1023: {
                slidesPerView: isStory == true ? 1.05 : 3.5,
                spaceBetween: 10,
                centerMode: false,
            },
            1200: {
                slidesPerView: isStory == true ? 1.05 : 4.5,
                spaceBetween: 10,
                centerMode: false,
            },
            1500: {
                slidesPerView: isStory == true ? 1.05 : 5,
                spaceBetween: 10,
                centerMode: false,
            }
          }
        
    });
    
}

let contentSwiper = window.Swiper;
let init = false;
export const contentSwiperMode = () => {
    let mobile = window.matchMedia('(min-width: 0px) and (max-width: 639px)');
    let tablet = window.matchMedia('(min-width: 640px) and (max-width: 1024px)');
    let desktop = window.matchMedia('(min-width: 1025px)');

    

    // Enable (for mobile)
    if(mobile.matches) {
        if (!init) {
            init = true;
            contentSwiper = new Swiper(`.${ID}-content .${ID}-carousel`, {
                direction: 'horizontal',
                loop: false,
                slidesPerView: 1.5,
                centeredSlides: false,
                spaceBetween: 10,
                observer: true,  
                centerMode: true,
                observeParents: true,
            });
        }

    }

    // Disable (for tablet)
    else if(tablet.matches) {
        if(document.querySelector(`.${ID}-content .${ID}-carousel .swiper-slide.swiper-slide-active`)) {
            document.querySelector(`.${ID}-content .${ID}-carousel`).swiper.destroy(true,true)
        }
        init = false;
    }

    // Disable (for desktop)
    else if(desktop.matches) {
       
            if(document.querySelector(`.${ID}-content .${ID}-carousel .swiper-slide.swiper-slide-active`)) {
                document.querySelector(`.${ID}-content .${ID}-carousel`).swiper.destroy(true,true)
            }
        
        init = false;
    }
}

export const allTracking = () => {
    const mainBanner = document.querySelector(`.${ID}-banner .${ID}-cta`);
    mainBanner.addEventListener('click', () => {
        fireEvent('Clicked main banner');
    });

    const rangeLink = document.querySelector(`.${ID}-categories .${ID}-textLink`);
    rangeLink.addEventListener('click', () => {
        fireEvent('Clicked categories text link');
    });

    const allCategories = document.querySelectorAll(`.${ID}-categories .${ID}-slide`);
    for (let index = 0; index < allCategories.length; index++) {
        const element = allCategories[index];
        element.querySelector('a').addEventListener('click', () => {
            fireEvent('Clicked category');
        });
        element.querySelector(`.${ID}-cta`).addEventListener('click', () => {
            fireEvent('Clicked category');
        });   
    }

    const brandStory = document.querySelectorAll(`.${ID}-story .${ID}-slide`);
    for (let index = 0; index < brandStory.length; index++) {
        const element = brandStory[index];
        element.querySelector(`.${ID}-cta`).addEventListener('click', () => {
            fireEvent('Clicked brand story link');
        });   
    }

    const bestSellers = document.querySelectorAll(`.${ID}-bestSellers .${ID}-slide`);
    for (let index = 0; index < bestSellers.length; index++) {
        const element = bestSellers[index];
        element.querySelector('a').addEventListener('click', () => {
            fireEvent('Clicked best seller');
        });
        element.querySelector(`.${ID}-cta`).addEventListener('click', () => {
            fireEvent('Clicked best seller');
        });   
    }

    const ifcLinks = document.querySelectorAll(`.${ID}-ifc-banner .${ID}-cta`);
    for (let index = 0; index < ifcLinks.length; index++) {
        const element = ifcLinks[index];
        element.addEventListener('click', () => {
            fireEvent('Clicked ifc link');
        }); 
    }
    
}

