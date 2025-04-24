/**
 * loop through current slider to get the images and create new one
 */

import shared from "../../shared";

export default () => {

    const { ID } = shared; 

    const currentSliderImages = document.querySelectorAll('.product-gallery__image-container img');
    const carouselContainer = document.querySelector(`.${ID}__mainProductSlider .swiper-wrapper`);

    for (let index = 0; index < currentSliderImages.length; index += 1) {
        const elementImage = currentSliderImages[index];
        
        if(elementImage) {
            const sliderImage = document.createElement('div');
            sliderImage.classList.add(`${ID}__slide`);
            sliderImage.classList.add('swiper-slide');
            
            sliderImage.innerHTML = ` 
            <div class="swiper-zoom-container">
                <img src="https://service.maxymiser.net/cm/images-us/1/1/2/A6F4A2ADFFE4898A8554CE4A764A5553CA1082081A8218F898B60F710FCB0447/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/transparent.png" class="swiper-zoom-target" style="background-image: url('${elementImage.getAttribute('src')}')"></>
            </div>`;
            carouselContainer.appendChild(sliderImage);
        }
    }


   // make into a carousel 
   if(document.querySelectorAll('.product-gallery__image-container img').length > 1) {

    const mySwiper = new Swiper (`.${ID}__mainProductSlider .swiper-container`, {
        direction: 'horizontal',
        loop: true,
        zoom: true,
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
        }
    } else {
        const mySwiper = new Swiper (`.${ID}__mainProductSlider .swiper-container`, {
            direction: 'horizontal',
            loop: false,
            zoom: true,
            effect: 'fade',
            observer: true,  
            observeParents: true,
            paginationClickable: true,
            pagination: false,
            navigation: false,
            
        });
       document.querySelector(`.${ID}__mainProductSlider .${ID}__swiperArrow.swiper-button-prev`).remove();
       document.querySelector(`.${ID}__mainProductSlider .${ID}__swiperArrow.swiper-button-next`).remove();
    }

    // move similiar
    const shopSimiliarButton = document.querySelector('.product-gallery__syte.js-syte-functionality');
    const topFlag = document.querySelector('.product-gallery__main-container .product-messages');
    if(shopSimiliarButton) {
        document.querySelector(`.${ID}__mainProductSlider`).appendChild(shopSimiliarButton);
    }
    if(topFlag) {
        document.querySelector(`.${ID}__mainProductSlider`).appendChild(topFlag);
    }
}