import { pollerLite } from "../../../../../lib/utils";
import shared from "./shared"

// Other rings carousel, take data from see similar carousel
export default () => {
    const { ID } = shared;

        const otherMarkup = `
            <div class="${ID}-section ${ID}-moreRings">
            <h3>More like this</h3>
            <div class="${ID}-similarCarousel">
                <div class="swiper-container">
                    <div class="swiper-wrapper"></div>
                    <div class="swiper-pagination ${ID}-sliderPagination"></div>
                </div>
                <div class="${ID}-swiperArrow swiper-button-prev"></div>
                <div class="${ID}-swiperArrow swiper-button-next"></div>
            </div>
            </div>`;
            document.querySelector(`.${ID}-section.${ID}-articles`).insertAdjacentHTML('afterend', otherMarkup);
   
        const similarCarousel = document.querySelector('#similar_items-syte-slider-mw');
        
        const allSimilarProducts = similarCarousel.querySelectorAll('.syte-similar-items-item-container');
        for (let index = 0; index < allSimilarProducts.length; index += 1) {
            const element = allSimilarProducts[index];

            const productName = element.querySelector('.syte-similar-items-item-desc');
            const productImage = element.querySelector('.syte-tiny-slider-image').getAttribute('src');
            const wasProductPrice = element.querySelector('.syte-item-price-wrapper .was');
            const nowProductPrice = element.querySelector('.syte-item-price-wrapper .new-price');
            const noneSalePrice = element.querySelector('.syte-item-price-wrapper');
            const productLink = element.querySelector('.syte-similar-items-item').getAttribute('href');

            if(productName && productImage) {

                const newProduct = document.createElement('div');
                newProduct.classList.add(`${ID}-similarProduct`);
                newProduct.classList.add(`swiper-slide`);

                newProduct.innerHTML = `
                <a href="${productLink}"></a>
                <div class="${ID}-productImage" style="background-image:url(${productImage})"></div>
                <div class="${ID}-prodDetails">
                    <h4>${productName.textContent.trim()}</h4>
                    <div class="${ID}-prodPrice">
                        ${wasProductPrice ? `<p class="${ID}-price">${nowProductPrice.textContent.trim()}</p><span class="${ID}-wasPrice">${wasProductPrice.textContent.trim()}</span>` : `<p class="${ID}-price">${noneSalePrice.textContent.trim()}</p>`}
                    </div>
                </div>`;

                document.querySelector(`.${ID}-moreRings .swiper-wrapper`).appendChild(newProduct);
            }
        }

        // put in carousel 
        // make into a carousel 
        const mySwiper = new Swiper (`.${ID}-similarCarousel .swiper-container`, {
            direction: 'horizontal',
            loop: true,
            slidesPerView: 1,
            pagination: {
                el: `.${ID}-similarCarousel .swiper-pagination`,
            },
            navigation: {
                nextEl: `.${ID}-similarCarousel .swiper-button-next`,
                prevEl: `.${ID}-similarCarousel .swiper-button-prev`,
            },
            observer: true,  
            observeParents: true,
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
                    spaceBetween: 10,
                },
                1270: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                }
            },
        });
        

        if(mySwiper) {
            mySwiper.update();
            mySwiper.navigation.update();
        }

}