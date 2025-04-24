/**
 * Re-create product slider
 */

import shared from "../../../../../../core-files/shared";


 export default () => {
   
     const { ID } = shared; 
 
     const currentSliderImages = document.querySelectorAll('.product-gallery .product-gallery__thumbs-container img');
     const carouselContainer = document.querySelector(`.${ID}-mainProductSlider .swiper-wrapper`);
 
     for (let index = 0; index < currentSliderImages.length; index += 1) {
         const elementImage = currentSliderImages[index];
         
         if(elementImage) {
             const sliderImage = document.createElement('div');
             sliderImage.classList.add(`${ID}__slide`);
             sliderImage.classList.add('swiper-slide');
             sliderImage.innerHTML = `<img src="${elementImage.getAttribute('src')}"/>`
            
             carouselContainer.appendChild(sliderImage);
         }
     }
    
 }