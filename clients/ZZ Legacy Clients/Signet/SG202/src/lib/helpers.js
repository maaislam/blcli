import shared from "../../../../../core-files/shared";

const { ID } = shared;


export const scrollToElement = (element) => {
  window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.getBoundingClientRect().top + window.scrollY,
  });
}

export const productCarousel = () => {
  const currentSliderImages = document.querySelectorAll(".product-gallery__image-container img");
  const carouselContainer = document.querySelector(`.${ID}-mainProductSlider .swiper-wrapper`);

  for (let index = 0; index < currentSliderImages.length; index += 1) {
    const elementImage = currentSliderImages[index];

    if (elementImage) {
      const sliderImage = document.createElement("div");
      sliderImage.classList.add(`${ID}__slide`);
      sliderImage.classList.add("swiper-slide");
      sliderImage.innerHTML = `<div class="${ID}-slideImg"><img src="${elementImage.getAttribute("src")}"/></div>`;
     // sliderImage.setAttribute('style', `background-image:url(${elementImage.getAttribute('src')}`);

      carouselContainer.appendChild(sliderImage);
    }
  }

  // if(document.querySelectorAll('.product-gallery__image-container img').length > 1) {

  //   const mySwiper = new Swiper(`.${ID}-mainProductSlider .swiper-container`, {
  //           direction: 'horizontal',
  //           loop: true,
  //           effect: 'fade',
  //           observer: true,
  //           observeParents: true,
  //           paginationClickable: true,
  //           navigation: {
  //               nextEl: `.${ID}-mainProductSlider .${ID}-swiperNext`,
  //               prevEl: `.${ID}-mainProductSlider .${ID}-swiperPrev`,
  //               clickable: true
  //           },

  //   });
  // }

  //     if(mySwiper) {
  //         mySwiper.update();
  //         mySwiper.navigation.update();
  //     }

  // } else {
  //     const mySwiper = new Swiper (`.${ID}-mainProductSlider .swiper-container`, {
  //         direction: 'horizontal',
  //         loop: false,
  //         observer: true,
  //         effect: 'fade',
  //         observeParents: true,
  //         paginationClickable: true,
  //         pagination: false,
  //         navigation: false,

  //     });
  //     if(document.querySelector(`.${ID}-mainProductSlider .${ID}-swiperNext.swiper-button-next`)) {
  //         document.querySelector(`.${ID}-mainProductSlider .${ID}-swiperNext.swiper-button-next`).remove();
  //         document.querySelector(`.${ID}-mainProductSlider .${ID}-swiperPrev.swiper-button-prev`).remove();
  //     }

  //     window.addEventListener('resize', () => {
  //         if(mySwiper) {
  //             mySwiper.update();
  //             mySwiper.navigation.update();
  //         }
  //     })
  // }
};

export const initCarousel = () => {
  const mySwiper = new Swiper(`.${ID}-mainProductSlider .swiper-container`, {
          direction: 'horizontal',
          loop: true,
          //effect: 'fade',
          observer: true,
          //observeParents: true,
          pagination: {
            el: `.${ID}-mainProductSlider .${ID}-swiperPagination`,
          },
          paginationClickable: true,
          navigation: {
              nextEl: `.${ID}-mainProductSlider .${ID}-swiperNext`,
              prevEl: `.${ID}-mainProductSlider .${ID}-swiperPrev`,
              clickable: true
          },

  });

  mySwiper.update();
}

export const addWarranty = () => {
  const warrantyOptions = document.querySelector("warranty-options");
  document.body.appendChild(warrantyOptions);
  const price = document.querySelector("warranty-options").shadowRoot.querySelector(".c-product-warranty-summary__starting-price").textContent;

  const warrantyHTML = `<section class="${ID}-insurance">
  <div class="${ID}__sectionContainer">
      <div class="${ID}__row">
          <div class="${ID}-image"></div>
          <div class="${ID}-textBlock">
              <div class="inner">
                  <h2>H Samuel Platinum Care</h2>
                  <p class="${ID}-bodyText">Few possessions mean as much to us as a watch or a special piece of jewellery. That’s why peace of mind is so important. With H Samuel Platinum Care, you’ll know that your valuable item is protected wherever you are in the world (limits and exclusions apply).</p>
                  <p class="${ID}-bodyText">Choose a 2,3 or 5 year Platinum Care policy which includes theft & accidental cover from only <b>${price}</b></p>
                  <div class="${ID}-ctas">
                      <a target="_blank" class="${ID}__button secondary">Learn More</a>
                  </div>
              </div>
          </div>
      </div>
  </div>
</section>
`;

  document.querySelector(`.${ID}-productDetails`).insertAdjacentHTML("afterend", warrantyHTML);

  document.querySelector(`.${ID}-insurance .${ID}__button`).addEventListener("click", () => {
    warrantyOptions.shadowRoot.querySelector(".c-product-warranty-summary__button-prompt").click();
  });

  // styling
  warrantyOptions.shadowRoot.querySelector(".c-product-warranty-summary").style = "display: none";
};


export const insuranceScroll = () => {
  const warrantyUSP = document.querySelector(`.${ID}-usp.${ID}-warranty p`);

  warrantyUSP.insertAdjacentHTML("beforeend", `<div class="${ID}-warrantyLink ${ID}-textLink">Extended warranty available</div>`);

  document.querySelector(`.${ID}-warrantyLink`).addEventListener("click", () => {
    scrollToElement(document.querySelector(`.${ID}-insurance`));
  });
};

export const openSlideTab = () => {
  const overlay =  document.querySelector(`.${ID}-overlay`);
  const slideOutEl = document.querySelector(`.${ID}-slideOutTab`);

  overlay.classList.add('active');
  slideOutEl.classList.add('active');
  slideOutEl.classList.remove('closed');
  //fireEvent('Clicked link ' + content);
  document.documentElement.classList.add('noScroll');
}

export const closeSlideTab = () => {
  const overlay =  document.querySelector(`.${ID}-overlay`);
  const slideOutEl = document.querySelector(`.${ID}-slideOutTab`);

  overlay.classList.remove('active');
  slideOutEl.classList.remove('active');
  slideOutEl.classList.add('closed');
  document.documentElement.classList.remove('noScroll');
}

export const stockRestyle = () => {
    const storeCheck = document.querySelector('collect-in-store');
   // change styling of shadow root on the stock
   const stockStyle = document.createElement('style');
   stockStyle.innerHTML = `
         .cis { 
          background: white; 
          padding: 0px;
          font-family: Montserrat,sans-serif;
        } 
         .cis-section-title { display: none }
         .cis-postcode-search__nearby input {
            border: 2px solid #9E9E9E;
            border-right: 0px;
            height: 48px;
            padding: 10px;
            box-sizing: border-box;
         }
         .cis-postcode-search .cis-postcode-search__nearby button { 
            background: #166D02;
            border-radius: 5px;
            background-image: url('https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/2ae3ffea-08dd-11ed-841e-4a166223d03e');
            background-repeat: no-repeat;
            background-position: center;
            background-size: 20px;
            width: 50px;
            height: 48px;
            margin-left: -5px;
         }
         .cis-postcode-search .cis-postcode-search__nearby button.t-red-btn {
          border:0px;
         }
 
         .cis {
           font-family: inherit;
         }
         .cis-bottom-wrapper__title {
           font-size: 12px;
         }
         .cis-bottom-wrapper__title strong {
           font-weight: 300;
 
         }
         .cis-bottom-section {
           margin-top: 15px;
         }
         .cis-postcode-search__my-location {
           margin-top: 15px;
         }
         .cis-postcode-search__my-location span svg {
           display: none
         }
         .cis-postcode-search__my-location span {
           background: url(https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5044B38A56E6C441402BB7D8743EC0A7DC46CBD647FF0EDB55C21B72C21B1187.png?meta=/SG080---In-Grid-Content-PLP-New/noun_Location_3639309.png) no-repeat center;
           background-size: contain;
           height: 20px;
           width: 20px;
           display: inline-block;
         }
         .cis-postcode-search__my-location button {
           font-family: inherit;
           margin-left: 0;
         }
         .cis-postcode-search .cis-postcode-search__nearby button:disabled {
           background-color: #D9D9D6;
         }
         .cis-postcode-search .cis-postcode-search__nearby button strong {
           display: none;
         }
         .cis-bottom-wrapper {
          display: none;
         }
         .cis-postcode-search__header p {
          font-size: 14px;
          font-family: Montserrat,sans-serif;
          color: #484849;
         }
         .cis-postcode-search__subheader b {
          font-size: 14px;
          font-weight: 300;
          font-family: Montserrat,sans-serif;
         }
         .cis-store-view--header svg {
          display: none;
         }
         .cis .cis-store-view--header h2 {
            margin-bottom: 10px;
            margin-left: 0px;
         }
         .cis-postcode {
          background: #f7f6f6;
          padding: 10px;
          margin-top: 10px;
         }
         .cis-postcode button { 
          font-family: Montserrat,sans-serif;
          font-size: 14px;
          color: #212721;
         }
         .cis-store-view__store-details {
          font-family: Montserrat,sans-serif;
          font-size: 14px;
          color: #212721;
         }
         .cis-store-view-address p {
          font-family: Montserrat,sans-serif;
          font-size: 14px;
          color: #484849;
         }
         .cis .cis-store-view {
          background: white;
          margin-bottom: 20px;
          padding: 0px;
         }
         .cis-store-view td {
          background: #F7F6F6;
          padding: 10px;
         }

         .cis-store-view__parent-table {
          border-collapse:separate; 
          border-spacing: 0 1em;
         }
         .cis .cis-store-view__select-store {
          width: auto;
          background: unset;
          border: unset;
          padding: 0px;
          margin: 0;
          color: #37A703;
         }
         .cis-store-view-footer__more-stores {
          height: 50px;
          text-align: center;
          line-height: 26px;
          margin: 0 auto;
          border: 2px solid;
          text-transform: uppercase;
          padding: 10px;
          box-sizing: border-box;
          border-radius: 5px;
          font-weight: 900;
          display: block;
          text-decoration: none;
          max-width: 250px;
          cursor: pointer;
          border-color: #166D02;
          background-color: white;
          color: #166D02;
         }
         .cis-store-view-footer__more-stores button {
          font-family: Montserrat,sans-serif;
          font-size: 16px;
          color: #166D02;
          text-transform: uppercase;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.3s ease-in-out;
         }

         .cis-store-view-footer__more-stores:hover {
          background-color: #166D02;
        }
        .cis-store-view-footer__more-stores:hover button{
          color: white;
        }
        @media(max-width: 1024px) {
          .cis .cis-store-view__inner-table tr td:last-child {
            display: flex;
            flex-direction: column;
            align-items: baseline;
            justify-content: flex-start;
            margin-left: 0;
          }
          .cis-store-view__inner-table tr td:last-child p {
            margin-top: 0px;
          }
        }
       `;

   storeCheck.shadowRoot.appendChild(stockStyle);
}
