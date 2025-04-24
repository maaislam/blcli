import shared from "../../../../../../core-files/shared";

/**
 * Other watches
 */

 
 const { ID } = shared;
 
 export default () => {
     
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

            document.querySelector(`.${ID}__range .swiper-wrapper`).appendChild(newProduct);
        }
    }
     
 
    const watchesSwiper = new Swiper (`.${ID}__range .swiper-container`, {
        direction: 'horizontal',
        loop: true,
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 5,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: `.${ID}__range .swiper-button-next.${ID}__slide_next`,
            prevEl: `.${ID}__range .swiper-button-prev.${ID}__slide_prev`,
        },
        breakpoints: {
            320: {
                slidesPerView: 1.8,
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
   
 