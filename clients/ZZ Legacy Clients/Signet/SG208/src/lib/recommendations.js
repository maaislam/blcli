import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

export default () => {
  const { ID, VARIATION } = shared;

  const createRecContainer = () => {
    const recommendations = `
            <div class="${ID}-recommendations">
                <div class="${ID}-sectionContainer">
                    <h3>More like this</h3>
                    <div class="${ID}-recProducts ${ID}-swiper swiper">
                        <div class="swiper-wrapper"></div>
                        <div class="${ID}-swiperScroll swiper-scrollbar"></div>
                    </div>
                    <div class="${ID}-arrows">
                        <div class="${ID}-swiperNext swiper-button-next"></div>
                        <div class="${ID}-swiperPrev swiper-button-prev"></div>
                    </div>
                </div>
            </div>`;

    if (window.innerWidth >= 1024) {
      document.querySelector(`.${ID}-col-right`).insertAdjacentHTML("beforeend", recommendations);
    } else {
      document.querySelector(`.${ID}-top .${ID}-row`).insertAdjacentHTML("afterend", recommendations);
    }
  };

  const createSlider = () => {
    if (VARIATION === "1") {
      const allProducts = document.querySelectorAll("#syte-similar-items-container .syte-similar-items-item-container");

      for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        const newRec = document.createElement("div");
        newRec.classList.add("swiper-slide");
        newRec.classList.add(`${ID}-recSlide`);

        const elName = element.querySelector(".syte-similar-items-item-desc");
        const elPrice = element.querySelector(".syte-similar-items-item-price");
        const elImage = element.querySelector(".syte-similar-items-item img").getAttribute("src");
        const elLink = element.querySelector(".syte-similar-items-item").getAttribute("href");

        newRec.innerHTML = `<div class="${ID}-image" style="background-image:url(${elImage})"></div>
              <a href="${elLink}"></a>
              <div class="${ID}-info">
                  <h4>${elName.textContent}</h4>
                  <h4 class="alternate">${elPrice.innerHTML}</h4>
              </div>`;

        document.querySelector(`.${ID}-recProducts .swiper-wrapper`).appendChild(newRec);
      }


      const allRecs = document.querySelectorAll(`.${ID}-recSlide`);
        for (let index = 0; index < allRecs.length; index++) {
          const element = allRecs[index];
          element.querySelector(`a`).addEventListener('click', () => {
            fireEvent('Clicked product recommendation');
          });
        }
    }

    if (VARIATION === "2" || VARIATION === '3') {
      let id;
      if (window.digitalData.page.category.primaryCategory === "Watches") {
        id = "615c07a194fb35d990816d7f";
      } else {
        id = "615c07fb0b7793779ebc8a50";
      }

      var recommendation_id = id;

      var RCM_STATUS = 0;
      // render items when loaded
      var onRecommendationsLoaded = function (data) {
        if (RCM_STATUS !== "TIMED_OUT") {
          RCM_STATUS = "LOADED";

          // render items ...
          if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              var item = data[i];

              if(i !== 0) {
                const newRec = document.createElement("div");
                newRec.classList.add("swiper-slide");
                newRec.classList.add(`${ID}-recSlide`);

                newRec.innerHTML = `<div class="${ID}-image" style="background-image:url(${item.image})"></div>
                        <a href="${item.url}"></a>
                        <div class="${ID}-info">
                            <h4>${item.title}</h4>
                            <h4 class="alternate">£${item.price}</h4>
                        </div>`;

                document.querySelector(`.${ID}-recProducts .swiper-wrapper`).appendChild(newRec);

                const allRecs = document.querySelectorAll(`.${ID}-recSlide`);
                for (let index = 0; index < allRecs.length; index++) {
                  const element = allRecs[index];
                  element.querySelector(`a`).addEventListener('click', () => {
                    fireEvent('Clicked product recommendation');
                  });
                }
              }
            }
          }
        }
      };

      // recommendations configuration
      var options = {
        recommendationId: recommendation_id,
        size: 10, // Specifies upper limit of the recommendations to return. Defaults to 10.
        callback: onRecommendationsLoaded,
        fillWithRandom: true, // If true, fills the recommendations with random items until size is reached. This is utilized when models cannot recommend enough items.
        // Optional parameters:
        catalogFilter: [], // Adds additional constrains to catalog when retrieving recommended items. Example: [{'property': 'gender', 'constraint': { 'type': 'string', 'operator': 'equals', 'operands': [{'type': 'constant', 'value': 'male'}]}}]
        catalogAttributesWhitelist: [], // Returns only specified attributes from catalog items. If empty or not set, returns everything.
      };
      // call recommedations
      window.exponea.getRecommendation(options);
    }
  };

  const initSlider = () => {
    var elSwiper = new Swiper(`.${ID}-recProducts.${ID}-swiper`, {
      direction: "horizontal",
      loop: false,
      slidesPerView: 1.3,
      spaceBetween: 10,
      initialSlide: 0,
      observer: true,
      observeParents: true,
      paginationClickable: true,
      scrollbar: {
        el: `.${ID}-recProducts .swiper-scrollbar`,
        draggable: true,
      },

      navigation: {
        nextEl: `.${ID}-recommendations .${ID}-swiperNext.swiper-button-next`,
        prevEl: `.${ID}-recommendations .${ID}-swiperPrev.swiper-button-prev`,
        clickable: true,
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1.3,
          spaceBetween: 8,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1.5,
          spaceBetween: 10,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 3.5,
          spaceBetween: 10,
          centerMode: false,
        },
        1023: {
          slidesPerView: 1.5,
          spaceBetween: 10,
          centerMode: false,
          arrows: true,
          loop: true,
        },
        1200: {
          slidesPerView: 1.5,
          spaceBetween: 10,
          centerMode: false,
        },
        1500: {
          slidesPerView: 2,
          spaceBetween: 10,
          centerMode: false,
        },
      },
    });

    elSwiper.update();
  };

  createRecContainer();
  createSlider();
  initSlider();
};
