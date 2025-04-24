import Swiper from 'swiper/swiper-bundle';
import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { socialData } from "./data";

const { ID } = shared;

//Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);
// Add the new slides
export const carouselContent = (data) => {
  const carouselContainer = document.querySelector(`.${ID}-carouselModal .${ID}-modalInner .swiper-wrapper`);

  // clear carousel
  carouselContainer.innerHTML = "";

  let imageData = socialData[data].carousel;
  const url = window.location.href;

  if(document.querySelector(`.${ID}-socialTitle`)) {
    setCarouselTitle(data);
  }

  for (let index = 0; index < imageData.length; index++) {
    const element = imageData[index];

    const slide = `<div class="${ID}-slide swiper-slide" ${element.image ? `style="background-image:url(${element.image});"` : ""}>
        ${
          element.video
            ? `
        <div class="video-container">
            <video autoplay muted loop playsinline>
                <source src="${element.video}" type="video/mp4" />
            </video>
        </div>`
            : ""
        }
           <div class="${ID}-infoBar">
               <div class="${ID}-slideTitle">
                    ${
                      element.productName
                        ? `<div class="${ID}-prodInfo">
                            <h3>${element.productName}</h3>
                            <div class="${ID}-pricing">
                                ${element.wasPrice ? `<span class="now">${element.nowPrice}</span><span class="was">${element.wasPrice}</span>` : `<span class="now">${element.nowPrice}</span>`}
                            </div>
                        </div>`
                        : `<span>${element.title}</span><p>${element.text}</p>`
                    }
               </div>
               <a class="${ID}-cta primary" href="${element.link}">${element.linkText}</a>
           </div>
       </div>`;

    carouselContainer.insertAdjacentHTML("beforeend", slide);
  }

  carouselContainer.insertAdjacentHTML('beforeend', `
    <div class="${ID}-slide swiper-slide">
        <div class="${ID}-brandSlide">
          <h3>You've reached the end of the <span>${data}</span> story</h3>
          <div class="${ID}-ctas">
          <a class="${ID}-cta primary" href="${socialData[data].brandLink}">Shop all ${data}</a>
          <a class="${ID}-cta secondary" href="/brands">View all brands</a>
        </div>
    </div>`);
};

export const bestSellersContent = (brandData) => {
  const bestSellersContainer = document.querySelector(`.${ID}-carouselModal .${ID}-bestSellers .swiper-wrapper`);

  if(brandData === 'No7') {
    document.querySelector(`.${ID}-carouselModal`).classList.add('no7');
  } else {
    document.querySelector(`.${ID}-carouselModal`).classList.remove('no7');
  }

  if(socialData[brandData].bestSellersContent) {
    bestSellersContainer.innerHTML = "";

    return new Promise((resolve, reject) => {
      const items = socialData[brandData].bestSellersContent;

      for (let index = 0; index < items.length; index += 1) {
        const element = items[index];

        const name = element.name;
        const link = element.link;
        const sku = element.sku;
        const img = `https://boots.scene7.com/is/image/Boots/${sku}?wid=300&hei=300&op_sharpen=1`;

        const slide = document.createElement("div");
        slide.className = `${ID}-slide swiper-slide`;
        slide.innerHTML = `<a href="${link}"></a>
              <div class="${ID}-image" style="background-image:url(${img})"></div>
              <h3>${name}</h3>
              <a class="${ID}-cta secondary" href="${link}">Shop now</a>`;

        bestSellersContainer.appendChild(slide);
        resolve();
      }
       
     });

  } else {
    const brandURL = socialData[brandData].bestSellersLink;
    // clear carousel
    bestSellersContainer.innerHTML = "";

    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("GET", brandURL, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement("html");
          temp.innerHTML = request.responseText;
          const items = temp.querySelectorAll(".oct-grid__row.oct-grid__section .oct-teaser-wrapper");

          for (let index = 0; index < items.length; index += 1) {
            const element = items[index];
            const name = element.querySelector("h3").innerText;
            const link = element.querySelector("a").getAttribute("href");
            const skuCode = link.match(/((.*)(-))([\d]{8}).*/)[4];
            const img = `https://boots.scene7.com/is/image/Boots/${skuCode}?wid=300&hei=300&op_sharpen=1`;

            const slide = document.createElement("div");
            slide.className = `${ID}-slide swiper-slide`;
            slide.innerHTML = `<a href="${link}"></a>
                  <div class="${ID}-image" style="background-image:url(${img})"></div>
                  <h3>${name}</h3>
                  <a class="${ID}-cta secondary" href="${link}">Shop now</a>`;

            bestSellersContainer.appendChild(slide);

            resolve();
          }
        }
      };
      request.send();
    });
  }
};

export const bestSellerCarousel = () => {
  var elswiper = new Swiper(`.${ID}-bestSellers .${ID}-swiper`, {
    direction: "horizontal",
    loop: true,
    initialSlide: 0,
    slidersPerView: 1,
    paginationClickable: true,

    navigation: {
      nextEl: `.${ID}-bestSellers .${ID}-swiperNext.swiper-button-next`,
      prevEl: `.${ID}-bestSellers .${ID}-swiperPrev.swiper-button-prev`,
      clickable: true,
    },
  });

  if (document.querySelector(`.${ID}-bestSellers .${ID}-slide`)) {
    elswiper.init();
  }

  const allCloseButtons = document.querySelectorAll(`.${ID}-close`);
  for (let index = 0; index < allCloseButtons.length; index += 1) {
    const element = allCloseButtons[index];
    element.addEventListener("click", () => {
      elswiper.destroy(true, true);
    });
  }

  document.querySelector(`.${ID}-overlay`).addEventListener("click", () => {
    elswiper.destroy(true, true);
  });
};

export const bestSellers = (data) => {
  bestSellersContent(data).then(() => {
    bestSellerCarousel();
  });
};

export const setCarouselTitle = (name) => {
  const carouselTitle = document.querySelector(`.${ID}-socialTitle`);
  carouselTitle.innerHTML = `<h3>${name}</h3>`;
};

// Carousel lightbox functions

const createCarousel = (brand) => {
  
  let nextBrand;
   if(document.querySelector(`.${ID}-circle[data-target="${brand}"]`).nextElementSibling) {
    nextBrand = document.querySelector(`.${ID}-circle[data-target="${brand}"]`).nextElementSibling.getAttribute('data-target');
   } else {
    nextBrand = document.querySelector(`.${ID}-circle`).getAttribute('data-target');
   }

   if (document.querySelector(`.${ID}-modalInner .${ID}-slide`)) {
    
    if (window.innerWidth <= 767) {
      // Add last mobile slide

     var mySwiper = new Swiper(`.${ID}-modalInner .${ID}-swiper.image-carousel`, {
        direction: "horizontal",
        loop: false,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false
        },
        speed: 1,
        initialSlide: 0,
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        paginationClickable: true,
        pagination: {
          el: `.${ID}-progessPagination`,
          clickable: true,
        },
        navigation: {
          nextEl: `.${ID}-modalInner .${ID}-swiper.image-carousel .${ID}-swiperNext.swiper-button-next`,
          prevEl: `.${ID}-modalInner .${ID}-swiper.image-carousel .${ID}-swiperPrev.swiper-button-prev`,
          clickable: true,
        },
    });  
    
    
    mySwiper.autoplay.running = true;

      mySwiper.on('reachEnd', function(){
        mySwiper.autoplay.stop();
        const goToNext = setTimeout(() => {
          if(document.querySelector(`.${ID}-modalInner .${ID}-swiper.image-carousel`)) {
            document.querySelector(`.${ID}-modalInner .${ID}-swiper.image-carousel`).swiper.destroy(true, true);
          }
          document.querySelectorAll(`.${ID}-modalInner .${ID}-swiper.image-carousel .swiper-slide`).forEach((el) => {
            el.remove();
          });
          carouselContent(nextBrand);
          createCarousel(nextBrand);
        }, 6000);

       document.querySelector(`.${ID}-modalInner .${ID}-swiper.image-carousel .${ID}-swiperPrev.swiper-button-prev`).addEventListener('click', () => {
        clearTimeout(goToNext);
        if(mySwiper.autoplay && !mySwiper.autoplay.running) {
          mySwiper.autoplay.running = true;
        }
       });
      });

    } 


    // cta carousel events
    const carouselCTAs = document.querySelectorAll(`.${ID}-modalInner .${ID}-cta`);
    for (let index = 0; index < carouselCTAs.length; index++) {
      const element = carouselCTAs[index];
      element.addEventListener("click", () => {
        fireEvent("Clicked CTA in carousel");
      });
    }

    const bestSellerCTAs = document.querySelectorAll(`.${ID}-bestSellers .${ID}-cta`);
    if (bestSellerCTAs) {
      for (let index = 0; index < bestSellerCTAs.length; index++) {
        const element = bestSellerCTAs[index];
        element.addEventListener("click", () => {
          fireEvent("Clicked best seller product CTA");
        });
      }
    }

    const allCloseButtons = document.querySelectorAll(`.${ID}-close`);
    for (let index = 0; index < allCloseButtons.length; index += 1) {
      const element = allCloseButtons[index];
      element.addEventListener("click", () => {
        if(mySwiper) {
          mySwiper.destroy(true, true);
        }
      });
    }

    document.querySelector(`.${ID}-overlay`).addEventListener("click", () => {
      if(mySwiper) {
        mySwiper.destroy(true, true);
      }
    });
  }
};

export const openCarousel = (target) => {
  createCarousel(target);
  
  const carouselLightbox = document.querySelector(`.${ID}-carouselModal`);
  const overLay = document.querySelector(`.${ID}-overlay`);

  carouselLightbox.classList.add(`${ID}-modalShow`);
  document.documentElement.classList.add(`${ID}-noScroll`);
  overLay.classList.add(`${ID}-overlayShow`);
};

export const closeCarousel = () => {
  const carouselLightbox = document.querySelector(`.${ID}-carouselModal`);
  const overLay = document.querySelector(`.${ID}-overlay`);

  carouselLightbox.classList.remove(`${ID}-modalShow`);
  document.documentElement.classList.remove(`${ID}-noScroll`);
  overLay.classList.remove(`${ID}-overlayShow`);
};

export const openNextCarousel = (carousel, nextBrands) => {
  carousel.destroy(true, true);
  carouselContent(nextBrands)
  
}
