/**
 * Create the new product carousel
 */

import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { getData } from "../../productData";

 
 export default () => {
 
    const { ID } = shared;
    
    const productSKU = window.digitalData.product[0].productInfo.masterSku;
    const productObj = getData(productSKU);

 
    const sliderImages = productObj.productImages;
 
    const carouselContainer = document.querySelector(`.${ID}__mainProductSlider .swiper-wrapper`);
 
    for (let index = 0; index < sliderImages.length; index += 1) {
       const element = sliderImages[index];
       const slide = document.createElement('div');
       slide.classList.add(`${ID}__slide`);
       slide.classList.add('swiper-slide');
       slide.setAttribute('style', `background-image:url(${element})`);
 
       carouselContainer.appendChild(slide);
    }
 
    // make into a carousel 
    const mySwiper = new Swiper (`.${ID}__mainProductSlider .swiper-container`, {
       direction: 'horizontal',
       loop: true,
       effect: 'fade',
       observer: true,  
       observeParents: true,
       paginationClickable: true,
       pagination: {
         el: '.swiper-pagination',
         clickable: true
       },
       navigation: {
          nextEl: `.${ID}__swiperArrow.swiper-button-next`,
          prevEl: `.${ID}__swiperArrow.swiper-button-prev`,
          clickable: true
        },
       
     });
 
    if(mySwiper) {
       mySwiper.update();
       mySwiper.navigation.update();
 
       mySwiper.on('slideChange', function () {
          fireEvent('Clicked through main images');
      });
    }
 
 }