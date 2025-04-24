import shared from "../../../../../../core-files/shared";


export default () => {

    const { ID } = shared;

    const createSlider = () => {
        const allProducts = document.querySelectorAll('#syte-similar-items-container .syte-similar-items-item-container');

        for (let index = 0; index < allProducts.length; index += 1) {
            const element = allProducts[index];
            const newRec = document.createElement('div');
            newRec.classList.add('swiper-slide');
            newRec.classList.add(`${ID}-recSlide`);
    
            const elName = element.querySelector('.syte-similar-items-item-desc');
            const elPrice = element.querySelector('.syte-similar-items-item-price');
            const elImage = element.querySelector('.syte-similar-items-item img').getAttribute('src');
            const elLink = element.querySelector('.syte-similar-items-item').getAttribute('href');
    
            newRec.innerHTML = `<div class="${ID}-image" style="background-image:url(${elImage})"></div>
            <a href="${elLink}"></a>
            <div class="${ID}-info">
                <h4>${elName.textContent}</h4>
                <p>${elPrice.innerHTML}</p>
            </div>`;
    
            document.querySelector(`.${ID}-recProducts .swiper-wrapper`).appendChild(newRec);
        }
    }

    const initSlider = () => {
        
     var elSwiper = new Swiper(`.${ID}-recProducts.${ID}-swiper`, {
            direction: 'horizontal',
            loop: false,
            slidesPerView: 1.3,
            spaceBetween: 10,
            initialSlide : 0,
            observer: true,  
            observeParents: true,
            paginationClickable: true,
            scrollbar: {
                el: `.${ID}-recProducts .swiper-scrollbar`,
                draggable: true,
            },
    
            navigation: {
              nextEl: `.${ID}-recProducts .${ID}-swiperNext.swiper-button-next`,
              prevEl: `.${ID}-recProducts .${ID}-swiperPrev.swiper-button-prev`,
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
                    slidesPerView: 2.5,
                    spaceBetween: 10,
                    centerMode: false,
                },
                1023: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                    centerMode: false,
                    loop: true,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                    centerMode: false,
                },
                1500: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                    centerMode: false,
                }
              }
        });
    }

    createSlider();
    initSlider();
}