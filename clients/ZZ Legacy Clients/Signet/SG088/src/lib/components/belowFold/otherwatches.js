import { pollerLite } from "../../../../../../../lib/utils";
import shared from "../../shared";

export default () => {
    const { ID } = shared; 
    
    const brandPage = document.querySelector('.product-specification__item .product-specification__detail a');
    
    let brandLink;

    /**
     * Pull in the top 6 products from the brand page
     */
    const pullInProducts = () => {
        const brandPage = document.querySelector('.product-specification__item .product-specification__detail a');
    
        const url = brandPage.getAttribute('href').split("|").slice(1).join("|").replace('/', '').replace(/\+/g, '-');
        
        // build URL based on gender
        if(url){
            if(window.location.href.indexOf('men') > -1) {
                brandLink = `https://www.hsamuel.co.uk/webstore/l/mens-${url}-watches`;
            } else if(window.location.href.indexOf('women') > -1 || window.location.href.indexOf('ladies') > -1 ) {
                brandLink = `https://www.hsamuel.co.uk/webstore/l/ladies-${url}-watches`;
            } else {
                brandLink = `https://www.hsamuel.co.uk/webstore/l/${url}-watches`;
            }
        }
        
    
       const request = new XMLHttpRequest();
        
        request.open('GET',brandLink, true);
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                const temp = document.createElement('html');
                temp.innerHTML = request.responseText;
                const items = temp.querySelectorAll('.items .product-tile-list .product-tile-list__item');
                const prodArr = Array.from(items);
                const firstEight = prodArr.slice(0,8);

                for (let index = 0; index < firstEight.length; index += 1) {
                    const element = firstEight[index];
                     // if the same product as PDP is pulled in, hide it
                     if(element.querySelector('.product-tile__description').textContent.trim() === document.querySelector('.product-name').textContent.trim()){
                        element.parentNode.removeChild(element);  
                    } else {

                        element.classList.add('swiper-slide');

                        // load image
                        const image = element.querySelector('.product-tile__image-container img');
                        image.setAttribute('src', image.getAttribute('data-src').replace('.webp', '.jpg'));

                        // add button
                        const elLink = element.querySelector('a').getAttribute('href');
                        element.insertAdjacentHTML('beforeend', `<a class="${ID}__button" href="${elLink}">Shop</a>`);

                        document.querySelector(`.${ID}__carousel .swiper-wrapper`).appendChild(element);     
                    }
                }
               
            }
          };
          request.send();
    }

    const productsSwiper = () => {
         // put products in carousel 
    const mySwiper = new Swiper (`.${ID}__otherWatches .swiper-container`, {
        direction: 'horizontal',
            loop: true,
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 5,
           
            navigation: {
                nextEl: `.${ID}__otherWatches .swiper-button-next.${ID}__swiperArrow`,
                prevEl: `.${ID}__otherWatches .swiper-button-prev.${ID}__swiperArrow`,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                }
            },
            observer: true,  
            observeParents: true,
        });
    }
   
    
    
    if(brandPage) {
        pullInProducts();
        pollerLite(['.product-tile.js-product-item'], () => {
            //productsSwiper();
            const watchSwiper = new Swiper (`.${ID}__otherWatches .swiper-container`, {
                direction: 'horizontal',
                    loop: true,
                   
                    navigation: {
                        nextEl: `.${ID}__otherWatches .${ID}__swiperArrow.swiper-button-next`,
                        prevEl: `.${ID}__otherWatches .swiper-button-prev.${ID}__swiperArrow`,
                    },
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 5,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 5,
                        }
                    },
                    observer: true,  
                    observeParents: true,
                });
                watchSwiper.update();
        });
       
    }
}