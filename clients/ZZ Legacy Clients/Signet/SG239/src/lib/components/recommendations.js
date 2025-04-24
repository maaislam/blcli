import shared from "../../../../../../core-files/shared";


export default () => {

    const { ID, VARIATION } = shared;

    const recContainer = () => {
      const recs = document.createElement('section');
      recs.classList.add(`${ID}-recommendations`);
      recs.innerHTML = `
      <div class="${ID}__sectionContainer">
          <h2>More like this</h2>
            <div class="${ID}-recProducts ${ID}-swiper swiper">
              <div class="swiper-wrapper"></div>
            </div>
            <div class="${ID}-swiperNext swiper-button-next"></div>
            <div class="${ID}-swiperPrev swiper-button-prev"></div>
            <div class="${ID}-swiperPagination swiper-pagination"></div>
      </div>`;

      if(VARIATION === '1') {
        document.querySelector(`.${ID}-articles`).insertAdjacentElement('afterend', recs);
      } else if(VARIATION === '2') {
        document.querySelector(`.${ID}-quote`).insertAdjacentElement('afterend', recs);
      }
  }

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
            loop: true,
            slidesPerView: 1.3,
            spaceBetween: 10,
            initialSlide : 0,
            observer: true,  
            observeParents: true,
            pagination: {
                el: `.${ID}-recommendations .swiper-pagination`,
                clickable: true
              },
           
            // scrollbar: {
            //     el: `.${ID}-recProducts .swiper-scrollbar`,
            //     draggable: true,
            // },
    
            navigation: {
              nextEl: `.${ID}-recommendations .${ID}-swiperNext.swiper-button-next`,
              prevEl: `.${ID}-recommendations .${ID}-swiperPrev.swiper-button-prev`,
              clickable: true
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                  slidesPerView: 1.3,
                  spaceBetween: 8,
                  slidesPerGroup: 1.3,
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                    slidesPerGroup: 1.5,
                },
                // when window width is >= 640px
                640: {
                    slidesPerView: 2.5,
                    spaceBetween: 10,
                    centerMode: false,
                    slidesPerGroup: 2.5,
                },
                1023: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                    centerMode: false,
                    loop: true,
                    slidesPerGroup: 3,
                },
                1200: {
                    slidesPerGroup: 4,
                    slidesPerView: 4,
                    spaceBetween: 10,
                    centerMode: false,
                },
                1500: {
                    slidesPerGroup: 4,
                    slidesPerView: 4,
                    spaceBetween: 10,
                    centerMode: false,
                }
              }
        });
    }
    recContainer();
    createSlider();
    initSlider();
}