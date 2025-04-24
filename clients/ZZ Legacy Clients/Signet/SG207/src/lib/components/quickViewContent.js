
import shared from "../../../../../../core-files/shared";

export default () => {
  const { ID } = shared;

  document.body.insertAdjacentHTML(`beforeend`, `<div class="${ID}-overlay"></div>`);

  // Add quick view cta to products
  const addQuickViewButton = () => {
    // add quick view on all products with CTA and not bundle products
    const allProducts = document.querySelectorAll(`.product-card:not(.${ID}-inGrid)`);
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];
      element.querySelector(".product-card__image-container").insertAdjacentHTML(`beforebegin`, `<div class="${ID}-quickViewCTA"></div>`);
    }
  };

  addQuickViewButton();

  const imageSlider = () => {
    const thumbSwiper = new window.Swiper(`.${ID}-thumbnails`, {
      spaceBetween: 10,
      slidesPerView: 3,
      watchSlidesProgress: true,
      navigation: {
        nextEl: `.${ID}-thumbnails .swiper-button-next`,
        prevEl: `.${ID}-thumbnails .swiper-button-prev`,
      },
    });

    const swiper = new window.Swiper(`.${ID}-images`, {
      direction: "horizontal",
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      slidesPerView: 1,
      spaceBetween: 10,
      thumbs: {
        swiper: thumbSwiper,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        900: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
      },
    });

  };


  // Request and add quick view box
  const getProductDetails = (el) => {

    const productLink = el.parentNode.querySelector("a").getAttribute("href");
  

    // fireEvent('Clicked Quick View');

    let productPrice;
    productPrice = el.parentNode.querySelector(".product-card__product-price");

    const productName = el.parentNode.querySelector(".product-card__product-name");

    const request = new XMLHttpRequest();
    request.open("GET", productLink, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement("html");
        temp.innerHTML = request.responseText;

        
        const basketForm = temp.querySelector(".detail-page__right-column");
        const quickViewBox = document.querySelector(`.${ID}-quickView`);
        const images = temp.querySelectorAll(".product-gallery__image-container img");

        //Get brand
        let brand;

        const specs = temp.querySelectorAll(".product-specification tr");
        for (let index = 0; index < specs.length; index++) {
          const element = specs[index];
            if (element.querySelector("td") && element.querySelector("td").textContent === 'Brand') {
            brand = element.querySelector("a").textContent;
          }
        }

        // create markup for the quick view box
        quickViewBox.querySelector(`.${ID}-productInfo`).innerHTML = `
             <div class="${ID}-productImage">
                <div class="${ID}-images swiper">
                  <div class="swiper-wrapper"></div>
                </div>
                ${images.length > 1 ? `
                <div thumbsSlider="" class="${ID}-thumbnails swiper">
                  <div class="swiper-wrapper">
                  </div>
                  <div class="swiper-button-prev ${ID}-swiperPrev"></div>
                  <div class="swiper-button-next ${ID}-swiperNext"></div>
                </div>` : ""}
                <a href="${productLink}"></a>
              </div>
              <div class="${ID}-productDetails">
                <div class="${ID}-title">
                  <span>${brand ? brand : ""}</span>
                  <h3>${productName.textContent.trim()}</h3>
                  <div class="${ID}-priceRating">
                      <div class="${ID}-price">${productPrice.innerHTML}</div>
                  </div>
                </div>
                <div class="${ID}-addSection">
                  ${basketForm ? basketForm.outerHTML : ""}
                </div>
              </div>`;

        document.body.appendChild(quickViewBox);

        if(quickViewBox.querySelector('.product-ring-size__heading')) {
          quickViewBox.querySelector('.product-ring-size__heading').textContent = '*Choose your ring size';
        }
        if(quickViewBox.querySelector('.product-step-up-down__Material')) {
          quickViewBox.querySelector('..product-step-up-down__Material').textContent = '*Choose your metal';
        }
        if(quickViewBox.querySelector('.product-buy-now')) {
          quickViewBox.querySelector('.product-buy-now').insertAdjacentHTML('beforeend', ` <a class="${ID}-view sg-cta" href="${productLink}">Find out more</a>`);
        }

        quickViewBox.classList.add(`${ID}-quickViewShow`);
        document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);
        document.body.classList.add(`${ID}-noScroll`);

        // add all images
        for (let index = 0; index < images.length; index += 1) {
          const prodImages = images[index];
          const newImage = document.createElement("div");
          newImage.classList.add(`${ID}-image`);
          newImage.classList.add("swiper-slide");
          newImage.innerHTML = `<img src="${prodImages.getAttribute("src").replace("1490.jpg", "504.jpg")}"/>`;

          document.querySelector(`.${ID}-images .swiper-wrapper`).appendChild(newImage);
        }

        // Add thumbnails
        if (images.length > 1) {
          for (let i = 0; i < images.length; i += 1) {
            const thumbImages = images[i];
            const newThumbImage = document.createElement("div");
            newThumbImage.classList.add(`${ID}-thumb`);
            newThumbImage.classList.add("swiper-slide");
            newThumbImage.innerHTML = `<img src="${thumbImages.getAttribute("src").replace("1490.jpg", "504.jpg")}"/>`;

            document.querySelector(`.${ID}-thumbnails .swiper-wrapper`).appendChild(newThumbImage);
          }

          imageSlider();
        }


        if (document.querySelector(`.${ID}-quickViewContent .product-buy-now__button`)) {
          document.querySelector(`.${ID}-quickViewContent .product-buy-now__button`).addEventListener("click", () => {
            //fireEvent('Added to basket from quick view');
          });
        }
      }
    };
    request.send();

  };

  // On click of quick view CTA
  const quickViewClick = () => {
    const allQuickViewCTAs = document.querySelectorAll(`.${ID}-quickViewCTA`);
    for (let index = 0; index < allQuickViewCTAs.length; index += 1) {
      const element = allQuickViewCTAs[index];
      element.addEventListener("click", (e) => {
        e.preventDefault();
        getProductDetails(element);
      });
    }
  }

  const closeQuickView = () => {
    const quickViewBox = document.querySelector(`.${ID}-quickView`);
    document.body.classList.remove(`${ID}-noScroll`);
    quickViewBox.classList.remove(`${ID}-quickViewShow`);
    document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayShow`);
    
    if(quickViewBox.querySelector(`.${ID}-images`) && quickViewBox.querySelector(`.${ID}-images`).swiper) {
      document.querySelector(`.${ID}-images`).swiper.destroy(true, true);
    }
    if(quickViewBox.querySelector(`.${ID}-thumbnails`) && quickViewBox.querySelector(`.${ID}-thumbnails`).swiper) {
      document.querySelector(`.${ID}-thumbnails`).swiper.destroy(true, true);
    }
  };

  const quickViewEvents = () => {
    const quickViewBox = document.querySelector(`.${ID}-quickView`);
    quickViewBox.querySelector(`.${ID}-close`).addEventListener("click", () => {
      closeQuickView();
    });
  };

  quickViewClick();
  quickViewEvents();

  // overlay click
  const overlay = document.querySelector(`.${ID}-overlay`);
  overlay.addEventListener("click", () => {
    closeQuickView();
  });
};
