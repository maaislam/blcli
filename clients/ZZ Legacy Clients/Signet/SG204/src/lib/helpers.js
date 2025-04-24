import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { banners } from "./data";

const { ID } = shared;

export const elTracking = (el, label) => {
    const allEls = document.querySelectorAll(el);
    for (let index = 0; index < allEls.length; index += 1) {
        const element = allEls[index];
        element.querySelector('a').addEventListener('click', () => {
            let name;
            if(element.querySelector('.text-large')) {
                name = element.querySelector('.text-large').textContent;
            } 
            else if(element.getAttribute('data-name')) {
                name = element.getAttribute('data-name');
            } else {
                name = '';
            }
            fireEvent('Clicked ' + label + ' ' +name);
        });
    }
}

/* Carousel slides for brand bar and categories  */
export const smallCarouselContent = (data, section) => {
  
    Object.keys(data).forEach((i) => {
        const el = data[i];

        const slide = document.createElement('div');
        slide.className = `${ID}-slide swiper-slide`;
        if(el.attr ? slide.setAttribute('data-name', el.attr) : '');
        slide.innerHTML = `
        <a href="${el.link}"></a>
        <div class="${ID}-image" style="background-image:url(${el.image})"></div>
        ${el.title ? `<p class="text-large">${el.title}</p>` : ''}`

       section.appendChild(slide);
    });  
}

/* Carousel for banners  */
export const bannerCarousel = () => {
    let bannerEl;

    if(window.innerWidth > 767) {
        bannerEl = `
        <div class="${ID}-slide swiper-slide">
            <a href="${banners.banner1.link}"></a>
            <div class="${ID}-image" style="background-image:url(${banners.banner1.image})">
                ${banners.banner1.text ? `<div class="${ID}-bannerText ${banners.banner1.sale == true ? `sale` : ''}">${banners.banner1.text}</div>` : ''}
            </div>
        </div>
        <div class="${ID}-slide swiper-slide">
            <a href="${banners.banner2.link}"></a>
            <div class="${ID}-image" style="background-image:url(${banners.banner2.image})">
                ${banners.banner2.text ? `<div class="${ID}-bannerText ${banners.banner2.sale == true ? `sale` : ''}">${banners.banner2.text}</div>` : ''}
            </div>
        </div>
        <div class="${ID}-slide swiper-slide">
            <a href="${banners.banner3.link}"></a>
            <div class="${ID}-image" style="background-image:url(${banners.banner3.image})">
                ${banners.banner3.text ? `<div class="${ID}-bannerText ${banners.banner3.sale == true ? `sale` : ''}">${banners.banner3.text}</div>` : ''}
            </div>
        </div>`
    } else {
        bannerEl = `
        <div class="${ID}-slide swiper-slide">
            <a href="${banners.banner2.link}"></a>
            <div class="${ID}-image" style="background-image:url(${banners.banner2.image})">
                ${banners.banner2.text ? `<div class="${ID}-bannerText ${banners.banner2.sale == true ? `sale` : ''}">${banners.banner2.text}</div>` : ''}
            </div>
        </div>
        <div class="${ID}-slide swiper-slide">
            <a href="${banners.banner1.link}"></a>
            <div class="${ID}-image" style="background-image:url(${banners.banner1.image})">
                ${banners.banner1.text ? `<div class="${ID}-bannerText ${banners.banner1.sale == true ? `sale` : ''}">${banners.banner1.text}</div>` : ''}
            </div>
        </div>
        <div class="${ID}-slide swiper-slide">
            <a href="${banners.banner3.link}"></a>
            <div class="${ID}-image" style="background-image:url(${banners.banner3.image})">
                ${banners.banner3.text ? `<div class="${ID}-bannerText ${banners.banner3.sale == true ? `sale` : ''}">${banners.banner3.text}</div>` : ''}
            </div>
        </div>`
    }
    
    return bannerEl;
}

/* Carousel for products */
export const productsCarousel = (data, section) => {
  
    Object.keys(data).forEach((i) => {
        const el = data[i];

        const slide = document.createElement('div');
        slide.className = `${ID}-slide swiper-slide ${ID}-product`;
        slide.innerHTML = `
        <a href="${el.link}"></a>
        <div class="${ID}-image" style="background-image:url(${el.image})"></div>
        <div class="${ID}-info">
            <h3 class="productName">${el.productName}</h3>
            ${el.wasPrice ? `<div class="${ID}-pricing"><p class="nowPrice">${el.nowPrice}</p><span class="wasPrice">${el.wasPrice}</span></div>` : `<p class="normalPrice">${el.price}</p>`}
        </div>
        <div class="${ID}-saleText">Save ${el.saving}</div>`

       section.appendChild(slide);
    });  
}

export const initCarousel = (carousel, mobileSlides, tabletSlides, desktopSlides, looped) => {

    var swiper = new Swiper(`${carousel} .${ID}-carousel`, {
        direction: 'horizontal',
        loop: looped,
        slidesPerView: mobileSlides,
        centeredSlides: false,
        spaceBetween: 10,
        observer: true,  
        centerMode: true,
        observeParents: true,
        navigation: {
           nextEl: `${carousel} .${ID}-swiperNext`,
           prevEl:  `${carousel} .${ID}-swiperPrev`,
           clickable: true
        },
       breakpoints: {
                320: {
                  slidesPerView: mobileSlides,
                  spaceBetween: 10
                },
                480: {
                    slidesPerView: mobileSlides,
                    spaceBetween: 10
                },
                640: {
                    slidesPerView: tabletSlides,
                    spaceBetween: 20
                    
                },
                1020: {
                    slidesPerView: desktopSlides,
                    spaceBetween: 20
                },
                1200: {
                    slidesPerView: desktopSlides,
                    spaceBetween: 20
                },
                1500: {
                    slidesPerView: desktopSlides,
                    spaceBetween: 20
                }
        }
        
    });

}

export const bannerCarouselSwiper = () => {

    if(window.innerWidth > 767) {

        var swiper = new Swiper(`.${ID}-banners .${ID}-carousel`, {
            direction: 'horizontal',
            loop: false,
            slidesPerView: 1,
            centeredSlides: false,
            spaceBetween: 10,
            observer: true,  
            centerMode: true,
            observeParents: true,
            navigation: {
            nextEl: `.${ID}-banners .${ID}-swiperNext`,
            prevEl:  `.${ID}-banners .${ID}-swiperPrev`,
            clickable: true
            },
            breakpoints: {
                320: {
                slidesPerView: 1,
                spaceBetween: 10
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                640: {
                    slidesPerView: 3,
                    spaceBetween: 20
                    
                },
                1020: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1500: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            }
            
        });
    } else {
        console.log('here')
        var swiper = new Swiper(`.${ID}-banners .${ID}-carousel`, {
            direction: 'horizontal',
            loop: true,
            slidesPerView: 1,
            centeredSlides: false,
            spaceBetween: 10,
            observer: true,  
            centerMode: true,
            observeParents: true,
            navigation: {
                nextEl: `.${ID}-banners .${ID}-swiperNext`,
                prevEl:  `.${ID}-banners .${ID}-swiperPrev`,
                clickable: true
            },
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                320: {
                slidesPerView: 1,
                spaceBetween: 10
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                640: {
                    slidesPerView: 3,
                    spaceBetween: 20
                    
                },
                1020: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1500: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            }
            
        });
    }
}

export const uspSwiper = () => {
    let mobile = window.matchMedia('(min-width: 0px) and (max-width: 639px)');
        let tablet = window.matchMedia('(min-width: 640px) and (max-width: 1023px)');
        let desktop = window.matchMedia('(min-width: 1024px)');
        let init = false;

        // Enable (for mobile)
        if(mobile.matches || tablet.matches) {
            if (!init) {
                init = true;
                var swiper = new Swiper(`.${ID}-usps .${ID}-carousel`, {
                    direction: 'horizontal',
                    loop: true,
                    slidesPerView: 1,
                    centeredSlides: false,
                    spaceBetween: 10,
                    observer: true,  
                    centerMode: true,
                    observeParents: true,
        
                    autoplay: {
                        delay: 5000,
                    },
                    breakpoints: {
                        320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                        },
                        480: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20
                            
                        },
                        1023: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        1500: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        }
                    }
                });
            }

        }
        // Disable (for desktop)
        else if(desktop.matches) {
            if(document.querySelector(`.${ID}-usps .swiper-slide.swiper-slide-active`)) {
                document.querySelector(`.${ID}-usps .${ID}-container`).swiper.destroy(true,true)
            }
            
            init = false;
        }
        


        
}